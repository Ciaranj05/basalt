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

const metadataBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: "Basalt | Golf Course Intelligence",
  description:
    "Basalt helps golf clubs make better decisions through accurate course intelligence, mapping and long-term monitoring.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
  openGraph: {
    title: "Basalt | Golf Course Intelligence",
    description:
      "Basalt helps golf clubs make better decisions through accurate course intelligence, mapping and long-term monitoring.",
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
    title: "Basalt | Golf Course Intelligence",
    description:
      "Basalt helps golf clubs make better decisions through accurate course intelligence, mapping and long-term monitoring.",
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
