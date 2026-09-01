---
type: Pathway
title: Voice AI — Cross-Deployment Synthesis — Multi-Geography
description: A cross-deployment synthesis of what MahaVISTAAR, BharatVISTAAR, Amul/Sarlaben, Jal Jeevan Mission Assam, and the Bhili effort learned about reaching users excluded by literacy, language, device access, or connectivity.
tags: [Voice AI, Inclusion, Cross-deployment]
stage: Scale
timestamp: 2026-07-26
---

# Overview

A horizontal pathway synthesised across multiple voice deployments —
not one case study but the recurring implementation questions that
showed up in all of them. Source deployments: MahaVISTAAR
(Maharashtra), BharatVISTAAR, Amul/Sarlaben, Jal Jeevan Mission Assam,
the Bhili language effort, Lend A Hand, and the India–Africa exchange
with Crane AI Labs.

**Who it serves.** Female farmers, feature-phone users, Indic language
speakers, migrant labourers, rural households — users excluded by
existing digital service channels.

**Scale achieved.** MahaVISTAAR: 342K+ unique users, 1.67M+ questions
answered, 17 lakh farmers/day via proactive alerts. Amul/Sarlaben: 3.6M
farmers, launched in 3 weeks.

**Cost anchor.** ~$250K setup, ~$250K/year at MahaVISTAAR's scale
(mid-2026) — an order-of-magnitude anchor, not a voice-specific
benchmark.

**Compression evidence.** 9 months (MahaVISTAAR, built from scratch) →
3 months (Ethiopia's ATI, drawing on MahaVISTAAR) → 3 weeks
(Amul/Sarlaben, drawing on two full learning cycles).

**Where this pathway doesn't apply.** Built from deployments solving
access problems. If the use case is closer to internal automation, or
users are already comfortable with apps and smartphones, this won't
transfer cleanly.

# Problem

## Explore

The deployments that struggled started with a technology they wanted to
try — "we want to do voice AI" is a legitimate starting point, but only
if it's quickly tied to a specific excluded user rather than left as a
technology in search of a problem.

## Define

The gap between the AI use case and the current state — not the
technology — is what should be sized before committing. Many
organisations already use human callers for outreach; voice AI should
be benchmarked honestly against that, including against doing nothing.

## Pilot

Several deployments romanticised voice and discovered later that some
users needed to send images, some preferred text in noisy environments,
and some needed human escalation the bot couldn't provide. Voice opens
the door; the service may need other channels to complete the journey.

## Scale

A recurring pattern across sectors: agriculture, water-service
feedback, dairy cooperatives, intern check-ins, and low-resource
language access all hit the same underlying questions, regardless of
sector.

# Persona

## Explore

Not "farmers" but "women farmers in remote districts who rely on small
trust circles"; not "youth" but "interns across dispersed locations
needing fortnightly feedback that two human callers can't keep up
with"; not "citizens" but "rural households on piped water where the
government needs to know if water actually arrives daily."

## Define

Precise user definition is the single highest-leverage step, and
sometimes a genuine luxury requiring multiple rounds of discussion —
where it can't be resolved upfront, it should be an explicit, resourced
first milestone, not a formality skipped on the way to building.

## Pilot

The Lend A Hand example: one human caller manages 60-80 calls a day at
~₹1,000 daily wage; two callers couldn't cover the required frequency
at any wage. Voice AI extends reach without replacing the human
judgement complex cases still need.

## Scale

Users don't trust a voice system because it's AI — they trust it
because of who stands behind it. The institution behind the voice is
part of the product, especially for personas with small trust networks.

# Technology

## Explore

Five layers connect in sequence for a telephony-led use case: telephony,
ASR, LLM, TTS, orchestration. In offline/edge deployments (India-Africa
exchange with Crane AI Labs), the telephony layer may not be needed —
ASR-LLM-TTS runs locally on-device.

Two independent lenses before choosing an architecture: what capacity
do you already have (zero / limited / evolved technical team), and what
do you actually want (test quickly / scale quickly / long-term
sovereignty)? There's no single correct starting point — only one that
matches actual position, not an aspirational one.

## Define

Start bundled, plan to unbundle: a team with limited capacity testing
quickly should start fully bundled without apology; a team with an
evolved technical function wanting sovereignty may unbundle earlier.
Model selection, in order: conversational language support (not
nominal); latency (1-2 seconds, non-negotiable on a call); sectoral
precedent; long-term control; cost at scale.

## Pilot

Use metrics to reject a model, use users to select it. One deployment
passed every benchmark and then hit a dialect gap its test group hadn't
covered — there's no shortcut on this. Shortlist multiple vendors and
test in parallel during the pilot; usage-based pricing means this
rarely adds much cost relative to the lock-in risk it removes.

## Scale

Open orchestration as shared infrastructure: the recurring gap wasn't
the absence of language models, it was the absence of an orchestration
layer connecting them into a deployable system. Voiceera (open-source,
model-agnostic, language-agnostic, telephony-provider-agnostic) fills
this gap. WebSocket APIs proved more practical than WebRTC for Indian
telephony conditions specifically.

# Institution

## Explore

n/a — institutional ownership questions belong to Define; Explore is
about naming the excluded user and channel (see Problem, Persona ×
Explore).

## Define

Two questions must be answered before launch, not deferred: who owns
this channel and is accountable for its output, and what is the bot not
allowed to say? A voice agent can be technically ready and
institutionally homeless — no owner, no update process, nobody
accountable when it fails.

## Pilot

Design for refusal, not just response: build a safety/stress-test bank
covering out-of-scope, distress, harassment, romantic/inappropriate
prompts (especially with a female voice), jailbreak attempts, and
escalation triggers, before public launch. Institutional testing is
staged: builder team → small institutional group → wider group across
geographies/accents → limited public rollout. Don't outsource trust to
a vendor.

## Scale

Scale readiness means control: if the institution can't change vendors,
update data, monitor failures, or govern safety, it isn't ready to
scale.

# Ecosystem

## Explore

n/a — see Technology × Scale for the orchestration-layer ecosystem
insight, which is really about which stage of the ecosystem a project
can draw on.

## Define

For low-resource languages, the ecosystem — native speakers,
annotators, linguistic experts, model builders, hosting infrastructure,
a real-world application, a neutral convening authority — is the actual
deliverable; a dataset is one output of building that ecosystem, not
the goal itself.

## Pilot

A micro-innovation solved in one context is often reusable in a
completely different one — the same lesson about vendor lock-in and
parallel testing that applies to voice is just as relevant to a
data-unlock pathway.

## Scale

Not every deployment needs a large dataset: Jal Jeevan Mission Assam
needed phone numbers and five questions; MahaVISTAAR needed multiple
live, governed data sources. The minimum viable data requirement comes
from the use case, not from generic assumptions.

# Workforce

## Explore

n/a — workforce implications only became visible once deployments were
live (see Pilot).

## Define

Voice AI should extend human capacity, not automatically replace it —
this has to be a design decision made explicitly, not an afterthought.

## Pilot

The right design is almost always a combination: voice AI for repeated,
structured, scalable interactions; humans for sensitive, complex,
ambiguous, or high-risk cases. Framing voice AI as human replacement
designs the wrong system and loses institutional trust quickly.

## Scale

Extension officers and human agents handle the relationship; the system
handles the 3am question — an explicit division of labour that has to
be named, not assumed.

# Operating Model

## Explore

n/a — see Operating Model × Define for the two-phase framing this
pathway uses from the start.

## Define

Two phases: validate first (prove voice is the right channel for a
specific user/problem/institutional context, narrow use case, bundled
provider), then scale (unbundle where it matters, separate data from
the AI layer, plan multilingual expansion, build the safety bank, set
up monitoring).

## Pilot

Small experience choices decide whether the call feels alive or
broken: dead silence during backend fetch (fixed with a hold message
plus latency work), introductions under 30 seconds, lighter follow-up
prompts for public service tone (not commercial), and simpler
yes/no question design where it improves accuracy more than a better
model would.

## Scale

Cost is shaped by architectural decisions, not just negotiation:
premium TTS, proprietary LLMs, Indic tokenisation, agentic tool calls,
and long conversations all drive cost at scale — track cost per
minute, per interaction, by language, and for failed calls from pilot
onward. The work doesn't end at launch: someone must own continuous
improvement, or the system degrades invisibly.

# Lessons for the Next Adopter

* If you can't describe the excluded user in one precise sentence and honestly compare voice against what you do today, you're not ready to choose a channel.
* Start bundled to learn fast, but design the pilot so you can unbundle later without rebuilding everything.
* Use lab metrics to reject a model, real users to select it — a passing benchmark is a rejection filter, not a launch decision.
* Treat low-resource language work as ecosystem-building, not a data-collection task with a dataset as the only output.
* Institutional ownership and refusal design are pre-launch questions, not post-launch ones.
* The deployments that succeed build a learning loop around failure — they don't avoid it.

# Citations

[1] Full diffusion pathway document — `../../All Pathways/8. Voice AI - Santosh/Executive Summary_/1. Voice AI - Diffusion Pathway - V4.docx`
[2] Information gaps — `../../All Pathways/8. Voice AI - Santosh/Executive Summary_/Information gaps - Voice AI.docx`
[3] Interview transcript — `../../All Pathways/8. Voice AI - Santosh/Extended Pathway/Santosh Interview Transcript - AI Diffusion.docx`
[4] Voice pathway transcript — `../../All Pathways/8. Voice AI - Santosh/Extended Pathway/Voice Pathway Transcript (1).pdf`

Related pathways: [MahaVISTAAR](mahavistaar.md) and [Bhili Language Enablement](bhili-language-enablement.md) (source deployments this synthesis draws on); [Voice AI Adoption Barriers](voice-ai-adoption-barriers.md) (the organizational-readiness question this pathway's Institution and Operating Model dimensions assume).
