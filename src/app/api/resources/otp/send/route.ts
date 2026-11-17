import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { SmsGatewayService } from '@/lib/sms';
import { generateSixDigitOtp, hashOtp } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile } = body;

    // 1. Validate full name
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 70) {
      return NextResponse.json(
        { error: 'Please enter a valid full name (2 to 70 characters).' },
        { status: 400 }
      );
    }

    // 2. Validate Indian mobile number
    const normalizedMobile = SmsGatewayService.normalizeIndianMobile(mobile || '');
    if (!SmsGatewayService.isValidIndianMobile(normalizedMobile)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    // Client IP for security & rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    // 3. Rate limiting / Cooldown check (60s cooldown per mobile number)
    const recentOtp = db
      .prepare(
        `SELECT created_at FROM otp_verifications 
         WHERE mobile = ? 
         ORDER BY created_at DESC 
         LIMIT 1`
      )
      .get(normalizedMobile) as { created_at: string } | undefined;

    if (recentOtp) {
      const lastCreatedTime = new Date(recentOtp.created_at).getTime();
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastCreatedTime) / 1000);
      if (elapsedSeconds < 60) {
        const remaining = 60 - elapsedSeconds;
        return NextResponse.json(
          { error: `Please wait ${remaining}s before requesting a new OTP.` },
          { status: 429 }
        );
      }
    }

    // 4. Rate limiting per IP (max 10 requests per hour)
    const ipCount = db
      .prepare(
        `SELECT COUNT(*) as count FROM otp_verifications 
         WHERE ip_address = ? AND created_at > datetime('now', '-1 hour')`
      )
      .get(ip) as { count: number };

    if (ipCount && ipCount.count >= 15) {
      return NextResponse.json(
        { error: 'Too many OTP requests from this connection. Please try again later.' },
        { status: 429 }
      );
    }

    // 5. Save or update Student Lead in database (Mandatory Requirement)
    // "Whenever a student submits their full name and mobile number, save their information in the database.
    // Initially mark the status as Pending."
    const existingStudent = db
      .prepare(`SELECT id, verification_status FROM resource_students WHERE mobile = ?`)
      .get(normalizedMobile) as { id: string; verification_status: string } | undefined;

    let studentId: string;
    if (existingStudent) {
      studentId = existingStudent.id;
      // Update name and last_activity
      db.prepare(
        `UPDATE resource_students 
         SET name = ?, last_activity = CURRENT_TIMESTAMP 
         WHERE id = ?`
      ).run(trimmedName, studentId);
    } else {
      studentId = `student-${crypto.randomUUID()}`;
      db.prepare(
        `INSERT INTO resource_students (id, name, mobile, verification_status, registration_date, last_activity)
         VALUES (?, ?, ?, 'Pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
      ).run(studentId, trimmedName, normalizedMobile);
    }

    // 6. Generate 6-digit OTP
    const plainOtp = generateSixDigitOtp();
    const hashedOtp = hashOtp(plainOtp, normalizedMobile);

    // Invalidate previous OTPs for this mobile
    db.prepare(`UPDATE otp_verifications SET verified = 2 WHERE mobile = ? AND verified = 0`).run(
      normalizedMobile
    );

    // 7. Dispatch SMS through configured SMS provider
    const smsResult = await SmsGatewayService.sendOtpSms(normalizedMobile, plainOtp);
    if (!smsResult.success) {
      return NextResponse.json(
        {
          error: smsResult.error || 'Failed to dispatch OTP SMS. Please check mobile number.',
          provider: smsResult.provider,
        },
        { status: 502 }
      );
    }

    // 8. Store OTP record with 5-minute expiration
    const otpId = `otp-${crypto.randomUUID()}`;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    db.prepare(
      `INSERT INTO otp_verifications (id, mobile, otp_hash, attempts, max_attempts, ip_address, expires_at, verified)
       VALUES (?, ?, ?, 0, 5, ?, ?, 0)`
    ).run(otpId, normalizedMobile, hashedOtp, ip, expiresAt);

    // 9. Mask mobile number for response
    const maskedMobile = `+91 ${normalizedMobile.slice(0, 2)}••••••${normalizedMobile.slice(8)}`;

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully to your mobile number via SMS.',
      maskedMobile,
      expiresInSeconds: 300,
      resendCooldownSeconds: 60,
      studentId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error while sending OTP';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
