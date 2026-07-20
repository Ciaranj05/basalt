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
  title: "Basalt | Outdoor Asset Intelligence",
  description:
    "Basalt is the intelligence platform for understanding outdoor assets, launching first with golf.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    title: "Basalt | Outdoor Asset Intelligence",
    description:
      "The Basalt Platform turns complex landscapes into better decisions.",
    images: [
      {
        url: "/brand/basalt-social.svg",
        width: 1200,
        height: 630,
        alt: "Basalt outdoor asset intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basalt | Outdoor Asset Intelligence",
    description:
      "The Basalt Platform turns complex landscapes into better decisions.",
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
