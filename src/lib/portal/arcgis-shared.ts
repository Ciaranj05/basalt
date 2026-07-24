export type ArcgisMapConfig = {
  portalUrl: string;
  webMapItemId: string;
  source: "map_layers" | "environment";
  title: string;
  description: string;
  reportId: string;
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

  return Object.fromEntries(
    customerFeatureAttributeAllowlist
      .filter((key) => Object.prototype.hasOwnProperty.call(attributes, key))
      .map((key) => [key, attributes[key]]),
  );
}
