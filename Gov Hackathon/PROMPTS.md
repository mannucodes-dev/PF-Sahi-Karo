# Agent Prompts — PF Sahi Karo

Paste these into your agent (Antigravity, OpenCode, or whichever free tool
you're using) at the start of each session. `AGENTS.md` auto-loads for
most tools, but paste it manually first if your tool doesn't auto-read
project root files.

---

## Prompt 1 — Kickoff & Scaffold (Aug 25 evening)

```
Read AGENTS.md, PRD.md, TECH-STACK.md, and DATA-SCHEMA.md in this repo
before doing anything.

Scaffold a new Next.js 15 project (App Router, TypeScript, Tailwind) per
the folder structure in TECH-STACK.md. Set up shadcn/ui. Create the
Supabase schema (users, claims, remark_codes tables) as SQL matching
DATA-SCHEMA.md exactly, and a seed script with the exact seed data listed
there — don't invent different mock data, use what's specified.

Scope for this session ONLY: project scaffold + working schema + seed
data loaded into Supabase + a blank running dev server. Do not build any
UI screens yet — that's the next session. Confirm what you built at the
end and flag anything from TECH-STACK.md you couldn't set up as
specified.
```

---

## Prompt 2 — Core Flow (Aug 26)

```
Read UI-UX-FLOW.md fully before starting — it is the visual spec, there
are no mockup images for this project.

Build, in order: Login screen with pre-filled test credentials visible on
the page -> Dashboard with the 3 seeded claims showing correct status
badges -> Claim Detail screens for all 3 states (approved, pending,
rejected) -> for the rejected claim specifically, wire the decoder panel
to the remark_codes lookup table, not a hardcoded string -> Resubmit flow
-> Confirmation screen.

Match the screen structure and copy tone in UI-UX-FLOW.md. It's fine if
styling is rough right now - polish is a separate session. The bar for
"done" today is: I can click through the entire flow, login through
confirmation, using only the seeded data, with nothing broken.

Stop and tell me if anything in UI-UX-FLOW.md is ambiguous rather than
guessing silently.
```

---

## Prompt 3 — Polish & Depth (Aug 27)

```
The core flow works end to end (from yesterday's session). Today: visual
polish only, no new features unless explicitly listed below.

1. Polish spacing, color consistency, and typography per the tone
   described in UI-UX-FLOW.md's "Visual tone" and "Copy tone" sections.
2. Make sure the "What EPFO said" vs "What this actually means" contrast
   on the rejected claim screen is visually obvious at a glance - that
   contrast is the core of the pitch.
3. Check responsive behavior at ~768px and phone width, fix breakages.
4. ONLY if the above is fully done with time to spare: build the optional
   FAQ chat box from UI-UX-FLOW.md - rules-based only, no live API calls,
   per AGENTS.md.

Do not add anything not listed in UI-UX-FLOW.md or PRD.md's scope. If you
notice something that would be "nice to have," name it in your summary
instead of building it.
```

---

## Prompt 4 — Pre-Submission QA (Aug 28) — Audit -> Fix -> Verify

```
This is the final pre-submission pass. Run it as three explicit phases,
don't blend them.

AUDIT: Go through UI-UX-FLOW.md screen by screen and PRD.md's "Success
criteria for the demo" section. List every mismatch between what's
specified and what's actually built, and every broken interaction you can
find by reasoning through the click paths. Do not fix anything yet - just
report.

FIX: Now fix everything from the audit, prioritized: (1) anything that
breaks the core rejected-claim-decode flow, (2) anything visually broken
at demo resolution, (3) everything else, only if time allows.

VERIFY: After fixing, re-walk the full click path (login -> dashboard ->
rejected claim -> decode -> resubmit -> confirmation) as if you were a
judge who has never seen this before, using ONLY the seeded test
credentials. Confirm it works on the deployed Vercel URL, not just
localhost. Report the final state honestly, including anything you were
not able to fix in time.
```
