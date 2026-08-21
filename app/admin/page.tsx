import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin, type Role } from '@/lib/roles';
import AdminDashboard, { AdminUserRow } from '@/components/AdminDashboard';
import PathwaySubmissionsPanel, { PathwaySubmissionRow } from '@/components/PathwaySubmissionsPanel';
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
    { data: submissionsData },
    { data: publishedData },
    { data: execSummariesData },
    { data: pathwaysData },
    { data: pathwayContributorsData },
    { data: registrationsData },
  ] = await Promise.all([
      admin.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      admin.from('user_roles').select('user_id, role'),
      admin
        .from('pathway_submissions')
        .select('id, design_id, content, status, created_at, designs(meta)')
        .order('created_at', { ascending: false }),
      admin.from('published_pathways').select('slug, source_submission_id'),
      // Backend-only, admin-visible-only artifact — see PathwaySubmissionsPanel
      // and lib/system-prompts.ts's pathwaySubmissionExecutiveSummarySystemPrompt.
      // Read here via the service-role client since RLS grants contributors no
      // select policy on this table at all (see migration 0015).
      admin.from('pathway_submission_exec_summaries').select('submission_id, content'),
      admin.from('pathways').select('id, slug, title, sector, created_at').order('created_at', { ascending: false }),
      admin.from('pathway_contributors').select('pathway_id'),
      admin
        .from('contributor_registrations')
        .select('id, poc_name, poc_email, organisation_name, pathway_role, pathway_description, access_status, created_at')
        .order('created_at', { ascending: false }),
    ]);

  const slugBySubmission = new Map<string, string>();
  for (const p of publishedData ?? []) {
    if (p.source_submission_id) slugBySubmission.set(p.source_submission_id, p.slug);
  }

  const execSummaryBySubmission = new Map<string, string>();
  for (const s of execSummariesData ?? []) {
    execSummaryBySubmission.set(s.submission_id, s.content);
  }

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

  const rows: AdminUserRow[] = (usersData?.users ?? [])
    .map((u) => ({
      id: u.id,
      email: u.email ?? '',
      name: (u.user_metadata?.name as string) ?? '',
      organization: (u.user_metadata?.organization as string) ?? '',
      roles: rolesByUser.get(u.id) ?? [],
    }))
    .sort((a, b) => a.roles.length - b.roles.length);

  const submissionRows: PathwaySubmissionRow[] = (submissionsData ?? []).map((s) => {
    const design = s.designs as unknown as { meta?: { name?: string } } | { meta?: { name?: string } }[] | null;
    const meta = Array.isArray(design) ? design[0]?.meta : design?.meta;
    return {
      id: s.id,
      adoptionName: meta?.name ?? '',
      content: s.content,
      status: s.status,
      created_at: s.created_at,
      slug: slugBySubmission.get(s.id),
      executiveSummary: execSummaryBySubmission.get(s.id),
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

      <h2 className="font-display text-lg font-medium text-navy mt-10 mb-1">Pathway Submissions</h2>
      <p className="text-sm text-ink-soft mb-4">
        Drafts users approved from their own adoption — review before adding any of them to the wiki.
      </p>
      <PathwaySubmissionsPanel initialRows={submissionRows} />

      <h2 className="font-display text-lg font-medium text-navy mt-10 mb-1">Pathways</h2>
      <p className="text-sm text-ink-soft mb-4">
        Every pathway contributors can join or have joined. Delete to remove a pathway and its contribution units
        from the database — does not touch anything already published to GitHub.
      </p>
      <AdminPathwaysPanel initialRows={pathwayRows} />
    </div>
  );
}
