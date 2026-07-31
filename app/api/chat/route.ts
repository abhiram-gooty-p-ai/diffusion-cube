import Anthropic from '@anthropic-ai/sdk';
import { loadWikiContext, loadFrameworkContent } from '@/lib/wiki-loader';
import { companionSystemPrompt, analysisDocSystemPrompt, planDocumentSystemPrompt } from '@/lib/system-prompts';
import { logConversation } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { hasAnyRole } from '@/lib/roles';
import { EMPTY_GRID } from '@/lib/dimensions';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODES = ['companion', 'analysis-doc', 'plan-document'] as const;

export async function POST(req: Request) {
  const { messages, mode, grid, meta, versionNumber } = await req.json();

  if (!MODES.includes(mode)) {
    return Response.json({ error: 'Unknown mode.' }, { status: 400 });
  }

  // The whole app is the companion now — access requires an approved account
  // (any role at all; "pending" is zero roles). proxy.ts already guarantees a
  // session; this is the real enforcement for the model-calling surface.
  const supabase = await createClient();
  const approved = await hasAnyRole(supabase);
  if (!approved) {
    return Response.json({ error: 'Your account is awaiting approval.' }, { status: 403 });
  }

  const [wikiContent, frameworkContent] = await Promise.all([loadWikiContext(), loadFrameworkContent()]);

  let systemPrompt: string;
  const generatedAt = new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  if (mode === 'analysis-doc') {
    systemPrompt = analysisDocSystemPrompt(wikiContent, frameworkContent, grid ?? EMPTY_GRID, meta ?? {}, generatedAt);
  } else if (mode === 'plan-document') {
    systemPrompt = planDocumentSystemPrompt(
      wikiContent,
      frameworkContent,
      grid ?? EMPTY_GRID,
      meta ?? {},
      generatedAt,
      versionNumber ?? 1
    );
  } else {
    systemPrompt = companionSystemPrompt(wikiContent, frameworkContent);
  }

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: mode === 'companion' ? 2048 : 4096,
    system: systemPrompt,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      let fullResponse = '';
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          fullResponse += chunk.delta.text;
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();

      // Fire-and-forget — never blocks the response
      logConversation({ mode, messages, response: fullResponse });
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
