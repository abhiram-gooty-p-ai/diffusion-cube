import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

// Testing-environment auth: no password, no email confirmation, no admin
// approval wait. A visitor gives a name and email; this route creates (or
// finds) the matching Supabase Auth user and signs them in for real, so
// every existing RLS policy and hasRole()/hasAnyRole() check downstream
// keeps working unchanged — only the *ceremony* of getting a session is
// gone, not the session mechanism itself.
//
// The password Supabase Auth still requires under the hood is derived
// deterministically from the email (HMAC'd with the service-role key, which
// only this server ever sees) so the same email always resolves to the same
// account without storing a separate secret anywhere. The user never sees
// or needs to know this password exists.
function derivePassword(email: string): string {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return crypto.createHmac('sha256', secret).update(email).digest('hex');
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!name || !email) {
    return Response.json({ error: 'Name and email are required.' }, { status: 400 });
  }

  const admin = createAdminClient();
  const password = derivePassword(email);

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  // A duplicate-email error just means this is a returning tester — not a
  // real failure. Anything else is a genuine problem worth surfacing.
  const isNewUser = !createError;
  if (createError && !/already/i.test(createError.message)) {
    return Response.json({ error: createError.message }, { status: 400 });
  }

  // The service-role client above can create the user, but only a real
  // sign-in through the request-scoped SSR client actually sets the session
  // cookies the browser needs — that's what proxy.ts checks on every request.
  const supabase = await createClient();
  const { data: signedIn, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError || !signedIn.user) {
    return Response.json({ error: signInError?.message ?? 'Could not sign in.' }, { status: 400 });
  }

  const userId = signedIn.user.id;
  // Keep the display name current even for a returning tester who typed a
  // different name this time.
  await admin.auth.admin.updateUserById(userId, { user_metadata: { name } });

  // Testing environment: every new name+email gets full access immediately,
  // no approval step. Granted once, at first creation, only — so an admin
  // can still hand-adjust a tester's roles afterward without this silently
  // re-granting them on a later visit.
  if (isNewUser) {
    await admin.from('user_roles').insert([
      { user_id: userId, role: 'adopter' },
      { user_id: userId, role: 'pathway_contributor' },
    ]);
  }

  return Response.json({ ok: true, isNewUser, userId: created?.user?.id ?? userId });
}
