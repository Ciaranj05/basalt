import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const arcgisResolverSource = fs.readFileSync("src/lib/portal/arcgis.ts", "utf8");
const arcgisSharedSource = fs.readFileSync("src/lib/portal/arcgis-shared.ts", "utf8");
const arcgisComponentSource = fs.readFileSync("src/components/portal/ArcgisCourseMap.tsx", "utf8");
const mapPageSource = fs.readFileSync("src/app/clubs/[clubSlug]/map/page.tsx", "utf8");
const portalShellSource = fs.readFileSync("src/components/portal/PortalShell.tsx", "utf8");
const overviewPageSource = fs.readFileSync("src/app/clubs/[clubSlug]/page.tsx", "utf8");
const reportsPageSource = fs.readFileSync("src/app/clubs/[clubSlug]/reports/page.tsx", "utf8");
const reportDetailSource = fs.readFileSync("src/app/clubs/[clubSlug]/reports/[reportId]/page.tsx", "utf8");
const courseAreasSource = fs.readFileSync("src/app/clubs/[clubSlug]/course-areas/page.tsx", "utf8");
const courseAreaDetailSource = fs.readFileSync("src/app/clubs/[clubSlug]/course-areas/[areaId]/page.tsx", "utf8");

test("Course Map route reuses existing authenticated club membership checks", () => {
  assert.match(mapPageSource, /requireClubMembership\(clubSlug\)/);
  assert.match(mapPageSource, /getCourses\(supabase, club\.id\)/);
  assert.match(mapPageSource, /if \(query\?\.course && !selectedCourse\) notFound\(\)/);
  assert.match(mapPageSource, /getApprovedArcgisMapConfig/);
});

test("Course Map remains out of primary customer navigation", () => {
  assert.doesNotMatch(portalShellSource, /label: "Course Map"/);
  assert.doesNotMatch(portalShellSource, /\/map`/);
});

test("ArcGIS configuration is resolved from approved published context only", () => {
  assert.match(arcgisResolverSource, /\.eq\("club_id", clubId\)/);
  assert.match(arcgisResolverSource, /\.eq\("course_id", course\.id\)/);
  assert.match(arcgisResolverSource, /\.eq\("report_id", latestReport\.id\)/);
  assert.match(arcgisResolverSource, /\.eq\("layer_type", "arcgis_webmap"\)/);
  assert.match(arcgisResolverSource, /\.eq\("visible_by_default", true\)/);
  assert.match(arcgisResolverSource, /if \(!course \|\| !latestReport\)/);
});

test("ArcGIS Web Map item IDs are validated before reaching the client", () => {
  assert.match(arcgisResolverSource, /const webMapItemPattern = \/\^\[a-f0-9\]\{32\}\$\/i/);
  assert.match(arcgisResolverSource, /normaliseWebMapItemId\(row\?\.tile_url\)/);
  assert.match(arcgisResolverSource, /invalid_webmap_item_id/);
});

test("ArcGIS secrets are not exposed to client components", () => {
  assert.doesNotMatch(arcgisComponentSource, /process\.env/);
  assert.doesNotMatch(arcgisComponentSource, /SECRET|CLIENT_SECRET|PASSWORD|ADMIN_TOKEN|SERVICE_ROLE/);
  assert.doesNotMatch(mapPageSource, /NEXT_PUBLIC_ARCGIS|ARCGIS_API_KEY|SECRET|CLIENT_SECRET|PASSWORD|ADMIN_TOKEN/);
});

test("customer feature detail uses an allowlist and excludes raw ArcGIS system fields", () => {
  for (const allowed of [
    "name",
    "area_type",
    "condition",
    "severity",
    "status",
    "description",
    "survey_date",
    "recommended_action",
    "evidence_attachment",
    "related_report",
  ]) {
    assert.match(arcgisSharedSource, new RegExp(`"${allowed}"`));
  }

  for (const internal of ["OBJECTID", "GlobalID", "created_user", "last_edited_user", "Shape__Area"]) {
    assert.doesNotMatch(arcgisSharedSource, new RegExp(`"${internal}"`));
  }

  assert.match(arcgisComponentSource, /filterCustomerVisibleAttributes\(result\.graphic\.attributes\)/);
  assert.match(arcgisSharedSource, /key\.toLowerCase\(\)/);
});

test("ArcGIS map failure renders a safe customer-facing state", () => {
  assert.match(arcgisComponentSource, /We couldn&apos;t load the course map at the moment\./);
  assert.doesNotMatch(arcgisComponentSource, /Web Map item ID|service URL|ArcGIS credentials|API failure code/);
  assert.match(mapPageSource, /Your interactive course map is currently being prepared\./);
});

test("Stage 2 presents ArcGIS as part of the Basalt Golf Intelligence journey", () => {
  assert.match(mapPageSource, /Explore the evidence behind the report\./);
  assert.match(arcgisComponentSource, /Basalt Golf Intelligence/);
  assert.match(arcgisComponentSource, /Report intelligence/);
  assert.match(arcgisComponentSource, /Recommended actions/);
  assert.match(arcgisComponentSource, /Open linked report/);
});

test("mapped evidence entry points are conditional and outside primary navigation", () => {
  for (const source of [
    overviewPageSource,
    reportDetailSource,
    courseAreasSource,
    courseAreaDetailSource,
  ]) {
    assert.match(source, /getApprovedArcgisMapConfig/);
    assert.match(source, /approvedMapConfig/);
  }
  assert.match(reportsPageSource, /getApprovedArcgisMapConfig/);
  assert.match(reportsPageSource, /hasApprovedMap/);

  assert.match(overviewPageSource, /View mapped evidence/);
  assert.match(reportsPageSource, /View map/);
  assert.match(reportDetailSource, /View mapped evidence/);
  assert.match(courseAreasSource, /View mapped areas/);
  assert.match(courseAreaDetailSource, /View on map/);
  assert.doesNotMatch(portalShellSource, /label: "Course Map"/);
});
