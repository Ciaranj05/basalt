"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Layers3, MapPinned, Maximize2, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { filterCustomerVisibleAttributes, type ArcgisMapConfig } from "@/lib/portal/arcgis-shared";

type SelectedFeature = {
  title: string;
  layerTitle: string;
  attributes: Record<string, unknown>;
};

type HitResult = {
  graphic?: {
    attributes?: Record<string, unknown>;
    layer?: {
      title?: string | null;
    } | null;
  };
};

type IntelligenceItem = {
  id: string;
  title: string;
  meta: string;
};

type ArcgisView = {
  destroy: () => void;
  hitTest: (event: unknown) => Promise<{ results: unknown[] }>;
  on: (name: "click", handler: (event: unknown) => void) => void;
  ui: {
    add: (widget: unknown, position: string) => void;
  };
  when: () => Promise<unknown>;
};

export function ArcgisCourseMap({
  config,
  courseName,
  reportHref,
  findings = [],
  recommendations = [],
  areaCount = 0,
}: {
  config: ArcgisMapConfig;
  courseName: string;
  reportHref?: string;
  findings?: IntelligenceItem[];
  recommendations?: IntelligenceItem[];
  areaCount?: number;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);

  useEffect(() => {
    let cancelled = false;
    let view: ArcgisView | null = null;

    async function initialiseMap() {
      try {
        const [{ default: esriConfig }, { default: WebMap }, { default: MapView }, { default: Legend }, { default: LayerList }] =
          await Promise.all([
            import("@arcgis/core/config.js"),
            import("@arcgis/core/WebMap.js"),
            import("@arcgis/core/views/MapView.js"),
            import("@arcgis/core/widgets/Legend.js"),
            import("@arcgis/core/widgets/LayerList.js"),
          ]);

        if (cancelled || !mapContainerRef.current) return;

        esriConfig.portalUrl = config.portalUrl;

        const webMap = new WebMap({
          portalItem: {
            id: config.webMapItemId,
          },
        });

        const createdView = new MapView({
          container: mapContainerRef.current,
          map: webMap,
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          popup: {
            dockEnabled: false,
            defaultPopupTemplateEnabled: false,
          },
        });
        view = createdView as ArcgisView;

        const legend = new Legend({ view: createdView });
        const layerList = new LayerList({ view: createdView });

        view.ui.add(layerList, "top-right");
        view.ui.add(legend, "bottom-left");

        view.on("click", async (event: unknown) => {
          if (!view) return;

          const hit = await view.hitTest(event);
          const result = (hit.results as HitResult[]).find((item) => item.graphic?.attributes);

          if (!result?.graphic?.attributes) {
            setSelectedFeature(null);
            return;
          }

          const safeAttributes = filterCustomerVisibleAttributes(result.graphic.attributes);
          const title =
            String(safeAttributes.name ?? safeAttributes.title ?? safeAttributes.feature_name ?? "Mapped feature");

          setSelectedFeature({
            title,
            layerTitle: result.graphic.layer?.title ?? "Course intelligence layer",
            attributes: safeAttributes,
          });
        });

        await view.when();
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void initialiseMap();

    return () => {
      cancelled = true;
      view?.destroy();
    };
  }, [config.portalUrl, config.webMapItemId]);

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#d9dfd7] bg-white shadow-[0_20px_80px_rgba(45,62,53,0.12)]">
      <div className="flex flex-col gap-4 border-b border-[#e1e5df] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#51745f]">Basalt Golf Intelligence</p>
          <h2 className="mt-2 text-xl font-semibold text-[#102019]">{config.title || courseName}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#65736a]">{config.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-[#65736a]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dfd7] bg-[#fbfaf5] px-3 py-1">
            <MapPinned className="size-3.5 text-[#51745f]" />
            {config.surveyDate || "Published survey"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d9dfd7] bg-[#fbfaf5] px-3 py-1">
            <Layers3 className="size-3.5 text-[#51745f]" />
            {areaCount ? `${areaCount} course areas` : "Basalt view"}
          </span>
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="relative min-h-[58vh] min-w-0 bg-[#07110d] sm:min-h-[62vh]" data-testid="arcgis-map-shell">
          <div ref={mapContainerRef} className="absolute inset-0" aria-label="Interactive course map" />
          {status === "loading" ? (
            <div className="absolute inset-0 grid place-items-center bg-[#07110d]">
              <div className="w-full max-w-xs px-6 text-center">
                <div className="mx-auto size-10 animate-pulse rounded-full border border-[#a6d8bd]/28 bg-[#a6d8bd]/10" />
                <p className="mt-4 text-sm font-semibold text-white">Preparing course map</p>
                <p className="mt-2 text-xs leading-5 text-white/48">
                  Loading mapped survey evidence for this course.
                </p>
              </div>
            </div>
          ) : null}
          {status === "error" ? (
            <div className="absolute inset-0 grid place-items-center bg-[#07110d] p-5">
              <div className="max-w-md rounded-[8px] border border-white/10 bg-white/[0.04] p-5 text-center">
                <AlertTriangle className="mx-auto size-6 text-[#f2d28d]" />
                <h3 className="mt-4 text-lg font-semibold text-white">We couldn&apos;t load the course map at the moment.</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">
                  Please try again or open the latest report.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="grid content-start gap-5 border-t border-[#e1e5df] bg-[#fbfaf5] p-5 xl:border-l xl:border-t-0">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
            <Maximize2 className="size-4 text-[#51745f]" />
            Feature detail
          </div>

          {selectedFeature ? (
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7a877f]">{selectedFeature.layerTitle}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-normal text-[#102019]">{selectedFeature.title}</h3>
              <div className="mt-5 grid gap-3">
                {Object.entries(selectedFeature.attributes).map(([key, value]) => (
                  <div key={key} className="rounded-[8px] border border-[#e1e5df] bg-white p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#7a877f]">
                      {formatAttributeLabel(key)}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#334238]">{String(value)}</p>
                  </div>
                ))}
              </div>
              {!Object.keys(selectedFeature.attributes).length ? (
                <p className="mt-4 text-sm leading-6 text-[#65736a]">
                  The map is available, but no mapped findings have been published for this survey.
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm leading-6 text-[#65736a]">
              Select a mapped feature to view customer-ready survey evidence and related recommendations.
            </p>
          )}

          <div className="rounded-[10px] border border-[#d9dfd7] bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
              <Target className="size-4 text-[#51745f]" />
              Report intelligence
            </div>
            <p className="mt-3 text-sm leading-6 text-[#65736a]">
              {config.reportTitle ?? "Published survey report"} provides the approved findings and recommended actions behind this map.
            </p>
            {reportHref ? (
              <Link
                href={reportHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1f563e] transition hover:text-[#153d2b]"
              >
                Open linked report <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </div>

          <div className="grid gap-3">
            {findings.slice(0, 3).map((finding) => (
              <div key={finding.id} className="rounded-[8px] border border-[#e1e5df] bg-white p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-[#7a877f]">{finding.meta}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#14211a]">{finding.title}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] border border-[#c7d5ca] bg-[#eef5ef] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
              <CheckCircle2 className="size-4 text-[#51745f]" />
              Recommended actions
            </div>
            <div className="mt-3 grid gap-2">
              {recommendations.slice(0, 2).map((recommendation) => (
                <div key={recommendation.id}>
                  <p className="text-sm font-semibold leading-6 text-[#14211a]">{recommendation.title}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#7a877f]">{recommendation.meta}</p>
                </div>
              ))}
              {!recommendations.length ? (
                <p className="text-sm leading-6 text-[#65736a]">No open recommendations are linked to this published map yet.</p>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function formatAttributeLabel(key: string) {
  return key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
