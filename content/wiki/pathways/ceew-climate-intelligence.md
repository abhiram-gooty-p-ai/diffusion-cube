---
type: Pathway
title: CEEW Climate Intelligence
description: Two AI systems built with the Council on Energy, Environment and Water — a conversational climate-data agent and a dengue early-warning system — and the shared implementation lessons between them.
tags: [Climate, Public Health, Policy]
sector: Climate and Public Health
stage: Pilot
timestamp: 2026-07-31
contributor: EkStep Foundation
---

# Section 0 — Overview

Two complementary AI systems built with the Council on Energy, Environment and Water (CEEW): **CRAVIS.AI** (Climate Resilience Analytics and Visualization System), a conversational agent helping researchers and policymakers search, analyse, and interact with fragmented climate datasets in natural language; and an **AI-enabled Early Warning System (EWS)** combining climate, health surveillance, and geospatial data to forecast dengue outbreaks several weeks ahead.

**Who it serves.** Researchers and policymakers navigating fragmented climate datasets across repositories (CRAVIS); public health officials deciding where to deploy limited resources before disease outbreaks occur (EWS). Neither system replaces the domain expert's judgement — both are built to support the researcher's or official's own decision, not to make it for them.

**Scale, cost, and effort.** Not documented in the source — the source material is organised as cross-cutting implementation lessons rather than a deployment-at-a-glance account, and doesn't carry the scale, cost, or effort figures some other pathways in this library do.

**Where this doesn't apply.** Both deployments depend on domain experts remaining in the loop to interpret outputs and on institutions being willing to build trust gradually (through source transparency and forecast-vs-outcome comparison) rather than on day one. Where a deploying institution isn't prepared to retain that expert-in-the-loop role, or isn't prepared to invest in the underlying data ecosystem (particularly hard-to-access data like health surveillance records or epidemiological driver data), the lessons here transfer less cleanly.

A related pathway, Data DHARA, documents a similar "data quality and governance over model sophistication" lesson applied to government administrative data rather than climate/health data — worth a look for anyone weighing that same trade-off in a different data domain.

# Section 1 — Pathway identity

| Field | Value |
|---|---|
| Scale achieved | Not documented in the source |
| Cost anchor | Not documented in the source |
| Build effort | Not documented in the source |
| Known downstream adopters | Not documented in the source |
| Scope / does not transfer when | Applies to research/policy-support deployments where domain experts (researchers, public health officials) remain the decision-makers and institutions can build trust incrementally. Does not transfer well when the deploying institution cannot retain expert-in-the-loop review (Units 2, 8), or when required external data (e.g. health surveillance records, epidemiological driver data) is not accessible or improvable over time (Units 4, 14). |
| As of | 2026-05-01 (source material date) |

# Section 2 — Coverage grid and gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ○ | ●● | ○ | ○ |
| Solution | ● | ● | ○ | ● |
| Institution | ○ | ●● | ●●● | ●● |
| Ecosystem | ○ | ● | ○ | ● |

**Gaps**

* **Persona, Explore** — the source names the two problems (fragmented climate data; no advance warning of outbreaks) but doesn't document what researchers, policymakers, or officials actually did instead before either system existed — the current workaround itself isn't captured (Unit 1).
* **Persona, Pilot and Scale** — whether researchers and officials actually trusted and used the outputs day-to-day once live, beyond the general design intent that AI would support rather than replace their judgement, isn't documented (Unit 2).
* **Solution, Pilot** — the source says both systems "continued evolving after launch" but doesn't name which specific component was the source of pain, whether it was replaceable, or which data source was going stale or wrong during pilot (Units 3, 4).
* **Institution, Explore** — no individual is named as the person whose professional stake was tied to either system's success, or what that stake was, before build began.
* **Ecosystem, Explore** — no precedent deployment or prior attempt to solve either problem for this population is referenced, so what transferred (or didn't) from an earlier attempt isn't documented.
* **Ecosystem, Pilot** — no partner-performance log or contingency plan is documented for either system during pilot, even though Unit 13 shows partnership was treated as ongoing rather than a fixed contract.

# Section 3 — Micro-innovations

## Persona

**1. Frame the problem as an operational bottleneck, not an AI-technology choice**

- Dimension: Persona
- Stage: Define
- Type: Strategic Decision

- Decision: Start from "what decision or task is currently difficult for users?" rather than "which AI model should we use?" — for CRAVIS, the bottleneck was researchers and policymakers being unable to discover, combine, and interpret climate data scattered across repositories; for the Early Warning System, it was public health officials lacking advance warning of where and when dengue outbreaks would occur.
- Alternative considered: Choosing a model or AI approach first and looking for a problem to fit it.
- Condition — applies when: the adopter can name a specific decision or task that is currently hard for a specific user, before any model conversation starts.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**2. Keep AI as decision support, not a replacement for expert judgement**

- Dimension: Persona
- Stage: Define
- Type: Strategic Decision

- Decision: Design both systems so that researchers and public health officials continued interpreting climate evidence and making operational decisions themselves — AI's role was to support their judgement, not substitute for it.
- Alternative considered: Not documented in the source.
- Condition — applies when: domain experts retain responsibility for interpreting evidence and making the operational call.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

## Solution

**3. Audit data quality before investing in model sophistication**

- Dimension: Solution
- Stage: Explore
- Also relevant at: Define, Pilot, Scale
- Type: Strategic Decision

- Decision: Treat data quality, governance, and availability as the primary determinant of success — across both CRAVIS and the EWS, a more sophisticated model could not compensate for fragmented, poorly governed, or unreliable data.
- Alternative considered: Investing first in more advanced modelling techniques.
- Condition — applies when: the underlying data sources are fragmented, dispersed across repositories, or not consistently governed.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**4. Name the three data categories the EWS needs, and treat health data as the accessibility bottleneck**

- Dimension: Solution
- Stage: Define
- Type: Tactical Decision

- Decision: Identify the three data categories the dengue Early Warning System depends on — health surveillance data, climate observations, and geospatial information — and recognize upfront that climate and geospatial data (weather stations, satellite imagery) are comparatively accessible while health surveillance data is not.
- Alternative considered: Not documented in the source.
- Condition — applies when: forecasting performance depends on surveillance-record availability and granularity.
- Condition — fails when: Not documented in the source.
- Before → After: Before naming the three categories, data-readiness across them was untested; after, forecasting performance was understood to depend heavily on the availability and granularity of health surveillance records specifically, more than on the more accessible climate/geospatial sources.

**5. Test broadly across variables and models rather than committing to one upfront**

- Dimension: Solution
- Stage: Scale
- Type: Tactical Decision

- Decision: At scale, the EWS team tested nearly fifty climate variables and multiple machine-learning models to identify which combinations improved predictive performance, treating model selection as an iterative technical process.
- Alternative considered: Making a single model-selection decision upfront and scaling that choice directly.
- Condition — applies when: predictive performance is sensitive to variable selection and enough operating history exists to test broadly.
- Condition — fails when: Not documented in the source.
- Before → After: Before, model choice risked being fixed early; after, systematic testing of roughly fifty variables and multiple models identified which approaches actually improved predictive performance.

## Institution

**6. Introduce AI as decision support before it is embedded in routine workflows**

- Dimension: Institution
- Stage: Define
- Type: Strategic Decision

- Decision: Stage the rollout so AI is introduced as decision support first, with trust built through keeping CRAVIS's information grounded in credible, transparent sources and having officials compare EWS forecasts against actual outcomes over time — before either system is folded into routine workflow.
- Alternative considered: Embedding the AI system into routine institutional workflow immediately.
- Condition — applies when: the institution's confidence in the system has to be earned through observed performance rather than assumed upfront.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**7. Deploy early rather than wait for perfect data or models**

- Dimension: Institution
- Stage: Define
- Also relevant at: Pilot
- Type: Strategic Decision

- Decision: Launch with imperfect data and models rather than waiting for them to be "ready," on the reasoning that waiting delays the learning that only real use produces.
- Alternative considered: Delaying deployment until data quality or model performance reached a higher bar.
- Condition — applies when: stakeholders can meaningfully act on early, imperfect outputs and provide feedback.
- Condition — fails when: Not documented in the source.
- Before → After: Early deployment let users validate outputs and provide feedback; for the EWS specifically, it created an incentive for government departments to strengthen their own disease surveillance and reporting practices.

**8. Build institutional trust through validation, not accuracy claims**

- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision

- Decision: Build institutional confidence through systems officials can understand, validate, and improve over successive use — not through claims of high model accuracy.
- Alternative considered: Building confidence primarily through reported accuracy metrics or benchmarks.
- Condition — applies when: officials have repeated opportunities to compare system outputs against real outcomes over time.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source; the source frames AI adoption in both deployments as ultimately a human process rather than a technical one.

**9. Keep the human decision-maker in place; let AI change access, not authority**

- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision

- Decision: Researchers and public health officials remained the decision-makers throughout the pilot for both systems — AI changed how they accessed information and forecasts, not who made the final call.
- Alternative considered: Not documented in the source.
- Condition — applies when: the workforce implication being managed is decision authority, not just information access.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**10. Treat data-quality assessment, feedback loops, and iteration as ongoing pilot practices**

- Dimension: Institution
- Stage: Pilot
- Type: Strategic Decision

- Decision: During pilot, assess current data quality on an ongoing basis without treating imperfection as a reason to delay indefinitely; build feedback loops that improve data collection alongside model performance; and design the deployment as iterative learning rather than a one-time implementation.
- Alternative considered: Treating data-quality gaps as blockers to be fully resolved before continuing, or treating the pilot as a one-time implementation.
- Condition — applies when: data collection and model performance can be improved in tandem through the same feedback cycle.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**11. Require data stewardship, governance, monitoring, and partner collaboration for long-term ownership**

- Dimension: Institution
- Stage: Scale
- Type: Strategic Decision

- Decision: Treat long-term ownership as requiring data stewardship, governance, monitoring, technical expertise, and ongoing collaboration with implementation partners — on the reasoning that AI systems only become more valuable over time if the institution is equipped to learn from and update them.
- Alternative considered: Not documented in the source.
- Condition — applies when: the institution intends to keep operating and improving the system after the founding team's involvement ends.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**12. Treat the implementation journey, not the trained model, as the reusable asset**

- Dimension: Institution
- Stage: Scale
- Also relevant at: Explore
- Type: Strategic Decision

- Decision: Identify CEEW's reusable output as the implementation journey itself — its data-integration approaches, model-evaluation methods, dashboard and visualisation designs, validation frameworks, stakeholder-engagement approaches, and documentation of unsuccessful experiments — rather than the trained model.
- Alternative considered: Treating the trained model as the primary reusable output.
- Condition — applies when: a future adopter is evaluating what to reuse from this pathway.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

## Ecosystem

**13. Structure the deployment as an evolving partnership, not a procurement contract**

- Dimension: Ecosystem
- Stage: Define
- Type: Strategic Decision

- Decision: Treat AI deployment as an ongoing partnership rather than a one-time procurement exercise — unlike conventional software, both systems kept evolving after deployment as models improved and institutional needs changed.
- Alternative considered: Structuring the engagement as a fixed-scope procurement contract that ends at delivery.
- Condition — applies when: the AI system and its data sources are expected to keep changing after go-live.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

**14. Widen "diffusion" to include strengthening the external data ecosystem, not just sharing the model**

- Dimension: Ecosystem
- Stage: Scale
- Type: Strategic Decision

- Decision: Recognize that datasets driving unusually severe dengue outbreaks (for example, mosquito and viral serotype changes) are rarely publicly available, and treat diffusion as including work to strengthen the broader data ecosystem that enables forecasting — not only sharing the AI model itself.
- Alternative considered: Defining diffusion narrowly as sharing the trained model or architecture.
- Condition — applies when: forecasting quality depends on externally held datasets the deploying institution does not control.
- Condition — fails when: Not documented in the source.
- Before → After: Not documented in the source.

# Section 4 — Toolkits and playbooks

No unit in this pathway met the bar for Toolkit Asset (a built, transferable artifact) or Playbook (a genuine multi-step, gated sequence). The source describes operating practices and strategic decisions rather than named reusable artifacts or gated procedures — see Units 10 and 12, which come closest but describe ongoing practices and asset categories rather than a single liftable artifact or a gated step sequence.

# Section 5 — Problem → solution patterns

| Problem | Root cause | Solution | Result | Condition |
|---|---|---|---|---|
| A sophisticated model can't compensate for fragmented, poorly governed data | Data quality and governance issues, not model capability | Prioritize auditing and improving data quality and governance before investing further in model sophistication | Not documented in the source beyond the general finding that data quality determined success more than model sophistication | Applies when underlying data sources are fragmented or inconsistently governed (Unit 3) |
| Waiting for perfect data or models before launching delays learning | Treating imperfection as a blocker rather than an input to iterate on | Deploy early with imperfect data and models and iterate based on real feedback | Early deployment let users validate outputs and provide feedback; for the EWS, created an incentive for government departments to strengthen their own disease surveillance and reporting practices | Applies when stakeholders can act on early, imperfect outputs (Unit 7) |
| Key epidemiological data (mosquito and viral serotype changes driving severe outbreaks) is rarely publicly available | The broader data ecosystem outside the deploying institution's control is immature | Widen the definition of diffusion to include strengthening the external data ecosystem, not only sharing the AI model | Not documented in the source | Applies when forecasting quality depends on externally held datasets the institution doesn't control (Unit 14) |

# Section 6 — Retrieval guide

* *"How do we know if this is actually a problem AI should solve, versus something else?"* → Unit 1, Unit 3
* *"Should we pick a model first or figure out the use case first?"* → Unit 1
* *"Will this replace our analysts' or officials' judgement?"* → Unit 2
* *"Our data is scattered across different sources — does that block us from starting?"* → Unit 3, Unit 4
* *"Which data sources actually matter for a forecasting system like this?"* → Unit 4
* *"How much model experimentation should we expect once we're operating at scale?"* → Unit 5
* *"How do we get officials or leadership to trust the system before it's embedded everywhere?"* → Unit 6, Unit 8
* *"Should we wait until our data or models are more mature before launching?"* → Unit 7
* *"Will this take decision-making away from our staff?"* → Unit 9
* *"What should we actually be doing operationally during the pilot?"* → Unit 10
* *"What does it take for the institution to truly own this after our team moves on?"* → Unit 11, Unit 12
* *"What's actually reusable from a deployment like this for the next adopter?"* → Unit 12
* *"Is this a one-time vendor contract or something else?"* → Unit 13
* *"What if the data we need isn't something we or our AI vendor control?"* → Unit 14

---

## Provenance appendix

| Source file | Covers | Notes |
|---|---|---|
| `ceew-climate-intelligence.md` (prior corpus version, as of 2026-05-01) | Section 1 (all identity fields); Section 3 Units 1–14 (all); Section 4; Section 5 (all three rows) | Reclassification of an existing corpus entry — organised in the prior version as six cross-cutting learnings (Problem, Persona, Technology, Institution, Ecosystem, Workforce, Operating Model) × four stages — into the four-dimension framework. Not fresh raw-material synthesis; no new source material was consulted. The prior version's own cited raw materials (executive summary, interview summary, interview transcript) were not independently re-read for this pass. |
