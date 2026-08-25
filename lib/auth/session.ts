import { createClient } from "../supabase/server";
import { isDemoMode } from "../validation/env";

export interface CitizenUser {
  id: string;
  auth_user_id: string;
  full_name: string;
  masked_uan: string;
  masked_bank_account: string;
  locale: "en" | "hi";
  identity_status: string;
  is_demo: boolean;
}

export const DEMO_CITIZEN_PROFILE: CitizenUser = {
  id: "demo-profile-0000-0000-0000-000000000001",
  auth_user_id: "demo-auth-0000-0000-0000-000000000001",
  full_name: "Suresh Kumar",
  masked_uan: "••••••••7890",
  masked_bank_account: "••••4821",
  locale: "en",
  identity_status: "verified",
  is_demo: true,
};

/**
 * Retrieves the currently authenticated citizen user and their profile.
 * In development with DEMO_MODE enabled, returns the labeled demo citizen profile
 * if no active Supabase session is present.
 */
export async function getSessionUser(): Promise<CitizenUser | null> {
  const supabase = await createClient();

  if (!supabase) {
    if (isDemoMode()) {
      return DEMO_CITIZEN_PROFILE;
    }
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    if (isDemoMode()) {
      return DEMO_CITIZEN_PROFILE;
    }
    return null;
  }

  // Fetch the citizen's verified profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    return {
      id: user.id,
      auth_user_id: user.id,
      full_name: user.user_metadata?.full_name || "Citizen Member",
      masked_uan: user.user_metadata?.masked_uan || "••••••••0000",
      masked_bank_account: "••••0000",
      locale: "en",
      identity_status: "unverified",
      is_demo: false,
    };
  }

  return {
    id: profile.id,
    auth_user_id: user.id,
    full_name: profile.full_name,
    masked_uan: profile.masked_uan,
    masked_bank_account: profile.masked_bank_account || "••••0000",
    locale: profile.locale as "en" | "hi",
    identity_status: profile.identity_status,
    is_demo: false,
  };
}
