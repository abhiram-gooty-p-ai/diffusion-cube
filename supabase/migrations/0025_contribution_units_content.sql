-- Add content column to contribution_units so unit text lives in the DB
-- alongside its metadata, rather than in a separate GitHub draft file.
-- git_commit_sha is no longer used (no per-contributor draft files on GitHub).

alter table public.contribution_units
  add column if not exists content text;

alter table public.contribution_units
  drop column if exists git_commit_sha;
