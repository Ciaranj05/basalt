import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseBrowserConfig, hasSupabaseConfig } from "./config";

export async function createSupabaseServerClient() {
  if (!hasSupabaseConfig()) return null;

  const { url, anonKey } = getSupabaseBrowserConfig();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always set cookies; middleware handles refreshes.
        }
      },
    },
  });
}
