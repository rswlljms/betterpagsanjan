import { LAST_CHECKED } from "@/data/sources";
import { independence, site } from "@/data/site";

export const dynamic = "force-static";

/**
 * Open data index (AGENTS.md §50). Read-only JSON over the same structured
 * `data/` layer the pages use — no database, no new facts, every record
 * keeps its source and verification metadata.
 */
export function GET() {
  return Response.json(
    {
      project: site.name,
      description: site.description,
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      resources: [
        { id: "emergency", href: "/api/v1/emergency" },
        { id: "services", href: "/api/v1/services" },
        { id: "barangays", href: "/api/v1/barangays" },
        { id: "offices", href: "/api/v1/offices" },
        { id: "sources", href: "/api/v1/sources" },
      ],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
