# PF Sahi Karo — Deployment & Environment Operations Guide

**Version:** 1.0.0  
**CI/CD Pipeline:** GitHub Actions + Vercel Deployment

---

## 1. Environment Topology

```
[Local Development] -> [Vercel Preview / PR] -> [Staging Environment] -> [Production Environment]
  DEMO_MODE=true        Isolated Supabase Dev     Pre-production DB        Multi-AZ Production DB
```

---

## 2. Deployment Quality Gate Checklist

Before promoting any build to Production:
1. `npm run lint` — Zero ESLint errors or unused imports.
2. `npm run typecheck` — Strict TypeScript compilation clean.
3. `npm run test` — Unit and RLS verification tests passing.
4. `npm run build` — Clean Turbopack production bundle compilation.
5. Migration Validation — Migration files `001_initial_schema.sql` and `002_row_level_security.sql` tested on staging.
6. Secret Scan — Confirm zero hardcoded API keys or service-role tokens in Git history.

---

## 3. Environment Variables

| Variable | Scope | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Public | Base application URL (e.g. `https://pfsahikaro.in`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project API gateway |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase public anonymous API key |
| `NEXT_PUBLIC_DEMO_MODE` | Public | `false` in production; `true` only in local/preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Private | Server-only service role key for administrative tasks |
