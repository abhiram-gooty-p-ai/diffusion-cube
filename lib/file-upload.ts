// Shared, dependency-free upload rules. This module is used by both the
// browser staging flow and the server-side S3 signing routes.

export const SUPPORTED_FILE_EXTENSIONS = [
  'pdf', 'docx', 'xlsx', 'xls', 'pptx', 'txt', 'md', 'png', 'jpg', 'jpeg', 'gif', 'webp',
] as const;

const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp']);

export const MAX_DOCUMENT_BYTES = 100 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
  md: 'text/markdown',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
};

export function getUploadExtension(fileName: string): string | null {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension && SUPPORTED_FILE_EXTENSIONS.includes(extension as (typeof SUPPORTED_FILE_EXTENSIONS)[number])
    ? extension
    : null;
}

export function isUploadImage(fileName: string): boolean {
  const extension = getUploadExtension(fileName);
  return Boolean(extension && IMAGE_EXTENSIONS.has(extension));
}

export function maxBytesForUpload(fileName: string): number {
  return isUploadImage(fileName) ? MAX_IMAGE_BYTES : MAX_DOCUMENT_BYTES;
}

export function mimeTypeForUpload(fileName: string, claimedType?: string): string {
  const extension = getUploadExtension(fileName);
  if (!extension) return 'application/octet-stream';
  // Browser-provided MIME types are useful for text files, but the extension
  // is the allow-list boundary and provides predictable S3 metadata.
  return MIME_BY_EXTENSION[extension] ?? claimedType ?? 'application/octet-stream';
}

export function safeUploadFileName(fileName: string): string {
  const extension = getUploadExtension(fileName);
  const stem = fileName
    .replace(/\.[^.]+$/, '')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'file';
  return `${stem}.${extension ?? 'bin'}`;
}
