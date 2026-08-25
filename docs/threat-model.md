# PF Sahi Karo — Threat Model (STRIDE Framework)

**Version:** 1.0.0  
**Methodology:** Microsoft STRIDE Threat Modeling

---

## 1. Threat Identification & Mitigation

### 1. Spoofing Identity
- **Threat:** Malicious actor attempts to forge citizen session or hijack UAN account.
- **Mitigation:** Cryptographically signed JWT tokens in HttpOnly session cookies. Next.js middleware token verification. Rate limiting on authentication endpoints.

### 2. Tampering with Data
- **Threat:** Attacker attempts to modify claim settlement amounts or mark claims as approved.
- **Mitigation:** Direct client updates to the `claims` table are prohibited in RLS. Status and amount mutations occur strictly through trusted server actions.

### 3. Repudiation
- **Threat:** Citizen or bad actor denies submitting a resubmission or uploading a document.
- **Mitigation:** Immutable `claim_events` and `audit_events` tables record timestamps, actor IDs, IP hashes, and SHA-256 document checksums.

### 4. Information Disclosure
- **Threat:** Unauthorized access to citizen UANs, bank accounts, or Aadhaar identity data.
- **Mitigation:** Strict PostgreSQL RLS policies. Masking utilities (`maskUan`, `maskBankAccount`, `maskAadhaar`). Automatic redaction in logging pipelines.

### 5. Denial of Service (DoS)
- **Threat:** Malicious actor floods upload endpoints or generates millions of fake resubmissions.
- **Mitigation:** 5MB file size limits enforced server-side. Rate limiting headers. Client and server idempotency keys preventing duplicate operations.

### 6. Elevation of Privilege
- **Threat:** Citizen user accesses administrative routes or other citizens' documents.
- **Mitigation:** Private storage buckets with signed short-lived URLs. Separation of anon key from service-role key.
