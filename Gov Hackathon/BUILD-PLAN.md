# Build Plan — Solo, Aug 25 (evening) → Aug 28, 8:00 PM IST

No mockup phase — straight from `UI-UX-FLOW.md` into code, per your call.
Build the rejected-claim path first, always. Everything else is
supporting cast.

## Today, Aug 25 (evening) — Setup, ~2 hrs
- Fresh git repo, fresh Supabase project (do not touch ABitMoney's)
- `npx create-next-app` with TypeScript + Tailwind, add shadcn/ui
- Create `/supabase/schema.sql` from `DATA-SCHEMA.md`, run it against your
  new Supabase project
- Write `/lib/mock-data.ts` and `seed.sql` with the exact seed content
  from `DATA-SCHEMA.md` — get this right now, it's annoying to fix later
  once the UI is built against it
- Paste **Prompt 1** from `PROMPTS.md` into your agent to scaffold the
  project structure from `TECH-STACK.md`
- **Done-for-today marker**: repo exists, schema is live, seed data is in
  the database, `npm run dev` shows a blank-but-running app

## Aug 26 — Core flow, all day
Goal: every screen in `UI-UX-FLOW.md` exists and is wired to real (mock)
data, even if ugly. Use **Prompt 2** from `PROMPTS.md`.

- Morning: Login screen + Supabase Auth wiring + test credentials seeded
- Midday: Dashboard screen — claim list, all 3 statuses rendering
  correctly with the right badges
- Afternoon: Claim Detail screens for all 3 states (approved/pending is
  simple; rejected is the important one — get the raw remark + decoder
  panel + fix steps rendering from the `remark_codes` lookup, not
  hardcoded)
- Evening: Resubmit flow (Screen 4) + Confirmation (Screen 5)
- **Done-for-today marker**: you can click through login → dashboard →
  rejected claim → see the decoded explanation → resubmit → confirmation,
  start to finish, without touching code. Ugly is fine. Broken is not.

## Aug 27 — Polish + depth, all day
Use **Prompt 3** from `PROMPTS.md`.

- Morning: Visual polish pass — spacing, color consistency, the "What
  EPFO said" vs "What this means" contrast should read clearly at a
  glance (this contrast is the whole pitch, don't rush it)
- Midday: Responsive check at ~768px and phone width, fix anything broken
- Afternoon: If ahead of schedule, build the optional FAQ chat stretch
  from `UI-UX-FLOW.md`. If not ahead of schedule, skip it entirely — do
  not let it eat into evening buffer time.
- Evening: Full click-through QA yourself, in an incognito window,
  pretending to be a judge who's never seen this before

## Aug 28 — Ship day, target done by ~5-6 PM (buffer before 8 PM deadline)
Use **Prompt 4** (Audit → Fix → Verify) from `PROMPTS.md`.

- Morning: Deploy to Vercel, set env vars, test the *live* URL fresh
  (not localhost)
- Midday: Record the 2-minute demo video — Minute 1: use the product as
  Suresh (the citizen), no narration of code. Minute 2: explain what you
  built, why, and how (this is where "29 crore subscribers, 34%
  rejection rate" earns its place — say it here)
- Afternoon: Write the 250-word summary (what it is, why it's better than
  what exists today — see `PRD.md`'s competitive landscape section for
  the raw material)
- Leave 1-2 hours of slack before 8 PM for the unglamorous stuff: test
  the live link one more time in a completely fresh browser, double-check
  the demo credentials work on the *deployed* version, submit the form
- **Do not submit at 7:59 PM.** Aim to be done with room to spare.
