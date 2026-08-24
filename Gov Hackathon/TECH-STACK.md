# Tech Stack — PF Sahi Karo

## Stack decision
| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15, App Router, TypeScript | Fastest path for a solo 3-day build with zero new tooling to learn |
| Styling/UI | Tailwind CSS + shadcn/ui | Professional-looking fast, minimal custom CSS needed |
| Data | Supabase (Postgres + Auth) | Instant hosted DB + auth, generous free tier, no backend server to manage |
| Hosting | Vercel | One-click deploy from a Next.js repo, free tier is plenty for demo traffic |
| Decoder logic | Deterministic TypeScript rules lookup | Zero API cost, zero network dependency during judging — see `AGENTS.md` rule 3 |
| Optional stretch: FAQ chat | Free-tier model only (e.g. Gemini/Groq free tier) IF added at all | Never make this a dependency for the core flow |

**Important**: this is a fresh Supabase project and a fresh git repo. Do
not reuse an existing project's codebase, database, or branding.

## Folder structure
```
/app
  /login
  /dashboard
  /claims/[id]           -> claim detail (handles approved/pending/rejected states)
  /claims/[id]/resubmit   -> guided fix + resubmit flow
/components
  /ui                     -> shadcn components
  claim-card.tsx
  decoder-panel.tsx
  status-badge.tsx
/lib
  mock-data.ts            -> all seed data lives here (see DATA-SCHEMA.md)
  decoder-rules.ts        -> the rejection-reason lookup logic
  supabase.ts             -> client init
/supabase
  schema.sql              -> table definitions
  seed.sql                -> seed data matching mock-data.ts
```

## Environment variables
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server-side only, never exposed to client
```

## Core packages
```
next, react, react-dom, typescript
@supabase/supabase-js, @supabase/ssr
tailwindcss, shadcn/ui (installed via its CLI, not npm-added manually)
lucide-react (icons — shadcn's default)
```

Deliberately not adding: state management libraries, form libraries beyond
what's needed, animation libraries, testing frameworks. Not worth the
setup time for a 3-day throwaway-quality build.

## Budget / API constraints
No paid LLM API usage anywhere in the core flow. If the optional FAQ chat
stretch goal gets built, use a free-tier provider only, and treat it as
fully disposable — if it's flaky on demo day, cut it, the core decoder
flow is what's being judged.

## Deploy checklist (Day 3)
1. `vercel --prod` (or connect repo via Vercel dashboard for auto-deploy)
2. Set environment variables in Vercel project settings
3. Test the live URL in an incognito window — not localhost — before
   calling it done
4. Confirm test login credentials work on the live URL specifically
