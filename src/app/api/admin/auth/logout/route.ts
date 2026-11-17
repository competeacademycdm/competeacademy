import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  verifyCsrfOrigin,
  revokeAdminSessionByToken,
  clearAdminSessionCookie,
} from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json(
      { error: 'Cross-origin logout request rejected.' },
      { status: 403 }
    );
  }

  try {
    const token =
      request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    if (token) {
      const session = await revokeAdminSessionByToken(token, 'USER_LOGOUT');
      if (session) {
        db.prepare(`
          INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
          VALUES (?, 'LOGOUT', 'ADMIN_SESSION', ?, 'Logged out of Admin Console', ?)
        `).run(
          `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          session.userId,
          session.email
        );
      }
    }

    const response = NextResponse.json({ success: true });
    clearAdminSessionCookie(response);
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  } catch {
    const response = NextResponse.json({ success: true });
    clearAdminSessionCookie(response);
    return response;
  }
}
