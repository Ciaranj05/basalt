import type { SVGProps } from "react";

export type BasaltProduct = "Golf" | "Solar" | "Estates" | "Utilities";

type LogoVariant = "horizontal" | "vertical" | "icon" | "wordmark";
type LogoTheme = "dark" | "light" | "grey";
type LogoSize = "compact" | "standard";

type BasaltLogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  product?: BasaltProduct;
  className?: string;
};

const themeClass: Record<LogoTheme, string> = {
  dark: "text-white",
  light: "text-[#070a08]",
  grey: "text-white/58",
};

const iconSize: Record<LogoSize, string> = {
  compact: "size-7",
  standard: "size-9",
};

function BasaltMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M32 4 52 15.5v23L32 60 12 38.5v-23L32 4Zm0 6.8L18 18.9v16.9L32 50.9l14-15.1V18.9L32 10.8Z"
      />
      <path
        fill="currentColor"
        d="m31.9 15.8 11 6.2v12.1l-11 6.9-10.8-6.9V22l10.8-6.2Zm0 5.2-6.2 3.6v6.9l6.2 4 6.3-4v-6.9L31.9 21Z"
      />
      <path
        fill="currentColor"
        d="M28.7 27.4h6.6v15.8l-3.4 2.1-3.2-2.1V27.4Z"
      />
    </svg>
  );
}

function Wordmark({ product }: { product?: BasaltLogoProps["product"] }) {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-semibold uppercase tracking-[0.22em]">BASALT</span>
      {product ? (
        <span className="mt-1 text-[0.58em] font-medium uppercase tracking-[0.28em] opacity-70">
          {product}
        </span>
      ) : null}
    </span>
  );
}

export function BasaltLogo({
  variant = "horizontal",
  theme = "dark",
  size = "standard",
  product,
  className = "",
}: BasaltLogoProps) {
  const color = themeClass[theme];
  const label = product ? `Basalt ${product}` : "Basalt";
  const icon = (
    <BasaltMark
      className={`${iconSize[size]} shrink-0`}
      aria-hidden="true"
    />
  );

  if (variant === "icon") {
    return (
      <span
        className={`inline-flex items-center ${color} ${className}`}
        aria-label={`${label} icon`}
      >
        {icon}
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={`inline-flex text-sm ${color} ${className}`} aria-label={label}>
        <Wordmark product={product} />
      </span>
    );
  }

  if (variant === "vertical") {
    return (
      <span
        className={`inline-flex flex-col items-center gap-3 text-center text-sm ${color} ${className}`}
        aria-label={label}
      >
        {icon}
        <Wordmark product={product} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-3 text-sm ${color} ${className}`}
      aria-label={label}
    >
      {icon}
      <Wordmark product={product} />
    </span>
  );
}
