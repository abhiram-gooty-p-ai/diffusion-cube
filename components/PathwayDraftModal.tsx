'use client';

import { useState } from 'react';
import WikiMarkdown from '@/components/WikiMarkdown';

interface Props {
  markdown: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onApprove: (finalText: string) => Promise<void>;
}

export default function PathwayDraftModal({ markdown, loading, error, onClose, onApprove }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(markdown);
  const [lastMarkdown, setLastMarkdown] = useState(markdown);
  const [approving, setApproving] = useState(false);
  const [approved, setApproved] = useState(false);
  const [approveError, setApproveError] = useState<string | null>(null);

  // Keep the editable draft in sync while the generation is still streaming
  // in — once the user starts editing, stop overwriting their changes.
  // Adjusted during render (React's documented pattern), not in an effect.
  if (markdown !== lastMarkdown) {
    setLastMarkdown(markdown);
    if (!editing) setDraft(markdown);
  }

  async function handleApprove() {
    setApproving(true);
    setApproveError(null);
    try {
      await onApprove(draft);
      setApproved(true);
    } catch {
      setApproveError('Could not submit this draft. Try again.');
    } finally {
      setApproving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-3 sm:p-6">
      <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-paper text-ink shadow-xl">
        <div className="flex flex-shrink-0 flex-wrap items-center justify-between gap-2 border-b border-navy/10 p-4">
          <div>
            <h2 className="font-display text-lg font-medium text-navy">Review as Wiki Page</h2>
            <p className="text-xs text-ink-soft">
              A preview of how this adoption would read as a pathway page — nothing is submitted until you approve.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!approved && (
              <button
                onClick={() => setEditing((v) => !v)}
                disabled={loading || !markdown}
                className="rounded-lg border border-navy/20 px-3 py-1.5 text-xs font-medium text-navy transition hover:border-coral hover:text-coral disabled:opacity-40"
              >
                {editing ? 'Preview' : 'Edit'}
              </button>
            )}
            <button onClick={onClose} aria-label="Close" className="px-1 text-lg leading-none text-ink-soft transition hover:text-navy">
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && <p className="text-sm text-coral">{error}</p>}

          {!error && approved && (
            <div className="rounded-xl border border-navy/10 bg-white p-4 text-sm text-ink-soft">
              Submitted. An admin will review it before it&apos;s ever added to the wiki — nothing changed on your
              end beyond this.
            </div>
          )}

          {!error && !approved && !markdown && loading && (
            <p className="animate-pulse text-sm text-ink-soft">Drafting your pathway page…</p>
          )}

          {!error && !approved && markdown && editing && (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-full min-h-[50vh] w-full resize-none rounded-xl border border-navy/15 bg-white p-3 font-mono text-xs text-ink focus:border-coral focus:outline-none"
            />
          )}

          {!error && !approved && markdown && !editing && <WikiMarkdown markdown={draft} />}
        </div>

        {!error && !approved && markdown && (
          <div className="flex flex-shrink-0 items-center justify-end gap-2 border-t border-navy/10 p-4">
            {approveError && <p className="mr-auto text-xs text-coral">{approveError}</p>}
            <button
              onClick={handleApprove}
              disabled={approving || loading}
              className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral disabled:opacity-40"
            >
              {approving ? 'Submitting…' : 'Approve'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
