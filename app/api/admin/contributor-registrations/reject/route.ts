import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/roles';

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

  const { error } = await createAdminClient()
    .from('contributor_registrations')
    .update({ access_status: 'rejected' })
    .eq('id', registration_id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
