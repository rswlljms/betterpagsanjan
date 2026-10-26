import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PwaRegister } from "@/components/civic/pwa-register";
import { AskWidget } from "@/components/civic/ask-widget";
import { BootSplash } from "@/components/civic/boot-splash";
import { EmergencyStrip } from "@/components/civic/emergency-strip";
import { SiteFooter } from "@/components/civic/site-footer";
import { SiteHeader } from "@/components/civic/site-header";
import { SkipLink } from "@/components/civic/skip-link";
import { UtilityBar } from "@/components/civic/utility-bar";
import { site } from "@/data/site";
import { faviconSet } from "@/data/sources";

// Fonts are self-hosted (see app/fonts/README.md) so builds do not depend on
// Google Fonts' changing response format — which broke Turbopack builds.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  adjustFontFallback: "Arial",
});

// BP guide: Poppins for display + Inter for reading and civic UI text.
const inter = localFont({
  src: [
    {
      path: "./fonts/inter-latin-var.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: [
      { url: faviconSet.shortcutIcon, type: "image/x-icon" },
      { url: faviconSet.iconPng, sizes: "512x512", type: "image/png" },
      ...([16, 32, 48, 64, 128, 192, 256] as const).map((size) => ({
        url: `${faviconSet.directory}/favicon-${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
      })),
    ],
    shortcut: [{ url: faviconSet.shortcutIcon, type: "image/x-icon" }],
    apple: [{ url: faviconSet.appleIcon, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  themeColor: "#101010",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} font-ui`}>
        <BootSplash />
        <SkipLink />
        <EmergencyStrip />
        <SiteHeader />
        <UtilityBar />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <AskWidget />
        <PwaRegister />
      </body>
    </html>
  );
}
