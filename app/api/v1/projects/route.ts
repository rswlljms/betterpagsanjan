import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";
import { floodControlProjects } from "@/data/projects/flood-control";
import { projects } from "@/data/projects/projects";

export const dynamic = "force-static";

/**
 * Read-only public project records with verification metadata.
 * Appropriations (funding authorized) and implementation records
 * (contracts as published) are kept separate — they are different
 * record kinds, never mixed.
 */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: projects.length + floodControlProjects.length,
      appropriations: projects,
      implementations: floodControlProjects,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
