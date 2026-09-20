import { emergencyContacts, nationalHotline } from "@/data/emergency/contacts";
import { LAST_CHECKED } from "@/data/sources";
import { independence } from "@/data/site";

export const dynamic = "force-static";

/** Read-only emergency contacts with provenance (AGENTS.md §18, §50). */
export function GET() {
  return Response.json(
    {
      project: "BetterPagsanjan",
      disclaimer: independence.short,
      lastChecked: LAST_CHECKED,
      note: "Local numbers can change. In a life-threatening emergency, call 911 first.",
      data: { nationalHotline, contacts: emergencyContacts },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
