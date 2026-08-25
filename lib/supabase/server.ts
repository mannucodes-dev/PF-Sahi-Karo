import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./types";
import { env, isSupabaseConfigured } from "../validation/env";

/**
 * Creates a server-side Supabase client for Server Components,
 * Server Actions, and Route Handlers. Uses secure session cookies.
 */
export async function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  const cookieStore = await cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This is safely handled if middleware refreshes user sessions.
          }
        },
      },
    }
  );
}
