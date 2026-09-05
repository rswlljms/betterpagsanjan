import type { MetadataRoute } from "next";
import { barangays } from "@/data/barangays/barangays";
import { legislativeDocuments } from "@/data/legislative/documents";
import { projects } from "@/data/projects/projects";
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
    ...legislativeDocuments
      .filter((doc) => doc.documentType === "ordinance")
      .map((doc) => ({
        url: `${site.url}/ordinances/${doc.slug}`,
        lastModified,
      })),
    ...legislativeDocuments
      .filter((doc) => doc.documentType === "resolution")
      .map((doc) => ({
        url: `${site.url}/resolutions/${doc.slug}`,
        lastModified,
      })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified,
    })),
  ];
}
