---
type: Pathway
title: AI-assisted Job Matching for Rural Youth
sector: Livelihoods — skill development and employment support
stage: Pilot
timestamp: 2026-08-21
version: v2
---

# 0. Overview

Community-contributed pathway: **AI-assisted Job Matching for Rural Youth**

**Sector:** Livelihoods — skill development and employment support

**Problem:** Large MIS-held candidate pools; coordinator-led placement processes; vacancies spanning multiple trades or districts; newly assigned coordinators without personal knowledge of the candidate pool

**Approach:** A browser-based AI-assisted job-matching tool for placement coordinators in a State Rural Livelihoods Mission. The system surfaces and explains candidate recommendations from a large MIS-held pool for a given vacancy. Coordinators decide — the system does not. Piloting in two districts with weekly MIS data exports, staggered district activation, and explicit human override throughout.

# 1. Pathway Identity

| Field | Value |
|---|---|
| Name | AI-assisted Job Matching for Rural Youth |
| Sector | Livelihoods — skill development and employment support |
| Stage | Pilot |
| Problem | Large MIS-held candidate pools; coordinator-led placement processes; vacancies spanning multiple trades or districts; newly assigned coordinators without personal knowledge of the candidate pool |
| Solution approach | A browser-based AI-assisted job-matching tool for placement coordinators in a State Rural Livelihoods Mission. The system surfaces and explains candidate recommendations from a large MIS-held pool for a given vacancy. Coordinators decide — the system does not. Piloting in two districts with weekly MIS data exports, staggered district activation, and explicit human override throughout. |

# 2. Coverage and Gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ● | ● | ○ | ○ |
| Solution | ○ | ● | ● | ○ |
| Institution | ○ | ○ | ● | ○ |
| Ecosystem | ○ | ○ | ○ | ○ |
**Coverage gaps:**

- **Persona / Pilot** — No documented know-how for this stage yet.
- **Persona / Scale** — No documented know-how for this stage yet.
- **Solution / Explore** — No documented know-how for this stage yet.
- **Solution / Scale** — No documented know-how for this stage yet.
- **Institution / Explore** — No documented know-how for this stage yet.
- **Institution / Define** — No documented know-how for this stage yet.
- **Institution / Scale** — No documented know-how for this stage yet.
- **Ecosystem / Explore** — No documented know-how for this stage yet.

# 3. Micro-Innovations

## Persona

**1. 1. Coordinator failure taxonomy not yet documented (Persona × Pilot)**
Unit 7 describes the issue categorisation design for the support process, but no failure taxonomy from actual coordinator use has been recorded. Which interactions are failing — and whether failures are scope problems (questions outside mandate) or quality problems (in-mandate recommendations that are poor) — remains open. This is the most important gap at the current stage: the answer shapes whether the fix is better prompting, better data, or tighter scope boundaries.

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

**2. 2. Coordinator training outcome not yet documented (Institution × Pilot)**
Unit 8 describes the planned two-hour orientation. Whether coordinators can correctly interpret match bands, stale-data signals, and the distinction between eligibility exclusion and AI ranking after that training has not been established. If coordinators cannot make that distinction reliably, the human-override guarantee (Unit 5) does not function as intended.

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

## Solution

**3. 6. No Scale-stage knowledge available across any dimension**
Institution × Scale and Ecosystem × Scale are entirely undocumented. This is expected at Pilot stage but means no pathway knowledge yet exists for the questions that will matter most if the pilot succeeds: who owns this operationally, what does the budget line look like, how does it absorb into the Mission without the founding team.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

**4. 7. Designing the deployment sequence as a staged activation with a mandatory gap**
- **Dimension:** Solution
- **Stage:** Pilot
- **Type:** Playbook
- **Playbook:**
  1. Configure pilot infrastructure and load synthetic candidate data.
  2. Validate vacancy workflow end-to-end with synthetic data.
  3. Validate eligibility rules against known test cases.
  4. Test matching service with synthetic candidates.
  5. Conduct privacy and security review — do not proceed until cleared.
  6. Load restricted pilot dataset (real candidate data, limited geography).
  7. Run internal acceptance tests.
  8. Train placement coordinators (two-hour orientation).
  9. Activate District A only. Observe first-week usage before any further activation.
  10. Activate District B only after operational problems from District A have been addressed.
- **Note:** The gap between District A and District B activation is the critical gate. Skipping the observation window to accelerate the second district activation removes the only mechanism for catching operational problems before they affect both districts simultaneously.
- **Condition — applies when:** Multi-district or multi-geography pilot; operational problems discovered at first site can be fixed before second site goes live; pilot volume is sufficient to observe usage patterns within one week.
- **Before → After:** Not documented in the source (pilot activation is in progress as of August 2026).

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*

## Institution

**5. 8. Separating issue categories in pilot support to distinguish model failures from data failures**
- **Dimension:** Institution
- **Stage:** Pilot
- **Type:** Strategic Decision
- **Decision:** During the first four weeks of the pilot, support issues are reviewed daily and categorised into eight types: software, data, vacancy input, recommendation quality, workflow, user access, training, and unknown. Matching-quality issues are tagged separately from software defects, and data-quality issues are logged separately from model errors.
- **Alternative considered:** A single issue queue where all problems are logged together and triaged reactively.
- **Why:** A poor recommendation can originate from at least three different causes — a software bug, a data quality problem, or a genuine model quality problem — and each requires a different fix. Conflating them produces misleading signals: if data errors are counted as model errors, the model appears worse than it is; if model errors are logged as data issues, data investment is misdirected. The eight-category taxonomy forces the attribution question at the point of logging, not retrospectively.
- **What this looked like here:** The taxonomy is defined in the architecture document as a pilot support process requirement, not as an optional logging convention. Daily review in the first four weeks is specified as an operational commitment, not a fallback.
- **Condition — applies when:** Recommendation quality is one of several possible failure modes; pilot evaluation depends on distinguishing model performance from data quality; the institution needs to decide after the pilot whether to invest in data improvement, model improvement, or both.

---

*— Kamesh · EkStep · Program Execution Partner · 2026-08-21*


# 4. Toolkits and Playbooks

| Unit | Type | Reuse condition |
|---|---|---|
| 4 | Playbook | ** Multi-district or multi-geography pilot; operational problems discovered at first site can be fixed before second site goes live; pilot volume is sufficient to observe usage patterns within one week. |

# 6. Retrieval Guide

- *"What goes wrong most often when a coordinator tries to use this system?"* → Unit 1
- *"How do I know if my coordinators are actually learning to use this effectively?"* → Unit 2
- *"What should I expect once we move beyond the pilot phase?"* → Unit 3
- *"In what order should we turn on features during the pilot?"* → Unit 4
- *"How long should we wait between rollout stages before expanding?"* → Unit 4
- *"When something breaks in the pilot, how do I figure out if it's the AI or our data?"* → Unit 5
- *"What mistakes do coordinators make that we should watch out for early on?"* → Unit 1, Unit 2
- *"How do we set up support so we can tell the difference between a model problem and a bad data problem?"* → Unit 5
- *"Is there a full-scale version of this we can look at to plan ahead?"* → Unit 3
- *"What does a realistic training outcome look like for the people running this?"* → Unit 2
- *"Should we launch everything at once or phase it in gradually?"* → Unit 4
- *"What patterns of failure should we document before we scale up?"* → Unit 1, Unit 3
- *"How do we structure pilot support so issues don't all get lumped together?"* → Unit 5
- *"What are the gaps in knowledge we should expect to hit at scale?"* → Unit 3
- *"How do coordinator mistakes in the pilot help us plan training going forward?"* → Unit 1, Unit 2

---

## Provenance

| Contributor | Organisation | Role | Units |
|---|---|---|---|
| Kamesh | EkStep | Program Execution Partner | 5 units |
| Abhiram | People + AI | Sponsoring Organization | 0 units |