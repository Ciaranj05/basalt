export type PortalRole =
  | "basalt_super_admin"
  | "basalt_analyst"
  | "club_admin"
  | "club_user"
  | "committee_viewer";

export type ReportStatus = "draft" | "internal_review" | "published" | "archived";

export type Severity = "information" | "low" | "moderate" | "high" | "critical";

export type RecommendationStatus =
  | "proposed"
  | "accepted"
  | "planned"
  | "in_progress"
  | "completed"
  | "deferred";

export type PortalUser = {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  role: PortalRole;
};

export type Club = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  coverImageUrl: string | null;
  packageName: string;
  onboardingStatus: string;
  membershipRole?: PortalRole;
  courseName?: string;
  latestReportTitle?: string | null;
  latestSurveyDate?: string | null;
};

export type Course = {
  id: string;
  clubId: string;
  name: string;
  holeCount: number;
  centreLatitude: number;
  centreLongitude: number;
};

export type CourseArea = {
  id: string;
  clubId: string;
  courseId: string;
  areaType: string;
  name: string;
  referenceNumber: string;
  holeNumber: number | null;
  summary: string;
};

export type Survey = {
  id: string;
  clubId: string;
  courseId: string;
  surveyName: string;
  surveyDate: string;
  surveyType: string;
  status: string;
};

export type ReportSection = {
  id: string;
  moduleType: string;
  title: string;
  summary: string;
  displayOrder: number;
};

export type Report = {
  id: string;
  clubId: string;
  courseId: string;
  surveyId: string;
  title: string;
  slug: string;
  reportType: string;
  status: ReportStatus;
  summary: string;
  surveyDate: string;
  publishedAt: string | null;
  version: number;
  sections: ReportSection[];
};

export type ReportMedia = {
  id: string;
  clubId: string;
  reportId: string;
  courseAreaId: string | null;
  filePath: string;
  mediaType: string;
  caption: string | null;
  capturedAt: string | null;
};

export type Finding = {
  id: string;
  clubId: string;
  reportId: string;
  courseAreaId: string | null;
  findingType: string;
  title: string;
  description: string;
  severity: Severity;
  confidence: string;
};

export type Recommendation = {
  id: string;
  clubId: string;
  reportId: string;
  findingId: string | null;
  courseAreaId: string | null;
  title: string;
  description: string;
  priority: string;
  recommendedTimeframe: string;
  status: RecommendationStatus;
};

export type MapLayer = {
  id: string;
  clubId: string;
  courseId: string;
  reportId: string;
  name: string;
  layerType: string;
  description: string;
  opacity: number;
  visibleByDefault: boolean;
};

export type ActivityItem = {
  id: string;
  clubId: string;
  action: string;
  entityType: string;
  createdAt: string;
};
