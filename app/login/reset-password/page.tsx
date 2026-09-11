'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady(true);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (password.length < 6) {
      setError('Your password must be at least 6 characters.');
      return;
    }
    if (password !== confirmation) {
      setError('The passwords do not match.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setMessage('Your password has been updated.');
    setTimeout(() => router.replace('/'), 900);
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6">
      <div className="mb-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">100 Pathways</p>
        <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-navy">
          Diffusion <span className="font-serif italic text-coral">Cube</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-navy/10 rounded-2xl p-8 flex flex-col gap-4">
        <h2 className="font-display text-lg font-medium text-navy">Set a new password</h2>
        {!ready ? (
          <p className="text-sm leading-relaxed text-ink-soft">
            Open the password reset link from your email to continue. If you already opened it, try refreshing this page.
          </p>
        ) : (
          <>
            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              New password
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border border-navy/15 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-ink-soft">
              Confirm password
              <input
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                className="border border-navy/15 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/20 transition-colors"
              />
            </label>
            {error && <p className="text-xs text-coral">{error}</p>}
            {message && <p className="text-xs text-blue">{message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-navy hover:bg-coral disabled:opacity-60 text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
            >
              {loading ? 'Updating…' : 'Update password'}
            </button>
          </>
        )}
        <button type="button" onClick={() => router.replace('/login')} className="text-xs text-ink-soft hover:text-coral transition-colors">
          Back to sign in
        </button>
      </form>
    </div>
  );
}
