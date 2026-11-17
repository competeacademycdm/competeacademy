import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest, normalizeEmail } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const DEFAULT_SETTINGS: Record<string, string> = {
  academyName: 'Compete Academy — Chennai',
  helpline: '+91 94765 43210',
  email: 'info@competeacademy.in',
};

export async function GET(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rows = db.prepare('SELECT key, value FROM admin_settings').all() as {
      key: string;
      value: string;
    }[];
    const map: Record<string, string> = { ...DEFAULT_SETTINGS };
    for (const r of rows) {
      map[r.key] = r.value;
    }

    const adminRow = db
      .prepare('SELECT email, name, password_changed_at FROM admin_users WHERE id = ?')
      .get(session.userId) as
      | { email: string; name: string; password_changed_at: string | null }
      | undefined;

    const activeSessionsRow = db
      .prepare(
        `SELECT COUNT(*) as count FROM admin_sessions
         WHERE user_id = ? AND revoked_at IS NULL AND datetime(expires_at) > datetime('now')`
      )
      .get(session.userId) as { count: number };

    return NextResponse.json({
      success: true,
      settings: {
        academyName: map.academyName,
        helpline: map.helpline,
        email: map.email,
        adminEmail: adminRow?.email || session.email,
        adminName: adminRow?.name || session.name,
        passwordChangedAt: adminRow?.password_changed_at || null,
        activeSessionsCount: activeSessionsRow.count || 1,
      },
    });
  } catch (err) {
    console.error('Error loading settings:', err);
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const academyName =
      typeof body.academyName === 'string' && body.academyName.trim()
        ? body.academyName.trim().slice(0, 150)
        : DEFAULT_SETTINGS.academyName;
    const helpline =
      typeof body.helpline === 'string' && body.helpline.trim()
        ? body.helpline.trim().slice(0, 40)
        : DEFAULT_SETTINGS.helpline;
    const publicEmail =
      normalizeEmail(body.email) || DEFAULT_SETTINGS.email;
    const adminName =
      typeof body.adminName === 'string' && body.adminName.trim()
        ? body.adminName.trim().slice(0, 120)
        : session.name;

    const nowIso = new Date().toISOString();
    const upsertSetting = db.prepare(`
      INSERT INTO admin_settings (key, value, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `);

    const tx = db.transaction(() => {
      upsertSetting.run('academyName', academyName, nowIso);
      upsertSetting.run('helpline', helpline, nowIso);
      upsertSetting.run('email', publicEmail, nowIso);

      db.prepare('UPDATE admin_users SET name = ?, updated_at = ? WHERE id = ?').run(
        adminName,
        nowIso,
        session.userId
      );

      db.prepare(`
        INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
        VALUES (?, 'UPDATE', 'INSTITUTIONAL_SETTINGS', 'settings', 'Updated institutional configuration', ?)
      `).run(`log-${Date.now()}`, session.email);
    });

    tx();

    return NextResponse.json({
      success: true,
      message: 'Institutional settings saved to database.',
    });
  } catch (err) {
    console.error('Error updating settings:', err);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
