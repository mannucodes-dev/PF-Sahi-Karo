import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { formatDisplayDate, formatCurrency, getEstimatedResolutionDate } from "./utils/formatters";
export { maskUan, maskBankAccount, maskAadhaar, redactPii } from "./utils/masking";
