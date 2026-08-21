import type { ReactNode } from "react";

const outputMarkers = [
  {
    label: "Green approach",
    note: "Turf variation for review",
    className: "left-[18%] top-[34%]",
  },
  {
    label: "Fairway landing area",
    note: "Example moisture pattern",
    className: "right-[14%] top-[48%]",
  },
  {
    label: "Green edge",
    note: "Example improvement trend",
    className: "left-[42%] bottom-[18%]",
  },
];

const repeatDates = [
  {
    label: "Apr",
    note: "Baseline",
    className: "bg-[#f4f1e8]",
  },
  {
    label: "May",
    note: "Review",
    className: "bg-[#dbe9d6]",
  },
  {
    label: "Jun",
    note: "Compare",
    className: "bg-[#cfdfc8]",
  },
  {
    label: "Jul",
    note: "Improving",
    className: "bg-[#bfd5bb]",
  },
];

function OutputMapBase({
  children,
  variant = "multispectral",
}: {
  children?: ReactNode;
  variant?: "rgb" | "multispectral" | "moisture";
}) {
  return (
    <div className="output-map">
      <span className="output-map-photo" />
      {variant === "rgb" ? null : (
        <span className={`output-overlay output-overlay-${variant}`} />
      )}
      <span className="output-map-grid" />
      <span className="output-green output-green-one" />
      <span className="output-green output-green-two" />
      <span className="output-fairway output-fairway-one" />
      <span className="output-fairway output-fairway-two" />
      {children}
    </div>
  );
}

export function CourseOutputPreview() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#d8d1c1] bg-[#07100d] shadow-[0_28px_90px_rgba(20,28,22,0.18)]">
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border-b border-white/10 bg-[#07110d] p-5 text-white lg:border-b-0 lg:border-r">
          <p className="text-xs uppercase tracking-[0.24em] text-[#b8f2d2]">
            Simulated report example
          </p>
          <h3 className="mt-3 text-2xl font-semibold">Course outputs</h3>
          <p className="mt-3 text-sm leading-6 text-white/62">
            Example overlays show the kind of visual evidence a club might use
            to review turf condition, moisture patterns and repeat survey
            changes. They are illustrative, not live survey data.
          </p>
          <div className="mt-5 grid gap-2">
            {["Course condition", "Turf health", "Moisture patterns", "Previous survey"].map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/72">
                <span
                  className={`size-2 rounded-full ${
                    index < 2 ? "bg-[#b8f2d2]" : "border border-white/42"
                  }`}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] sm:min-h-[520px]">
          <OutputMapBase>
            {outputMarkers.map((marker) => (
              <div
                key={marker.label}
                className={`absolute z-10 hidden max-w-[11.5rem] rounded-[8px] border border-white/14 bg-[#07100d]/84 p-3 text-white backdrop-blur-xl sm:block ${marker.className}`}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-[#b8f2d2]">
                  {marker.label}
                </p>
                <p className="mt-1 text-sm leading-5 text-white/76">{marker.note}</p>
              </div>
            ))}
          </OutputMapBase>
        </div>
      </div>
    </div>
  );
}

export function RgbMultispectralComparison() {
  return (
    <div className="grid gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-2">
      <div className="overflow-hidden rounded-[6px] border border-white/10">
        <div className="relative min-h-[240px]">
          <OutputMapBase variant="rgb" />
        </div>
        <div className="bg-black/24 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-white/38">RGB view</p>
          <p className="mt-2 text-sm leading-6 text-white/62">
            A familiar visual record of the course.
          </p>
        </div>
      </div>
      <div className="overflow-hidden rounded-[6px] border border-white/10">
        <div className="relative min-h-[240px]">
          <OutputMapBase variant="multispectral">
            <span className="output-hotspot output-hotspot-one" />
            <span className="output-hotspot output-hotspot-two" />
          </OutputMapBase>
        </div>
        <div className="bg-black/24 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-[#b8f2d2]">
            Simulated multispectral view
          </p>
          <p className="mt-2 text-sm leading-6 text-white/62">
            Illustrative turf variation to guide closer inspection.
          </p>
        </div>
      </div>
    </div>
  );
}

export function RepeatDateComparison() {
  return (
    <div className="rounded-[8px] border border-[#d8d1c1] bg-[#f4f1e8] p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-[#486754]">
        Simulated repeat-date comparison
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {repeatDates.map((date, index) => (
          <div key={date.label} className="overflow-hidden rounded-[6px] border border-[#d8d1c1] bg-white">
            <div className={`relative min-h-[150px] ${date.className}`}>
              <OutputMapBase variant={index === 0 ? "rgb" : "moisture"} />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-[#07110d]">{date.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#486754]">
                {date.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
