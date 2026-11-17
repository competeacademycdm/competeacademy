import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { verifyDownloadToken } from '@/lib/otp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    // 1. Enforce Token Verification (Must be valid, unexpired, signed JWT)
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized download access. Please verify your mobile number first.' },
        { status: 401 }
      );
    }

    const payload = await verifyDownloadToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid or expired download authorization token. Please verify again.' },
        { status: 403 }
      );
    }

    const { studentId, studentName, mobile, resourceId, downloadType, examCategory } = payload;

    // 2. Resolve requested resource from database or direct path
    let relativeFilePath = '';
    let resourceTitle = '';
    let mimeType = 'application/pdf';

    if (downloadType === 'zip' || resourceId.endsWith('-vault') || resourceId.endsWith('-archive')) {
      relativeFilePath = `/uploads/documents/${resourceId}.zip`;
      resourceTitle = `${resourceId.toUpperCase()} Academic Vault Archive`;
      mimeType = 'application/zip';
    } else {
      // Check learning_materials table in database
      const dbMaterial = db
        .prepare(`SELECT title, file_url FROM learning_materials WHERE id = ?`)
        .get(resourceId) as { title: string; file_url: string } | undefined;
      if (dbMaterial && dbMaterial.file_url) {
        relativeFilePath = dbMaterial.file_url;
        resourceTitle = dbMaterial.title;
        mimeType = relativeFilePath.endsWith('.zip') ? 'application/zip' : 'application/pdf';
      }
    }

    if (!relativeFilePath) {
      return NextResponse.json(
        { error: 'The requested resource file could not be located on the server.' },
        { status: 404 }
      );
    }

    // 3. Resolve absolute disk file path safely (prevent path traversal)
    const normalizedRelative = relativeFilePath.startsWith('/')
      ? relativeFilePath.slice(1)
      : relativeFilePath;
    const absoluteFilePath = path.join(process.cwd(), 'public', normalizedRelative);

    if (!fs.existsSync(absoluteFilePath)) {
      return NextResponse.json(
        { error: 'Resource file is temporarily unavailable for download.' },
        { status: 404 }
      );
    }

    // 4. Record verified download in database (Requirement 6)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const recordId = `dl-${crypto.randomUUID()}`;
    db.prepare(
      `INSERT INTO resource_download_records 
       (id, student_id, student_name, mobile, resource_id, resource_title, download_type, file_path, ip_address, exam_category, access_method, destination_url, download_timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'academy_download', ?, CURRENT_TIMESTAMP)`
    ).run(
      recordId,
      studentId,
      studentName,
      mobile,
      resourceId,
      resourceTitle,
      downloadType || 'pdf',
      relativeFilePath,
      ip,
      examCategory || 'neet',
      relativeFilePath
    );

    // Update last_activity on student record
    db.prepare(`UPDATE resource_students SET last_activity = CURRENT_TIMESTAMP WHERE id = ?`).run(
      studentId
    );

    // 5. Memory-efficient streaming of the verified file with appropriate headers
    const fileStats = fs.statSync(absoluteFilePath);
    const nodeStream = fs.createReadStream(absoluteFilePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;
    const filename = path.basename(absoluteFilePath);

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': fileStats.size.toString(),
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error delivering download';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
