import assert from "node:assert/strict";
import test from "node:test";

function isBasaltRole(role) {
  return role === "basalt_super_admin" || role === "basalt_analyst";
}

function canAccessClub({ memberships, globalRoles, clubId }) {
  if (globalRoles.some(isBasaltRole)) return true;
  return memberships.some(
    (membership) => membership.clubId === clubId && membership.status === "active",
  );
}

function canEditClubRecords({ memberships, globalRoles, clubId }) {
  if (globalRoles.some(isBasaltRole)) return true;
  return memberships.some(
    (membership) =>
      membership.clubId === clubId &&
      membership.status === "active" &&
      (membership.role === "club_admin" || membership.role === "club_user"),
  );
}

function canInviteToClub({ memberships, globalRoles, clubId, targetClubId }) {
  if (clubId !== targetClubId) return false;
  if (globalRoles.some(isBasaltRole)) return true;
  return memberships.some(
    (membership) =>
      membership.clubId === clubId &&
      membership.role === "club_admin" &&
      membership.status === "active",
  );
}

function canClubUserSeeReport(status) {
  return status === "published";
}

test("unauthorised club slug changes do not grant access", () => {
  assert.equal(
    canAccessClub({
      clubId: "club-b",
      globalRoles: [],
      memberships: [{ clubId: "club-a", role: "club_user", status: "active" }],
    }),
    false,
  );
});

test("club user can access their own club", () => {
  assert.equal(
    canAccessClub({
      clubId: "club-a",
      globalRoles: [],
      memberships: [{ clubId: "club-a", role: "club_user", status: "active" }],
    }),
    true,
  );
});

test("read-only committee viewer cannot edit reports", () => {
  assert.equal(
    canEditClubRecords({
      clubId: "club-a",
      globalRoles: [],
      memberships: [{ clubId: "club-a", role: "committee_viewer", status: "active" }],
    }),
    false,
  );
});

test("club administrator can invite only to their own club", () => {
  const memberships = [{ clubId: "club-a", role: "club_admin", status: "active" }];
  assert.equal(canInviteToClub({ clubId: "club-a", targetClubId: "club-a", memberships, globalRoles: [] }), true);
  assert.equal(canInviteToClub({ clubId: "club-a", targetClubId: "club-b", memberships, globalRoles: [] }), false);
});

test("basalt analyst can create draft report records", () => {
  assert.equal(
    canEditClubRecords({
      clubId: "club-a",
      globalRoles: ["basalt_analyst"],
      memberships: [],
    }),
    true,
  );
});

test("draft report hidden and published report visible to club users", () => {
  assert.equal(canClubUserSeeReport("draft"), false);
  assert.equal(canClubUserSeeReport("published"), true);
});
