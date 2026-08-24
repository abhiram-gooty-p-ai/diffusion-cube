'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Stage = 'Explore' | 'Define' | 'Pilot' | 'Scale';
type Accent = 'coral' | 'yellow' | 'blue' | 'navy';

interface WikiPathwayIndexEntry {
  slug: string;
  title: string;
  description: string;
  category: string;
  sector?: string;
  stage?: string;
  contributor?: string;
}

interface LibraryPathway extends WikiPathwayIndexEntry {
  accent: Accent;
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };
type View = 'library' | 'chat';

// A signed-in visitor's saved chat (library_conversations) — an anonymous
// visitor never has any of these, and their own chats stay purely in-memory.
// Listed in the sidebar's "Recent Explorations" (alongside Strengthen
// sessions), not as blocks on this page — reopened here via ?open=<id>,
// resolved server-side into `initialConversation` (see app/explore/page.tsx).
interface SavedConversation {
  id: string;
  pathway_slug: string | null;
  pathway_title: string | null;
  messages: ChatMessage[];
}

const ACCENT_ROTATION: Accent[] = ['coral', 'yellow', 'blue', 'navy'];

// Same theme tokens the whole app already uses (bg-coral-soft, text-blue,
// etc. are all defined in globals.css) — the Diffusion Library app these
// cards are ported from pulled its own theme from the same source, so no
// visual adaptation was needed here, only the data plumbing underneath.
const accentGradient: Record<Accent, string> = {
  coral: 'from-[#ff6543] to-[#ffb199]',
  yellow: 'from-[#feda09] to-[#fff3b0]',
  blue: 'from-[#0099ff] to-[#9fd8ff]',
  navy: 'from-[#1b1b42] to-[#6290c3]',
};
const accentText: Record<Accent, string> = {
  coral: 'text-coral',
  yellow: 'text-[#b98e00]',
  blue: 'text-blue',
  navy: 'text-navy',
};
const accentBadge: Record<Accent, string> = {
  coral: 'bg-coral-soft text-coral',
  yellow: 'bg-yellow-soft text-[#8a6b00]',
  blue: 'bg-blue-soft text-blue',
  navy: 'bg-navy/10 text-navy',
};

const STAGE_ORDER: Stage[] = ['Explore', 'Define', 'Pilot', 'Scale'];

export default function ExploreLibrary({
  signedIn = false,
  initialConversation = null,
}: {
  signedIn?: boolean;
  // Set when this page was opened via ?open=<id> (a sidebar "Recent
  // Explorations" link) — resolved server-side in app/explore/page.tsx.
  initialConversation?: SavedConversation | null;
}) {
  const [pathways, setPathways] = useState<LibraryPathway[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeStage, setActiveStage] = useState<Stage | 'All'>('All');
  const [selected, setSelected] = useState<LibraryPathway | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(initialConversation?.messages ?? []);
  const [draft, setDraft] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [view, setView] = useState<View>(initialConversation ? 'chat' : 'library');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Signed-in only — see SavedConversation's comment. currentConversationId
  // tracks which row (if any) this chat continues, so saves after the first
  // one update in place instead of creating a new row per turn.
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(initialConversation?.id ?? null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/wiki-pathways')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: WikiPathwayIndexEntry[]) => {
        if (cancelled) return;
        const withAccents = data.map((p, i) => ({ ...p, accent: ACCENT_ROTATION[i % ACCENT_ROTATION.length] }));
        setPathways(withAccents);
        setLoaded(true);
        // Re-match the reopened conversation's pathway once the list is in —
        // only needed for the chat header's badge/icon, not the messages.
        if (initialConversation?.pathway_slug) {
          setSelected(withAccents.find((p) => p.slug === initialConversation.pathway_slug) ?? null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Upserts the current conversation for a signed-in visitor — fire-and-
  // forget, called right after each assistant reply finishes so a refresh
  // mid-conversation never loses anything, and so it shows up promptly under
  // the sidebar's "Recent Explorations". Silent on failure: this is a
  // convenience cache, not the primary experience.
  async function saveConversation(history: ChatMessage[], pathway: LibraryPathway | null | undefined) {
    if (!signedIn) return;
    const supabase = createClient();
    if (currentConversationId) {
      await supabase
        .from('library_conversations')
        .update({ messages: history, updated_at: new Date().toISOString() })
        .eq('id', currentConversationId);
      return;
    }
    const { data } = await supabase
      .from('library_conversations')
      .insert({ pathway_slug: pathway?.slug ?? null, pathway_title: pathway?.title ?? null, messages: history })
      .select('id')
      .single();
    if (data) setCurrentConversationId(data.id);
  }

  const availableStages = STAGE_ORDER.filter((s) => pathways.some((p) => p.stage === s));
  const filtered = activeStage === 'All' ? pathways : pathways.filter((p) => p.stage === activeStage);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isThinking]);

  // Streams from this app's own /api/chat (mode: 'library'), a lightweight
  // Q&A prompt with no grid/flow tracking (see librarySystemPrompt in
  // lib/system-prompts.ts), unlike the tracked, persisted Explorer/
  // Contributor conversations. `pathway` (not just its title) is threaded
  // through explicitly rather than read from `selected` state here, so
  // saveConversation always gets the pathway this exact turn belongs to,
  // never a stale value from a state update that hasn't landed yet.
  async function streamReply(history: ChatMessage[], pathwayTitle: string | undefined, pathway: LibraryPathway | null) {
    setMessages([...history, { role: 'assistant', content: '' }]);
    setIsThinking(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, mode: 'library', pathwayTitle }),
      });
      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = '';
      let firstChunk = true;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        if (firstChunk) {
          firstChunk = false;
          setIsThinking(false);
        }
        setMessages([...history, { role: 'assistant', content: text }]);
      }
      void saveConversation([...history, { role: 'assistant', content: text }], pathway);
    } catch {
      setMessages([
        ...history,
        { role: 'assistant', content: "Sorry, I couldn't reach the assistant. Try again in a moment." },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function sendMessage(
    text: string,
    options?: { pathwayTitle?: string; pathway?: LibraryPathway | null; historyOverride?: ChatMessage[] }
  ) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const base = options?.historyOverride ?? messages;
    const next = [...base, { role: 'user' as const, content: trimmed }];
    setDraft('');
    void streamReply(next, options?.pathwayTitle, options?.pathway ?? null);
  }

  function startPathwayChat(pathway: LibraryPathway) {
    setSelected(pathway);
    setView('chat');
    setMessages([]);
    setCurrentConversationId(null);
    sendMessage(`Tell me about the ${pathway.title} pathway.`, {
      pathwayTitle: pathway.title,
      pathway,
      historyOverride: [],
    });
  }

  function handleAskGeneral(text: string) {
    setSelected(null);
    setView('chat');
    setCurrentConversationId(null);
    sendMessage(text, { historyOverride: [] });
  }

  if (view === 'chat') {
    return (
      <ChatView
        selected={selected}
        messages={messages}
        draft={draft}
        setDraft={setDraft}
        isThinking={isThinking}
        bottomRef={bottomRef}
        onSend={(text) => sendMessage(text, { pathwayTitle: selected?.title, pathway: selected })}
        onBack={() => setView('library')}
      />
    );
  }

  return (
    <div className="animate-fade-in flex-1 overflow-y-auto bg-paper">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 pb-10 text-center sm:pt-16 sm:pb-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">Explore</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-navy sm:text-5xl">
          Every deployment adds new evidence.{' '}
          <span className="font-serif italic text-coral">Every adopter</span> begins further ahead.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          A use case shows what worked in one place. A pathway captures what can travel to the next — and what has to
          be adapted. Ask, or explore any of the pathways below.
        </p>
      </section>

      <div className="sticky top-0 z-30 -mx-0 bg-paper/85 px-6 py-4 backdrop-blur-sm">
        <section className="mx-auto w-full max-w-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskGeneral(draft);
            }}
            className="glow-input flex items-end gap-3 rounded-3xl border border-navy/15 bg-white p-3 transition focus-within:border-coral"
          >
            <ComposerTextarea
              value={draft}
              onChange={setDraft}
              onSubmit={() => handleAskGeneral(draft)}
              placeholder="Ask anything about the pathways…"
              className="flex-1 resize-none bg-transparent px-4 py-3 text-lg outline-none placeholder:text-ink-soft"
              minHeight={32}
              maxHeight={200}
            />
            <SendButton disabled={!draft.trim()} size="lg" />
          </form>
        </section>
      </div>
      <p className="mx-auto mb-14 max-w-2xl px-6 text-center text-sm text-ink-soft">or click a pathway below to start</p>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-coral">Browse the pathways</p>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <FilterChip label="All" active={activeStage === 'All'} onClick={() => setActiveStage('All')} />
          {availableStages.map((stage) => (
            <FilterChip key={stage} label={stage} active={activeStage === stage} onClick={() => setActiveStage(stage)} />
          ))}
        </div>

        {!loaded ? (
          <p className="text-sm text-ink-soft">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-ink-soft">No pathways found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pathway) => (
              <PathwayCard key={pathway.slug} pathway={pathway} onSelect={startPathwayChat} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function PathwayCard({ pathway, onSelect }: { pathway: LibraryPathway; onSelect: (pathway: LibraryPathway) => void }) {
  const initial = pathway.title.charAt(0);
  const tags = [pathway.sector, pathway.category].filter((t, i, arr): t is string => !!t && arr.indexOf(t) === i);

  return (
    <button
      type="button"
      onClick={() => onSelect(pathway)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-coral hover:shadow-lg"
    >
      <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${accentGradient[pathway.accent]}`}>
        <span className="font-display text-6xl font-semibold text-white/25">{initial}</span>
        {pathway.stage && (
          <span className="absolute right-3 top-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-navy">
            {pathway.stage}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-medium text-navy">{pathway.title}</h3>
          {pathway.contributor && (
            <p className={`mt-0.5 text-xs font-medium ${accentText[pathway.accent]}`}>{pathway.contributor}</p>
          )}
        </div>

        <p className="line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-navy">{pathway.description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span key={tag} className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${accentBadge[pathway.accent]}`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:text-coral">
          Ask about this pathway
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </button>
  );
}

function ChatView({
  selected,
  messages,
  draft,
  setDraft,
  isThinking,
  bottomRef,
  onSend,
  onBack,
}: {
  selected: LibraryPathway | null;
  messages: ChatMessage[];
  draft: string;
  setDraft: (v: string) => void;
  isThinking: boolean;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  onSend: (text: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="animate-fade-in-up flex flex-1 flex-col overflow-hidden bg-paper">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-navy transition hover:gap-2.5 hover:text-coral"
          >
            <span aria-hidden className="transition-transform">
              ←
            </span>{' '}
            Explore other pathways
          </button>

          {selected ? (
            <div className="mb-6 flex items-center gap-3 border-b border-navy/10 pb-6">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-base font-semibold text-white ${accentGradient[selected.accent]}`}
              >
                {selected.title.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-lg font-medium text-navy">{selected.title}</h1>
                  {selected.stage && (
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${accentBadge[selected.accent]}`}>
                      {selected.stage}
                    </span>
                  )}
                </div>
                {(selected.sector || selected.category) && (
                  <p className={`text-xs font-medium ${accentText[selected.accent]}`}>
                    {[selected.sector, selected.category].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-6 border-b border-navy/10 pb-6">
              <h1 className="font-display text-lg font-medium text-navy">Ask a question</h1>
              <p className="text-xs text-ink-soft">A general question — not tied to one pathway yet</p>
            </div>
          )}
        </div>

        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 pb-8">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`animate-fade-in-up max-w-[80%] rounded-2xl px-5 py-3 text-[15px] leading-relaxed ${m.role === 'user' ? 'ml-auto bg-coral text-white' : 'mr-auto bg-paper-dim text-ink'
                }`}
            >
              <MessageText content={m.content} />
            </div>
          ))}
          {isThinking && (
            <div className="animate-fade-in-up mr-auto flex items-center gap-1.5 rounded-2xl bg-paper-dim px-5 py-4">
              <span className="animate-bounce-dot h-1.5 w-1.5 rounded-full bg-ink-soft [animation-delay:0ms]" />
              <span className="animate-bounce-dot h-1.5 w-1.5 rounded-full bg-ink-soft [animation-delay:150ms]" />
              <span className="animate-bounce-dot h-1.5 w-1.5 rounded-full bg-ink-soft [animation-delay:300ms]" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="shrink-0 border-t border-navy/10 bg-paper/90 px-6 py-4 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend(draft);
          }}
          className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-navy/15 bg-white p-2 shadow-sm transition focus-within:border-coral"
        >
          <ComposerTextarea
            value={draft}
            onChange={setDraft}
            onSubmit={() => onSend(draft)}
            placeholder="Ask a follow-up…"
            className="flex-1 resize-none bg-transparent px-4 py-2.5 text-[15px] outline-none placeholder:text-ink-soft"
            minHeight={24}
            maxHeight={160}
          />
          <SendButton disabled={!draft.trim() || isThinking} />
        </form>
      </div>
    </div>
  );
}

/** Renders **bold** markers as <strong> — the only inline markdown supported here. */
function renderBold(text: string) {
  const segments = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return segments.map((segment, i) =>
    segment.startsWith('**') && segment.endsWith('**') ? (
      <strong key={i} className="font-semibold">
        {segment.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{segment}</span>
    )
  );
}

function MessageText({ content }: { content: string }) {
  const paragraphs = content
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={i === 0 ? undefined : 'mt-3'}>
          {renderBold(paragraph)}
        </p>
      ))}
    </>
  );
}

// Auto-growing textarea — Enter sends, Shift+Enter inserts a newline and
// lets the box grow (same idiom as ChatPanel's own composer).
function ComposerTextarea({
  value,
  onChange,
  onSubmit,
  placeholder,
  className,
  minHeight,
  maxHeight,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  className: string;
  minHeight: number;
  maxHeight: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(Math.max(el.scrollHeight, minHeight), maxHeight)}px`;
  }, [value, minHeight, maxHeight]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      style={{ height: minHeight, maxHeight }}
      className={className}
    />
  );
}

function SendButton({ disabled, size = 'md' }: { disabled: boolean; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'h-12 w-12' : 'h-11 w-11';
  const icon = size === 'lg' ? 18 : 16;
  return (
    <button
      type="submit"
      disabled={disabled}
      aria-label="Send"
      className={`flex ${dim} shrink-0 items-center justify-center rounded-full bg-navy text-paper transition hover:scale-105 hover:bg-coral active:scale-95 disabled:opacity-30 disabled:hover:scale-100`}
    >
      <svg width={icon} height={icon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? 'border-navy bg-navy text-paper' : 'border-navy/15 bg-white text-navy hover:border-navy/40'
        }`}
    >
      {label}
    </button>
  );
}
