import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status')?.trim() || 'all'; // 'all', 'Verified', 'Pending'
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const exportCsv = searchParams.get('export') === 'true';

    // Base query
    let whereClause = '1=1';
    const params: (string | number)[] = [];

    if (search) {
      whereClause += ' AND (s.name LIKE ? OR s.mobile LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (status !== 'all') {
      whereClause += ' AND s.verification_status = ?';
      params.push(status);
    }

    if (exportCsv) {
      const records = db
        .prepare(
          `SELECT 
            s.id, 
            s.name, 
            s.mobile, 
            s.verification_status, 
            s.registration_date, 
            s.verified_at, 
            s.last_activity,
            COUNT(d.id) as downloads_count
           FROM resource_students s
           LEFT JOIN resource_download_records d ON s.id = d.student_id
           WHERE ${whereClause}
           GROUP BY s.id
           ORDER BY s.last_activity DESC`
        )
        .all(...params) as Array<{
          name: string;
          mobile: string;
          verification_status: string;
          registration_date: string;
          verified_at: string | null;
          last_activity: string;
          downloads_count: number;
        }>;

      let csv = 'Full Name,Mobile Number,Verification Status,Registration Date,Verified At,Last Activity,Downloads Count\n';
      for (const row of records) {
        csv += `"${row.name.replace(/"/g, '""')}","+91 ${row.mobile}","${row.verification_status}","${row.registration_date}","${row.verified_at || 'N/A'}","${row.last_activity}",${row.downloads_count}\n`;
      }

      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="compete_resource_students_${Date.now()}.csv"`,
        },
      });
    }

    // Total Count
    const totalRow = db
      .prepare(`SELECT COUNT(*) as count FROM resource_students s WHERE ${whereClause}`)
      .get(...params) as { count: number };
    const total = totalRow?.count || 0;

    // Paginated list with downloads count
    const offset = (page - 1) * limit;
    const paginatedParams = [...params, limit, offset];

    const students = db
      .prepare(
        `SELECT 
          s.id, 
          s.name, 
          s.mobile, 
          s.verification_status, 
          s.registration_date, 
          s.verified_at, 
          s.last_activity,
          COUNT(d.id) as downloads_count
         FROM resource_students s
         LEFT JOIN resource_download_records d ON s.id = d.student_id
         WHERE ${whereClause}
         GROUP BY s.id
         ORDER BY s.last_activity DESC
         LIMIT ? OFFSET ?`
      )
      .all(...paginatedParams);

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error fetching student leads';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
