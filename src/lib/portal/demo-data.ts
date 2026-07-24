import type {
  ActivityItem,
  Club,
  Course,
  CourseArea,
  Finding,
  MapLayer,
  PortalUser,
  Recommendation,
  Report,
  Survey,
} from "./types";

export const demoDisclaimer =
  "Fictional development data for product demonstration. Not a completed client report.";

export const demoUsers: PortalUser[] = [
  {
    id: "user-basalt-analyst",
    fullName: "Maeve Brennan",
    email: "maeve@basaltgolf.com",
    jobTitle: "Basalt Course Analyst",
    role: "basalt_analyst",
  },
  {
    id: "user-club-admin",
    fullName: "James Kerr",
    email: "james.kerr@northcoast.example",
    jobTitle: "General Manager",
    role: "club_admin",
  },
  {
    id: "user-course-manager",
    fullName: "Eoin Walsh",
    email: "eoin.walsh@northcoast.example",
    jobTitle: "Course Manager",
    role: "club_user",
  },
  {
    id: "user-committee",
    fullName: "Sarah Hamilton",
    email: "sarah.hamilton@northcoast.example",
    jobTitle: "Greens Committee",
    role: "committee_viewer",
  },
];

export const demoClub: Club = {
  id: "11111111-1111-4111-8111-111111111111",
  name: "North Coast Golf Club",
  slug: "north-coast-golf-club",
  logoUrl: null,
  coverImageUrl: "/images/basalt-golf-coastal-course.png",
  packageName: "Basalt Complete",
  onboardingStatus: "Demo workspace",
};

export const demoCourse: Course = {
  id: "22222222-2222-4222-8222-222222222222",
  clubId: demoClub.id,
  name: "Championship Links",
  holeCount: 18,
  centreLatitude: 55.204,
  centreLongitude: -6.652,
};

export const demoSurveys: Survey[] = [
  {
    id: "33333333-3333-4333-8333-333333333333",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    surveyName: "2026 Baseline Course Survey",
    surveyDate: "2026-05-14",
    surveyType: "baseline",
    status: "processed",
  },
  {
    id: "33333333-3333-4333-8333-333333333334",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    surveyName: "2025 Monitoring Survey",
    surveyDate: "2025-05-18",
    surveyType: "annual_monitoring",
    status: "processed",
  },
];

export const demoCourseAreas: CourseArea[] = [
  {
    id: "area-green-7",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    areaType: "green",
    name: "Green 7",
    referenceNumber: "G7",
    holeNumber: 7,
    summary: "Subtle rear-to-front slope with drainage observations on the right approach.",
  },
  {
    id: "area-fairway-4",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    areaType: "fairway",
    name: "Fairway 4",
    referenceNumber: "F4",
    holeNumber: 4,
    summary: "Low fairway corridor where surface water is likely to collect after heavy rainfall.",
  },
  {
    id: "area-tee-12",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    areaType: "tee",
    name: "Tee Complex 12",
    referenceNumber: "T12",
    holeNumber: 12,
    summary: "Candidate area for tee levelling and improved access routing.",
  },
  {
    id: "area-bunker-14",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    areaType: "bunker",
    name: "Bunker 14",
    referenceNumber: "B14",
    holeNumber: 14,
    summary: "Measured bunker profile for renovation scope and material planning.",
  },
  {
    id: "area-tree-zone-3",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    areaType: "tree_zone",
    name: "Tree Zone 3",
    referenceNumber: "TZ3",
    holeNumber: 3,
    summary: "Canopy growth is affecting morning light and airflow near the approach.",
  },
];

export const demoReports: Report[] = [
  {
    id: "44444444-4444-4444-8444-444444444444",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    surveyId: demoSurveys[0].id,
    title: "2026 Course Baseline & Monitoring Report",
    slug: "2026-course-baseline",
    reportType: "baseline",
    status: "published",
    summary:
      "The course has a strong long-term digital baseline. Immediate attention is recommended for three drainage-priority areas and two bunker redevelopment scopes.",
    surveyDate: "2026-05-14",
    publishedAt: "2026-06-02",
    version: 1,
    sections: [
      {
        id: "section-overview",
        moduleType: "executive_summary",
        title: "Overview",
        summary:
          "A committee-ready summary of course condition, survey scope and recommended priorities.",
        displayOrder: 1,
      },
      {
        id: "section-greens",
        moduleType: "course_baseline",
        title: "Greens",
        summary:
          "Greens mapping highlights surface shape, surrounding collection areas and inspection priorities.",
        displayOrder: 2,
      },
      {
        id: "section-drainage",
        moduleType: "drainage",
        title: "Water and Drainage",
        summary:
          "Drainage flow layers identify low fairway corridors and likely ponding areas for further design review.",
        displayOrder: 3,
      },
      {
        id: "section-turf",
        moduleType: "turf_health",
        title: "Turf Health",
        summary:
          "Multispectral outputs show relative turf vigour variation and targeted inspection zones.",
        displayOrder: 4,
      },
      {
        id: "section-canopy",
        moduleType: "tree_canopy",
        title: "Trees and Canopy",
        summary:
          "Canopy records support shade, airflow and long-term woodland management discussions.",
        displayOrder: 5,
      },
      {
        id: "section-recommendations",
        moduleType: "recommendations",
        title: "Recommendations",
        summary:
          "Priority actions for drainage, bunker planning, course records and annual monitoring.",
        displayOrder: 6,
      },
    ],
  },
];

export const demoFindings: Finding[] = [
  {
    id: "finding-drainage-4",
    clubId: demoClub.id,
    reportId: demoReports[0].id,
    courseAreaId: "area-fairway-4",
    findingType: "drainage",
    title: "Persistent low corridor on Fairway 4",
    description:
      "Terrain and surface-water layers indicate a fairway corridor likely to collect water after sustained rainfall.",
    severity: "high",
    confidence: "High",
  },
  {
    id: "finding-bunker-14",
    clubId: demoClub.id,
    reportId: demoReports[0].id,
    courseAreaId: "area-bunker-14",
    findingType: "redevelopment",
    title: "Bunker 14 renovation requires measured scope",
    description:
      "Bunker profile and surrounding levels should be used before confirming material volumes and shaping work.",
    severity: "moderate",
    confidence: "Medium",
  },
  {
    id: "finding-canopy-3",
    clubId: demoClub.id,
    reportId: demoReports[0].id,
    courseAreaId: "area-tree-zone-3",
    findingType: "canopy",
    title: "Canopy expansion near Hole 3 approach",
    description:
      "Comparison with the previous survey indicates canopy growth affecting light and airflow near the approach.",
    severity: "low",
    confidence: "Medium",
  },
];

export const demoRecommendations: Recommendation[] = [
  {
    id: "recommendation-drainage-4",
    clubId: demoClub.id,
    reportId: demoReports[0].id,
    findingId: "finding-drainage-4",
    courseAreaId: "area-fairway-4",
    title: "Commission drainage design review for Fairway 4",
    description:
      "Use the terrain and flow layers as evidence for a targeted drainage design discussion.",
    priority: "High",
    recommendedTimeframe: "0-3 months",
    status: "proposed",
  },
  {
    id: "recommendation-bunker-14",
    clubId: demoClub.id,
    reportId: demoReports[0].id,
    findingId: "finding-bunker-14",
    courseAreaId: "area-bunker-14",
    title: "Prepare bunker renovation scope",
    description:
      "Confirm target levels, shaping intent and volume assumptions before tendering works.",
    priority: "Moderate",
    recommendedTimeframe: "3-6 months",
    status: "planned",
  },
  {
    id: "recommendation-archive",
    clubId: demoClub.id,
    reportId: demoReports[0].id,
    findingId: null,
    courseAreaId: null,
    title: "Adopt annual course monitoring",
    description:
      "Repeat the course survey annually to preserve institutional knowledge and support committee reporting.",
    priority: "Moderate",
    recommendedTimeframe: "Annual",
    status: "accepted",
  },
];

export const demoMapLayers: MapLayer[] = [
  {
    id: "layer-orthomosaic",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    reportId: demoReports[0].id,
    name: "Orthomosaic",
    layerType: "orthomosaic",
    description: "High-resolution course image preview.",
    opacity: 1,
    visibleByDefault: true,
  },
  {
    id: "layer-drainage",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    reportId: demoReports[0].id,
    name: "Drainage Flow",
    layerType: "drainage_flow",
    description: "Development placeholder for drainage-flow map tiles.",
    opacity: 0.72,
    visibleByDefault: true,
  },
  {
    id: "layer-turf",
    clubId: demoClub.id,
    courseId: demoCourse.id,
    reportId: demoReports[0].id,
    name: "Turf Vigour",
    layerType: "turf_vigour",
    description: "Development placeholder for relative turf-vigour imagery.",
    opacity: 0.58,
    visibleByDefault: false,
  },
];

export const demoActivity: ActivityItem[] = [
  {
    id: "activity-published",
    clubId: demoClub.id,
    action: "Published baseline report",
    entityType: "report",
    createdAt: "2026-06-02",
  },
  {
    id: "activity-comparison",
    clubId: demoClub.id,
    action: "Added previous survey comparison",
    entityType: "survey",
    createdAt: "2026-05-29",
  },
  {
    id: "activity-invite",
    clubId: demoClub.id,
    action: "Invited greens committee viewer",
    entityType: "membership",
    createdAt: "2026-05-21",
  },
];

export function getDemoClubBySlug(slug: string): Club | null {
  return slug === demoClub.slug ? demoClub : null;
}

export function getDemoReportById(reportId: string): Report | null {
  return demoReports.find((report) => report.id === reportId || report.slug === reportId) ?? null;
}

export function getDemoAreaById(areaId: string): CourseArea | null {
  return demoCourseAreas.find((area) => area.id === areaId) ?? null;
}
