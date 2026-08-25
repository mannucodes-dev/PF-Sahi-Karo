# PF Sahi Karo — Security Model & Authorization Architecture

**Version:** 1.0.0  
**Classification:** Restricted Engineering Document

---

## 1. Security Principles

1. **Defense in Depth:** Security is enforced at three distinct layers: Next.js Middleware route guards, Server Action input validation, and PostgreSQL Row Level Security (RLS).
2. **Principle of Least Privilege:** Browser code is restricted to the Supabase anon key. Service-role tokens are isolated exclusively to server administrative modules.
3. **No Direct Client Authorization:** The browser never decides whether a user has permission to read or mutate a claim. All authorization decisions are verified against `auth.uid()` in Postgres.
4. **PII Masking by Default:** Universal Account Numbers (UAN) and Bank Account numbers display only the trailing 4 digits. Full Aadhaar numbers are never accepted or stored.
5. **Private Document Storage:** Document uploads are directed to a private Supabase Storage bucket (`citizen-documents`) with signed URLs valid for 300 seconds.

---

## 2. Row Level Security (RLS) Policy Matrix

| Database Entity | Anonymous Access | Authenticated Citizen | Service Role (Backend) |
| :--- | :--- | :--- | :--- |
| `profiles` | Denied | `auth.uid() = auth_user_id` (SELECT, UPDATE non-sensitive) | Full Access |
| `claims` | Denied | `profile_id IN (SELECT id FROM profiles WHERE auth_user_id = auth.uid())` (SELECT) | Full Access |
| `claim_events` | Denied | Claim ownership verified via profile join (SELECT) | Append-Only |
| `remark_codes` | `active = true` (SELECT) | `active = true` (SELECT) | Full Access |
| `resubmissions`| Denied | Own profile only (SELECT, INSERT, UPDATE draft) | Full Access |
| `documents` | Denied | Own profile only (SELECT, INSERT) | Full Access |
| `support_cases`| Denied | Own profile only (SELECT, INSERT) | Full Access |
| `audit_events` | Denied | Denied direct read; Append-only insert | Append-Only |

---

## 3. Session Management & Token Refresh

- Sessions are managed via secure, HttpOnly, SameSite=Lax cookies using `@supabase/ssr`.
- Next.js `middleware.ts` intercepts all requests to `/dashboard` and `/claims/*`, ensuring tokens are refreshed and invalid sessions are redirected to `/login`.
