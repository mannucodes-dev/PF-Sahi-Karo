import { Locale } from "@/lib/i18n/translations";
import { formatCurrency, formatDisplayDate } from "@/lib/utils";

export interface LocalizedScenario {
  code: string;
  label: string;
  short: string;
}

export function getLocalizedClaimType(claimType: string, locale: Locale): string {
  const norm = (claimType || "").toLowerCase();

  const translations: Record<string, Record<Locale, string>> = {
    transfer: {
      en: "PF Transfer (Form 13)",
      hi: "पीएफ ट्रांसफर (फॉर्म 13)",
      mr: "पीएफ ट्रान्सफर (फॉर्म 13)",
      ta: "பிஎஃப் பரிமாற்றம் (Form 13)",
      te: "పీఎఫ్ బదిలీ (ఫారం 13)",
      kn: "ಪಿಎಫ್ ವರ್ಗಾವಣೆ (ಫಾರ್ಮ್ 13)",
      gu: "પીએફ ટ્રાન્સફર (ફોર્મ 13)",
      bn: "পিএফ স্থানান্তর (ফর্ম 13)",
    },
    final_settlement: {
      en: "Final PF Settlement (Form 19)",
      hi: "अंतिम पीएफ निपटान (फॉर्म 19)",
      mr: "अंतिम पीएफ सेटलमेंट (फॉर्म 19)",
      ta: "முழு பிஎஃப் தீர்வு (Form 19)",
      te: "తుది పీఎఫ్ పరిష్కారం (ఫారం 19)",
      kn: "ಅಂತಿಮ ಪಿಎಫ್ ಇತ್ಯರ್ಥ (ಫಾರ್ಮ್ 19)",
      gu: "અંતિમ પીએફ પતાવટ (ફોર્મ 19)",
      bn: "চূড়ান্ত পিএফ নিষ্পত্তি (ফর্ম 19)",
    },
    medical_advance: {
      en: "Medical Advance (Form 31)",
      hi: "चिकित्सा अग्रिम (फॉर्म 31)",
      mr: "वैद्यकीय ॲडव्हान्स (फॉर्म 31)",
      ta: "மருத்துவ முன்பணம் (Form 31)",
      te: "వైద్య ముందస్తు రుణం (ఫారం 31)",
      kn: "ವೈದ್ಯಕೀಯ ಮುಂಗಡ (ಫಾರ್ಮ್ 31)",
      gu: "તબીબી એડવાન્સ (ફોર્મ 31)",
      bn: "চিকিৎসা অগ্রিম (ফর্ম 31)",
    },
    pension_withdrawal: {
      en: "Pension Withdrawal (Form 10C)",
      hi: "पेंशन निकासी (फॉर्म 10C)",
      mr: "पेन्शन काढणे (फॉर्म 10C)",
      ta: "ஓய்வூதிய திரும்பப் பெறுதல் (Form 10C)",
      te: "పెన్షన్ ఉపసంహరణ (ఫారం 10C)",
      kn: "ಪಿಂಚಣಿ ಹಿಂಪಡೆಯುವಿಕೆ (ಫಾರ್ಮ್ 10C)",
      gu: "પેન્શન ઉપાડ (ફોર્મ 10C)",
      bn: "পেনশন উত্তোলন (ফর্ম 10C)",
    },
  };

  if (norm.includes("transfer") || norm.includes("13")) {
    return translations.transfer[locale] || claimType;
  }
  if (norm.includes("final") || norm.includes("settlement") || norm.includes("19")) {
    return translations.final_settlement[locale] || claimType;
  }
  if (norm.includes("medical") || norm.includes("advance") || norm.includes("31")) {
    return translations.medical_advance[locale] || claimType;
  }
  if (norm.includes("pension") || norm.includes("10c")) {
    return translations.pension_withdrawal[locale] || claimType;
  }

  return claimType;
}

export function getLocalizedScenarios(locale: Locale): LocalizedScenario[] {
  const scenarioMap: Record<Locale, LocalizedScenario[]> = {
    en: [
      { code: "NAME_MISMATCH", label: "Aadhaar Name Mismatch", short: "Name Mismatch" },
      { code: "KYC_INCOMPLETE", label: "KYC Pending Employer Digital Signature", short: "KYC Pending" },
      { code: "BANK_MISMATCH", label: "NEFT Failed / Bank Inactive", short: "Bank Error" },
      { code: "SERVICE_PERIOD", label: "Service Period Discrepancy", short: "Date of Exit" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-Aadhaar Linkage Missing", short: "UAN-Aadhaar" },
    ],
    hi: [
      { code: "NAME_MISMATCH", label: "आधार नाम बेमेल (Aadhaar Name Mismatch)", short: "नाम बेमेल" },
      { code: "KYC_INCOMPLETE", label: "केवाईसी नियोक्ता हस्ताक्षर लंबित", short: "केवाईसी लंबित" },
      { code: "BANK_MISMATCH", label: "बैंक विवरण विसंगति / NEFT विफल", short: "बैंक त्रुटि" },
      { code: "SERVICE_PERIOD", label: "सेवा अवधि विसंगति / एग्जिट डेट", short: "एग्जिट डेट" },
      { code: "UAN_AADHAAR_UNLINKED", label: "यूएएन-आधार लिंकिंग अनुपस्थित", short: "यूएएन-आधार" },
    ],
    mr: [
      { code: "NAME_MISMATCH", label: "आधार नाव तफावत (Name Mismatch)", short: "नाव तफावत" },
      { code: "KYC_INCOMPLETE", label: "केवायसी डिजिटल स्वाक्षरी प्रलंबित", short: "केवायसी प्रलंबित" },
      { code: "BANK_MISMATCH", label: "बँक खाते त्रुटी / NEFT अपयशी", short: "बँक त्रुटी" },
      { code: "SERVICE_PERIOD", label: "सेवा कालावधी विसंगती / बाहेर पडण्याची तारीख", short: "एक्झिट तारीख" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-आधार लिंकिंग बाकी", short: "UAN-आधार" },
    ],
    ta: [
      { code: "NAME_MISMATCH", label: "ஆதார் பெயர் பொருந்தவில்லை (Name Mismatch)", short: "பெயர் முரண்பாடு" },
      { code: "KYC_INCOMPLETE", label: "நிறுவன டிஜிட்டல் கையொப்பம் நிலுவையில் உள்ளது", short: "KYC நிலுவை" },
      { code: "BANK_MISMATCH", label: "வங்கி விவரம் தோல்வி / NEFT பிழை", short: "வங்கி பிழை" },
      { code: "SERVICE_PERIOD", label: "பணிக்காலம் முரண்பாடு / வெளியேறிய தேதி", short: "வெளியேறிய தேதி" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-ஆதார் இணைப்பு இல்லை", short: "UAN-ஆதார்" },
    ],
    te: [
      { code: "NAME_MISMATCH", label: "ఆధార్ పేరు సరిపోలలేదు (Name Mismatch)", short: "పేరు సరిపోలలేదు" },
      { code: "KYC_INCOMPLETE", label: "KYC డిజిటల్ సంతకం పెండింగ్‌లో ఉంది", short: "KYC పెండింగ్" },
      { code: "BANK_MISMATCH", label: "బ్యాంక్ ఖాతా లోపం / NEFT విఫలమైంది", short: "బ్యాంక్ లోపం" },
      { code: "SERVICE_PERIOD", label: "సర్వీస్ వ్యవధి వ్యత్యాసం / నిష్క్రమణ తేదీ", short: "ఎగ్జిట్ తేదీ" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-ఆధార్ అనుసంధానం లేదు", short: "UAN-ఆధార్" },
    ],
    kn: [
      { code: "NAME_MISMATCH", label: "ಆಧಾರ್ ಹೆಸರು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ", short: "ಹೆಸರು ಹೊಂದಾಣಿಕೆ" },
      { code: "KYC_INCOMPLETE", label: "ಉದ್ಯೋಗದಾತರ ಡಿಜಿಟಲ್ ಸಹಿ ಬಾಕಿ ಇದೆ", short: "KYC ಬಾಕಿ" },
      { code: "BANK_MISMATCH", label: "ಬ್ಯಾಂಕ್ ಖಾತೆ ದೋಷ / NEFT ವಿಫಲ", short: "ಬ್ಯಾಂಕ್ ದೋಷ" },
      { code: "SERVICE_PERIOD", label: "ಸೇವಾ ಅವಧಿ ವ್ಯತ್ಯಾಸ / ನಿರ್ಗಮನ ದಿನಾಂಕ", short: "ನಿರ್ಗಮನ ದಿನಾಂಕ" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-ಆಧಾರ್ ಲಿಂಕ್ ಆಗಿಲ್ಲ", short: "UAN-ಆಧಾರ್" },
    ],
    gu: [
      { code: "NAME_MISMATCH", label: "આધાર નામ મેળ ખાતું નથી", short: "નામ મેળ ખાતું નથી" },
      { code: "KYC_INCOMPLETE", label: "KYC ડિજિટલ સહી બાકી છે", short: "KYC બાકી" },
      { code: "BANK_MISMATCH", label: "બેંક ખાતાની ભૂલ / NEFT નિષ્ફળ", short: "બેંક ભૂલ" },
      { code: "SERVICE_PERIOD", label: "સેવા સમયગાળા વિસંગતતા / એક્ઝિટ તારીખ", short: "એક્ઝિટ તારીખ" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-આધાર લિંક થયેલ નથી", short: "UAN-આધાર" },
    ],
    bn: [
      { code: "NAME_MISMATCH", label: "আধার নাম অমিল (Name Mismatch)", short: "নাম অমিল" },
      { code: "KYC_INCOMPLETE", label: "কেওয়াইসি নিয়োগকর্তার ডিজিটাল স্বাক্ষর মুলতুবি", short: "কেওয়াইসি বাকি" },
      { code: "BANK_MISMATCH", label: "ব্যাংক অ্যাকাউন্ট ত্রুটি / NEFT ব্যর্থ", short: "ব্যাংক ত্রুটি" },
      { code: "SERVICE_PERIOD", label: "চাকরির সময়কাল অসঙ্গতি / প্রস্থানের তারিখ", short: "প্রস্থানের তারিখ" },
      { code: "UAN_AADHAAR_UNLINKED", label: "UAN-আধার সংযোগ নেই", short: "UAN-আধার" },
    ],
  };

  return scenarioMap[locale] || scenarioMap.en;
}

export function getLocalizedClaimDetails(
  locale: Locale,
  claim: { amount: number; settled_at?: string | null; claim_type: string },
  user: { full_name: string; masked_bank_account: string }
) {
  const formattedAmount = formatCurrency(claim.amount);
  const formattedDate = formatDisplayDate(claim.settled_at);
  const last4Bank = user.masked_bank_account.slice(-4);

  const texts: Record<
    Locale,
    {
      settlementTitle: string;
      settlementDesc: string;
      paymentModeLabel: string;
      paymentModeValue: string;
      transferStatusLabel: string;
      transferStatusValue: string;
      beneficiaryNameLabel: string;
      pendingTitle: string;
      pendingDesc: string;
      claimRefLabel: string;
      judgeToolTitle: string;
      activeLabel: string;
    }
  > = {
    en: {
      settlementTitle: "Settlement Completed Successfully",
      settlementDesc: `Your claim of ${formattedAmount} has been approved by the EPFO field office. Funds were electronically credited via NEFT to your KYC-verified bank account ending in ••••${last4Bank} on ${formattedDate}.`,
      paymentModeLabel: "Payment Mode:",
      paymentModeValue: "Electronic NEFT Transfer",
      transferStatusLabel: "Transfer Status:",
      transferStatusValue: "Settled & Disbursed",
      beneficiaryNameLabel: "Beneficiary Name:",
      pendingTitle: "Claim Under Active Field Office Processing",
      pendingDesc: `Your claim of ${formattedAmount} is currently being processed by the regional EPFO Field Office. Standard settlement processing typically takes between 15 to 20 working days from submission date.`,
      claimRefLabel: "Claim Ref:",
      judgeToolTitle: "Judge Evaluation Tool: Test Different Rejection Scenarios",
      activeLabel: "Active:",
    },
    hi: {
      settlementTitle: "दावा निपटान सफलतापूर्वक पूर्ण हुआ",
      settlementDesc: `आपका ${formattedAmount} का दावा ईपीएफओ क्षेत्रीय कार्यालय द्वारा स्वीकृत कर दिया गया है। धनराशि एनईएफटी (NEFT) के माध्यम से आपके केवाईसी-सत्यापित बैंक खाते (अंतिम अंक ••••${last4Bank}) में ${formattedDate} को जमा कर दी गई है।`,
      paymentModeLabel: "भुगतान माध्यम:",
      paymentModeValue: "इलेक्ट्रॉनिक एनईएफटी (NEFT) ट्रांसफर",
      transferStatusLabel: "हस्तांतरण स्थिति:",
      transferStatusValue: "स्वीकृत एवं बैंक खाते में जमा (Settled)",
      beneficiaryNameLabel: "लाभार्थी का नाम:",
      pendingTitle: "दावा क्षेत्रीय कार्यालय में प्रक्रियाधीन है",
      pendingDesc: `आपका ${formattedAmount} का दावा वर्तमान में क्षेत्रीय ईपीएफओ कार्यालय द्वारा संसाधित किया जा रहा है। सामान्य निपटान प्रक्रिया में सबमिशन की तारीख से 15 से 20 कार्यदिवस लगते हैं।`,
      claimRefLabel: "दावा संदर्भ संख्या:",
      judgeToolTitle: "मूल्यांकन टूल: विभिन्न अस्वीकृति परिदृश्यों का परीक्षण करें",
      activeLabel: "सक्रिय:",
    },
    mr: {
      settlementTitle: "दावा सेटलमेंट यशस्वीरीत्या पूर्ण झाले",
      settlementDesc: `तुमचा ${formattedAmount} चा दावा ईपीएफओ प्रादेशिक कार्यालयाने मंजूर केला आहे. रक्कम एनईएफटी (NEFT) द्वारे तुमच्या केवायसी-सत्यापित बँक खात्यात (शेवटचे अंक ••••${last4Bank}) ${formattedDate} रोजी जमा करण्यात आली आहे.`,
      paymentModeLabel: "पेमेंट मोड:",
      paymentModeValue: "इलेक्ट्रॉनिक एनईएफटी (NEFT) ट्रान्सफर",
      transferStatusLabel: "हस्तांतरण स्थिती:",
      transferStatusValue: "मंजूर आणि खात्यात जमा (Settled)",
      beneficiaryNameLabel: "लाभार्थ्याचे नाव:",
      pendingTitle: "दावा प्रादेशिक कार्यालयात प्रक्रियेत आहे",
      pendingDesc: `तुमचा ${formattedAmount} चा दावा सध्या ईपीएफओ प्रादेशिक कार्यालयाद्वारे तपासला जात आहे. सबमिशन तारखेपासून सर्वसाधारण प्रक्रियेस १५ ते २० कामकाजाचे दिवस लागतात.`,
      claimRefLabel: "दावा संदर्भ क्र.:",
      judgeToolTitle: "मूल्यांकन साधन: वेगवेगळ्या नकार कारणांची चाचणी करा",
      activeLabel: "सक्रिय:",
    },
    ta: {
      settlementTitle: "செட்டில்மென்ட் வெற்றிகரமாக முடிவடைந்தது",
      settlementDesc: `உங்கள் ${formattedAmount} கோரிக்கை இபிஎஃப்ஓ (EPFO) மண்டல அலுவலகத்தால் அங்கீகரிக்கப்பட்டுள்ளது. நிதி உங்கள் கேஒய்சி சரிபார்க்கப்பட்ட வங்கி கணக்கில் (கடைசி எண்கள்: ••••${last4Bank}) NEFT மூலம் ${formattedDate} அன்று வரவு வைக்கப்பட்டுள்ளது.`,
      paymentModeLabel: "பணம் செலுத்தும் முறை:",
      paymentModeValue: "மின்னணு NEFT பரிமாற்றம்",
      transferStatusLabel: "பரிமாற்ற நிலை:",
      transferStatusValue: "தீர்க்கப்பட்டு வரவு வைக்கப்பட்டது (Settled)",
      beneficiaryNameLabel: "பயனாளி பெயர்:",
      pendingTitle: "கோரிக்கை மண்டல அலுவலக பரிசீலனையில் உள்ளது",
      pendingDesc: `உங்கள் ${formattedAmount} கோரிக்கை தற்போது மண்டல இபிஎஃப்ஓ அலுவலகத்தால் பரிசீலிக்கப்பட்டு வருகிறது. சமர்ப்பித்த தேதியிலிருந்து வழக்கமான தீர்வு செயல்முறைக்கு 15 முதல் 20 வேலை நாட்கள் ஆகும்.`,
      claimRefLabel: "கோரிக்கை குறிப்பு எண்:",
      judgeToolTitle: "மதிப்பீட்டு கருவி: வெவ்வேறு நிராகரிப்பு நிலைகளை சோதிக்கவும்",
      activeLabel: "செயலில் உள்ள குறியீடு:",
    },
    te: {
      settlementTitle: "క్లెయిమ్ పరిష్కారం విజయవంతంగా పూర్తయింది",
      settlementDesc: `మీ ${formattedAmount} క్లెయిమ్‌ను ఈపీఎఫ్‌వో ప్రాంతీయ కార్యాలయం ఆమోదించింది. మీ కేవైసీ ధృవీకరించిన బ్యాంక్ ఖాతాకు (చివరి అంకెలు: ••••${last4Bank}) ${formattedDate}న NEFT ద్వారా నిధులు జమ చేయబడ్డాయి.`,
      paymentModeLabel: "చెల్లింపు విధానం:",
      paymentModeValue: "ఎలక్ట్రానిక్ NEFT బదిలీ",
      transferStatusLabel: "బదిలీ స్థితి:",
      transferStatusValue: "పరిష్కరించబడింది మరియు జమ చేయబడింది (Settled)",
      beneficiaryNameLabel: "లబ్ధిదారుని పేరు:",
      pendingTitle: "క్లెయిమ్ ప్రాంతీయ కార్యాలయ పరిశీలనలో ఉంది",
      pendingDesc: `మీ ${formattedAmount} క్లెయిమ్ ప్రస్తుతం ఈపీఎఫ్‌వో ప్రాంతీయ కార్యాలయ పరిశీలనలో ఉంది. సమర్పించిన తేదీ నుండి సాధారణ పరిష్కారానికి 15 నుండి 20 పని దినాలు పడుతుంది.`,
      claimRefLabel: "క్లెయిమ్ రిఫరెన్స్:",
      judgeToolTitle: "మూల్యాంకన సాధనం: వివిధ తిరస్కరణ పరిస్థితులను పరీక్షించండి",
      activeLabel: "యాక్టివ్ కోడ్:",
    },
    kn: {
      settlementTitle: "ಕ್ಲೈಮ್ ಇತ್ಯರ್ಥ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
      settlementDesc: `ನಿಮ್ಮ ${formattedAmount} ಕ್ಲೈಮ್ ಅನ್ನು ಇಪಿಎಫ್‌ಒ ಪ್ರಾದೇಶಿಕ ಕಚೇರಿ ಅನುಮೋದಿಸಿದೆ. ನಿಮ್ಮ ಕೆವೈಸಿ-ದೃಢೀಕೃತ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ (ಕೊನೆಯ ಅಂಕಿಗಳು: ••••${last4Bank}) ${formattedDate} ರಂದು NEFT ಮೂಲಕ ಹಣ ಜಮೆಯಾಗಿದೆ.`,
      paymentModeLabel: "ಪಾವತಿ ವಿಧಾನ:",
      paymentModeValue: "ಎಲೆಕ್ಟ್ರಾನಿಕ್ NEFT ವರ್ಗಾವಣೆ",
      transferStatusLabel: "ವರ್ಗಾವಣೆ ಸ್ಥಿತಿ:",
      transferStatusValue: "ಇತ್ಯರ್ಥಗೊಂಡಿದೆ ಮತ್ತು ಜಮೆಯಾಗಿದೆ (Settled)",
      beneficiaryNameLabel: "ಫಲಾನುಭವಿಯ ಹೆಸರು:",
      pendingTitle: "ಕ್ಲೈಮ್ ಪ್ರಾದೇಶಿಕ ಕಚೇರಿಯ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ",
      pendingDesc: `ನಿಮ್ಮ ${formattedAmount} ಕ್ಲೈಮ್ ಪ್ರಸ್ತುತ ಇಪಿಎಫ್‌ಒ ಪ್ರಾದೇಶಿಕ ಕಚೇರಿಯಲ್ಲಿ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ. ಸಲ್ಲಿಕೆ ದಿನಾಂಕದಿಂದ ಸಾಮಾನ್ಯ ಇತ್ಯರ್ಥಕ್ಕೆ 15 ರಿಂದ 20 ಕೆಲಸದ ದಿನಗಳು ಬೇಕಾಗಬಹುದು.`,
      claimRefLabel: "ಕ್ಲೈಮ್ ರೆಫರೆನ್ಸ್:",
      judgeToolTitle: "ಮೌಲ್ಯಮಾಪನ ಸಾಧನ: ವಿವಿಧ ತಿರಸ್ಕಾರ ಸನ್ನಿವೇಶಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ",
      activeLabel: "ಸಕ್ರಿಯ ಕೋಡ್:",
    },
    gu: {
      settlementTitle: "ક્લેઇમ સેટલમેન્ટ સફળતાપૂર્વક પૂર્ણ થયું",
      settlementDesc: `તમારો ${formattedAmount} નો ક્લેઇમ EPFO પ્રાદેશિક કચેરી દ્વારા મંજૂર કરવામાં આવ્યો છે. તમારા કેવાયસી ચકાસાયેલ બેંક ખાતામાં (અંતિમ અંકો: ••••${last4Bank}) ${formattedDate} ના રોજ NEFT દ્વારા નાણાં જમા કરવામાં આવ્યા છે.`,
      paymentModeLabel: "ચુકવણી પદ્ધતિ:",
      paymentModeValue: "ઇલેક્ટ્રોનિક NEFT ટ્રાન્સફર",
      transferStatusLabel: "ટ્રાન્સફર સ્થિતિ:",
      transferStatusValue: "મંજૂર અને જમા થયેલ (Settled)",
      beneficiaryNameLabel: "લાભાર્થીનું નામ:",
      pendingTitle: "ક્લેઇમ પ્રાદેશિક કચેરીમાં પ્રક્રિયા હેઠળ છે",
      pendingDesc: `તમારો ${formattedAmount} નો ક્લેઇમ હાલમાં પ્રાદેશિક EPFO કચેરી દ્વારા તપાસ હેઠળ છે. સબમિશન તારીખથી સામાન્ય પ્રક્રિયામાં 15 થી 20 કામકાજના દિવસો લાગે છે.`,
      claimRefLabel: "ક્લેઇમ સંદર્ભ:",
      judgeToolTitle: "મૂલ્યાંકન ટૂલ: વિવિધ નકાર પરિસ્થિતિઓનું પરીક્ષણ કરો",
      activeLabel: "સક્રિય કોડ:",
    },
    bn: {
      settlementTitle: "দাবি নিষ্পত্তি সফলভাবে সম্পন্ন হয়েছে",
      settlementDesc: `আপনার ${formattedAmount} এর দাবিটি EPFO আঞ্চলিক কার্যালয় দ্বারা অনুমোদিত হয়েছে। আপনার কেওয়াইসি-যাচাইকৃত ব্যাংক অ্যাকাউন্টে (শেষ অঙ্ক: ••••${last4Bank}) ${formattedDate} তারিখে NEFT এর মাধ্যমে টাকা জমা দেওয়া হয়েছে।`,
      paymentModeLabel: "পেমেন্ট মোড:",
      paymentModeValue: "ইলেক্ট্রনিক NEFT স্থানান্তর",
      transferStatusLabel: "স্থানান্তর স্থিতি:",
      transferStatusValue: "নিষ্পত্তি ও জমা হয়েছে (Settled)",
      beneficiaryNameLabel: "সুবিধাভোগীর নাম:",
      pendingTitle: "দাবি আঞ্চলিক কার্যালয়ে প্রক্রিয়াধীন রয়েছে",
      pendingDesc: `আপনার ${formattedAmount} এর দাবিটি বর্তমানে আঞ্চলিক EPFO অফিসে প্রক্রিয়াধীন রয়েছে। জমা দেওয়ার তারিখ থেকে সাধারণ নিষ্পত্তির জন্য ১৫ থেকে ২০ কার্যদিবস সময় লাগে।`,
      claimRefLabel: "দাবি রেফারেন্স:",
      judgeToolTitle: "মূল্যায়ন টুল: বিভিন্ন প্রত্যাখ্যানের পরিস্থিতি পরীক্ষা করুন",
      activeLabel: "সক্রিয় কোড:",
    },
  };

  return texts[locale] || texts.en;
}
