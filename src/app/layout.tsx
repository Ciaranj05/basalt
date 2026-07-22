import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Basalt | Land Intelligence and Digital Mapping",
  description:
    "Basalt helps golf clubs, farms and estates make better decisions through accurate surveying, digital mapping, terrain analysis and intelligent reporting.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    title: "Basalt | Land Intelligence and Digital Mapping",
    description:
      "Basalt transforms aerial and spatial data into practical maps, terrain insight and reports for complex outdoor environments.",
    images: [
      {
        url: "/brand/basalt-social.svg",
        width: 1200,
        height: 630,
        alt: "Basalt spatial intelligence platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basalt | Land Intelligence and Digital Mapping",
    description:
      "Basalt transforms aerial and spatial data into practical maps, terrain insight and reports for complex outdoor environments.",
    images: ["/brand/basalt-social.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
