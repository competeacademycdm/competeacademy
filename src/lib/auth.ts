import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from './db';
import {
  ADMIN_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  signAdminJwt,
  verifyAdminJwt,
  sanitizeAdminRedirect,
} from './jwt';

export { ADMIN_COOKIE_NAME, SESSION_DURATION_SECONDS, sanitizeAdminRedirect };

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  jti: string;
  sessionId: string;
  mustChangePassword?: boolean;
}

// Pre-computed bcrypt hash (cost 12) used when user email is not found to prevent timing attacks
const DUMMY_BCRYPT_HASH = '$2b$12$KIX/5eG3W9y1O4f2J6m8vO0xR3t5Y7u9I1o3P5a7S9d1F3g5H7j9K';

// SHA-256 digests of known compromised or prohibited institutional passwords
const COMPROMISED_PASSWORD_SHA256 = new Set([
  '3e44ea4ed4c9b1ff647913e754fb09d07d63005568d9de93b5d298aaf8401186',
]);

// Rate limit configuration
const LOGIN_WINDOW_MINUTES = 15;
const MAX_FAILED_ATTEMPTS_PER_EMAIL = 5;
const MAX_FAILED_ATTEMPTS_PER_IP = 15;
const LOCKOUT_DURATION_MINUTES = 15;
const RESET_TOKEN_EXPIRY_MINUTES = 15;

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null;
  const normalized = email.trim().toLowerCase();
  if (!normalized || normalized.length > 254) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) return null;
  return normalized;
}

export function validatePasswordStrength(password: unknown): { valid: boolean; error?: string } {
  if (typeof password !== 'string') {
    return { valid: false, error: 'Password is required.' };
  }
  if (password.length < 10) {
    return { valid: false, error: 'Password must be at least 10 characters long.' };
  }
  if (password.length > 128) {
    return { valid: false, error: 'Password must not exceed 128 characters.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must include at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must include at least one lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must include at least one numeric digit.' };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, error: 'Password must include at least one special character.' };
  }

  const sha256 = crypto.createHash('sha256').update(password).digest('hex');
  if (COMPROMISED_PASSWORD_SHA256.has(sha256)) {
    return {
      valid: false,
      error: 'This password has been flagged as previously exposed and cannot be used.',
    };
  }

  return { valid: true };
}

export async function verifyPasswordConstantTime(
  password: unknown,
  passwordHash?: string | null
): Promise<boolean> {
  if (typeof password !== 'string' || password.length === 0 || password.length > 128) {
    await bcrypt.compare('invalid_input_placeholder', DUMMY_BCRYPT_HASH);
    return false;
  }
  const targetHash =
    passwordHash && passwordHash.startsWith('$2') ? passwordHash : DUMMY_BCRYPT_HASH;
  const isMatch = await bcrypt.compare(password, targetHash);
  return Boolean(passwordHash && isMatch);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

export function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const firstIp = xff.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return '127.0.0.1';
}

export function verifyCsrfOrigin(request: NextRequest): boolean {
  const method = request.method.toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return true;
  }

  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    new URL(request.url).host;

  if (origin) {
    try {
      const originUrl = new URL(origin);
      return originUrl.host.toLowerCase() === host.toLowerCase();
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return refererUrl.host.toLowerCase() === host.toLowerCase();
    } catch {
      return false;
    }
  }

  // Same-origin non-browser clients without Origin/Referer are permitted if they carry valid cookie/auth,
  // while cross-origin browser requests always include Origin/Referer.
  const secFetchSite = request.headers.get('sec-fetch-site');
  if (secFetchSite && secFetchSite !== 'same-origin' && secFetchSite !== 'none') {
    return false;
  }

  return true;
}

export async function createAdminSession(
  user: { id: string; email: string; name: string; role: string },
  ipAddress: string,
  userAgent: string
): Promise<{ token: string; sessionId: string; expiresAt: string }> {
  const sessionId = `sess-${crypto.randomUUID()}`;
  const jti = crypto.randomBytes(24).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_SECONDS * 1000).toISOString();

  db.prepare(`
    INSERT INTO admin_sessions (
      id, user_id, token_jti, ip_address, user_agent, created_at, last_active_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    sessionId,
    user.id,
    jti,
    ipAddress,
    userAgent.slice(0, 500),
    now.toISOString(),
    now.toISOString(),
    expiresAt
  );

  const token = await signAdminJwt(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      jti,
      sessionId,
    },
    SESSION_DURATION_SECONDS
  );

  return { token, sessionId, expiresAt };
}

export function setAdminSessionCookie(
  response: NextResponse,
  token: string,
  maxAgeSeconds: number = SESSION_DURATION_SECONDS
): void {
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
}

export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  const claims = await verifyAdminJwt(token);
  if (!claims || !claims.jti) return null;

  try {
    const row = db
      .prepare(
        `SELECT 
          s.id as session_id,
          s.token_jti,
          s.created_at as session_created_at,
          s.expires_at,
          s.revoked_at,
          u.id as user_id,
          u.email,
          u.name,
          u.role,
          u.is_active,
          u.must_change_password,
          u.password_changed_at
        FROM admin_sessions s
        INNER JOIN admin_users u ON u.id = s.user_id
        WHERE s.token_jti = ? AND s.user_id = ?`
      )
      .get(claims.jti, claims.userId) as
      | {
          session_id: string;
          token_jti: string;
          session_created_at: string;
          expires_at: string;
          revoked_at: string | null;
          user_id: string;
          email: string;
          name: string;
          role: string;
          is_active: number;
          must_change_password: number;
          password_changed_at: string | null;
        }
      | undefined;

    if (!row) return null;
    if (row.revoked_at) return null;
    if (!row.is_active) return null;

    const nowMs = Date.now();
    const expiresMs = new Date(row.expires_at).getTime();
    if (Number.isNaN(expiresMs) || expiresMs <= nowMs) {
      return null;
    }

    // Invalidate sessions created prior to a password change (with 1s clock tolerance)
    if (row.password_changed_at) {
      const pwdChangedMs = new Date(row.password_changed_at).getTime();
      const sessionCreatedMs = new Date(row.session_created_at).getTime();
      if (!Number.isNaN(pwdChangedMs) && !Number.isNaN(sessionCreatedMs)) {
        if (sessionCreatedMs + 1000 < pwdChangedMs) {
          return null;
        }
      }
    }

    return {
      userId: row.user_id,
      email: row.email,
      name: row.name,
      role: row.role,
      jti: row.token_jti,
      sessionId: row.session_id,
      mustChangePassword: Boolean(row.must_change_password),
    };
  } catch {
    return null;
  }
}

export async function getAdminSessionFromRequest(
  request: NextRequest
): Promise<AdminSessionPayload | null> {
  // Enforce CSRF check on state-changing requests
  if (!verifyCsrfOrigin(request)) {
    return null;
  }

  const token =
    request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!token) return null;
  return await verifyAdminToken(token);
}

export async function revokeAdminSessionByToken(
  token: string,
  reason: string = 'USER_LOGOUT'
): Promise<AdminSessionPayload | null> {
  const session = await verifyAdminToken(token);
  const claims = session || (await verifyAdminJwt(token));
  if (!claims?.jti) return null;

  const nowIso = new Date().toISOString();
  db.prepare(`
    UPDATE admin_sessions
    SET revoked_at = ?, revoked_reason = ?
    WHERE token_jti = ? AND revoked_at IS NULL
  `).run(nowIso, reason, claims.jti);

  return session;
}

export function revokeAllAdminSessions(
  userId: string,
  reason: string = 'PASSWORD_CHANGED',
  exceptSessionId?: string
): void {
  const nowIso = new Date().toISOString();
  if (exceptSessionId) {
    db.prepare(`
      UPDATE admin_sessions
      SET revoked_at = ?, revoked_reason = ?
      WHERE user_id = ? AND id != ? AND revoked_at IS NULL
    `).run(nowIso, reason, userId, exceptSessionId);
  } else {
    db.prepare(`
      UPDATE admin_sessions
      SET revoked_at = ?, revoked_reason = ?
      WHERE user_id = ? AND revoked_at IS NULL
    `).run(nowIso, reason, userId);
  }
}

export function checkLoginRateLimit(
  email: string,
  ipAddress: string
): { allowed: boolean; retryAfterSeconds?: number; reason?: string } {
  const now = new Date();
  const windowStartIso = new Date(now.getTime() - LOGIN_WINDOW_MINUTES * 60 * 1000).toISOString();

  // 1. Check account-level temporary lockout on admin_users
  const userRow = db
    .prepare('SELECT locked_until FROM admin_users WHERE LOWER(TRIM(email)) = ?')
    .get(email) as { locked_until: string | null } | undefined;

  if (userRow?.locked_until) {
    const lockedUntilMs = new Date(userRow.locked_until).getTime();
    if (!Number.isNaN(lockedUntilMs) && lockedUntilMs > now.getTime()) {
      const retryAfterSeconds = Math.max(1, Math.ceil((lockedUntilMs - now.getTime()) / 1000));
      return {
        allowed: false,
        retryAfterSeconds,
        reason: 'ACCOUNT_LOCKED',
      };
    }
  }

  // 2. Check recent failed attempts for this email in the sliding window
  const emailFailures = db
    .prepare(
      `SELECT COUNT(*) as count, MAX(attempted_at) as last_attempt
       FROM admin_login_attempts
       WHERE email = ? AND success = 0 AND attempted_at >= ?`
    )
    .get(email, windowStartIso) as { count: number; last_attempt: string | null };

  if (emailFailures.count >= MAX_FAILED_ATTEMPTS_PER_EMAIL) {
    const lastMs = emailFailures.last_attempt
      ? new Date(emailFailures.last_attempt).getTime()
      : now.getTime();
    const unlockMs = lastMs + LOCKOUT_DURATION_MINUTES * 60 * 1000;
    const retryAfterSeconds = Math.max(1, Math.ceil((unlockMs - now.getTime()) / 1000));
    if (unlockMs > now.getTime()) {
      return {
        allowed: false,
        retryAfterSeconds,
        reason: 'EMAIL_RATE_LIMIT',
      };
    }
  }

  // 3. Check recent failed attempts for this IP address in the sliding window
  const ipFailures = db
    .prepare(
      `SELECT COUNT(*) as count, MAX(attempted_at) as last_attempt
       FROM admin_login_attempts
       WHERE ip_address = ? AND success = 0 AND attempted_at >= ?`
    )
    .get(ipAddress, windowStartIso) as { count: number; last_attempt: string | null };

  if (ipFailures.count >= MAX_FAILED_ATTEMPTS_PER_IP) {
    const lastMs = ipFailures.last_attempt
      ? new Date(ipFailures.last_attempt).getTime()
      : now.getTime();
    const unlockMs = lastMs + LOCKOUT_DURATION_MINUTES * 60 * 1000;
    const retryAfterSeconds = Math.max(1, Math.ceil((unlockMs - now.getTime()) / 1000));
    if (unlockMs > now.getTime()) {
      return {
        allowed: false,
        retryAfterSeconds,
        reason: 'IP_RATE_LIMIT',
      };
    }
  }

  return { allowed: true };
}

export function recordLoginAttempt(params: {
  email: string;
  ipAddress: string;
  userAgent?: string;
  success: boolean;
  failureReason?: string;
  userId?: string;
}): void {
  const now = new Date();
  const nowIso = now.toISOString();

  db.prepare(`
    INSERT INTO admin_login_attempts (
      id, email, ip_address, user_agent, success, failure_reason, attempted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `attempt-${crypto.randomUUID()}`,
    params.email,
    params.ipAddress,
    (params.userAgent || '').slice(0, 500),
    params.success ? 1 : 0,
    params.failureReason || null,
    nowIso
  );

  if (params.userId) {
    if (params.success) {
      db.prepare(`
        UPDATE admin_users
        SET failed_login_attempts = 0, locked_until = NULL, updated_at = ?
        WHERE id = ?
      `).run(nowIso, params.userId);
    } else {
      const updated = db
        .prepare(
          `UPDATE admin_users
           SET failed_login_attempts = failed_login_attempts + 1, updated_at = ?
           WHERE id = ?
           RETURNING failed_login_attempts`
        )
        .get(nowIso, params.userId) as { failed_login_attempts: number } | undefined;

      if (updated && updated.failed_login_attempts >= MAX_FAILED_ATTEMPTS_PER_EMAIL) {
        const lockedUntilIso = new Date(
          now.getTime() + LOCKOUT_DURATION_MINUTES * 60 * 1000
        ).toISOString();
        db.prepare('UPDATE admin_users SET locked_until = ? WHERE id = ?').run(
          lockedUntilIso,
          params.userId
        );
      }
    }
  }
}

export function createPasswordResetToken(
  userId: string,
  ipAddress: string,
  userAgent?: string
): { rawToken: string; expiresAt: string } {
  const now = new Date();
  const nowIso = now.toISOString();
  const expiresAt = new Date(now.getTime() + RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000).toISOString();

  // Invalidate any previous unused reset tokens for this user
  db.prepare(`
    UPDATE admin_password_resets
    SET used_at = ?
    WHERE user_id = ? AND used_at IS NULL
  `).run(nowIso, userId);

  // Generate 32-byte (256-bit) cryptographically secure token
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  db.prepare(`
    INSERT INTO admin_password_resets (
      id, user_id, token_hash, expires_at, ip_address, user_agent, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `rst-${crypto.randomUUID()}`,
    userId,
    tokenHash,
    expiresAt,
    ipAddress,
    (userAgent || '').slice(0, 500),
    nowIso
  );

  return { rawToken, expiresAt };
}

export function verifyPasswordResetToken(rawToken: unknown): {
  valid: boolean;
  error?: string;
  resetId?: string;
  userId?: string;
  email?: string;
} {
  if (typeof rawToken !== 'string' || !/^[a-f0-9]{64}$/i.test(rawToken.trim())) {
    return { valid: false, error: 'Invalid or malformed password reset token.' };
  }

  const tokenHash = crypto.createHash('sha256').update(rawToken.trim()).digest('hex');
  const row = db
    .prepare(
      `SELECT r.id as reset_id, r.user_id, r.expires_at, r.used_at, u.email, u.is_active
       FROM admin_password_resets r
       INNER JOIN admin_users u ON u.id = r.user_id
       WHERE r.token_hash = ?`
    )
    .get(tokenHash) as
    | {
        reset_id: string;
        user_id: string;
        expires_at: string;
        used_at: string | null;
        email: string;
        is_active: number;
      }
    | undefined;

  if (!row || !row.is_active) {
    return { valid: false, error: 'Invalid or expired password reset token.' };
  }
  if (row.used_at) {
    return { valid: false, error: 'This password reset token has already been used.' };
  }

  const expiresMs = new Date(row.expires_at).getTime();
  if (Number.isNaN(expiresMs) || expiresMs <= Date.now()) {
    return { valid: false, error: 'This password reset token has expired. Please request a new one.' };
  }

  return {
    valid: true,
    resetId: row.reset_id,
    userId: row.user_id,
    email: row.email,
  };
}

export async function consumePasswordResetToken(
  rawToken: unknown,
  newPassword: unknown,
  ipAddress: string
): Promise<{ success: boolean; error?: string; userEmail?: string; userId?: string }> {
  const tokenCheck = verifyPasswordResetToken(rawToken);
  if (!tokenCheck.valid || !tokenCheck.resetId || !tokenCheck.userId || !tokenCheck.email) {
    return { success: false, error: tokenCheck.error || 'Invalid or expired password reset token.' };
  }

  const strength = validatePasswordStrength(newPassword);
  if (!strength.valid) {
    return { success: false, error: strength.error };
  }

  const newHash = await hashPassword(newPassword as string);
  const nowIso = new Date().toISOString();

  const tx = db.transaction(() => {
    // Double-check single-use inside transaction
    const updateReset = db
      .prepare('UPDATE admin_password_resets SET used_at = ? WHERE id = ? AND used_at IS NULL')
      .run(nowIso, tokenCheck.resetId);

    if (updateReset.changes === 0) {
      throw new Error('TOKEN_ALREADY_USED');
    }

    // Update user password and clear lockouts
    db.prepare(`
      UPDATE admin_users
      SET password_hash = ?,
          password_changed_at = ?,
          must_change_password = 0,
          failed_login_attempts = 0,
          locked_until = NULL,
          updated_at = ?
      WHERE id = ?
    `).run(newHash, nowIso, nowIso, tokenCheck.userId);

    // Clear recent failed login attempts so user can log in immediately
    db.prepare('DELETE FROM admin_login_attempts WHERE email = ? AND success = 0').run(
      tokenCheck.email!.toLowerCase()
    );

    // Revoke all existing sessions for this user
    revokeAllAdminSessions(tokenCheck.userId!, 'PASSWORD_RESET');

    // Audit log
    db.prepare(`
      INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
      VALUES (?, 'PASSWORD_RESET', 'ADMIN_SECURITY', ?, ?, ?)
    `).run(
      `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tokenCheck.userId,
      `Password reset completed from IP ${ipAddress}`,
      tokenCheck.email
    );
  });

  try {
    tx();
    return {
      success: true,
      userEmail: tokenCheck.email,
      userId: tokenCheck.userId,
    };
  } catch (err) {
    if (err instanceof Error && err.message === 'TOKEN_ALREADY_USED') {
      return { success: false, error: 'This password reset token has already been used.' };
    }
    return { success: false, error: 'Failed to reset password. Please try again.' };
  }
}
