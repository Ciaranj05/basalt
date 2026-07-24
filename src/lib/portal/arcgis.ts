import "server-only";

import type { createSupabaseServerClient } from "@/lib/supabase/server";
import { filterCustomerVisibleAttributes, type ArcgisMapConfig } from "./arcgis-shared";
import type { Course, Report } from "./types";

type SupabaseServerClient = NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>;

type ArcgisLayerRow = {
  id: string;
  name: string;
  description: string | null;
  source_file_path: string | null;
  tile_url: string | null;
  report_id: string | null;
};

const defaultPortalUrl = "https://www.arcgis.com";
const webMapItemPattern = /^[a-f0-9]{32}$/i;

function normalisePortalUrl(value: string | null | undefined) {
  const portalUrl = value?.trim() || defaultPortalUrl;

  try {
    const parsed = new URL(portalUrl);
    if (parsed.protocol !== "https:") return defaultPortalUrl;
    return parsed.origin;
  } catch {
    return defaultPortalUrl;
  }
}

function normaliseWebMapItemId(value: string | null | undefined) {
  const itemId = value?.trim();
  if (!itemId || !webMapItemPattern.test(itemId)) return null;
  return itemId;
}

function customerMapDescription(value: string | null | undefined) {
  const fallback = "Explore mapped survey evidence, findings and recommendations across the course.";
  const description = value?.trim();
  if (!description) return fallback;
  if (/arcgis|web map|configuration|database|map_layers|replace before live/i.test(description)) {
    return fallback;
  }
  return description;
}

function configuredClubAllowsMap(clubSlug: string) {
  const allowed = process.env.ARCGIS_POC_CLUB_SLUGS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return !allowed?.length || allowed.includes(clubSlug);
}

export { filterCustomerVisibleAttributes };

export function resolveEnvironmentArcgisConfig({
  clubSlug,
  latestReport,
}: {
  clubSlug: string;
  latestReport: Report | null;
}): ArcgisMapConfig | null {
  if (!latestReport || !configuredClubAllowsMap(clubSlug)) return null;

  const webMapItemId = normaliseWebMapItemId(process.env.ARCGIS_POC_WEBMAP_ITEM_ID);
  if (!webMapItemId) return null;

  return {
    portalUrl: normalisePortalUrl(process.env.ARCGIS_POC_PORTAL_URL),
    webMapItemId,
    source: "environment",
    title: "Approved ArcGIS course map",
    description: "Interactive course intelligence map prepared for customer review.",
    reportId: latestReport.id,
    reportTitle: latestReport.title,
    surveyDate: latestReport.surveyDate,
  };
}

export async function getApprovedArcgisMapConfig({
  supabase,
  clubId,
  clubSlug,
  course,
  latestReport,
}: {
  supabase: SupabaseServerClient;
  clubId: string;
  clubSlug: string;
  course: Course | null;
  latestReport: Report | null;
}) {
  if (!course || !latestReport) {
    return {
      config: null,
      reason: !course ? "no_course" : "no_published_report",
    } as const;
  }

  const { data, error } = await supabase
    .from("map_layers")
    .select("id,name,description,source_file_path,tile_url,report_id")
    .eq("club_id", clubId)
    .eq("course_id", course.id)
    .eq("report_id", latestReport.id)
    .eq("layer_type", "arcgis_webmap")
    .eq("visible_by_default", true)
    .order("display_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  const row = data as ArcgisLayerRow | null;
  const webMapItemId = normaliseWebMapItemId(row?.tile_url);

  if (row && webMapItemId) {
    return {
      config: {
        portalUrl: normalisePortalUrl(row.source_file_path),
        webMapItemId,
        source: "map_layers",
        title: row.name,
        description: customerMapDescription(row.description),
        reportId: latestReport.id,
        reportTitle: latestReport.title,
        surveyDate: latestReport.surveyDate,
      } satisfies ArcgisMapConfig,
      reason: null,
    } as const;
  }

  const environmentConfig = resolveEnvironmentArcgisConfig({ clubSlug, latestReport });
  if (environmentConfig) {
    return {
      config: environmentConfig,
      reason: null,
    } as const;
  }

  return {
    config: null,
    reason: row ? "invalid_webmap_item_id" : "no_approved_map",
  } as const;
}
