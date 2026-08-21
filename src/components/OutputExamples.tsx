import Image from "next/image";
import type { ReactNode } from "react";

const mockups = {
  courseOverview: {
    src: "/images/course-intelligence/course-overview-turf-health.png",
    alt: "Illustrative Basalt Course Intelligence interface showing course overview and turf health overlays",
    width: 768,
    height: 490,
  },
  moisture: {
    src: "/images/course-intelligence/moisture-map.png",
    alt: "Illustrative Basalt Course Intelligence interface showing a surface moisture map",
    width: 768,
    height: 490,
  },
  drainage: {
    src: "/images/course-intelligence/drainage-analysis.png",
    alt: "Illustrative Basalt Course Intelligence interface showing drainage analysis and low areas",
    width: 768,
    height: 455,
  },
  change: {
    src: "/images/course-intelligence/change-over-time.png",
    alt: "Illustrative Basalt Course Intelligence interface comparing turf condition across two survey dates",
    width: 768,
    height: 455,
  },
};

function ProductPreviewFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-[8px] border border-[#d8d1c1] bg-[#07100d] shadow-[0_28px_90px_rgba(20,28,22,0.16)]">
      <div className="border-b border-white/10 px-4 py-3 sm:px-5">
        <figcaption className="text-xs uppercase tracking-[0.22em] text-[#b8f2d2]">
          {label}
        </figcaption>
      </div>
      {children}
    </figure>
  );
}

export function CourseOutputPreview() {
  return (
    <ProductPreviewFrame label="Course Intelligence — illustrative interface">
      <Image
        src={mockups.courseOverview.src}
        alt={mockups.courseOverview.alt}
        width={mockups.courseOverview.width}
        height={mockups.courseOverview.height}
        sizes="(min-width: 1024px) 54vw, 100vw"
        className="h-auto w-full"
        priority
      />
    </ProductPreviewFrame>
  );
}

export function RepeatDateComparison() {
  return (
    <ProductPreviewFrame label="Survey comparison — illustrative interface">
      <Image
        src={mockups.change.src}
        alt={mockups.change.alt}
        width={mockups.change.width}
        height={mockups.change.height}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="h-auto w-full"
      />
    </ProductPreviewFrame>
  );
}

export function MoistureAndDrainagePreviews() {
  return (
    <div className="grid gap-4">
      <ProductPreviewFrame label="Moisture map — illustrative interface">
        <Image
          src={mockups.moisture.src}
          alt={mockups.moisture.alt}
          width={mockups.moisture.width}
          height={mockups.moisture.height}
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="h-auto w-full"
        />
      </ProductPreviewFrame>
      <ProductPreviewFrame label="Drainage analysis — illustrative interface">
        <Image
          src={mockups.drainage.src}
          alt={mockups.drainage.alt}
          width={mockups.drainage.width}
          height={mockups.drainage.height}
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="h-auto w-full"
        />
      </ProductPreviewFrame>
    </div>
  );
}
