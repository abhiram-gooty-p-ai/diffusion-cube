-- Extend contributor_registrations with org registry link, audit timestamp,
-- access lifecycle status, and attribution consent fields.
--
-- org_id links to the organisations table. For existing orgs the app sets
-- this from the selected org; for new orgs the admin confirms the org into
-- the registry on approval and backfills this FK via service-role.
--
-- access_status drives the approval gate:
--   'pending'  — submitted, awaiting admin review (default)
--   'approved' — admin approved; pathway_contributor role also granted
--   'rejected' — admin rejected; user sees a rejection message
--
-- share_name / share_contact are attribution consent flags surfaced to
-- Explorers. Both default off and are independently revocable.

alter table public.contributor_registrations
  add column if not exists org_id uuid references public.organisations (id) on delete set null,
  add column if not exists terms_accepted_at timestamptz,
  add column if not exists access_status text not null default 'pending'
    check (access_status in ('pending', 'approved', 'rejected')),
  add column if not exists share_name boolean not null default false,
  add column if not exists share_contact boolean not null default false,
  add column if not exists contact_info text not null default '';

-- Admin needs to read and update access_status for the approval flow.
create policy "Admins can view all contributor registrations"
  on public.contributor_registrations for select
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
