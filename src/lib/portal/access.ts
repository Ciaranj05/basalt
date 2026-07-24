import "server-only";

import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  canAccessClub,
  canBasaltStaffSeeReport,
  canEditClubRecords,
  canInviteToClub,
  isBasaltRole,
  type Membership,
} from "./security";
import { getClubBySlug, getUserClubCards } from "./data";
import { logPortalWarning } from "./logging";
import type { Club, PortalRole, PortalUser, ReportStatus } from "./types";

type SupabaseServerClient = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string;
  job_title: string | null;
};

type MembershipRow = {
  club_id: string;
  role: PortalRole;
  status: Membership["status"];
};

export async function requireSupabaseClient() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logPortalWarning("supabase_config_missing");
    redirect("/login?error=portal-not-configured");
  }
  return supabase;
}

export async function requireAuthenticatedUser() {
  const supabase = await requireSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return { supabase, user };
}

export async function getCurrentProfile(supabase: SupabaseServerClient, userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,full_name,email,job_title")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const profile = data as ProfileRow;
  return {
    id: profile.id,
    fullName: profile.full_name ?? "Basalt user",
    email: profile.email,
    jobTitle: profile.job_title ?? "",
    role: "club_user" as PortalRole,
  } satisfies PortalUser;
}

export async function getUserGlobalRoles(supabase: SupabaseServerClient, userId: string) {
  const { data, error } = await supabase
    .from("global_roles")
    .select("role")
    .eq("user_id", userId);

  if (error) throw error;
  return ((data ?? []) as Array<{ role: PortalRole }>).map((row) => row.role);
}

export async function getUserMemberships(supabase: SupabaseServerClient, userId: string) {
  const { data, error } = await supabase
    .from("club_memberships")
    .select("club_id,role,status")
    .eq("user_id", userId);

  if (error) throw error;
  return ((data ?? []) as MembershipRow[]).map((row): Membership => ({
    clubId: row.club_id,
    role: row.role,
    status: row.status,
  }));
}

export async function resolveLoginDestination(supabase: SupabaseServerClient, userId: string) {
  const roles = await getUserGlobalRoles(supabase, userId);
  if (roles.some(isBasaltRole)) return "/admin";

  const clubs = await getUserClubCards(supabase, userId);
  if (clubs.length === 1) return `/clubs/${clubs[0].slug}`;
  return "/clubs";
}

export async function requireBasaltRole(allowed: PortalRole[] = ["basalt_super_admin", "basalt_analyst"]) {
  const { supabase, user } = await requireAuthenticatedUser();
  const [profile, globalRoles] = await Promise.all([
    getCurrentProfile(supabase, user.id),
    getUserGlobalRoles(supabase, user.id),
  ]);

  if (!globalRoles.some((role) => allowed.includes(role))) {
    logPortalWarning("admin_access_denied", { userId: user.id });
    notFound();
  }

  return { supabase, user, profile, globalRoles };
}

export async function requireClubMembership(clubSlug: string) {
  const { supabase, user } = await requireAuthenticatedUser();
  const [profile, globalRoles, memberships, club] = await Promise.all([
    getCurrentProfile(supabase, user.id),
    getUserGlobalRoles(supabase, user.id),
    getUserMemberships(supabase, user.id),
    getClubBySlug(supabase, clubSlug),
  ]);

  if (!club) notFound();

  if (!canAccessClub({ memberships, globalRoles, clubId: club.id })) {
    logPortalWarning("club_access_denied", { userId: user.id, clubId: club.id });
    notFound();
  }

  const membership = memberships.find((item) => item.clubId === club.id && item.status === "active");
  return {
    supabase,
    user,
    profile,
    club: { ...club, membershipRole: membership?.role } satisfies Club,
    memberships,
    globalRoles,
    isBasaltStaff: globalRoles.some(isBasaltRole),
  };
}

export function canManageUsersForClub({
  memberships,
  globalRoles,
  clubId,
}: {
  memberships: Membership[];
  globalRoles: PortalRole[];
  clubId: string;
}) {
  return canInviteToClub({ memberships, globalRoles, clubId, targetClubId: clubId });
}

export function canEditReportsForClub({
  memberships,
  globalRoles,
  clubId,
}: {
  memberships: Membership[];
  globalRoles: PortalRole[];
  clubId: string;
}) {
  return canEditClubRecords({ memberships, globalRoles, clubId });
}

export function canViewReportStatus(status: ReportStatus, isBasaltStaff: boolean) {
  if (isBasaltStaff) return canBasaltStaffSeeReport(status);
  return status === "published";
}
