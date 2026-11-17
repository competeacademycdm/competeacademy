import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE_NAME = 'compete_admin_token';
export const JWT_ISSUER = 'compete-academy-admin';
export const JWT_AUDIENCE = 'compete-academy-console';
export const SESSION_DURATION_SECONDS = 12 * 60 * 60; // 12 hours

export interface AdminJwtClaims {
  userId: string;
  email: string;
  name: string;
  role: string;
  jti: string;
  sessionId?: string;
}

function getJwtSecretBytes(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32 || secret.startsWith('replace_with_')) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL SECURITY ERROR: ADMIN_JWT_SECRET environment variable must be configured with at least 32 characters in production.');
    }
    // Development-only deterministic fallback if .env.local was bypassed
    return new TextEncoder().encode('dev-only-ephemeral-compete-academy-jwt-signing-key-not-for-prod');
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminJwt(
  payload: AdminJwtClaims,
  expiresInSeconds: number = SESSION_DURATION_SECONDS
): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  return await new SignJWT({
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    sessionId: payload.sessionId,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(payload.userId)
    .setJti(payload.jti)
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt(nowSeconds)
    .setExpirationTime(nowSeconds + expiresInSeconds)
    .sign(getJwtSecretBytes());
}

export async function verifyAdminJwt(token: string): Promise<AdminJwtClaims | null> {
  try {
    if (!token || typeof token !== 'string') return null;
    const { payload } = await jwtVerify(token, getJwtSecretBytes(), {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ['HS256'],
    });

    if (
      typeof payload.userId !== 'string' ||
      typeof payload.email !== 'string' ||
      typeof payload.jti !== 'string'
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      name: typeof payload.name === 'string' ? payload.name : 'Administrator',
      role: typeof payload.role === 'string' ? payload.role : 'superadmin',
      jti: payload.jti,
      sessionId: typeof payload.sessionId === 'string' ? payload.sessionId : undefined,
    };
  } catch {
    return null;
  }
}

export function sanitizeAdminRedirect(redirectParam: string | null | undefined): string {
  if (!redirectParam || typeof redirectParam !== 'string') {
    return '/admin';
  }
  const trimmed = redirectParam.trim();
  // Prevent open redirects: must start with single slash /admin, no protocol or double slashes
  if (
    !trimmed.startsWith('/admin') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('/\\') ||
    trimmed.includes('://') ||
    trimmed.startsWith('/admin/login')
  ) {
    return '/admin';
  }
  return trimmed;
}
