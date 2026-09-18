import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Called by the client immediately after a successful sign-up so a brand-new
// account lands with the 'adopter' role already in place — no admin approval
// wait for the Analyse flow. user_roles has RLS with no client-side insert
// policy (migration 0006), so this has to go through the service-role client.
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from('user_roles').insert({ user_id: user.id, role: 'adopter' });

  // 23505 = unique_violation — the (user_id, role) row already exists, which
  // is the desired end state anyway, so treat it as success and let a retry
  // or second call be a no-op.
  if (error && error.code !== '23505') {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
