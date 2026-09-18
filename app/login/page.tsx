'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import OrganisationInput from '@/components/OrganisationInput';

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

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, organization } },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    // Grant the adopter role immediately so the account can use Analyse
    // without an admin approval step. A failure here is non-fatal — the user
    // still ends up on /explore (which needs no role), and an admin can
    // grant it manually later; they'd just see the "Ask an admin" screen on
    // /analyse in the meantime.
    await fetch('/api/auth/grant-default-role', { method: 'POST' }).catch(() => {});

    // A fresh signup always lands on /explore — it's open with no approval
    // needed, so it's the one place a pending account has something to do
    // while waiting, rather than landing back on whatever gated page sent
    // them here (see `next`, which sign-IN below still honors).
    router.replace('/explore');
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
              onClick={async () => {
                if (!email.trim()) {
                  setError('Enter your email first, then choose forgot password.');
                  return;
                }
                setLoading(true);
                setError(null);
                const supabase = createClient();
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                  redirectTo: `${window.location.origin}/login/reset-password`,
                });
                setLoading(false);
                setError(
                  resetError
                    ? resetError.message
                    : 'If an account exists for this email, a password reset link has been sent.'
                );
              }}
              disabled={loading}
              className="text-xs text-ink-soft hover:text-coral transition-colors disabled:opacity-60"
            >
              Forgot password?
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

            <OrganisationInput value={organization} onChange={(name) => setOrganization(name)} label="Organisation" />

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
