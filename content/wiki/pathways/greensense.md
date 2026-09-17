---

# GreenSense — AI Crop Health for Urban Farmers

---

## Section 0: Reading Guide

*Contributed by: EkStep*

This pathway document is written for the next adopter — a team considering or building an AI-powered crop health system for small-scale urban or peri-urban farmers. It is not a case study of what FieldSprout built. It is a marked trail: the decisions that shaped the system, what broke and how it was fixed, and the conditions under which each choice is correct or incorrect.

**Where reusable value concentrates in this pathway:** The densest knowledge is in Solution — particularly the offline-first architecture decision, the false-positive failure and fix, and the onboarding model shift. The Bellhaven data ownership agreement is the strongest institutional unit. The ecosystem side (partner roles, resilience, diffusion channel) is thin — adopters building on this pathway should treat those cells as open questions requiring their own field work.

**How to navigate:** Use Section 6 (Retrieval Guide) to find units relevant to your current question. Use the coverage grid in Section 2 to see where this pathway's knowledge is dense and where you are on your own. Units are numbered sequentially (1, 2, 3…) and cross-referenced throughout.

---

## Section 1: Pathway Identity

*Contributed by: EkStep*

| Field | Detail |
|---|---|
| **Deployment name** | GreenSense — AI Crop Health for Urban Farmers |
| **Implementing organisation** | FieldSprout Technologies |
| **Sector** | Agriculture |
| **Geography** | Veridonia (Rosemont, Alto Verde); Bellhaven (international pilot) |
| **Population served** | Small-scale farmers and community gardeners in urban and peri-urban areas; underserved communities with limited technical backgrounds; sustainable and organic farming practitioners |
| **Stage reached** | Pilot |
| **Key dates** | 2025 pilot; Rosemont onboarded first; Bellhaven onboarding began approximately 4 months later |
| **Summary** | FieldSprout Technologies' GreenSense platform provides AI-powered crop health management to small-scale urban and peri-urban farmers via low-cost IoT sensors, computer vision pest detection, and SMS fallback alerts. Piloted across three sites in Veridonia and Bellhaven, with documented yield improvements and a municipal data-ownership agreement. Now facing open questions about hardware maintenance, model retraining, and pricing as it moves toward broader rollout. |
| **Scale achieved (as of 2025 pilot)** | Documented yield improvement: average summer yield per farmer from 8 kg to 11 kg; autumn yield from 3 kg to 4 kg. Crop loss per farmer reduced: summer from 4 kg to 2.5 kg, autumn from 3 kg to 1.5 kg. Annual crop protection cost per farmer reduced from €250 to €80. Source: internal monitoring by FieldSprout Technologies. |
| **Cost anchor** | Not documented in the source |
| **Build effort** | Five-person team (field agronomist, two engineers, community liaison, part-time data analyst); Bellhaven added one locally hired coordinator. Sensor hardware finalised over 2 months; first 40 households onboarded in Rosemont over the following month. As of 2025 pilot. |
| **Known downstream adopters** | Not documented in the source |
| **Scope and non-transfer conditions** | Offline-first architecture and hybrid onboarding transfer to other urban/peri-urban smallholder contexts with patchy connectivity. Data ownership model transfers specifically to public-sector or donor-funded deployments where farmer trust and data sovereignty are politically sensitive. Vision model retraining requirement applies whenever deployment context differs materially from training data scale or conditions. |

---

## Section 2: Coverage Grid and Gaps

*Contributed by: EkStep*

### Coverage map

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| **Persona** | ●● | ○ | ○ | ○ |
| **Solution** | ●● | ●● | ●● | ○ |
| **Institution** | ○ | ●● | ○ | ○ |
| **Ecosystem** | ○ | ○ | ●● | ○ |

●●● Dense · ●● Moderate · ● Thin · ○ Not covered

### Gaps

The following gaps reflect cells where the primary sub-categories for this deployment's current stage (Pilot) are unaddressed, or where missing knowledge would materially affect an adopter's next decision.

**1. Persona × Define — Single critical use case not documented**
The pathway does not establish the one question a user must be able to ask for the pilot to succeed, nor a binary success definition for that use case. The yield and cost outcomes in Section 1 confirm impact was measured, but the minimum viable scope — what the system had to answer — is not stated. Adopters designing their own scope boundary will need to establish this themselves. Related to Unit 3.

**2. Persona × Pilot — Failure taxonomy by user type not documented**
There is no record of which user interactions failed during the pilot, or whether failures were scope failures (outside mandate) or quality failures (mandate questions answered badly). The false-positive fix (Unit 4) addresses a model quality issue, but the broader question of which users were underserved and why is not addressed. Related to Unit 4.

**3. Institution × Explore — No named internal champion documented**
The source does not identify who inside FieldSprout or any institutional partner had their professional stake tied to GreenSense succeeding. Elena Marsh is named as CEO and point of contact, but the specific internal champion role and stake are not documented. Adopters working in institutional settings where buy-in must be actively secured will need to fill this.

**4. Institution × Pilot — First public failure and institutional response not documented**
The false-positive alert failure (Unit 4) is documented as a technical event, but the source does not record whether this became a public or user-trust issue, or how the institution responded. For adopters who need to design failure-response protocols before launch, this gap is material.

**5. Ecosystem × Define — Dependency map and named partners not documented**
The Bellhaven partnership and Community Harvest Initiative are named, but there is no documented map of which components FieldSprout built versus sourced, which ecosystem roles were named before build, and which remain unfilled. Adopters replicating the municipal partnership model will need to construct this themselves.

**6. Ecosystem × Scale — Transferable unit conditions not documented**
The pathway has not yet reached Scale, and there is no documented record of what from this deployment could be reused by the next adopter with explicit condition tags. The replicability note in Section 1 is a starting point but is not at unit-level granularity.

---

## Section 3: Micro-Innovations

*Contributed by: EkStep*

### Persona

---

**1. Defining the excluded user by connectivity barrier, not just geography**

- **Dimension:** Persona
- **Stage:** Explore
- **Type:** Strategic Decision

- **Decision:** Target population was defined not only by farm size and location, but by a specific access barrier — unreliable or unaffordable mobile data connectivity — that determined which users the system would and would not reach without design intervention.
- **Alternative considered:** Not documented in the source.
- **Why:** Smallholder urban and peri-urban farmers in the pilot areas could not be assumed to have continuous data access, and farmers reluctant to pay for data plans would not use an always-online system. Defining the barrier precisely shaped the offline-first architecture decision (Unit 2) and the SMS fallback (Unit 3) before build.
- **What this looked like here:** Field testing in Alto Verde revealed the connectivity gap during the hardware finalisation phase. This finding reoriented the technical architecture before the main onboarding phase began.
- **Condition — applies when:** Target users are in areas with patchy connectivity or where data costs are a real barrier; the excluded-user definition should include the infrastructure barrier, not just the demographic.

---

**2. Hybrid onboarding to bridge limited smartphone experience**

- **Dimension:** Persona
- **Stage:** Define
- **Type:** Strategic Decision
- **Also relevant at:** Pilot

- **Decision:** Replace fully self-serve onboarding with a hybrid model: one in-person group setup session per village run by a community liaison, after which farmers manage the app independently.
- **Alternative considered:** Fully self-serve onboarding via an in-app guide, planned from the start to keep field costs low.
- **Why:** Early drop-off data showed that farmers with limited smartphone experience were not completing self-serve setup. The field cost of a single group session was considered necessary to achieve the activation rates required for the pilot to be meaningful.
- **What this looked like here:** Household activation rate in villages with a group session was notably higher than in the two villages that relied only on the self-serve guide, based on activation tracking during the first month.
- **Condition — applies when:** Target users have limited prior smartphone or app experience; in contexts where users are already comfortable with mobile apps, the group session may not be necessary and adds avoidable field cost.
- **Before → After:** Self-serve-only villages had materially lower activation rates than villages with a group session, based on first-month tracking.

---

### Solution

---

**3. Offline-first sensor architecture with SMS fallback for patchy connectivity**

- **Dimension:** Solution
- **Stage:** Explore
- **Type:** Strategic Decision
- **Also relevant at:** Define

- **Decision:** Build sensors to store readings locally and sync in batches when connectivity is available; cache alerts in the mobile app for offline viewing; queue critical pest and disease alerts as SMS messages as a fallback channel that does not require a data connection.
- **Alternative considered:** Always-online cloud-first architecture, matching an earlier consumer IoT product the hardware engineer had worked on.
- **Why:** Field testing in Alto Verde showed that farms had unreliable or no mobile signal for hours at a time, and farmers were reluctant to pay for continuous data plans. An always-online architecture would have excluded the target population and caused missed alerts during connectivity gaps.
- **What this looked like here:** Several farmers in Alto Verde reported missing pest alerts entirely during a two-week stretch of poor connectivity before the SMS fallback was added.
- **Condition — applies when:** Deployment areas have patchy or costly mobile data; the added complexity of local storage, batch sync, and a parallel SMS channel is not worth it where connectivity is reliable and affordable.
- **Before → After:** Alert delivery reliability improved substantially after SMS fallback was added; prior to that, missed alerts during connectivity gaps were documented during the Alto Verde pilot.

---

**4. Retraining the vision model on smallholder imagery before wide rollout**

- **Dimension:** Solution
- **Stage:** Pilot
- **Type:** Failure and Fix

- **Failure:** The computer vision model, trained primarily on imagery from larger commercial farms, produced a high rate of false positive pest alerts on smallholder plots. Lighting conditions, plant density, and camera angles from handheld phones differed significantly from the training data. In the first six weeks of the Rosemont pilot, roughly one in three alerts was a false positive based on manual spot-checks.
- **Fix:** The team paused new alerts for two weeks, collected approximately 1,200 labelled images directly from pilot farms with help from the community liaison, and retrained the detection model on a smallholder-specific set blended with the original data.
- **Insight:** A vision model trained on a different farm scale or imaging context than its deployment target will systematically underperform regardless of overall model quality. Collecting representative imagery from the actual deployment context is not a post-launch bug fix — it is a prerequisite for reliable alerts, and the time for it should be budgeted before wide rollout.
- **Condition — applies when:** The vision model was initially trained on imagery from a different farm scale, crop density, or imaging setup than the deployment target; this applies to any adoption where the source training data does not closely match actual user field conditions.

---

**5. Separating farmer data ownership from platform and partner access by default**

- **Dimension:** Solution
- **Stage:** Define
- **Type:** Strategic Decision
- **Also relevant at:** Pilot

- **Decision:** Farm-level data ownership is retained by each individual farmer by default. The municipal partner and FieldSprout receive only aggregated, anonymised statistics unless a farmer explicitly opts in to share their specific data with a named advisor. This was written into the partnership agreement with the City of Bellhaven Government.
- **Alternative considered:** Centralising all farm data under FieldSprout's own commercial database, consistent with the company's standard SaaS terms.
- **Why:** The Bellhaven municipal partner raised the ownership question early, and a public-sector deployment required an answer that would hold up to political scrutiny on farmer trust and data sovereignty. Centralising data under commercial terms would have jeopardised the partnership agreement.
- **What this looked like here:** The farmer-owns-by-default model and opt-in sharing structure were embedded in the written Bellhaven municipal partnership agreement, making them contractually binding rather than a product policy that could change unilaterally.
- **Condition — applies when:** Public-sector or donor-funded deployments where farmer trust and data sovereignty are politically sensitive; a purely commercial deployment without a government partner may not require this level of separation, though it remains good practice.

---

### Institution

---

**6. Writing data ownership terms into the municipal partnership agreement**

- **Dimension:** Institution
- **Stage:** Define
- **Type:** Strategic Decision

- **Decision:** The farmer-owns-by-default data governance model (Unit 5) was embedded directly in the written partnership agreement with the City of Bellhaven Government, rather than left as an internal product policy.
- **Alternative considered:** Retaining data governance as a FieldSprout internal policy, not contractually binding on the municipal partner.
- **Why:** A government partner required formal accountability for how farmer data would be handled. Leaving governance as internal policy would have given the municipal partner no enforceable basis to hold FieldSprout accountable, which was insufficient for a public-sector deployment.
- **What this looked like here:** The Bellhaven agreement named specific terms for what the municipal partner could and could not access, creating a formal accountability structure between FieldSprout and the City of Bellhaven Government.
- **Condition — applies when:** Any deployment involving a government or public-sector partner where data handling terms need to be enforceable, not just stated; less critical in purely commercial deployments with no government counterpart.

---

### Ecosystem

---

**7. Using an existing regional programme as a channel to reach new municipal partners**

- **Dimension:** Ecosystem
- **Stage:** Pilot
- **Type:** Strategic Decision

- **Decision:** Rather than approaching each potential municipal partner independently, FieldSprout used the Community Harvest Initiative — a regional cross-border programme — as a distribution channel to introduce GreenSense to other municipal partners once the Bellhaven pilot showed early results.
- **Alternative considered:** Direct city-by-city outreach by FieldSprout independently.
- **Why:** The Community Harvest Initiative already had established relationships with municipal partners across the region. Using it as a channel leveraged existing trust and reduced the cost and time of partner acquisition compared to approaching each city independently.
- **What this looked like here:** The Bellhaven pilot results provided the reference case; the Community Harvest Initiative provided the network through which those results were introduced to other potential partners.
- **Condition — applies when:** A credible regional network with existing municipal relationships exists and has already accepted the deploying organisation; this channel is not available to organisations without an established pilot result to reference.

---

**8. Negotiating a separate agreement for each materially different deployment context**

- **Dimension:** Ecosystem
- **Stage:** Pilot
- **Type:** Strategic Decision

- **Decision:** Scaling from Rosemont (independent smallholders) to Bellhaven (peri-urban public housing residents) required a separate, negotiated agreement with the City of Bellhaven Government and coordination with the Bellhaven Housing Trust — treated as a distinct coordination effort, not an extension of the Veridonia rollout.
- **Alternative considered:** Not documented in the source.
- **Why:** The Bellhaven population was peri-urban public housing residents, not independent smallholders. This was a materially different institutional and community context that required government sign-off and housing authority involvement that the Veridonia rollout did not. Treating it as a simple extension would have missed these requirements.
- **What this looked like here:** The Bellhaven rollout required engagement with two distinct institutional actors (City of Bellhaven Government and Bellhaven Housing Trust) that had no counterpart in the Veridonia pilot.
- **Condition — applies when:** The target population in a new geography is institutionally embedded — in public housing, government schemes, or community programmes — rather than operating independently; independent smallholder contexts may not trigger this level of coordination.

---

## Section 4: Toolkits and Playbooks

*Contributed by: EkStep*

No units in this pathway are tagged Toolkit Asset or Playbook. The micro-innovations above are Strategic Decisions and a Failure and Fix — reusable as decision templates, not as liftable artefacts or gated process sequences.

Adopters looking for a reusable artefact from this pathway should note: the Bellhaven data ownership agreement structure (Unit 6) is the closest thing to a template — the terms written into that agreement (farmer-owns-by-default, opt-in sharing, named advisor access) could be adapted for other municipal partnerships, but the agreement itself is not reproduced in the source material.

---

## Section 6: Retrieval Guide

*Contributed by: EkStep*

*"Our target farmers have unreliable mobile data — how do we handle connectivity?"* → Unit 3

*"We're getting a lot of false positive alerts from our pest detection model — what do we do?"* → Unit 4

*"Our model was trained on commercial farm data but we're deploying on smallholder plots — is that a problem?"* → Unit 4

*"A government partner is asking who owns the farm data — how do we answer that?"* → Units 5, 6

*"We want to write data governance into our partnership agreement, not just keep it as policy — how?"* → Unit 6

*"Farmers are not completing the self-serve onboarding — what worked here?"* → Unit 2

*"How do we define which users we're actually trying to reach?"* → Unit 1

*"We're trying to reach new city partners — how did GreenSense do it without approaching each one individually?"* → Unit 7

*"We're expanding to a new city with a different community type — does the same agreement cover it?"* → Unit 8

*"The new deployment site has a different institutional setup — public housing vs. independent farmers — does that change what we need to negotiate?"* → Unit 8

*"We have a successful pilot result — how do we use it to open doors with new partners?"* → Unit 7

*"How much of this system can be reused in a new country?"* → Section 1 (Scope and non-transfer conditions), Unit 4 (vision model retraining), Unit 3 (offline-first architecture)

---

---

*Source Trace Appendix — Contributor-facing only. Not for adopter-facing retrieval.*

| Source file | Covers | Notes |
|---|---|---|
| GreenSense_Field_Implementation_Notes.pdf (as reviewed in Adoption Companion conversation, September 3, 2026) | Section 1 (build effort, key dates, key partnerships, scope/non-transfer conditions); Section 3 Units 1–8 (all units draw substantially on this file for decision, alternative, condition, and before→after content); Section 2 gaps 1, 2, 4, 5 | Primary source. Contributor's own account of the pilot; not independently verified. |
| GreenSense_Impact_Submission_Overview.pdf (as reviewed in Adoption Companion conversation, September 3, 2026) | Section 1 (deployment name, implementing organisation, sector, geography, population served, stage, summary, scale achieved/impact metrics, key partnerships, replicability note); Section 2 gap 6 | Primary source for identity and impact fields. Figures are self-reported by FieldSprout Technologies per the submission's own note. Confirms and extends the Field Implementation Notes on partnership names and population description; does not contradict it. |