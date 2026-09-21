/**
 * Shared Ask-assistant helpers (AGENTS.md §16).
 *
 * Emergency detection runs identically on the client (chat widget) and the
 * server (/api/ask) so urgent questions always surface 911 first no matter
 * which reply path answers.
 */

/** Queries that should surface emergency numbers first — 911 always first. */
export const emergencyKeywords = [
  "911",
  "emergency",
  "emergencies",
  "hotline",
  "hotlines",
  "police",
  "pnp",
  "fire",
  "bfp",
  "disaster",
  "rescue",
  "ambulance",
  "flood",
  "baha",
  "typhoon",
  "bagyo",
  "earthquake",
  "lindol",
  "mdrrmo",
  "evacuation",
];

export function isEmergencyQuery(query: string): boolean {
  const lowered = query.toLowerCase();
  return emergencyKeywords.some((keyword) => lowered.includes(keyword));
}
