import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { id } = await context.params;

    const student = db
      .prepare(`SELECT * FROM resource_students WHERE id = ?`)
      .get(id);

    if (!student) {
      return NextResponse.json({ error: 'Student record not found' }, { status: 404 });
    }

    const downloadHistory = db
      .prepare(
        `SELECT * FROM resource_download_records 
         WHERE student_id = ? 
         ORDER BY download_timestamp DESC`
      )
      .all(id);

    return NextResponse.json({
      student,
      downloadHistory,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error fetching student details';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
