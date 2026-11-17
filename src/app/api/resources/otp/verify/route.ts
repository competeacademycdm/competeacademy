import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { SmsGatewayService } from '@/lib/sms';
import { hashOtp, createDownloadToken } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      mobile,
      otp,
      resourceId,
      resourceTitle,
      downloadType,
      examCategory,
      accessMethod,
      destinationUrl,
    } = body;

    // 1. Validate inputs
    const normalizedMobile = SmsGatewayService.normalizeIndianMobile(mobile || '');
    if (!SmsGatewayService.isValidIndianMobile(normalizedMobile)) {
      return NextResponse.json(
        { error: 'Invalid mobile number.' },
        { status: 400 }
      );
    }

    const cleanOtp = typeof otp === 'string' ? otp.replace(/\D/g, '') : '';
    if (cleanOtp.length !== 6) {
      return NextResponse.json(
        { error: 'Please enter the 6-digit verification code.' },
        { status: 400 }
      );
    }

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Missing requested resource identifier.' },
        { status: 400 }
      );
    }

    // 2. Fetch the latest active OTP record for this mobile
    const otpRecord = db
      .prepare(
        `SELECT id, otp_hash, attempts, max_attempts, expires_at, verified 
         FROM otp_verifications 
         WHERE mobile = ? AND verified = 0 
         ORDER BY created_at DESC 
         LIMIT 1`
      )
      .get(normalizedMobile) as
      | {
          id: string;
          otp_hash: string;
          attempts: number;
          max_attempts: number;
          expires_at: string;
          verified: number;
        }
      | undefined;

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'No active OTP verification session found. Please request a new OTP.' },
        { status: 404 }
      );
    }

    // 3. Check expiration (5 minutes)
    const expiresAt = new Date(otpRecord.expires_at).getTime();
    if (Date.now() > expiresAt) {
      db.prepare(`UPDATE otp_verifications SET verified = 2 WHERE id = ?`).run(otpRecord.id);
      return NextResponse.json(
        { error: 'The verification code has expired (validity 5 mins). Please request a new OTP.' },
        { status: 410 }
      );
    }

    // 4. Check maximum attempts (5 attempts limit)
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      db.prepare(`UPDATE otp_verifications SET verified = 2 WHERE id = ?`).run(otpRecord.id);
      return NextResponse.json(
        { error: 'Maximum verification attempts exceeded. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // 5. Hash submitted OTP and compare
    const submittedHash = hashOtp(cleanOtp, normalizedMobile);
    if (submittedHash !== otpRecord.otp_hash) {
      // Increment failed attempts
      const newAttempts = otpRecord.attempts + 1;
      db.prepare(`UPDATE otp_verifications SET attempts = ? WHERE id = ?`).run(
        newAttempts,
        otpRecord.id
      );

      const attemptsRemaining = otpRecord.max_attempts - newAttempts;
      if (attemptsRemaining <= 0) {
        db.prepare(`UPDATE otp_verifications SET verified = 2 WHERE id = ?`).run(otpRecord.id);
        return NextResponse.json(
          { error: 'Too many incorrect attempts. Please request a new OTP.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `Incorrect verification code. ${attemptsRemaining} attempt(s) remaining.` },
        { status: 401 }
      );
    }

    // 6. Successful OTP Verification! Mark OTP record as verified (1)
    db.prepare(`UPDATE otp_verifications SET verified = 1 WHERE id = ?`).run(otpRecord.id);

    // 7. Update Student record to 'Verified' and record verification timestamp
    const student = db
      .prepare(`SELECT id, name FROM resource_students WHERE mobile = ?`)
      .get(normalizedMobile) as { id: string; name: string } | undefined;

    if (student) {
      db.prepare(
        `UPDATE resource_students 
         SET verification_status = 'Verified', 
             verified_at = CURRENT_TIMESTAMP, 
             last_activity = CURRENT_TIMESTAMP 
         WHERE id = ?`
      ).run(student.id);
    }

    const studentId = student ? student.id : `student-${normalizedMobile}`;
    const studentName = student ? student.name : 'Verified Student';

    // 8. If this is an external government resource link, log the access history immediately
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const method = accessMethod || (destinationUrl ? 'external_link' : 'academy_download');

    if (method === 'external_link' && destinationUrl) {
      const recordId = `access-${crypto.randomUUID()}`;
      db.prepare(
        `INSERT INTO resource_download_records 
         (id, student_id, student_name, mobile, resource_id, resource_title, download_type, file_path, ip_address, exam_category, access_method, destination_url, download_timestamp)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
      ).run(
        recordId,
        studentId,
        studentName,
        normalizedMobile,
        resourceId,
        resourceTitle || resourceId,
        downloadType || 'external_doc',
        destinationUrl,
        clientIp,
        examCategory || 'neet',
        'external_link',
        destinationUrl
      );

      return NextResponse.json({
        success: true,
        message: 'Mobile number verified successfully. Redirecting to official government document...',
        accessMethod: 'external_link',
        destinationUrl,
      });
    }

    // 9. Generate short-lived (15 min) download authorization token for academy-hosted downloads
    const downloadToken = await createDownloadToken({
      studentId,
      studentName,
      mobile: normalizedMobile,
      resourceId,
      downloadType: downloadType || 'pdf',
      examCategory: examCategory || 'neet',
      accessMethod: 'academy_download',
      destinationUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'Mobile number verified successfully. Starting resource download...',
      accessMethod: 'academy_download',
      downloadToken,
      downloadUrl: `/api/resources/download?token=${encodeURIComponent(downloadToken)}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error while verifying OTP';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
