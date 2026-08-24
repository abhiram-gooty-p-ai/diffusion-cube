import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { isAdmin } from '@/lib/roles';
import AppShell from '@/components/AppShell';
import ExploreLibrary from './ExploreLibrary';

// The Library — deliberately public, no login or registration required (see
// proxy.ts's PUBLIC_PATHS). Lives outside the (app) route group because that
// group's layout gates on account approval, which doesn't apply here. A
// signed-in visitor still gets the normal Sidebar shell (AppShell, shared
// with (app)/layout.tsx) so the app doesn't visually change out from under
// them; a genuinely anonymous visitor gets the same shell with everything
// role-gated hidden, since Sidebar already degrades gracefully with no user.
export default async function PublicExplorePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <AppShell email={null} adoptions={[]} isAdmin={false}>
        <ExploreLibrary />
      </AppShell>
    );
  }

  // proxy.ts only sets this header once a session is confirmed — true here.
  const email = (await headers()).get('x-user-email');

  const [{ data: adoptions }, adminAccess] = await Promise.all([
    supabase.from('designs').select('id, meta, updated_at').order('updated_at', { ascending: false }),
    isAdmin(supabase, email),
  ]);

  return (
    <AppShell email={email} adoptions={adoptions ?? []} isAdmin={adminAccess}>
      <ExploreLibrary signedIn />
    </AppShell>
  );
}
