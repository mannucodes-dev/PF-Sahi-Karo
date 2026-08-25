# PF Sahi Karo — Performance, Reliability & Capacity Plan

**Version:** 1.0.0  
**Target Environment:** Vercel Edge / Serverless + Supabase Managed PostgreSQL

---

## 1. Traffic Projections & SLOs

| Metric | Target / Standard |
| :--- | :--- |
| **Normal Traffic** | 5,000 Daily Active Citizens (DAC) |
| **Peak Traffic** | 50,000 Concurrent Requests (post EPFO announcement days) |
| **Availability SLA** | 99.9% Uptime (excluding scheduled maintenance) |
| **P95 Page Load Time** | < 1.2 seconds on 4G / mobile devices |
| **P95 API Latency** | < 200 milliseconds |
| **Recovery Time Objective (RTO)** | < 15 minutes |
| **Recovery Point Objective (RPO)** | < 5 minutes (Continuous WAL archiving) |

---

## 2. Optimization Strategy

1. **Static Pre-rendering:** Public marketing and help pages (`/`, `/about`, `/privacy`, `/accessibility`, `/help`) are pre-rendered at build time with edge caching.
2. **Private Dynamic Rendering:** Authenticated dashboards and claims are dynamically generated on server-side nodes with strict no-cache headers for shared CDNs (`Cache-Control: private, no-store`).
3. **Database Indexing:** Indexed on `profile_id`, `auth_user_id`, `claim_id`, `idempotency_key`, and `created_at`.
4. **Low Bandwidth Optimization:** Minimal asset bundles, vector icons (Lucide), responsive Tailwind CSS without heavyweight JavaScript frameworks.
