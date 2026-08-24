# PF Sahi Karo — Project Doc Bundle

Hackathon: Round 1 submission, due **Aug 28, 8:00 PM IST**. Solo build.
Platform: **EPFO** (from the official 10-platform list).

## What this is

A citizen-facing web tool that instantly decodes *why* an EPFO PF claim was
rejected (in plain English, not EPFO's cryptic remarks) and walks the citizen
through exactly how to fix and resubmit it. Fully mocked backend — no real
EPFO integration. Only the citizen-facing side is built; admin is assumed.

## Why these files are in English, not Hinglish

These are meant to be read by a coding agent and reused as project
documentation. English parses more reliably for agents and stays
professional if anyone else ever looks at the repo. Keep talking to your
agent in whatever language you're comfortable with — the docs themselves
are the stable reference.

## Reading order (for you, once, before you touch code)

1. `PRD.md` — the problem, the persona, what we're building and NOT
   building, and why this pick over the other 9 platforms.
2. `TECH-STACK.md` — exact stack, folder structure, environment setup.
3. `UI-UX-FLOW.md` — every screen, every state, written since we're
   skipping a Figma/Stitch mockup pass to save time.
4. `DATA-SCHEMA.md` — the mock Supabase schema and the exact seed data
   (this is the actual content of your demo — read it carefully, the
   rejection-reason copy IS the product).
5. `BUILD-PLAN.md` — your solo, session-by-session schedule to Aug 28.
6. `PROMPTS.md` — copy-paste prompts for each build session.

## Reading order (for the agent)

`AGENTS.md` is the entry point — most modern agents (Antigravity,
OpenCode, Cursor, Claude Code) auto-read it from the project root. It's
short by design and points to the other files for detail, so the agent
doesn't have to ingest everything at once — good for free-tier models
with smaller context budgets.

## Quick start

1. `git init` a fresh repo — do not reuse any existing codebase or
   Supabase project. This is a standalone identity.
2. Drop all 8 files from this folder into the repo root (or a `/docs`
   folder — either works, just update the path in your first prompt to
   the agent if you move them).
3. Open your agent (Antigravity / OpenCode / whichever), point it at the
   repo, and paste **Prompt 1** from `PROMPTS.md` to kick off.
4. Follow `BUILD-PLAN.md` day by day. Don't skip ahead to polish before
   the core rejected-claim flow works end to end — that flow IS the demo.
