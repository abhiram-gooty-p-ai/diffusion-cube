---
type: Pathway
title: Savyasachi (product name: Savya)
sector: Productivity / SMB Tools
stage: Explore
timestamp: 2026-08-24
version: v4
---

# 0. Overview

Community-contributed pathway: **Savyasachi (product name: Savya)**

**Sector:** Productivity / SMB Tools

**Problem:** Indian founders and operators managing fragmented tool stacks and high context-switching overhead. WhatsApp-native workflows.

**Approach:** Savyasachi is a pre-launch AI personal assistant for early-stage Indian founders and operators. It converts voice memos and calls into structured actions across Notion, Google Calendar, Gmail, and WhatsApp. The product is seeking its first 10 founding users.

# 1. Pathway Identity

| Field | Value |
|---|---|
| Name | Savyasachi (product name: Savya) |
| Sector | Productivity / SMB Tools |
| Stage | Explore |
| Problem | Indian founders and operators managing fragmented tool stacks and high context-switching overhead. WhatsApp-native workflows. |
| Solution approach | Savyasachi is a pre-launch AI personal assistant for early-stage Indian founders and operators. It converts voice memos and calls into structured actions across Notion, Google Calendar, Gmail, and WhatsApp. The product is seeking its first 10 founding users. |

# 2. Coverage and Gaps

| Dimension | Explore | Define | Pilot | Scale |
|---|---|---|---|---|
| Persona | ●● | ○ | ○ | ○ |
| Solution | ●● | ○ | ○ | ○ |
| Institution | ●● | ○ | ○ | ○ |
| Ecosystem | ●● | ○ | ○ | ○ |
**Coverage gaps:**

- **Persona / Define** — No documented know-how for this stage yet.
- **Persona / Pilot** — No documented know-how for this stage yet.
- **Persona / Scale** — No documented know-how for this stage yet.
- **Solution / Define** — No documented know-how for this stage yet.
- **Solution / Pilot** — No documented know-how for this stage yet.
- **Solution / Scale** — No documented know-how for this stage yet.
- **Institution / Define** — No documented know-how for this stage yet.
- **Institution / Pilot** — No documented know-how for this stage yet.

# 3. Micro-Innovations

## Persona

**1. 2. WhatsApp as the review and notification layer, not the primary interface**
- `Dimension:` Persona
- `Stage:` Explore
- `Also relevant at:` Define
- `Type:` Strategic Decision

- **Decision:** Route review and approval notifications through WhatsApp rather than building a dedicated app interface or relying on email, because the target user already lives in WhatsApp.
- **Alternative considered:** Not documented in the source.
- **Why:** For Indian founders managing high-volume communication, WhatsApp is the ambient layer where decisions already happen. A separate app requires the user to check another surface; WhatsApp meets them where they are. This also reduces the behaviour change required for adoption, which matters for a pre-launch product trying to establish habit.
- **What this looked like here:** The pitch explicitly positions WhatsApp-native notifications as a market-fit advantage specific to Indian workflows, distinguishing it from Western SaaS products that rely on email or in-app dashboards.
- **Condition — applies when:** Target users rely on WhatsApp as a primary coordination channel; the market is India or a similar WhatsApp-dominant context. Fails when users treat WhatsApp as personal-only or operate in enterprise environments where WhatsApp is not sanctioned.

---

*— Abhiram · People + AI · Sponsoring Organization · 2026-08-24*

**2. 2. WhatsApp as the review and notification layer, not the primary interface**
- `Dimension:` Persona
- `Stage:` Explore
- `Also relevant at:` Define
- `Type:` Strategic Decision

- **Decision:** Route review and approval notifications through WhatsApp rather than building a dedicated app interface or relying on email, because the target user already lives in WhatsApp.
- **Alternative considered:** Not documented in the source.
- **Why:** For Indian founders managing high-volume communication, WhatsApp is the ambient layer where decisions already happen. A separate app requires the user to check another surface; WhatsApp meets them where they are. This also reduces the behaviour change required for adoption, which matters for a pre-launch product trying to establish habit.
- **What this looked like here:** The pitch explicitly positions WhatsApp-native notifications as a market-fit advantage specific to Indian workflows, distinguishing it from Western SaaS products that rely on email or in-app dashboards.
- **Condition — applies when:** Target users rely on WhatsApp as a primary coordination channel; the market is India or a similar WhatsApp-dominant context. Fails when users treat WhatsApp as personal-only or operate in enterprise environments where WhatsApp is not sanctioned.

---

*— Abhiram Gooty · People + AI · Program Execution Partner · 2026-08-24*

## Solution

**3. 5. Org memory as a compounding asset, not a static knowledge base**
- `Dimension:` Solution
- `Stage:` Explore
- `Also relevant at:` Define
- `Type:` Strategic Decision

- **Decision:** Build memory as a vector store (Supabase) that grows with usage, so the system improves over time as it accumulates more context about the user's decisions, relationships, and workflows — rather than starting fresh on each interaction.
- **Alternative considered:** Not documented in the source.
- **Why:** A static tool connects inputs to outputs but doesn't get better. A compounding memory store creates a switching cost (the user's history lives here) and a retention mechanism — the longer the user stays, the more accurate the routing and the more personalised the output. This is also a market differentiation claim against cheaper, stateless alternatives.
- **What this looked like here:** The pitch states "Memory compounds over time — gets smarter the more you use it" as a specific India-market advantage. The technical implementation is a Supabase vector store.
- **Condition — applies when:** User population has long-enough usage cycles for compounding to be meaningful (weeks, not one-off tasks); the product's value proposition includes personalisation over time. The data governance question — who owns, corrects, and audits this memory — is unresolved at Explore and must be addressed before Define.

---

*— Abhiram · People + AI · Sponsoring Organization · 2026-08-24*

**4. 5. Org memory as a compounding asset, not a static knowledge base**
- `Dimension:` Solution
- `Stage:` Explore
- `Also relevant at:` Define
- `Type:` Strategic Decision

- **Decision:** Build memory as a vector store (Supabase) that grows with usage, so the system improves over time as it accumulates more context about the user's decisions, relationships, and workflows — rather than starting fresh on each interaction.
- **Alternative considered:** Not documented in the source.
- **Why:** A static tool connects inputs to outputs but doesn't get better. A compounding memory store creates a switching cost (the user's history lives here) and a retention mechanism — the longer the user stays, the more accurate the routing and the more personalised the output. This is also a market differentiation claim against cheaper, stateless alternatives.
- **What this looked like here:** The pitch states "Memory compounds over time — gets smarter the more you use it" as a specific India-market advantage. The technical implementation is a Supabase vector store.
- **Condition — applies when:** User population has long-enough usage cycles for compounding to be meaningful (weeks, not one-off tasks); the product's value proposition includes personalisation over time. The data governance question — who owns, corrects, and audits this memory — is unresolved at Explore and must be addressed before Define.

---

*— Abhiram Gooty · People + AI · Program Execution Partner · 2026-08-24*

## Institution

**5. 6. Indian market pricing as a positioning constraint, not an afterthought**
- `Dimension:` Institution
- `Stage:` Explore
- `Type:` Strategic Decision

- **Decision:** Price explicitly against the cost of a human EA in India (₹40,000/month) rather than against Western SaaS alternatives, and commit to founding-user pricing locked forever.
- **Alternative considered:** Not documented in the source.
- **Why:** Western SaaS pricing ($49/month) is a known adoption barrier in the Indian SMB market. Anchoring against the EA cost establishes value without requiring the user to translate from a foreign pricing context. Lifetime founding-user pricing is an acquisition mechanism for an unproven product — it compensates for the risk of being an early user.
- **What this looked like here:** The pitch names ₹40,000/month as the EA benchmark and commits to "founding user pricing locked forever" as the offer to the first 10 users.
- **Condition — applies when:** Target market has strong price sensitivity relative to Western SaaS norms; the product has no usage track record and needs to compensate early adopters for risk. Fails when the product reaches a stage where founding-user pricing creates unsustainable unit economics.

---

*— Abhiram · People + AI · Sponsoring Organization · 2026-08-24*

**6. 6. Indian market pricing as a positioning constraint, not an afterthought**
- `Dimension:` Institution
- `Stage:` Explore
- `Type:` Strategic Decision

- **Decision:** Price explicitly against the cost of a human EA in India (₹40,000/month) rather than against Western SaaS alternatives, and commit to founding-user pricing locked forever.
- **Alternative considered:** Not documented in the source.
- **Why:** Western SaaS pricing ($49/month) is a known adoption barrier in the Indian SMB market. Anchoring against the EA cost establishes value without requiring the user to translate from a foreign pricing context. Lifetime founding-user pricing is an acquisition mechanism for an unproven product — it compensates for the risk of being an early user.
- **What this looked like here:** The pitch names ₹40,000/month as the EA benchmark and commits to "founding user pricing locked forever" as the offer to the first 10 users.
- **Condition — applies when:** Target market has strong price sensitivity relative to Western SaaS norms; the product has no usage track record and needs to compensate early adopters for risk. Fails when the product reaches a stage where founding-user pricing creates unsustainable unit economics.

---

*— Abhiram Gooty · People + AI · Program Execution Partner · 2026-08-24*

## Ecosystem

**7. 7. Named integration stack as a scope boundary, not just a feature list**
- `Dimension:` Ecosystem
- `Stage:` Explore
- `Also relevant at:` Define
- `Type:` Strategic Decision

- **Decision:** Commit to a specific, named V1 integration set — Notion, Google Calendar, Gmail, WhatsApp, Supabase, Whisper — and explicitly defer others (mobile app, custom integrations, inventory/D2C workflows) to V2.
- **Alternative considered:** Not documented in the source.
- **Why:** For a pre-launch product, an open integration set creates unbounded build scope and makes it impossible to define what "done" means for the first users. Naming the V1 stack forces a scope decision and communicates to founding users exactly what Savya will and won't do. It also surfaces the ecosystem dependencies early — each named integration is a dependency that requires API access, rate limit awareness, and terms-of-service compliance.
- **What this looked like here:** The pitch separates V1 (voice → Whisper → Supabase → Notion/Calendar/Gmail/WhatsApp) from V2 (live call recording, mobile app, multi-user, custom integrations) with explicit tick/clock symbols.
- **Condition — applies when:** Pre-launch product needs to scope its first real-user test; founding users need to know what they are signing up for. The V1/V2 boundary must be renegotiated once founding-user feedback arrives — treat it as a starting hypothesis, not a commitment.

---

*— Abhiram · People + AI · Sponsoring Organization · 2026-08-24*

**8. 7. Named integration stack as a scope boundary, not just a feature list**
- `Dimension:` Ecosystem
- `Stage:` Explore
- `Also relevant at:` Define
- `Type:` Strategic Decision

- **Decision:** Commit to a specific, named V1 integration set — Notion, Google Calendar, Gmail, WhatsApp, Supabase, Whisper — and explicitly defer others (mobile app, custom integrations, inventory/D2C workflows) to V2.
- **Alternative considered:** Not documented in the source.
- **Why:** For a pre-launch product, an open integration set creates unbounded build scope and makes it impossible to define what "done" means for the first users. Naming the V1 stack forces a scope decision and communicates to founding users exactly what Savya will and won't do. It also surfaces the ecosystem dependencies early — each named integration is a dependency that requires API access, rate limit awareness, and terms-of-service compliance.
- **What this looked like here:** The pitch separates V1 (voice → Whisper → Supabase → Notion/Calendar/Gmail/WhatsApp) from V2 (live call recording, mobile app, multi-user, custom integrations) with explicit tick/clock symbols.
- **Condition — applies when:** Pre-launch product needs to scope its first real-user test; founding users need to know what they are signing up for. The V1/V2 boundary must be renegotiated once founding-user feedback arrives — treat it as a starting hypothesis, not a commitment.

---

*— Abhiram Gooty · People + AI · Program Execution Partner · 2026-08-24*


# 4. Toolkits and Playbooks

None documented.

# 6. Retrieval Guide

- *"why does the system send updates to WhatsApp instead of having its own app?"* → Unit 1, Unit 2
- *"can managers approve or reject things directly from WhatsApp without logging in?"* → Unit 1, Unit 2
- *"how does the system get smarter over time as we use it more?"* → Unit 3, Unit 4
- *"will it remember decisions and context from past projects automatically?"* → Unit 3, Unit 4
- *"how do you price this for Indian companies without it feeling like a watered-down version?"* → Unit 5, Unit 6
- *"is there a startup or SME plan that makes sense for our budget?"* → Unit 5, Unit 6
- *"which tools does it actually connect with out of the box?"* → Unit 7, Unit 8
- *"what happens if we use software that is not on your integration list?"* → Unit 7, Unit 8
- *"does it work with Zoho or Tally since that is what most Indian businesses run?"* → Unit 7, Unit 8
- *"why WhatsApp and not email or Slack for notifications?"* → Unit 1, Unit 2
- *"how is this different from just storing documents in a shared drive?"* → Unit 3, Unit 4
- *"can the knowledge base learn from how our team actually works rather than what we manually upload?"* → Unit 3, Unit 4
- *"will the pricing go up significantly once we scale to more users?"* → Unit 5, Unit 6
- *"how do we know the integration list covers what we already have without a full technical review?"* → Unit 7, Unit 8
- *"what does the notification flow look like end to end when something needs a decision?"* → Unit 1, Unit 2

---

## Provenance

| Contributor | Organisation | Role | Units |
|---|---|---|---|
| Abhiram Gooty | People + AI | Program Execution Partner | 4 units |
| Abhiram | People + AI | Sponsoring Organization | 4 units |
| Kamesh | EkStep | Program Execution Partner | 0 units |