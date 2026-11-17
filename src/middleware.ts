import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  verifyAdminJwt,
  sanitizeAdminRedirect,
} from '@/lib/jwt';

const PUBLIC_ADMIN_AUTH_PATHS = new Set([
  '/api/admin/auth/login',
  '/api/admin/auth/logout',
  '/api/admin/auth/forgot-password',
  '/api/admin/auth/reset-password',
]);

function applySecurityHeaders(response: NextResponse, noStore: boolean = true): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (noStore) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Handle /admin/login page
  if (pathname === '/admin/login') {
    // If redirected due to expired/revoked session or password reset link, allow login page to render
    if (searchParams.get('expired') === '1' || searchParams.get('resetToken')) {
      const res = NextResponse.next();
      if (searchParams.get('expired') === '1') {
        res.cookies.delete(ADMIN_COOKIE_NAME);
      }
      return applySecurityHeaders(res, true);
    }

    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (token) {
      const payload = await verifyAdminJwt(token);
      if (payload) {
        const target = sanitizeAdminRedirect(searchParams.get('redirect'));
        return applySecurityHeaders(NextResponse.redirect(new URL(target, request.url)), true);
      }
    }
    return applySecurityHeaders(NextResponse.next(), true);
  }

  // 2. Allow public authentication endpoints
  if (PUBLIC_ADMIN_AUTH_PATHS.has(pathname)) {
    return applySecurityHeaders(NextResponse.next(), true);
  }

  // 3. Allow public read-only published materials feed used by /resources
  if (
    pathname === '/api/admin/materials' &&
    request.method === 'GET' &&
    searchParams.get('public') === 'true'
  ) {
    return applySecurityHeaders(NextResponse.next(), false);
  }

  // 4. Verify JWT on all other /admin/* and /api/admin/* routes
  const token =
    request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  const payload = token ? await verifyAdminJwt(token) : null;

  if (!payload) {
    if (pathname.startsWith('/api/admin')) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: 'Unauthorized institutional access. Valid administrator session required.' },
          { status: 401 }
        ),
        true
      );
    }

    const loginUrl = new URL('/admin/login', request.url);
    const safeRedirect = sanitizeAdminRedirect(pathname);
    if (safeRedirect !== '/admin') {
      loginUrl.searchParams.set('redirect', safeRedirect);
    }
    return applySecurityHeaders(NextResponse.redirect(loginUrl), true);
  }

  return applySecurityHeaders(NextResponse.next(), true);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
