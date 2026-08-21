-- Retire pathway_submissions and all dependent tables — replaced by
-- contribution_units (individual tagged units) + GitHub draft files.
--
-- Dependency order:
--   1. Drop the FK on published_pathways (on delete set null, so no data
--      loss — the column stays as an inert audit field).
--   2. Drop pathway_submission_exec_summaries (FK + RLS policies reference
--      pathway_submissions directly).
--   3. Drop pathway_submission_versions (FK to pathway_submissions).
--   4. Drop pathway_submissions.

alter table public.published_pathways
  drop constraint if exists published_pathways_source_submission_id_fkey;

drop table if exists public.pathway_submission_exec_summaries;
drop table if exists public.pathway_submission_versions;
drop table if exists public.pathway_submissions;
