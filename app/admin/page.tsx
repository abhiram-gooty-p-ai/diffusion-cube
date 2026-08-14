import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin, type Role } from '@/lib/roles';
import AdminDashboard, { AdminUserRow } from '@/components/AdminDashboard';
import PathwaySubmissionsPanel, { PathwaySubmissionRow } from '@/components/PathwaySubmissionsPanel';

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdmin(supabase, user?.email))) {
    redirect('/');
  }

  const admin = createAdminClient();
  const [{ data: usersData }, { data: rolesData }, { data: submissionsData }, { data: publishedData }, { data: execSummariesData }] =
    await Promise.all([
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
    ]);

  const slugBySubmission = new Map<string, string>();
  for (const p of publishedData ?? []) {
    if (p.source_submission_id) slugBySubmission.set(p.source_submission_id, p.slug);
  }

  const execSummaryBySubmission = new Map<string, string>();
  for (const s of execSummariesData ?? []) {
    execSummaryBySubmission.set(s.submission_id, s.content);
  }

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

      <h2 className="font-display text-lg font-medium text-navy mt-10 mb-1">Pathway Submissions</h2>
      <p className="text-sm text-ink-soft mb-4">
        Drafts users approved from their own adoption — review before adding any of them to the wiki.
      </p>
      <PathwaySubmissionsPanel initialRows={submissionRows} />
    </div>
  );
}
