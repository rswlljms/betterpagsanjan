import { LAST_CHECKED, sources } from "@/data/sources";
import { independence } from "@/data/site";

export const dynamic = "force-static";

/** Read-only central source registry (AGENTS.md §31). */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: sources.length,
      data: sources,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
