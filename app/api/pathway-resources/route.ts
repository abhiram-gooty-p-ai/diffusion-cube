import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null) as { pathwayId?: string; title?: string; url?: string } | null;
  if (!body?.pathwayId || !body.title?.trim() || !body.url) return NextResponse.json({ error: 'A title and URL are required.' }, { status: 400 });
  let url: URL;
  try { url = new URL(body.url); } catch { return NextResponse.json({ error: 'Enter a valid URL.' }, { status: 400 }); }
  if (!['http:', 'https:'].includes(url.protocol)) return NextResponse.json({ error: 'Only http(s) links are supported.' }, { status: 400 });
  const { data: membership } = await supabase.from('pathway_contributors')
    .select('user_id').eq('pathway_id', body.pathwayId).eq('user_id', user.id).maybeSingle();
  if (!membership) return NextResponse.json({ error: 'Not a contributor to this pathway.' }, { status: 403 });
  const { error } = await supabase.from('pathway_resources').insert({
    pathway_id: body.pathwayId, title: body.title.trim().slice(0, 240), external_url: url.toString(), created_by: user.id,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
