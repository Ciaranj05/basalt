import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  CalendarDays,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Download,
  Layers3,
  MapPinned,
  Printer,
  Ruler,
  ShieldCheck,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { ComingSoonButton, PrintReportButton } from "@/components/portal/PortalControls";
import { PortalShell } from "@/components/portal/PortalShell";
import { requireClubMembership } from "@/lib/portal/access";
import {
  getCourseAreas,
  getFindingsForReport,
  getMapLayers,
  getRecommendationsForReport,
  getReportBySlug,
} from "@/lib/portal/data";
import type { CourseArea, Finding, Recommendation, Severity } from "@/lib/portal/types";

export const dynamic = "force-dynamic";

const severityRank: Record<Severity, number> = {
  critical: 5,
  high: 4,
  moderate: 3,
  low: 2,
  information: 1,
};

const severityStyles: Record<Severity, string> = {
  critical: "border-red-300/35 bg-red-300/10 text-red-100",
  high: "border-[#f2d28d]/35 bg-[#f2d28d]/10 text-[#f6dfaa]",
  moderate: "border-[#b8f2d2]/30 bg-[#b8f2d2]/10 text-[#dff4e8]",
  low: "border-sky-200/25 bg-sky-200/10 text-sky-100",
  information: "border-white/14 bg-white/[0.05] text-white/64",
};

function titleCase(value: string) {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function sectionId(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function priorityLabel(severity: Severity) {
  if (severity === "critical") return "Critical";
  if (severity === "high") return "High";
  if (severity === "moderate") return "Medium";
  if (severity === "low") return "Low";
  return "Information";
}

function scoreFromFindings(findings: Finding[]) {
  if (!findings.length) return 92;
  const deduction = findings.reduce((total, finding) => total + severityRank[finding.severity] * 4, 0);
  return Math.max(58, 96 - deduction);
}

function effortForFinding(finding: Finding) {
  if (finding.severity === "critical" || finding.severity === "high") return "Medium";
  if (finding.severity === "moderate") return "Low to medium";
  return "Low";
}

function costRangeForFinding(finding: Finding) {
  if (finding.severity === "critical") return "Capital works";
  if (finding.severity === "high") return "Planned investment";
  if (finding.severity === "moderate") return "Maintenance budget";
  return "Operational allowance";
}

function timeframeForRecommendation(recommendation: Recommendation) {
  const value = recommendation.recommendedTimeframe.toLowerCase();
  if (value.includes("immediate") || value.includes("urgent")) return "Immediate";
  if (value.includes("3") || value.includes("month")) return "3 Months";
  if (value.includes("6")) return "6 Months";
  if (value.includes("12") || value.includes("annual")) return "12 Months";
  if (recommendation.priority.toLowerCase().includes("high")) return "Immediate";
  return "3 Months";
}

function ownerForRecommendation(recommendation: Recommendation) {
  if (recommendation.title.toLowerCase().includes("committee")) return "General Manager";
  if (recommendation.title.toLowerCase().includes("tree")) return "Course Manager";
  return "Head Greenkeeper";
}

function relatedArea(courseAreas: CourseArea[], areaId: string | null) {
  return courseAreas.find((area) => area.id === areaId);
}

function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-white/38">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-xs leading-5 text-white/46">{detail}</p>
    </div>
  );
}

function PriorityPill({ severity }: { severity: Severity }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${severityStyles[severity]}`}>
      {priorityLabel(severity)}
    </span>
  );
}

function EvidencePanel({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-black/18 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/38">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-sm leading-6 text-white/68">{value}</p>
    </div>
  );
}

function ReportVisual({ layerNames }: { layerNames: string[] }) {
  const layers = layerNames.length
    ? layerNames
    : ["Orthomosaic", "Contours", "Slope", "Drainage", "Vegetation", "Surface model"];

  return (
    <section id="course-overview" className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04]">
      <div className="grid gap-0 lg:grid-cols-[1.28fr_0.72fr]">
        <div className="report-map report-golf min-h-[500px] rounded-none border-0">
          <span className="report-grid" />
          <span className="report-route report-route-one" />
          <span className="report-route report-route-two" />
          <span className="report-zone report-zone-one" />
          <span className="report-zone report-zone-two" />
          <span className="report-marker report-marker-one" />
          <span className="report-marker report-marker-two" />
          <div className="absolute left-5 top-5 max-w-xs rounded-[8px] border border-white/12 bg-black/58 p-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a6d8bd]">Course Intelligence Overview</p>
            <p className="mt-3 text-sm leading-6 text-white/68">
              Survey imagery, terrain interpretation and mapped issue zones presented as one decision layer.
            </p>
          </div>
          <div className="absolute bottom-5 right-5 rounded-full border border-white/12 bg-black/58 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/58 backdrop-blur-xl">
            Evidence map
          </div>
        </div>
        <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Layers3 className="size-4 text-[#a6d8bd]" />
            Future layer stack
          </div>
          <div className="mt-4 grid gap-2">
            {layers.slice(0, 7).map((layer, index) => (
              <div key={`${layer}-${index}`} className="flex items-center justify-between rounded-[6px] border border-white/10 bg-black/18 px-3 py-3">
                <span className="text-sm text-white/72">{layer}</span>
                <span className="text-xs text-white/34">Ready</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-white/50">
            GIS and LiDAR layers can slot into this report surface without changing the customer journey.
          </p>
        </aside>
      </div>
    </section>
  );
}

function FindingCard({
  finding,
  recommendation,
  area,
  index,
}: {
  finding: Finding;
  recommendation?: Recommendation;
  area?: CourseArea;
  index: number;
}) {
  return (
    <article className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <PriorityPill severity={finding.severity} />
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/40">
              Finding {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/40">
              {finding.confidence} confidence
            </span>
          </div>
          <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-normal text-white">
            {finding.title}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/62">{finding.description}</p>
        </div>
        <div className="rounded-[8px] border border-white/10 bg-black/18 p-4 lg:w-56">
          <p className="text-xs uppercase tracking-[0.18em] text-white/38">Location</p>
          <p className="mt-2 text-sm font-semibold text-white">{area?.name ?? "Course-wide"}</p>
          <p className="mt-1 text-xs text-white/42">{area ? `${titleCase(area.areaType)} ${area.referenceNumber}` : "Multiple mapped references"}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <EvidencePanel
          label="Evidence"
          value="Mapped against survey imagery, terrain interpretation and course asset records."
          icon={<Camera className="size-4 text-[#a6d8bd]" />}
        />
        <EvidencePanel
          label="Why it matters"
          value="Affects maintenance planning, playability, capital approval or long-term course resilience."
          icon={<AlertTriangle className="size-4 text-[#f2d28d]" />}
        />
        <EvidencePanel
          label="Risk if ignored"
          value={finding.severity === "critical" || finding.severity === "high" ? "Likely to require more disruptive and costly intervention later." : "May reduce visibility of emerging course-condition change."}
          icon={<ShieldCheck className="size-4 text-white/58" />}
        />
      </div>

      <div className="mt-5 grid gap-3 rounded-[8px] border border-[#a6d8bd]/16 bg-[#a6d8bd]/8 p-4 md:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#dff4e8]/54">Recommended action</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-white">{recommendation?.title ?? "Review during next course planning meeting"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#dff4e8]/54">Effort</p>
          <p className="mt-2 text-sm text-white/70">{effortForFinding(finding)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#dff4e8]/54">Cost range</p>
          <p className="mt-2 text-sm text-white/70">{costRangeForFinding(finding)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#dff4e8]/54">Expected improvement</p>
          <p className="mt-2 text-sm text-white/70">Clearer planning evidence and reduced operational uncertainty.</p>
        </div>
      </div>
    </article>
  );
}

function RecommendationTimeline({
  recommendations,
  courseAreas,
}: {
  recommendations: Recommendation[];
  courseAreas: CourseArea[];
}) {
  const groups = ["Immediate", "3 Months", "6 Months", "12 Months"];

  return (
    <section id="recommendations" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Action Plan</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">Recommendations by decision window</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-white/54">
          A committee-friendly plan that turns course intelligence into ownership, timing and value.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {groups.map((group) => {
          const items = recommendations.filter((recommendation) => timeframeForRecommendation(recommendation) === group);
          return (
            <div key={group} className="rounded-[8px] border border-white/10 bg-black/18 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <CalendarDays className="size-4 text-[#a6d8bd]" />
                {group}
              </div>
              <div className="mt-4 grid gap-3">
                {(items.length ? items : recommendations.slice(0, 1)).map((recommendation) => {
                  const area = relatedArea(courseAreas, recommendation.courseAreaId);
                  return (
                    <div key={`${group}-${recommendation.id}`} className="rounded-[6px] border border-white/10 bg-white/[0.04] p-3">
                      <p className="text-sm font-semibold leading-6 text-white">{recommendation.title}</p>
                      <p className="mt-2 text-xs leading-5 text-white/48">{area?.name ?? "Course-wide"} · {titleCase(recommendation.priority)} priority</p>
                      <div className="mt-3 grid gap-2 text-xs text-white/48">
                        <span className="flex items-center gap-2"><UserRound className="size-3.5 text-white/34" /> {ownerForRecommendation(recommendation)}</span>
                        <span className="flex items-center gap-2"><Clock className="size-3.5 text-white/34" /> {recommendation.recommendedTimeframe}</span>
                        <span className="flex items-center gap-2"><Banknote className="size-3.5 text-white/34" /> Planning allowance</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default async function ReportReaderPage({
  params,
}: {
  params: Promise<{ clubSlug: string; reportId: string }>;
}) {
  const { clubSlug, reportId } = await params;
  const { supabase, club, isBasaltStaff } = await requireClubMembership(clubSlug);
  const report = await getReportBySlug({
    supabase,
    clubId: club.id,
    reportId,
    includeInternal: isBasaltStaff,
  });

  if (!report) notFound();

  const [courseAreas, mapLayers, findings, recommendations] = await Promise.all([
    getCourseAreas(supabase, club.id),
    getMapLayers(supabase, club.id, report.courseId, report.id),
    getFindingsForReport(supabase, club.id, report.id),
    getRecommendationsForReport(supabase, club.id, report.id),
  ]);

  const sortedFindings = [...findings].sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);
  const topFindings = sortedFindings.slice(0, 5);
  const overallScore = scoreFromFindings(findings);
  const severityCounts = findings.reduce(
    (counts, finding) => ({ ...counts, [finding.severity]: counts[finding.severity] + 1 }),
    { critical: 0, high: 0, moderate: 0, low: 0, information: 0 } satisfies Record<Severity, number>,
  );
  const openRecommendations = recommendations.filter((recommendation) => recommendation.status !== "completed");
  const visibleNav = [
    "Cover",
    "Executive Summary",
    "Priorities",
    "Course Overview",
    "Findings",
    "Recommendations",
    "Course Areas",
    "Methodology",
    "Appendix",
  ];

  return (
    <PortalShell club={club} active="Reports">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={`/clubs/${club.slug}/reports`} className="inline-flex items-center gap-2 text-sm text-white/52 transition hover:text-white">
          <ArrowLeft className="size-4" />
          Reports
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/42">Report contents</p>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-[#a6d8bd]" />
              </div>
              <nav className="mt-5 grid gap-1" aria-label="Report sections">
                {visibleNav.map((item) => (
                  <a
                    key={item}
                    href={`#${sectionId(item)}`}
                    className="rounded-[6px] px-3 py-2 text-sm text-white/56 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="grid gap-5">
            <section id="cover" className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04]">
              <div className="report-map report-golf min-h-[560px] rounded-none border-0">
                <span className="report-grid" />
                <span className="report-route report-route-one" />
                <span className="report-route report-route-two" />
                <span className="report-zone report-zone-one" />
                <span className="report-zone report-zone-two" />
                <span className="report-marker report-marker-one" />
                <span className="report-marker report-marker-two" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050807] via-[#050807]/54 to-black/12" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#a6d8bd]/24 bg-[#a6d8bd]/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#dff4e8]">
                      Prepared by Basalt
                    </span>
                    <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/54">
                      Survey-grade course intelligence
                    </span>
                    {isBasaltStaff ? (
                      <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/54">
                        {report.status}
                      </span>
                    ) : null}
                  </div>
                  <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-6xl">
                    {report.title}
                  </h1>
                  <p className="mt-3 inline-flex rounded-full border border-white/12 bg-black/28 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/52">
                    Demonstration report — illustrative data
                  </p>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/68">
                    A committee-ready example of how Basalt presents survey evidence, mapped findings and recommended course-improvement priorities.
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    <MetricCard label="Survey date" value={report.surveyDate || "Pending"} detail="Illustrative reporting-cycle date." />
                    <MetricCard label="Survey type" value={titleCase(report.reportType)} detail={`Version ${report.version} report record.`} />
                    <MetricCard label="Survey grade" value="RTK / LiDAR-ready" detail="Professional spatial workflow and evidence model." />
                  </div>
                </div>
              </div>
            </section>

            <section id="executive-summary" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Executive Summary</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">
                    Overall course condition is strong, with focused investment priorities.
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-white/64">{report.summary}</p>
                  <div className="mt-6 rounded-[8px] border border-[#a6d8bd]/18 bg-[#a6d8bd]/8 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#dff4e8]/58">Overall survey score</p>
                    <div className="mt-4 flex items-end gap-3">
                      <span className="text-6xl font-semibold tracking-normal text-white">{overallScore}</span>
                      <span className="pb-2 text-sm text-white/48">/ 100</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/58">
                      Demonstration score derived from finding severity, open recommendations and asset coverage in this example report.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-[8px] border border-white/10 bg-black/18 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Target className="size-4 text-[#a6d8bd]" />
                      Top 5 priorities
                    </div>
                    <div className="mt-4 grid gap-3">
                      {topFindings.map((finding, index) => {
                        const area = relatedArea(courseAreas, finding.courseAreaId);
                        return (
                          <div key={finding.id} className="flex items-start gap-3 rounded-[6px] border border-white/10 bg-white/[0.04] p-3">
                            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#07110d]">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-white">{finding.title}</p>
                              <p className="mt-1 text-xs text-white/42">{area?.name ?? "Course-wide"} · {priorityLabel(finding.severity)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <MetricCard label="Area surveyed" value={`${courseAreas.length} assets`} detail="Course areas in the asset record." />
                    <MetricCard label="Flight duration" value="Mission logged" detail="Example operational metadata retained with survey." />
                    <MetricCard label="Images captured" value="Aerial set" detail="Imagery supports map interpretation." />
                    <MetricCard label="Accuracy achieved" value="Survey-grade" detail="RTK-supported spatial reference." />
                  </div>
                </div>
              </div>
            </section>

            <section id="priorities" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Priority Dashboard</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">Issues by urgency</h2>
                </div>
                <p className="max-w-lg text-sm leading-6 text-white/54">
                  A quick committee view of where attention, budget and planning discussion should be focused.
                </p>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Critical", severityCounts.critical, "Immediate intervention"],
                  ["High", severityCounts.high, "Plan and approve"],
                  ["Medium", severityCounts.moderate, "Monitor and schedule"],
                  ["Low", severityCounts.low + severityCounts.information, "Record and revisit"],
                ].map(([label, count, detail]) => (
                  <div key={label} className="rounded-[8px] border border-white/10 bg-black/18 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/38">{label}</p>
                    <p className="mt-4 text-4xl font-semibold text-white">{count}</p>
                    <p className="mt-3 text-sm leading-6 text-white/50">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <ReportVisual layerNames={mapLayers.map((layer) => layer.name)} />

            {report.sections.filter((section) => section.title !== "Overview").length ? (
              <section id="section-flow" className="grid gap-4">
                {report.sections.filter((section) => section.title !== "Overview").map((section) => (
                  <section
                    key={section.id}
                    id={sectionId(section.title)}
                    className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-white/42">{titleCase(section.moduleType)}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{section.title}</h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-white/62">{section.summary}</p>
                  </section>
                ))}
              </section>
            ) : null}

            <section id="findings" className="grid gap-4">
              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Findings</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">Evidence-led course findings</h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/56">
                  Each finding is structured for a greenkeeping team and committee: location, evidence, risk, confidence and recommended action.
                </p>
              </div>
              {sortedFindings.map((finding, index) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  recommendation={recommendations.find((recommendation) => recommendation.findingId === finding.id)}
                  area={relatedArea(courseAreas, finding.courseAreaId)}
                  index={index}
                />
              ))}
            </section>

            <RecommendationTimeline recommendations={openRecommendations} courseAreas={courseAreas} />

            <section id="course-areas" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Course Areas</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">Course asset record</h2>
                </div>
                <p className="max-w-lg text-sm leading-6 text-white/54">
                  Every reported area becomes a referenceable asset for future maintenance, monitoring and capital planning.
                </p>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {courseAreas.map((area) => {
                  const relatedFindings = findings.filter((finding) => finding.courseAreaId === area.id);
                  const relatedRecommendations = recommendations.filter((recommendation) => recommendation.courseAreaId === area.id);
                  return (
                    <Link
                      key={area.id}
                      href={`/clubs/${club.slug}/course-areas/${area.id}`}
                      className="rounded-[8px] border border-white/10 bg-black/18 p-4 transition hover:bg-white/[0.06]"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                        {titleCase(area.areaType)} · {area.referenceNumber}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-white">{area.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/54">{area.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/44">
                        <span className="rounded-full border border-white/10 px-3 py-1">{relatedFindings.length} findings</span>
                        <span className="rounded-full border border-white/10 px-3 py-1">{relatedRecommendations.length} recommendations</span>
                        <span className="rounded-full border border-white/10 px-3 py-1">Open asset page</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section id="methodology" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Methodology</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">How this survey was interpreted</h2>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-white/56">
                This report uses fictional demonstration data to show the intended Basalt reporting experience. Scores, cost bands, effort estimates, ownership and timelines are illustrative and would be replaced by verified survey and customer data in a live report.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {[
                  ["Drone survey", "Aerial survey captures the course from consistent planned flight paths.", <Camera key="camera" className="size-4 text-[#a6d8bd]" />],
                  ["RTK positioning", "Survey data is spatially referenced for reliable comparison and measurement.", <MapPinned key="map" className="size-4 text-[#a6d8bd]" />],
                  ["LiDAR-ready analysis", "Terrain and surface interpretation are structured for future LiDAR layer ingestion.", <Ruler key="ruler" className="size-4 text-[#a6d8bd]" />],
                  ["Photogrammetry", "Aerial imagery supports visual inspection and orthomosaic-style reporting.", <Layers3 key="layers" className="size-4 text-[#a6d8bd]" />],
                  ["Survey confidence", "Findings are presented with confidence language to support proportionate decisions.", <ShieldCheck key="shield" className="size-4 text-[#a6d8bd]" />],
                  ["Data limitations", "Recommendations should be reviewed with site context, weather history and maintenance records.", <ClipboardCheck key="clip" className="size-4 text-[#a6d8bd]" />],
                ].map(([title, text, icon]) => (
                  <div key={String(title)} className="rounded-[8px] border border-white/10 bg-black/18 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      {icon}
                      {title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-white/54">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="appendix" className="rounded-[8px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#a6d8bd]">Appendix</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-normal text-white">Data references and survey notes</h2>
                  <p className="mt-3 text-sm leading-6 text-white/56">
                    Supporting maps, imagery, media records and survey notes will appear here for live customer reports.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <EvidencePanel label="Mapped layers" value={`${mapLayers.length || 6} layer references prepared for this report.`} icon={<Layers3 className="size-4 text-[#a6d8bd]" />} />
                  <EvidencePanel label="Course assets" value={`${courseAreas.length} course areas connected to the asset record.`} icon={<MapPinned className="size-4 text-[#a6d8bd]" />} />
                  <EvidencePanel label="Open actions" value={`${openRecommendations.length} recommendations require review or planning.`} icon={<CheckCircle2 className="size-4 text-[#a6d8bd]" />} />
                  <EvidencePanel label="Long-term value" value="Annual monitoring can compare change across future reporting cycles." icon={<TrendingUp className="size-4 text-[#a6d8bd]" />} />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 rounded-[8px] border border-[#a6d8bd]/18 bg-[#a6d8bd]/8 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Ready for committee review</p>
                <p className="mt-1 text-sm text-white/54">
                  Use this report to align maintenance, capital planning and long-term course records.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrintReportButton className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white/70">
                  Print view <Printer className="size-4" />
                </PrintReportButton>
                <ComingSoonButton tone="primary" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold">
                  Download PDF <Download className="size-4" />
                </ComingSoonButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PortalShell>
  );
}
