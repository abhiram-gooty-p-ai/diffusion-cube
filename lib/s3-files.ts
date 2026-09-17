import 'server-only';

import { S3Client } from '@aws-sdk/client-s3';

const REQUIRED_S3_ENV = ['AWS_REGION', 'S3_BUCKET', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'] as const;

export type S3FileConfig = {
  region: string;
  bucket: string;
};

export function getS3FileConfig(): S3FileConfig | null {
  if (REQUIRED_S3_ENV.some((name) => !process.env[name])) return null;
  return {
    region: process.env.AWS_REGION!,
    bucket: process.env.S3_BUCKET!,
  };
}

export function getS3FileClient(): S3Client | null {
  const config = getS3FileConfig();
  if (!config) return null;
  return new S3Client({
    region: config.region,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      ...(process.env.AWS_SESSION_TOKEN ? { sessionToken: process.env.AWS_SESSION_TOKEN } : {}),
    },
  });
}

function folderPart(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 64) || 'adopter';
}

export function adopterPrefix(user: { id: string; name?: string | null; email?: string | null }): string {
  const displayName = user.name?.trim() || user.email?.split('@')[0] || 'adopter';
  // The readable name satisfies the folder requirement; the immutable user ID
  // prevents a renamed or duplicate adopter from sharing a namespace.
  return `adopters/${folderPart(displayName)}-${user.id}`;
}

export function adoptionFileKey(prefix: string, designId: string, safeFileName: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `${prefix}/adoptions/${designId}/${date}/${crypto.randomUUID()}-${safeFileName}`;
}
