import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getS3FileClient, getS3FileConfig } from '@/lib/s3-files';
import { safeUploadFileName } from '@/lib/file-upload';

export const runtime = 'nodejs';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const config = getS3FileConfig();
  const s3 = getS3FileClient();
  if (!config || !s3) return NextResponse.json({ error: 'File storage is not configured.' }, { status: 503 });

  // RLS prevents one adopter from resolving another adopter's file ID.
  const { data: file } = await supabase
    .from('adoption_files')
    .select('object_key, file_name, content_type')
    .eq('id', id)
    .maybeSingle();
  if (!file) return NextResponse.json({ error: 'File not found.' }, { status: 404 });

  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: config.bucket,
      Key: file.object_key,
      ResponseContentType: file.content_type,
      ResponseContentDisposition: `inline; filename="${safeUploadFileName(file.file_name)}"`,
    }),
    { expiresIn: 300 }
  );

  return NextResponse.redirect(url, 302);
}
