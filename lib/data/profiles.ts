import { createClient } from "../supabase/server";
import { Database } from "../supabase/types";
import { isDemoMode } from "../validation/env";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const DEMO_PROFILE: Profile = {
  id: "demo-profile-0000-0000-0000-000000000001",
  auth_user_id: "demo-auth-0000-0000-0000-000000000001",
  full_name: "Suresh Kumar",
  masked_uan: "••••••••7890",
  masked_bank_account: "••••4821",
  identity_status: "verified",
  locale: "en",
  consent_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function getProfileByAuthId(authUserId: string): Promise<Profile | null> {
  const supabase = await createClient();

  if (!supabase) {
    if (isDemoMode()) {
      return DEMO_PROFILE;
    }
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();

  if (error || !data) {
    if (isDemoMode()) {
      return DEMO_PROFILE;
    }
    return null;
  }

  return data;
}

export async function updateProfileLocale(
  profileId: string,
  locale: "en" | "hi"
): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return true;

  const { error } = await supabase
    .from("profiles")
    .update({ locale })
    .eq("id", profileId);

  return !error;
}
