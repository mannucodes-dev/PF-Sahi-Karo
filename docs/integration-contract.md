# PF Sahi Karo — Integration Contract & API Specification

**Version:** 1.0.0  
**Protocols:** HTTPS / REST / JSON  
**Authentication:** Bearer Token (Service-to-Service)

---

## 1. EPFO Gateway Sync Endpoint

```http
POST /api/integrations/epfo/resubmit
Content-Type: application/json
Authorization: Bearer <SECURE_GATEWAY_TOKEN>
```

### Request Payload:
```json
{
  "resubmissionId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "claimId": "c3000000-0000-0000-0000-000000000003",
  "maskedUan": "••••••••7890",
  "rectificationType": "NAME_MISMATCH",
  "documentChecksums": [
    "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  ]
}
```

### Response Payload:
```json
{
  "success": true,
  "acknowledgementNumber": "EPFO-RSUB-819204",
  "estimatedReviewDate": "2026-09-10",
  "timestamp": "2026-08-25T19:40:00Z"
}
```

---

## 2. Notification Dispatch Endpoint

```http
POST /api/integrations/notifications/dispatch
Content-Type: application/json
Authorization: Bearer <SECURE_GATEWAY_TOKEN>
```

### Request Payload:
```json
{
  "maskedUan": "••••••••7890",
  "templateId": "CLAIM_RESUBMITTED",
  "templateVariables": {
    "referenceId": "EPFO-RSUB-819204",
    "claimType": "Final PF Settlement"
  }
}
```
