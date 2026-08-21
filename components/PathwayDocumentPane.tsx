'use client';

import { useState } from 'react';
import Link from 'next/link';
import WikiMarkdown from '@/components/WikiMarkdown';

interface Props {
  markdown: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onPublish: (commitMessage: string) => Promise<{ ok: boolean; slug?: string; error?: string }>;
  // Set once this adoption's contribution has ever been pushed live.
  publishedSlug: string | null;
}

// A persistent side panel next to the chat — read-only preview plus a
// Publish button. Revisions happen entirely through chat (see
// contributorSystemPrompt's pathwayAction contract), not in this pane.
export default function PathwayDocumentPane({ markdown, loading, error, onClose, onPublish, publishedSlug }: Props) {
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

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
          {publishedSlug && (
            <p className="text-xs text-ink-soft">
              Published ·{' '}
              <Link href={`/wiki/${publishedSlug}`} className="text-coral hover:underline">
                View it live →
              </Link>
            </p>
          )}
        </div>
        <button onClick={onClose} aria-label="Close" className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy">
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {error && <p className="text-sm text-coral">{error}</p>}
        {!error && !markdown && loading && <p className="animate-pulse text-sm text-ink-soft">Drafting your pathway page…</p>}
        {!error && markdown && <WikiMarkdown markdown={markdown} />}
      </div>

      {!error && markdown && (
        <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-navy/10 p-3">
          {publishError && <p className="mr-auto text-xs text-coral">{publishError}</p>}
          <button
            onClick={handlePublish}
            disabled={publishing || loading}
            className="flex-shrink-0 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
          >
            {publishing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      )}
    </div>
  );
}
