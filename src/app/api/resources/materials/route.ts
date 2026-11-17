import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const course = searchParams.get('course') || '';
    const category = searchParams.get('category') || '';
    const classLevel = searchParams.get('class_level') || '';
    const subject = searchParams.get('subject') || '';
    const limitParam = searchParams.get('limit');
    const pageParam = searchParams.get('page');

    // Strict security rule: Public API ONLY ever serves published materials
    const whereConditions: string[] = ['is_published = 1'];
    const params: (string | number)[] = [];

    if (search.trim()) {
      whereConditions.push(
        '(title LIKE ? OR description LIKE ? OR subject LIKE ? OR chapter LIKE ? OR material_type LIKE ? OR course LIKE ?)'
      );
      const s = `%${search.trim()}%`;
      params.push(s, s, s, s, s, s);
    }

    if (course.trim() && course !== 'all') {
      whereConditions.push('course = ?');
      params.push(course.trim());
    }

    if (category.trim() && category !== 'all') {
      whereConditions.push('category = ?');
      params.push(category.trim());
    }

    if (classLevel.trim() && classLevel !== 'all') {
      whereConditions.push('class_level = ?');
      params.push(classLevel.trim());
    }

    if (subject.trim() && subject !== 'all') {
      whereConditions.push('subject = ?');
      params.push(subject.trim());
    }

    const whereClause = whereConditions.join(' AND ');

    // 1. Total matching published materials count
    const countRow = db
      .prepare(`SELECT COUNT(*) as total FROM learning_materials WHERE ${whereClause}`)
      .get(...params) as { total: number };
    const filteredTotal = countRow ? countRow.total : 0;

    // 2. Query materials with sorting
    let materialsQuery = `SELECT * FROM learning_materials WHERE ${whereClause} ORDER BY created_at DESC`;
    const queryParams: (string | number)[] = [...params];

    let page = 1;
    let limit = filteredTotal;
    let totalPages = 1;

    if (limitParam && limitParam !== 'all') {
      const parsedLimit = parseInt(limitParam, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        limit = parsedLimit;
        const parsedPage = parseInt(pageParam || '1', 10);
        page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;
        totalPages = Math.ceil(filteredTotal / limit) || 1;
        const offset = (page - 1) * limit;

        materialsQuery += ' LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
      }
    }

    const materials = db.prepare(materialsQuery).all(...queryParams);

    // 3. Programme-wise aggregate counts for published materials
    const courseCounts = db
      .prepare(
        'SELECT course, COUNT(*) as count FROM learning_materials WHERE is_published = 1 GROUP BY course'
      )
      .all() as { course: string; count: number }[];

    const byCourse: Record<string, number> = {
      'Foundation Classes': 0,
      'NEET Medical': 0,
      'JEE Main & Advanced': 0,
      'UPSC Civil Services': 0,
      'TNPSC State Services': 0,
    };
    courseCounts.forEach((row) => {
      byCourse[row.course] = row.count;
    });

    const totalPublished = (
      db.prepare('SELECT COUNT(*) as c FROM learning_materials WHERE is_published = 1').get() as {
        c: number;
      }
    ).c;

    const res = NextResponse.json({
      success: true,
      materials,
      pagination: {
        page,
        limit,
        total: filteredTotal,
        totalPages,
      },
      stats: {
        totalPublished,
        byCourse,
      },
    });

    // Cache-Control: allow CDN caching with fast revalidation
    res.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    return res;
  } catch (err: unknown) {
    console.error('Error fetching public learning materials:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve published learning materials' },
      { status: 500 }
    );
  }
}
