'use client';

import { useState } from 'react';
import AdoptionWorkspace, { PICK_INTENT_LABEL } from '@/components/AdoptionWorkspace';

// /explore always starts a fresh adoption, so "back to the intent menu" means
// a brand-new workspace rather than a navigation — the App Router won't
// remount a route you're already on, and the conversation lives inside
// AdoptionWorkspace's own hook. Bumping this key remounts it with a null
// conversation, which is exactly the menu state. Nothing is lost: the row is
// already persisted and reopens from /adoptions.
export default function ExploreWorkspace() {
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <AdoptionWorkspace
      key={`explore-${sessionKey}`}
      initial={null}
      fixedFlow="explorer"
      onBack={() => setSessionKey((k) => k + 1)}
      backLabel={PICK_INTENT_LABEL}
    />
  );
}
