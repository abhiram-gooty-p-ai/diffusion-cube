'use client';

import { FormEvent, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const inputClass =
  'border border-navy/15 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors';
const labelClass = 'text-xs text-ink-soft';

// Testing environment: no password, no registration ceremony, no approval
// wait — a name and email is enough to get a real, working session (see
// app/api/auth/testing-login/route.ts). The same email always resolves back
// to the same account, so returning testers keep whatever state and roles
// they already had.
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/auth/testing-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? 'Something went wrong — try again.');
      return;
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <h2 className="font-display text-lg font-medium text-navy">Continue</h2>
            <p className="mt-1 text-xs text-ink-soft">
              Testing environment — just your name and email, no password.
            </p>
          </div>

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

          {error && <p className="text-xs text-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-navy hover:bg-coral disabled:opacity-60 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
          >
            {loading ? 'Please wait…' : 'Continue'}
          </button>
        </form>
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
