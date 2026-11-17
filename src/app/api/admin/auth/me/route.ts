import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest, clearAdminSessionCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    const res = NextResponse.json({ authenticated: false }, { status: 401 });
    clearAdminSessionCookie(res);
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res;
  }

  const res = NextResponse.json({
    authenticated: true,
    user: {
      userId: session.userId,
      email: session.email,
      name: session.name,
      role: session.role,
      mustChangePassword: Boolean(session.mustChangePassword),
    },
  });
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res;
}
