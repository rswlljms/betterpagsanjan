import { services } from "@/data/services";
import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";

export const dynamic = "force-static";

/** Read-only service finder records with verification metadata. */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      count: services.length,
      data: services,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
