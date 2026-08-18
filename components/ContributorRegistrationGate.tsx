'use client';

import { FormEvent, useState } from 'react';
import { submitContributorRegistration } from '@/lib/contributor-registration';

const ORG_TYPES = ['Government', 'Nonprofit', 'Startup', 'Academic', 'Informal collective'] as const;

const DECLARATION_TEXT =
  "100 Pathways compiles this information to help other organisations learn from real deployments. Inclusion in the program does not constitute an endorsement of the contributor's product, service, or claims by 100 Pathways initiative. Information is presented as reported by the contributor.";

const MOU_CLAUSES = [
  { label: 'Accuracy', text: 'Information I share is accurate to my knowledge as of the date given.' },
  {
    label: 'Use',
    text: '100 Pathways may reference, summarise, and republish this information — including in a pathway document, microsite, and derived content (blog/article) — to advise future adopters.',
  },
  {
    label: 'Non-exclusivity',
    text: 'This does not restrict me or my organisation from working with other programs, nor does it obligate 100 Pathways to any funding, partnership, or endorsement.',
  },
  {
    label: 'Term & exit',
    text: 'I (or 100 Pathways) may request removal or correction of published information at any time; 100 Pathways will action within 10 working days.',
  },
  {
    label: 'No IP transfer',
    text: "I retain all rights to my own materials (decks, docs, code); 100 Pathways' use is limited to the pathway document, microsite, and derived summaries.",
  },
];

const inputClass =
  'border border-navy/15 rounded-lg px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30';
const labelClass = 'font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft';
const checkboxClass = 'mt-0.5 h-4 w-4 flex-shrink-0 accent-coral';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">{children}</p>;
}

function SectionHeading({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[11px] text-white">
        {step}
      </span>
      <h2 className="font-display text-base font-medium text-navy">{title}</h2>
    </div>
  );
}

interface Props {
  userId: string;
  onRegistered: () => void;
}

export default function ContributorRegistrationGate({ userId, onRegistered }: Props) {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [organisationName, setOrganisationName] = useState('');
  const [organisationType, setOrganisationType] = useState<string>(ORG_TYPES[0]);
  const [pocName, setPocName] = useState('');
  const [pocRole, setPocRole] = useState('');
  const [pocEmail, setPocEmail] = useState('');
  const [pocPhone, setPocPhone] = useState('');
  const [pathwayName, setPathwayName] = useState('');
  const [publicLinks, setPublicLinks] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [mouAccepted, setMouAccepted] = useState(false);
  const [consentName, setConsentName] = useState(false);
  const [consentLogo, setConsentLogo] = useState(false);
  const [consentQuote, setConsentQuote] = useState(false);
  const [consentBlog, setConsentBlog] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitContributorRegistration(userId, {
      organisationName,
      organisationType,
      pocName,
      pocRole,
      pocEmail,
      pocPhone,
      pathwayName,
      publicLinks,
      logoUrl,
      declarationAccepted,
      mouAccepted,
      consentName,
      consentLogo,
      consentQuote,
      consentBlog,
    });

    if (!result.ok) {
      setLoading(false);
      setError(result.error);
      return;
    }

    onRegistered();
  }

  if (!started) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-paper p-8 text-center">
        <Eyebrow>100 Pathways · Contribute</Eyebrow>
        <h1 className="font-display text-3xl font-medium tracking-tight text-navy">
          Register to <span className="font-serif italic text-coral">contribute</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">
          Before you can turn a deployment into a pathway page, we need a few details about you and your
          organisation, and your agreement to how the information you share gets used. This is one-time — you
          won&apos;t see this again after today.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="mt-2 rounded-lg bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-coral"
        >
          Click here to register
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
      <div className="mx-auto max-w-xl">
        <Eyebrow>100 Pathways · Contribute</Eyebrow>
        <h1 className="mt-2 font-display text-2xl font-medium tracking-tight text-navy">
          Register to <span className="font-serif italic text-coral">contribute</span>
        </h1>
        <p className="mt-1 mb-6 text-sm text-ink-soft">A one-time step before your first contribution.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4">
            <SectionHeading step={1} title="Your profile" />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="organisationName" className={labelClass}>
                Contributor / organisation name
              </label>
              <input
                id="organisationName"
                required
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="organisationType" className={labelClass}>
                Organisation type
              </label>
              <select
                id="organisationType"
                value={organisationType}
                onChange={(e) => setOrganisationType(e.target.value)}
                className={inputClass}
              >
                {ORG_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pocName" className={labelClass}>
                  Point of contact — name
                </label>
                <input id="pocName" required value={pocName} onChange={(e) => setPocName(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pocRole" className={labelClass}>
                  Point of contact — role
                </label>
                <input id="pocRole" required value={pocRole} onChange={(e) => setPocRole(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pocEmail" className={labelClass}>
                  Point of contact — email
                </label>
                <input
                  id="pocEmail"
                  type="email"
                  required
                  value={pocEmail}
                  onChange={(e) => setPocEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pocPhone" className={labelClass}>
                  Point of contact — phone
                </label>
                <input
                  id="pocPhone"
                  type="tel"
                  required
                  value={pocPhone}
                  onChange={(e) => setPocPhone(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pathwayName" className={labelClass}>
                Pathway name
              </label>
              <input
                id="pathwayName"
                required
                value={pathwayName}
                onChange={(e) => setPathwayName(e.target.value)}
                placeholder="A working title for what you'll be contributing"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="publicLinks" className={labelClass}>
                  Public links — optional
                </label>
                <input
                  id="publicLinks"
                  value={publicLinks}
                  onChange={(e) => setPublicLinks(e.target.value)}
                  placeholder="Website, LinkedIn, coverage"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="logoUrl" className={labelClass}>
                  Logo URL — optional
                </label>
                <input id="logoUrl" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-navy/10 pt-6">
            <SectionHeading step={2} title="Declaration" />
            <p className="rounded-lg bg-paper-dim p-3 font-serif text-[13px] italic leading-relaxed text-ink-soft">
              {DECLARATION_TEXT}
            </p>
            <label className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
              <input
                type="checkbox"
                required
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className={checkboxClass}
              />
              <span>
                I confirm the information I provide is true and current, that I&apos;m authorised to represent the
                organisation named above, and that it may be used to advise future adopters considering a similar
                deployment.
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-3 border-t border-navy/10 pt-6">
            <SectionHeading step={3} title="Terms" />
            <ul className="flex flex-col gap-2.5 rounded-lg bg-paper-dim p-3.5 text-[13px] leading-relaxed text-ink-soft">
              {MOU_CLAUSES.map((c) => (
                <li key={c.label}>
                  <span className="font-medium text-ink">{c.label}:</span> {c.text}
                </li>
              ))}
            </ul>
            <label className="flex items-start gap-2.5 text-sm leading-relaxed text-ink">
              <input
                type="checkbox"
                required
                checked={mouAccepted}
                onChange={(e) => setMouAccepted(e.target.checked)}
                className={checkboxClass}
              />
              <span>I&apos;ve read and agree to these terms.</span>
            </label>
          </div>

          <div className="flex flex-col gap-3 border-t border-navy/10 pt-6">
            <SectionHeading step={4} title="Attribution consent" />
            <p className="text-[13px] leading-relaxed text-ink-soft">
              Each of these is independent and off by default — nothing here is implied just by registering.
            </p>
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-2.5 rounded-lg border border-navy/10 px-3 py-2.5 text-sm text-ink transition-colors hover:border-coral/30">
                <input type="checkbox" checked={consentName} onChange={(e) => setConsentName(e.target.checked)} className="h-4 w-4 accent-coral" />
                Name our organisation and point of contact in the published pathway document
              </label>
              <label className="flex items-center gap-2.5 rounded-lg border border-navy/10 px-3 py-2.5 text-sm text-ink transition-colors hover:border-coral/30">
                <input type="checkbox" checked={consentLogo} onChange={(e) => setConsentLogo(e.target.checked)} className="h-4 w-4 accent-coral" />
                Use our organisation logo on the pathway page / microsite
              </label>
              <label className="flex items-center gap-2.5 rounded-lg border border-navy/10 px-3 py-2.5 text-sm text-ink transition-colors hover:border-coral/30">
                <input type="checkbox" checked={consentQuote} onChange={(e) => setConsentQuote(e.target.checked)} className="h-4 w-4 accent-coral" />
                Quote our point of contact directly, with attribution
              </label>
              <label className="flex items-center gap-2.5 rounded-lg border border-navy/10 px-3 py-2.5 text-sm text-ink transition-colors hover:border-coral/30">
                <input type="checkbox" checked={consentBlog} onChange={(e) => setConsentBlog(e.target.checked)} className="h-4 w-4 accent-coral" />
                Feature us in a derived blog/article for external publication
              </label>
            </div>
          </div>

          {error && <p className="text-xs text-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-navy py-3 text-sm font-medium text-white transition-colors hover:bg-coral disabled:opacity-60"
          >
            {loading ? 'Submitting…' : 'Submit and continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
