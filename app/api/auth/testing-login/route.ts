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
  if (createError && !/already/i.test(createError.message)) {
    return Response.json({ error: createError.message }, { status: 400 });
  }

  let userId: string;
  if (created?.user) {
    userId = created.user.id;
  } else {
    // Existing account whose password isn't the derived one — e.g. it
    // predates this flow, or was created some other way. generateLink is
    // the only admin-API way to resolve an email to a user id without
    // paginating every user; the link itself is never sent anywhere, only
    // used to read the id below. Then force the password to the derived
    // value so the sign-in right after this always succeeds, regardless of
    // whatever password (if any) the account had before.
    const { data: existing, error: lookupError } = await admin.auth.admin.generateLink({
      type: 'recovery',
      email,
    });
    if (lookupError || !existing.user) {
      return Response.json({ error: lookupError?.message ?? 'Could not find existing account.' }, { status: 400 });
    }
    userId = existing.user.id;
    await admin.auth.admin.updateUserById(userId, { password });
  }

  // The service-role client above can create/update the user, but only a
  // real sign-in through the request-scoped SSR client actually sets the
  // session cookies the browser needs — that's what proxy.ts checks on
  // every request.
  const supabase = await createClient();
  const { data: signedIn, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError || !signedIn.user) {
    return Response.json({ error: signInError?.message ?? 'Could not sign in.' }, { status: 400 });
  }

  // Keep the display name current even for a returning tester who typed a
  // different name this time.
  await admin.auth.admin.updateUserById(userId, { user_metadata: { name } });

  // Testing environment: full access immediately, no approval step — for
  // any account that doesn't already have roles yet. Covers a genuinely new
  // signup as well as an existing-but-never-approved account (e.g. one
  // created before this testing flow existed); an account that already has
  // roles keeps them untouched rather than being re-granted on every visit.
  const { count } = await admin
    .from('user_roles')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  if (!count) {
    await admin.from('user_roles').insert([
      { user_id: userId, role: 'adopter' },
      { user_id: userId, role: 'pathway_contributor' },
    ]);
  }

  return Response.json({ ok: true, isNewUser: !!created?.user, userId });
}
