'use client';

import { useEffect, useRef, useState } from 'react';
import HeatmapGrid from '@/components/HeatmapGrid';
import { downloadPlanAsPdf } from '@/lib/adoption-plan-pdf';
import { DELIVERABLE_START, DELIVERABLE_END, PATHWAY_DOC_MARKER } from '@/lib/grid-update';
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

// A card the Contributor flow's client-constructed doc messages embed (see
// lib/adoption-conversation.ts's appendPathwayDocMessage/
// appendPublishOutcomeMessage) — reopens the pane showing whatever the
// current stored version is, never regenerating anything.
function PathwayDocCard({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-navy/15 bg-paper-dim px-4 py-3">
      <span className="text-xl" aria-hidden>
        📄
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy">Pathway Document</p>
        <p className="text-xs text-ink-soft">Click to view</p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="flex-shrink-0 rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white transition hover:bg-coral"
      >
        View Pathway Document
      </button>
    </div>
  );
}

// Splits a message on CUBE_GRID_MARKER, a <deliverable> block, or the
// PATHWAY_DOC_MARKER and renders the real grid / download card / doc card in
// place — surrounding text still goes through renderInlineMarkdown. A
// message only ever contains one of the three.
function renderMessageContent(
  text: string,
  grid: GridState | undefined,
  onOpenPathwayDocument: (() => void) | undefined
): React.ReactNode[] {
  const deliverable = extractDeliverable(text);
  if (deliverable) {
    const nodes: React.ReactNode[] = [];
    if (deliverable.before) nodes.push(<span key="before">{renderInlineMarkdown(deliverable.before)}</span>);
    nodes.push(<DeliverableCard key="card" markdown={deliverable.markdown} />);
    if (deliverable.after) nodes.push(<span key="after">{renderInlineMarkdown(deliverable.after)}</span>);
    return nodes;
  }

  if (onOpenPathwayDocument && text.includes(PATHWAY_DOC_MARKER)) {
    const segments = text.split(PATHWAY_DOC_MARKER);
    const nodes: React.ReactNode[] = [];
    segments.forEach((segment, i) => {
      const trimmed = segment.trim();
      if (trimmed) nodes.push(<span key={`t${i}`}>{renderInlineMarkdown(trimmed)}</span>);
      if (i < segments.length - 1) nodes.push(<PathwayDocCard key={`d${i}`} onOpen={onOpenPathwayDocument} />);
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
  // Shows a small attach icon in the composer itself when provided, so a
  // file can be staged without opening the separate AttachmentsPanel first.
  onAttachFiles?: (files: File[]) => void;
  // Lets the composer's own attachment chips (above) be dismissed inline —
  // omit to render the chips without a remove control.
  onRemoveAttachment?: (id: string) => void;
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
  onAttachFiles,
  onRemoveAttachment,
}: Props) {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="flex flex-col h-full bg-paper">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 sm:px-6">
        {messages.map((m, i) => {
          const text = m.displayContent ?? m.content;
          const isRich =
            m.role === 'assistant' &&
            ((grid && text.includes(CUBE_GRID_MARKER)) ||
              text.includes(DELIVERABLE_START) ||
              (onOpenPathwayDocument && text.includes(PATHWAY_DOC_MARKER)));
          return (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${isRich || m.generatingDoc ? 'max-w-full' : 'max-w-[75%]'} rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
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
                  <div className="space-y-3">{renderMessageContent(text, grid, onOpenPathwayDocument)}</div>
                ) : (
                  renderInlineMarkdown(text)
                )}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-ink-soft border border-navy/10 rounded-xl px-4 py-2.5 text-sm animate-pulse">
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
        <div className="flex gap-3">
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
              className="flex-shrink-0 self-end rounded-xl border border-navy/15 bg-white px-3 py-2.5 text-ink-soft transition hover:border-coral hover:text-coral disabled:opacity-40"
            >
              📎
            </button>
          </>
        )}
        <textarea
          ref={textareaRef}
          className="flex-1 bg-white text-ink border border-navy/15 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-coral placeholder-ink-soft overflow-y-auto"
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
          className="px-4 py-2 bg-navy hover:bg-coral disabled:opacity-40 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Send
        </button>
        </div>
      </div>
    </div>
  );
}
