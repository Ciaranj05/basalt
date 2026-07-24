import "server-only";

import type { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ActivityItem,
  Club,
  Course,
  CourseArea,
  Finding,
  MapLayer,
  PortalRole,
  Recommendation,
  Report,
  ReportMedia,
  ReportSection,
} from "./types";

type SupabaseServerClient = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ClubRow = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  cover_image_url: string | null;
  onboarding_status: string;
  packages: { name: string } | null;
};

type MembershipRow = {
  role: PortalRole;
  status: string;
  clubs: ClubRow | null;
};

type CourseRow = {
  id: string;
  club_id: string;
  name: string;
  hole_count: number;
  centre_latitude: number | null;
  centre_longitude: number | null;
};

type ReportRow = {
  id: string;
  club_id: string;
  course_id: string;
  survey_id: string | null;
  title: string;
  slug: string;
  report_type: string;
  status: Report["status"];
  summary: string | null;
  survey_date: string | null;
  published_at: string | null;
  version: number;
};

type ReportSectionRow = {
  id: string;
  module_type: string;
  title: string;
  summary: string | null;
  display_order: number;
};

type CourseAreaRow = {
  id: string;
  club_id: string;
  course_id: string;
  area_type: string;
  name: string;
  reference_number: string | null;
  hole_number: number | null;
  description: string | null;
};

type FindingRow = {
  id: string;
  club_id: string;
  report_id: string;
  course_area_id: string | null;
  finding_type: string;
  title: string;
  description: string | null;
  severity: Finding["severity"];
  confidence: string | null;
};

type RecommendationRow = {
  id: string;
  club_id: string;
  report_id: string;
  finding_id: string | null;
  course_area_id: string | null;
  title: string;
  description: string | null;
  priority: string;
  recommended_timeframe: string | null;
  status: Recommendation["status"];
  completed_at?: string | null;
};

type MapLayerRow = {
  id: string;
  club_id: string;
  course_id: string;
  report_id: string | null;
  name: string;
  layer_type: string;
  description: string | null;
  opacity: number;
  visible_by_default: boolean;
};

type MediaRow = {
  id: string;
  club_id: string;
  report_id: string;
  course_area_id: string | null;
  file_path: string;
  media_type: string;
  caption: string | null;
  captured_at: string | null;
};

type ActivityRow = {
  id: string;
  club_id: string;
  action: string;
  entity_type: string | null;
  created_at: string;
};

type AdminClubRow = {
  id: string;
  name: string;
  slug: string;
  status: string;
  onboarding_status: string;
};

function toClub(row: ClubRow, membershipRole?: PortalRole): Club {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    logoUrl: row.logo_url,
    coverImageUrl: row.cover_image_url,
    packageName: row.packages?.name ?? "Unassigned package",
    onboardingStatus: row.onboarding_status,
    membershipRole,
  };
}

function toCourse(row: CourseRow): Course {
  return {
    id: row.id,
    clubId: row.club_id,
    name: row.name,
    holeCount: row.hole_count,
    centreLatitude: Number(row.centre_latitude ?? 0),
    centreLongitude: Number(row.centre_longitude ?? 0),
  };
}

function toReport(row: ReportRow, sections: ReportSection[] = []): Report {
  return {
    id: row.id,
    clubId: row.club_id,
    courseId: row.course_id,
    surveyId: row.survey_id ?? "",
    title: row.title,
    slug: row.slug,
    reportType: row.report_type,
    status: row.status,
    summary: row.summary ?? "",
    surveyDate: row.survey_date ?? "",
    publishedAt: row.published_at,
    version: row.version,
    sections,
  };
}

function toSection(row: ReportSectionRow): ReportSection {
  return {
    id: row.id,
    moduleType: row.module_type,
    title: row.title,
    summary: row.summary ?? "",
    displayOrder: row.display_order,
  };
}

function toArea(row: CourseAreaRow): CourseArea {
  return {
    id: row.id,
    clubId: row.club_id,
    courseId: row.course_id,
    areaType: row.area_type,
    name: row.name,
    referenceNumber: row.reference_number ?? "",
    holeNumber: row.hole_number,
    summary: row.description ?? "",
  };
}

function toFinding(row: FindingRow): Finding {
  return {
    id: row.id,
    clubId: row.club_id,
    reportId: row.report_id,
    courseAreaId: row.course_area_id,
    findingType: row.finding_type,
    title: row.title,
    description: row.description ?? "",
    severity: row.severity,
    confidence: row.confidence ?? "Unspecified",
  };
}

function toRecommendation(row: RecommendationRow): Recommendation {
  return {
    id: row.id,
    clubId: row.club_id,
    reportId: row.report_id,
    findingId: row.finding_id,
    courseAreaId: row.course_area_id,
    title: row.title,
    description: row.description ?? "",
    priority: row.priority,
    recommendedTimeframe: row.recommended_timeframe ?? "Unspecified",
    status: row.status,
  };
}

function toMapLayer(row: MapLayerRow): MapLayer {
  return {
    id: row.id,
    clubId: row.club_id,
    courseId: row.course_id,
    reportId: row.report_id ?? "",
    name: row.name,
    layerType: row.layer_type,
    description: row.description ?? "",
    opacity: Number(row.opacity),
    visibleByDefault: row.visible_by_default,
  };
}

function toMedia(row: MediaRow): ReportMedia {
  return {
    id: row.id,
    clubId: row.club_id,
    reportId: row.report_id,
    courseAreaId: row.course_area_id,
    filePath: row.file_path,
    mediaType: row.media_type,
    caption: row.caption,
    capturedAt: row.captured_at,
  };
}

export async function getUserClubCards(supabase: SupabaseServerClient, userId: string) {
  const { data, error } = await supabase
    .from("club_memberships")
    .select("role,status,clubs(id,name,slug,logo_url,cover_image_url,onboarding_status,packages(name))")
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) throw error;

  const memberships = (data ?? []) as unknown as MembershipRow[];
  const clubs = memberships
    .filter((membership) => membership.clubs)
    .map((membership) => toClub(membership.clubs as ClubRow, membership.role));

  const enriched = await Promise.all(
    clubs.map(async (club) => {
      const [course, report] = await Promise.all([
        getPrimaryCourse(supabase, club.id),
        getLatestPublishedReport(supabase, club.id),
      ]);

      return {
        ...club,
        courseName: course?.name,
        latestReportTitle: report?.title ?? null,
        latestSurveyDate: report?.surveyDate ?? null,
      };
    }),
  );

  return enriched;
}

export async function getClubBySlug(supabase: SupabaseServerClient, slug: string) {
  const { data, error } = await supabase
    .from("clubs")
    .select("id,name,slug,logo_url,cover_image_url,onboarding_status,packages(name)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return toClub(data as unknown as ClubRow);
}

export async function getPrimaryCourse(supabase: SupabaseServerClient, clubId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("id,club_id,name,hole_count,centre_latitude,centre_longitude")
    .eq("club_id", clubId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? toCourse(data as unknown as CourseRow) : null;
}

export async function getCourses(supabase: SupabaseServerClient, clubId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("id,club_id,name,hole_count,centre_latitude,centre_longitude")
    .eq("club_id", clubId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as unknown as CourseRow[]).map(toCourse);
}

export async function getLatestPublishedReport(supabase: SupabaseServerClient, clubId: string) {
  const { data, error } = await supabase
    .from("reports")
    .select("id,club_id,course_id,survey_id,title,slug,report_type,status,summary,survey_date,published_at,version")
    .eq("club_id", clubId)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? toReport(data as unknown as ReportRow) : null;
}

export async function getReportsForClub({
  supabase,
  clubId,
  includeInternal,
}: {
  supabase: SupabaseServerClient;
  clubId: string;
  includeInternal: boolean;
}) {
  let query = supabase
    .from("reports")
    .select("id,club_id,course_id,survey_id,title,slug,report_type,status,summary,survey_date,published_at,version")
    .eq("club_id", clubId)
    .order("survey_date", { ascending: false });

  if (!includeInternal) {
    query = query.eq("status", "published");
  }

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as unknown as ReportRow[]).map((row) => toReport(row));
}

export async function getReportBySlug({
  supabase,
  clubId,
  reportId,
  includeInternal,
}: {
  supabase: SupabaseServerClient;
  clubId: string;
  reportId: string;
  includeInternal: boolean;
}) {
  let query = supabase
    .from("reports")
    .select("id,club_id,course_id,survey_id,title,slug,report_type,status,summary,survey_date,published_at,version")
    .eq("club_id", clubId);

  query = uuidPattern.test(reportId)
    ? query.or(`slug.eq.${reportId},id.eq.${reportId}`)
    : query.eq("slug", reportId);

  if (!includeInternal) query = query.eq("status", "published");

  const { data, error } = await query.limit(1).maybeSingle();
  if (error) throw error;
  if (!data) return null;

  const report = toReport(data as unknown as ReportRow);
  const sections = await getReportSections(supabase, clubId, report.id, includeInternal);
  return { ...report, sections };
}

export async function getReportSections(
  supabase: SupabaseServerClient,
  clubId: string,
  reportId: string,
  includeInternal: boolean,
) {
  let query = supabase
    .from("report_sections")
    .select("id,module_type,title,summary,display_order")
    .eq("club_id", clubId)
    .eq("report_id", reportId)
    .order("display_order", { ascending: true });

  if (!includeInternal) query = query.eq("visible_to_client", true);

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as unknown as ReportSectionRow[]).map(toSection);
}

export async function getCourseAreas(supabase: SupabaseServerClient, clubId: string) {
  const { data, error } = await supabase
    .from("course_areas")
    .select("id,club_id,course_id,area_type,name,reference_number,hole_number,description")
    .eq("club_id", clubId)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as unknown as CourseAreaRow[]).map(toArea);
}

export async function getCourseAreaById(
  supabase: SupabaseServerClient,
  clubId: string,
  areaId: string,
) {
  const { data, error } = await supabase
    .from("course_areas")
    .select("id,club_id,course_id,area_type,name,reference_number,hole_number,description")
    .eq("club_id", clubId)
    .eq("id", areaId)
    .maybeSingle();

  if (error) throw error;
  return data ? toArea(data as unknown as CourseAreaRow) : null;
}

export async function getFindingsForReport(supabase: SupabaseServerClient, clubId: string, reportId: string) {
  const { data, error } = await supabase
    .from("findings")
    .select("id,club_id,report_id,course_area_id,finding_type,title,description,severity,confidence")
    .eq("club_id", clubId)
    .eq("report_id", reportId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as unknown as FindingRow[]).map(toFinding);
}

export async function getRecommendationsForReport(
  supabase: SupabaseServerClient,
  clubId: string,
  reportId: string,
) {
  const { data, error } = await supabase
    .from("recommendations")
    .select("id,club_id,report_id,finding_id,course_area_id,title,description,priority,recommended_timeframe,status,completed_at")
    .eq("club_id", clubId)
    .eq("report_id", reportId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as unknown as RecommendationRow[]).map(toRecommendation);
}

export async function getMapLayers(supabase: SupabaseServerClient, clubId: string, courseId: string, reportId?: string) {
  let query = supabase
    .from("map_layers")
    .select("id,club_id,course_id,report_id,name,layer_type,description,opacity,visible_by_default")
    .eq("club_id", clubId)
    .eq("course_id", courseId)
    .order("display_order", { ascending: true });

  if (reportId) query = query.eq("report_id", reportId);

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as unknown as MapLayerRow[]).map(toMapLayer);
}

export async function getReportMedia(supabase: SupabaseServerClient, clubId: string, reportId: string) {
  const { data, error } = await supabase
    .from("report_media")
    .select("id,club_id,report_id,course_area_id,file_path,media_type,caption,captured_at")
    .eq("club_id", clubId)
    .eq("report_id", reportId)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as unknown as MediaRow[]).map(toMedia);
}

export async function getRecentActivity(supabase: SupabaseServerClient, clubId: string) {
  const { data, error } = await supabase
    .from("activity_log")
    .select("id,club_id,action,entity_type,created_at")
    .eq("club_id", clubId)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return ((data ?? []) as unknown as ActivityRow[]).map((row): ActivityItem => ({
    id: row.id,
    clubId: row.club_id,
    action: row.action,
    entityType: row.entity_type ?? "unknown",
    createdAt: row.created_at.slice(0, 10),
  }));
}

export async function getAdminClubs(supabase: SupabaseServerClient) {
  const { data, error } = await supabase
    .from("clubs")
    .select("id,name,slug,status,onboarding_status")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AdminClubRow[];
}

export async function getAdminReports(supabase: SupabaseServerClient) {
  const { data, error } = await supabase
    .from("reports")
    .select("id,club_id,course_id,survey_id,title,slug,report_type,status,summary,survey_date,published_at,version,clubs(slug,name)")
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) throw error;
  return ((data ?? []) as unknown as Array<ReportRow & { clubs: { slug: string; name: string } | null }>).map((row) => ({
    ...toReport(row),
    clubSlug: row.clubs?.slug ?? "",
    clubName: row.clubs?.name ?? "Unknown club",
  }));
}

export async function getAdminMetrics(supabase: SupabaseServerClient) {
  const [clubs, reports, invitations] = await Promise.all([
    supabase.from("clubs").select("id,status", { count: "exact", head: false }),
    supabase.from("reports").select("id,status,published_at", { count: "exact", head: false }),
    supabase.from("club_memberships").select("id,status", { count: "exact", head: false }).eq("status", "invited"),
  ]);

  if (clubs.error) throw clubs.error;
  if (reports.error) throw reports.error;
  if (invitations.error) throw invitations.error;

  const clubRows = (clubs.data ?? []) as Array<{ status: string }>;
  const reportRows = (reports.data ?? []) as Array<{ status: string; published_at: string | null }>;

  return {
    activeClubs: clubRows.filter((club) => club.status === "active").length,
    onboardingClubs: clubRows.filter((club) => club.status === "onboarding").length,
    draftReports: reportRows.filter((report) => report.status === "draft").length,
    reviewReports: reportRows.filter((report) => report.status === "internal_review").length,
    publishedReports: reportRows.filter((report) => report.status === "published").length,
    outstandingInvitations: invitations.count ?? 0,
  };
}

export async function getAdminActivity(supabase: SupabaseServerClient) {
  const { data, error } = await supabase
    .from("activity_log")
    .select("id,club_id,action,entity_type,created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) throw error;
  return ((data ?? []) as unknown as ActivityRow[]).map((row): ActivityItem => ({
    id: row.id,
    clubId: row.club_id,
    action: row.action,
    entityType: row.entity_type ?? "unknown",
    createdAt: row.created_at.slice(0, 10),
  }));
}
