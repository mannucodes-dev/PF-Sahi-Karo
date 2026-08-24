# UI/UX Flow — PF Sahi Karo

No Figma/Stitch mockups exist for this build — this document IS the visual
spec. Be precise when implementing; don't improvise layout decisions not
covered here without leaving a comment explaining the call you made.

## Visual tone
Trustworthy-but-approachable, not a sterile government clone and not a
flashy consumer app. Think: a well-designed fintech app (Groww, Jupiter),
not india.gov.in. Primary color: a calm blue or teal (trust + government
association without looking dated). Generous whitespace. shadcn defaults
are a fine starting point — don't over-invest in custom theming with
limited time.

## Screen 1 — Login
- Centered card, app name/logo placeholder, tagline (one line — what this
  does, e.g. "Samajh, sirf apne PF claim ka" / "Understand your PF claim,
  instantly")
- Pre-filled test credentials visible on the page itself (label it "Demo
  login — pre-filled for judges") so nobody has to hunt for them
- One "Log in" button. No signup flow needed — this is a demo, not a
  product with real onboarding.

## Screen 2 — Dashboard
- Header: greeting with mock name, mock UAN number, mock PF balance
  (large, prominent — this is the "I understand this is my account" beat)
- Below: "Your Claims" — a list of 3 claim cards:
  1. **Approved** claim — green badge, amount, settled date
  2. **Pending** claim — amber badge, "Under review," submitted date
  3. **Rejected** claim — red badge, submitted date, and a clear
     "See why →" call to action (this is the one the whole demo hinges on
     — make it visually distinct, not buried in the list)
- Empty/loading states: not needed for the demo (data is always present)
  but don't let the page break if a claim list is empty — cheap insurance.

## Screen 3 — Claim Detail (Rejected)
This is the centerpiece. Structure top to bottom:
1. Claim summary header (claim ID, type — e.g. "Final PF Settlement,"
   amount claimed, submitted date)
2. **"What EPFO said"** — the raw cryptic remark, styled like an official
   system message (monospace or a muted box) — this contrast is what
   makes the decode land
3. **"What this actually means"** — the decoder panel: plain-English
   explanation, warm but not condescending tone
4. **"How to fix it"** — numbered concrete steps (2-4 steps, specific to
   the rejection type, not generic advice)
5. Primary CTA button: "Resubmit claim" → Screen 4

## Screen 4 — Guided Resubmit
- Recap the fix required (1 line, carried over from Screen 3)
- Mock document re-upload field (doesn't need real file processing —
  accepting any file / a checkbox "I've corrected this" is fine for a
  demo, don't over-engineer)
- "Submit correction" button
- On submit: move straight to Screen 5 (no artificial delay needed, but a
  brief loading state — 1-2 seconds — reads as more real than instant)

## Screen 5 — Confirmation
- Clear success state: "Resubmitted successfully"
- Expected review timeline (mock, e.g. "Expected update within 15 days")
- Link back to dashboard

## Claim Detail (Approved / Pending)
Simpler, supporting screens — prove the dashboard is a real multi-state
system, not a single trick page.
- **Approved**: settlement amount, date, "Funds transferred to [mock bank]
  account ending XXXX"
- **Pending**: current stage if you want a small nice-to-have (e.g. a
  3-step progress indicator: Submitted → Under Review → Decision), else
  just a status message. Skip the progress indicator if time is tight —
  it's not load-bearing for the demo.

## Optional stretch — "Ask about your claim" FAQ box
Only build if the core flow above is fully done and stable with time to
spare (see `BUILD-PLAN.md`). A small chat-style widget, rules-based (see
`AGENTS.md`), answering 5-6 canned questions:
- "What is Form 10C?"
- "Why is my UAN inactive?"
- "How long does a resubmission take?"
- "What if I don't have the corrected document yet?"
- "Can I withdraw partially instead?"
Keep it visually simple — a list of tappable question chips that reveal
canned answers is enough. Do not attempt a free-text input with a live
model call unless there's genuinely a full extra day free.

## Copy tone guidelines
- Plain language over jargon. If a technical term (UAN, KYC, EPS) must
  appear, define it inline in parentheses the first time.
- Empathetic but factual — acknowledge the frustration without being
  saccharine ("Yeh common issue hai, aur fix karna easy hai" energy, not
  corporate apology-speak).
- Never promise an outcome ("this WILL be approved") — always frame as
  "this is the most common reason" / "this typically resolves it."
- English-primary with natural Hindi/Hinglish touches in labels and
  microcopy is fine and adds authenticity (e.g. a button labeled "Sahi
  Karo" instead of just "Fix") — full Hindi translation is not required
  and is explicitly out of scope.

## Responsive note
Build desktop-first (that's how you'll demo/record), but don't let it
visually break below ~768px — a judge opening the live link on a phone
should still get a usable, not broken, experience.
