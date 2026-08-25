import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./types";
import { env, isSupabaseConfigured } from "../validation/env";

/**
 * Creates a Supabase client for use in Client Components (Browser).
 * Uses only the public ANON key.
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
