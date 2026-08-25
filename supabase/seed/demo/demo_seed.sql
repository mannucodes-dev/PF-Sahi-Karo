-- ==============================================================================
-- Demo Seed: supabase/seed/demo/demo_seed.sql
-- Description: Test and evaluator seed data with anonymized reference values
-- WARNING: NEVER run this against a production database.
-- ==============================================================================

-- 1. Insert Enriched Remark Codes (English and Hindi)
INSERT INTO remark_codes (
  code, locale, official_text, plain_text, fix_steps, citizen_actions, authority_actions, estimated_days, source_url, source_reference, reviewed_at, reviewed_by, active
) VALUES
(
  'NAME_MISMATCH',
  'en',
  'Claim Rejected - Name as per Aadhaar does not match EPFO records. Refer Circular No. HO/Compliance/2023.',
  'Your name does not match character-for-character between your Aadhaar record and your EPFO member profile. EPFO systems require an exact letter, spacing, and initial match.',
  ARRAY[
    'Verify your name spelling on your physical Aadhaar card or e-Aadhaar PDF.',
    'Log in to the EPFO Member Sewa portal and navigate to Manage → Modify Basic Details.',
    'Submit an online correction request matching your Aadhaar details exactly.',
    'Request your current or past employer to approve the modification digitally in their employer portal.',
    'Once verified (usually 2–3 working days), resubmit your PF claim.'
  ],
  ARRAY[
    'Check Aadhaar spelling and initials',
    'Submit online profile correction on Member Sewa portal',
    'Follow up with employer HR for digital approval'
  ],
  ARRAY[
    'Employer must approve digital signature on Unified Portal',
    'EPFO Field Office validates UIDAI Aadhaar registry'
  ],
  '3-5 working days',
  'https://www.epfindia.gov.in/site_en/Circulars.php',
  'EPFO Circular No. WSU/2022/Joint_Declaration/3354',
  NOW(),
  'PF Sahi Karo Compliance Review Board',
  true
),
(
  'NAME_MISMATCH',
  'hi',
  'दावा अस्वीकृत - आधार के अनुसार नाम ईपीएफओ रिकॉर्ड से मेल नहीं खाता है। परिपत्र संख्या HO/Compliance/2023 देखें।',
  'आपके आधार कार्ड और ईपीएफओ सदस्य प्रोफाइल में नाम की वर्तनी (स्पेलिंग) में अंतर है। ईपीएफओ स्वचालित प्रणाली को अक्षरों और स्पेस का सटीक मिलान आवश्यक है।',
  ARRAY[
    'अपने आधार कार्ड पर लिखे नाम की वर्तनी की जांच करें।',
    'ईपीएफओ मेंबर सेवा पोर्टल पर लॉगिन करके Manage → Modify Basic Details पर जाएं।',
    'आधार के अनुसार सही नाम दर्ज करके संशोधन अनुरोध सबमिट करें।',
    'अपने नियोक्ता (कंपनी) से अनुरोध को डिजिटल हस्ताक्षर द्वारा अनुमोदित करने के लिए कहें।',
    'विवरण अपडेट होने के बाद दावा पुनः सबमिट करें।'
  ],
  ARRAY[
    'आधार कार्ड में नाम व वर्तनी जांचें',
    'मेंबर पोर्टल पर ऑनलाइन सुधार अनुरोध सबमिट करें',
    'कंपनी एचआर से डिजिटल मंजूरी प्राप्त करें'
  ],
  ARRAY[
    'नियोक्ता द्वारा यूनिफाइड पोर्टल पर डिजिटल हस्ताक्षर अनुमोदन',
    'ईपीएफओ क्षेत्रीय कार्यालय द्वारा सत्यापन'
  ],
  '3-5 कार्य दिवस',
  'https://www.epfindia.gov.in/site_hi/Circulars.php',
  'ईपीएफओ परिपत्र सं. WSU/2022/Joint_Declaration/3354',
  NOW(),
  'पीएफ सही करो अनुपालन समीक्षा बोर्ड',
  true
),
(
  'KYC_INCOMPLETE',
  'en',
  'Claim Returned - KYC not verified. Digital signature pending from employer.',
  'Your KYC documents (Aadhaar, PAN, or Bank Details) have been uploaded but are awaiting digital approval from your employer on the EPFO employer portal.',
  ARRAY[
    'Log in to Member Sewa and check Manage → KYC to verify which document is pending approval.',
    'Contact your former or current employer HR/PF team and provide your UAN.',
    'Request them to approve your KYC using their Digital Signature Certificate (DSC).',
    'Resubmit your claim once the status shows "Approved by Employer".'
  ],
  ARRAY[
    'Check pending document on Member Sewa KYC tab',
    'Contact employer HR/PF desk for DSC approval'
  ],
  ARRAY[
    'Employer signs KYC using Class 3 DSC token',
    'EPFO database updates verification flag'
  ],
  '2-4 working days',
  'https://www.epfindia.gov.in/site_en/KYC_Guidelines.php',
  'EPFO Master Circular on KYC Verification 2024',
  NOW(),
  'PF Sahi Karo Compliance Review Board',
  true
),
(
  'BANK_MISMATCH',
  'en',
  'Claim Returned - NEFT failed. Bank account details invalid or account inactive.',
  'The bank account registered with your UAN could not receive the electronic NEFT fund transfer because the account is inactive, frozen, or has an invalid IFSC code.',
  ARRAY[
    'Confirm with your bank that your savings account is active and KYC-compliant.',
    'Verify that your IFSC code has not changed due to recent bank mergers.',
    'Upload a cancelled cheque or bank passbook copy in Member Sewa → Manage → KYC.',
    'Wait for employer digital approval and EPFO bank validation before resubmitting.'
  ],
  ARRAY[
    'Check bank account status with branch',
    'Upload fresh bank details with correct IFSC in portal'
  ],
  ARRAY[
    'Employer validates bank KYC',
    'NPCI/EPFO automated penny-drop verification'
  ],
  '3-7 working days',
  'https://www.epfindia.gov.in/site_en/Bank_Verification.php',
  'EPFO Circular on Bank Account Validation via NPCI',
  NOW(),
  'PF Sahi Karo Compliance Review Board',
  true
),
(
  'SERVICE_PERIOD',
  'en',
  'Claim Rejected - Minimum service period not met as per records.',
  'EPFO records indicate an incomplete service duration, usually because a previous employer failed to mark your Date of Exit (DOE) on the portal.',
  ARRAY[
    'Check your service history under View → Service History on the member portal.',
    'If Date of Exit is missing for any past establishment, update it via Manage → Mark Exit.',
    'If exit date cannot be marked online, contact your previous employer to update it.',
    'Resubmit the claim once your total continuous service is updated.'
  ],
  ARRAY[
    'Inspect Service History on portal',
    'Mark Date of Exit online if eligible',
    'Request past employer to update EPFO records'
  ],
  ARRAY[
    'Employer updates Date of Exit on EPFO Employer Portal'
  ],
  '5-10 working days',
  'https://www.epfindia.gov.in/site_en/Service_Rules.php',
  'EPFO Circular on Online Date of Exit Marking',
  NOW(),
  'PF Sahi Karo Compliance Review Board',
  true
),
(
  'UAN_AADHAAR_UNLINKED',
  'en',
  'Claim Rejected - UAN not seeded with Aadhaar.',
  'Your Universal Account Number (UAN) is not linked to your 12-digit Aadhaar number. Aadhaar seeding is mandatory under Section 142 of the Code on Social Security.',
  ARRAY[
    'Visit the EPFO Unified Member Portal.',
    'Navigate to Manage → Link UAN-Aadhaar.',
    'Enter your Aadhaar number and verify using the OTP sent to your UIDAI registered mobile number.',
    'Resubmit the claim after the confirmation SMS is received.'
  ],
  ARRAY[
    'Complete online Aadhaar OTP linkage on Member Sewa'
  ],
  ARRAY[
    'UIDAI authentication gateway verification'
  ],
  'Instant to 24 hours',
  'https://www.epfindia.gov.in/site_en/Aadhaar_Seeding.php',
  'EPFO Circular No. BPS/2021/AadhaarSeeding/102',
  NOW(),
  'PF Sahi Karo Compliance Review Board',
  true
)
ON CONFLICT (code, locale) DO UPDATE SET
  official_text = EXCLUDED.official_text,
  plain_text = EXCLUDED.plain_text,
  fix_steps = EXCLUDED.fix_steps,
  citizen_actions = EXCLUDED.citizen_actions,
  authority_actions = EXCLUDED.authority_actions,
  estimated_days = EXCLUDED.estimated_days,
  source_url = EXCLUDED.source_url,
  source_reference = EXCLUDED.source_reference,
  reviewed_at = EXCLUDED.reviewed_at,
  reviewed_by = EXCLUDED.reviewed_by,
  active = EXCLUDED.active;
