---
type: Pathway
title: Voice AI for Tribal Language Inclusion — Nandurbar
description: Bringing Dehwali Bhili, a zero-digital-resource tribal language, into ASR/NMT/TTS and into MahaVISTAAR's live voice bot in ~100 days.
tags: [Voice AI, Language, Tribal Inclusion]
stage: Pilot
timestamp: 2026-07-06
---

# Overview

Bringing a zero-digital-resource tribal language — Dehwali Bhili — into
the voice AI ecosystem: automatic speech recognition (ASR), machine
translation (NMT), and text-to-speech (TTS) — and into a live
government advisory service. Source deployment: Project Astitva,
Nandurbar district, Maharashtra, led by the District Administration
with Bhashini (national platform), Karya (data collection partner),
and AI4Bharat/IIT Madras (model building).

**Who it serves.** 10 million+ Bhili speakers nationally; within
Nandurbar, tribal community members — particularly women farmers who
have smaller advice networks, limited exposure to Marathi, and are
often excluded from government schemes reaching everyone else.

**Scale achieved.** 60,000+ voice samples and 60,000 Bhili–Marathi
translation pairs collected in about one month from a standing start;
~60 hours of spontaneous speech and 2 hours of studio-quality voice.
Now live inside MahaVISTAAR's Vasudha voice bot.

**Cost anchor.** ~₹27 lakh for Phase 1, fully government-funded; ~₹20
lakh of that paid directly to community contributors. Model training
was subsidised by AI4Bharat in exchange for open data.

**Compression evidence.** Compressed into ~100 days end to end
(collect → build → deploy) from an absolute zero — no prior ASR/NMT/TTS
resource for the language. The next languages using the same playbook —
Mathwadi Bhili, Mavchi, Pawari, and eventually Bodo, Garo — are expected
to move faster.

**Where this pathway doesn't apply.** Built from a tribal, zero-resource
language effort anchored to a government deployment. If your language
already has some digital presence, or your effort isn't tied to a
specific service a community will actually use, some of this won't
transfer cleanly.

# Problem

## Explore

Bhili was not chosen through a language-needs survey — it surfaced as a
side effect of EkStep's Voice AI team building an agriculture advisory
bot with Maharashtra's Agriculture Department, discovering Nandurbar
district had already started an independent Bhili voice-data collection
effort through Karya, running in isolation from the model-building side.

## Define

The first question isn't "can we build a Bhili model" — it's "who is
currently excluded from a service they're entitled to, and would
hearing it in their own language change that." The second question:
is there an institution ready to own this, not just fund a
data-collection sprint.

## Pilot

Local people were not comfortable in Marathi and were missing out on
government schemes in agriculture, health, and education — exclusion
fell hardest on women, who more often stayed within the household and
had far less Marathi exposure and often no smartphone.

## Scale

The goal was never one deployment in one district — it was reusable
public language infrastructure a state department or community network
can pick up and run themselves.

# Persona

## Explore

Not "Bhili speakers" generically — the specific persona was tribal
women farmers in Nandurbar with smaller advice networks, limited
Marathi, and least access to the schemes reaching everyone else.

## Define

"Let's be careful when we say low-resource languages. They are not
low-resource cultures. They are not low-resource communities. They are
low-resource in our digital imagination." — Dr. Mittali Sethi, District
Collector, Nandurbar.

## Pilot

Community as custodian, not subject: recruitment was deliberately kept
local-administration-led rather than vendor-led, since community
members trusted an effort visibly backed by government over one run by
an unfamiliar vendor.

## Scale

n/a — persona was fixed at Explore/Define; scale efforts (Mathwadi
Bhili, Mavchi, Pawari) will each need their own persona validation.

# Technology

## Explore

Bringing a language onto the AI map means building three connected
capabilities in sequence: ASR (hear and understand, including pauses
and hesitation), NMT (translate Bhili ↔ Marathi so existing government
content doesn't need recreation), TTS (speak back naturally).

## Define

Reuse before you build: AI4Bharat fine-tuned an existing open model,
bootstrapping Bhili from Marathi (a higher-resource neighbour) rather
than starting from zero architecture — the single most transferable
technical decision in the whole effort.

Settle dialect, code-switching, and script before recording, not after.
A model trained on one dialect cluster underperforms for others; a
script dispute reached after collection starts can stall the entire
effort, since it's as much political as technical.

## Pilot

What was collected, in order: translation pairs (60,000, sourced from
existing agricultural/government content), naturalistic spoken
recordings (~60 hours, spanning dialects/ages/genders), telephony-grade
(8kHz) recordings — not just clean broadband — and studio-quality voice
data (~2 hours/artist). A model trained only on clean, studio-style
audio from young, standard-dialect speakers fails everyone else — the
first attempt made exactly this mistake.

## Scale

Word Error Rate (ASR), BLEU score (translation), and Mean Opinion Score
(TTS naturalness) are the three yardsticks to ask a technical partner
to report at each milestone. Early tribal-language models typically
land well below production-grade on all three at first pass —
expected, not a red flag, if treated as a first iteration.

# Institution

## Explore

The champion mattered more than the technology: the effort was led and
personally driven by Nandurbar's District Collector, who connected the
pre-existing Karya data-collection effort to the AI4Bharat/MahaVISTAAR
side and spent political and administrative capital keeping it moving.

## Define

Five non-negotiable conditions: community trust and informed
participation; a clear deployment use case; an institutional anchor
that owns the project through its ups and downs; ethical and fair
compensation paid promptly; a quality structure (contributors, checkers,
expert validators) running from day one, not just at the end.

## Pilot

Consent given in the community's own language, with a real option to
withdraw. Benefit visible within months, not years. Diversity of
contributors across age, gender, dialect, and education is not
optional.

## Scale

Sustainability requires a standing mandate or MOU, not a project
anchored to one official's tenure — political or administrative change
is one of six ways this kind of effort typically fails.

# Ecosystem

## Explore

No single actor could have done this alone: district administration,
community contributors, Karya, State Agriculture Department and POCRA,
Bhashini, AI4Bharat, linguistic experts, and EkStep Foundation
orchestrating across all of them.

## Define

Who needs to be at the table: convening authority (District Collector),
community contributors (translators, audio contributors), linguistic
experts/validators, community leaders/influencers, data collection
platform (Karya), national AI platform (Bhashini), technical partner
(AI4Bharat/IIT Madras), deployment partner (State Agriculture
Department, POCRA).

## Pilot

Recordings were made in an existing community radio station — no
studio was built — and data was gathered by the district's own
Bhili-speaking agriculture officers, recruited on local trust.

## Scale

With the playbook in hand, the next languages are already in motion —
Mathwadi Bhili, Mavchi, Pawari next, with Bodo, Garo, and others on the
map, via BhashaDaan (bhashini.gov.in/bhashadaan) for crowdsourcing and
Shoonya (AI4Bharat) for annotation workflows.

# Workforce

## Explore

The district's own Bhili-speaking agriculture officers, rather than an
external hiring pipeline, did the on-the-ground recruitment and
data-gathering work.

## Define

Contributors split into roles: multilingual translators, audio
contributors who read a script aloud, and audio contributors who can
only speak (given topics or images instead).

## Pilot

Sustaining motivation across months needed continuous engagement with
senior community members and local influencers — one individual who
headed a local Adivasi language preservation community recorded eight
hours of material in a single studio sitting once engaged.

## Scale

The linguistic-expert bottleneck is a named failure mode: a single
validator leaving can stall everything, so scale requires a distributed
pool of at least 5–10 validators, not one person.

# Operating Model

## Explore

n/a — see Institution × Explore for the champion-led starting
condition this stage depends on.

## Define

Frugal by design in three places at once: technology (fine-tune, don't
build from scratch; open dataset out via AI Kosh and Bhashini), process
(existing community radio station, local trust-based recruitment), and
cost (contributors paid per word — ~₹1 to validate, ~₹2 to
transcribe/translate — fair pay treated as the point, not a line item).

## Pilot

What nearly went wrong the first time: generic engagement without a
deployment target, data tuned for clean audio that performs poorly on
real telephony, and no hard deadline so the work drifted. Fixed by
process changes — anchoring to MahaVISTAAR as the deployment target,
shifting sampling toward conversational/telephony conditions, and using
the India AI Impact Summit as a hard deadline that compressed the first
phase to ~1 month.

## Scale

Sustainability is an operating model, not an afterthought: AI4Bharat,
Bhashini, and the local administration need defined ongoing roles —
continuous monitoring/feedback loops, and a plan to extend the same
language infrastructure to sectors beyond agriculture (health,
education, citizen feedback) so the effort isn't seen as single-use.

# Lessons for the Next Adopter

* Find your champion first — a committed institutional anchor with real authority is the precondition, not a nice-to-have.
* Name the deployment target before collecting a single recording — a language effort with no service to plug into is a dataset, not a pathway.
* Design data collection for real conditions (dialects, code-switching, telephony audio) from session one, not as a Phase 2 correction.
* Treat compensation and visible, near-term benefit as the trust mechanism, not a cost to minimise.
* Don't work in isolation — bring the data platform, national AI platform, technical partner, and deployment partner to the table from day one.
* Plan for sustainability as a multi-stakeholder operating model, including a path to the next sectoral use case.

# Citations

[1] Full pathway document — `../../All Pathways/2. Bhili /Executive Summary/Bhili pathway v1.docx`
[2] Low-resource language AI map blueprint — `../../All Pathways/2. Bhili /Extended Pathway/Low Resource Language AI Map Draft 1.1 (1).pdf`
[3] Astitva Booklet — `../../All Pathways/2. Bhili /Extended Pathway/Astitva Booklet.pdf`
[4] Interview transcript — `../../All Pathways/2. Bhili /Extended Pathway/Otter_Bhili_transcript.pdf`
[5] Extended pathway draft — `../../All Pathways/2. Bhili /Extended Pathway/Bhili pathway v1.docx`

Related pathway: [MahaVISTAAR](mahavistaar.md) (the deployment Bhili's voice models now live inside); [Voice AI for Inclusion](voice-ai-for-inclusion.md) (cites the Bhili effort as its low-resource-language case).
