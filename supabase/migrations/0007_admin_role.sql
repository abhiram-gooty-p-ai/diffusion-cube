-- Promotes 'admin' from a pure env-var allowlist (ADMIN_EMAILS) into a real,
-- database-managed role — grantable the same way as the other three, via
-- /admin itself or a direct Supabase edit. ADMIN_EMAILS stays as a permanent
-- fallback in code (see lib/roles.ts's isAdmin) so there's no bootstrapping
-- problem: the addresses listed there always have access even if their
-- user_roles row is ever missing or deleted.
alter table public.user_roles drop constraint user_roles_role_check;
alter table public.user_roles add constraint user_roles_role_check
  check (role in ('general_user', 'adopter', 'pathway_contributor', 'admin'));

-- Seeds the two known admins by email — only inserts for accounts that
-- already exist in auth.users; anyone who hasn't signed up yet needs to do
-- so first, then be granted the role (via /admin or another direct insert).
insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email in ('abhiram@peopleplus.ai', 'kamesh@ekstep.org')
on conflict (user_id, role) do nothing;
