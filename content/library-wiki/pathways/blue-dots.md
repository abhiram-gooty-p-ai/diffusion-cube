---
type: Pathway
title: AI for Hyperlocal Job Discovery — National
description: Open voice-AI discovery infrastructure (Blue Dots) making local jobs, talent, and services visible to each other within a district — modelled on UPI.
tags: [Livelihoods, Discovery, District Economy]
stage: Scale
timestamp: 2026-07-26
---

# Overview

A shared, open voice-AI discovery infrastructure that makes local jobs,
talent, and services visible to each other within a district —
comparable in spirit to what UPI did for payments. Source deployments:
Dharwad, Karnataka (pioneer district, 2024) and Ghaziabad, Uttar
Pradesh (second district), now scaling across multiple districts in
Uttar Pradesh and Karnataka.

**Who it serves.** Job seekers and citizens (especially women
re-entering work, persons with disabilities, first-generation graduates,
daily-wage workers), SMBs and service providers, local ecosystem
aggregators (ITIs, MSME associations, NGOs), district administrations,
and private innovators (staffing, assessment, skilling, transport,
finance).

**Scale achieved.** Fewer than 10% of Ghaziabad's SMBs surfaced on the
shared map made 10,000+ local job openings visible in under 60 days.
In Dharwad, one MSME association onboarded 300+ employers and one ITI
onboarded 500+ seekers, both within two weeks.

**Cost anchor.** Discovery cost drops from ₹500+ per field-survey
interaction to ₹10 per voice interaction. A conservative 5%
workforce-participation gain in one district is estimated at ₹1,050
crore in additional annual GDP; scaled across India's top 100
progressive districts, ₹87,500 crore annually.

**Compression evidence.** 10 months (Dharwad, pioneer, building the
playbook while running it) → 4 months (Ghaziabad, drawing directly on
Dharwad) → further compression expected now that DPGs and a documented
playbook exist, though timelines still depend on district readiness,
not technology alone.

**Where this pathway doesn't apply.** Built from a deployment solving a
local discovery failure — things that already exist but can't find
each other. If the use case is closer to creating new demand or supply,
or users are already well served by existing digital platforms, this
won't transfer cleanly.

# Problem

## Explore

The paradox of proximity: jobs, talent, and services already exist in
real supply within a district but cannot find each other. Not a
resource failure — a district facing this already has what it needs,
it just can't see it. Districts contribute ~80% of the country's jobs.

## Define

Compare voice honestly against what's already tried: national digital
platforms surfaced fewer than 100 local listings even where tens of
thousands of real openings existed (they assume literacy, smartphone,
interface familiarity); physical mobilisation (job fairs, field
surveys) cost ₹500+/interaction, took weeks, converted below 10%.

## Pilot

A field visit to an ITI in Ghaziabad found four out of five people had
no resume; employers advertised on poles and trees, not portals. The
team deliberately chose not to build a new behaviour for users to
adopt — voice AI met people where their existing behaviour already was.

## Scale

The discovery gap falls hardest on those with the fewest networks:
women re-entering the workforce, persons with disabilities,
first-generation graduates, daily-wage workers who find work only
through whoever happens to know them.

# Persona

## Explore

Kavita, a commerce graduate in Ghaziabad being pushed by her family to
migrate to Delhi, while a manufacturing firm two kilometres from her
house needed exactly her profile — the concrete persona behind the
abstract "job seeker."

## Define

Every existing digital system assumes literacy, a smartphone, and
interface familiarity, which excludes the majority of district
residents by design, not by accident.

## Pilot

n/a — persona was validated at Explore/Define through direct field
visits (ITI resume study, employer poster observation) rather than as
a distinct pilot-stage activity.

## Scale

The same discovery failure shows up, with variations, in white-collar
work too, not only blue/grey-collar — the persona set widens as the
map scales.

# Technology

## Explore

The single most consequential decision: build shared, open digital
rails rather than a platform any one organisation would own —
explicitly modelled on UPI, rejecting both national platforms (can't
reach the long tail) and physical mobilisation (can't scale).

## Define

Build reusable Digital Public Goods, not a single closed application:
7 open-source building blocks (Knowledge Engine, Memory Layer, Trust
Layer, Agent Core, Action Gateway, Reach Layer, Learning Layer) plus
purpose-built Signal, Aggregator, and Facilitator DPGs. DPGs can be
configured and activated for a new district in ~2 weeks.

## Pilot

Don't lock into a speech model — lock into adaptability. Speed and
adaptability of partners mattered more than any single benchmark, since
the model layer keeps evolving quickly. Dialect and local vocabulary
need direct adaptation, not just a language switch (Dharwad Kannada vs.
Bangalore Kannada required a local glossary and tone-matching).

## Scale

The architectural decision hardest to unwind later is the ownership
model itself — once rails operate as shared public infrastructure,
reversing to a closed platform would undo the trust the ecosystem is
built on.

# Institution

## Explore

n/a — institutional ownership decisions belong to Define at this
pathway (see below); Explore is about confirming the discovery-failure
diagnosis (see Problem × Explore).

## Define

Institutional ownership named before activation, not during: a
District Champion (CDO or District Collector) frames the problem and
convenes aggregators; a State Sponsor (Mission Director/Secretary)
provides political cover and budget. Without a named individual willing
to say "this runs in my name," the ecosystem has no spine.

## Pilot

Verification is staged, not all-or-nothing: identity → education
claims → experience → skill assessment. At the current stage, priority
has been ensuring genuine participants onboard; fuller credentialing is
being built out, not yet fully public.

## Scale

Trust is layered and starts with people, not the AI: a joint
facilitation centre (institutional trust) → aggregators (physical
trust) → individual verification (identity/opportunity/experience
trust) — only after the first two layers are in place.

# Ecosystem

## Explore

Four reinforcing levers, none sufficient alone: Blue Dots AI (shared
digital rails), local ecosystem aggregators, district facilitation
team, and innovators leveraging the rails.

## Define

Local ecosystem aggregators — ITIs, MSME associations, NGOs, skilling
centres — already hold relationships with the long tail and onboard
their constituents en masse rather than one by one.

## Pilot

The sequence matters: district champion and state sponsor move first
(no spine without them) → funder enables the cold start → facilitation
team builds density → aggregators bring the long tail → seekers,
providers, and innovators join once density is sufficient.

## Scale

Innovators — staffing firms, assessment providers, skilling
organisations, startups (Head Held High, Recex, JobsUp, TRRAIN, Proof
of Skill, Digital Labour Chowk) — plug into the shared map because it
makes their own operations more efficient at near-zero acquisition
cost.

# Workforce

## Explore

n/a — see Ecosystem × Pilot for the sequencing of actors; workforce
specifically refers to the facilitation team, formed at Define.

## Define

A District Facilitation Team of 6-8 people, drawn from government, the
social sector, and MSME associations — a convening and coordination
team, not a technology team.

## Pilot

The facilitation team's job is keeping the discovery rhythm alive
weekly — without active maintenance, Blue Dots go stale and discovery
reverts to old patterns. The first three to four months require daily
iteration by design: pronunciation, comprehension errors, and sparse
responses ("I'm okay with any job") are expected early failure modes.

## Scale

The facilitation team's role shifts from building density to sustaining
it once seekers, providers, and innovators join on their own terms.

# Operating Model

## Explore

n/a — cost and sustainability questions belong to later stages; Explore
established only the qualitative case (discovery cost ₹500+ → ₹10 per
interaction).

## Define

The funder commits to at least 12 months of facilitation-team costs
and technology setup before activation begins — the cold start, before
private actors have their own reason to join.

## Pilot

What broke first was density and freshness, not the technology.
Telephony costs fell from ~₹6/minute to ~₹1/minute over the rollout.
Metrics tracked go beyond raw Blue Dot counts — connections made and
other service providers joining the ecosystem matter more than sign-ups.

## Scale

Once a density threshold is reached (within 3 months in Ghaziabad and
Dharwad), innovators find their own economic reasons to engage and the
ecosystem sustains and self-funds without continuous philanthropic
subsidy. At scale, government-held citizen data being stale/incomplete
and the need for formal consent/data policy become live operating-model
issues.

# Lessons for the Next Adopter

* Describe, in one sentence, what already exists in your district but is invisible to the people who need it — before choosing any technology.
* Choose open, reconfigurable DPGs over a closed, fully-built solution, even though the closed solution looks faster on day one.
* A district champion and state sponsor are not optional convening formalities — without them, the ecosystem has no spine.
* Build trust in three layers (institution, aggregator, individual) — don't treat it as a single consent-message switch.
* Budget three to four months of daily, hands-on iteration after launch — this is how the system is designed to mature, not a sign of failure.
* Measure connections made and ecosystem participation, not just sign-up counts.

# Citations

[1] Blue Dots brief — `../../All Pathways/3. BlueDots /Executive Summary/BlueDots Brief_.pdf`
[2] Full diffusion pathway document — `../../All Pathways/3. BlueDots /Executive Summary/V1 Blue_Dots_AI_Diffusion_Pathway_.docx`
[3] Diffusion responses — `../../All Pathways/3. BlueDots /Extended Pathway/BlueDots Diffusion Responses.pdf`
[4] Interview recording transcript — `../../All Pathways/3. BlueDots /Extended Pathway/Otter recording_BlueDots.pdf`

Related pathway: [Data DHARA](data-dhara.md) (shares the "coordination, not absence of data" diagnosis, applied to government data instead of livelihoods discovery).
