---
type: Pathway
title: Voice AI for Farmer Advisory — Maharashtra
description: Maharashtra's state-run voice advisory line for farmers (MahaVISTAAR) — 1.67M+ questions answered, and the architecture, data, and governance decisions behind it.
resource: tel:155313
tags: [Voice AI, Agriculture, Government]
stage: Scale
timestamp: 2026-07-26
---

# Overview

A state government-run voice advisory system for smallholder farmers in
Maharashtra — crop advisory, pest management, market pricing, government
scheme access, and grievance tracking through a single voice call on
any phone. Built by the Department of Agriculture (Government of
Maharashtra), EkStep Foundation, and the OpenAgriNet (OAN) ecosystem.

**Who it serves.** Smallholder farmers in Maharashtra — primarily
Marathi-speaking, feature-phone users, with limited literacy and no
reliable internet. Women farmers who do the actual farming while land
titles stay in their husbands' names are the sharpest version of the
excluded user this pathway names.

**Scale achieved.** 342K+ unique users · 1.67M+ questions answered ·
791K+ sessions · 17 lakh farmers reached daily via proactive voice
alerts · 97–98.5% positive feedback.

**Cost anchor.** ~$250K setup, ~$250K/year at scale (mid-2026). AI
inference cost dropped 180× after moving off a bundled provider:
₹9.4 → ₹0.05 per question.

**Compression evidence.** MahaVISTAAR took 9 months to build from
scratch, with 30 partner organisations and 3 million farmers reached —
there was no prior pathway to draw on. Ethiopia's ATI, building on
MahaVISTAAR's architecture, took 3 months. Amul/Sarlaben, drawing on
two full cycles of shared learning, launched in 3 weeks and served 3.6
million farmers and 40 million cattle from day one.

**Where this pathway doesn't apply.** Strongest where the population is
feature-phone-dependent and Indic-language-speaking, institutional
credibility is a trust asset, and the data needed already exists in
fragmented institutional form. Weaker where users already have
smartphones and text literacy, government credibility is contested, or
the goal is internal efficiency rather than last-mile inclusion.

# Problem

## Explore

Maharashtra's smallholder farmers had no single point of access to
integrated agricultural guidance. The state agricultural university
held crop knowledge, IMD held weather, APMCs held mandi prices, MahaDBT
held scheme status — none of it reachable through one call. The problem
wasn't creating new knowledge; it was connecting what already existed.
Maharashtra had roughly one agriculture field officer for every 2,000
farmers in comparable states: a non-AI advisory model scales with
staff, an AI advisory model scales with usage.

## Define

The gap between the AI use case and the current state — not the
technology — is what should be sized before committing. Voice was
needed because the target population was uniformly feature-phone-
dependent, Marathi-speaking, and text-illiterate; that's a strong,
context-specific claim, not a universal one.

## Pilot

The system launched as inbound-only (farmers call 155313 with
questions) before the second phase shifted to proactive outbound —
crop calendar advisories, pest alerts, pre-harvest timing. The shift
changed the service from "useful when you remember" to "indispensable
because it finds you."

## Scale

205,000+ monthly queries created a visible, quantified demand signal
for agricultural knowledge that had previously been tacit — AI adoption
revealed institutional data gaps that were invisible before.

# Persona

## Explore

"Farmers" isn't specific enough to design against. The real target was
women farmers in Marathwada who rely on small trust circles, don't
visit agriculture offices, and receive contradictory advice from
fertiliser sellers with an incentive to sell. Land titles stay in
husbands' names while women do the actual farming, so the "registered
farmer" in government systems is often not the person making crop
decisions day to day.

## Define

Precise persona definition determines the channel, model, data,
language, and testing process — treated as an explicit, resourced first
milestone, not a formality.

## Pilot

Not distinctly separated from Define in this deployment — persona
validation happened through the staged testing plan (see Institution ×
Pilot) rather than as a separate workstream.

## Scale

At scale, demand for languages beyond the original Marathi persona
(Hindi, Bhili, English) surfaced — the persona the system was originally
built for turned out to be narrower than the population that showed up.

# Technology

## Explore

The core architectural bet: no AI model is permanent, so the
infrastructure beneath it (institutional data sources, open network
protocols, farmer registries) must stay stable as models evolve. Follows
the seven-layer OpenAgriNet design: user layer, interface layer,
moderation layer, AI decision engine, knowledge and scientific models,
live data sources, DPI foundation.

## Define

**Start bundled, plan to unbundle.** First production version ran on
GPT-4.1 via Azure OpenAI (~₹9.4/question) — the right call for speed.
Because the architecture was modular from day one, migrating later to a
self-hosted, fine-tuned model (Qwen3.5-27B) cut cost to ~₹0.05/question,
a 180× reduction. Build a provider abstraction layer on day one; resolve
the provider at configuration time, not in application code.

Two-endpoint moderation: an independent moderation model (GPT-OSS
Safeguard 20B) runs on entirely separate infrastructure from the
advisory engine (Qwen3.5-27B), so a problem with one doesn't disable
the other.

Data stays with its owner — the AI connects, it doesn't collect. Every
data source (ICAR crop advisories, IMD weather, APMC mandi prices,
NIPHM pest alerts, AgriStack farmer registry) stays with the owning
institution; the AI retrieves at query time rather than centralising
raw data.

## Pilot

Dual-provider principle: at peak load, route instantly to a fallback
provider rather than queuing — 3-4 seconds of silence reads as failure
on a voice call, not as processing. WebSocket APIs proved more practical
for Indian telephony than WebRTC.

## Scale

Tensor parallelism only accepts power-of-two GPU splits — a naive
split across advisory and moderation workloads stranded capacity. The
fix: a dedicated single-H100 moderation node, consolidating the main
node's 8 GPUs for the advisory LLM at TP=8. Self-hosted 16-GPU build-out
pencils at ~₹2 crore/year against a projected ~₹18 crore/year on Azure
at the same volume.

# Institution

## Explore

Institutional authorisation is the critical path, not the technology
build. MahaVISTAAR needed data-sharing sign-off across the Department
of Agriculture, four universities, IMD, 307 APMCs, and the state scheme
database before a line of code was written.

## Define

Before launch, the institution answered explicitly: who owns this
system; who approves what it can say; who decides what it must not say;
who reviews failures; who updates the knowledge base; who handles
complaints; who's accountable when it's wrong. An Agri Secretary-level
sponsor and named nodal officers were the first concrete decisions.

## Pilot

Design for refusal, not just response. A safety and stress-test bank
covers in-scope, out-of-scope, distress, abuse, jailbreak, and
escalation scenarios — 500 attack patterns, maintained as a living
document. Staged testing: builder team → small institutional group →
wider institutional group → limited district-level rollout, before
public expansion.

## Scale

Bounded ambition at pilot stage (selected Kharif districts, limited
crops, Marathi only) preceded national federation (Bharat-VISTAAR),
which came only after the state-level architecture was proven and
announced in the Union Budget 2026-27.

# Ecosystem

## Explore

The problem was fragmentation across institutions that don't talk to
each other — university, weather service, market committees, scheme
database — not absence of data.

## Define

Four primary data relationships were formalised before launch — ICAR,
IMD, APMC, NIPHM — each with a named institutional owner accountable
for accuracy and update frequency. Discovering an unowned data source at
Pilot stage costs months; have the conversation before any code is
written.

## Pilot

OpenAgriNet's architecture and Voiceera's open-source orchestration
platform address the gap between having language models and having a
deployable, maintainable system — model-agnostic, language-agnostic,
telephony-provider-agnostic, reusable across sectors.

## Scale

MahaVISTAAR's architecture became the reusable asset for the next
ecosystem members: Ethiopia's ATI built on it directly (3 months vs. 9);
Amul/Sarlaben drew on two full learning cycles (3 weeks, serving 3.6M
farmers and 40M cattle from day one).

# Workforce

## Explore

No dedicated workforce redesign at Explore — the gap was institutional
data access, not staffing.

## Define

n/a — see Institution × Define for the ownership roles named at this
stage.

## Pilot

AI extends human capacity; it does not replace it. Extension officers
handle the relationship; the system handles the 3am question — framed
as capacity extension with explicit rules for when humans must stay in
the loop.

## Scale

Open question, not yet documented: whether extension officers resisted
MahaVISTAAR, what form that took, and whether any reduced their own
advisory capacity because the system was available (flagged as an
information gap in the source pathway document itself).

# Operating Model

## Explore

n/a at this stage — see Technology × Explore for the architectural
philosophy that operating-model decisions later depend on.

## Define

The operating model question is a staffing question, not just a
funding one: who decides when the model needs retraining, who updates
the advisory corpus, who manages vendor relationships. "The people who
built it" is not an operating model.

## Pilot

Small experience choices decide whether the interaction feels alive or
broken: a hold message plus a latency fix cut dead silence from 3-4
seconds to ~1 second; introductions kept under 30 seconds; follow-up
nudging softened for a public-service (not commercial) tone. A typical
exchange now completes in 12-15 seconds.

## Scale

Cost architecture: input tokens made up 79.7% of total spend, making
prefix caching — not output-token efficiency — the primary cost lever.
205,000+ monthly queries only improve the system if someone owns acting
on the signal; without an owner, the system degrades invisibly until
trust is already damaged.

# Lessons for the Next Adopter

* Define the excluded user in one precise sentence before choosing a channel — not a demographic.
* Start bundled to learn fast; build the provider-abstraction layer on day one so unbundling later doesn't require a rebuild.
* Decouple safety from advisory on separate infrastructure — they must fail independently.
* Name the data owner before naming the data source; this is an institutional negotiation, not a technical one.
* Institutional ownership and refusal design are pre-launch questions — "we'll figure it out after launch" is a stop sign.
* Design for both inbound and outbound from the start if the use case has structured trigger data (weather, crop calendar, scheme deadlines).
* Plan multilingual expansion before launch — demand for languages beyond the first one arrives after, not before.
* The operating model is a staffing question: someone has to own continuous improvement, or the system degrades invisibly.

# Citations

[1] Executive summary — `../../All Pathways/6. MahaVISTAAR /Executive Summary/EXECUTIVE SUMMARY_MahaVISTAAR.docx`
[2] Full diffusion pathway document — `../../All Pathways/6. MahaVISTAAR /Executive Summary/2. MahaVISTAAR - Diffusion Pathway.docx`
[3] Production serving architecture note — `../../All Pathways/6. MahaVISTAAR /Extended Pathway/MahaVistaar_ Production Serving Architecture — Internal Note (1).pdf`
[4] Information gaps questions — `../../All Pathways/6. MahaVISTAAR /Extended Pathway/MahaVISTAAR Information gaps questions.docx`
[5] JB interview for AI Diffusion — `../../All Pathways/6. MahaVISTAAR /Extended Pathway/JB interview for AI Diffusion_.docx`

Related pathway: [Voice AI for Inclusion](voice-ai-for-inclusion.md) (horizontal synthesis across MahaVISTAAR and other voice deployments); [Bhili Language Enablement](bhili-language-enablement.md) (the language effort that plugged into MahaVISTAAR's Vasudha voice bot).
