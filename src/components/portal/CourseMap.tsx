import { Layers3, MapPin } from "lucide-react";
import type { CourseArea, MapLayer } from "@/lib/portal/types";

export type CourseMapProps = {
  areas: CourseArea[];
  layers: MapLayer[];
  selectedAreaId?: string;
  mode?: "overview" | "report" | "area";
};

export function CourseMap({
  areas,
  layers,
  selectedAreaId,
  mode = "overview",
}: CourseMapProps) {
  const selectedArea = areas.find((area) => area.id === selectedAreaId);

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#d9dfd7] bg-white shadow-[0_16px_60px_rgba(45,62,53,0.08)]">
      <div className="flex items-start justify-between gap-5 border-b border-[#e1e5df] p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#7a877f]">
            Course intelligence preview
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[#14211a]">
            {selectedArea?.name ?? "Course intelligence layers"}
          </h2>
        </div>
        <span className="rounded-full border border-[#d9dfd7] bg-[#fbfaf5] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#65736a]">
          {mode}
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="report-map report-golf min-h-[430px] rounded-none border-0">
          <span className="report-grid" />
          <span className="report-route report-route-one" />
          <span className="report-route report-route-two" />
          <span className="report-zone report-zone-one" />
          <span className="report-zone report-zone-two" />
          <span className="report-marker report-marker-one" />
          <span className="report-marker report-marker-two" />
          <div className="absolute left-4 top-4 rounded-[8px] border border-white/45 bg-white/86 p-3 shadow-lg backdrop-blur-md">
            <p className="text-xs leading-5 text-[#5d6b62]">
              Visual course preview. Open the Interactive Map where an approved mapped view is available.
            </p>
          </div>
        </div>
        <aside className="grid content-start gap-5 border-t border-[#e1e5df] p-4 lg:border-l lg:border-t-0">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
              <Layers3 className="size-4 text-[#51745f]" />
              Map layers
            </div>
            <div className="mt-3 grid gap-2">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="rounded-[8px] border border-[#e1e5df] bg-[#fbfaf5] p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[#14211a]">{layer.name}</span>
                    <span className="font-mono text-xs text-[#7a877f]">
                      {Math.round(layer.opacity * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[#65736a]">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#14211a]">
              <MapPin className="size-4 text-[#51745f]" />
              Course areas
            </div>
            <div className="mt-3 grid gap-2">
              {areas.slice(0, 5).map((area) => (
                <div
                  key={area.id}
                  className={`rounded-[6px] border p-3 ${
                    selectedAreaId === area.id
                      ? "border-[#91ad9b] bg-[#eef5ef]"
                      : "border-[#e1e5df] bg-[#fbfaf5]"
                  }`}
                >
                  <p className="text-sm font-medium text-[#14211a]">{area.name}</p>
                  <p className="mt-1 text-xs text-[#65736a]">{area.areaType}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
