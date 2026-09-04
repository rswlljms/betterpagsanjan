import type { MetadataRoute } from "next";
import { barangays } from "@/data/barangays/barangays";
import { services } from "@/data/services";
import { site } from "@/data/site";

const staticRoutes = [
  "",
  "/services",
  "/government",
  "/barangays",
  "/announcements",
  "/transparency",
  "/ordinances",
  "/resolutions",
  "/projects",
  "/statistics",
  "/emergency",
  "/tourism",
  "/map",
  "/search",
  "/about",
  "/sources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified,
    })),
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified,
    })),
    ...barangays.map((barangay) => ({
      url: `${site.url}/barangays/${barangay.slug}`,
      lastModified,
    })),
  ];
}
