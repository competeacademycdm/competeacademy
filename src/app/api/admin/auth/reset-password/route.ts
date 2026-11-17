import { NextRequest, NextResponse } from 'next/server';
import {
  getClientIp,
  verifyCsrfOrigin,
  verifyPasswordResetToken,
  consumePasswordResetToken,
  clearAdminSessionCookie,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const result = verifyPasswordResetToken(token);
  if (!result.valid) {
    return NextResponse.json(
      { valid: false, error: result.error || 'Invalid or expired reset token.' },
      { status: 400 }
    );
  }
  return NextResponse.json({ valid: true });
}

export async function POST(request: NextRequest) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Cross-origin password reset request rejected.' },
      { status: 403 }
    );
  }

  let body: { token?: unknown; newPassword?: unknown; confirmPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload format.' },
      { status: 400 }
    );
  }

  const { token, newPassword, confirmPassword } = body;

  if (typeof token !== 'string' || !token.trim()) {
    return NextResponse.json(
      { error: 'Password reset token is required.' },
      { status: 400 }
    );
  }

  if (typeof newPassword !== 'string' || !newPassword) {
    return NextResponse.json(
      { error: 'New password is required.' },
      { status: 400 }
    );
  }

  if (confirmPassword !== undefined && newPassword !== confirmPassword) {
    return NextResponse.json(
      { error: 'New password and confirmation password do not match.' },
      { status: 400 }
    );
  }

  const ipAddress = getClientIp(request);
  const result = await consumePasswordResetToken(token.trim(), newPassword, ipAddress);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || 'Failed to reset password.' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: 'Your administrator password has been reset and all prior sessions have been invalidated. Please sign in with your new credentials.',
  });
  clearAdminSessionCookie(response);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}
