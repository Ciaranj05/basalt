export type ArcgisMapConfig = {
  portalUrl: string;
  webMapItemId: string;
  source: "map_layers" | "environment";
  title: string;
  description: string;
  reportId: string;
  reportTitle?: string;
  surveyDate: string;
};

export const customerFeatureAttributeAllowlist = [
  "name",
  "title",
  "feature_name",
  "area_type",
  "condition",
  "severity",
  "status",
  "description",
  "survey_date",
  "recommended_action",
  "evidence_attachment",
  "related_report",
] as const;

export function filterCustomerVisibleAttributes(attributes: Record<string, unknown> | null | undefined) {
  if (!attributes) return {};

  const allowed = new Set<string>(customerFeatureAttributeAllowlist);

  return Object.fromEntries(
    Object.entries(attributes)
      .map(([key, value]) => [key.toLowerCase(), value] as const)
      .filter(([key, value]) => allowed.has(key) && value !== null && value !== undefined && value !== ""),
  );
}
