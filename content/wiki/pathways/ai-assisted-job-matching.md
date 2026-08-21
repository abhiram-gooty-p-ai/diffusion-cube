---
type: Pathway
title: AI-assisted Job Matching for Rural Youth
sector: Livelihoods / Skilling
stage: Pilot
timestamp: 2026-08-21
version: v1
---

# 0. Overview

Community-contributed pathway: **AI-assisted Job Matching for Rural Youth**

**Sector:** Livelihoods / Skilling

**Problem:** A pilot AI-assisted job-matching system helping placement coordinators identify suitable candidates from a skills-training MIS for employer vacancies. Candidate data is exported weekly; AI produces ranked recommendations with explanations grouped into match bands; coordinators retain all decision-making authority. Two districts activated in sequence.

**Approach:** Intervenes at the candidate-pool identification stage only. Does not automate outreach, candidate notification, employer access, or any downstream recruitment decision.

# 1. Pathway Identity

| Field | Value |
|---|---|
| Name | AI-assisted Job Matching for Rural Youth |
| Sector | Livelihoods / Skilling |
| Stage | Pilot |
| Problem | A pilot AI-assisted job-matching system helping placement coordinators identify suitable candidates from a skills-training MIS for employer vacancies. Candidate data is exported weekly; AI produces ranked recommendations with explanations grouped into match bands; coordinators retain all decision-making authority. Two districts activated in sequence. |
| Solution approach | Intervenes at the candidate-pool identification stage only. Does not automate outreach, candidate notification, employer access, or any downstream recruitment decision. |

# 2. Coverage and Gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ● | ● | ○ | ○ |
| Solution | ○ | ● | ● | ○ |
| Institution | ○ | ● | ● | ○ |
| Ecosystem | ○ | ○ | ○ | ○ |
**Coverage gaps:**

- **Persona / Pilot** — No documented know-how for this stage yet.
- **Persona / Scale** — No documented know-how for this stage yet.
- **Solution / Explore** — No documented know-how for this stage yet.
- **Solution / Scale** — No documented know-how for this stage yet.
- **Institution / Explore** — No documented know-how for this stage yet.
- **Institution / Scale** — No documented know-how for this stage yet.
- **Ecosystem / Explore** — No documented know-how for this stage yet.
- **Ecosystem / Define** — No documented know-how for this stage yet.

# 3. Micro-Innovations

## Persona

**1. 1. Defining the excluded user as the coordinator, not the candidate**
- `Dimension: Persona`
- `Stage: Explore`
- `Also relevant at: Define`
- `Type: Strategic Decision`

- **Decision:** Frame the primary excluded user as the placement coordinator operating under conditions of overload or unfamiliarity — not the candidate. The candidate is the ultimate beneficiary, but the coordinator is the actor whose constraints the system must solve.
- **Alternative considered:** Building a candidate-facing tool that allows rural youth to apply directly or receive automated notifications.
- **Why:** Coordinator capacity is the binding constraint on placement throughput. When candidate pools are large or the coordinator is newly assigned, the bottleneck is not candidate supply — it is the coordinator's ability to identify relevant candidates at all. A candidate-facing tool would not address this. Automating candidate outreach would remove human judgment at precisely the point where MIS data quality is most uncertain.
- **What this looked like here:** The pilot explicitly limits AI intervention to the candidate-pool identification stage of the existing workflow. Coordinators review, filter, and decide; no candidate receives a notification based on AI output alone.
- **Condition — applies when:** The placement bottleneck is coordinator capacity at the search stage, and candidate data quality is too uncertain to support automated outreach with confidence.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

**2. 3. Pilot objective scoped to decision support, not automation**
- `Dimension: Persona`
- `Stage: Define`
- `Type: Strategic Decision`

- **Decision:** Define the pilot's success condition as whether the AI tool improves coordinators' ability to identify potentially suitable candidates — not whether it can automate selection or predict placement outcomes.
- **Alternative considered:** Framing the pilot as a test of whether AI can replace coordinator judgment at the candidate-identification stage, using joining rate as the primary success metric.
- **Why:** Joining rate is influenced by too many downstream factors — employer decisions, candidate availability at time of contact, transport, accommodation — to serve as a clean measure of recommendation quality. A narrower objective makes the pilot evaluable within its timeframe and protects against premature conclusions in either direction. It also preserves coordinator trust: a tool explicitly positioned as decision support is less threatening to coordinators than one positioned as a replacement.
- **What this looked like here:** The five stated pilot objectives are all coordinator-facing: reduce manual search effort, surface overlooked candidates, increase candidates considered per vacancy, make matching basis visible, and generate evidence for a scale decision. Joining rate is logged but explicitly excluded from direct model-quality measurement.
- **Condition — applies when:** Data quality is uncertain, placement outcomes are influenced by many non-AI factors, and coordinator adoption is a prerequisite for the pilot generating usable evidence.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

## Solution

**3. 6. Model-agnostic abstraction layer for AI provider**
- `Dimension: Solution`
- `Stage: Define`
- `Also relevant at: Scale`
- `Type: Strategic Decision`

- **Decision:** Access the AI matching service through an internal abstraction layer with a standardised interface, so that the underlying model implementation can be changed without modifying the coordinator application or the data pipeline.
- **Alternative considered:** Integrating the chosen model provider directly into the application layer, accepting the coupling in exchange for simpler initial implementation.
- **Why:** At pilot stage the right model architecture and provider are not yet known. A pilot that is tightly coupled to a specific provider cannot change implementation without rebuilding adjacent components. The abstraction layer preserves the ability to switch during the pilot (when switching is still tractable) and avoids lock-in before the team has enough evidence to make a considered provider decision.
- **What this looked like here:** The abstraction exposes a standardised POST /match interface. The coordinator application calls this interface; it does not interact with any specific model provider directly. The interface inputs and outputs are versioned. Model changes are logged; material changes are not made silently.
- **Condition — applies when:** The team has not yet committed to a long-term model provider, or anticipates that the matching approach will be refined during the pilot. Fails when the team has already made a long-term provider commitment and the abstraction adds coordination overhead without flexibility benefit.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

**4. 7. Staggered district activation**
- `Dimension: Solution`
- `Stage: Pilot`
- `Type: Tactical Decision`

- **Decision:** Activate pilot districts in sequence — District A first, then District B — rather than simultaneously, allowing operational problems to be identified and addressed before the second activation.
- **Alternative considered:** Simultaneous activation in both districts to maximise data volume and reduce total deployment time.
- **Why:** Simultaneous activation concentrates risk: a software defect, a data import failure, or a coordinator training gap that could be caught and fixed in one district will propagate unmanaged into both. Sequential activation creates a natural gate — the first district's first week of usage is an operational checkpoint before the second is brought live.
- **What this looked like here:** The deployment sequence runs: synthetic data validation → eligibility rule validation → privacy/security review → restricted pilot dataset load → internal acceptance tests → coordinator training → District A activation → first-week observation → District B activation.
- **Condition — applies when:** Districts are operationally independent enough that problems in one do not directly affect the other. Fails when the two districts share infrastructure, coordinator teams, or a common data feed whose failure would affect both regardless of activation sequence.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

## Institution

**5. 9. Restricting coordinator data-update rights to a defined field set**
- `Dimension: Institution`
- `Stage: Define`
- `Also relevant at: Pilot`
- `Type: Strategic Decision`

- **Decision:** Allow coordinators to update a defined, limited set of candidate fields in the pilot system after speaking with a candidate — but preserve both the original MIS value and the pilot-updated value, and prevent pilot updates from automatically overwriting the production MIS.
- **Alternative considered:** Either prohibiting all coordinator updates (keeping the system read-only) or allowing full candidate-record editing by coordinators.
- **Why:** Read-only operation wastes the information coordinators gather during candidate contact — information that is often more current than the MIS. Unrestricted editing creates an uncontrolled data-correction mechanism with no audit trail and no accountability for what changed and why. The defined-field approach captures the highest-value updates (availability, relocation preference, salary expectation, employment status) while preserving the MIS as the authoritative source and creating a clean audit record of every change.
- **What this looked like here:** Permitted update fields are: current availability, current district, willingness to relocate, preferred job location, expected salary, and current employment status. Every update records old value, new value, updating user, and timestamp. The pilot repository stores both the MIS value and the pilot-updated value. MIS reconciliation is deferred to post-pilot review.
- **Condition — applies when:** Candidate data in the source MIS is known to be partially stale and coordinators are the primary mechanism for refreshing preference data through direct contact. Fails when the MIS is updated in near-real time and coordinator edits would create conflicting parallel records without benefit.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

**6. 8. Separating issue types in pilot support to distinguish AI failure from data failure**
- `Dimension: Institution`
- `Stage: Pilot`
- `Type: Playbook`

- **Playbook:** During the first four weeks of pilot operation, all support issues are reviewed daily. Issues are classified at intake into one of eight categories: software defect, data quality, vacancy input, recommendation quality, workflow, user access, training, or unknown. Matching-quality issues are tagged separately from software defects. Data-quality issues are logged separately from model errors. No issue is resolved at the model layer until it has been confirmed that the root cause is not a data or vacancy-input problem.
- **Note:** The most common failure mode is conflating a poor recommendation with a model error. A recommendation that surfaces an apparently unsuitable candidate may originate from stale preference data (data issue), a poorly structured vacancy entry (vacancy input issue), an eligibility rule misconfiguration (rules issue), or the model itself. Resolving the wrong layer wastes effort and corrupts the pilot's ability to evaluate model quality independently.
- **Condition — applies when:** The pilot is generating its first real recommendations and coordinators are providing early feedback. This classification discipline is most valuable in weeks one through four, when the team cannot yet distinguish systematic model behaviour from data or configuration problems.
- **Before → After:** Not documented in the source for a prior deployment; this is the designed approach for the current pilot.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*


# 4. Toolkits and Playbooks

| Unit | Type | Reuse condition |
|---|---|---|
| 6 | Playbook | ** The pilot is generating its first real recommendations and coordinators are providing early feedback. This classification discipline is most valuable in weeks one through four, when the team cannot yet distinguish systematic model behaviour from data or configuration problems. |

# 6. Retrieval Guide

- *"Who is this system actually designed to help?"* → Unit 1
- *"What problem are we trying to solve with this pilot — are we replacing human decisions or just helping coordinators think?"* → Unit 2
- *"How do we avoid getting locked into one AI vendor?"* → Unit 3
- *"Can we switch from OpenAI to another provider later without rebuilding everything?"* → Unit 3
- *"What's the safest way to roll this out across multiple districts without breaking everything at once?"* → Unit 4
- *"Should we go live in all districts at the same time or phase it in?"* → Unit 4
- *"How do we stop coordinators from accidentally editing data they shouldn't touch?"* → Unit 5
- *"What fields should coordinators actually be allowed to update in the system?"* → Unit 5
- *"When something goes wrong in the pilot, how do we figure out if it's the AI's fault or a data quality problem?"* → Unit 6
- *"Our pilot keeps producing bad outputs — how do we diagnose whether the model is failing or the input data is wrong?"* → Unit 6
- *"Is the coordinator the end user or is this meant for the candidate directly?"* → Unit 1
- *"We want to automate placement decisions — is that what this pilot is scoped for?"* → Unit 2
- *"How do we set up support so we can tell which complaints are about AI errors versus missing or wrong data?"* → Unit 6
- *"What's the relationship between the coordinator role and the AI outputs — who is supposed to act on the recommendations?"* → Unit 1, Unit 2
- *"Can we use this framework with a different AI model than the one it was built on?"* → Unit 3, Unit 2

---

## Provenance

| Contributor | Organisation | Role | Units |
|---|---|---|---|
| Kamesh | EkStep | Program Execution Partner | 6 units |