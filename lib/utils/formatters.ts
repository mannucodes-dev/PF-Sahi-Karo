/**
 * Formatting utilities for Indian currency, dates, and localized timelines.
 */

/**
 * Formats an amount into Indian Rupee format (e.g. ₹1,84,320).
 */
export function formatCurrency(amount: number, locale: "en" | "hi" = "en"): string {
  const formatted = amount.toLocaleString(locale === "hi" ? "hi-IN" : "en-IN", {
    maximumFractionDigits: 0,
  });
  return `₹${formatted}`;
}

/**
 * Formats a date string (ISO or YYYY-MM-DD) into citizen-friendly format (e.g. "15 Aug 2026").
 */
export function formatDisplayDate(dateStr?: string | null, locale: "en" | "hi" = "en"): string {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // Fallback for YYYY-MM-DD manually
      const [year, month, day] = dateStr.split("-").map(Number);
      if (year && month && day) {
        const manualDate = new Date(year, month - 1, day);
        return manualDate.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      }
      return dateStr;
    }
    return date.toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Calculates estimated working days excluding Indian standard bank/weekend holidays.
 */
export function getEstimatedResolutionDate(workingDays: number): string {
  const date = new Date();
  let added = 0;
  while (added < workingDays) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      // Exclude Saturday and Sunday
      added++;
    }
  }
  return formatDisplayDate(date.toISOString());
}
