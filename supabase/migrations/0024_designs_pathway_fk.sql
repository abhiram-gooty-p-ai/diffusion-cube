-- Link contributor workspaces to their pathway. Explorer designs stay null
-- (pathway_id is not applicable to the Explorer flow). If a pathway is ever
-- deleted the design is not deleted — it becomes unlinked (set null).
alter table public.designs
  add column if not exists pathway_id uuid references public.pathways (id) on delete set null;
