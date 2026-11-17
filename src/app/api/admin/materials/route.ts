import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET all learning materials (with search, filter, pagination & aggregate metrics)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const subject = searchParams.get('subject') || '';
    const course = searchParams.get('course') || '';
    const category = searchParams.get('category') || '';
    const classLevel = searchParams.get('class_level') || '';
    const status = searchParams.get('status') || ''; // 'all', 'published', 'draft'
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const isPublicOnly = searchParams.get('public') === 'true';

    // Require authenticated admin session unless explicitly querying public published materials
    if (!isPublicOnly) {
      const session = await getAdminSessionFromRequest(request);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Build WHERE clause
    const whereConditions: string[] = ['1=1'];
    const params: (string | number)[] = [];

    if (isPublicOnly) {
      whereConditions.push('is_published = 1');
    } else if (status === 'published') {
      whereConditions.push('is_published = 1');
    } else if (status === 'draft') {
      whereConditions.push('is_published = 0');
    }

    if (search.trim()) {
      whereConditions.push('(title LIKE ? OR description LIKE ? OR subject LIKE ? OR chapter LIKE ? OR material_type LIKE ? OR course LIKE ?)');
      const s = `%${search.trim()}%`;
      params.push(s, s, s, s, s, s);
    }

    if (subject.trim() && subject !== 'all') {
      whereConditions.push('subject = ?');
      params.push(subject.trim());
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

    const whereClause = whereConditions.join(' AND ');

    // 1. Get filtered total count
    const countRow = db.prepare(`SELECT COUNT(*) as total FROM learning_materials WHERE ${whereClause}`).get(...params) as { total: number };
    const filteredTotal = countRow ? countRow.total : 0;

    // 2. Query materials with sorting and optional pagination
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

    // 3. For admin requests, compute summary statistics across the whole repository
    let stats = undefined;
    if (!isPublicOnly) {
      const totalAll = (db.prepare('SELECT COUNT(*) as c FROM learning_materials').get() as { c: number }).c;
      const publishedCount = (db.prepare('SELECT COUNT(*) as c FROM learning_materials WHERE is_published = 1').get() as { c: number }).c;
      const draftCount = (db.prepare('SELECT COUNT(*) as c FROM learning_materials WHERE is_published = 0').get() as { c: number }).c;
      const missingAttachments = (db.prepare("SELECT COUNT(*) as c FROM learning_materials WHERE file_url IS NULL OR TRIM(file_url) = ''").get() as { c: number }).c;

      const courseCounts = db.prepare('SELECT course, COUNT(*) as count FROM learning_materials GROUP BY course').all() as { course: string; count: number }[];
      const byCourse: Record<string, number> = {};
      courseCounts.forEach((row) => {
        byCourse[row.course] = row.count;
      });

      stats = {
        total: totalAll,
        published: publishedCount,
        draft: draftCount,
        missingAttachments,
        byCourse: {
          'Foundation Classes': byCourse['Foundation Classes'] || 0,
          'NEET Medical': byCourse['NEET Medical'] || 0,
          'JEE Main & Advanced': byCourse['JEE Main & Advanced'] || 0,
          'UPSC Civil Services': byCourse['UPSC Civil Services'] || 0,
          'TNPSC State Services': byCourse['TNPSC State Services'] || 0,
        },
      };
    }

    const res = NextResponse.json({
      success: true,
      materials,
      pagination: {
        page,
        limit,
        total: filteredTotal,
        totalPages,
      },
      stats,
    });

    if (isPublicOnly && !search.trim()) {
      res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    }
    return res;
  } catch (err: unknown) {
    console.error('Error fetching materials:', err);
    return NextResponse.json({ error: 'Failed to fetch learning materials' }, { status: 500 });
  }
}

// POST: Add new learning material (Admin only)
export async function POST(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      subject,
      course,
      category,
      material_type,
      class_level,
      chapter,
      academic_year,
      medium,
      file_url,
      file_name,
      file_size,
      thumbnail_url,
      is_published,
    } = body;

    if (!title || !subject || !course || !category || !material_type) {
      return NextResponse.json(
        { error: 'Missing mandatory fields: title, subject, course, category, material_type' },
        { status: 400 }
      );
    }

    const id = `mat-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const publishedVal = is_published !== undefined ? (is_published ? 1 : 0) : 1;

    db.prepare(`
      INSERT INTO learning_materials (
        id, title, description, subject, course, category, material_type,
        class_level, chapter, academic_year, medium,
        file_url, file_name, file_size, thumbnail_url, is_published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      title.trim(),
      description ? description.trim() : null,
      subject.trim(),
      course.trim(),
      category.trim(),
      material_type.trim(),
      class_level ? class_level.trim() : null,
      chapter ? chapter.trim() : null,
      academic_year ? academic_year.trim() : null,
      medium ? medium.trim() : 'English',
      file_url || null,
      file_name || null,
      file_size || null,
      thumbnail_url || null,
      publishedVal
    );

    // Audit log
    db.prepare(`
      INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      `log-${Date.now()}`,
      'CREATE_MATERIAL',
      'learning_material',
      id,
      title,
      session.email
    );

    const created = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(id);

    // Invalidate public and resource feeds so changes reflect immediately
    try {
      revalidatePath('/resources');
      revalidatePath('/api/resources/materials');
      revalidatePath('/api/admin/materials');
    } catch {}

    return NextResponse.json({ success: true, material: created }, { status: 201 });
  } catch (err: unknown) {
    console.error('Error creating material:', err);
    return NextResponse.json({ error: 'Failed to create learning material' }, { status: 500 });
  }
}
