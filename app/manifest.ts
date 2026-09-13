import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#101010",
    lang: "en",
    categories: ["government", "utilities"],
    icons: [
      {
        src: "/images/favicon/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Services",
        short_name: "Services",
        url: "/services",
      },
      {
        name: "Emergency information",
        short_name: "Emergency",
        url: "/emergency",
      },
      {
        name: "Search",
        short_name: "Search",
        url: "/search",
      },
    ],
  };
}
