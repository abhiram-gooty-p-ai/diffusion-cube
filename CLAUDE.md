# 100 Pathways — Adoption Companion

## What this is

A Next.js web app, the conversational companion to **100pathways.com** — themed to match it exactly and linked back to it from every page's header. A signed-in user works through their own AI adoption in a single workspace: they upload documents and/or talk, and everything they hear back is grounded in a corpus of real deployment pathways (the Diffusion Library wiki). The companion is **fully user-led**: it recommends on content the user raises (grounded in named pathway precedents with condition tags) but never sets the agenda, never proposes what to discuss next, and never assigns or recommends a stage. Standing is tracked on a **4 dimensions × 4 stages coverage grid** rendered in the same density notation (○/●/●●/●●●) the pathway documents themselves use. Two documents can be generated at any point (Analysis Doc, Plan Document), versioned and cached in Supabase.

This is the `revamp-100pathways` branch — a full revamp replacing the earlier "AI Diffusion Studio" app (Explore mode, 7 dimensions, cream/brown theme all removed). Phase 2 (document-insight extraction seeding the grid, richer workspace) is planned but not built.

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

The pathway corpus is the Diffusion Library wiki, read **from the local filesystem** (`lib/wiki-loader.ts`): `WIKI_PATH` env var (defaults to `/Users/abhiramgooty/projects/Diffusion Library/wiki`). `loadWikiContext()` reads `pathways/index.md`, parses the relative `(slug.md)` links, and loads all pathway pages (7 currently, whole corpus ≈ 22K tokens with the framework — fine at this size; revisit with retrieval when it grows). `loadFrameworkContent()` reads `content/framework.md` from this repo. All reads go through one `readSource()` function so the planned S3 move is a single swap.

**Deploy caveat**: local reads outside the repo work in dev but NOT on Vercel — before deploying, either commit the wiki into this repo or complete the S3 move. The old GitHub-raw fetching and the `wiki_cache`/`pathway_cache` Supabase tables are no longer used (tables still exist in the DB, inert).

## Project structure

```
/app
  layout.tsx                ← fonts (Inter/DM Sans/PT Serif/Geist Mono), metadata
  globals.css                ← 100 Pathways theme tokens + animations (fade-in-up, bounce-dot, glow-input)
  login/page.tsx              ← sign-in / request-access (Supabase email+password, admin approval)
  admin/page.tsx               ← user approval + role management (see Auth section)
  api/chat/route.ts            ← modes: companion | analysis-doc | plan-document
  (app)/
    layout.tsx                  ← SiteHeader + approval gate (hasAnyRole) + Sidebar
    page.tsx                     ← the landing: AdoptionWorkspace in welcome state
    adoptions/page.tsx            ← grid of the user's saved adoptions (?open=<id> deep link)
proxy.ts                    ← auth middleware (public: /login only)
/content
  framework.md               ← THE framework (question bank, weights, unit types) — prompt-injected
  pathway-generation-prompt.md ← contributor-side generation prompt (not runtime)
/lib
  dimensions.ts              ← structural shape: 4 dimensions, sub-categories, weights, GridState types
  system-prompts.ts           ← companionSystemPrompt (user-led), analysisDocSystemPrompt, planDocumentSystemPrompt
  adoption-conversation.ts     ← useAdoptionConversation hook: lazy row creation, grid_update parsing, attachments
  adoptions-cache.ts            ← 60s TTL cache for the adoptions list
  design-documents.ts            ← versioned Analysis Doc / Plan Document storage + content-hash caching
  wiki-loader.ts                  ← local-FS corpus reads (see above)
  extract-text.ts                  ← client-side text extraction from uploads
  adoption-plan-markdown.ts         ← markdown-subset parser shared by modal + PDF
  adoption-plan-pdf.ts               ← jsPDF export
  roles.ts                            ← hasRole/hasAnyRole/isAdmin
  supabase/{client,server,admin}.ts    ← Supabase client factories (admin = service-role)
  logger.ts                             ← fire-and-forget Google Sheets logging
/components
  SiteHeader.tsx            ← "← Back | 100 Pathways / Adoption Companion" (matches Diffusion Library)
  Sidebar.tsx                 ← nav (New adoption / Your adoptions / Admin) + recent list; mobile drawer
  AdoptionWorkspace.tsx        ← the whole experience: welcome hero (glow-input) → conversation + grid + docs
  CoverageGrid.tsx              ← the 4×4 standing grid, density symbols, click-to-inspect cells
  ChatPanel.tsx                  ← conversation panel (**bold** inline rendering)
  AttachmentsPanel.tsx            ← file staging panel (desktop side / mobile sheet)
  AdoptionPlanModal.tsx            ← generated-document modal with version history + PDF download
  AdminDashboard.tsx                ← role checkboxes + reject
  SignOutButton.tsx
```

Deleted in the revamp: Explore (routes, prompts, modes, `pathway_cache`), `DimensionList`, `Cube3D`/`CubeIcon`, `lib/pathways.ts`, the 7-dimension `cube_update` contract, and the email-flow leftovers remain dormant (`lib/email.ts`, `nodemailer` — see SIGNUP_APPROVAL_OPTIONS.md).

## The `/api/chat` route handler

Receives `{ messages, mode, grid?, meta?, versionNumber? }`. Modes:

- `companion` — the conversation. Every response ends with a `<grid_update>` JSON block: `{ cells: { "persona:Explore": { density: 0-3, note } , …changed cells only }, meta: { name, sector, geography, stage, summary } }`. `meta.stage` is only ever filled from the user's own statement. Client merges cells and strips the block for display (truncating at the opening tag, since it streams).
- `analysis-doc` — full standing document: coverage-grid section in density notation, per-dimension narrative, Related Pathway Experience, Open Threads. Descriptive, never prescriptive.
- `plan-document` — 4-section executive doc (Project Summary / Key Gaps ≤10 / Key Recommendations ≤5, each grounded in a named pathway / Next Steps ≤5, only user-surfaced actions). Title: `<name> Plan Doc v<N>`.

All modes require an approved account (`hasAnyRole`) — 403 otherwise. Max tokens: 2048 companion, 4096 docs.

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

- **`designs`** — one row per adoption: `meta`, `grid_state` (renamed from `cube_state` in migration 0008, which also cleared pre-revamp test rows), `messages` jsonb. Lazy creation on first send.
- **`design_documents`** — versioned generated docs, content-hash cached.
- **`user_roles`** — `(user_id, role)` grants: general_user | adopter | pathway_contributor | admin.
- Inert leftovers: `pathway_cache`, `wiki_cache`, `pending_signups` (nothing reads or writes them).

Migration 0008 must be run in the Supabase SQL Editor for the app to work post-revamp.

## Environment variables

```
ANTHROPIC_API_KEY=your_key_here
WIKI_PATH=/absolute/path/to/Diffusion Library/wiki   # optional; defaults to the sibling checkout
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server-only, /admin actions
ADMIN_EMAILS=a@x.com,b@y.com         # permanent admin fallback
GOOGLE_SHEET_ID=...                  # optional logging
GOOGLE_SERVICE_ACCOUNT_JSON={...}    # optional logging
```

`GITHUB_WIKI_BASE_URL`/`NEXT_PUBLIC_GITHUB_WIKI_BASE_URL` and the `SES_SMTP_*`/`EMAIL_FROM_ADDRESS`/`APP_URL` sets are no longer read by any active code path.

## Out of scope / not yet built

- Phase 2: dedicated document-insight extraction seeding the grid on upload (today uploads flow through the normal conversation turn); richer workspace views
- Cross-user insights ("what did others ask about this pathway") — explicitly deferred by the product owner
- S3 (or committed-in-repo) corpus hosting — required before any Vercel deploy
- Contributor-facing features for `pathway_contributor`
- Legacy binary Office formats (.doc, .ppt) for uploads
