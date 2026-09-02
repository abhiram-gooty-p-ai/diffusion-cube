'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiMarkdown from '@/components/WikiMarkdown';
import type { VersionOption } from '@/components/AdoptionPlanModal';

interface Props {
  markdown: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onPublish: (commitMessage: string) => Promise<{ ok: boolean; error?: string }>;
  // Where the pathway's live document can be viewed, if it's been published
  // at least once — null if nothing has ever gone live for this pathway.
  liveHref: string | null;
  // 'published' means the markdown CURRENTLY SHOWN matches what's actually
  // live — not just "has this ever been published" — so a new generate/
  // revise, or an older version picked from the dropdown, drops back to
  // 'draft' even after a prior publish. 'pending' is set the moment a
  // publish request goes to the admin, until they approve or reject it;
  // 'rejected' shows after a turned-down request, cleared back to 'pending'
  // by publishing again (see PathwayDocState.publishStatus).
  status: 'draft' | 'pending' | 'published' | 'rejected';
  // Full version history, newest first — hidden when there's one or none.
  versions: VersionOption[];
  // null means "the latest" — see PathwayDocState.selectedVersionNumber.
  selectedVersionNumber: number | null;
  latestVersionNumber: number;
  onSelectVersion: (versionNumber: number) => void;
}

// A persistent side panel next to the chat — read-only preview, a version
// dropdown, and a Publish button. Revisions happen entirely through chat
// (see contributorSystemPrompt's pathwayAction contract), not in this pane —
// the dropdown is for browsing history, not editing. Publish always acts on
// the latest version regardless of which one is being viewed (see the
// disabled-Publish branch below).
export default function PathwayDocumentPane({
  markdown,
  loading,
  error,
  onClose,
  onPublish,
  liveHref,
  status,
  versions,
  selectedVersionNumber,
  latestVersionNumber,
  onSelectVersion,
}: Props) {
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  async function handlePublish() {
    setPublishing(true);
    setPublishError(null);
    try {
      const result = await onPublish('Update pathway page');
      if (!result.ok) setPublishError(result.error || 'Could not submit. Try again.');
    } finally {
      setPublishing(false);
    }
  }

  const statusLabel =
    status === 'pending' ? 'Pending review' : status === 'rejected' ? 'Not approved' : status === 'published' ? 'Published' : 'Draft';

  return (
    <div className="flex h-full min-w-0 flex-col bg-paper text-ink">
      <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-2 border-b border-navy/10 p-3">
        <div>
          <h2 className="font-display text-sm font-medium text-navy">Pathway Document</h2>
          <p className="text-xs text-ink-soft">
            {statusLabel}
            {liveHref && (
              <>
                {' '}
                ·{' '}
                <Link href={liveHref} className="text-coral hover:underline">
                  View it live →
                </Link>
              </>
            )}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          {versions.length > 1 && (
            <select
              value={selectedVersionNumber ?? latestVersionNumber}
              onChange={(e) => onSelectVersion(Number(e.target.value))}
              className="rounded-lg border border-navy/15 bg-white px-2 py-1.5 text-xs text-ink"
              aria-label="Select version"
            >
              {versions.map((v) => (
                <option key={v.version_number} value={v.version_number}>
                  v0.{v.version_number}
                  {v.version_number === latestVersionNumber ? ' (latest)' : ''} —{' '}
                  {new Date(v.created_at).toLocaleString()}
                </option>
              ))}
            </select>
          )}
          <button onClick={onClose} aria-label="Close" className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy">
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {error && <p className="text-sm text-coral">{error}</p>}
        {!error && !markdown && loading && <p className="animate-pulse text-sm text-ink-soft">Drafting your pathway page…</p>}
        {!error && markdown && <WikiMarkdown markdown={markdown} />}
      </div>

      {!error && markdown && (
        <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-navy/10 p-3">
          {publishError && <p className="mr-auto text-xs text-coral">{publishError}</p>}
          {selectedVersionNumber !== null && selectedVersionNumber !== latestVersionNumber ? (
            <p className="mr-auto text-xs text-ink-soft">
              Viewing v0.{selectedVersionNumber} — publishing always uses the latest version.
            </p>
          ) : status === 'pending' ? (
            <p className="mr-auto text-xs text-ink-soft">Submitted — waiting on admin approval.</p>
          ) : (
            <button
              onClick={handlePublish}
              disabled={publishing || loading}
              className="flex-shrink-0 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
            >
              {publishing ? 'Submitting…' : status === 'rejected' ? 'Resubmit' : 'Publish'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
