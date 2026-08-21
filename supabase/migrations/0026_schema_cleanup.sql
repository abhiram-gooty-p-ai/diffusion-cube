-- contributor_registrations: drop unused columns, rename for clarity
alter table public.contributor_registrations
  drop column if exists organisation_type,
  drop column if exists poc_phone;

alter table public.contributor_registrations
  rename column pathway_name to pathway_description;

alter table public.contributor_registrations
  rename column poc_role to pathway_role;

-- pathway_contributors: rename org_role to role (it's the org's relationship
-- to the deployment, not a personal designation)
alter table public.pathway_contributors
  rename column org_role to role;
