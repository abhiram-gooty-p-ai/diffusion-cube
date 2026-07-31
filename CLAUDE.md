# 100 Pathways — Adoption Companion

## What this is

A Next.js web app, the conversational companion to **100pathways.com** — themed to match it exactly and linked back to it from every page's header. A signed-in user works through their own AI adoption in a single workspace: they upload documents and/or talk, and everything they hear back is grounded in a corpus of real deployment pathways, now committed into this repo (`content/wiki/`). The companion is **fully user-led**: it recommends on content the user raises (grounded in named pathway precedents with condition tags) but never sets the agenda, never proposes what to discuss next, and never assigns or recommends a stage. Standing is tracked on a **4 dimensions × 4 stages coverage grid** rendered in the same density notation (○/●/●●/●●●) the pathway documents themselves use, seeded automatically the moment a document is uploaded (not just from conversation). Two documents can be generated at any point (Analysis Doc, Plan Document), versioned and cached in Supabase. A user can also preview their own adoption as a candidate pathway page and submit it for admin curation, and the corpus itself is browsable on demand at `/wiki`.

This is the `revamp-100pathways` branch — a full revamp replacing the earlier "AI Diffusion Studio" app (Explore mode, 7 dimensions, cream/brown theme all removed).

## The framework

Defined by the "AI Diffusion Pathway Framework" doc, transcribed into `content/framework.md` (injected into every prompt — edit that file to change behavior, no code change):

- **Four dimensions**: Persona, Solution, Institution, Ecosystem — each with lettered sub-categories (4/5/7/6 respectively), each sub-category weighted **Primary / Secondary / Dormant** per stage.
- **Four stages**: Explore, Define, Pilot, Scale — each with "done when…" markers.
- **Five unit types** for corpus knowledge: Strategic Decision, Tactical Decision, Failure and Fix, Playbook, Toolkit Asset — every unit carries a condition tag (applies when / fails when).
- **30/70 thesis**: Persona+Solution = building the right thing; Institution+Ecosystem = the larger adoption work.

`lib/dimensions.ts` holds only the structural shape (codes, names, sub-categories, weights, stage list, density types, brand colors) — the substantive question bank lives in `content/framework.md`. `content/pathway-generation-prompt.md` is the contributor-side prompt for generating new pathway documents from raw material (not used at runtime).

Two hard rules from the framework that bind runtime behavior: pathway documents' **Provenance appendix is contributor-only** — never surfaced in any adopter-facing response; and the framework itself is never referenced as a process ("the framework," sub-category codes, densities, unit-type labels) in user-facing prose, though the four dimension and four stage names are public 100 Pathways vocabulary and fine to use naturally.

## Tech stack

- Next.js 16 (App Router), React 19, Tailwind CSS v4
- Anthropic API via `/api/chat` route handler (`claude-sonnet-4-6`), streamed
- Supabase (Postgres + Auth) for sign-in, approval, roles, and all persistence
- Client-side document/image extraction: `pdfjs-dist`, `mammoth`, `xlsx` (SheetJS CDN build), `jszip`
- PDF export via `jspdf`
- Theme: 100 Pathways brand tokens (navy `#1b1b42`, coral `#ff6543`, yellow `#feda09`, blue `#0099ff`, paper `#faf9f6`, ink `#363538`) with Inter / DM Sans / PT Serif / Geist Mono — copied verbatim from the Diffusion Library web app, which pulled them from the live site. All in `app/globals.css` as `@theme` tokens (`bg-paper`, `text-navy`, `text-coral`, `glow-input`, etc.).

## Wiki / corpus loading

The pathway corpus is committed into this repo at `content/wiki/pathways/` (`lib/wiki-loader.ts`), so it deploys on Vercel with no extra step — `WIKI_PATH` env var can still override the path (e.g. a different checkout in local dev) but nothing requires it. `loadWikiContext()` reads `pathways/index.md`, parses the relative `(slug.md)` links, and loads all pathway pages (7 currently, whole corpus ≈ 22K tokens with the framework — fine at this size; revisit with retrieval when it grows). `loadFrameworkContent()` reads `content/framework.md`, and `loadPathwayGenerationPrompt()` reads `content/pathway-generation-prompt.md` (used at runtime now too, by the `pathway-draft` mode). All reads go through one `readSource()` function so a future S3 move is a single swap.

Each of the 7 pathway docs was regenerated from the pre-revamp corpus (previously a simpler frontmatter+prose format under an old 7-category model) into the full Sections 0–6 + Provenance-appendix structure `content/pathway-generation-prompt.md` specifies — numbered, individually-tagged units (Strategic Decision / Tactical Decision / Failure and Fix / Playbook / Toolkit Asset), a Section 2 coverage grid, toolkit table, problem→solution table, and retrieval guide — reclassified into the new 4-dimension framework rather than re-derived from raw interviews (the Provenance appendix on each says so explicitly). `lib/wiki-content.ts` serves these for on-demand browsing at `/wiki` (`app/(app)/wiki/`), separately from the prompt-injection path — it strips the Provenance appendix before display (contributor-only, same rule as adopter-facing chat) and strips frontmatter. `components/WikiMarkdown.tsx` renders it (a richer markdown subset than `lib/adoption-plan-markdown.ts`'s parser — adds pipe-table support, since pathway docs lean on tables).

The old `wiki_cache`/`pathway_cache` Supabase tables and the GitHub-raw fetching path are no longer used (tables still exist in the DB, inert).

## Project structure

```
/app
  layout.tsx                ← fonts (Inter/DM Sans/PT Serif/Geist Mono), metadata
  globals.css                ← 100 Pathways theme tokens + animations (fade-in-up, bounce-dot, glow-input)
  login/page.tsx              ← sign-in / request-access (Supabase email+password, admin approval)
  admin/page.tsx               ← user approval + role management (see Auth section)
  api/chat/route.ts            ← modes: companion | analysis-doc | plan-document | extract-insights | pathway-draft
  api/admin/pathway-submissions/review/route.ts ← admin marks a submission reviewed
  api/admin/pathway-submissions/publish/route.ts ← admin publishes a submission to published_pathways (public)
  (app)/
    layout.tsx                  ← SiteHeader + approval gate (hasAnyRole) + Sidebar
    page.tsx                     ← the landing: AdoptionWorkspace in welcome state
    adoptions/page.tsx            ← grid of the user's saved adoptions (?open=<id> deep link)
    wiki/page.tsx                  ← on-demand corpus browsing: pathway index by category
    wiki/[slug]/page.tsx             ← one pathway page, Provenance appendix stripped
proxy.ts                    ← auth middleware (public: /login only)
/content
  framework.md               ← THE framework (question bank, weights, unit types) — prompt-injected
  pathway-generation-prompt.md ← generation rules + output structure — prompt-injected by `pathway-draft` too now
  wiki/pathways/*.md            ← the corpus itself, committed into the repo (see Wiki section above)
/lib
  dimensions.ts              ← structural shape: 4 dimensions, sub-categories, weights, GridState types
  system-prompts.ts           ← companionSystemPrompt, analysisDocSystemPrompt, planDocumentSystemPrompt, documentInsightSystemPrompt, pathwayDraftSystemPrompt
  grid-update.ts                ← parseGridUpdate/stripGridUpdate — split out so app/api/chat/route.ts (server) can import it without pulling in adoption-conversation.ts's React hooks
  adoption-conversation.ts     ← useAdoptionConversation hook: lazy row creation (dedup'd via creatingRef), attachments, extractInsightsForAttachment
  adoptions-cache.ts            ← 60s TTL cache for the adoptions list
  design-documents.ts            ← versioned Analysis Doc / Plan Document storage + content-hash caching
  wiki-loader.ts                  ← in-repo corpus reads for prompts (see above)
  wiki-content.ts                   ← in-repo corpus reads for on-demand /wiki browsing (Provenance-stripped)
  extract-text.ts                    ← client-side text extraction from uploads
  adoption-plan-markdown.ts           ← markdown-subset parser shared by modal + PDF (no tables)
  adoption-plan-pdf.ts                 ← jsPDF export
  roles.ts                              ← hasRole/hasAnyRole/isAdmin
  supabase/{client,server,admin}.ts      ← Supabase client factories (admin = service-role)
  logger.ts                               ← fire-and-forget Google Sheets logging
/components
  SiteHeader.tsx            ← "← Back | 100 Pathways / Adoption Companion" (matches Diffusion Library)
  Sidebar.tsx                 ← nav (New adoption / Your adoptions / The Wiki / Admin) + recent list; mobile drawer
  AdoptionWorkspace.tsx        ← the whole experience: welcome hero (glow-input) → conversation + grid + docs
  CoverageGrid.tsx              ← the 4×4 standing grid, density symbols, click-to-inspect cells
  ChatPanel.tsx                  ← conversation panel (**bold** inline rendering)
  AttachmentsPanel.tsx            ← file staging panel (desktop side / mobile sheet)
  AdoptionPlanModal.tsx            ← generated-document modal with version history + PDF download
  PathwayDraftModal.tsx              ← "Review as Wiki Page": preview/edit/approve a draft pathway page
  WikiMarkdown.tsx                    ← markdown renderer with pipe-table support, used by /wiki and the draft modal
  AdminDashboard.tsx                    ← role checkboxes + reject
  PathwaySubmissionsPanel.tsx            ← admin list of approved drafts, expand + mark reviewed
  SignOutButton.tsx
```

Deleted in the revamp: Explore (routes, prompts, modes, `pathway_cache`), `DimensionList`, `Cube3D`/`CubeIcon`, `lib/pathways.ts`, the 7-dimension `cube_update` contract, and the email-flow leftovers remain dormant (`lib/email.ts`, `nodemailer` — see SIGNUP_APPROVAL_OPTIONS.md).

## The `/api/chat` route handler

Receives `{ messages, mode, grid?, meta?, versionNumber?, designId? }`. Modes:

- `companion` — the conversation. Every response ends with a `<grid_update>` JSON block: `{ cells: { "persona:Explore": { density: 0-3, note } , …changed cells only }, meta: { name, sector, geography, stage, summary } }`. `meta.stage` is only ever filled from the user's own statement. Client merges cells and strips the block for display (truncating at the opening tag, since it streams). Every companion-mode call also inserts the user's last message into `adoption_queries` (fire-and-forget, `designId` tags it) — recorded material for future cross-adoption insight gathering, not surfaced anywhere yet.
- `analysis-doc` — full standing document: coverage-grid section in density notation, per-dimension narrative, Related Pathway Experience, Open Threads. Descriptive, never prescriptive.
- `plan-document` — 4-section executive doc (Project Summary / Key Gaps ≤10 / Key Recommendations ≤5, each grounded in a named pathway / Next Steps ≤5, only user-surfaced actions). Title: `<name> Plan Doc v<N>`.
- `extract-insights` — silent, one-shot pass over a single uploaded document, called immediately on upload (before any conversation) from `extractInsightsForAttachment` in `lib/adoption-conversation.ts`. Returns only a `<grid_update>` block; seeds the grid the moment a file lands rather than waiting for the first chat turn.
- `pathway-draft` — drafts the current conversation as a candidate pathway document, in the exact Sections 0–6 + Provenance-appendix structure the real corpus uses (`content/pathway-generation-prompt.md` injected as the spec). Triggered by "Review as Wiki Page" in `AdoptionWorkspace.tsx`; never publishes anything itself — approving in `PathwayDraftModal.tsx` inserts a row into `pathway_submissions` for admin curation only.

All modes require an approved account (`hasAnyRole`) — 403 otherwise. Max tokens: 2048 companion, 1024 extract-insights, 4096 analysis/plan doc, 6144 pathway-draft.

## The companion's posture (lib/system-prompts.ts)

The defining constraint, from the product owner: **recommend, don't steer.**

- Never sets the agenda: no "let's look at X next," no guided journey, no unprompted "have you thought about…".
- Never assigns/recommends a stage; records the user's stated stage silently.
- Recommends freely on whatever the user raises — what's strong, what's thin, what a named pathway did in a comparable spot, with applies-when/fails-when conditions.
- Answers "what should I look at next / where are my gaps?" honestly when asked — that's the user leading.
- Stage-weighting (Primary/Secondary/Dormant) is used silently to calibrate attention, never to redirect.
- Document uploads are read against the framework and reflected back as observations ("the document doesn't cover X" is a finding), never as an agenda.
- Style: simple English, 4-sentence hard cap plus at most one clarifying question, genuine energy, varied phrasing.

## Auth, approval, and roles

Unchanged from before the revamp (see git history for detail): `proxy.ts` gates everything but `/login`; signup is a request-access form (`supabase.auth.signUp` with name/organization metadata — requires "Confirm email" disabled in Supabase); zero rows in `user_roles` = pending, and `app/(app)/layout.tsx` shows an awaiting-approval screen; `/admin` (env `ADMIN_EMAILS` fallback OR the `admin` role) lists users with per-role checkboxes and destructive Reject. **Role semantics changed with Explore's removal**: any role grants full companion access — `adopter`/`pathway_contributor` currently carry no extra gating (kept for future use).

## Supabase tables

- **`designs`** — one row per adoption: `meta`, `grid_state` (renamed from `cube_state` in migration 0008, which also cleared pre-revamp test rows), `messages` jsonb. Lazy creation on first send **or** first uploaded document (whichever happens first — `extract-insights` needs a row to seed).
- **`design_documents`** — versioned generated docs, content-hash cached.
- **`pathway_submissions`** (migration 0009) — approved "Review as Wiki Page" drafts: `design_id`, `content`, `status` (`pending_review`/`reviewed`/`published`, extended in migration 0012). Owner can insert/view their own; admin review/publish is via the service-role client only (`app/api/admin/pathway-submissions/{review,publish}/`), same pattern as role assignment.
- **`adoption_queries`** (migrations 0010, 0011) — every companion-mode user message, insert-only, tagged with `pathway_slugs` (parsed from that turn's `<grid_update>.pathwaysReferenced` — which pathways the response actually drew on) for future cross-adoption insight gathering. Nothing reads this yet.
- **`published_pathways`** (migration 0012) — admin-published community pathways: publicly readable (RLS `using (true)`) so any approved user can see them at `/wiki`, and `loadWikiContext()` merges them into the companion's grounding corpus too. Publishing an approved submission (`app/api/admin/pathway-submissions/publish/`) slugifies the adoption's name (checked for collisions against both the static files and this table), inserts here, and flips the submission to `status: 'published'`. No git commit or redeploy needed — this is why the corpus is DB-backed for community content while the original 7 curated pathways stay as static files.
- **`user_roles`** — `(user_id, role)` grants: general_user | adopter | pathway_contributor | admin.
- Inert leftovers: `pathway_cache`, `wiki_cache`, `pending_signups` (nothing reads or writes them).

Migrations 0008 through 0012 must be run in the Supabase SQL Editor for the app to work post-revamp.

## Environment variables

```
ANTHROPIC_API_KEY=your_key_here
WIKI_PATH=/absolute/path/to/a/wiki/checkout   # optional; defaults to content/wiki/ in this repo
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server-only, /admin actions
ADMIN_EMAILS=a@x.com,b@y.com         # permanent admin fallback
GOOGLE_SHEET_ID=...                  # optional logging
GOOGLE_SERVICE_ACCOUNT_JSON={...}    # optional logging
```

`GITHUB_WIKI_BASE_URL`/`NEXT_PUBLIC_GITHUB_WIKI_BASE_URL` and the `SES_SMTP_*`/`EMAIL_FROM_ADDRESS`/`APP_URL` sets are no longer read by any active code path.

## Out of scope / not yet built

- Cross-user insights UI ("what did others ask about a pathway like mine") — `adoption_queries` now records the raw material for this, but nothing reads or surfaces it yet
- A full contributor/admin curation workflow for `pathway_submissions` beyond the basic list + "mark reviewed" in `/admin` — no diff view, no one-click "add to `content/wiki/`"
- Richer workspace views beyond the coverage grid + chat
- Legacy binary Office formats (.doc, .ppt) for uploads
