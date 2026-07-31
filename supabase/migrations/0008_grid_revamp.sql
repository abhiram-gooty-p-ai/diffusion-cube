-- The 100 Pathways revamp: the 7-dimension cube_state is replaced by a
-- 4 dimensions × 4 stages coverage grid (see lib/dimensions.ts). Existing
-- rows carry the old incompatible shape and were confirmed as test data —
-- cleared rather than migrated (deleting designs cascades design_documents).
delete from public.designs;

alter table public.designs rename column cube_state to grid_state;
