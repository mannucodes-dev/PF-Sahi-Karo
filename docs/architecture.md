# PF Sahi Karo — System Architecture & Design Specification

**Version:** 1.0.0  
**Status:** Approved Architecture  
**Target Environment:** Vercel Serverless + Supabase PostgreSQL

---

## 1. Architectural Overview

PF Sahi Karo is structured as a privacy-first, server-driven citizen assistance platform. The architecture ensures strict separation of concerns between client components, server actions, database security boundaries, and external integration adapters.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Tier (Browser)                  │
│  - Accessible Next.js Components (Tailwind + Base UI)       │
│  - Supabase Browser Client (Anon Key ONLY)                  │
│  - Bilingual Context (English / Hindi)                      │
│  - WCAG 2.2 AA Focus Trapping & ARIA Live Announcements     │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS (TLS 1.3)
┌──────────────────────────────▼──────────────────────────────┐
│                   Server Tier (Next.js 16)                  │
│  - Next.js Middleware (Session validation & route guards)   │
│  - Server Components (Server-side dynamic data loading)     │
│  - Server Actions (Zod-validated mutations & audit triggers)│
│  - Supabase Server Client (@supabase/ssr Cookie Session)    │
│  - PII Masking & Redaction Engine                           │
└──────────────────────────────┬──────────────────────────────┘
                               │ Encrypted Connection
┌──────────────────────────────▼──────────────────────────────┐
│                 Database Tier (Supabase Postgres)           │
│  - Row Level Security (RLS) on all citizen tables           │
│  - Relational Foreign Keys & Check Constraints              │
│  - Immutable Claim Events & Audit Event Log                 │
│  - Private Storage Bucket (citizen-documents)               │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  External Integration Adapters              │
│  - EPFO Gateway Sync Adapter (Circuit Breaker & Retry)      │
│  - Notification Service Adapter (SMS/Email)                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Layer Definitions

### 2.1 Presentation Layer (`app/`, `components/`)
- Public Informational Pages: Static rendering with ISR for high scalability.
- Authenticated Citizen Portal (`/dashboard`, `/claims/*`): Server-rendered with session validation.
- Zero client-side authorization decisions.

### 2.2 Domain & Data Layer (`lib/data/`)
- Encapsulates database queries and mutation logic.
- Enforces profile ownership validation on every query.
- Never accepts client-provided `user_id` as an authorization source.

### 2.3 Validation Layer (`lib/validation/`)
- Runtime parsing using Zod.
- Validates UAN format (12 digits), passwords, resubmission checkboxes, and upload MIME signatures.

### 2.4 Security & Audit Layer (`lib/auth/`, `lib/audit/`, `lib/utils/`)
- Enforces DPDP Act compliance.
- Masks UANs, Bank Accounts, and Aadhaar identifiers before rendering or logging.
- Persists audit records to `audit_events` with sanitized metadata.

---

## 3. Data Storage & Lifecycle

| Table | Storage Scope | Access Rule | Retention Policy |
| :--- | :--- | :--- | :--- |
| `profiles` | PostgreSQL | Citizen-only SELECT/UPDATE | Permanent until citizen requests erasure |
| `claims` | PostgreSQL | Citizen-only SELECT; Server Action mutation | Synced from EPFO portal |
| `claim_events` | PostgreSQL | Citizen-only SELECT; Append-only | Permanent timeline record |
| `remark_codes` | PostgreSQL | Public SELECT (active only) | Versioned & governed |
| `resubmissions`| PostgreSQL | Citizen-only SELECT/INSERT | 30 days active lifecycle |
| `documents` | Private Bucket | Signed URL with 300s TTL | 30 days retention |
| `support_cases`| PostgreSQL | Citizen-only SELECT/INSERT | Retained for grievance SLA |
| `audit_events` | PostgreSQL | Server-only INSERT | 365-day security log |
