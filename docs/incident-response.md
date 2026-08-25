# PF Sahi Karo — Incident Response & Disaster Recovery Plan

**Version:** 1.0.0  
**Classification:** Operational Runbook

---

## 1. Incident Severity Definitions

- **SEV-1 (Critical Outage / Data Incident):** Platform down, database unresponsive, or suspected PII breach. SLA response: < 15 minutes.
- **SEV-2 (Degraded Performance):** Claim resubmission failures or external EPFO sync delays. SLA response: < 1 hour.
- **SEV-3 (Minor Defect):** Typographical error in remark decoder or UI styling glitch. SLA response: < 24 hours.

---

## 2. Disaster Recovery Protocol

1. **Database Restoration:** Supabase Point-in-Time Recovery (PITR) enabled.
2. **Rollback Procedure:** Vercel Instant Rollback to last validated production deployment tag.
3. **Citizen Notification:** In the event of scheduled or emergency maintenance, display the global service status banner via `/service-status`.
