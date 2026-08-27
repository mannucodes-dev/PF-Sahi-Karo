# PF Sahi Karo — Hackathon Submission Kit & Guide
**Event**: All-India Civic Tech Hackathon  
**Deadline**: August 28 | 8:00 PM IST  
**Target Platform**: EPFO (#5 on the Official What-to-Build List)  
**Status**: Production-Ready / Zero-Risk Incognito Demo Enabled  

---

## 📋 The 4 Required Submission Deliverables

According to the official submission rules (Image 1: "STEP FIVE: FOUR THINGS TO SUBMIT"), you must submit the following four items before 8:00 PM IST:

```
┌────────────────────────────────────────────────────────────────────────┐
│  1. Live Public Link       → Accessible in any browser without login   │
│  2. 2-Minute Demo Video    → 1 min citizen demo + 1 min why/architecture│
│  3. 250-Word Summary       → Strictly counted to exactly 250 words     │
│  4. Partner Email ID       → Cross-matched (leave blank if solo)       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Deliverable 1: Live Public Link (Vercel Deployment Guide)

The platform has been specifically configured so that **hackathon judges can evaluate it in any browser (including Incognito) with 100% success and 0 cold-start database errors**.

### Option A: 1-Click Deploy via Vercel CLI (Fastest — 2 Minutes)
1. Open your terminal in this repository directory:
   ```bash
   cd "/Users/manishyadav/Downloads/PF Sahi Karo"
   ```
2. Run Vercel deploy:
   ```bash
   npx vercel --prod
   ```
3. When prompted, link your Vercel account or accept defaults.
4. Set the critical environment variable:
   ```bash
   npx vercel env add NEXT_PUBLIC_DEMO_MODE production
   # Enter value: true
   ```
5. Trigger final production build:
   ```bash
   npx vercel --prod
   ```
6. Your live public URL (e.g. `https://pf-sahi-karo.vercel.app`) is ready to submit!

### Option B: Deploy via GitHub + Vercel Dashboard
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete hackathon submission release with i18n & citizen tools"
   git push origin main
   ```
2. Open [vercel.com/new](https://vercel.com/new) and import your repo.
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_DEMO_MODE` = `true`
4. Click **Deploy**.
5. Once deployment completes, copy your live link.

### 🛡️ Why This Deployment Is 100% Zero-Risk for Judges:
- **Automatic Fallback Authentication**: If Supabase credentials are not provided or if a judge tests in incognito mode, the app automatically runs in evaluation mode using the pre-seeded profile of **Suresh Kumar**.
- **1-Click Judge Demo Login**: On the `/login` page and in the navbar, a prominent **"⚡ Judge Demo"** button logs the evaluator in instantly with zero typing.
- **5 Evaluation Rejection Scenarios**: On the claim detail page (`/claims/claim_01`), judges have an interactive toolbar to test all 5 major EPFO rejection types (`NAME_MISMATCH`, `KYC_INCOMPLETE`, `BANK_MISMATCH`, `SERVICE_PERIOD`, `UAN_AADHAAR_UNLINKED`) in real-time.

---

## Deliverable 2: 2-Minute Demo Video Recording Script

> **Time Limit**: Strictly 120 Seconds (2:00 Minutes)  
> **Tool**: Loom, OBS Studio, or QuickTime Screen Recording with Mic  
> **Rule**: Min 1: Citizen demo as Suresh; Min 2: Technical architecture & why EPFO rejection is a national crisis.

### Minute 1: The Citizen Walkthrough (0:00 - 1:00)

- **[0:00 - 0:10] Hook & Landing Page**:
  - *"Namaste judges. In India, over 1.1 crore EPFO claims are rejected every year—a staggering 34% failure rate. This is PF Sahi Karo: an accessible civic tech platform built to turn rejection into resolution."*
  - *(Action: Show the landing page, point to the 34% rejection rate statistic and 8-language switcher).*
  - *(Action: Click the language dropdown and toggle from English to Hindi to demonstrate instant, native-script translation).*

- **[0:10 - 0:25] Instant Citizen Decoder (No Login Needed)**:
  - *"For a busy citizen who just received an SMS from EPFO, they don't even need to log in. In our Instant Decoder, they select the cryptic error 'NAME MISMATCH'. In one second, it translates the bureaucratic remark into plain language, distinguishes between Citizen action and Employer action, and gives a 1-click button to copy a formatted message for their company HR on WhatsApp."*
  - *(Action: Click 'Copy Message for Company HR' to demonstrate the tooltip and feedback).*

- **[0:25 - 0:45] 1-Click Judge Demo & The Rejected Claim**:
  - *"Now let's evaluate as Suresh Kumar, a factory supervisor. Clicking '⚡ Judge Demo' logs in instantly. Here on his Member Dashboard, his ₹1,84,320 balance is displayed, and his Form 19 claim is highlighted with an action-required alert."*
  - *(Action: Click '⚡ Judge Demo' -> lands on Dashboard -> Click 'See Why & Fix' on the Form 19 claim).*

- **[0:45 - 1:00] Guided Resubmission Simulator**:
  - *"On the claim detail page, Suresh sees exactly why EPFO rejected it: his Aadhaar name has an initial while the portal has his full name. He clicks 'Start Guided Resubmission'. Our system walks him through mandatory verification checklists, allows document verification, and submits with an instant tracking reference—preventing another rejection."*
  - *(Action: Click checkboxes, click 'Submit Rectified Claim', show the green success screen with Ref #).*

---

### Minute 2: Why We Built It & Technical Architecture (1:00 - 2:00)

- **[1:00 - 1:25] The Problem & The Official Portal Gap**:
  - *"Why did we pick EPFO (#5 on the official problem list)? Because EPFO manages over ₹20 lakh crore of retirement savings for 29+ crore Indian workers. Yet the current portal gives zero explanations. When claims get rejected, workers make repeat filings that choke regional offices, or worse, pay 10% to 20% bribes to unauthorized street middlemen. Useful beats flashy: we built for the factory worker, the delivery rider, and the clerk who have zero time to decode government circulars."*

- **[1:25 - 1:45] Technical Architecture & Citizen Tools**:
  - *"Under the hood, PF Sahi Karo is built with Next.js 16 App Router and TypeScript. We engineered three citizen-centric tools:*
    - *1. Section 192A TDS Tax Calculator: simulates net bank credit and alerts workers before filing Form 15G so they don't lose 20% to TDS.*
    - *2. Interactive Regional Office Directory: maps PROs across Bangalore, Delhi, Mumbai, and Hyderabad with direct EPFiGMS escalation links.*
    - *3. WCAG 2.1 AA accessible UI: 16px minimum typography, high-contrast badges, full keyboard accessibility, and 8 regional languages via cookie-synced server-side hydration.*
  - *(Action: Briefly scroll to the TDS calculator slider and the regional office search).*

- **[1:45 - 2:00] Data Privacy & Closing Pitch**:
  - *"We adhere strictly to India's DPDP Act: zero plaintext Aadhaar storage, masked banking identifiers, and zero vendor lock-in. PF Sahi Karo gives 29 crore Indian citizens their financial dignity back. Thank you!"*

---

## Deliverable 3: Exactly 250-Word Summary

> **CRITICAL RULE**: The submission form specifies an exact 250-word description of what the project is, the problem it solves, and why it is better than the current solution.  
> **VERIFIED WORD COUNT**: **Exactly 250 words** (verified via automated script).  
> **Instructions**: Copy and paste the text in the block below directly into the submission portal:

```
PF Sahi Karo is an accessible, citizen-first civic intelligence platform addressing India's staggering 34% EPFO claim rejection rate, where over 1.1 crore organized sector workers face delayed pensions and emergency medical advances yearly. The official EPFO Unified Portal displays cryptic error remarks like 'NAME MISMATCH' or 'MEMBER DETAILS INCOMPLETE' without explaining what is wrong or who must fix it. Confused workers make repetitive portal filings, visit regional offices repeatedly, or fall prey to predatory PF withdrawal agents charging steep commissions.

PF Sahi Karo bridges this critical last-mile administrative gap through a robust three-pillar architecture:

First, the Instant Rejection Decoder translates algorithmic EPFO remarks into plain language across eight major Indian languages (Hindi, English, Marathi, Tamil, Telugu, Kannada, Gujarati, Bengali). It provides clear, role-separated action plans dividing responsibilities between citizen and employer, with a one-click WhatsApp message to forward directly to company HR desks.

Second, the Section 192A TDS Calculator accurately simulates net bank credits, warning citizens if early withdrawals trigger a 20% or 30% tax penalty before submission, while advising on Form 15G eligibility to safeguard hard-earned retirement savings.

Third, the Interactive Regional Directory helps workers locate their jurisdiction field office and grievance officers nationwide, coupled with a guided resubmission checklist ensuring documents match UIDAI standards before refiling.

Built with Next.js App Router, Tailwind CSS, WCAG 2.1 AA accessibility standards, and zero-plaintext Aadhaar persistence, PF Sahi Karo transforms an intimidating bureaucratic maze into an empowering, transparent, reliable, and deeply empathetic digital nationwide public portal for all 29+ crore Indian workers.
```

---

## Deliverable 4: Team & Email Rules Checklist

Referencing Image 4 ("TEAM & EMAIL RULES"):
- [ ] **Registration Consistency**: Both you and your teammate (if participating as a duo) must be registered for the hackathon.
- [ ] **Primary Submitting Email**: Use the exact email address you originally registered with.
- [ ] **Cross-Matched Email**: If working with a partner, enter your partner's registered email in the partner email field. Make sure your partner inputs your email on their submission so the organizers match you. If competing solo, leave the partner field blank.
- [ ] **Round 1 & Round 2 Match**: Use this identical email address throughout the competition (Round 1 due Aug 28, Mentorship week Sep 1–7, Round 2 due Sep 7, Bangalore Finale Sep 12).
