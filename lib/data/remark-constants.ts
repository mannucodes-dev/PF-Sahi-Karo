import { Database } from "../supabase/types";

export type RemarkCodeRow = Database["public"]["Tables"]["remark_codes"]["Row"];

export const BUILTIN_REMARK_CODES: Record<string, Record<"en" | "hi", RemarkCodeRow>> = {
  NAME_MISMATCH: {
    en: {
      code: "NAME_MISMATCH",
      locale: "en",
      official_text:
        "Claim Rejected - Name as per Aadhaar does not match EPFO records. Refer Circular No. HO/Compliance/2023.",
      plain_text:
        "Your name does not match character-for-character between your Aadhaar record and your EPFO member profile. EPFO systems require an exact letter, spacing, and initial match.",
      fix_steps: [
        "Verify your name spelling on your physical Aadhaar card or e-Aadhaar PDF.",
        "Log in to the EPFO Member Sewa portal and navigate to Manage → Modify Basic Details.",
        "Submit an online correction request matching your Aadhaar details exactly.",
        "Request your current or past employer to approve the modification digitally in their employer portal.",
        "Once verified (usually 2–3 working days), resubmit your PF claim.",
      ],
      citizen_actions: [
        "Check Aadhaar spelling and initials",
        "Submit online profile correction on Member Sewa portal",
        "Follow up with employer HR for digital approval",
      ],
      authority_actions: [
        "Employer must approve digital signature on Unified Portal",
        "EPFO Field Office validates UIDAI Aadhaar registry",
      ],
      estimated_days: "3–5 working days",
      source_url: "https://www.epfindia.gov.in/site_en/Circulars.php",
      source_reference: "EPFO Circular No. WSU/2022/Joint_Declaration/3354",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "PF Sahi Karo Compliance Review Board",
      active: true,
    },
    hi: {
      code: "NAME_MISMATCH",
      locale: "hi",
      official_text:
        "दावा अस्वीकृत - आधार के अनुसार नाम ईपीएफओ रिकॉर्ड से मेल नहीं खाता है। परिपत्र संख्या HO/Compliance/2023 देखें।",
      plain_text:
        "आपके आधार कार्ड और ईपीएफओ सदस्य प्रोफाइल में नाम की वर्तनी (स्पेलिंग) में अंतर है। ईपीएफओ स्वचालित प्रणाली को अक्षरों और स्पेस का सटीक मिलान आवश्यक है।",
      fix_steps: [
        "अपने आधार कार्ड पर लिखे नाम की वर्तनी की जांच करें।",
        "ईपीएफओ मेंबर सेवा पोर्टल पर लॉगिन करके Manage → Modify Basic Details पर जाएं।",
        "आधार के अनुसार सही नाम दर्ज करके संशोधन अनुरोध सबमिट करें।",
        "अपने नियोक्ता (कंपनी) से अनुरोध को डिजिटल हस्ताक्षर द्वारा अनुमोदित करने के लिए कहें।",
        "विवरण अपडेट होने के बाद दावा पुनः सबमिट करें।",
      ],
      citizen_actions: [
        "आधार कार्ड में नाम व वर्तनी जांचें",
        "मेंबर पोर्टल पर ऑनलाइन सुधार अनुरोध सबमिट करें",
        "कंपनी एचआर से डिजिटल मंजूरी प्राप्त करें",
      ],
      authority_actions: [
        "नियोक्ता द्वारा यूनिफाइड पोर्टल पर डिजिटल हस्ताक्षर अनुमोदन",
        "ईपीएफओ क्षेत्रीय कार्यालय द्वारा सत्यापन",
      ],
      estimated_days: "3–5 कार्य दिवस",
      source_url: "https://www.epfindia.gov.in/site_hi/Circulars.php",
      source_reference: "ईपीएफओ परिपत्र सं. WSU/2022/Joint_Declaration/3354",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "पीएफ सही करो अनुपालन समीक्षा बोर्ड",
      active: true,
    },
  },
  KYC_INCOMPLETE: {
    en: {
      code: "KYC_INCOMPLETE",
      locale: "en",
      official_text:
        "Claim Returned - KYC not verified. Digital signature pending from employer.",
      plain_text:
        "Your KYC documents (Aadhaar, PAN, or Bank Details) have been uploaded but are awaiting digital approval from your employer on the EPFO employer portal.",
      fix_steps: [
        "Log in to Member Sewa and check Manage → KYC to verify which document is pending approval.",
        "Contact your former or current employer HR/PF team and provide your UAN.",
        "Request them to approve your KYC using their Digital Signature Certificate (DSC).",
        "Resubmit your claim once the status shows 'Approved by Employer'.",
      ],
      citizen_actions: [
        "Check pending document on Member Sewa KYC tab",
        "Contact employer HR/PF desk for DSC approval",
      ],
      authority_actions: [
        "Employer signs KYC using Class 3 DSC token",
        "EPFO database updates verification flag",
      ],
      estimated_days: "2–4 working days",
      source_url: "https://www.epfindia.gov.in/site_en/KYC_Guidelines.php",
      source_reference: "EPFO Master Circular on KYC Verification 2024",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "PF Sahi Karo Compliance Review Board",
      active: true,
    },
    hi: {
      code: "KYC_INCOMPLETE",
      locale: "hi",
      official_text:
        "दावा लौटाया गया - केवाईसी सत्यापित नहीं है। नियोक्ता से डिजिटल हस्ताक्षर लंबित हैं।",
      plain_text:
        "आपके केवाईसी दस्तावेज़ (आधार, पैन या बैंक विवरण) अपलोड तो हैं लेकिन नियोक्ता द्वारा डिजिटल सत्यापन अभी लंबित है।",
      fix_steps: [
        "मेंबर सेवा पोर्टल पर लॉगिन करें और Manage → KYC पर स्थिति जांचें।",
        "कंपनी के एचआर या पीएफ विभाग से संपर्क करें।",
        "नियोक्ता को डिजिटल हस्ताक्षर द्वारा केवाईसी स्वीकृत करने का अनुरोध करें।",
        "स्वीकृति के बाद दावा पुनः सबमिट करें।",
      ],
      citizen_actions: ["केवाईसी स्थिति जांचें", "नियोक्ता से संपर्क करें"],
      authority_actions: ["नियोक्ता द्वारा डिजिटल हस्ताक्षर से स्वीकृति"],
      estimated_days: "2–4 कार्य दिवस",
      source_url: "https://www.epfindia.gov.in/site_hi/KYC_Guidelines.php",
      source_reference: "ईपीएफओ केवाईसी परिपत्र 2024",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "पीएफ सही करो अनुपालन समीक्षा बोर्ड",
      active: true,
    },
  },
  BANK_MISMATCH: {
    en: {
      code: "BANK_MISMATCH",
      locale: "en",
      official_text:
        "Claim Returned - NEFT failed. Bank account details invalid or account inactive.",
      plain_text:
        "The bank account registered with your UAN could not receive the electronic NEFT fund transfer because the account is inactive, frozen, or has an invalid IFSC code.",
      fix_steps: [
        "Confirm with your bank that your savings account is active and KYC-compliant.",
        "Verify that your IFSC code has not changed due to recent bank mergers.",
        "Upload a cancelled cheque or bank passbook copy in Member Sewa → Manage → KYC.",
        "Wait for employer digital approval and EPFO bank validation before resubmitting.",
      ],
      citizen_actions: [
        "Check bank account status with branch",
        "Upload fresh bank details with correct IFSC in portal",
      ],
      authority_actions: [
        "Employer validates bank KYC",
        "NPCI/EPFO automated penny-drop verification",
      ],
      estimated_days: "3–7 working days",
      source_url: "https://www.epfindia.gov.in/site_en/Bank_Verification.php",
      source_reference: "EPFO Circular on Bank Account Validation via NPCI",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "PF Sahi Karo Compliance Review Board",
      active: true,
    },
    hi: {
      code: "BANK_MISMATCH",
      locale: "hi",
      official_text:
        "दावा लौटाया गया - एनईएफटी विफल। बैंक खाता विवरण अमान्य है या खाता निष्क्रिय है।",
      plain_text:
        "आपके यूएएन से जुड़ा बैंक खाता निष्क्रिय है या आईएफएससी कोड में त्रुटि होने के कारण एनईएफटी ट्रांसफर विफल हो गया।",
      fix_steps: [
        "बैंक शाखा से पुष्टि करें कि खाता सक्रिय है।",
        "बैंक विलय के बाद नया आईएफएससी कोड जांचें।",
        "मेंबर पोर्टल पर रद्द चेक (Cancelled Cheque) की प्रति अपलोड करें।",
        "नियोक्ता अनुमोदन के बाद दावा पुनः सबमिट करें।",
      ],
      citizen_actions: ["बैंक खाता सक्रियता जांचें", "पोर्टल पर नया चेक अपलोड करें"],
      authority_actions: ["नियोक्ता और एनपीसीआई सत्यापन"],
      estimated_days: "3–7 कार्य दिवस",
      source_url: "https://www.epfindia.gov.in/site_hi/Bank_Verification.php",
      source_reference: "ईपीएफओ बैंक सत्यापन परिपत्र",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "पीएफ सही करो अनुपालन समीक्षा बोर्ड",
      active: true,
    },
  },
  SERVICE_PERIOD: {
    en: {
      code: "SERVICE_PERIOD",
      locale: "en",
      official_text:
        "Claim Rejected - Minimum service period not met as per records.",
      plain_text:
        "EPFO records indicate an incomplete service duration, usually because a previous employer failed to mark your Date of Exit (DOE) on the portal.",
      fix_steps: [
        "Check your service history under View → Service History on the member portal.",
        "If Date of Exit is missing for any past establishment, update it via Manage → Mark Exit.",
        "If exit date cannot be marked online, contact your previous employer to update it.",
        "Resubmit the claim once your total continuous service is updated.",
      ],
      citizen_actions: [
        "Inspect Service History on portal",
        "Mark Date of Exit online if eligible",
        "Request past employer to update EPFO records",
      ],
      authority_actions: [
        "Employer updates Date of Exit on EPFO Employer Portal",
      ],
      estimated_days: "5–10 working days",
      source_url: "https://www.epfindia.gov.in/site_en/Service_Rules.php",
      source_reference: "EPFO Circular on Online Date of Exit Marking",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "PF Sahi Karo Compliance Review Board",
      active: true,
    },
    hi: {
      code: "SERVICE_PERIOD",
      locale: "hi",
      official_text:
        "दावा अस्वीकृत - रिकॉर्ड के अनुसार न्यूनतम सेवा अवधि पूर्ण नहीं है।",
      plain_text:
        "ईपीएफओ रिकॉर्ड में सेवा अवधि पूरी नहीं दिख रही है क्योंकि पिछली कंपनी ने पोर्टल पर निकास तिथि (Date of Exit) दर्ज नहीं की है।",
      fix_steps: [
        "मेंबर पोर्टल पर View → Service History में सेवा इतिहास जांचें।",
        "Manage → Mark Exit पर जाकर निकास तिथि दर्ज करें।",
        "यदि ऑनलाइन संभव न हो तो पूर्व कंपनी से अपडेट करने का अनुरोध करें।",
        "सेवा अवधि अपडेट होने के बाद दावा पुनः सबमिट करें।",
      ],
      citizen_actions: ["सेवा इतिहास जांचें", "ऑनलाइन निकास तिथि दर्ज करें"],
      authority_actions: ["नियोक्ता द्वारा निकास तिथि अद्यतन"],
      estimated_days: "5–10 कार्य दिवस",
      source_url: "https://www.epfindia.gov.in/site_hi/Service_Rules.php",
      source_reference: "ईपीएफओ निकास तिथि परिपत्र",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "पीएफ सही करो अनुपालन समीक्षा बोर्ड",
      active: true,
    },
  },
  UAN_AADHAAR_UNLINKED: {
    en: {
      code: "UAN_AADHAAR_UNLINKED",
      locale: "en",
      official_text: "Claim Rejected - UAN not seeded with Aadhaar.",
      plain_text:
        "Your Universal Account Number (UAN) is not linked to your 12-digit Aadhaar number. Aadhaar seeding is mandatory under Section 142 of the Code on Social Security.",
      fix_steps: [
        "Visit the EPFO Unified Member Portal.",
        "Navigate to Manage → Link UAN-Aadhaar.",
        "Enter your Aadhaar number and verify using the OTP sent to your UIDAI registered mobile number.",
        "Resubmit the claim after the confirmation SMS is received.",
      ],
      citizen_actions: ["Complete online Aadhaar OTP linkage on Member Sewa"],
      authority_actions: ["UIDAI authentication gateway verification"],
      estimated_days: "Instant to 24 hours",
      source_url: "https://www.epfindia.gov.in/site_en/Aadhaar_Seeding.php",
      source_reference: "EPFO Circular No. BPS/2021/AadhaarSeeding/102",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "PF Sahi Karo Compliance Review Board",
      active: true,
    },
    hi: {
      code: "UAN_AADHAAR_UNLINKED",
      locale: "hi",
      official_text: "दावा अस्वीकृत - यूएएन आधार से लिंक नहीं है।",
      plain_text:
        "आपका यूनिवर्सल अकाउंट नंबर (UAN) आधार से लिंक नहीं है। सामाजिक सुरक्षा संहिता की धारा 142 के तहत आधार सीडिंग अनिवार्य है।",
      fix_steps: [
        "ईपीएफओ यूनिफाइड पोर्टल पर जाएं।",
        "Manage → Link UAN-Aadhaar पर क्लिक करें।",
        "आधार संख्या दर्ज करें और आधार से जुड़े मोबाइल पर आए ओटीपी से सत्यापन करें।",
        "पुष्टि एसएमएस मिलने के बाद दावा पुनः सबमिट करें।",
      ],
      citizen_actions: ["पोर्टल पर आधार ओटीपी लिंकिंग पूरी करें"],
      authority_actions: ["यूआईडीएआई प्रमाणीकरण गेटवे सत्यापन"],
      estimated_days: "तत्काल से 24 घंटे",
      source_url: "https://www.epfindia.gov.in/site_hi/Aadhaar_Seeding.php",
      source_reference: "ईपीएफओ आधार सीडिंग परिपत्र",
      reviewed_at: "2026-08-01T00:00:00Z",
      reviewed_by: "पीएफ सही करो अनुपालन समीक्षा बोर्ड",
      active: true,
    },
  },
};

export function getAllBuiltinRemarkCodes(locale: "en" | "hi" = "en"): RemarkCodeRow[] {
  return Object.values(BUILTIN_REMARK_CODES).map((item) => item[locale] || item.en);
}
