import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET single material (Admin only)
export async function GET(request: NextRequest, context: RouteContext) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const material = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(id);
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, material });
  } catch (err: unknown) {
    console.error('Error fetching material:', err);
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 });
  }
}

// PUT / PATCH: Update material
export async function PUT(request: NextRequest, context: RouteContext) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const existing = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    if (!existing) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    const title = body.title !== undefined ? body.title : existing.title;
    const description = body.description !== undefined ? body.description : existing.description;
    const subject = body.subject !== undefined ? body.subject : existing.subject;
    const course = body.course !== undefined ? body.course : existing.course;
    const category = body.category !== undefined ? body.category : existing.category;
    const material_type = body.material_type !== undefined ? body.material_type : existing.material_type;
    const class_level = body.class_level !== undefined ? body.class_level : existing.class_level;
    const chapter = body.chapter !== undefined ? body.chapter : existing.chapter;
    const academic_year = body.academic_year !== undefined ? body.academic_year : existing.academic_year;
    const medium = body.medium !== undefined ? body.medium : existing.medium;
    const file_url = body.file_url !== undefined ? body.file_url : existing.file_url;
    const file_name = body.file_name !== undefined ? body.file_name : existing.file_name;
    const file_size = body.file_size !== undefined ? body.file_size : existing.file_size;
    const thumbnail_url = body.thumbnail_url !== undefined ? body.thumbnail_url : existing.thumbnail_url;
    const is_published = body.is_published !== undefined ? (body.is_published ? 1 : 0) : existing.is_published;

    db.prepare(`
      UPDATE learning_materials SET
        title = ?,
        description = ?,
        subject = ?,
        course = ?,
        category = ?,
        material_type = ?,
        class_level = ?,
        chapter = ?,
        academic_year = ?,
        medium = ?,
        file_url = ?,
        file_name = ?,
        file_size = ?,
        thumbnail_url = ?,
        is_published = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
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
      id
    );

    // Audit log
    db.prepare(`
      INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      `log-${Date.now()}`,
      'UPDATE_MATERIAL',
      'learning_material',
      id,
      String(title),
      session.email
    );

    const updated = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(id);

    // Invalidate public and resource feeds so updates reflect immediately
    try {
      revalidatePath('/resources');
      revalidatePath('/api/resources/materials');
      revalidatePath('/api/admin/materials');
    } catch {}

    return NextResponse.json({ success: true, material: updated });
  } catch (err: unknown) {
    console.error('Error updating material:', err);
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
  }
}

// DELETE material
export async function DELETE(request: NextRequest, context: RouteContext) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const existing = db.prepare('SELECT * FROM learning_materials WHERE id = ?').get(id) as Record<string, unknown> | undefined;
    if (!existing) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    db.prepare('DELETE FROM learning_materials WHERE id = ?').run(id);

    // Audit log
    db.prepare(`
      INSERT INTO admin_activity_logs (id, action, entity_type, entity_id, entity_title, admin_email)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      `log-${Date.now()}`,
      'DELETE_MATERIAL',
      'learning_material',
      id,
      String(existing.title),
      session.email
    );

    // Invalidate public and resource feeds so deletion reflects immediately
    try {
      revalidatePath('/resources');
      revalidatePath('/api/resources/materials');
      revalidatePath('/api/admin/materials');
    } catch {}

    return NextResponse.json({ success: true, message: 'Material deleted successfully' });
  } catch (err: unknown) {
    console.error('Error deleting material:', err);
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
  }
}
