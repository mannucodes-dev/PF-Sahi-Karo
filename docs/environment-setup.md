# PF Sahi Karo — Local & Staging Environment Setup Guide

**Version:** 1.0.0

---

## 1. Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Supabase CLI (optional for local database emulation)

---

## 2. Quickstart for Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mannucodes-dev/PF-Sahi-Karo.git
   cd PF-Sahi-Karo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.local.example` template:
   ```bash
   cp .env.local.example .env.local
   ```
   For local development with deterministic demo fixtures, `NEXT_PUBLIC_DEMO_MODE=true` is enabled by default.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Database Setup (Supabase)

To connect a real Supabase instance:
1. Create a project on [Supabase.com](https://supabase.com).
2. Execute the migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_row_level_security.sql`
   - `supabase/seed/demo/demo_seed.sql` (for test/staging only)
3. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.
4. Set `NEXT_PUBLIC_DEMO_MODE=false`.
