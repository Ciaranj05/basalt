"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { safeInternalPath } from "./redirects";

type LoginResult =
  | { ok: true; destination: string }
  | { ok: false; message: string };

type RoleRow = {
  role: string;
};

type ClubRow = {
  slug: string;
};

function isBasaltRole(role: string) {
  return role === "basalt_super_admin" || role === "basalt_analyst";
}

export async function resolveBrowserLoginDestination(
  supabase: SupabaseClient,
  userId: string,
  requestedNext: string,
) {
  const safeNext = safeInternalPath(requestedNext);
  if (safeNext !== "/clubs") return safeNext;

  const { data: roles, error: rolesError } = await supabase
    .from("global_roles")
    .select("role")
    .eq("user_id", userId);

  if (rolesError) throw rolesError;
  if (((roles ?? []) as RoleRow[]).some((row) => isBasaltRole(row.role))) {
    return "/admin";
  }

  const { data: clubs, error: clubsError } = await supabase
    .from("clubs")
    .select("slug")
    .order("name", { ascending: true });

  if (clubsError) throw clubsError;

  const clubRows = (clubs ?? []) as ClubRow[];
  if (clubRows.length === 1) return `/clubs/${clubRows[0].slug}`;
  return "/clubs";
}

export async function signInAndResolveDestination({
  email,
  password,
  nextPath,
}: {
  email: string;
  password: string;
  nextPath: string;
}): Promise<LoginResult> {
  const supabase = createSupabaseBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { ok: false, message: "Unable to sign in with those details." };
  }

  const destination = await resolveBrowserLoginDestination(
    supabase,
    data.user.id,
    nextPath,
  );

  return { ok: true, destination };
}

export function navigateAfterLogin(destination: string) {
  window.location.assign(destination);
}
