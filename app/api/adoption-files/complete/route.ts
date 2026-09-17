import { HeadObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adopterPrefix, getS3FileClient, getS3FileConfig } from '@/lib/s3-files';
import { getUploadExtension, maxBytesForUpload, mimeTypeForUpload } from '@/lib/file-upload';

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
    key?: string;
    fileName?: string;
    contentType?: string;
    sizeBytes?: number;
    pathwayId?: string;
  } | null;
  if (!body?.designId || !body.key || !body.fileName || typeof body.sizeBytes !== 'number' || !Number.isSafeInteger(body.sizeBytes) || body.sizeBytes < 1) {
    return NextResponse.json({ error: 'Invalid file completion request.' }, { status: 400 });
  }
  const sizeBytes = body.sizeBytes;

  const extension = getUploadExtension(body.fileName);
  if (!extension || sizeBytes > maxBytesForUpload(body.fileName)) {
    return NextResponse.json({ error: 'This file type or size is not allowed.' }, { status: 400 });
  }

  const { data: design } = await supabase.from('designs').select('id').eq('id', body.designId).maybeSingle();
  if (!design) return NextResponse.json({ error: 'Adoption workspace not found.' }, { status: 404 });

  // Only a contributor's explicit, pathway-linked upload is reusable. Analyse
  // attachments are read for the conversation but never persisted to S3.
  if (!body.pathwayId) return NextResponse.json({ error: 'A pathway is required for reusable material.' }, { status: 400 });
  const { data: membership } = await supabase.from('pathway_contributors')
    .select('user_id').eq('pathway_id', body.pathwayId).eq('user_id', user.id).maybeSingle();
  if (!membership) return NextResponse.json({ error: 'Not a contributor to this pathway.' }, { status: 403 });

  const name = typeof user.user_metadata?.name === 'string' ? user.user_metadata.name : null;
  const expectedPrefix = `${adopterPrefix({ id: user.id, name, email: user.email })}/adoptions/${design.id}/`;
  if (!body.key.startsWith(expectedPrefix)) {
    return NextResponse.json({ error: 'Invalid file location.' }, { status: 400 });
  }

  let object;
  try {
    object = await s3.send(new HeadObjectCommand({ Bucket: config.bucket, Key: body.key }));
  } catch {
    return NextResponse.json({ error: 'The uploaded file could not be found.' }, { status: 400 });
  }

  if (
    object.Metadata?.['user-id'] !== user.id ||
    object.Metadata?.['design-id'] !== design.id ||
    object.ContentLength !== sizeBytes ||
    object.ContentType !== mimeTypeForUpload(body.fileName, body.contentType)
  ) {
    return NextResponse.json({ error: 'The uploaded file could not be verified.' }, { status: 400 });
  }

  const { data: file, error } = await supabase
    .from('adoption_files')
    .insert({
      design_id: design.id,
      user_id: user.id,
      file_name: body.fileName,
      object_key: body.key,
      content_type: object.ContentType,
      size_bytes: object.ContentLength,
    })
    .select('id, file_name, content_type, size_bytes, created_at')
    .single();
  if (error || !file) return NextResponse.json({ error: error?.message ?? 'Could not save file details.' }, { status: 500 });

  const { error: resourceError } = await supabase.from('pathway_resources').insert({
    pathway_id: body.pathwayId,
    adoption_file_id: file.id,
    title: file.file_name,
    created_by: user.id,
  });
  if (resourceError) return NextResponse.json({ error: resourceError.message }, { status: 500 });

  return NextResponse.json({
    id: file.id,
    name: file.file_name,
    contentType: file.content_type,
    sizeBytes: file.size_bytes,
    createdAt: file.created_at,
  }, { status: 201 });
}
