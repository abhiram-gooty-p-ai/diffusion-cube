import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getS3FileClient, getS3FileConfig } from '@/lib/s3-files';
import { safeUploadFileName } from '@/lib/file-upload';

export const runtime = 'nodejs';

// Stable, public Cube URL for a published resource. The bucket remains
// private; opening this route creates a short-lived object URL on demand.
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const admin = createAdminClient();
  const { data: resource } = await admin
    .from('pathway_resources')
    .select('title, external_url, object_key, content_type, adoption_files(object_key, file_name, content_type)')
    .eq('id', id)
    .eq('visibility', 'published')
    .maybeSingle();
  if (!resource) return NextResponse.json({ error: 'Resource not found.' }, { status: 404 });
  if (resource.external_url) return NextResponse.redirect(resource.external_url, 302);

  const attachedFile = resource.adoption_files as unknown as { object_key: string; file_name: string; content_type: string } | null;
  const file = attachedFile ?? (resource.object_key ? {
    object_key: resource.object_key,
    file_name: resource.title,
    content_type: resource.content_type || 'application/octet-stream',
  } : null);
  const config = getS3FileConfig();
  const s3 = getS3FileClient();
  if (!file || !config || !s3) return NextResponse.json({ error: 'Resource is temporarily unavailable.' }, { status: 503 });
  const url = await getSignedUrl(s3, new GetObjectCommand({
    Bucket: config.bucket, Key: file.object_key,
    ResponseContentType: file.content_type,
    ResponseContentDisposition: `inline; filename="${safeUploadFileName(file.file_name)}"`,
  }), { expiresIn: 300 });
  return NextResponse.redirect(url, 302);
}
