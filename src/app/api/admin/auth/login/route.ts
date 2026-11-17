import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  normalizeEmail,
  verifyPasswordConstantTime,
  getClientIp,
  verifyCsrfOrigin,
  checkLoginRateLimit,
  recordLoginAttempt,
  createAdminSession,
  setAdminSessionCookie,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface AdminUserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  is_active: number;
  must_change_password: number;
}

export async function POST(request: NextRequest) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Cross-origin authentication request rejected.' },
      { status: 403 }
    );
  }

  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload format.' },
      { status: 400 }
    );
  }

  const normalizedEmail = normalizeEmail(body?.email);
  const rawPassword = body?.password;

  if (!normalizedEmail || typeof rawPassword !== 'string' || rawPassword.length === 0) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const ipAddress = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';

  try {
    // 1. Check persistent SQLite rate limiting and temporary account lockout
    const rateLimit = checkLoginRateLimit(normalizedEmail, ipAddress);
    if (!rateLimit.allowed) {
      const retryMins = Math.max(1, Math.ceil((rateLimit.retryAfterSeconds || 900) / 60));
      const res = NextResponse.json(
        {
          error: `Too many failed login attempts. For institutional security, please wait ${retryMins} minute${retryMins > 1 ? 's' : ''} before trying again.`,
          retryAfterSeconds: rateLimit.retryAfterSeconds || 900,
        },
        { status: 429 }
      );
      res.headers.set('Retry-After', String(rateLimit.retryAfterSeconds || 900));
      return res;
    }

    // 2. Lookup administrator record (case-insensitive normalized email)
    const user = db
      .prepare(
        `SELECT id, email, password_hash, name, role, is_active, must_change_password
         FROM admin_users
         WHERE LOWER(TRIM(email)) = ?`
      )
      .get(normalizedEmail) as AdminUserRow | undefined;

    // 3. Constant-time bcrypt verification (runs dummy compare if user not found to prevent timing enumeration)
    const isPasswordValid = await verifyPasswordConstantTime(
      rawPassword,
      user?.password_hash
    );

    if (!user || !user.is_active || !isPasswordValid) {
      recordLoginAttempt({
        email: normalizedEmail,
        ipAddress,
        userAgent,
        success: false,
        failureReason: !user
          ? 'USER_NOT_FOUND'
          : !user.is_active
          ? 'ACCOUNT_DISABLED'
          : 'INVALID_PASSWORD',
        userId: user?.id,
      });

      return NextResponse.json(
        { error: 'Invalid institutional credentials' },
        { status: 401 }
      );
    }

    // 4. Record successful login & clear failed attempt counters
    recordLoginAttempt({
      email: normalizedEmail,
      ipAddress,
      userAgent,
      success: true,
      userId: user.id,
    });

    // 5. Create revocable server-side session in SQLite + signed JWT with JTI
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

    // 6. Log audit activity
    db.prepare(`
      INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
      VALUES (?, 'LOGIN', 'ADMIN_SESSION', ?, ?, ?)
    `).run(
      `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      user.id,
      `Logged into Admin Console from ${ipAddress}`,
      user.email
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        mustChangePassword: Boolean(user.must_change_password),
      },
    });

    setAdminSessionCookie(response, token);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch (err: unknown) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Internal authentication error' },
      { status: 500 }
    );
  }
}
