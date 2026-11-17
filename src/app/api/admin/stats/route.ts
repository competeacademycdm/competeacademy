import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSessionFromRequest } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const materialsCount = (db.prepare('SELECT COUNT(*) as count FROM learning_materials').get() as { count: number }).count;
    const publishedMaterialsCount = (db.prepare('SELECT COUNT(*) as count FROM learning_materials WHERE is_published = 1').get() as { count: number }).count;

    // Recent materials
    const recentMaterials = db.prepare('SELECT id, title, subject, course, material_type, created_at, is_published FROM learning_materials ORDER BY created_at DESC LIMIT 6').all();

    // Recent admin activity logs
    const recentActivities = db.prepare('SELECT * FROM admin_activity_logs ORDER BY timestamp DESC LIMIT 8').all();

    return NextResponse.json({
      success: true,
      stats: {
        totalMaterials: materialsCount,
        publishedMaterials: publishedMaterialsCount,
        totalCourses: 5, // 5 core academic streams (NEET, JEE, TNPSC, UPSC, School)
      },
      recentMaterials,
      recentActivities,
    });
  } catch (err: unknown) {
    console.error('Error fetching dashboard stats:', err);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
