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
    <section className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04]">
      <div className="flex items-start justify-between gap-5 border-b border-white/10 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/42">
            Interactive course map
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            {selectedArea?.name ?? "Course intelligence layers"}
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/48">
          {mode} placeholder
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
          <div className="absolute left-4 top-4 rounded-[6px] border border-white/12 bg-black/52 p-3 backdrop-blur-xl">
            <p className="text-xs leading-5 text-white/58">
              Development placeholder. Real providers will receive typed course
              boundaries, polygons, tile URLs, markers, opacity and legend data.
            </p>
          </div>
        </div>
        <aside className="grid content-start gap-5 border-t border-white/10 p-4 lg:border-l lg:border-t-0">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Layers3 className="size-4 text-[#a6d8bd]" />
              Map layers
            </div>
            <div className="mt-3 grid gap-2">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  className="rounded-[6px] border border-white/10 bg-black/16 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">{layer.name}</span>
                    <span className="font-mono text-xs text-white/42">
                      {Math.round(layer.opacity * 100)}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-white/46">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <MapPin className="size-4 text-[#a6d8bd]" />
              Course areas
            </div>
            <div className="mt-3 grid gap-2">
              {areas.slice(0, 5).map((area) => (
                <div
                  key={area.id}
                  className={`rounded-[6px] border p-3 ${
                    selectedAreaId === area.id
                      ? "border-white/24 bg-white/10"
                      : "border-white/10 bg-black/16"
                  }`}
                >
                  <p className="text-sm font-medium text-white">{area.name}</p>
                  <p className="mt-1 text-xs text-white/42">{area.areaType}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
