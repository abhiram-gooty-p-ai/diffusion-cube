'use client';

import { useRouter } from 'next/navigation';
import ContributorRegistrationGate from '@/components/ContributorRegistrationGate';

// Thin client wrapper so the actual gate/form (components/ContributorRegistrationGate)
// stays reusable and doesn't need to know about routing. On success, refresh
// re-runs the server component in page.tsx, which now finds the row and
// renders ContributeGrid instead — no separate client-side state to keep in
// sync with the database.
export default function ContributeAccessGate({ userId }: { userId: string }) {
  const router = useRouter();
  return <ContributorRegistrationGate userId={userId} onRegistered={() => router.refresh()} />;
}
