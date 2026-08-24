-- Seed Data for PF Sahi Karo
-- Matches DATA-SCHEMA.md exactly

-- Clear existing data
TRUNCATE claims, remark_codes, users CASCADE;

-- 1. Seed Remark Codes (All 5 codes)
INSERT INTO remark_codes (code, raw_remark, plain_explanation, fix_steps) VALUES
(
  'NAME_MISMATCH',
  'Claim Rejected - Name as per Aadhaar does not match EPFO records. Refer Circular No. HO/Compliance/2023.',
  'Your name doesn''t match exactly between your Aadhaar and your EPFO records — even a small spelling difference (like ''Mohd'' vs ''Mohammad'') is enough to trigger this. EPFO''s system checks for an exact character match, not just a close one.',
  ARRAY[
    'Check your name exactly as it appears on your Aadhaar card.',
    'Compare it to the name on your EPFO UAN profile (Member Sewa portal, under ''Manage'' → ''Modify Basic Details'').',
    'Update whichever one is wrong to match the other exactly, including spacing and initials.',
    'Resubmit your claim once the update is confirmed — this usually takes 2-3 working days to reflect.'
  ]
),
(
  'KYC_INCOMPLETE',
  'Claim Returned - KYC not verified. Digital signature pending from employer.',
  'Your KYC documents (Aadhaar, PAN, or bank details) haven''t been digitally verified and approved by your employer yet — EPFO won''t process a claim until that verification is complete on their end, not yours.',
  ARRAY[
    'Log in to the Member Sewa portal and check your KYC status under ''Manage'' → ''KYC.''',
    'If it shows ''Pending Employer Approval,'' contact your (former) employer''s HR/PF desk directly — this step can''t be done from your side.',
    'Once your employer approves it digitally, resubmit your claim.'
  ]
),
(
  'BANK_MISMATCH',
  'Claim Returned - NEFT failed. Bank account details invalid or account inactive.',
  'The bank account linked to your claim couldn''t accept the transfer — usually because the account number or IFSC code doesn''t match your KYC-verified bank record, or the account has gone inactive.',
  ARRAY[
    'Verify your bank account is active and matches the details on your EPFO KYC exactly.',
    'If details are outdated, update your bank details under ''Manage'' → ''KYC'' and wait for employer approval.',
    'Resubmit the claim once your bank details show as verified.'
  ]
),
(
  'SERVICE_PERIOD',
  'Claim Rejected - Minimum service period not met as per records.',
  'EPFO''s records show a shorter employment duration than what''s needed for this type of claim — often because a previous employer didn''t update your exit date, making your service period look shorter than it actually was.',
  ARRAY[
    'Check your Service History under ''View'' → ''Service History'' on the Member Sewa portal.',
    'If a previous employer''s exit date is missing or wrong, request them to update it via the EPFO employer portal.',
    'Once corrected, your eligibility recalculates automatically — resubmit after that reflects.'
  ]
),
(
  'UAN_AADHAAR_UNLINKED',
  'Claim Rejected - UAN not seeded with Aadhaar.',
  'Your UAN (Universal Account Number) isn''t linked to your Aadhaar yet. This linkage is mandatory for any online claim — without it, the system can''t verify your identity to release funds.',
  ARRAY[
    'Go to the UAN Member Portal → ''Manage'' → ''Link UAN-Aadhaar.''',
    'Complete the OTP-based Aadhaar verification.',
    'Resubmit your claim once the link is confirmed (usually instant to a few hours).'
  ]
);

-- 2. Seed Mock User (Suresh Kumar)
INSERT INTO users (id, full_name, uan, pf_balance, bank_account_last4) VALUES
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Suresh Kumar',
  '100234567890',
  184320,
  '4821'
);

-- 3. Seed Claims (3 claims shown on the dashboard)
-- Claim 1: Approved (~40 days ago submitted, ~25 days ago settled)
INSERT INTO claims (id, user_id, claim_type, amount, status, submitted_date, settled_date, remark_code) VALUES
(
  'c1000000-0000-0000-0000-000000000001',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'PF Transfer',
  42500,
  'approved',
  CURRENT_DATE - INTERVAL '40 days',
  CURRENT_DATE - INTERVAL '25 days',
  NULL
);

-- Claim 2: Pending (~10 days ago submitted)
INSERT INTO claims (id, user_id, claim_type, amount, status, submitted_date, settled_date, remark_code) VALUES
(
  'c2000000-0000-0000-0000-000000000002',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Final PF Settlement',
  184320,
  'pending',
  CURRENT_DATE - INTERVAL '10 days',
  NULL,
  NULL
);

-- Claim 3: Rejected (~20 days ago submitted, wired to NAME_MISMATCH)
INSERT INTO claims (id, user_id, claim_type, amount, status, submitted_date, settled_date, remark_code) VALUES
(
  'c3000000-0000-0000-0000-000000000003',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Final PF Settlement',
  184320,
  'rejected',
  CURRENT_DATE - INTERVAL '20 days',
  NULL,
  'NAME_MISMATCH'
);
