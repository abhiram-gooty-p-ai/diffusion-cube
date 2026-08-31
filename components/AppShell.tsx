import Sidebar from '@/components/Sidebar';

interface AdoptionSummary {
  id: string;
  meta: { name?: string; flow?: string } | null;
  updated_at: string;
}

interface Props {
  email: string | null;
  adoptions: AdoptionSummary[];
  isAdmin: boolean;
  children: React.ReactNode;
}

// The Sidebar + content shell shared by the authenticated app ((app)/layout.tsx)
// and the always-public entry points (Explore, Strengthen, Contribute) — each
// of those is reachable without signing in, so none of them can rely on the
// authenticated layout's approval gate, but should still look like the same
// app for a signed-in visitor who lands there. Sidebar itself already
// degrades gracefully for an anonymous caller (email=null → "Sign in" instead
// of the account footer; nav items are always shown regardless).
export default function AppShell({ email, adoptions, isAdmin, children }: Props) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-paper md:flex-row">
      <Sidebar email={email} adoptions={adoptions} isAdmin={isAdmin} />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
