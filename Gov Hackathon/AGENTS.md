# AGENTS.md — PF Sahi Karo

## Project in one line
A web dashboard where a citizen sees their (mocked) EPFO PF claims and, if
one is rejected, gets an instant plain-English explanation of why and a
guided path to fix and resubmit it. Citizen-facing only. Fully mocked
backend. Solo build, hard deadline: **Aug 28, 8:00 PM IST**.

## Read before building
- `PRD.md` — problem, persona, scope in/out. Read this first, always.
- `TECH-STACK.md` — exact stack and folder conventions.
- `UI-UX-FLOW.md` — every screen and state, written spec (no mockups exist).
- `DATA-SCHEMA.md` — schema + exact seed data/copy. This is the product.

## Non-negotiable rules
1. **No real EPFO/government API calls, ever.** All data is mocked in
   Supabase. This is explicitly allowed by the hackathon rules — do not
   "improve" this by trying to find a real EPFO endpoint.
2. **Citizen-facing only.** Do not build an admin/officer panel or
   dashboard. Out of scope, per judging rules.
3. **No real LLM API calls for the core decoder.** The rejection-reason
   decoder is a deterministic rules lookup (see `DATA-SCHEMA.md`), not a
   live model call. This is a budget and demo-reliability constraint —
   don't swap it for an API call even if it seems "smarter."
4. **No real PII patterns.** Use obviously fictional names, UANs, and
   Aadhaar-style numbers in seed data. Never format seed data to look
   like a real extractable Aadhaar/PAN number.
5. **Must run in a browser, no auth friction for judges.** Pre-seeded test
   login credentials, no OTP/email-verification step in the demo path.
6. **Don't scope-creep.** No multi-language toggle, no real payment flow,
   no tax/pension calculators. If a build session finishes early, polish
   what exists — don't add features not listed in `UI-UX-FLOW.md`.

## Tech stack (see TECH-STACK.md for full detail)
Next.js 15 (App Router, TypeScript) · Tailwind CSS + shadcn/ui · Supabase
(Postgres + Auth) · Deploy target: Vercel.

## Code conventions
- TypeScript strict mode on.
- Keep components small and colocated; don't over-abstract for a 3-day
  throwaway-quality-is-fine codebase — working and readable beats clever.
- Commit after every working milestone (not every file) — solo dev, so
  commits are your rollback safety net, not a team-coordination tool.
- Any hardcoded mock data goes in `/lib/mock-data.ts` (or `/seed`), never
  scattered inline in components — `DATA-SCHEMA.md` is the source of truth
  for what goes in there.

## When stuck or ambiguous
State your assumption in a one-line comment and keep moving. This is a
3-day solo hackathon build, not production code — momentum matters more
than perfect decisions. Flag anything genuinely blocking in the session
summary at the end of your response rather than stalling on it.
