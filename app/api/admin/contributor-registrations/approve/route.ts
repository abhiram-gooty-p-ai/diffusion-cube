import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/roles';
import { ensureOrganisation } from '@/lib/organisations';

// Approving a registration does two things: flips access_status so /contribute
// stops showing the "under review" screen, and grants the pathway_contributor
// role so the role-gate in app/(app)/contribute/page.tsx actually lets them
// through — access_status alone isn't enough, matching how the rest of this
// app treats role grants as the real gate (see lib/roles.ts).
//
// Also backfills contributor_registrations.org_id here if it's still null —
// this is the "admin confirms the org into the registry on approval" step
// migration 0023's own comment describes. Same ensureOrganisation() the join
// route uses, so an org typed here and one picked from the autocomplete both
// resolve to the same row rather than creating a duplicate.
export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!(await isAdmin(supabase, user?.email))) {
    return Response.json({ error: 'Not authorized.' }, { status: 403 });
  }

  const { registration_id } = await req.json();
  if (typeof registration_id !== 'string') {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: registration, error: fetchError } = await admin
    .from('contributor_registrations')
    .select('user_id, organisation_name, pathway_role, public_links, org_id')
    .eq('id', registration_id)
    .single();

  if (fetchError || !registration) {
    return Response.json({ error: fetchError?.message ?? 'Registration not found.' }, { status: 404 });
  }

  if (!registration.org_id) {
    try {
      const orgId = await ensureOrganisation(
        registration.organisation_name,
        registration.pathway_role,
        registration.public_links ?? ''
      );
      await admin.from('contributor_registrations').update({ org_id: orgId }).eq('id', registration_id);
    } catch (err) {
      return Response.json({ error: String(err) }, { status: 500 });
    }
  }

  const { error: statusError } = await admin
    .from('contributor_registrations')
    .update({ access_status: 'approved' })
    .eq('id', registration_id);
  if (statusError) return Response.json({ error: statusError.message }, { status: 500 });

  const { error: roleError } = await admin
    .from('user_roles')
    .upsert({ user_id: registration.user_id, role: 'pathway_contributor' }, { onConflict: 'user_id,role' });
  if (roleError) return Response.json({ error: roleError.message }, { status: 500 });

  return Response.json({ ok: true });
}
