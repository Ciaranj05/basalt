import { getAppUrl } from "@/lib/supabase/config";

const allowedInternalPrefixes = [
  "/clubs",
  "/admin",
  "/login",
  "/contact",
  "/accept-invite",
  "/update-password",
  "/auth/callback",
  "/",
];

export function safeInternalPath(value: FormDataEntryValue | string | null | undefined) {
  if (typeof value !== "string" || !value.startsWith("/")) return "/clubs";
  if (value.startsWith("//")) return "/clubs";

  try {
    const parsed = new URL(value, getAppUrl());
    if (parsed.origin !== getAppUrl()) return "/clubs";
    const path = `${parsed.pathname}${parsed.search}`;
    return allowedInternalPrefixes.some((prefix) => parsed.pathname === prefix || parsed.pathname.startsWith(`${prefix}/`))
      ? path
      : "/clubs";
  } catch {
    return "/clubs";
  }
}

export function buildAuthRedirect(path: string) {
  return `${getAppUrl()}${safeInternalPath(path)}`;
}
