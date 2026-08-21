'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PATHWAY_ROLES, submitContributorRegistration, type SharingLevel } from '@/lib/contributor-registration';
import OrganisationInput from '@/components/OrganisationInput';

const DECLARATION_SUMMARY =
  "100 Pathways may reference, summarise, and republish information you share — including in pathway documents, microsites, and derived content — to advise future adopters. Inclusion does not constitute an endorsement.";

const MOU_CLAUSES = [
  { label: 'Accuracy', text: 'Information I share is accurate to my knowledge as of the date given.' },
  { label: 'Use', text: '100 Pathways may reference, summarise, and republish this information to advise future adopters.' },
  { label: 'Non-exclusivity', text: 'This does not obligate 100 Pathways to any funding, partnership, or endorsement.' },
  { label: 'Term & exit', text: 'Either party may request removal or correction; 100 Pathways will action within 10 working days.' },
  { label: 'No IP transfer', text: 'I retain all rights to my own materials; use is limited to pathway documents and derived summaries.' },
];

const inputClass =
  'border border-navy/15 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors';
const labelClass = 'text-xs text-ink-soft';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Contributor sign-up extras
  const [wantsToContribute, setWantsToContribute] = useState(false);
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

  const SHARING_OPTIONS: { value: SharingLevel; label: string }[] = [
    { value: 'none', label: "Don't share my contact details" },
    { value: 'name', label: 'Share my name only' },
    { value: 'name_and_email', label: 'Share my name and email' },
  ];

  function handleOrgChange(name: string, canonicalRole?: string, url?: string) {
    setOrganization(name);
    if (canonicalRole) setPathwayRole(canonicalRole);
    if (url) setOrganisationUrl(url);
  }

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (wantsToContribute && (!declarationAccepted || !mouAccepted)) {
      setLoading(false);
      setError('Please accept the declaration and terms to register as a contributor.');
      return;
    }

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, organization } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    // If contributor flag is set, submit the registration immediately while
    // the session is live. Failure here is non-fatal — the user can complete
    // registration later via the Contribute page.
    if (wantsToContribute && data.user) {
      await submitContributorRegistration(data.user.id, {
        organisationName: organization,
        organisationUrl,
        pathwayRole,
        pocName: name,
        pocEmail: email,
        pathwayDescription,
        declarationAccepted,
        mouAccepted,
        consentName,
        consentLogo,
        consentQuote,
        consentBlog,
        sharingLevel,
      });
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
      <div className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">100 Pathways</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
          Diffusion <span className="font-serif italic text-coral">Cube</span>
        </h1>
      </div>

      <div className="w-full max-w-sm bg-white border border-navy/10 rounded-2xl p-8 flex flex-col gap-4">
        {mode === 'signin' ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <h2 className="font-display text-lg font-medium text-navy">Sign in</h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className={labelClass}>Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className={labelClass}>Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && <p className="text-xs text-coral">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-navy hover:bg-coral disabled:opacity-60 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
            >
              {loading ? 'Please wait…' : 'Sign in'}
            </button>

            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); }}
              className="text-xs text-ink-soft hover:text-coral transition-colors"
            >
              Don&apos;t have an account? Sign up
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <h2 className="font-display text-lg font-medium text-navy">Sign up</h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className={labelClass}>Name</label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="request-email" className={labelClass}>Email</label>
              <input
                id="request-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <OrganisationInput value={organization} onChange={handleOrgChange} label="Organisation" />

            <div className="flex flex-col gap-1">
              <label htmlFor="request-password" className={labelClass}>Password</label>
              <input
                id="request-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Contributor registration section */}
            <div className="border-t border-navy/10 pt-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsToContribute}
                  onChange={(e) => setWantsToContribute(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-coral"
                />
                <span className="text-sm text-ink leading-snug">
                  Register as a Contributor
                </span>
              </label>

              {wantsToContribute && (
                <div className="mt-4 flex flex-col gap-5">

                  {/* Pathway details */}
                  <div className="flex flex-col gap-3 rounded-lg bg-paper-dim p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-coral">Your pathway</p>

                    <div className="flex flex-col gap-1">
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

                    <div className="flex flex-col gap-1">
                      <label htmlFor="pathwayRole" className={labelClass}>
                        Organisation&apos;s role in this pathway
                      </label>
                      <select
                        id="pathwayRole"
                        value={pathwayRole}
                        onChange={(e) => setPathwayRole(e.target.value)}
                        className={inputClass + ' bg-white'}
                      >
                        {PATHWAY_ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="pathwayDescription" className={labelClass}>
                        Pathway description
                      </label>
                      <textarea
                        id="pathwayDescription"
                        required={wantsToContribute}
                        rows={3}
                        value={pathwayDescription}
                        onChange={(e) => setPathwayDescription(e.target.value)}
                        placeholder="Brief description of the AI deployment you want to contribute"
                        className={inputClass + ' resize-none'}
                      />
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="flex flex-col gap-2 rounded-lg bg-paper-dim p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-coral">Declaration</p>
                    <p className="font-serif text-[12px] italic leading-relaxed text-ink-soft">
                      {DECLARATION_SUMMARY}
                    </p>
                    <label className="flex items-start gap-2 text-xs leading-relaxed text-ink">
                      <input
                        type="checkbox"
                        required={wantsToContribute}
                        checked={declarationAccepted}
                        onChange={(e) => setDeclarationAccepted(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-coral"
                      />
                      <span>
                        I confirm this is true and current and I&apos;m authorised to represent my organisation.
                      </span>
                    </label>
                  </div>

                  {/* Terms */}
                  <div className="flex flex-col gap-2 rounded-lg bg-paper-dim p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-coral">Terms</p>
                    <ul className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-ink-soft">
                      {MOU_CLAUSES.map((c) => (
                        <li key={c.label}>
                          <span className="font-medium text-ink">{c.label}:</span> {c.text}
                        </li>
                      ))}
                    </ul>
                    <label className="flex items-start gap-2 text-xs leading-relaxed text-ink">
                      <input
                        type="checkbox"
                        required={wantsToContribute}
                        checked={mouAccepted}
                        onChange={(e) => setMouAccepted(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-coral"
                      />
                      <span>I&apos;ve read and agree to these terms.</span>
                    </label>
                  </div>

                  {/* Attribution consent */}
                  <div className="flex flex-col gap-2 rounded-lg bg-paper-dim p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-coral">Attribution consent</p>
                    <p className="text-[11px] leading-relaxed text-ink-soft">
                      Optional — each is independent and off by default.
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {[
                        { id: 'c-name', checked: consentName, set: setConsentName, label: 'Name our organisation in the published pathway' },
                        { id: 'c-logo', checked: consentLogo, set: setConsentLogo, label: 'Use our organisation logo on the pathway page' },
                        { id: 'c-quote', checked: consentQuote, set: setConsentQuote, label: 'Quote our point of contact, with attribution' },
                        { id: 'c-blog', checked: consentBlog, set: setConsentBlog, label: 'Feature us in a derived blog/article' },
                      ].map(({ id, checked, set, label }) => (
                        <label key={id} className="flex items-center gap-2 text-xs text-ink">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => set(e.target.checked)}
                            className="h-3.5 w-3.5 accent-coral"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Personal sharing preference */}
                  <div className="flex flex-col gap-2 rounded-lg bg-paper-dim p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-coral">Sharing your contact details</p>
                    <p className="text-[11px] leading-relaxed text-ink-soft">
                      Separate from organisation attribution above — whether Explorers can see who to reach out to,
                      personally, when your pathway is cited.
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {SHARING_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-2 text-xs text-ink">
                          <input
                            type="radio"
                            name="sharingLevel"
                            checked={sharingLevel === opt.value}
                            onChange={() => setSharingLevel(opt.value)}
                            className="h-3.5 w-3.5 accent-coral"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {error && <p className="text-xs text-coral">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-navy hover:bg-coral disabled:opacity-60 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
            >
              {loading ? 'Please wait…' : 'Sign up'}
            </button>

            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); }}
              className="text-xs text-ink-soft hover:text-coral transition-colors"
            >
              Already have an account? Sign in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
