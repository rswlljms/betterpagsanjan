import type { NextConfig } from "next";

/**
 * Canonical URL placement is a deployment setting, not content: metadata,
 * canonical tags, the sitemap, and robots.txt all derive from it. This file
 * is loaded a few times per build, so keep the warning to real deployments
 * instead of every local build and CI run. See `.env.example`.
 */
const isDeployment = Boolean(process.env.VERCEL);
if (isDeployment && !process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  console.warn(
    "[betterpagsanjan] NEXT_PUBLIC_SITE_URL is not set. Metadata, the sitemap, and robots.txt will advertise the placeholder https://betterpagsanjan.org, which is not registered. Set it in the deployment environment before launch.",
  );
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    // Backstop for app/robots.ts: a crawler that ignores robots.txt is still
    // told not to index a pre-launch deployment. Mirrors the SITE_LAUNCHED
    // check there; keep the two in sync.
    if (process.env.SITE_LAUNCHED === "true") return [];

    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    // The logo SVGs are first-party static assets in public/ — serving them
    // through next/image is safe. The CSP keeps the optimizer locked down.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
