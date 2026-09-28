import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";
import { transparencyRecords } from "@/data/transparency/records";

export const dynamic = "force-static";

/** Read-only transparency records with verification metadata. */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: transparencyRecords.length,
      data: transparencyRecords,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
