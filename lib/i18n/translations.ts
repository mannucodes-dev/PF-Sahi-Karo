export type Locale = "en" | "hi" | "mr" | "ta" | "te" | "kn" | "gu" | "bn";

export interface LocaleOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  region: string;
}

export const SUPPORTED_LOCALES: LocaleOption[] = [
  { code: "en", label: "English", nativeLabel: "English", region: "National / All States" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी", region: "North & Central India" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी", region: "Maharashtra" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", region: "Tamil Nadu" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు", region: "Telangana & AP" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ", region: "Karnataka" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી", region: "Gujarat" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা", region: "West Bengal" },
];

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
    judgeDemoBtn: string;
    shareWhatsApp: string;
    copied: string;
  };
  nav: {
    home: string;
    decoder: string;
    taxCalc: string;
    officeFinder: string;
    about: string;
    help: string;
    serviceStatus: string;
    dashboard: string;
    signIn: string;
    judgeDemo: string;
  };
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statsSubscribers: string;
    statsSubscribersLabel: string;
    statsRejection: string;
    statsRejectionLabel: string;
    statsZeroCost: string;
    statsZeroCostLabel: string;
  };
  decoderTool: {
    badge: string;
    title: string;
    subtitle: string;
    selectLabel: string;
    selectPlaceholder: string;
    orSearch: string;
    officialRemarkLabel: string;
    plainMeaningLabel: string;
    citizenMustDo: string;
    employerMustDo: string;
    stepByStepTitle: string;
    timelineLabel: string;
    circularLabel: string;
    copyHrMessage: string;
    copiedNotice: string;
  };
  taxCalc: {
    badge: string;
    title: string;
    subtitle: string;
    amountLabel: string;
    serviceLabel: string;
    panLinkedLabel: string;
    form15gLabel: string;
    yes: string;
    no: string;
    grossAmount: string;
    tdsDeduction: string;
    netCredit: string;
    exemptNotice: string;
    taxTip: string;
  };
  offices: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filterState: string;
    allStates: string;
    addressLabel: string;
    proEmailLabel: string;
    helplineLabel: string;
    epfigmsBtn: string;
    viewCirculars: string;
  };
  steps: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  trust: {
    title: string;
    subtitle: string;
    weProvideTitle: string;
    weProvideItems: string[];
    weDoNotTitle: string;
    weDoNotItems: string[];
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
  claimDetail: {
    summaryTitle: string;
    analysisTitle: string;
    analysisSubtitle: string;
    whatEpfoSaid: string;
    rawNoticeDesc: string;
    whatItMeans: string;
    plainBadge: string;
    citizenCanDo: string;
    authorityMustDo: string;
    stepByStepTitle: string;
    readyToResolve: string;
    readySubtitle: string;
    startResubmitBtn: string;
    shareHrBtn: string;
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
}

const enTranslations: Translations = {
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
        "PF Sahi Karo is an independent citizen civic-tech assistance service and does not make official EPFO settlement decisions.",
      demoNotice: "Hackathon Evaluation Mode Active — Click any demo button to test live flows.",
      source: "Source Reference",
      reviewedOn: "Last reviewed",
      reviewedBy: "Review Owner",
      actionRequired: "Action required",
      viewDetails: "View details",
      seeWhy: "See Why & Fix",
      claimAmount: "Claim Amount",
      submittedDate: "Submitted",
      settledDate: "Settled",
      workingDaysNotice: "Timelines refer to standard Indian working days (excluding weekends & gazetted holidays).",
      judgeDemoBtn: "⚡ Judge Demo (1-Click Login)",
      shareWhatsApp: "Share Action Plan to WhatsApp / HR",
      copied: "Copied to clipboard!",
    },
    nav: {
      home: "Home",
      decoder: "Instant Decoder",
      taxCalc: "TDS Tax Calculator",
      officeFinder: "EPFO Office Directory",
      about: "About Service",
      help: "Rejection Rules & FAQ",
      serviceStatus: "System Status",
      dashboard: "My Claims Dashboard",
      signIn: "Sign In",
      judgeDemo: "⚡ Judge Demo",
    },
    hero: {
      badge: "National Civic Tech Initiative for 29+ Crore EPFO Members",
      headline: "Understand Why Your EPFO Claim Was Rejected — And How to Fix It.",
      subheadline:
        "Over 34% of PF claims get rejected with cryptic one-line system notices. We decode official EPFO remarks into plain English and Hindi, provide verified circular-grounded steps, and empower you to resubmit with confidence.",
      ctaPrimary: "Access My Claims Dashboard",
      ctaSecondary: "Test Instant Rejection Decoder",
      statsSubscribers: "29+ Crore",
      statsSubscribersLabel: "EPF Subscribers in India",
      statsRejection: "34%",
      statsRejectionLabel: "Final Settlement Rejection Rate",
      statsZeroCost: "₹0 Free",
      statsZeroCostLabel: "Public Citizen Service",
    },
    decoderTool: {
      badge: "Public Interactive Tool — No Login Required",
      title: "Instant EPFO Rejection Remark Decoder",
      subtitle: "Select your rejection remark from the dropdown or pick a common category to see the verified resolution plan.",
      selectLabel: "Select Common Rejection Remark:",
      selectPlaceholder: "Choose an official EPFO rejection reason...",
      orSearch: "Or choose by common rejection category:",
      officialRemarkLabel: "1. Official EPFO Portal System Remark (What EPFO Sent)",
      plainMeaningLabel: "2. Plain Language Explanation (What This Actually Means)",
      citizenMustDo: "What you (the citizen) must do:",
      employerMustDo: "What your employer or EPFO must do:",
      stepByStepTitle: "3. Step-by-Step Verified Action Steps",
      timelineLabel: "Estimated Resolution Timeline",
      circularLabel: "Official Circular Grounding",
      copyHrMessage: "📲 Copy Ready-to-Send Message for Company HR",
      copiedNotice: "HR Action Message copied! Paste into WhatsApp or Email.",
    },
    taxCalc: {
      badge: "Section 192A Income Tax Compliance Tool",
      title: "EPFO Claim TDS & Net Settlement Calculator",
      subtitle: "Did you know EPFO deducts 10% to 20% TDS if service is under 5 years? Calculate your exact net bank payout.",
      amountLabel: "Total PF Amount Claimed (₹)",
      serviceLabel: "Total Continuous Service Duration",
      panLinkedLabel: "Is PAN Linked & Verified on UAN Portal?",
      form15gLabel: "Submitted Form 15G / 15H (Nil Tax Declaration)?",
      yes: "Yes",
      no: "No",
      grossAmount: "Gross PF Claim",
      tdsDeduction: "TDS Deducted (Sec 192A)",
      netCredit: "Estimated Net Bank Credit",
      exemptNotice: "Zero TDS applicable! Full amount will be credited to your bank account.",
      taxTip: "Tax-Saving Advisory: If your total taxable income is below basic exemption limit (₹3 Lakh), submit Form 15G online on Member Sewa to stop the 10% TDS deduction completely.",
    },
    offices: {
      badge: "Physical Joint Declaration & Escalation Directory",
      title: "EPFO Regional Office & PRO Directory",
      subtitle: "Find your regional P.F. office address, Public Relations Officer (PRO) grievance contact, and jurisdictional jurisdiction.",
      searchPlaceholder: "Search city (e.g. Bengaluru, Delhi, Mumbai, Hyderabad, Pune, Chennai)...",
      filterState: "Filter by State:",
      allStates: "All States & UTs",
      addressLabel: "Physical Office Address",
      proEmailLabel: "PRO Grievance Email",
      helplineLabel: "Toll-Free Helpline",
      epfigmsBtn: "Lodge Official EPFiGMS Grievance",
      viewCirculars: "View EPFO Circulars Repository",
    },
    steps: {
      title: "How PF Sahi Karo Solves the Rejection Trap",
      subtitle: "A transparent, verified resolution path for rejected PF, Pension, and Transfer claims.",
      step1Title: "1. Plain Language Decode",
      step1Desc: "Raw remarks like 'Name mismatch with Aadhaar' or 'Refer remarks' are decoded into conversational clarity with zero bureaucratic jargon.",
      step2Title: "2. Responsibility Split",
      step2Desc: "Know precisely which tasks you can perform online vs what requires your company HR's Class 3 Digital Signature (DSC).",
      step3Title: "3. Guided Resubmission Simulator",
      step3Desc: "Verify each checklist item before resubmitting to ensure your claim passes field office scrutiny without secondary rejection.",
    },
    trust: {
      title: "Service Scope, Trust & Boundaries",
      subtitle: "Complete transparency regarding what PF Sahi Karo can and cannot do for you.",
      weProvideTitle: "What PF Sahi Karo provides:",
      weProvideItems: [
        "Decodes cryptic EPFO rejection codes based on official published government circulars.",
        "Clear guidance on exact portal forms (Joint Declaration, Mark Exit, Modify Details, Form 15G).",
        "Multilingual support across English, Hindi, and key industrial state languages.",
        "Strict zero-storage privacy policy — we never ask for or record passwords or unmasked Aadhaar numbers.",
      ],
      weDoNotTitle: "What PF Sahi Karo does NOT do:",
      weDoNotItems: [
        "We do NOT make official claim settlement or disbursement decisions (only EPFO field offices do).",
        "We can NOT bypass mandatory employer DSC digital signature authorization.",
        "We are NOT an official government department or affiliated with EPFO.",
        "We never charge hidden fees — this is a 100% free civic tool.",
      ],
    },
    glossary: {
      title: "Key EPFO Terms Explained",
      uan: {
        term: "UAN (Universal Account Number)",
        explanation: "A permanent 12-digit number allotted to every EPF member that unifies all employer accounts.",
      },
      kyc: {
        term: "KYC (Know Your Customer)",
        explanation: "Digital identity linking your Aadhaar, PAN card, and verified Bank Account to your UAN profile.",
      },
      neft: {
        term: "NEFT (Electronic Fund Transfer)",
        explanation: "National Electronic Funds Transfer system used by EPFO field offices to directly credit settled funds.",
      },
      eps: {
        term: "EPS (Employees' Pension Scheme)",
        explanation: "The pension component of your monthly PF contribution (8.33%), claimable via Form 10C or Scheme Certificate.",
      },
      epfo: {
        term: "EPFO (Employees' Provident Fund Organisation)",
        explanation: "The official statutory body under the Ministry of Labour and Employment, Government of India.",
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
    claimDetail: {
      summaryTitle: "Claim Summary",
      analysisTitle: "EPFO Rejection Analysis & Resolution Path",
      analysisSubtitle: "Official rejection notice decoded into plain language with verified action steps",
      whatEpfoSaid: "1. Official EPFO Portal System Notice",
      rawNoticeDesc: "Notice: Generated automatically by regional EPFO processing gateway without contextual breakdown.",
      whatItMeans: "2. Guidance Based on This Rejection Remark",
      plainBadge: "Plain-Language Explanation",
      citizenCanDo: "What you can do right now:",
      authorityMustDo: "What employer or EPFO must complete:",
      stepByStepTitle: "3. Step-by-Step Resolution Path",
      readyToResolve: "Ready to resolve this claim?",
      readySubtitle: "Follow our guided resubmission workflow to prepare a compliant resubmission.",
      startResubmitBtn: "Start Guided Resubmission",
      shareHrBtn: "📲 Share Action Plan with Employer HR",
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
};

const hiTranslations: Translations = {
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
      demoNotice: "हैकाथॉन मूल्यांकन मोड सक्रिय — लाइव प्रवाह देखने के लिए किसी भी डेमो बटन पर क्लिक करें।",
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
      judgeDemoBtn: "⚡ जज डेमो (1-क्लिक लॉगिन)",
      shareWhatsApp: "व्हाट्सएप / एचआर को कार्य योजना भेजें",
      copied: "क्लिपबोर्ड पर कॉपी किया गया!",
    },
    nav: {
      home: "मुख्य पृष्ठ",
      decoder: "त्वरित डिकोडर",
      taxCalc: "टीडीएस टैक्स कैलकुलेटर",
      officeFinder: "ईपीएफओ कार्यालय निर्देशिका",
      about: "सेवा के बारे में",
      help: "नियम एवं अक्सर पूछे जाने वाले प्रश्न",
      serviceStatus: "सिस्टम स्थिति",
      dashboard: "मेरा दावा डैशबोर्ड",
      signIn: "लॉग इन",
      judgeDemo: "⚡ जज डेमो",
    },
    hero: {
      badge: "29+ करोड़ ईपीएफ सदस्यों के लिए राष्ट्रीय नागरिक-तकनीक पहल",
      headline: "समझें कि आपका ईपीएफओ दावा क्यों अस्वीकृत हुआ — और इसे कैसे ठीक करें।",
      subheadline:
        "34% से अधिक पीएफ दावे अस्पष्ट तकनीकी संदेशों के कारण अस्वीकृत हो जाते हैं। हम ईपीएफओ की आधिकारिक टिप्पणियों को सरल हिंदी और अंग्रेजी में डिकोड करते हैं, सत्यापित समाधान बताते हैं और आपको दोबारा सही दावा दाखिल करने में मदद करते हैं।",
      ctaPrimary: "मेरा दावा डैशबोर्ड देखें",
      ctaSecondary: "त्वरित अस्वीकृति डिकोडर चलाएं",
      statsSubscribers: "29+ करोड़",
      statsSubscribersLabel: "भारत में ईपीएफ खाताधारक",
      statsRejection: "34%",
      statsRejectionLabel: "अंतिम निपटान अस्वीकृति दर",
      statsZeroCost: "₹0 नि:शुल्क",
      statsZeroCostLabel: "नागरिकों हेतु मुफ्त सेवा",
    },
    decoderTool: {
      badge: "सार्वजनिक संवादात्मक टूल — लॉगिन की आवश्यकता नहीं",
      title: "त्वरित ईपीएफओ अस्वीकृति टिप्पणी डिकोडर",
      subtitle: "ड्रॉपडाउन से अस्वीकृति का कारण चुनें या श्रेणी पर क्लिक करें और तुरंत आधिकारिक समाधान देखें।",
      selectLabel: "प्रमुख अस्वीकृति टिप्पणी चुनें:",
      selectPlaceholder: "ईपीएफओ अस्वीकृति का कारण चुनें...",
      orSearch: "या सामान्य अस्वीकृति श्रेणी चुनें:",
      officialRemarkLabel: "1. आधिकारिक ईपीएफओ पोर्टल संदेश (जो ईपीएफओ ने भेजा)",
      plainMeaningLabel: "2. सरल भाषा में अर्थ (इसका वास्तव में क्या मतलब है)",
      citizenMustDo: "आपको (कर्मचारी) क्या करना होगा:",
      employerMustDo: "आपकी कंपनी (नियोक्ता) या ईपीएफओ को क्या करना होगा:",
      stepByStepTitle: "3. चरणबद्ध सत्यापित समाधान प्रक्रिया",
      timelineLabel: "अपेक्षित समाधान समयसीमा",
      circularLabel: "आधिकारिक सरकारी परिपत्र",
      copyHrMessage: "📲 कंपनी एचआर के लिए तैयार संदेश कॉपी करें",
      copiedNotice: "एचआर संदेश कॉपी हो गया! इसे व्हाट्सएप या ईमेल पर भेजें।",
    },
    taxCalc: {
      badge: "धारा 192A आयकर अनुपालन टूल",
      title: "ईपीएफओ टीडीएस टैक्स एवं शुद्ध बैंक भुगतान कैलकुलेटर",
      subtitle: "क्या आप जानते हैं कि 5 वर्ष से कम सेवा पर ईपीएफओ 10% से 20% तक टीडीएस काटता है? अपना शुद्ध भुगतान जानें।",
      amountLabel: "दावा की जा रही कुल पीएफ राशि (₹)",
      serviceLabel: "कुल निरंतर सेवा अवधि",
      panLinkedLabel: "क्या पैन यूएएन पोर्टल पर लिंक व सत्यापित है?",
      form15gLabel: "क्या फॉर्म 15G / 15H (शून्य कर घोषणा) जमा किया है?",
      yes: "हाँ",
      no: "नहीं",
      grossAmount: "सकल पीएफ दावा राशि",
      tdsDeduction: "टीडीएस कटौती (धारा 192A)",
      netCredit: "अपेक्षित शुद्ध बैंक क्रेडिट",
      exemptNotice: "शून्य टीडीएस लागू! पूरी राशि आपके बैंक खाते में जमा की जाएगी।",
      taxTip: "टैक्स बचत सलाह: यदि आपकी कुल वार्षिक आय कर सीमा (₹3 लाख) से कम है, तो मेंबर पोर्टल पर ऑनलाइन फॉर्म 15G अपलोड करें ताकि 10% टीडीएस न कटे।",
    },
    offices: {
      badge: "भौतिक संयुक्त घोषणा एवं शिकायत निवारण निर्देशिका",
      title: "ईपीएफओ क्षेत्रीय कार्यालय एवं पीआरओ निर्देशिका",
      subtitle: "अपने क्षेत्रीय पीएफ कार्यालय का पता, जनसंपर्क अधिकारी (पीआरओ) ईमेल और शिकायत हेल्पलाइन खोजें।",
      searchPlaceholder: "शहर का नाम लिखें (उदा. दिल्ली, बेंगलुरु, मुंबई, हैदराबाद, पुणे, चेन्नई, कानपुर)...",
      filterState: "राज्य अनुसार छांटें:",
      allStates: "सभी राज्य व केंद्रशासित प्रदेश",
      addressLabel: "कार्यालय का पता",
      proEmailLabel: "पीआरओ शिकायत ईमेल",
      helplineLabel: "टोल-फ्री हेल्पलाइन",
      epfigmsBtn: "आधिकारिक EPFiGMS पोर्टल पर शिकायत दर्ज करें",
      viewCirculars: "ईपीएफओ आधिकारिक परिपत्र देखें",
    },
    steps: {
      title: "पीएफ सही करो अस्वीकृति की समस्या को कैसे हल करता है",
      subtitle: "अस्वीकृत पीएफ, पेंशन और ट्रांसफर दावों के लिए एक पारदर्शी और सत्यापित समाधान मार्ग।",
      step1Title: "1. सरल भाषा में डिकोड",
      step1Desc: "'आधार नाम विसंगति' या 'रिमार्क्स देखें' जैसी कठिन टिप्पणियों को बिना किसी सरकारी उलझन के आसान भाषा में समझाया जाता है।",
      step2Title: "2. जिम्मेदारी का स्पष्ट विभाजन",
      step2Desc: "सटीक जानकारी पाएं कि आप ऑनलाइन क्या ठीक कर सकते हैं और आपकी कंपनी के डिजिटल हस्ताक्षर (DSC) से क्या होना है।",
      step3Title: "3. निर्देशित पुनः सबमिशन सिम्युलेटर",
      step3Desc: "दावा दोबारा भेजने से पहले हर आवश्यक बिंदु की जांच करें ताकि आपका दावा दूसरी बार खारिज न हो।",
    },
    trust: {
      title: "सेवा का दायरा, विश्वसनीयता एवं सीमाएं",
      subtitle: "पीएफ सही करो आपके लिए क्या कर सकता है और क्या नहीं, इसकी पूरी पारदर्शिता।",
      weProvideTitle: "पीएफ सही करो क्या प्रदान करता है:",
      weProvideItems: [
        "आधिकारिक सरकारी परिपत्रों के आधार पर कठिन ईपीएफओ अस्वीकृति कोड को डिकोड करता है।",
        "सटीक पोर्टल फॉर्म (संयुक्त घोषणा, मार्क एग्जिट, बेसिक विवरण संशोधन) की जानकारी।",
        "हिंदी, अंग्रेजी और प्रमुख राज्यों की भाषाओं में बहुभाषी मार्गदर्शन।",
        "सख्त गोपनीयता नीति — हम कभी भी पासवर्ड या पूरा आधार नंबर नहीं मांगते।",
      ],
      weDoNotTitle: "पीएफ सही करो क्या नहीं करता है:",
      weDoNotItems: [
        "हम आधिकारिक दावा स्वीकृति या भुगतान का निर्णय नहीं लेते (यह केवल ईपीएफओ करता है)।",
        "हम नियोक्ता के अनिवार्य डिजिटल हस्ताक्षर (DSC) को बाईपास नहीं कर सकते।",
        "हम कोई आधिकारिक सरकारी विभाग या ईपीएफओ से जुड़े हुए नहीं हैं।",
        "हम कोई शुल्क नहीं लेते — यह पूर्णतः निःशुल्क नागरिक सेवा है।",
      ],
    },
    glossary: {
      title: "प्रमुख ईपीएफओ शब्दावली",
      uan: {
        term: "यूएएन (यूनिवर्सल अकाउंट नंबर)",
        explanation: "प्रत्येक ईपीएफ सदस्य को दिया जाने वाला 12-अंकीय स्थायी नंबर जो विभिन्न खातों को जोड़ता है।",
      },
      kyc: {
        term: "केवाईसी (नो योर कस्टमर)",
        explanation: "आधार, पैन कार्ड और बैंक खाते को आपके यूएएन प्रोफाइल से जोड़ने वाला डिजिटल पहचान सत्यापन।",
      },
      neft: {
        term: "एनईएफटी (इलेक्ट्रॉनिक फंड ट्रांसफर)",
        explanation: "ईपीएफओ द्वारा स्वीकृत राशि को सीधे आपके बैंक खाते में भेजने की इलेक्ट्रॉनिक बैंकिंग प्रणाली।",
      },
      eps: {
        term: "ईपीएस (कर्मचारी पेंशन योजना)",
        explanation: "आपके मासिक पीएफ अंशदान का पेंशन भाग जिसे 10 वर्ष से कम सेवा पर निकाला जा सकता है।",
      },
      epfo: {
        term: "ईपीएफओ (कर्मचारी भविष्य निधि संगठन)",
        explanation: "श्रम एवं रोजगार मंत्रालय के अंतर्गत भविष्य निधि का प्रबंधन करने वाला वैधानिक निकाय।",
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
    claimDetail: {
      summaryTitle: "दावा सारांश",
      analysisTitle: "ईपीएफओ अस्वीकृति विश्लेषण एवं समाधान मार्ग",
      analysisSubtitle: "आधिकारिक अस्वीकृति टिप्पणी का सरल भाषा में विवरण और सत्यापित समाधान कदम",
      whatEpfoSaid: "1. आधिकारिक ईपीएफओ पोर्टल प्रणाली सूचना",
      rawNoticeDesc: "सूचना: ईपीएफओ प्रोसेसिंग गेटवे द्वारा बिना विस्तृत स्पष्टीकरण के स्वचालित रूप से भेजी गई।",
      whatItMeans: "2. इस अस्वीकृति टिप्पणी पर आधारित मार्गदर्शन",
      plainBadge: "सरल भाषा मार्गदर्शन",
      citizenCanDo: "आप अभी क्या कर सकते हैं:",
      authorityMustDo: "नियोक्ता या ईपीएफओ को क्या करना होगा:",
      stepByStepTitle: "3. चरणबद्ध समाधान प्रक्रिया",
      readyToResolve: "क्या आप इस दावे को हल करने के लिए तैयार हैं?",
      readySubtitle: "नियमों के अनुसार पुनः सबमिशन तैयार करने हेतु हमारी निर्देशित प्रक्रिया का पालन करें।",
      startResubmitBtn: "निर्देशित पुनः सबमिशन शुरू करें",
      shareHrBtn: "📲 कंपनी एचआर के साथ कार्य योजना साझा करें",
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
  };


function createRegionalTranslations(languageName: string, locale: Locale): Translations {
  const base = JSON.parse(JSON.stringify(enTranslations)) as Translations;
  base.common.brandName = `PF Sahi Karo (${languageName})`;
  base.nav.judgeDemo = `⚡ Demo (${languageName})`;
  base.common.judgeDemoBtn = `⚡ Demo (${languageName})`;
  base.dashboard.greeting =
    locale === "mr" ? "नमस्ते" :
    locale === "ta" ? "வணக்கம்" :
    locale === "te" ? "నమస్కారం" :
    locale === "kn" ? "ನಮಸ್ಕಾರ" :
    locale === "gu" ? "નમસ્તે" : "নমস্কার";
  return base;
}

export const translations: Record<Locale, Translations> = {
  en: enTranslations,
  hi: hiTranslations,
  mr: createRegionalTranslations("मराठी", "mr"),
  ta: createRegionalTranslations("தமிழ்", "ta"),
  te: createRegionalTranslations("తెలుగు", "te"),
  kn: createRegionalTranslations("ಕನ್ನಡ", "kn"),
  gu: createRegionalTranslations("ગુજરાતી", "gu"),
  bn: createRegionalTranslations("বাংলা", "bn"),
};

