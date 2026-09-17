'use client';

import { useState } from 'react';
import WikiMarkdown from '@/components/WikiMarkdown';
import PathwayFrontmatterBlock from '@/components/PathwayFrontmatterBlock';
import { createClient } from '@/lib/supabase/client';
import { stripFrontmatter, parseFrontmatter } from '@/lib/strip-frontmatter';
import type { AdminPathwayRow } from '@/components/AdminPathwaysPanel';

interface Props {
  row: AdminPathwayRow;
  isPending: boolean;
  onPublish: () => void;
  onRemove: () => void;
}

export default function AdminPathwayRowCard({ row, isPending, onPublish, onRemove }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [docContent, setDocContent] = useState<string | null>(null);
  const [docLoading, setDocLoading] = useState(false);

  const status = row.reviewRequested ? 'awaiting' : row.isPublished ? 'published' : 'draft';

  async function handleToggle() {
    if (expanded) {
      setExpanded(false);
      return;
    }
    setExpanded(true);
    if (docContent !== null) return; // already fetched
    setDocLoading(true);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('pathways')
        .select('content_cache')
        .eq('id', row.id)
        .maybeSingle();
      setDocContent(data?.content_cache ?? '');
    } finally {
      setDocLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-navy/10 bg-white overflow-hidden">
      {/* Row header — always visible */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 flex-wrap">
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-2 min-w-0 text-left"
        >
          <span className={`text-ink-soft text-xs transition-transform ${expanded ? 'rotate-90' : ''}`}>▶</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-navy">{row.title}</span>
              {status === 'published' && (
                <span className="rounded-full bg-coral/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-coral">
                  Published
                </span>
              )}
              {status === 'awaiting' && (
                <span className="rounded-full bg-yellow/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-navy">
                  Awaiting Review
                </span>
              )}
            </div>
            <p className="text-xs text-ink-soft mt-0.5">
              {row.sector || 'No sector'} · {new Date(row.created_at).toLocaleDateString()}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          {status === 'awaiting' && (
            <button
              type="button"
              onClick={onPublish}
              disabled={isPending}
              className="rounded-lg bg-navy px-2.5 py-1 text-xs font-medium text-white transition hover:bg-coral disabled:opacity-50"
            >
              {isPending ? 'Publishing…' : 'Publish'}
            </button>
          )}
          <button
            type="button"
            onClick={onRemove}
            disabled={isPending}
            className="rounded-lg border border-coral/30 px-2.5 py-1 text-xs font-medium text-coral transition hover:bg-coral hover:text-white disabled:opacity-50"
          >
            {isPending && status !== 'awaiting' ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Expanded document view */}
      {expanded && (
        <div className="border-t border-navy/10 px-6 py-4 max-h-[60vh] overflow-y-auto bg-paper/60">
          {docLoading && (
            <p className="animate-pulse text-sm text-ink-soft">Loading document…</p>
          )}
          {!docLoading && !docContent && (
            <p className="text-sm text-ink-soft italic">No assembled document yet.</p>
          )}
          {!docLoading && docContent && (() => {
            const fm = parseFrontmatter(docContent);
            return (
              <>
                {fm && <PathwayFrontmatterBlock fm={fm} />}
                <WikiMarkdown markdown={stripFrontmatter(docContent)} />
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
