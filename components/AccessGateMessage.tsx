import Link from 'next/link';

interface Props {
  eyebrow: string;
  heading: React.ReactNode;
  body: string;
  // Omit for a state with nothing actionable to do yet (e.g. signed in but
  // still waiting on a role only an admin can grant) — shown as plain text
  // instead of a dead-end button.
  cta?: { label: string; href: string };
}

// Shared "here's what this page does, and what to do about it" screen for a
// route someone can see in the sidebar before they're actually able to use
// it. Deliberately matches the chat welcome screen's own layout (see
// AdoptionWorkspace's pre-conversation state) — a centered card inside the
// content pane, left-aligned text within it — rather than a generic
// full-bleed centered block, so it reads as "the chat interface, not ready
// yet" rather than a completely different kind of page.
export default function AccessGateMessage({ eyebrow, heading, body, cta }: Props) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-paper p-4 sm:p-8">
      <div className="w-full max-w-2xl animate-fade-in-up">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">{eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl font-medium leading-[1.15] tracking-tight text-navy sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">{body}</p>
        {cta && (
          <Link
            href={cta.href}
            className="mt-6 inline-block rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-coral"
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );
}
