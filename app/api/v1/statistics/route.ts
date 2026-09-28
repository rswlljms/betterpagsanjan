import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";
import { statistics } from "@/data/statistics";

export const dynamic = "force-static";

/** Read-only statistics with source and year on every figure. */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: statistics.length,
      data: statistics,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
