import type { PortalRole, ReportStatus } from "./types";

export type Membership = {
  clubId: string;
  role: PortalRole;
  status: "invited" | "active" | "suspended" | "removed";
};

export function isBasaltRole(role: PortalRole) {
  return role === "basalt_super_admin" || role === "basalt_analyst";
}

export function canAccessClub({
  memberships,
  globalRoles,
  clubId,
}: {
  memberships: Membership[];
  globalRoles: PortalRole[];
  clubId: string;
}) {
  if (globalRoles.some(isBasaltRole)) return true;

  return memberships.some(
    (membership) =>
      membership.clubId === clubId && membership.status === "active",
  );
}

export function canEditClubRecords({
  memberships,
  globalRoles,
  clubId,
}: {
  memberships: Membership[];
  globalRoles: PortalRole[];
  clubId: string;
}) {
  if (globalRoles.some(isBasaltRole)) return true;

  return memberships.some(
    (membership) =>
      membership.clubId === clubId &&
      membership.status === "active" &&
      (membership.role === "club_admin" || membership.role === "club_user"),
  );
}

export function canInviteToClub({
  memberships,
  globalRoles,
  clubId,
  targetClubId,
}: {
  memberships: Membership[];
  globalRoles: PortalRole[];
  clubId: string;
  targetClubId: string;
}) {
  if (clubId !== targetClubId) return false;
  if (globalRoles.some(isBasaltRole)) return true;

  return memberships.some(
    (membership) =>
      membership.clubId === clubId &&
      membership.role === "club_admin" &&
      membership.status === "active",
  );
}

export function canClubUserSeeReport(status: ReportStatus) {
  return status === "published";
}
