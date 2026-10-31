import type { MetadataRoute } from "next";
import { isSiteLaunched, site } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  // Pre-launch deployments are reachable but must not be indexed.
  // next.config.ts sends `X-Robots-Tag: noindex` as a backstop for crawlers
  // that ignore robots.txt.
  if (!isSiteLaunched) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
