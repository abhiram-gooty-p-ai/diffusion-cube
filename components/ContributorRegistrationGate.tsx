'use client';

import { FormEvent, useState } from 'react';
import { PATHWAY_ROLES, submitContributorRegistration, type SharingLevel } from '@/lib/contributor-registration';
import OrganisationInput from '@/components/OrganisationInput';

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

const SHARING_OPTIONS: { value: SharingLevel; label: string; description: string }[] = [
  { value: 'none', label: "Don't share my contact details", description: 'Nothing about you personally is shown to Explorers.' },
  { value: 'name', label: 'Share my name only', description: 'Your name is shown alongside citations of your pathway.' },
  { value: 'name_and_email', label: 'Share my name and email', description: 'Explorers can also see your email to follow up directly.' },
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
  userName: string;
  userEmail: string;
  userOrganisation: string;
  onRegistered: () => void;
}

export default function ContributorRegistrationGate({
  userId,
  userName,
  userEmail,
  userOrganisation,
  onRegistered,
}: Props) {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [organisationName, setOrganisationName] = useState(userOrganisation);
  const [organisationUrl, setOrganisationUrl] = useState('');
  const [pathwayRole, setPathwayRole] = useState<string>(PATHWAY_ROLES[0]);
  const [pathwayDescription, setPathwayDescription] = useState('');
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [mouAccepted, setMouAccepted] = useState(false);
  const [consentName, setConsentName] = useState(false);
  const [consentLogo, setConsentLogo] = useState(false);
  const [consentQuote, setConsentQuote] = useState(false);
  const [consentBlog, setConsentBlog] = useState(false);
  const [sharingLevel, setSharingLevel] = useState<SharingLevel>('none');

  function handleOrgChange(name: string, canonicalRole?: string, url?: string) {
    setOrganisationName(name);
    if (canonicalRole) setPathwayRole(canonicalRole);
    if (url) setOrganisationUrl(url);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitContributorRegistration(userId, {
      organisationName,
      organisationUrl,
      pathwayRole,
      pocName: userName,
      pocEmail: userEmail,
      pathwayDescription,
      declarationAccepted,
      mouAccepted,
      consentName,
      consentLogo,
      consentQuote,
      consentBlog,
      sharingLevel,
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
          Before you can turn a deployment into a pathway page, we need a few details about your deployment
          and your agreement to how the information you share gets used. This is one-time — you
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

          {/* Step 1: Organisation + pathway details */}
          <div className="flex flex-col gap-4">
            <SectionHeading step={1} title="Your organisation and pathway" />

            <OrganisationInput value={organisationName} onChange={handleOrgChange} label="Organisation" />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="organisationUrl" className={labelClass}>
                Organisation website — optional
              </label>
              <input
                id="organisationUrl"
                type="url"
                value={organisationUrl}
                onChange={(e) => setOrganisationUrl(e.target.value)}
                placeholder="https://…"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pathwayRole" className={labelClass}>
                Organisation&apos;s role in this pathway
              </label>
              <select
                id="pathwayRole"
                value={pathwayRole}
                onChange={(e) => setPathwayRole(e.target.value)}
                className={inputClass}
              >
                {PATHWAY_ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pathwayDescription" className={labelClass}>
                Pathway description
              </label>
              <textarea
                id="pathwayDescription"
                required
                rows={4}
                value={pathwayDescription}
                onChange={(e) => setPathwayDescription(e.target.value)}
                placeholder="Brief description of the AI deployment you want to contribute as a pathway"
                className={inputClass + ' resize-none'}
              />
            </div>
          </div>

          {/* Step 2: Declaration */}
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
                I confirm the information I provide is true and current, that I&apos;m authorised to represent my
                organisation, and that it may be used to advise future adopters considering a similar deployment.
              </span>
            </label>
          </div>

          {/* Step 3: Terms */}
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

          {/* Step 4: Attribution consent */}
          <div className="flex flex-col gap-3 border-t border-navy/10 pt-6">
            <SectionHeading step={4} title="Attribution consent" />
            <p className="text-[13px] leading-relaxed text-ink-soft">
              Each of these is independent and off by default — nothing here is implied just by registering.
            </p>
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-2.5 rounded-lg border border-navy/10 px-3 py-2.5 text-sm text-ink transition-colors hover:border-coral/30">
                <input type="checkbox" checked={consentName} onChange={(e) => setConsentName(e.target.checked)} className="h-4 w-4 accent-coral" />
                Name our organisation in the published pathway document
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

          {/* Step 5: Personal sharing preference */}
          <div className="flex flex-col gap-3 border-t border-navy/10 pt-6">
            <SectionHeading step={5} title="Sharing your own contact details" />
            <p className="text-[13px] leading-relaxed text-ink-soft">
              Separate from your organisation&apos;s attribution above — this is about whether Explorers using the
              Cube can see who to reach out to, personally, when your pathway is cited in a conversation.
            </p>
            <div className="flex flex-col gap-2.5">
              {SHARING_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-start gap-2.5 rounded-lg border border-navy/10 px-3 py-2.5 text-sm text-ink transition-colors hover:border-coral/30"
                >
                  <input
                    type="radio"
                    name="sharingLevel"
                    checked={sharingLevel === opt.value}
                    onChange={() => setSharingLevel(opt.value)}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-coral"
                  />
                  <span>
                    <span className="block font-medium">{opt.label}</span>
                    <span className="block text-xs text-ink-soft">{opt.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-navy py-3 text-sm font-medium text-white transition-colors hover:bg-coral disabled:opacity-60"
          >
            {loading ? 'Submitting…' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
