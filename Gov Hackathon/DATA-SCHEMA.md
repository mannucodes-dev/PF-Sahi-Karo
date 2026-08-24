# Data Schema & Seed Content — PF Sahi Karo

This is the actual content of the demo. The decoder logic should be a
genuine lookup system (remark code → explanation), not a single hardcoded
if-statement — that's what makes it read as "this works at scale" rather
than a one-off trick, per the hackathon's own guidance.

## Table: users (mock)
| column | type | note |
|---|---|---|
| id | uuid | Supabase auth user id |
| full_name | text | e.g. "Suresh Kumar" |
| uan | text | fake, 12-digit pattern e.g. "100234567890" |
| pf_balance | numeric | e.g. 184320 |
| bank_account_last4 | text | e.g. "4821" |

## Table: claims (mock)
| column | type | note |
|---|---|---|
| id | uuid | |
| user_id | uuid | FK to users |
| claim_type | text | "Final PF Settlement" / "PF Transfer" / "Form 10C - Pension Withdrawal" |
| amount | numeric | |
| status | text | "approved" / "pending" / "rejected" |
| submitted_date | date | |
| settled_date | date | nullable, only for approved |
| remark_code | text | nullable, FK-ish to remark_codes.code, only for rejected |

## Table: remark_codes (the decoder lookup)
| column | type | note |
|---|---|---|
| code | text | primary key |
| raw_remark | text | the cryptic EPFO-style text shown in "What EPFO said" |
| plain_explanation | text | shown in "What this actually means" |
| fix_steps | text[] | shown in "How to fix it," 2-4 steps |

## Seed data — remark_codes (build all 5, even though only 1 is wired to
the primary demo claim — this range is what sells "this works at scale")

**NAME_MISMATCH**
- raw_remark: `"Claim Rejected - Name as per Aadhaar does not match EPFO records. Refer Circular No. HO/Compliance/2023."`
- plain_explanation: `"Your name doesn't match exactly between your Aadhaar and your EPFO records — even a small spelling difference (like 'Mohd' vs 'Mohammad') is enough to trigger this. EPFO's system checks for an exact character match, not just a close one."`
- fix_steps:
  1. `"Check your name exactly as it appears on your Aadhaar card."`
  2. `"Compare it to the name on your EPFO UAN profile (Member Sewa portal, under 'Manage' → 'Modify Basic Details')."`
  3. `"Update whichever one is wrong to match the other exactly, including spacing and initials."`
  4. `"Resubmit your claim once the update is confirmed — this usually takes 2-3 working days to reflect."`

**KYC_INCOMPLETE**
- raw_remark: `"Claim Returned - KYC not verified. Digital signature pending from employer."`
- plain_explanation: `"Your KYC documents (Aadhaar, PAN, or bank details) haven't been digitally verified and approved by your employer yet — EPFO won't process a claim until that verification is complete on their end, not yours."`
- fix_steps:
  1. `"Log in to the Member Sewa portal and check your KYC status under 'Manage' → 'KYC.'"`
  2. `"If it shows 'Pending Employer Approval,' contact your (former) employer's HR/PF desk directly — this step can't be done from your side."`
  3. `"Once your employer approves it digitally, resubmit your claim."`

**BANK_MISMATCH**
- raw_remark: `"Claim Returned - NEFT failed. Bank account details invalid or account inactive."`
- plain_explanation: `"The bank account linked to your claim couldn't accept the transfer — usually because the account number or IFSC code doesn't match your KYC-verified bank record, or the account has gone inactive."`
- fix_steps:
  1. `"Verify your bank account is active and matches the details on your EPFO KYC exactly."`
  2. `"If details are outdated, update your bank details under 'Manage' → 'KYC' and wait for employer approval."`
  3. `"Resubmit the claim once your bank details show as verified."`

**SERVICE_PERIOD**
- raw_remark: `"Claim Rejected - Minimum service period not met as per records."`
- plain_explanation: `"EPFO's records show a shorter employment duration than what's needed for this type of claim — often because a previous employer didn't update your exit date, making your service period look shorter than it actually was."`
- fix_steps:
  1. `"Check your Service History under 'View' → 'Service History' on the Member Sewa portal."`
  2. `"If a previous employer's exit date is missing or wrong, request them to update it via the EPFO employer portal."`
  3. `"Once corrected, your eligibility recalculates automatically — resubmit after that reflects."`

**UAN_AADHAAR_UNLINKED**
- raw_remark: `"Claim Rejected - UAN not seeded with Aadhaar."`
- plain_explanation: `"Your UAN (Universal Account Number) isn't linked to your Aadhaar yet. This linkage is mandatory for any online claim — without it, the system can't verify your identity to release funds."`
- fix_steps:
  1. `"Go to the UAN Member Portal → 'Manage' → 'Link UAN-Aadhaar.'"`
  2. `"Complete the OTP-based Aadhaar verification."`
  3. `"Resubmit your claim once the link is confirmed (usually instant to a few hours)."`

## Seed data — claims (the 3 shown on the dashboard)

1. **Approved** — Suresh Kumar, claim_type: "PF Transfer", amount: 42,500,
   submitted_date: ~40 days ago, settled_date: ~25 days ago.
2. **Pending** — same user, claim_type: "Final PF Settlement", amount:
   1,84,320, submitted_date: ~10 days ago, no remark_code.
3. **Rejected** — same user, claim_type: "Final PF Settlement", amount:
   1,84,320 (a second, corrected attempt — or a separate claim, your
   call), submitted_date: ~20 days ago, remark_code: `NAME_MISMATCH`.

Keep the rejected claim wired to `NAME_MISMATCH` for the primary demo
path — it's the most universally relatable reason (per research: often
just a single character difference) and makes for the cleanest 2-minute
demo narrative. The other 4 remark codes exist in the lookup table for
depth/credibility even if not directly shown on the seeded dashboard —
mention in the demo video, if there's time, that the system handles
multiple rejection types, not just one.
