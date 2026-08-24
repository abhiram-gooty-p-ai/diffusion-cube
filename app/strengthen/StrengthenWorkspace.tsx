'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdoptionWorkspace, { PICK_INTENT_LABEL } from '@/components/AdoptionWorkspace';
import { AdoptionConversation } from '@/lib/adoption-conversation';
import { fetchAdoption } from '@/lib/adoptions-cache';

// /strengthen owns Explorer sessions end to end: starting a new one from the
// intent menu, and reopening a past one via ?open=<id> (the sidebar's "Recent
// Explorations" links here rather than to the /adoptions grid, so the way
// back is always the intent menu rather than someone else's list view).
//
// "Back to the menu" is a remount, not a navigation — the App Router won't
// remount a route you're already on, and the conversation lives inside
// AdoptionWorkspace's own hook. Bumping the key gives it a null conversation,
// which is exactly the menu state. Nothing is lost either way: the row is
// already persisted and reopens from the sidebar or /adoptions.
function StrengthenWorkspaceContent() {
  const router = useRouter();
  const openId = useSearchParams().get('open');

  const [sessionKey, setSessionKey] = useState(0);
  const [opened, setOpened] = useState<AdoptionConversation | null>(null);
  // Which id `opened` actually reflects, so "still loading" is derived rather
  // than tracked as its own state that has to be kept in sync.
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  useEffect(() => {
    if (!openId) return;
    let cancelled = false;
    fetchAdoption(openId)
      .then((row) => {
        if (cancelled) return;
        // A Contributor row deep-linked here would render the wrong flow, so
        // anything that isn't an Explorer adoption falls back to the menu.
        setOpened(row && row.meta.flow === 'explorer' ? row : null);
        setLoadedFor(openId);
      })
      .catch(() => {
        if (cancelled) return;
        setOpened(null);
        setLoadedFor(openId);
      });
    return () => {
      cancelled = true;
    };
  }, [openId]);

  const loading = Boolean(openId) && loadedFor !== openId;
  const initial = openId && loadedFor === openId ? opened : null;

  function backToMenu() {
    setSessionKey((k) => k + 1);
    // Drop ?open= so a reload (or the effect above re-running) doesn't
    // immediately reopen the conversation we just backed out of.
    if (openId) router.replace('/strengthen');
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-paper">
        <p className="animate-pulse text-sm text-ink-soft">Opening your exploration…</p>
      </div>
    );
  }

  return (
    <AdoptionWorkspace
      key={`strengthen-${sessionKey}-${initial?.id ?? 'new'}`}
      initial={initial}
      fixedFlow="explorer"
      onBack={backToMenu}
      backLabel={PICK_INTENT_LABEL}
    />
  );
}

export default function StrengthenWorkspace() {
  // useSearchParams needs a Suspense boundary to keep the route from opting
  // the whole page into client-side rendering — same pattern /adoptions uses.
  return (
    <Suspense fallback={<div className="flex-1 bg-paper" />}>
      <StrengthenWorkspaceContent />
    </Suspense>
  );
}
