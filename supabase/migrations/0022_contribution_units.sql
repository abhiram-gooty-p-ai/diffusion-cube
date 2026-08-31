-- Individual tagged content atoms. Every piece of content a contributor
-- authors lives here as a row — no content text stored, only the index
-- and metadata. The actual text lives in the contributor's GitHub draft file,
-- addressed by unit_internal_id (matches the <!-- unit-id: --> HTML comment).
--
-- Two kinds of unit (section column):
--   'identity'        — a Pathway Identity field (Section 1): name, sector,
--                       stage, problem, solution. First contributor only;
--                       others cannot insert identity units for a pathway
--                       they didn't create.
--   'micro-innovation'— a Section 3 entry: one of the five framework types.
--                       Any contributor can add these.
--
-- Assembly ordering for Section 3: bucket by dimension → stage, then
-- published_at as tiebreaker within the same dimension+stage cell.
create table if not exists public.contribution_units (
  id uuid primary key default gen_random_uuid(),

  -- Stable internal address — matches the <!-- unit-id: --> comment in
  -- the contributor's draft file. Unique within a pathway.
  unit_internal_id text not null,

  pathway_id uuid not null references public.pathways (id) on delete cascade,
  design_id  uuid references public.designs (id) on delete set null,
  user_id    uuid not null references auth.users (id) on delete cascade,

  -- 'identity' | 'micro-innovation'
  section text not null check (section in ('identity', 'micro-innovation')),

  -- For identity units: 'name' | 'sector' | 'stage' | 'problem' | 'solution'
  -- For micro-innovation units: 'strategic-decision' | 'tactical-decision' |
  --   'failure-fix' | 'playbook' | 'toolkit-asset'
  unit_type text not null,

  -- 4x4 grid tags — used by assembly code to compute Section 2 without
  -- parsing the document. Nullable for identity units (grid doesn't apply).
  dimension text check (dimension in ('persona', 'solution', 'institution', 'ecosystem')),
  stage     text check (stage     in ('explore', 'define', 'pilot', 'scale')),
  density   text check (density   in ('primary', 'secondary', 'dormant')),

  -- The source document this unit was extracted from, captured by the LLM
  -- at extraction time. Used to compile the Source Trace appendix.
  source_doc text not null default '',

  -- SHA of the GitHub commit where this unit was last written to the draft
  -- file. Used for reconciliation if the DB cache update fails after a
  -- successful GitHub commit.
  git_commit_sha text,

  -- null = pending (draft); non-null = published (included in assembled file).
  published_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (pathway_id, unit_internal_id)
);

alter table public.contribution_units enable row level security;

-- A contributor sees their own units (including drafts) plus all published
-- units from other contributors.
create policy "Contributors see own units and others' published units"
  on public.contribution_units for select
  using (
    auth.uid() is not null
    and (published_at is not null or auth.uid() = user_id)
  );

-- Contributors can insert their own units.
create policy "Contributors can insert their own units"
  on public.contribution_units for insert
  with check (auth.uid() = user_id);

-- THE EDIT BOUNDARY: a contributor can only update units they authored.
-- This is the database-layer enforcement of the rule that no contributor
-- can edit or overwrite content tagged to a different contributor.
create policy "Contributors can only update their own units"
  on public.contribution_units for update
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);
