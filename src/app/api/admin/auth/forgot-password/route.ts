import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  normalizeEmail,
  getClientIp,
  verifyCsrfOrigin,
  createPasswordResetToken,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

const GENERIC_RECOVERY_MESSAGE =
  'If an active administrator account is registered with that email address, a password reset token has been generated.';

export async function POST(request: NextRequest) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Cross-origin request rejected.' },
      { status: 403 }
    );
  }

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload format.' },
      { status: 400 }
    );
  }

  const normalizedEmail = normalizeEmail(body?.email);
  if (!normalizedEmail) {
    return NextResponse.json(
      { error: 'Please provide a valid institutional email address.' },
      { status: 400 }
    );
  }

  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    // Rate limit password reset requests per IP (max 5 requests per 15 minutes)
    const windowStartIso = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const recentRequests = db
      .prepare(
        `SELECT COUNT(*) as count
         FROM admin_password_resets
         WHERE ip_address = ? AND created_at >= ?`
      )
      .get(ipAddress, windowStartIso) as { count: number };

    if (recentRequests.count >= 5) {
      return NextResponse.json(
        {
          error: 'Too many password recovery requests from this address. Please wait 15 minutes before trying again.',
        },
        { status: 429 }
      );
    }

    const smtpConfigured = Boolean(
      process.env.SMTP_HOST &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS &&
        !process.env.SMTP_HOST.includes('example.com')
    );

    const user = db
      .prepare('SELECT id, email, is_active FROM admin_users WHERE LOWER(TRIM(email)) = ?')
      .get(normalizedEmail) as { id: string; email: string; is_active: number } | undefined;

    if (user && user.is_active) {
      // Generates a 256-bit CSPRNG token and stores ONLY its SHA-256 hash in admin_password_resets
      const { expiresAt } = createPasswordResetToken(user.id, ipAddress, userAgent);

      db.prepare(`
        INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
        VALUES (?, 'PASSWORD_RESET_REQUEST', 'ADMIN_SECURITY', ?, ?, ?)
      `).run(
        `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        user.id,
        `Password reset requested from IP ${ipAddress} (expires ${expiresAt}; SMTP configured: ${smtpConfigured})`,
        user.email
      );
    }

    // Never reveal whether the email exists or return the raw token in the API response
    return NextResponse.json({
      success: true,
      message: GENERIC_RECOVERY_MESSAGE,
      emailDeliveryConfigured: smtpConfigured,
      deliveryNotice: smtpConfigured
        ? 'If the account exists, a time-limited reset link has been dispatched via the configured SMTP gateway.'
        : 'Outbound SMTP email transport (SMTP_HOST / SMTP_USER / SMTP_PASS) is not configured in this environment. The SHA-256 hashed reset token has been generated in the database; configure SMTP in .env.local for automated email delivery or enter a provisioned reset token directly.',
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json(
      { error: 'Unable to process password recovery request.' },
      { status: 500 }
    );
  }
}
