import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin, type Role } from '@/lib/roles';
import AdminDashboard, { AdminUserRow } from '@/components/AdminDashboard';
import AdminPathwayPublishRequestsPanel, {
  PathwayPublishRequestRow,
} from '@/components/AdminPathwayPublishRequestsPanel';
import AdminPathwaysPanel, { AdminPathwayRow } from '@/components/AdminPathwaysPanel';
import AdminContributorRegistrationsPanel, {
  AdminContributorRegistrationRow,
} from '@/components/AdminContributorRegistrationsPanel';

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdmin(supabase, user?.email))) {
    redirect('/');
  }

  const admin = createAdminClient();
  const [
    { data: usersData },
    { data: rolesData },
    { data: publishRequestsData },
    { data: pathwaysData },
    { data: pathwayContributorsData },
    { data: registrationsData },
  ] = await Promise.all([
      admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      admin.from('user_roles').select('user_id, role'),
      admin
        .from('pathway_publish_requests')
        .select('id, requested_by, content, status, created_at, pathways(slug, title)')
        .order('created_at', { ascending: false }),
      admin.from('pathways').select('id, slug, title, sector, created_at').order('created_at', { ascending: false }),
      admin.from('pathway_contributors').select('pathway_id'),
      admin
        .from('contributor_registrations')
        .select('id, poc_name, poc_email, organisation_name, pathway_role, pathway_description, access_status, created_at')
        .order('created_at', { ascending: false }),
    ]);

  const contributorCountByPathway = new Map<string, number>();
  for (const c of pathwayContributorsData ?? []) {
    contributorCountByPathway.set(c.pathway_id, (contributorCountByPathway.get(c.pathway_id) ?? 0) + 1);
  }

  const registrationRows: AdminContributorRegistrationRow[] = (registrationsData ?? []).map((r) => ({
    id: r.id,
    pocName: r.poc_name ?? '',
    pocEmail: r.poc_email ?? '',
    organisationName: r.organisation_name ?? '',
    pathwayRole: r.pathway_role ?? '',
    pathwayDescription: r.pathway_description ?? '',
    accessStatus: r.access_status,
    createdAt: r.created_at,
  }));

  const pathwayRows: AdminPathwayRow[] = (pathwaysData ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    sector: p.sector ?? '',
    created_at: p.created_at,
    contributorCount: contributorCountByPathway.get(p.id) ?? 0,
  }));

  const rolesByUser = new Map<string, Role[]>();
  for (const row of rolesData ?? []) {
    const list = rolesByUser.get(row.user_id) ?? [];
    list.push(row.role);
    rolesByUser.set(row.user_id, list);
  }

  const emailByUserId = new Map<string, string>();
  for (const u of usersData?.users ?? []) {
    emailByUserId.set(u.id, u.email ?? '');
  }

  const rows: AdminUserRow[] = (usersData?.users ?? [])
    .map((u) => ({
      id: u.id,
      email: u.email ?? '',
      name: (u.user_metadata?.name as string) ?? '',
      organization: (u.user_metadata?.organization as string) ?? '',
      roles: rolesByUser.get(u.id) ?? [],
    }))
    .sort((a, b) => a.roles.length - b.roles.length);

  const publishRequestRows: PathwayPublishRequestRow[] = (publishRequestsData ?? []).map((r) => {
    const pathwayRef = r.pathways as unknown as { slug: string; title: string } | { slug: string; title: string }[] | null;
    const pathway = Array.isArray(pathwayRef) ? pathwayRef[0] : pathwayRef;
    return {
      id: r.id,
      pathwayTitle: pathway?.title ?? '',
      pathwaySlug: pathway?.slug ?? '',
      requestedByEmail: (r.requested_by && emailByUserId.get(r.requested_by)) || '',
      content: r.content,
      status: r.status,
      createdAt: r.created_at,
    };
  });

  return (
    <div className="min-h-screen bg-paper text-ink p-8">
      <Link href="/" className="text-xs text-ink-soft hover:text-coral transition-colors">
        ← Back
      </Link>
      <h1 className="font-display text-2xl font-medium text-navy mt-2 mb-1">Admin</h1>
      <p className="text-sm text-ink-soft mb-6">Approve signups and manage roles.</p>
      <AdminDashboard initialRows={rows} />

      <h2 className="font-display text-lg font-medium text-navy mt-10 mb-1">Contributor Registrations</h2>
      <p className="text-sm text-ink-soft mb-4">
        Approve to grant the Contributor role and let them start joining/creating pathways. Reject to turn them away.
      </p>
      <AdminContributorRegistrationsPanel initialRows={registrationRows} />

      <h2 className="font-display text-lg font-medium text-navy mt-10 mb-1">Pathway Publish Requests</h2>
      <p className="text-sm text-ink-soft mb-4">
        A contributor&rsquo;s request to publish or update a pathway page. Approve to commit it live; reject to turn
        it down — they can resubmit anytime.
      </p>
      <AdminPathwayPublishRequestsPanel initialRows={publishRequestRows} />

      <h2 className="font-display text-lg font-medium text-navy mt-10 mb-1">Pathways</h2>
      <p className="text-sm text-ink-soft mb-4">
        Every pathway contributors can join or have joined. Delete to remove a pathway and its contribution units
        from the database — does not touch anything already published to GitHub.
      </p>
      <AdminPathwaysPanel initialRows={pathwayRows} />
    </div>
  );
}
