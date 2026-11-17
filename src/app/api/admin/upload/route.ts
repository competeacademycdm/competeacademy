import { NextRequest, NextResponse } from 'next/server';
import { getAdminSessionFromRequest } from '@/lib/auth';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const ALLOWED_DOCUMENT_EXTENSIONS = new Set(['.pdf', '.doc', '.docx']);
const ALLOWED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

export async function POST(request: NextRequest) {
  const session = await getAdminSessionFromRequest(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const uploadType = (formData.get('type') as string) || 'document'; // 'document' or 'image'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size must be between 1 byte and 50MB' }, { status: 400 });
    }

    const originalName = file.name || 'uploaded_file';
    const rawExt = path.extname(originalName).toLowerCase();
    const allowedSet = uploadType === 'image' ? ALLOWED_IMAGE_EXTENSIONS : ALLOWED_DOCUMENT_EXTENSIONS;

    if (!rawExt || !allowedSet.has(rawExt)) {
      return NextResponse.json(
        {
          error:
            uploadType === 'image'
              ? 'Invalid image file type. Allowed formats: .jpg, .jpeg, .png, .webp'
              : 'Invalid document file type. Allowed formats: .pdf, .doc, .docx',
        },
        { status: 400 }
      );
    }

    const folder = uploadType === 'image' ? 'images' : 'documents';
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const baseName = path
      .basename(originalName, path.extname(originalName))
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 80);
    const uniqueFilename = `${Date.now()}_${baseName || 'resource'}${rawExt}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: originalName,
      fileSize: file.size,
    });
  } catch (err: unknown) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
