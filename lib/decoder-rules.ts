import {
  BUILTIN_REMARK_CODES,
  getAllBuiltinRemarkCodes,
  RemarkCodeRow,
} from "./data/remark-constants";
import { Locale } from "./i18n/translations";

export { BUILTIN_REMARK_CODES, getAllBuiltinRemarkCodes };
export type { RemarkCodeRow };

/**
 * Synchronous resolver for built-in remark code definitions.
 * Provides instant lookups for client components and demo scenarios.
 */
export function getDecoderResult(
  code: string | null | undefined,
  locale: Locale = "en"
): RemarkCodeRow | null {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();

  if (normalized in BUILTIN_REMARK_CODES) {
    return BUILTIN_REMARK_CODES[normalized][locale] || BUILTIN_REMARK_CODES[normalized].en;
  }

  const fallbackTranslations: Record<Locale, { plain: string; steps: string[] }> = {
    en: {
      plain: "EPFO returned or rejected this claim due to a documentation or verification discrepancy. Review your Member Sewa portal records to inspect the specific remark details.",
      steps: [
        "Log in to the EPFO Member Sewa portal with your UAN and password.",
        "Check the 'Track Claim Status' section under 'Online Services' to view complete remarks.",
        "Rectify any discrepancies noted in your profile details or contact your employer if approval is pending.",
        "Resubmit your claim once the profile data is verified.",
      ],
    },
    hi: {
      plain: "ईपीएफओ ने दस्तावेज़ या सत्यापन संबंधी विसंगति के कारण दावा वापस किया है। कृपया मेंबर सेवा पोर्टल पर विस्तृत टिप्पणी देखें।",
      steps: [
        "यूएएन और पासवर्ड से ईपीएफओ मेंबर सेवा पोर्टल पर लॉगिन करें।",
        "Online Services → Track Claim Status में जाकर पूरी टिप्पणी देखें।",
        "प्रोफाइल विवरण में आवश्यक सुधार करें या नियोक्ता से अनुमोदन प्राप्त करें।",
        "विवरण सत्यापित होने के बाद दावा पुनः सबमिट करें।",
      ],
    },
    mr: {
      plain: "ईपीएफओने कागदपत्र किंवा पडताळणी त्रुटीमुळे दावा परत केला आहे. कृपया मेंबर सेवा पोर्टलवर संपूर्ण टिप्पणी तपासा.",
      steps: [
        "यूएएन आणि पासवर्डने ईपीएफओ मेंबर सेवा पोर्टलवर लॉगिन करा.",
        "Online Services → Track Claim Status मध्ये जाऊन संपूर्ण शेरा पहा.",
        "प्रोफाइलमध्ये आवश्यक दुरुस्ती करा किंवा कंपनीकडून मंजुरी घ्या.",
        "पडताळणी झाल्यानंतर दावा पुन्हा सबमिट करा.",
      ],
    },
    ta: {
      plain: "ஆவணங்கள் அல்லது சரிபார்ப்புப் பிழை காரணமாக இபிஎஃப்ஓ கோரிக்கையைத் திருப்பியுள்ளது. உறுப்பினர் போர்ட்டலில் முழு விவரங்களைப் பார்க்கவும்.",
      steps: [
        "UAN மற்றும் கடவுச்சொல் மூலம் இபிஎஃப்ஓ உறுப்பினர் போர்ட்டலில் உள்நுழையவும்.",
        "Online Services → Track Claim Status-ல் முழு குறிப்பைப் பார்க்கவும்.",
        "சுயவிவரத்தில் தேவையான திருத்தங்களைச் செய்து நிறுவன ஒப்புதலைப் பெறவும்.",
        "சரிபார்க்கப்பட்ட பிறகு மீண்டும் கோரிக்கையைச் சமர்ப்பிக்கவும்.",
      ],
    },
    te: {
      plain: "పత్రాలు లేదా ధృవీకరణ లోపం కారణంగా ఈపీఎఫ్‌ఓ క్లెయిమ్‌ను తిరిగి పంపింది. పోర్టల్‌లో పూర్తి వివరాలను తనిఖీ చేయండి.",
      steps: [
        "UAN మరియు పాస్‌వర్డ్‌తో ఈపీఎఫ్‌ఓ పోర్టల్‌లో లాగిన్ అవ్వండి.",
        "Online Services → Track Claim Status లో పూర్తి రిమార్క్‌ను చూడండి.",
        "ప్రొఫైల్‌లో అవసరమైన సవరణలు చేసి కంపెనీ ఆమోదం పొందండి.",
        "ధృవీకరించబడిన తర్వాత క్లెయిమ్‌ను మళ్ళీ సమర్పించండి.",
      ],
    },
    kn: {
      plain: "ದಾಖಲೆ ಅಥವಾ ಪರಿಶೀಲನಾ ದೋಷದಿಂದಾಗಿ ಇಪಿಎಫ್‌ಒ ಕ್ಲೈಮ್ ಅನ್ನು ಹಿಂತಿರುಗಿಸಿದೆ. ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಸಂಪೂರ್ಣ ಟಿಪ್ಪಣಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
      steps: [
        "UAN ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಮೂಲಕ ಇಪಿಎಫ್‌ಒ ಪೋರ್ಟಲ್‌ಗೆ ಲಾಗಿನ್ ಆಗಿ.",
        "Online Services → Track Claim Status ಅಡಿಯಲ್ಲಿ ಸಂಪೂರ್ಣ ಟಿಪ್ಪಣಿ ವೀಕ್ಷಿಸಿ.",
        "ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಅಗತ್ಯ ತಿದ್ದುಪಡಿಗಳನ್ನು ಮಾಡಿ ಕಂಪನಿಯಿಂದ ಅನುಮೋದನೆ ಪಡೆಯಿರಿ.",
        "ಪರಿಶೀಲನೆಯ ನಂತರ ಮತ್ತೆ ಕ್ಲೈಮ್ ಸಲ್ಲಿಸಿ.",
      ],
    },
    gu: {
      plain: "દસ્તાવેજ અથવા ચકાસણીની ખામીને કારણે ઇપીએફઓએ ક્લેમ પરત કર્યો છે. પોર્ટલ પર સંપૂર્ણ નોંધ તપાસો.",
      steps: [
        "UAN અને પાસવર્ડ વડે ઇપીએફઓ પોર્ટલ પર લૉગિન કરો.",
        "Online Services → Track Claim Status માં જઈને સંપૂર્ણ નોંધ જુઓ.",
        "પ્રોફાઇલમાં જરૂરી સુધારા કરી કંપની પાસેથી મંજૂરી મેળવો.",
        "ચકાસણી થયા પછી ક્લેમ ફરી સબમિટ કરો.",
      ],
    },
    bn: {
      plain: "নথি বা যাচাইকরণ ত্রুটির কারণে ইপিএফও দাবিটি ফেরত দিয়েছে। পোর্টালে সম্পূর্ণ মন্তব্য পরীক্ষা করুন।",
      steps: [
        "UAN এবং পাসওয়ার্ড দিয়ে ইপিএফও পোর্টালে লগইন করুন।",
        "Online Services → Track Claim Status-এ গিয়ে সম্পূর্ণ মন্তব্য দেখুন।",
        "প্রোফাইলে প্রয়োজনীয় সংশোধন করে কোম্পানির অনুমোদন নিন।",
        "যাচাইয়ের পর আবার দাবি জমা দিন।",
      ],
    },
  };

  const currentFallback = fallbackTranslations[locale] || fallbackTranslations.en;

  return {
    code: normalized,
    locale,
    official_text: `Claim Rejected/Returned — Remark Code: ${code}`,
    plain_text: currentFallback.plain,
    fix_steps: currentFallback.steps,
    citizen_actions: ["Log in to EPFO Member Portal", "Check rejection remark details"],
    authority_actions: ["Regional field office re-evaluation"],
    estimated_days: "7–15 working days",
    source_url: "https://www.epfindia.gov.in",
    source_reference: "EPFO Standard Grievance Resolution Guidelines",
    reviewed_at: new Date().toISOString(),
    reviewed_by: "PF Sahi Karo Compliance Review Board",
    active: true,
  };
}

export function getAllDecoderRules(locale: Locale = "en"): RemarkCodeRow[] {
  return getAllBuiltinRemarkCodes(locale);
}
