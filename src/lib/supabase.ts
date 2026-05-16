import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isConfigured = supabaseUrl && supabaseAnonKey && supabaseAnonKey !== "pon_aqui_tu_anon_key";

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function isSupabaseReady() {
  return isConfigured;
}