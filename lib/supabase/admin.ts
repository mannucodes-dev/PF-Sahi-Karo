import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";
import { env, isSupabaseConfigured } from "../validation/env";

/**
 * Creates an Administrative Supabase client with the SERVICE ROLE key.
 * 
 * SECURITY RULE:
 * This client bypasses RLS and must ONLY be used in restricted server-side
 * background tasks (e.g. system audit logging, administrative cron jobs).
 * NEVER import or execute this module in client components or browser bundles.
 */
export function createAdminClient() {
  if (!isSupabaseConfigured() || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  return createSupabaseClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
