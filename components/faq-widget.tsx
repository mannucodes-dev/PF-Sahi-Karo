"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircleQuestion,
  X,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  LifeBuoy,
  Globe,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/context";
import { Locale, SUPPORTED_LOCALES } from "@/lib/i18n/translations";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  officialRef: string;
}

export interface FAQWidgetDictionary {
  buttonLabel: string;
  badgeLabel: string;
  title: string;
  subtitle: string;
  selectLanguageLabel: string;
  noticePrefix: string;
  noticeText: string;
  noticeLinkText: string;
  greeting: string;
  commonTopicsLabel: string;
  refPrefix: string;
  stillHaveQuestions: string;
  contactSupport: string;
  clearHistory: string;
  closeDialog: string;
  items: FAQItem[];
}

export const FAQ_TRANSLATIONS: Record<Locale, FAQWidgetDictionary> = {
  en: {
    buttonLabel: "Claim Help & FAQ",
    badgeLabel: "Guidance",
    title: "EPFO Claim Assistance FAQ",
    subtitle: "Rules-based guidance · Verified by circulars",
    selectLanguageLabel: "Language / भाषा:",
    noticePrefix: "Notice:",
    noticeText:
      "This assistant provides guidance based on official published circulars. For official grievance filing, visit",
    noticeLinkText: "EPFiGMS",
    greeting: "Namaste! Select a topic below to view verified explanations and guidelines:",
    commonTopicsLabel: "Common Topics:",
    refPrefix: "Ref:",
    stillHaveQuestions: "Still have questions?",
    contactSupport: "Contact Support",
    clearHistory: "Clear chat history",
    closeDialog: "Close dialog (Escape)",
    items: [
      {
        id: "form-10c",
        question: "What is Form 10C and when should I file it?",
        officialRef: "EPFO Scheme Rules Paragraph 68",
        answer:
          "Form 10C is used to withdraw your EPS (Employees' Pension Scheme) accumulated amount or to claim a Scheme Certificate when leaving an establishment before completing 10 years of pension-eligible service.",
      },
      {
        id: "uan-inactive",
        question: "Why does the portal say my UAN is inactive?",
        officialRef: "EPFO Member Portal Circular 2023",
        answer:
          "A UAN is marked inactive if it hasn't been activated on the Member Sewa portal or if mandatory Aadhaar-OTP linkage has not been completed. Visit the Unified Member Portal and select 'Activate UAN'.",
      },
      {
        id: "resubmit-timeline",
        question: "How long does EPFO take to process a resubmitted claim?",
        officialRef: "Citizen Charter 2024 (15 Working Days standard)",
        answer:
          "Resubmitted claims typically undergo field office review within 10 to 15 standard working days once your employer digitally approves the rectification on the Unified Portal.",
      },
      {
        id: "missing-document",
        question: "What should I do if my employer has not approved my KYC?",
        officialRef: "EPFO Master Circular on Employer DSC",
        answer:
          "Employer approval requires a Class 3 Digital Signature (DSC). Contact your company HR/PF department. If the establishment is closed or uncooperative, you can submit a Joint Declaration attested by an authorized bank manager or local EPFO PRO.",
      },
      {
        id: "partial-withdraw",
        question: "Can I file for partial PF advance while employed?",
        officialRef: "Form 31 Guidelines (Para 68B, 68H, 68K)",
        answer:
          "Yes. Form 31 allows non-refundable PF advances for specific emergencies: medical illness, house construction, child education, or marriage, without resigning from service.",
      },
    ],
  },
  hi: {
    buttonLabel: "दावा सहायता एवं अक्सर पूछे जाने वाले प्रश्न",
    badgeLabel: "मार्गदर्शन",
    title: "ईपीएफओ दावा सहायता FAQ",
    subtitle: "सत्यापित नियमों व परिपत्रों पर आधारित मार्गदर्शन",
    selectLanguageLabel: "भाषा चुनें:",
    noticePrefix: "सूचना:",
    noticeText:
      "यह सहायक आधिकारिक प्रकाशित परिपत्रों पर आधारित मार्गदर्शन प्रदान करता है। आधिकारिक शिकायत दर्ज करने के लिए देखें",
    noticeLinkText: "EPFiGMS",
    greeting: "नमस्ते! नीचे दिए गए किसी भी विषय पर क्लिक करके सत्यापित नियम व दिशानिर्देश देखें:",
    commonTopicsLabel: "प्रमुख विषय:",
    refPrefix: "संदर्भ:",
    stillHaveQuestions: "अन्य प्रश्न हैं?",
    contactSupport: "सहायता से संपर्क करें",
    clearHistory: "चैट इतिहास हटाएं",
    closeDialog: "डायलॉग बंद करें",
    items: [
      {
        id: "form-10c",
        question: "फॉर्म 10C क्या है और इसे कब दाखिल करना चाहिए?",
        officialRef: "ईपीएफओ योजना नियम पैरा 68",
        answer:
          "फॉर्म 10C का उपयोग 10 वर्ष से कम सेवा पर नौकरी छोड़ने के बाद ईपीएस (पेंशन) संचित राशि निकालने या स्कीम सर्टिफिकेट प्राप्त करने के लिए किया जाता है।",
      },
      {
        id: "uan-inactive",
        question: "पोर्टल पर मेरा यूएएन निष्क्रिय (Inactive) क्यों दिख रहा है?",
        officialRef: "ईपीएफओ मेंबर पोर्टल परिपत्र 2023",
        answer:
          "यदि यूएएन एक्टिवेट नहीं किया गया है या अनिवार्य आधार-ओटीपी लिंकिंग पूरी नहीं हुई है, तो यूएएन निष्क्रिय रहता है। मेंबर सेवा पोर्टल पर जाकर 'Activate UAN' चुनें।",
      },
      {
        id: "resubmit-timeline",
        question: "पुनः सबमिट किए गए दावे के निपटान में कितना समय लगता है?",
        officialRef: "नागरिक चार्टर 2024 (15 कार्य दिवस मानक)",
        answer:
          "नियोक्ता द्वारा यूनिफाइड पोर्टल पर डिजिटल अनुमोदन के बाद क्षेत्रीय कार्यालय द्वारा सामान्यतः 10 से 15 कार्य दिवस में समीक्षा की जाती है।",
      },
      {
        id: "missing-document",
        question: "यदि कंपनी एचआर मेरा केवाईसी अप्रूव न करे तो क्या करें?",
        officialRef: "ईपीएफओ नियोक्ता डीएससी मास्टर परिपत्र",
        answer:
          "कंपनी के एचआर/पीएफ डेस्क से संपर्क करें। यदि कंपनी बंद हो चुकी है या सहयोग नहीं कर रही है, तो बैंक प्रबंधक या स्थानीय ईपीएफओ पीआरओ द्वारा सत्यापित संयुक्त घोषणा (Joint Declaration) पत्र जमा करें।",
      },
      {
        id: "partial-withdraw",
        question: "क्या नौकरी में रहते हुए पीएफ एडवांस निकाला जा सकता है?",
        officialRef: "फॉर्म 31 दिशानिर्देश (पैरा 68B, 68H, 68K)",
        answer:
          "हाँ, फॉर्म 31 द्वारा चिकित्सा आपातकाल, गृह निर्माण, बच्चों की उच्च शिक्षा या विवाह के लिए बिना नौकरी छोड़े गैर-वापसी योग्य एडवांस निकाला जा सकता है।",
      },
    ],
  },
  mr: {
    buttonLabel: "दावा सहाय्यता आणि FAQ",
    badgeLabel: "मार्गदर्शन",
    title: "ईपीएफओ दावा सहाय्यता FAQ",
    subtitle: "सत्यापित नियम व परिपत्रकांवर आधारित मार्गदर्शन",
    selectLanguageLabel: "भाषा निवडा:",
    noticePrefix: "सूचना:",
    noticeText:
      "हे सहाय्यक अधिकृत प्रकाशित परिपत्रकांवर आधारित मार्गदर्शन देते. अधिकृत तक्रार नोंदणीसाठी भेट द्या",
    noticeLinkText: "EPFiGMS",
    greeting: "नमस्ते! अधिकृत स्पष्टीकरण आणि मार्गदर्शक तत्त्वे पाहण्यासाठी खालील विषय निवडा:",
    commonTopicsLabel: "महत्त्वाचे विषय:",
    refPrefix: "संदर्भ:",
    stillHaveQuestions: "अजून काही प्रश्न आहेत का?",
    contactSupport: "सपोर्टशी संपर्क साधा",
    clearHistory: "चॅट इतिहास पुसा",
    closeDialog: "डायलॉग बंद करा",
    items: [
      {
        id: "form-10c",
        question: "फॉर्म १०C काय आहे आणि तो कधी भरावा?",
        officialRef: "ईपीएफओ योजना नियम परिच्छेद ६८",
        answer:
          "१० वर्षांपेक्षा कमी सेवा पूर्ण करून नोकरी सोडल्यास ईपीएस (पेन्शन) रक्कम काढण्यासाठी किंवा स्कीम सर्टिफिकेट मिळवण्यासाठी फॉर्म १०C चा वापर केला जातो.",
      },
      {
        id: "uan-inactive",
        question: "पोर्टलवर माझा UAN निष्क्रिय (Inactive) का दिसत आहे?",
        officialRef: "ईपीएफओ मेंबर पोर्टल परिपत्रक २०२३",
        answer:
          "मेंबर सेवा पोर्टलवर UAN सक्रिय केला नसल्यास किंवा आधार-OTP लिंकिंग पूर्ण न झाल्यास तो निष्क्रिय राहतो. युनिफाइड पोर्टलवर जाऊन 'Activate UAN' निवडा.",
      },
      {
        id: "resubmit-timeline",
        question: "पुन्हा सबमिट केलेल्या दाव्यावर प्रक्रिया होण्यासाठी किती वेळ लागतो?",
        officialRef: "नागरिक सनद २०२४ (१५ कामकाजाचे दिवस मानक)",
        answer:
          "कंपनीने पोर्टलवर डिजिटल मंजुरी दिल्यानंतर प्रादेशिक ईपीएफओ कार्यालयात साधारणतः १० ते १५ कामकाजाच्या दिवसांत फेरतपासणी पूर्ण होते.",
      },
      {
        id: "missing-document",
        question: "कंपनीने माझे केवायसी मंजूर केले नाही तर मी काय करावे?",
        officialRef: "ईपीएफओ कंपनी डीएससी मास्टर परिपत्रक",
        answer:
          "कंपनीच्या एचआर/पीएफ विभागाशी संपर्क साधा. कंपनी बंद असल्यास किंवा सहकार्य करत नसल्यास, अधिकृत बँक व्यवस्थापक किंवा स्थानिक ईपीएफओ पीआरओ द्वारे प्रमाणित संयुक्त घोषणापत्र (Joint Declaration) सादर करा.",
      },
      {
        id: "partial-withdraw",
        question: "नोकरीत असताना पीएफ ॲडव्हान्स काढता येतो का?",
        officialRef: "फॉर्म ३१ मार्गदर्शक तत्त्वे (पॅरा ६८B, ६८H, ६८K)",
        answer:
          "होय. वैद्यकीय खर्च, घराचे बांधकाम, मुलांचे शिक्षण किंवा विवाहासाठी नोकरी न सोडता फॉर्म ३१ द्वारे विनापरतावा पीएफ ॲडव्हान्स काढता येतो.",
      },
    ],
  },
  ta: {
    buttonLabel: "உரிம உதவி & கேள்விகள்",
    badgeLabel: "வழிகாட்டல்",
    title: "இபிஎஃப்ஓ உரிமைக்கோரல் உதவி FAQ",
    subtitle: "விதிகள் மற்றும் சுற்றறிக்கைகள் அடிப்படையிலான வழிகாட்டல்",
    selectLanguageLabel: "மொழியைத் தேர்ந்தெடுக்கவும்:",
    noticePrefix: "அறிவிப்பு:",
    noticeText:
      "இந்த உதவியாளர் அதிகாரப்பூர்வ சுற்றறிக்கைகளின் அடிப்படையில் வழிகாட்டுகிறது. முறையான குறைகளைத் தெரிவிக்க பார்வையிடவும்:",
    noticeLinkText: "EPFiGMS",
    greeting: "வணக்கம்! சரிபார்க்கப்பட்ட விளக்கங்கள் மற்றும் வழிகாட்டுதல்களைக் காண கீழே உள்ள தலைப்பைத் தேர்ந்தெடுக்கவும்:",
    commonTopicsLabel: "முக்கிய தலைப்புகள்:",
    refPrefix: "குறிப்பு:",
    stillHaveQuestions: "வேறு கேள்விகள் உள்ளதா?",
    contactSupport: "ஆதரவைத் தொடர்பு கொள்ளவும்",
    clearHistory: "வரலாற்றை அழிக்கவும்",
    closeDialog: "மூடு",
    items: [
      {
        id: "form-10c",
        question: "படிவம் 10C என்றால் என்ன, அதை எப்போது தாக்கல் செய்ய வேண்டும்?",
        officialRef: "இபிஎஃப்ஓ திட்ட விதிகள் பத்தி 68",
        answer:
          "10 ஆண்டுகளுக்கும் குறைவான சேவையில் வேலையை விட்டு வெளியேறும்போது இபிஎஸ் (ஓய்வூதிய) தொகையை எடுக்க அல்லது திட்ட சான்றிதழைப் பெற படிவம் 10C பயன்படுத்தப்படுகிறது.",
      },
      {
        id: "uan-inactive",
        question: "போர்ட்டலில் எனது UAN செயலிழந்துள்ளதாக (Inactive) ஏன் காட்டுகிறது?",
        officialRef: "இபிஎஃப்ஓ உறுப்பினர் போர்டல் சுற்றறிக்கை 2023",
        answer:
          "உறுப்பினர் சேவா போர்ட்டலில் UAN செயல்படுத்தப்படாவிட்டால் அல்லது ஆதார்-OTP இணைப்பு முடிக்கப்படாவிட்டால் UAN செயலிழந்து இருக்கும். போர்ட்டலுக்குச் சென்று 'Activate UAN' என்பதைத் தேர்ந்தெடுக்கவும்.",
      },
      {
        id: "resubmit-timeline",
        question: "மறுசமர்ப்பிக்கப்பட்ட கோரிக்கையை பரிசீலிக்க இபிஎஃப்ஓ எவ்வளவு காலம் எடுக்கும்?",
        officialRef: "குடிமக்கள் சாசனம் 2024 (15 வேலை நாட்கள்)",
        answer:
          "நிறுவனம் போர்ட்டலில் டிஜிட்டல் முறையில் ஒப்புதல் அளித்த பிறகு, பிராந்திய அலுவலகத்தில் பொதுவாக 10 முதல் 15 வேலை நாட்களுக்குள் மறுபரிசீலனை செய்யப்படுகிறது.",
      },
      {
        id: "missing-document",
        question: "நிறுவனம் எனது KYC-க்கு ஒப்புதல் அளிக்கவில்லை என்றால் நான் என்ன செய்ய வேண்டும்?",
        officialRef: "நிறுவன DSC குறித்த இபிஎஃப்ஓ சுற்றறிக்கை",
        answer:
          "நிறுவனத்தின் HR பிரிவைத் தொடர்பு கொள்ளவும். நிறுவனம் மூடப்பட்டிருந்தால் அல்லது ஒத்துழைக்கவில்லை என்றால், வங்கி மேலாளர் அல்லது உள்ளூர் இபிஎஃப்ஓ PRO சான்றளித்த கூட்டுப் பிரகடனத்தை (Joint Declaration) சமர்ப்பிக்கலாம்.",
      },
      {
        id: "partial-withdraw",
        question: "வேலையில் இருக்கும்போதே பிஎஃப் முன்பணம் (Advance) பெற முடியுமா?",
        officialRef: "படிவம் 31 வழிகாட்டுதல்கள் (பத்தி 68B, 68H, 68K)",
        answer:
          "ஆம். மருத்துவம், வீடு கட்டுதல், குழந்தைகளின் கல்வி அல்லது திருமணத்திற்காக வேலையை விடாமல் படிவம் 31 மூலம் திரும்பப் பெற முடியாத முன்பணத்தைப் பெறலாம்.",
      },
    ],
  },
  te: {
    buttonLabel: "క్లెయిమ్ సహాయం & FAQ",
    badgeLabel: "మార్గదర్శకత్వం",
    title: "ఈపీఎఫ్‌వో క్లెయిమ్ సహాయం FAQ",
    subtitle: "నిబంధనలు & సర్క్యులర్ల ఆధారిత మార్గదర్శకత్వం",
    selectLanguageLabel: "భాషను ఎంచుకోండి:",
    noticePrefix: "గమనిక:",
    noticeText:
      "ఈ సహాయకుడు అధికారిక సర్క్యులర్ల ఆధారంగా మార్గదర్శకత్వం అందిస్తుంది. అధికారిక ఫిర్యాదు నమోదు కోసం సందర్శించండి:",
    noticeLinkText: "EPFiGMS",
    greeting: "నమస్కారం! ధృవీకరించబడిన వివరణలు మరియు మార్గదర్శకాలను చూడటానికి క్రింది అంశాన్ని ఎంచుకోండి:",
    commonTopicsLabel: "ముఖ్యమైన అంశాలు:",
    refPrefix: "రిఫరెన్స్:",
    stillHaveQuestions: "ఇంకా ప్రశ్నలు ఉన్నాయా?",
    contactSupport: "సహాయక విభాగాన్ని సంప్రదించండి",
    clearHistory: "చరిత్రను తొలగించండి",
    closeDialog: "డైలాగ్ మూసివేయి",
    items: [
      {
        id: "form-10c",
        question: "ఫారం 10C అంటే ఏమిటి మరియు దానిని ఎప్పుడు దాఖలు చేయాలి?",
        officialRef: "ఈపీఎఫ్‌వో పథకం నిబంధనలు పేరా 68",
        answer:
          "10 సంవత్సరాల కంటే తక్కువ సర్వీసుతో ఉద్యోగం వదిలేసినప్పుడు ఈపీఎస్ (పెన్షన్) నిధిని విత్‌డ్రా చేయడానికి లేదా స్కీమ్ సర్టిఫికేట్ పొందడానికి ఫారం 10C ఉపయోగించబడుతుంది.",
      },
      {
        id: "uan-inactive",
        question: "పోర్టల్‌లో నా UAN నిష్క్రియంగా (Inactive) ఎందుకు ఉంది?",
        officialRef: "ఈపీఎఫ్‌వో మెంబర్ పోర్టల్ సర్క్యులర్ 2023",
        answer:
          "మెంబర్ సేవా పోర్టల్‌లో UAN యాక్టివేట్ చేయకపోయినా లేదా ఆధార్-OTP లింకేజ్ పూర్తి కాకపోయినా UAN నిష్క్రియంగా ఉంటుంది. పోర్టల్‌లో 'Activate UAN' ఎంచుకోండి.",
      },
      {
        id: "resubmit-timeline",
        question: "తిరిగి సమర్పించిన క్లెయిమ్‌ను పరిష్కరించడానికి ఈపీఎఫ్‌వోకు ఎంత సమయం పడుతుంది?",
        officialRef: "సిటిజెన్ చార్టర్ 2024 (15 పని దినాలు)",
        answer:
          "కంపెనీ పోర్టల్‌లో డిజిటల్ ఆమోదం తెలిపిన తర్వాత ప్రాంతీయ కార్యాలయంలో సాధారణంగా 10 నుండి 15 పని దినాలలో పునఃపరిశీలన జరుగుతుంది.",
      },
      {
        id: "missing-document",
        question: "కంపెనీ నా కేవైసీని ఆమోదించకపోతే నేను ఏమి చేయాలి?",
        officialRef: "యాజమాన్య DSC పై ఈపీఎఫ్‌వో సర్క్యులర్",
        answer:
          "కంపెనీ హెచ్‌ఆర్ విభాగాన్ని సంప్రదించండి. కంపెనీ మూతపడినా లేదా స్పందించకపోయినా, బ్యాంక్ మేనేజర్ లేదా స్థానిక ఈపీఎఫ్‌వో PRO ధృవీకరించిన జాయింట్ డిక్లరేషన్‌ను సమర్పించవచ్చు.",
      },
      {
        id: "partial-withdraw",
        question: "ఉద్యోగంలో ఉండగానే పీఎఫ్ అడ్వాన్స్ తీసుకోవచ్చా?",
        officialRef: "ఫారం 31 మార్గదర్శకాలు (పేరా 68B, 68H, 68K)",
        answer:
          "అవును. వైద్య ఖర్చులు, ఇంటి నిర్మాణం, పిల్లల విద్య లేదా వివాహం కోసం ఉద్యోగం వదలకుండానే ఫారం 31 ద్వారా నాన్-రీఫండబుల్ అడ్వాన్స్ తీసుకోవచ్చు.",
      },
    ],
  },
  kn: {
    buttonLabel: "ಕ್ಲೈಮ್ ಸಹಾಯ ಮತ್ತು FAQ",
    badgeLabel: "ಮಾರ್ಗದರ್ಶನ",
    title: "ಇಪಿಎಫ್‌ಒ ಕ್ಲೈಮ್ ಸಹಾಯ FAQ",
    subtitle: "ಅಧಿಕೃತ ನಿಯಮಗಳು ಮತ್ತು ಸುತ್ತೋಲೆಗಳ ಆಧಾರಿತ ಮಾರ್ಗದರ್ಶನ",
    selectLanguageLabel: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    noticePrefix: "ಸೂಚನೆ:",
    noticeText:
      "ಈ ಸಹಾಯಕ ಅಧಿಕೃತ ಸುತ್ತೋಲೆಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಅಧಿಕೃತ ದೂರು ದಾಖಲಿಸಲು ಭೇಟಿ ನೀಡಿ:",
    noticeLinkText: "EPFiGMS",
    greeting: "ನಮಸ್ಕಾರ! ಪರಿಶೀಲಿಸಿದ ವಿವರಣೆಗಳು ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ನೋಡಲು ಕೆಳಗಿನ ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    commonTopicsLabel: "ಪ್ರಮುಖ ವಿಷಯಗಳು:",
    refPrefix: "ಉಲ್ಲೇಖ:",
    stillHaveQuestions: "ಇನ್ನೂ ಪ್ರಶ್ನೆಗಳಿವೆಯೇ?",
    contactSupport: "ಸಹಾಯ ವಿಭಾಗವನ್ನು ಸಂಪರ್ಕಿಸಿ",
    clearHistory: "ಇತಿಹಾಸ ಅಳಿಸಿ",
    closeDialog: "ಮುಚ್ಚಿ",
    items: [
      {
        id: "form-10c",
        question: "ಫಾರ್ಮ್ 10C ಎಂದರೇನು ಮತ್ತು ಅದನ್ನು ಯಾವಾಗ ಸಲ್ಲಿಸಬೇಕು?",
        officialRef: "ಇಪಿಎಫ್‌ಒ ಯೋಜನೆ ನಿಯಮಗಳು ಪ್ಯಾರಾ 68",
        answer:
          "10 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ಸೇವಾವಧಿಯ ನಂತರ ಉದ್ಯೋಗ ತೊರೆದಾಗ ಇಪಿಎಸ್ (ಪಿಂಚಣಿ) ಮೊತ್ತವನ್ನು ಹಿಂಪಡೆಯಲು ಅಥವಾ ಸ್ಕೀಮ್ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಫಾರ್ಮ್ 10C ಬಳಸಲಾಗುತ್ತದೆ.",
      },
      {
        id: "uan-inactive",
        question: "ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ನನ್ನ UAN ನಿಷ್ಕ್ರಿಯವಾಗಿದೆ (Inactive) ಎಂದು ಏಕೆ ತೋರಿಸುತ್ತಿದೆ?",
        officialRef: "ಇಪಿಎಫ್‌ಒ ಸದಸ್ಯ ಪೋರ್ಟಲ್ ಸುತ್ತೋಲೆ 2023",
        answer:
          "ಸದಸ್ಯ ಸೇವಾ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ UAN ಸಕ್ರಿಯಗೊಳಿಸದಿದ್ದರೆ ಅಥವಾ ಆಧಾರ್-OTP ಲಿಂಕ್ ಪೂರ್ಣಗೊಳ್ಳದಿದ್ದರೆ UAN ನಿಷ್ಕ್ರಿಯವಾಗಿರುತ್ತದೆ. ಪೋರ್ಟಲ್‌ನಲ್ಲಿ 'Activate UAN' ಆಯ್ಕೆಮಾಡಿ.",
      },
      {
        id: "resubmit-timeline",
        question: "ಮರುಸಲ್ಲಿಸಿದ ಕ್ಲೈಮ್ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ಇಪಿಎಫ್‌ಒ ಎಷ್ಟು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ?",
        officialRef: "ನಾಗರಿಕ ಸನ್ನದು 2024 (15 ಕೆಲಸದ ದಿನಗಳ ಮಾನದಂಡ)",
        answer:
          "ಕಂಪನಿಯು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಡಿಜಿಟಲ್ ಅನುಮೋದನೆ ನೀಡಿದ ನಂತರ ಪ್ರಾದೇಶಿಕ ಕಚೇರಿಯಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ 10 ರಿಂದ 15 ಕೆಲಸದ ದಿನಗಳಲ್ಲಿ ಮರುಪರಿಶೀಲನೆ ನಡೆಯುತ್ತದೆ.",
      },
      {
        id: "missing-document",
        question: "ಕಂಪನಿಯು ನನ್ನ KYC ಅನುಮೋದಿಸದಿದ್ದರೆ ನಾನು ಏನು ಮಾಡಬೇಕು?",
        officialRef: "ಉದ್ಯೋಗದಾತರ DSC ಕುರಿತು ಇಪಿಎಫ್‌ಒ ಸುತ್ತೋಲೆ",
        answer:
          "ಕಂಪನಿಯ ಮಾನವ ಸಂಪನ್ಮೂಲ (HR) ವಿಭಾಗವನ್ನು ಸಂಪರ್ಕಿಸಿ. ಕಂಪನಿ ಮುಚ್ಚಿದ್ದರೆ ಅಥವಾ ಸಹಕರಿಸದಿದ್ದರೆ, ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಅಥವಾ ಸ್ಥಳೀಯ ಇಪಿಎಫ್‌ಒ PRO ದೃಢೀಕರಿಸಿದ ಜಂಟಿ ಘೋಷಣೆಯನ್ನು (Joint Declaration) ಸಲ್ಲಿಸಬಹುದು.",
      },
      {
        id: "partial-withdraw",
        question: "ಉದ್ಯೋಗದಲ್ಲಿರುವಾಗಲೇ ಪಿಎಫ್ ಮುಂಗಡ (Advance) ಪಡೆಯಬಹುದೇ?",
        officialRef: "ಫಾರ್ಮ್ 31 ಮಾರ್ಗಸೂಚಿಗಳು (ಪ್ಯಾರಾ 68B, 68H, 68K)",
        answer:
          "ಹೌದು. ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ, ಮನೆ ನಿರ್ಮಾಣ, ಮಕ್ಕಳ ಶಿಕ್ಷಣ ಅಥವಾ ವಿವಾಹಕ್ಕಾಗಿ ಉದ್ಯೋಗ ಬಿಡದೆ ಫಾರ್ಮ್ 31 ಮೂಲಕ ಮುಂಗಡ ಹಣವನ್ನು ಪಡೆಯಬಹುದು.",
      },
    ],
  },
  gu: {
    buttonLabel: "ક્લેઇમ સહાય અને FAQ",
    badgeLabel: "માર્ગદર્શન",
    title: "ઇપીએફઓ ક્લેઇમ સહાય FAQ",
    subtitle: "નિયમો અને પરિપત્રો આધારિત માર્ગદર્શન",
    selectLanguageLabel: "ભાષા પસંદ કરો:",
    noticePrefix: "સૂચના:",
    noticeText:
      "આ સહાયક સત્તાવાર પરિપત્રોના આધારે માર્ગદર્શન આપે છે. સત્તાવાર ફરિયાદ નોંધણી માટે મુલાકાત લો:",
    noticeLinkText: "EPFiGMS",
    greeting: "નમસ્તે! ચકાસાયેલ સમજૂતીઓ અને માર્ગદર્શિકા જોવા માટે નીચેનો વિષય પસંદ કરો:",
    commonTopicsLabel: "મુખ્ય વિષયો:",
    refPrefix: "સંદર્ભ:",
    stillHaveQuestions: "હજુ પ્રશ્નો છે?",
    contactSupport: "સપોર્ટનો સંપર્ક કરો",
    clearHistory: "ઇતિહાસ સાફ કરો",
    closeDialog: "સંવાદ બંધ કરો",
    items: [
      {
        id: "form-10c",
        question: "ફોર્મ 10C શું છે અને તે ક્યારે ભરવું જોઈએ?",
        officialRef: "ઇપીએફઓ યોજના નિયમો પેરા 68",
        answer:
          "10 વર્ષથી ઓછી સેવામાં નોકરી છોડ્યા પછી EPS (પેન્શન) રકમ ઉપાડવા અથવા સ્કીમ સર્ટિફિકેટ મેળવવા માટે ફોર્મ 10C નો ઉપયોગ થાય છે.",
      },
      {
        id: "uan-inactive",
        question: "પોર્ટલ પર મારો UAN નિષ્ક્રિય (Inactive) કેમ બતાવે છે?",
        officialRef: "ઇપીએફઓ મેમ્બર પોર્ટલ પરિપત્ર 2023",
        answer:
          "જો મેમ્બર સેવા પોર્ટલ પર UAN એક્ટિવેટ ન થયો હોય અથવા આધાર-OTP લિંકિંગ પૂર્ણ ન થયું હોય તો UAN નિષ્ક્રિય રહે છે. પોર્ટલ પર જઈને 'Activate UAN' પસંદ કરો.",
      },
      {
        id: "resubmit-timeline",
        question: "ફરી સબમિટ કરેલા ક્લેઇમ પર પ્રક્રિયા કરવામાં EPFO ને કેટલો સમય લાગે છે?",
        officialRef: "નાગરિક ચાર્ટર 2024 (15 કામકાજના દિવસો)",
        answer:
          "કંપની દ્વારા પોર્ટલ પર ડિજિટલ મંજૂરી મળ્યા પછી પ્રાદેશિક કચેરીમાં સામાન્ય રીતે 10 થી 15 કામકાજના દિવસોમાં ફરીથી ચકાસણી થાય છે.",
      },
      {
        id: "missing-document",
        question: "જો કંપની મારું KYC મંજૂર ન કરે તો મારે શું કરવું?",
        officialRef: "કંપની DSC અંગે ઇપીએફઓ પરિપત્ર",
        answer:
          "કંપનીના HR વિભાગનો સંપર્ક કરો. જો કંપની બંધ થઈ ગઈ હોય અથવા સહકાર ન આપતી હોય, તો બેંક મેનેજર અથવા સ્થાનિક EPFO PRO દ્વારા પ્રમાણિત સંયુક્ત ઘોષણા (Joint Declaration) સબમિટ કરો.",
      },
      {
        id: "partial-withdraw",
        question: "શું નોકરી ચાલુ હોય ત્યારે પીએફ એડવાન્સ ઉપાડી શકાય?",
        officialRef: "ફોર્મ 31 માર્ગદર્શિકા (પેરા 68B, 68H, 68K)",
        answer:
          "હા. તબીબી સારવાર, ઘર બાંધકામ, બાળકોના શિક્ષણ અથવા લગ્ન માટે નોકરી છોડ્યા વિના ફોર્મ 31 દ્વારા બિન-રિફંડપાત્ર એડવાન્સ લઈ શકાય છે.",
      },
    ],
  },
  bn: {
    buttonLabel: "দাবি সহায়তা ও FAQ",
    badgeLabel: "নির্দেশিকা",
    title: "ইপিএফও দাবি সহায়তা FAQ",
    subtitle: "সরকারি নিয়মাবলী ও সার্কুলারের ভিত্তিতে নির্দেশিকা",
    selectLanguageLabel: "ভাষা নির্বাচন করুন:",
    noticePrefix: "বিজ্ঞপ্তি:",
    noticeText:
      "এই সহায়ক অফিসিয়াল সার্কুলারের ভিত্তিতে নির্দেশিকা প্রদান করে। অফিসিয়াল অভিযোগ দায়ের করতে ভিজিট করুন:",
    noticeLinkText: "EPFiGMS",
    greeting: "নমস্কার! যাচাইকৃত ব্যাখ্যা এবং নির্দেশিকা দেখতে নিচের যেকোনো বিষয় নির্বাচন করুন:",
    commonTopicsLabel: "মূল বিষয়সমূহ:",
    refPrefix: "রেফারেন্স:",
    stillHaveQuestions: "আরো কোনো প্রশ্ন আছে?",
    contactSupport: "সহায়তায় যোগাযোগ করুন",
    clearHistory: "ইতিহাস মুছুন",
    closeDialog: "বন্ধ করুন",
    items: [
      {
        id: "form-10c",
        question: "ফর্ম 10C কী এবং এটি কখন জমা দেওয়া উচিত?",
        officialRef: "ইপিএফও স্কিম নিয়ম অনুচ্ছেদ ৬৮",
        answer:
          "১০ বছরের কম চাকরিকাল সম্পন্ন করে চাকরি ছাড়ার পর ইপিএস (পেনশন) অর্থ উত্তোলনের জন্য বা স্কিম সার্টিফিকেট পাওয়ার জন্য ফর্ম 10C ব্যবহার করা হয়।",
      },
      {
        id: "uan-inactive",
        question: "পোর্টালে আমার UAN নিষ্ক্রিয় (Inactive) দেখাচ্ছে কেন?",
        officialRef: "ইপিএফও সদস্য পোর্টাল সার্কুলার ২০২৩",
        answer:
          "সদস্য সেবা পোর্টালে UAN সক্রিয় না করা থাকলে বা আধার-OTP সংযোগ সম্পন্ন না হলে UAN নিষ্ক্রিয় দেখায়। পোর্টালে গিয়ে 'Activate UAN' নির্বাচন করুন।",
      },
      {
        id: "resubmit-timeline",
        question: "পুনরায় জমা দেওয়া দাবি নিষ্পত্তিতে EPFO কত সময় নেয়?",
        officialRef: "সিটিজেন চার্টার ২০২৪ (১৫ কার্যদিবস)",
        answer:
          "কোম্পানি পোর্টালে ডিজিটাল অনুমোদন দেওয়ার পর আঞ্চলিক কার্যালয় দ্বারা সাধারণত ১০ থেকে ১৫ কার্যদিবসের মধ্যে পুনঃনিরীক্ষা সম্পন্ন হয়।",
      },
      {
        id: "missing-document",
        question: "কোম্পানি আমার KYC অনুমোদন না করলে আমার কী করা উচিত?",
        officialRef: "কোম্পানির DSC সংক্রান্ত ইপিএফও সার্কুলার",
        answer:
          "কোম্পানির এইচআর বিভাগের সাথে যোগাযোগ করুন। প্রতিষ্ঠান বন্ধ হয়ে গেলে বা সহযোগিতা না করলে, ব্যাংক ম্যানেজার বা স্থানীয় ইপিএফও পিআরও দ্বারা প্রত্যায়িত যৌথ ঘোষণা (Joint Declaration) জমা দিতে পারেন।",
      },
      {
        id: "partial-withdraw",
        question: "চাকরিতে থাকা অবস্থায় পিএফ অগ্রিম (Advance) তোলা যায় কি?",
        officialRef: "ফর্ম ৩১ নির্দেশিকা (অনুচ্ছেদ ৬৮B, ৬৮H, ৬৮K)",
        answer:
          "হ্যাঁ। চিকিৎসা, বাড়ি নির্মাণ, সন্তানদের শিক্ষা বা বিবাহের জন্য চাকরি না ছেড়েই ফর্ম ৩১ এর মাধ্যমে অফেরতযোগ্য অগ্রিম নেওয়া যায়।",
      },
    ],
  },
};

export function FAQWidget() {
  const { locale, setLocale } = useTranslation();
  const dict = FAQ_TRANSLATIONS[locale] || FAQ_TRANSLATIONS.en;
  const faqData = dict.items;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQItem | null>(null);
  const [chatHistory, setChatHistory] = useState<FAQItem[]>([]);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key and restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isLangDropdownOpen) {
          setIsLangDropdownOpen(false);
        } else {
          setIsOpen(false);
          triggerButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLangDropdownOpen]);

  // Click outside for language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus modal when opened
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // When locale changes, update the selectedFAQ and chatHistory items to the current language
  useEffect(() => {
    if (selectedFAQ) {
      const updatedSelected = faqData.find((item) => item.id === selectedFAQ.id) || null;
      setSelectedFAQ(updatedSelected);
    }
    if (chatHistory.length > 0) {
      setChatHistory((prev) =>
        prev
          .map((prevItem) => faqData.find((item) => item.id === prevItem.id))
          .filter((item): item is FAQItem => Boolean(item))
      );
    }
  }, [locale, faqData]);

  const handleSelectQuestion = (faq: FAQItem) => {
    setSelectedFAQ(faq);
    if (!chatHistory.some((item) => item.id === faq.id)) {
      setChatHistory((prev) => [...prev, faq]);
    }
  };

  const handleReset = () => {
    setSelectedFAQ(null);
    setChatHistory([]);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerButtonRef.current?.focus();
  };

  return (
    <aside
      aria-label="EPFO Claim Knowledge Assistant"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
    >
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          ref={triggerButtonRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group bg-[#005f56] hover:bg-[#004742] text-white font-extrabold p-3 rounded-full shadow-lg hover:shadow-xl flex items-center transition-all duration-300 active:scale-95 cursor-pointer border border-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-400/50"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={dict.title}
        >
          <div className="w-6 h-6 rounded-full bg-teal-800 flex items-center justify-center shrink-0" aria-hidden="true">
            <MessageCircleQuestion className="w-4 h-4 text-teal-200" />
          </div>
          <div className="flex items-center overflow-hidden max-w-0 group-hover:max-w-[300px] group-hover:ml-2.5 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 whitespace-nowrap gap-2">
            <span className="text-xs sm:text-sm font-bold">
              {dict.buttonLabel}
            </span>
            <Badge className="bg-teal-900 text-teal-200 border-teal-700 text-[10px] px-1.5 py-0 font-mono shrink-0">
              {dict.badgeLabel}
            </Badge>
          </div>
        </button>
      )}

      {/* Accessible Dialog Modal - 100% Flush, Zero White Space Above Header */}
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="faq-dialog-title"
          tabIndex={-1}
          className="focus:outline-none"
        >
          <div className="w-[calc(100vw-2rem)] sm:w-[450px] max-h-[600px] border border-slate-200/90 bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header - flush to top edge with rounded-t-2xl and zero white space above */}
            <div className="bg-[#005f56] text-white p-3.5 sm:p-4 flex flex-row items-center justify-between shrink-0 rounded-t-2xl border-b border-teal-800/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-700/80 border border-teal-600/80 flex items-center justify-center shadow-2xs" aria-hidden="true">
                  <Bot className="w-4 h-4 text-teal-100" />
                </div>
                <div>
                  <h2 id="faq-dialog-title" className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5 leading-snug">
                    {dict.title}
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  </h2>
                  <p className="text-[11px] text-teal-100/90 font-medium leading-tight">
                    {dict.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Language Switcher in Header */}
                <div className="relative" ref={langDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center gap-1 text-xs bg-teal-800/90 hover:bg-teal-700 text-teal-50 px-2 py-1 rounded-lg border border-teal-600/60 transition-colors cursor-pointer font-bold"
                    title={dict.selectLanguageLabel}
                    aria-label={dict.selectLanguageLabel}
                    aria-expanded={isLangDropdownOpen}
                  >
                    <Globe className="w-3.5 h-3.5 text-teal-200" />
                    <span className="uppercase text-[11px]">{locale}</span>
                  </button>

                  {isLangDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-2xl border border-slate-200/90 z-50 py-1 text-slate-800 animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto">
                      <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        {dict.selectLanguageLabel}
                      </div>
                      {SUPPORTED_LOCALES.map((option) => {
                        const isSelected = option.code === locale;
                        return (
                          <button
                            key={option.code}
                            type="button"
                            onClick={() => {
                              setLocale(option.code);
                              setIsLangDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full text-left px-2.5 py-1.5 text-xs flex items-center justify-between hover:bg-teal-50 hover:text-[#005f56] transition-colors cursor-pointer",
                              isSelected && "bg-teal-50/80 text-[#005f56] font-bold"
                            )}
                          >
                            <span>{option.nativeLabel}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#005f56]" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {chatHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-teal-100 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white cursor-pointer"
                    title={dict.clearHistory}
                    aria-label={dict.clearHistory}
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-teal-100 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white cursor-pointer"
                  title={dict.closeDialog}
                  aria-label={dict.closeDialog}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3 flex-1 text-xs sm:text-sm bg-slate-50/60">
              {/* Quick Language Selector Bar */}
              <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-2xs space-y-1.5">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#005f56]" />
                    <span>{dict.selectLanguageLabel}</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">8 Languages</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {SUPPORTED_LOCALES.map((option) => {
                    const isSelected = option.code === locale;
                    return (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => setLocale(option.code)}
                        className={cn(
                          "text-[11px] px-2 py-0.5 rounded-lg font-semibold transition-all cursor-pointer border",
                          isSelected
                            ? "bg-[#005f56] text-white border-[#005f56] shadow-2xs ring-1 ring-[#005f56]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50 hover:border-teal-300 hover:text-[#005f56]"
                        )}
                      >
                        {option.nativeLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Disclaimer Notice */}
              <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 leading-relaxed shadow-2xs">
                <strong>{dict.noticePrefix}</strong> {dict.noticeText}{" "}
                <a
                  href="https://epfigms.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline inline-flex items-center gap-0.5 text-amber-950 hover:text-amber-800"
                >
                  {dict.noticeLinkText} <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                </a>.
              </div>

              {/* Intro message */}
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#005f56] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] shadow-2xs" aria-hidden="true">
                  PF
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-xs p-3 shadow-2xs text-slate-800 space-y-1 max-w-[88%]">
                  <p className="font-medium leading-snug">
                    {dict.greeting}
                  </p>
                </div>
              </div>

              {/* Chat History */}
              {chatHistory.map((item) => (
                <div key={item.id} className="space-y-3">
                  {/* User query */}
                  <div className="flex items-start justify-end gap-2">
                    <div className="bg-[#005f56] text-white rounded-2xl rounded-tr-xs p-3 shadow-2xs max-w-[85%] font-medium text-xs sm:text-sm">
                      {item.question}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Assistant response */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#005f56] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] shadow-2xs" aria-hidden="true">
                      PF
                    </div>
                    <div className="bg-white border border-teal-100 rounded-2xl rounded-tl-xs p-3.5 shadow-2xs text-slate-900 space-y-2 max-w-[88%] leading-relaxed">
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{item.answer}</p>
                      <div className="text-[10px] text-slate-500 font-mono border-t border-slate-100 pt-1.5">
                        {dict.refPrefix} {item.officialRef}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ Questions List */}
              <div className="pt-1 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {dict.commonTopicsLabel}
                </div>
                <div className="flex flex-col gap-2">
                  {faqData.map((faq) => (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => handleSelectQuestion(faq)}
                      className={cn(
                        "text-left p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer focus:ring-2 focus:ring-[#005f56] focus:outline-none",
                        selectedFAQ?.id === faq.id
                          ? "bg-teal-50 border-teal-400 text-[#005f56] shadow-2xs font-semibold"
                          : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[#005f56] font-bold" aria-hidden="true">•</span>
                        <span>{faq.question}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with escalation link */}
            <div className="bg-slate-100 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 shrink-0 rounded-b-2xl">
              <span>{dict.stillHaveQuestions}</span>
              <Link
                href="/contact"
                onClick={handleClose}
                className="font-semibold text-[#005f56] hover:text-[#004742] inline-flex items-center gap-1"
              >
                <LifeBuoy className="w-3 h-3 text-[#005f56]" aria-hidden="true" /> {dict.contactSupport}
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
