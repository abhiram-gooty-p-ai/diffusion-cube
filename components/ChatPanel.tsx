'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import HeatmapGrid from '@/components/HeatmapGrid';
import { downloadPlanAsPdf } from '@/lib/adoption-plan-pdf';
import {
  ANALYSIS_DOC_MARKER,
  DELIVERABLE_START,
  DELIVERABLE_END,
  EXEC_SUMMARY_MARKER,
  PATHWAY_DOC_MARKER,
} from '@/lib/grid-update';
import type { DocType } from '@/lib/design-documents';
import type { GridState } from '@/lib/dimensions';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  // Shown in the chat bubble instead of `content` — used for uploads, where
  // `content` carries the full extracted document text sent to the agent.
  displayContent?: string;
  // Set when the message carries one or more uploaded images — `content` then
  // holds a short instruction (plus any text-attachment content) and this
  // carries the actual bytes sent to the model.
  images?: Array<{ mediaType: string; base64: string }>;
  // Set transiently (never persisted) while a <deliverable> block is still
  // streaming in on the server — see adoption-conversation.ts's sendMessage,
  // which freezes the visible content and sets this instead of live-typing
  // the document out. Shows a "Generating your document…" placeholder.
  generatingDoc?: boolean;
  // Pathway slugs this assistant message drew on — parsed from <grid_update>
  // and stored alongside the message so source attribution chips can be
  // rendered below the bubble on reload as well as first display.
  pathwaysReferenced?: string[];
}

// The Explorer prompt's Step 3 emits this literal marker, once, at the point
// in its response where the Initial Cube Assessment's grid belongs — the
// model never renders a grid itself, it just marks where one goes; this is
// what turns that marker into an actual colored HeatmapGrid inline in the
// message. Kept in the stored message content (unlike <grid_update>, which
// is stripped) so the grid still renders on reload/scrollback.
const CUBE_GRID_MARKER = '<cube_grid/>';

// A file the user has attached but not sent yet — staged (see AttachmentsPanel)
// until they press Enter, at which point it's folded into one user message.
export interface PendingAttachment {
  id: string;
  name: string;
  state: 'reading' | 'ready' | 'error';
  error?: string;
}

// Renders **bold** spans; everything else is shown as plain text.
function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function extractDeliverable(text: string): { before: string; markdown: string; after: string } | null {
  const startIdx = text.indexOf(DELIVERABLE_START);
  if (startIdx === -1) return null;
  const endIdx = text.indexOf(DELIVERABLE_END, startIdx);
  if (endIdx === -1) return null;
  return {
    before: text.slice(0, startIdx).trim(),
    markdown: text.slice(startIdx + DELIVERABLE_START.length, endIdx).trim(),
    after: text.slice(endIdx + DELIVERABLE_END.length).trim(),
  };
}

function deliverableTitle(markdown: string): string {
  return markdown.match(/^##\s+(.+)$/m)?.[1].trim() || 'Adoption Report';
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'report';
}

function DeliverableCard({ markdown }: { markdown: string }) {
  const title = deliverableTitle(markdown);
  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy/15 bg-paper-dim px-4 py-3">
      <span className="text-xl" aria-hidden>
        📄
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy">{title}</p>
        <p className="text-xs text-ink-soft">Ready to download</p>
      </div>
      <button
        type="button"
        onClick={() => downloadPlanAsPdf(markdown, `${slugify(title)}.pdf`)}
        className="flex-shrink-0 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white transition hover:bg-coral"
      >
        Download PDF
      </button>
    </div>
  );
}

// The card a client-constructed doc message embeds — the Contributor flow's
// pathway document (see lib/adoption-conversation.ts's
// appendPathwayDocMessage/appendPublishOutcomeMessage) and the Explorer
// flow's Analysis Document / Executive Summary (appendExplorerDocMessage).
// Always reopens whatever is currently stored; it never regenerates anything.
function DocCard({ title, cta, onOpen }: { title: string; cta: string; onOpen: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy/15 bg-paper-dim px-4 py-3">
      <span className="text-xl" aria-hidden>
        📄
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy">{title}</p>
        <p className="text-xs text-ink-soft">Click to view</p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="flex-shrink-0 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white transition hover:bg-coral"
      >
        {cta}
      </button>
    </div>
  );
}

// Splits a message on the first document marker it carries and renders the
// real grid / download card / doc card in place — surrounding text still goes
// through renderInlineMarkdown. A message only ever carries one of these.
function renderMessageContent(
  text: string,
  grid: GridState | undefined,
  onOpenPathwayDocument: (() => void) | undefined,
  onOpenExplorerDocument: ((docType: DocType) => void) | undefined
): React.ReactNode[] {
  const deliverable = extractDeliverable(text);
  if (deliverable) {
    const nodes: React.ReactNode[] = [];
    if (deliverable.before) nodes.push(<span key="before">{renderInlineMarkdown(deliverable.before)}</span>);
    nodes.push(<DeliverableCard key="card" markdown={deliverable.markdown} />);
    if (deliverable.after) nodes.push(<span key="after">{renderInlineMarkdown(deliverable.after)}</span>);
    return nodes;
  }

  const docMarker = onOpenPathwayDocument
    ? { marker: PATHWAY_DOC_MARKER, title: 'Pathway Document', cta: 'View Pathway Document', open: onOpenPathwayDocument }
    : onOpenExplorerDocument && text.includes(ANALYSIS_DOC_MARKER)
      ? {
          marker: ANALYSIS_DOC_MARKER,
          title: 'Analysis Document',
          cta: 'View Analysis Document',
          open: () => onOpenExplorerDocument('analysis'),
        }
      : onOpenExplorerDocument && text.includes(EXEC_SUMMARY_MARKER)
        ? {
            marker: EXEC_SUMMARY_MARKER,
            title: 'Executive Summary',
            cta: 'View Executive Summary',
            open: () => onOpenExplorerDocument('plan'),
          }
        : null;

  if (docMarker && text.includes(docMarker.marker)) {
    const segments = text.split(docMarker.marker);
    const nodes: React.ReactNode[] = [];
    segments.forEach((segment, i) => {
      const trimmed = segment.trim();
      if (trimmed) nodes.push(<span key={`t${i}`}>{renderInlineMarkdown(trimmed)}</span>);
      if (i < segments.length - 1)
        nodes.push(<DocCard key={`d${i}`} title={docMarker.title} cta={docMarker.cta} onOpen={docMarker.open} />);
    });
    return nodes;
  }

  if (grid && text.includes(CUBE_GRID_MARKER)) {
    const segments = text.split(CUBE_GRID_MARKER);
    const nodes: React.ReactNode[] = [];
    segments.forEach((segment, i) => {
      if (segment) nodes.push(<span key={`t${i}`}>{renderInlineMarkdown(segment)}</span>);
      if (i < segments.length - 1) nodes.push(<HeatmapGrid key={`g${i}`} grid={grid} />);
    });
    return nodes;
  }

  return renderInlineMarkdown(text);
}

interface Props {
  messages: Message[];
  onSend: (text: string) => void;
  // Gates sending (blocked while an attachment is mid-read or errored) and,
  // when onRemoveAttachment is given, rendered as small chips right above
  // the composer — the visual cue that something was actually staged.
  pendingAttachments?: PendingAttachment[];
  loading: boolean;
  placeholder?: string;
  // Only needed to render an inline HeatmapGrid wherever a message contains
  // CUBE_GRID_MARKER — Contributor-flow callers can omit this.
  grid?: GridState;
  // Only needed by Contributor-flow callers, to render a PathwayDocCard
  // wherever a message contains PATHWAY_DOC_MARKER — Explorer callers omit
  // this, so those messages never contain the marker in the first place.
  onOpenPathwayDocument?: () => void;
  // Only needed by Explorer-flow callers, to render a card wherever a message
  // contains ANALYSIS_DOC_MARKER / EXEC_SUMMARY_MARKER — reopens the stored
  // document in the modal (see AdoptionWorkspace).
  onOpenExplorerDocument?: (docType: DocType) => void;
  // Shows a small attach icon in the composer itself when provided, so a
  // file can be staged without opening the separate AttachmentsPanel first.
  onAttachFiles?: (files: File[]) => void;
  // Lets the composer's own attachment chips (above) be dismissed inline —
  // omit to render the chips without a remove control.
  onRemoveAttachment?: (id: string) => void;
  // Slug → pathway info lookup for rendering source attribution below
  // assistant messages that cite pathway content. Fetched once by the parent
  // (AdoptionWorkspace) and passed down so ChatPanel stays stateless.
  pathwayLookup?: Record<string, {
    title: string;
    description?: string;
    sector?: string;
    stage?: string;
    timestamp?: string;
    contributor?: string;
  }>;
  // Hides the "pathway information isn't independently verified" note under
  // the first assistant message — relevant for an Explorer reading someone
  // else's documented pathway, but not for the Contributor who's the one
  // supplying that information about their own deployment.
  hideAccuracyDisclaimer?: boolean;
}

// Default height (px) matching the old rows={2} textarea, and the cap before it scrolls.
const TEXTAREA_MIN_HEIGHT = 52;
const TEXTAREA_MAX_HEIGHT = 200;

export default function ChatPanel({
  messages,
  onSend,
  pendingAttachments = [],
  loading,
  placeholder,
  grid,
  onOpenPathwayDocument,
  onOpenExplorerDocument,
  onAttachFiles,
  onRemoveAttachment,
  pathwayLookup,
  hideAccuracyDisclaimer,
}: Props) {
  const [input, setInput] = useState('');
  const [sourcePopup, setSourcePopup] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const closePopup = useCallback(() => setSourcePopup(null), []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length) onAttachFiles?.(files);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(Math.max(el.scrollHeight, TEXTAREA_MIN_HEIGHT), TEXTAREA_MAX_HEIGHT)}px`;
  }, [input]);

  const hasBlockingAttachment = pendingAttachments.some((a) => a.state !== 'ready');
  const hasReadyAttachment = pendingAttachments.some((a) => a.state === 'ready');
  const canSend = !loading && !hasBlockingAttachment && (input.trim().length > 0 || hasReadyAttachment);

  function handleSend() {
    if (!canSend) return;
    const text = input.trim();
    setInput('');
    onSend(text);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const popupInfo = sourcePopup ? pathwayLookup?.[sourcePopup] : null;

  return (
    <div className="flex flex-col h-full bg-paper">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 sm:px-6">
        {messages.map((m, i) => {
          const text = m.displayContent ?? m.content;
          const isRich =
            m.role === 'assistant' &&
            ((grid && text.includes(CUBE_GRID_MARKER)) ||
              text.includes(DELIVERABLE_START) ||
              (onOpenPathwayDocument && text.includes(PATHWAY_DOC_MARKER)) ||
              (onOpenExplorerDocument &&
                (text.includes(ANALYSIS_DOC_MARKER) || text.includes(EXEC_SUMMARY_MARKER))));
          const isFirstAssistant = m.role === 'assistant' && messages.slice(0, i).every(msg => msg.role !== 'assistant');
          const sources = m.role === 'assistant' && m.pathwaysReferenced?.length
            ? m.pathwaysReferenced
            : null;

          const disclaimerBlock = isFirstAssistant && !hideAccuracyDisclaimer ? (
            <div className="mt-3 border-t border-navy/10 pt-3 text-sm text-ink-soft">
              <span className="mr-1 font-medium text-navy">Note:</span>
              All pathway information shared here comes from the respective contributing organizations. The Cube does not validate or guarantee its accuracy — the contributor owns that.
            </div>
          ) : null;

          const sourcesBlock = sources ? (
            <div className="mt-3 border-t border-navy/10 pt-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-soft">Sources</p>
              <div className="space-y-1">
                {sources.map((slug) => {
                  const info = pathwayLookup?.[slug];
                  return (
                    <button
                      key={slug}
                      type="button"
                      onClick={() => setSourcePopup(slug)}
                      className="group flex w-full items-center gap-1.5 text-left text-sm"
                    >
                      <span className="text-coral transition-transform duration-150 group-hover:translate-x-0.5">↗</span>
                      <span className="text-coral underline underline-offset-2 decoration-coral/40 group-hover:decoration-coral transition-colors duration-150">
                        {info?.title ?? slug}
                      </span>
                      {info?.contributor && (
                        <span className="text-ink-soft/70 text-xs">· {info.contributor}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null;

          return (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${isRich || m.generatingDoc ? 'w-full' : 'max-w-[75%]'} rounded-xl px-4 py-2.5 text-base leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-navy text-white'
                    : 'bg-white text-ink border border-navy/10'
                }`}
              >
                {m.generatingDoc ? (
                  <div className="space-y-3">
                    {text && <span>{renderInlineMarkdown(text)}</span>}
                    <div className="flex items-center gap-2 text-ink-soft animate-pulse">
                      <span aria-hidden>📄</span>
                      Generating your document…
                    </div>
                  </div>
                ) : isRich ? (
                  <div className="space-y-3">
                    {renderMessageContent(text, grid, onOpenPathwayDocument, onOpenExplorerDocument)}
                    {disclaimerBlock}
                    {sourcesBlock}
                  </div>
                ) : (
                  <>
                    {renderInlineMarkdown(text)}
                    {disclaimerBlock}
                    {sourcesBlock}
                  </>
                )}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-ink-soft border border-navy/10 rounded-xl px-4 py-2.5 text-base animate-pulse">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-navy/10 p-4 sm:px-6">
        {pendingAttachments.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {pendingAttachments.map((a) => (
              <div
                key={a.id}
                className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs ${
                  a.state === 'error' ? 'border-coral/40 bg-coral-soft text-coral' : 'border-navy/15 bg-paper-dim text-ink-soft'
                }`}
              >
                <span className="max-w-[160px] truncate">
                  {a.state === 'reading' ? '⏳' : a.state === 'error' ? '⚠️' : '📎'} {a.name}
                </span>
                {onRemoveAttachment && (
                  <button
                    type="button"
                    onClick={() => onRemoveAttachment(a.id)}
                    disabled={a.state === 'reading'}
                    className="text-ink-soft transition hover:text-navy disabled:opacity-30"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end gap-3 rounded-2xl border border-navy/15 bg-white p-2 shadow-sm transition focus-within:border-coral">
          {onAttachFiles && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.xlsx,.xls,.pptx,.txt,.md,.png,.jpg,.jpeg,.gif,.webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                aria-label="Attach files"
                className="flex-shrink-0 self-end rounded-full p-2.5 text-ink-soft transition hover:bg-paper-dim hover:text-coral disabled:opacity-40"
              >
                📎
              </button>
            </>
          )}
          <textarea
            ref={textareaRef}
            className="flex-1 resize-none bg-transparent px-2 py-2.5 text-base text-ink outline-none placeholder-ink-soft overflow-y-auto"
            style={{ height: TEXTAREA_MIN_HEIGHT, maxHeight: TEXTAREA_MAX_HEIGHT }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder ?? 'Type a message…'}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-navy text-paper transition hover:scale-105 hover:bg-coral active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-ink-soft">
          Cube can make mistakes. Verify important information.
        </p>
      </div>

      {sourcePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 px-4 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-navy/10 bg-paper p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-coral">Pathway</p>
                <h2 className="mt-0.5 font-display text-lg font-medium leading-snug text-navy">
                  {popupInfo?.title ?? sourcePopup}
                </h2>
              </div>
              <button
                type="button"
                onClick={closePopup}
                className="mt-0.5 shrink-0 text-ink-soft transition hover:text-coral"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {popupInfo?.description && (
              <p className="mb-4 text-sm leading-relaxed text-ink">{popupInfo.description}</p>
            )}

            <dl className="space-y-2 border-t border-navy/10 pt-4 text-sm">
              {popupInfo?.sector && (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-ink-soft">Sector</dt>
                  <dd className="text-ink">{popupInfo.sector}</dd>
                </div>
              )}
              {popupInfo?.stage && (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-ink-soft">Stage</dt>
                  <dd className="text-ink">{popupInfo.stage}</dd>
                </div>
              )}
              {popupInfo?.contributor && (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-ink-soft">Contributed by</dt>
                  <dd className="font-medium text-navy">{popupInfo.contributor}</dd>
                </div>
              )}
              {popupInfo?.timestamp && (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-ink-soft">Last updated</dt>
                  <dd className="text-ink">{popupInfo.timestamp}</dd>
                </div>
              )}
            </dl>

            <p className="mt-4 border-t border-navy/10 pt-4 text-[11px] leading-snug text-ink-soft/60">
              This information reflects the contributor&apos;s documented experience. The Cube does not validate or guarantee its accuracy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
