# PRD — PF Sahi Karo

## Problem statement (one sentence)
A citizen's EPFO PF claim gets rejected with a cryptic one-line remark and
no explanation or fix path, forcing them to guess, ask around, or lose a
day's wage visiting an EPFO office to find out something as small as a
name-spelling mismatch.

## Persona
**Suresh, 29, factory supervisor, tier-2 town.** Changed jobs, needs his PF
for an emergency. Files the claim online. Two weeks later: "Rejected —
Refer remarks." No explanation of what "remarks" means or what to do next.
He can't afford another day off work to visit the EPFO office to ask.

This isn't a niche case — EPFO has roughly **29 crore subscribers**, and
final-settlement claim rejection rates have risen from 13% to **34%** over
the last five years as the process moved fully online (source: Lok Sabha
reply reported by Deccan Herald / Indian Express, 2024; EPFO subscriber
count is EPFO's own published figure). Most rejections trace back to small,
fixable mismatches: Aadhaar-vs-EPFO name spelling, incomplete KYC, bank
detail errors, service-period mismatches.

## What we're building (purpose)
A dashboard where the citizen logs in, sees their claims (mocked), and for
a rejected one, gets:
1. The raw EPFO-style remark (for authenticity)
2. An instant plain-English decode of what it actually means
3. A concrete, numbered "here's exactly what to do" fix
4. A guided resubmission flow ending in a clear confirmation

## Why this, not the other 9 platforms
- **IRCTC / Income Tax / GST** are the most obvious picks — expect the
  highest submission volume here, hardest to stand out. Tax also carries
  real domain-accuracy risk if the rules are wrong.
- **CPGRAMS** is real (2.11 lakh pending grievances, 36% dissatisfaction
  even on "resolved" cases) but spans every ministry — hard to make a
  sharp, single-narrative demo in 3 days.
- **RTI Online** is a strong runner-up (40%+ no-response rate, wrong-PIO
  routing as the #1 delay cause) but the addressable audience is smaller,
  and commercial tools (FileMyRTI, RTIwala) already serve this niche.
- **EPFO** has the broadest audience of any platform on the list, a sharp
  quantifiable failure mode, and fits the organizers' own example of a
  good idea — a focused, useful, "chatbot-driven" flow rather than a
  flashy clone.

## Competitive landscape — does this already exist?
Checked before committing to this. Short answer: not as a free, instant,
self-serve tool.
- **UMANG app / EPFO Member Portal**: show raw status only (Under
  Process / Approved / Rejected) via app, SMS, or missed call. No
  decoding, no fix guidance.
- **Blog content** (Bajaj Finserv, ClearTax, NoBroker forum, etc.):
  generic static articles listing common rejection categories. Not
  personalized to *your* specific claim — you have to self-diagnose.
- **Kustodian.life and similar**: paid, human-assisted concierge services
  that resolve your case for a fee.

**The gap**: nothing free, instant, and tied to your specific claim exists
today. That's the wedge.

## Scope — IN
- Instant test login (pre-seeded credentials)
- Dashboard: mock UAN profile, PF balance, 3 claims (approved / pending /
  rejected)
- Rejected-claim decoder: raw remark → plain-English explanation → fix
  steps → guided resubmission → confirmation
- Responsive layout (desktop-first is fine for the demo, but don't break
  on mobile width)
- Optional stretch: a small rules-based "Ask about your claim" FAQ box
  (see `UI-UX-FLOW.md`) — only build this if the core flow is fully done
  and stable with a day or more to spare

## Scope — OUT (explicitly, so there's no ambiguity mid-build)
- No real EPFO/UMANG API integration
- No admin/officer-side panel
- No real tax, pension, or interest calculations
- No multi-language toggle
- No real payment/refund processing
- No "guaranteed approval" language anywhere in copy — always frame as
  "common reason" / "try this," never a guarantee
- No live LLM API calls in the core flow (budget + demo-reliability
  constraint — see `AGENTS.md`)

## Success criteria for the demo
- A judge can log in with test credentials and, within 30 seconds, see
  the rejected claim, understand exactly why it was rejected, and see
  what fixing it looks like — without narration.
- Live public link works in a fresh incognito browser tab.
- Nothing breaks if clicked in an unexpected order.

## Honest read on selection odds
No guarantees. Structural factors in our favor: EPFO is on the official
list (no off-list penalty), it's likely less crowded than IRCTC/Tax/GST,
it's grounded in verifiable government data (strong for the 250-word
summary), and it matches the organizers' stated example of a good idea —
a focused, useful, chatbot-style flow over a flashy clone. Execution
quality is what actually moves the needle from here.
