import { legislativeDocuments } from "@/data/legislative/documents";
import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";

export const dynamic = "force-static";

/** Read-only legislative index (ordinances + resolutions) with verification metadata. */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: legislativeDocuments.length,
      data: legislativeDocuments,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
