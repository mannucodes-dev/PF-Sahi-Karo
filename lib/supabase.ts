import { createClient } from "@supabase/supabase-js";
import { Claim, RemarkCode, User } from "./mock-data";

// Database schema types for Supabase client
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id"> & { id?: string };
        Update: Partial<User>;
      };
      remark_codes: {
        Row: RemarkCode;
        Insert: RemarkCode;
        Update: Partial<RemarkCode>;
      };
      claims: {
        Row: Claim;
        Insert: Omit<Claim, "id"> & { id?: string };
        Update: Partial<Claim>;
      };
    };
  };
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-project.supabase.co" &&
    supabaseAnonKey !== "your-anon-key"
);

// Supabase client instance (initialized if credentials provided)
export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : null;
