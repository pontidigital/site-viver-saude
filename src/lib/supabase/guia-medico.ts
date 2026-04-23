import { createClient } from "@supabase/supabase-js";

/**
 * Read-only Supabase client for the Guia Médico project.
 * Uses the public anon key — only reads active records (RLS enforced).
 */
export function createGuiaMedicoClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required");
  }

  return createClient(url, key);
}
