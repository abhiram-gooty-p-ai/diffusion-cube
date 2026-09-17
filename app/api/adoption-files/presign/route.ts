import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adoptionFileKey, adopterPrefix, getS3FileClient, getS3FileConfig } from '@/lib/s3-files';
import { getUploadExtension, maxBytesForUpload, mimeTypeForUpload, safeUploadFileName } from '@/lib/file-upload';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = getS3FileConfig();
  const s3 = getS3FileClient();
  if (!config || !s3) {
    return NextResponse.json({ error: 'File storage is not configured.', code: 'STORAGE_NOT_CONFIGURED' }, { status: 503 });
  }

  const body = await request.json().catch(() => null) as {
    designId?: string;
    fileName?: string;
    contentType?: string;
    sizeBytes?: number;
    pathwayId?: string;
  } | null;
  if (!body?.designId || !body.pathwayId || !body.fileName || typeof body.sizeBytes !== 'number' || !Number.isSafeInteger(body.sizeBytes) || body.sizeBytes < 1) {
    return NextResponse.json({ error: 'Invalid file upload request.' }, { status: 400 });
  }
  const sizeBytes = body.sizeBytes;

  const extension = getUploadExtension(body.fileName);
  const maxBytes = maxBytesForUpload(body.fileName);
  if (!extension || sizeBytes > maxBytes) {
    return NextResponse.json({ error: 'This file type or size is not allowed.' }, { status: 400 });
  }

  // RLS makes this succeed only for the caller's own adoption workspace.
  const { data: design } = await supabase.from('designs').select('id').eq('id', body.designId).maybeSingle();
  if (!design) return NextResponse.json({ error: 'Adoption workspace not found.' }, { status: 404 });
  const { data: membership } = await supabase.from('pathway_contributors')
    .select('user_id').eq('pathway_id', body.pathwayId).eq('user_id', user.id).maybeSingle();
  if (!membership) return NextResponse.json({ error: 'Not a contributor to this pathway.' }, { status: 403 });

  const name = typeof user.user_metadata?.name === 'string' ? user.user_metadata.name : null;
  const prefix = adopterPrefix({ id: user.id, name, email: user.email });
  const key = adoptionFileKey(prefix, design.id, safeUploadFileName(body.fileName));
  const contentType = mimeTypeForUpload(body.fileName, body.contentType);

  const upload = await createPresignedPost(s3, {
    Bucket: config.bucket,
    Key: key,
    Expires: 60,
    Fields: {
      'Content-Type': contentType,
      'x-amz-meta-user-id': user.id,
      'x-amz-meta-design-id': design.id,
    },
    Conditions: [
      ['content-length-range', 1, maxBytes],
      { 'Content-Type': contentType },
      { 'x-amz-meta-user-id': user.id },
      { 'x-amz-meta-design-id': design.id },
    ],
  });

  return NextResponse.json({ key, contentType, upload });
}
