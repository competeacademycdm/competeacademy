import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  getAdminSessionFromRequest,
  verifyPasswordConstantTime,
  validatePasswordStrength,
  hashPassword,
  revokeAllAdminSessions,
  createAdminSession,
  setAdminSessionCookie,
  getClientIp,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: {
    currentPassword?: unknown;
    newPassword?: unknown;
    confirmPassword?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { currentPassword, newPassword, confirmPassword } = body;

  if (typeof currentPassword !== 'string' || !currentPassword) {
    return NextResponse.json(
      { error: 'Current password is required.' },
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

  if (currentPassword === newPassword) {
    return NextResponse.json(
      { error: 'New password must be different from your current password.' },
      { status: 400 }
    );
  }

  const strength = validatePasswordStrength(newPassword);
  if (!strength.valid) {
    return NextResponse.json({ error: strength.error }, { status: 400 });
  }

  const user = db
    .prepare('SELECT id, email, name, role, password_hash FROM admin_users WHERE id = ?')
    .get(session.userId) as
    | { id: string; email: string; name: string; role: string; password_hash: string }
    | undefined;

  if (!user) {
    return NextResponse.json({ error: 'Administrator record not found.' }, { status: 404 });
  }

  const isCurrentValid = await verifyPasswordConstantTime(currentPassword, user.password_hash);
  if (!isCurrentValid) {
    return NextResponse.json(
      { error: 'Current password verification failed.' },
      { status: 401 }
    );
  }

  const newHash = await hashPassword(newPassword);
  const nowIso = new Date().toISOString();
  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Update password hash and revoke all existing sessions
  db.prepare(`
    UPDATE admin_users
    SET password_hash = ?,
        password_changed_at = ?,
        must_change_password = 0,
        updated_at = ?
    WHERE id = ?
  `).run(newHash, nowIso, nowIso, user.id);

  revokeAllAdminSessions(user.id, 'PASSWORD_CHANGED');

  // Issue a fresh session for the current user so they remain authenticated with a rotated token
  const { token } = await createAdminSession(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    ipAddress,
    userAgent
  );

  db.prepare(`
    INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
    VALUES (?, 'PASSWORD_CHANGE', 'ADMIN_SECURITY', ?, 'Updated administrator password and rotated active sessions', ?)
  `).run(
    `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    user.id,
    user.email
  );

  const response = NextResponse.json({
    success: true,
    message: 'Administrator password updated and all previous sessions revoked.',
  });
  setAdminSessionCookie(response, token);
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return response;
}
