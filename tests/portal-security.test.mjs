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

function canInviteToClub({ globalRoles, clubId, targetClubId }) {
  if (clubId !== targetClubId) return false;
  return globalRoles.some(isBasaltRole);
}

function canClubUserSeeReport(status) {
  return status === "published";
}

function canBasaltStaffSeeReport(status) {
  return ["draft", "internal_review", "published", "archived"].includes(status);
}

function canReadReportLinkedRecord({ memberships, globalRoles, recordClubId, reportClubId, reportStatus }) {
  if (globalRoles.some(isBasaltRole)) return true;
  return (
    recordClubId === reportClubId &&
    reportStatus === "published" &&
    memberships.some(
      (membership) =>
        membership.clubId === recordClubId &&
        membership.status === "active",
    )
  );
}

function safeInternalPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/clubs";
  }
  return value.startsWith("/clubs") || value.startsWith("/admin") || value === "/"
    ? value
    : "/clubs";
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

test("club administrator cannot manage memberships", () => {
  const memberships = [{ clubId: "club-a", role: "club_admin", status: "active" }];
  assert.equal(canInviteToClub({ clubId: "club-a", targetClubId: "club-a", memberships, globalRoles: [] }), false);
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

test("only Basalt roles can manage memberships through the Basalt admin path", () => {
  assert.equal(
    canInviteToClub({
      clubId: "club-a",
      targetClubId: "club-a",
      memberships: [],
      globalRoles: ["basalt_analyst"],
    }),
    true,
  );
  assert.equal(
    canInviteToClub({
      clubId: "club-a",
      targetClubId: "club-a",
      memberships: [],
      globalRoles: ["basalt_super_admin"],
    }),
    true,
  );
});

test("draft and archived reports are hidden from club users", () => {
  assert.equal(canClubUserSeeReport("draft"), false);
  assert.equal(canClubUserSeeReport("internal_review"), false);
  assert.equal(canClubUserSeeReport("published"), true);
  assert.equal(canClubUserSeeReport("archived"), false);
});

test("basalt staff can inspect every report status", () => {
  assert.equal(canBasaltStaffSeeReport("draft"), true);
  assert.equal(canBasaltStaffSeeReport("internal_review"), true);
  assert.equal(canBasaltStaffSeeReport("published"), true);
  assert.equal(canBasaltStaffSeeReport("archived"), true);
});

test("nested report records require matching club and a published report for club users", () => {
  const memberships = [{ clubId: "club-a", role: "club_user", status: "active" }];
  assert.equal(
    canReadReportLinkedRecord({
      memberships,
      globalRoles: [],
      recordClubId: "club-a",
      reportClubId: "club-a",
      reportStatus: "published",
    }),
    true,
  );
  assert.equal(
    canReadReportLinkedRecord({
      memberships,
      globalRoles: [],
      recordClubId: "club-a",
      reportClubId: "club-a",
      reportStatus: "draft",
    }),
    false,
  );
  assert.equal(
    canReadReportLinkedRecord({
      memberships,
      globalRoles: [],
      recordClubId: "club-a",
      reportClubId: "club-b",
      reportStatus: "published",
    }),
    false,
  );
});

test("Basalt staff can inspect nested report records across statuses", () => {
  assert.equal(
    canReadReportLinkedRecord({
      memberships: [],
      globalRoles: ["basalt_analyst"],
      recordClubId: "club-a",
      reportClubId: "club-b",
      reportStatus: "draft",
    }),
    true,
  );
});

test("callback redirects stay internal", () => {
  assert.equal(safeInternalPath("/clubs/north-coast-golf-club"), "/clubs/north-coast-golf-club");
  assert.equal(safeInternalPath("//evil.example"), "/clubs");
  assert.equal(safeInternalPath("https://evil.example/admin"), "/clubs");
  assert.equal(safeInternalPath("/unexpected"), "/clubs");
});
