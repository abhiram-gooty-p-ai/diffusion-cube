-- Curated library resources can be placed in S3 without a contributor's
-- temporary adoption workspace. Keep the bucket private; object_key is only
-- ever resolved through /resources/:id after publication.
alter table public.pathway_resources
  add column if not exists object_key text,
  add column if not exists content_type text;

do $$
declare source_constraint text;
begin
  select conname into source_constraint
  from pg_constraint
  where conrelid = 'public.pathway_resources'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%adoption_file_id%';
  if source_constraint is not null then
    execute format('alter table public.pathway_resources drop constraint %I', source_constraint);
  end if;
end $$;

alter table public.pathway_resources
  add constraint pathway_resources_one_source
  check (num_nonnulls(adoption_file_id, external_url, object_key) = 1);
