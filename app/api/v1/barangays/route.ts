import { barangays } from "@/data/barangays/barangays";
import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";

export const dynamic = "force-static";

/**
 * Read-only barangay list. Officials and contacts are deliberately absent
 * until verified from official sources (AGENTS.md §14, §20).
 */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: barangays.length,
      data: barangays,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
