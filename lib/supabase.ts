import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for form submissions.
 *
 * Uses the SERVICE ROLE key, which bypasses row-level security. Both env vars
 * are server-only on purpose: never prefix them with NEXT_PUBLIC_, and never
 * import this module from a client component. The site has no browser-side
 * Supabase access at all, so the tables stay closed (RLS on, no policies) and
 * writes only ever happen inside a server action.
 *
 * Returns null when the project isn't configured yet, so a form can fall back
 * to email-only delivery instead of failing outright.
 */
let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
