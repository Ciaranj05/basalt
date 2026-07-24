import "server-only";

import { createClient } from "@supabase/supabase-js";

function hasSupabaseAdminConfig() {
  return Boolean(
    (process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      (process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY),
  );
}

function getSupabaseAdminConfig() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secretKey) {
    throw new Error("Supabase admin environment variables are not configured.");
  }

  return { url, secretKey };
}

export function createSupabaseAdminClient() {
  if (!hasSupabaseAdminConfig()) return null;

  const { url, secretKey } = getSupabaseAdminConfig();

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
