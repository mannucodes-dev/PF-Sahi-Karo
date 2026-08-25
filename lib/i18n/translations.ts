export type Locale = "en" | "hi";

export interface Translations {
  common: {
    brandName: string;
    tagline: string;
    backToDashboard: string;
    signOut: string;
    signIn: string;
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    saveDraft: string;
    submit: string;
    submitting: string;
    success: string;
    officialDisclaimer: string;
    demoNotice: string;
    source: string;
    reviewedOn: string;
    reviewedBy: string;
    actionRequired: string;
    viewDetails: string;
    seeWhy: string;
    claimAmount: string;
    submittedDate: string;
    settledDate: string;
    workingDaysNotice: string;
  };
  glossary: {
    title: string;
    uan: { term: string; explanation: string };
    kyc: { term: string; explanation: string };
    neft: { term: string; explanation: string };
    eps: { term: string; explanation: string };
    epfo: { term: string; explanation: string };
  };
  dashboard: {
    greeting: string;
    memberAccount: string;
    totalBalance: string;
    balanceSubtitle: string;
    claimsTitle: string;
    claimsSubtitle: string;
    claimsCount: string;
    noClaims: string;
    delayedNotice: string;
  };
  status: {
    submitted: string;
    under_review: string;
    pending_information: string;
    approved: string;
    rejected: string;
    correction_started: string;
    resubmission_pending: string;
    resubmitted: string;
    integration_failed: string;
    closed: string;
  };
  decoder: {
    analysisTitle: string;
    analysisSubtitle: string;
    step1Title: string;
    step1Notice: string;
    step2Title: string;
    step2Badge: string;
    step3Title: string;
    citizenCanDo: string;
    authorityMustDo: string;
    readyToResolve: string;
    readySubtitle: string;
    startResubmitBtn: string;
  };
  resubmit: {
    pageTitle: string;
    pageSubtitle: string;
    recapTitle: string;
    checklistTitle: string;
    checklistSubtitle: string;
    confirmPortalCheck: string;
    confirmBankCheck: string;
    uploadTitle: string;
    uploadSubtitle: string;
    uploadInstructions: string;
    reviewTitle: string;
    confirmationTitle: string;
    confirmationSubtitle: string;
    refNo: string;
    expectedTimeline: string;
    timelineText: string;
  };
  nav: {
    home: string;
    about: string;
    privacy: string;
    accessibility: string;
    terms: string;
    help: string;
    serviceStatus: string;
    contact: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    common: {
      brandName: "PF Sahi Karo",
      tagline: "EPFO Claim Rejection Decoder & Assisted Resubmission",
      backToDashboard: "Back to Dashboard",
      signOut: "Sign out",
      signIn: "Sign in",
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      cancel: "Cancel",
      saveDraft: "Save Draft",
      submit: "Submit Correction",
      submitting: "Submitting...",
      success: "Operation Successful",
      officialDisclaimer:
        "PF Sahi Karo is an independent citizen assistance service and does not make EPFO settlement decisions.",
      demoNotice: "Development Demo Mode active — Mock data strictly for evaluation",
      source: "Source Reference",
      reviewedOn: "Last reviewed",
      reviewedBy: "Review Owner",
      actionRequired: "Action required",
      viewDetails: "View details",
      seeWhy: "See why & fix",
      claimAmount: "Claim Amount",
      submittedDate: "Submitted",
      settledDate: "Settled",
      workingDaysNotice: "Timelines refer to standard Indian working days (excluding weekends & gazetted holidays).",
    },
    glossary: {
      title: "Key EPFO Terms Explained",
      uan: {
        term: "UAN (Universal Account Number)",
        explanation: "A permanent 12-digit identification number assigned to every EPF member that links multiple Provident Fund accounts.",
      },
      kyc: {
        term: "KYC (Know Your Customer)",
        explanation: "Digital identity verification linking your Aadhaar, PAN card, and verified Bank Account to your UAN profile.",
      },
      neft: {
        term: "NEFT (Electronic Fund Transfer)",
        explanation: "National Electronic Funds Transfer system used by EPFO field offices to directly credit settled claim funds into your verified bank account.",
      },
      eps: {
        term: "EPS (Employees' Pension Scheme)",
        explanation: "The pension component of your monthly PF contribution (8.33% of employer share), claimable via Form 10C or pension scheme certificate.",
      },
      epfo: {
        term: "EPFO (Employees' Provident Fund Organisation)",
        explanation: "The official statutory body under the Ministry of Labour and Employment, Government of India, managing provident funds and pensions.",
      },
    },
    dashboard: {
      greeting: "Namaste",
      memberAccount: "EPFO Member Profile",
      totalBalance: "Total PF Balance",
      balanceSubtitle: "Synchronized with EPFO passbook records",
      claimsTitle: "Your Claims History",
      claimsSubtitle: "Track previous and active claim requests submitted to EPFO",
      claimsCount: "Claims on record",
      noClaims: "No claims found for this profile.",
      delayedNotice: "EPFO portal records may reflect updates with a 24-48 hour delay.",
    },
    status: {
      submitted: "Submitted",
      under_review: "Under Review",
      pending_information: "Pending Info",
      approved: "Settled",
      rejected: "Rejected",
      correction_started: "Correction Started",
      resubmission_pending: "Resubmission Pending",
      resubmitted: "Resubmitted",
      integration_failed: "Processing Error",
      closed: "Closed",
    },
    decoder: {
      analysisTitle: "EPFO Rejection Analysis & Resolution Path",
      analysisSubtitle: "Official rejection notice decoded into plain language with verified action steps",
      step1Title: "1. Official EPFO Portal Remark",
      step1Notice: "Sent to member portal without explanation or clear next steps.",
      step2Title: "2. Guidance Based on This Rejection Remark",
      step2Badge: "Plain Language Guidance",
      step3Title: "3. Step-by-Step Resolution Path",
      citizenCanDo: "What you can do right now:",
      authorityMustDo: "What employer or EPFO must complete:",
      readyToResolve: "Ready to resolve this claim?",
      readySubtitle: "Follow our guided resubmission workflow to prepare a compliant resubmission.",
      startResubmitBtn: "Start Guided Resubmission",
    },
    resubmit: {
      pageTitle: "Guided Claim Resubmission",
      pageSubtitle: "Verify your rectified records before resubmitting to ensure smooth EPFO clearance",
      recapTitle: "Recap: Rectification Requirement",
      checklistTitle: "Correction Checklist & Verification",
      checklistSubtitle: "Confirm required adjustments have been executed before submission",
      confirmPortalCheck: "I have verified and updated my profile details on the EPFO Member Sewa portal according to the guidance steps.",
      confirmBankCheck: "I confirm that the bank account ending in my verified last 4 digits is active, seeded, and linked with my UAN.",
      uploadTitle: "Supporting Document Upload",
      uploadSubtitle: "Attach verified supporting document (Aadhaar correction confirmation or Joint Declaration form)",
      uploadInstructions: "Accepted formats: PDF, JPG, PNG up to 5MB",
      reviewTitle: "Review Submission Details",
      confirmationTitle: "Resubmission Dispatched Successfully!",
      confirmationSubtitle: "Your corrected claim details have been recorded for EPFO processing.",
      refNo: "Resubmission Reference No.",
      expectedTimeline: "Expected Field Office Review Timeline",
      timelineText: "Standard field office re-evaluation takes 10–15 working days once employer approval is confirmed.",
    },
    nav: {
      home: "Home",
      about: "About Service",
      privacy: "Privacy Policy",
      accessibility: "Accessibility",
      terms: "Terms of Service",
      help: "Help & FAQ",
      serviceStatus: "Service Status",
      contact: "Contact & Grievance",
    },
  },
  hi: {
    common: {
      brandName: "पीएफ सही करो",
      tagline: "ईपीएफओ दावा अस्वीकृति डिकोडर एवं निर्देशित पुनः सबमिशन",
      backToDashboard: "डैशबोर्ड पर वापस जाएं",
      signOut: "लॉग आउट",
      signIn: "लॉग इन",
      loading: "लोड हो रहा है...",
      error: "एक त्रुटि उत्पन्न हुई",
      retry: "पुनः प्रयास करें",
      cancel: "रद्द करें",
      saveDraft: "ड्राफ्ट सहेजें",
      submit: "सुधार सबमिट करें",
      submitting: "सबमिट हो रहा है...",
      success: "कार्य सफल रहा",
      officialDisclaimer:
        "पीएफ सही करो एक स्वतंत्र नागरिक सहायता सेवा है और यह ईपीएफओ निपटान निर्णय नहीं लेती है।",
      demoNotice: "डेवलपमेंट डेमो मोड सक्रिय है — मूल्यांकन हेतु केवल डमी डेटा",
      source: "स्रोत संदर्भ",
      reviewedOn: "अंतिम समीक्षा",
      reviewedBy: "समीक्षक",
      actionRequired: "कार्रवाई आवश्यक",
      viewDetails: "विवरण देखें",
      seeWhy: "कारण और समाधान देखें",
      claimAmount: "दावा राशि",
      submittedDate: "सबमिट तिथि",
      settledDate: "निपटान तिथि",
      workingDaysNotice: "समयसीमा सामान्य भारतीय कार्य दिवसों (सप्ताहांत और राजपत्रित अवकाश छोड़कर) पर आधारित है।",
    },
    glossary: {
      title: "प्रमुख ईपीएफओ शब्दावली",
      uan: {
        term: "यूएएन (यूनिवर्सल अकाउंट नंबर)",
        explanation: "प्रत्येक ईपीएफ सदस्य को दिया जाने वाला 12-अंकीय स्थायी नंबर जो विभिन्न भविष्य निधि खातों को जोड़ता है।",
      },
      kyc: {
        term: "केवाईसी (नो योर कस्टमर)",
        explanation: "आधार, पैन कार्ड और सत्यापित बैंक खाते को आपके यूएएन प्रोफाइल से जोड़ने वाला डिजिटल पहचान सत्यापन।",
      },
      neft: {
        term: "एनईएफटी (इलेक्ट्रॉनिक फंड ट्रांसफर)",
        explanation: "ईपीएफओ द्वारा स्वीकृत दावा राशि को सीधे आपके बैंक खाते में भेजने की सुरक्षित इलेक्ट्रॉनिक बैंकिंग प्रणाली।",
      },
      eps: {
        term: "ईपीएस (कर्मचारी पेंशन योजना)",
        explanation: "आपके मासिक पीएफ अंशदान का पेंशन भाग जिसे 10 वर्ष से कम सेवा पर फॉर्म 10C द्वारा निकाला जा सकता है।",
      },
      epfo: {
        term: "ईपीएफओ (कर्मचारी भविष्य निधि संगठन)",
        explanation: "श्रम एवं रोजगार मंत्रालय, भारत सरकार के अंतर्गत भविष्य निधि और पेंशन का प्रबंधन करने वाला वैधानिक निकाय।",
      },
    },
    dashboard: {
      greeting: "नमस्ते",
      memberAccount: "ईपीएफओ सदस्य प्रोफाइल",
      totalBalance: "कुल पीएफ शेष",
      balanceSubtitle: "ईपीएफओ पासबुक रिकॉर्ड से सत्यापित",
      claimsTitle: "आपके दावों का इतिहास",
      claimsSubtitle: "ईपीएफओ को सबमिट किए गए पिछले और सक्रिय दावों की स्थिति देखें",
      claimsCount: "दर्ज दावे",
      noClaims: "इस प्रोफाइल के लिए कोई दावा नहीं मिला।",
      delayedNotice: "ईपीएफओ पोर्टल रिकॉर्ड 24-48 घंटों के अंतराल के बाद अपडेट हो सकते हैं।",
    },
    status: {
      submitted: "सबमिट किया गया",
      under_review: "समीक्षाधीन",
      pending_information: "जानकारी लंबित",
      approved: "निपटाया गया",
      rejected: "अस्वीकृत",
      correction_started: "सुधार प्रारंभ",
      resubmission_pending: "पुनः सबमिशन लंबित",
      resubmitted: "पुनः सबमिट किया गया",
      integration_failed: "प्रसंस्करण त्रुटि",
      closed: "बंद",
    },
    decoder: {
      analysisTitle: "ईपीएफओ अस्वीकृति विश्लेषण एवं समाधान मार्ग",
      analysisSubtitle: "आधिकारिक अस्वीकृति टिप्पणी का सरल भाषा में विवरण और सत्यापित समाधान कदम",
      step1Title: "1. आधिकारिक ईपीएफओ पोर्टल टिप्पणी",
      step1Notice: "पोर्टल पर बिना स्पष्टीकरण या अगले कदम के भेजी गई टिप्पणी।",
      step2Title: "2. इस अस्वीकृति टिप्पणी पर आधारित मार्गदर्शन",
      step2Badge: "सरल भाषा मार्गदर्शन",
      step3Title: "3. चरणबद्ध समाधान प्रक्रिया",
      citizenCanDo: "आप अभी क्या कर सकते हैं:",
      authorityMustDo: "नियोक्ता या ईपीएफओ को क्या करना होगा:",
      readyToResolve: "क्या आप इस दावे को हल करने के लिए तैयार हैं?",
      readySubtitle: "नियमों के अनुसार पुनः सबमिशन तैयार करने हेतु हमारी निर्देशित प्रक्रिया का पालन करें।",
      startResubmitBtn: "निर्देशित पुनः सबमिशन शुरू करें",
    },
    resubmit: {
      pageTitle: "निर्देशित दावा पुनः सबमिशन",
      pageSubtitle: "ईपीएफओ में त्वरित स्वीकृति सुनिश्चित करने के लिए सबमिट करने से पहले विवरण सत्यापित करें",
      recapTitle: "संक्षेप: आवश्यक सुधार",
      checklistTitle: "सुधार चेकलिस्ट एवं सत्यापन",
      checklistSubtitle: "सबमिट करने से पहले पुष्टि करें कि आवश्यक सुधार कर लिए गए हैं",
      confirmPortalCheck: "मैंने मार्गदर्शन के अनुसार ईपीएफओ मेंबर सेवा पोर्टल पर अपना प्रोफाइल विवरण जांच और सुधार लिया है।",
      confirmBankCheck: "मैं पुष्टि करता हूँ कि मेरे सत्यापित अंतिम 4 अंकों वाला बैंक खाता सक्रिय है और यूएएन से जुड़ा है।",
      uploadTitle: "सहायक दस्तावेज़ अपलोड करें",
      uploadSubtitle: "सत्यापित सहायक दस्तावेज़ संलग्न करें (आधार सुधार पुष्टि या संयुक्त घोषणा पत्र)",
      uploadInstructions: "स्वीकृत प्रारूप: PDF, JPG, PNG (अधिकतम 5MB)",
      reviewTitle: "सबमिशन विवरण की समीक्षा",
      confirmationTitle: "पुनः सबमिशन सफलतापूर्वक भेजा गया!",
      confirmationSubtitle: "आपके संशोधित दावे का विवरण ईपीएफओ प्रसंस्करण हेतु दर्ज कर लिया गया है।",
      refNo: "पुनः सबमिशन संदर्भ संख्या",
      expectedTimeline: "अपेक्षित समीक्षा समयसीमा",
      timelineText: "नियोक्ता अनुमोदन की पुष्टि के बाद क्षेत्रीय कार्यालय द्वारा सामान्य समीक्षा में 10-15 कार्य दिवस लगते हैं।",
    },
    nav: {
      home: "मुख्य पृष्ठ",
      about: "सेवा के बारे में",
      privacy: "गोपनीयता नीति",
      accessibility: "सुलभता",
      terms: "सेवा की शर्तें",
      help: "सहायता एवं अक्सर पूछे जाने वाले प्रश्न",
      serviceStatus: "सेवा स्थिति",
      contact: "संपर्क एवं शिकायत",
    },
  },
};
