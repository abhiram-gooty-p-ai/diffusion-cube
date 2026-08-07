'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiMarkdown from '@/components/WikiMarkdown';
import type { PathwaySubmissionVersionRow } from '@/lib/pathway-submission-versions';

interface Props {
  markdown: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onPublish: (commitMessage: string) => Promise<{ ok: boolean; slug?: string; error?: string }>;
  versions: PathwaySubmissionVersionRow[];
  selectedVersionNumber?: number;
  onSelectVersion: (versionNumber: number) => void;
  // Set once this submission has ever been pushed live — drives the "View
  // it live" link, which is always valid once something is live, regardless
  // of which version is currently selected.
  publishedSlug: string | null;
  // What's actually live right now, compared against `markdown` (the
  // currently selected version) to decide "Published" vs "Draft" — a newer,
  // unpublished revision on an already-published submission must read
  // "Draft," not "Published," even though publishedSlug is set.
  publishedContent: string | null;
}

// A persistent side panel next to the chat (ChatGPT-canvas style) rather
// than a blocking modal — the conversation stays visible and usable while
// this is open. Revisions happen entirely through chat now (see
// contributorSystemPrompt's pathwayAction contract) — this pane is
// read-only plus a Publish button, not an editing surface.
export default function PathwayDocumentPane({
  markdown,
  loading,
  error,
  onClose,
  onPublish,
  versions,
  selectedVersionNumber,
  onSelectVersion,
  publishedSlug,
  publishedContent,
}: Props) {
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const isLatestVersionSelected = versions.length === 0 || selectedVersionNumber === versions[0]?.version_number;
  // Compared by content, not just "has this submission ever been
  // published" — the label reflects the version actually being shown.
  const isSelectedVersionLive = publishedContent !== null && markdown === publishedContent;

  async function handlePublish() {
    setPublishing(true);
    setPublishError(null);
    try {
      const result = await onPublish('Update pathway page');
      if (!result.ok) setPublishError(result.error || 'Could not publish. Try again.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="flex h-full min-w-0 flex-col bg-paper text-ink">
      <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-2 border-b border-navy/10 p-3">
        <div>
          <h2 className="font-display text-sm font-medium text-navy">Pathway Document</h2>
          <p className="text-xs text-ink-soft">
            {selectedVersionNumber ? `v${selectedVersionNumber}` : ''}
            {selectedVersionNumber && (isSelectedVersionLive ? ' · Published' : ' · Draft')}
            {isSelectedVersionLive && publishedSlug && (
              <>
                {' · '}
                <Link href={`/wiki/${publishedSlug}`} className="text-coral hover:underline">
                  View it live →
                </Link>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {versions.length > 1 && (
            <select
              value={selectedVersionNumber}
              onChange={(e) => onSelectVersion(Number(e.target.value))}
              className="rounded-lg border border-navy/15 bg-white px-2 py-1 text-xs text-ink"
              aria-label="Select version"
            >
              {versions.map((v) => (
                <option key={v.version_number} value={v.version_number}>
                  v{v.version_number} — {new Date(v.created_at).toLocaleDateString()}
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
        <div className="flex flex-shrink-0 flex-col gap-2 border-t border-navy/10 p-3">
          {!isLatestVersionSelected && (
            <p className="text-xs text-ink-soft">Viewing an older version — publishing always pushes the latest version.</p>
          )}
          <div className="flex items-center justify-end gap-2">
            {publishError && <p className="mr-auto text-xs text-coral">{publishError}</p>}
            <button
              onClick={handlePublish}
              disabled={publishing || loading}
              className="flex-shrink-0 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
            >
              {publishing ? 'Publishing…' : 'Publish'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
