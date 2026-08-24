-- Short description captured when a pathway is first created — used by the
-- "Start a new pathway" duplicate check (see PathwaySelector.tsx) to compare
-- against more than just the title, and shown in the pathway picker so a
-- contributor can tell pathways with similar titles apart.
alter table public.pathways add column if not exists description text not null default '';
