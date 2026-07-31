'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs text-ink-soft hover:text-coral border border-navy/15 rounded-lg px-2.5 py-1 transition-colors flex-shrink-0"
    >
      Sign out
    </button>
  );
}
