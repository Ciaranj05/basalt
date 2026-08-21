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
      <figcaption className="sr-only">{label}</figcaption>
      {children}
    </figure>
  );
}

function CroppedProductImage({
  mockup,
  priority = false,
}: {
  mockup: (typeof mockups)[keyof typeof mockups];
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[768/455] overflow-hidden">
      <Image
        src={mockup.src}
        alt={mockup.alt}
        fill
        sizes="(min-width: 1024px) 54vw, 100vw"
        className="object-cover object-bottom"
        priority={priority}
      />
    </div>
  );
}

export function CourseOutputPreview() {
  return (
    <ProductPreviewFrame label="Course Intelligence — illustrative interface">
      <CroppedProductImage mockup={mockups.courseOverview} priority />
    </ProductPreviewFrame>
  );
}

export function RepeatDateComparison() {
  return (
    <ProductPreviewFrame label="Survey comparison — illustrative interface">
      <CroppedProductImage mockup={mockups.change} />
    </ProductPreviewFrame>
  );
}

export function MoistureAndDrainagePreviews() {
  return (
    <div className="grid gap-4">
      <ProductPreviewFrame label="Moisture map — illustrative interface">
        <CroppedProductImage mockup={mockups.moisture} />
      </ProductPreviewFrame>
      <ProductPreviewFrame label="Drainage analysis — illustrative interface">
        <CroppedProductImage mockup={mockups.drainage} />
      </ProductPreviewFrame>
    </div>
  );
}
