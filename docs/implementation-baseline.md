# PF Sahi Karo — Implementation Baseline & Technical Audit

**Document Version:** 1.0.0  
**Date:** August 2026  
**Auditor:** Lead Architect & Security Team  
**Repository:** [mannucodes-dev/PF-Sahi-Karo](https://github.com/mannucodes-dev/PF-Sahi-Karo)

---

## 1. Executive Summary

PF Sahi Karo was developed as a hackathon prototype to assist Indian citizens in decoding cryptic EPFO (Employees' Provident Fund Organisation) claim rejection remarks into plain language with actionable resolution steps.

While the user interface provides a clear UX concept, the current prototype relies on hardcoded mock citizen data, deterministic client-side timers, permissive Supabase database policies (`USING (true)`), unauthenticated client-side state transitions, and unvalidated file inputs.

This document establishes the audit baseline and guides the systematic transformation of PF Sahi Karo into a production-grade, secure, accessible (WCAG 2.2 AA), bilingual (English/Hindi), and privacy-first citizen service foundation.

---

## 2. Current Route Inventory

| Route Path | Component / Type | Rendering Mode | Current State & Dependencies |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Static Redirect | Synchronous server redirect to `/login`. Lacks landing page, citizen guidance, service scope, and official EPFO disclaimers. |
| `/login` | `app/login/page.tsx` | Client Component | Fake login with hardcoded pre-filled demo citizen credentials (`Suresh Kumar`, UAN `100234567890`). Uses `setTimeout(..., 400)` to navigate to `/dashboard`. No Supabase Auth or session cookie handling. |
| `/dashboard` | `app/dashboard/page.tsx` | Client Component | Imports `MOCK_USER` and `MOCK_CLAIMS` directly from `@/lib/mock-data`. No server-side session authentication or dynamic user data fetching. |
| `/claims/[id]` | `app/claims/[id]/page.tsx` | Server Component | Fetches claim by ID synchronously from `MOCK_CLAIMS` array. Contains unused imports causing ESLint linting warnings. Hardcodes `MOCK_USER.uan` and `MOCK_USER.bank_account_last4`. |
| `/claims/[id]/resubmit` | `app/claims/[id]/resubmit/page.tsx` | Client Component | Contains React effect `setState` linting error. Uses `setTimeout(..., 1500)` to simulate resubmission. Randomly generates `EPFO-RSUB-XXXXXX` on client. Unvalidated mock file upload input. |

---

## 3. Current Component Inventory

| Component | File Path | Responsibilities & Issues |
| :--- | :--- | :--- |
| `ClaimCard` | `components/claim-card.tsx` | Displays individual claim summary, claim type, amount, status badge, action link. Clean UI but lacks data-backed status descriptions. |
| `DecoderPanel` | `components/decoder-panel.tsx` | Visualizes the 3-tier decoder (EPFO raw remark, plain explanation, fix steps). Uses terminal styling and claims "Verified Decode" without referencing circular dates or sources. Unused import `AlertTriangle`. |
| `RejectionScenarioView` | `components/rejection-scenario-view.tsx` | Evaluator scenario switcher covering 5 common rejection reasons. Currently exposed unconditionally to all users instead of being feature-flagged for demo/evaluation. |
| `StatusBadge` | `components/status-badge.tsx` | Renders color-coded status badges for `approved`, `pending`, `rejected`. Lacks support for extended lifecycle states (`resubmitted`, `pending_information`, `closed`, `integration_failed`). |
| `FAQWidget` | `components/faq-widget.tsx` | Floating assistant modal with 5 hardcoded FAQ items. Lacks focus trap, focus restoration, ESC key closing, and bilingual translations. |
| `UI Primitives` | `components/ui/` (`badge.tsx`, `button.tsx`, `card.tsx`) | Standard Tailwind + CVA primitives. |

---

## 4. Current Data Flow & Storage

```
[Browser Client]
       │
       ├── Direct import from lib/mock-data.ts (MOCK_USER, MOCK_CLAIMS, MOCK_REMARK_CODES)
       │
       └── lib/supabase.ts (Single untyped createClient instance initialized with anon key)
```

### Mock Data Dependencies Identified:
1. `MOCK_USER`: Hardcoded profile with UAN `100234567890`, name `Suresh Kumar`, balance `₹1,84,320`, bank ending in `4821`.
2. `MOCK_CLAIMS`: 3 hardcoded static claims (`approved` PF transfer, `pending` final settlement, `rejected` final settlement).
3. `MOCK_REMARK_CODES`: 5 static rejection codes (`NAME_MISMATCH`, `KYC_INCOMPLETE`, `BANK_MISMATCH`, `SERVICE_PERIOD`, `UAN_AADHAAR_UNLINKED`).
4. Fake operation `setTimeout` triggers in `app/login/page.tsx` (400ms) and `app/claims/[id]/resubmit/page.tsx` (1500ms).

---

## 5. Security & Privacy Audit Findings

### Critical Vulnerabilities (P0)
1. **Permissive Supabase RLS Policies in `supabase/schema.sql`:**
   ```sql
   CREATE POLICY "Allow public read access to users" ON users FOR SELECT USING (true);
   CREATE POLICY "Allow public read access to claims" ON claims FOR SELECT USING (true);
   CREATE POLICY "Allow public insert/update to claims" ON claims FOR ALL USING (true);
   ```
   *Risk:* Any unauthenticated internet user can read or modify all citizen profiles and claim records.
2. **Destructive Schema Migrations:**
   `schema.sql` contains `DROP TABLE IF EXISTS claims CASCADE;` and `DROP TABLE IF EXISTS users CASCADE;`. This would wipe production data upon migration execution.
3. **Absence of Real Authentication & Authorization:**
   Client routes do not verify JWT tokens or session cookies. No middleware protects `/dashboard` or `/claims/*`. Anyone can navigate directly to private claim routes.
4. **Client-Controlled Mutation Authority:**
   Claim resubmissions, reference IDs, and confirmations are generated entirely in client memory without server-side validation or persistence.
5. **Direct Exposure of PII in Markup:**
   Full UANs and bank identifiers are hardcoded without standard masking helpers.

### High Risks (P1)
1. **Unvalidated Document Uploads:**
   The file input accepts any file format or size with no MIME type checking, magic-byte inspection, virus scan hooks, or checksum verification.
2. **Missing Rate Limiting & Abuse Protection:**
   No rate limiting on login attempts, resubmission triggers, or API routes.
3. **Absence of Idempotency Constraints:**
   Submissions lack idempotency keys, risking duplicate resubmissions under network retries.

---

## 6. Accessibility & Inclusive Design Gaps (WCAG 2.2 AA)

1. **No Skip-to-Content Link:** Keyboard users cannot skip navigation landmarks.
2. **Dialog Accessibility:** `FAQWidget` lacks `role="dialog"`, `aria-modal="true"`, focus-trap, ESC key dismissal, and focus restoration to the trigger button.
3. **Color Reliance:** Status indicators rely predominantly on color without high-contrast icons and explicit screen-reader text.
4. **Form Validation:** Resubmission checkboxes and file inputs lack `aria-describedby`, error summaries, and dynamic `aria-live` error announcements.
5. **Language & Localization:** `<html>` is hardcoded to `lang="en"` while UI contains mixed English and Hinglish phrases (e.g., *"Samajh, sirf apne PF claim ka"*, *"Yeh common clerical issue hai"*). No bilingual support for Hindi (`hi`) or clean i18n translation catalogs.

---

## 7. Build, Lint & Test Verification Results

### Baseline Execution (2026-08-25)
- **`npm install`**: Passed (dependencies resolved).
- **`npm run typecheck`**: Passed (`tsc --noEmit` clean).
- **`npm run build`**: Passed (Next.js 16.3.2 Turbopack generated 6 static/dynamic routes).
- **`npm run lint`**: **FAILED (1 error, 11 warnings)**:
  - Error: `app/claims/[id]/resubmit/page.tsx:44:7` — `react-hooks/set-state-in-effect` (calling `setState` synchronously within `useEffect`).
  - Warnings: Unused imports in `app/claims/[id]/page.tsx`, `components/decoder-panel.tsx`, and `app/claims/[id]/resubmit/page.tsx`.

---

## 8. Target Production Architecture & Implementation Plan

### Phase 1: Security & Auth Foundation
- Create modular Supabase clients (`browser.ts`, `server.ts`, `admin.ts`) using `@supabase/ssr`.
- Implement Supabase Auth sessions, cookies, and Next.js `middleware.ts` for route protection.
- Implement versioned, non-destructive SQL migrations (`supabase/migrations/001_initial_schema.sql`).
- Implement strict Row Level Security (RLS) policies prohibiting public access.
- Isolate demo mode strictly under `process.env.DEMO_MODE === "true"` and disable when `NODE_ENV === "production"`.

### Phase 2: Real Data Architecture & Domain Repositories
- Implement data access modules in `lib/data/` (`profiles.ts`, `claims.ts`, `claim-events.ts`, `remark-codes.ts`, `resubmissions.ts`, `documents.ts`, `support-cases.ts`).
- Server-side data loading for dashboard and claim details with ownership verification.
- Implement PII masking utilities (`lib/utils/masking.ts`) for UAN, Bank Account, Aadhaar.

### Phase 3: Persisted Resubmission & Document Uploads
- 10-state claim lifecycle workflow with `claim_events` audit trail.
- Server actions with Zod schema validation (`lib/validation/`).
- Server-side idempotency keys and cryptographically sound reference IDs (`EPFO-RSUB-XXXXX`).
- Secure document handling with private Supabase storage bucket, MIME validation, and signed URLs.

### Phase 4: Public Trust Pages & Internationalization
- Create informational pages: `/`, `/about`, `/privacy`, `/accessibility`, `/terms`, `/help`, `/service-status`, `/contact`, `/unauthorized`, `/error`, `/not-found`.
- Implement bilingual i18n architecture (English `en` and Hindi `hi`) with language switcher and glossary.
- Upgrade `FAQWidget` and decoder panels with full WCAG 2.2 AA accessibility and official source citations.

### Phase 5: Reliability, Observability & Performance
- Health check endpoint `/api/health`.
- Structured logging with automatic PII redaction.
- Create operational and governance documentation in `docs/`.

### Phase 6: Automated Testing & Verification
- Unit test suite for masking, formatting, decoder rules, upload validation, and idempotency.
- Integration tests for auth, RLS, and server actions.
- Full typecheck, lint, build, and audit validation.
