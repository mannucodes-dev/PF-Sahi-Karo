# Google Stitch / UI Generator Prompt: PF Sahi Karo

Use the high-fidelity prompt below in **Google Stitch**, **v0.dev**, or any AI design prototyping tool to generate or enhance screens for **PF Sahi Karo**.

---

## 🎨 Master Prompt for Google Stitch / v0

```markdown
Design a world-class, citizen-centric civic tech web platform named "PF Sahi Karo" (Provident Fund Made Simple), dedicated to solving India's 34% EPFO claim rejection crisis for 29+ crore organized sector workers. 

### Visual Identity & Design System:
- Typography: Clean, highly accessible modern sans-serif (Plus Jakarta Sans or Inter) with minimum 16px body font and generous line-height (1.6) so Indic/Devanagari scripts and diacritics render crisply without clipping. Font-mono (JetBrains Mono) for UAN numbers, claim reference IDs, IFSC codes, and currency figures.
- Color Palette:
  * Primary: Deep Trust Teal / Forest Green (#0f766e, #115e59, #134e4a) evoking official financial security and trust.
  * Secondary / Accent: Warm Golden Amber (#f59e0b, #d97706) for interactive warnings, judge highlights, and TDS tax notices.
  * Status Red: Warm Crimson Rose (#e11d48, #be123c) for rejected claim highlights and action-required alerts (never aggressive pure red).
  * Status Green: Crisp Emerald (#059669) for settled claims and verified credentials.
  * Backgrounds: Warm off-white / slate (#f8fafc) with clean glassmorphic cards and subtle border contrasts (#e2e8f0).
- Accessibility: Strictly WCAG 2.1 AA compliant. Minimum 44x44px touch targets, clear 3:1 focus rings for keyboard navigation, high-contrast text ratios (>4.5:1), and zero ambiguous iconography.

### Core Screens to Include in the Flow:

1. GLOBAL HEADER & LANGUAGE BAR:
- Prominent logo: A modern shielded checkmark in deep teal.
- Title: "PF Sahi Karo" with subtitle "EPFO Claim Rejection Decoder".
- Accessible Multi-Language Switcher: Supporting 8 Indian languages (English, हिन्दी, मराठी, தமிழ், తెలుగు, ಕನ್ನಡ, ગુજરાતી, বাংলা) with native-script labels and region badges.
- Quick navigation links: "Instant Decoder", "TDS Tax Calculator", "Office Directory", "Rules & FAQ".
- Prominent "⚡ Judge Demo" pill button in warm amber for 1-click evaluation.

2. HERO SECTION & CIVIC IMPACT METRICS:
- Compelling headline: "Claim Rejected by EPFO? We Decode Why and Help You Fix It."
- Metric cards: "29+ Crore Active Members", "34% National Rejection Rate (1.1 Cr+ Claims/Year)", "₹0 Free Public Service".
- Two primary CTAs: "Decode Rejection Notice" (Deep Teal) and "⚡ Judge Demo Evaluation" (Amber).

3. INSTANT PUBLIC REJECTION DECODER (No Login Needed):
- Interactive selector allowing users to choose or search cryptic official EPFO remarks (e.g. "NAME MISMATCH IN AADHAAR VS MEMBER PORTAL", "MEMBER DETAILS INCOMPLETE / KYC PENDING", "NEFT REJECTED / BANK ACCOUNT INACTIVE", "DATE OF EXIT MISSING", "UAN-AADHAAR UNLINKED").
- Two-column contrast display:
  * Left card: "What EPFO Said" showing raw bureaucratic notice in terminal-style monospace with a red badge.
  * Right card: "What It Actually Means" in warm plain language.
- Responsibility breakdown tabs: "What You (Citizen) Must Do" vs "What Your Employer / HR Must Do".
- Step-by-step numbered resolution pathway with official EPFO circular citation.
- 1-click button: "📲 Copy Ready-to-Send Action Plan for Company HR" (copies a pre-formatted polite message with employee details to forward via WhatsApp).

4. SECTION 192A PF TDS TAX CALCULATOR:
- Interactive financial tool simulating Section 192A Income Tax TDS deductions.
- Sliders for "Withdrawal Amount" (₹10,000 to ₹10,00,000) and "Continuous Service Duration" (< 5 years vs >= 5 years).
- PAN Card Submitted Toggle and Form 15G Submitted Toggle.
- Real-time calculation card showing: Gross Claim Amount, Applicable TDS Rate (0%, 20%, or 30%), and Final Bank Disbursement.
- Clear tax-saving warning box explaining how submitting Form 15G before claim submission saves hard-earned money.

5. REGIONAL EPFO FIELD OFFICE & PRO DIRECTORY:
- Searchable city and state filter (Bengaluru, Delhi, Mumbai, Hyderabad, Pune, Chennai, Ahmedabad, Kolkata).
- Office cards showing Office Name, Jurisdiction, Address, PRO Name, and direct escalation email/phone.
- Direct external link to register formal grievance on EPFiGMS (epfigms.gov.in).

6. MEMBER DASHBOARD (Logged In as Suresh Kumar):
- Profile banner showing "Verified Member Account", Namaste greeting, masked UAN (••••••••7890), and linked bank account (••••4821).
- Large PF balance card showing estimated balance ₹1,84,320 synchronized with passbook.
- Claims list displaying:
  * Form 19 (Final Settlement): Highlighted with a crimson border, pulsing "Action Required" badge, and prominent "See Why & Fix →" button.
  * Form 31 (Medical Advance): Settled with green badge, showing disbursed NEFT details.
  * Form 10C (Pension Withdrawal): In progress with amber review badge.

7. GUIDED RESUBMISSION CHECKLIST & VERIFICATION:
- Dedicated workflow for resubmitting the rejected Form 19 claim.
- Summary of the root cause fix (Aadhaar name mismatch).
- Two mandatory citizen verification checkboxes (confirming portal profile update and active bank account).
- Drag-and-drop supporting document upload zone (PDF, PNG, JPG under 5MB).
- Review and dispatch button triggering a green success confirmation screen with an official tracking Reference ID (e.g. `PF-RESUB-2026-89421`) and 15-working-day review timeline.
```

---

## 🛠️ How to Connect Google Stitch to this Codebase via MCP

If you have access to the Google Stitch MCP server or export tool:
1. **Generate UI**: Paste the prompt above into Google Stitch and generate the layout components.
2. **Export React / Tailwind Code**: Download or export the `.tsx` components and CSS variables.
3. **Map Components**:
   - `components/rejection-search-tool.tsx` -> Stitch Decoder Tool
   - `components/pf-tax-calculator.tsx` -> Stitch Tax Tool
   - `components/epfo-office-locator.tsx` -> Stitch Directory Tool
   - `app/dashboard/page.tsx` -> Stitch Dashboard
   - `app/claims/[id]/page.tsx` -> Stitch Claim Detail & Resolution
4. **Preserve Logic**: Keep the existing Next.js App Router hooks (`useTranslation`, Server Actions, and `getServerTranslation`).
