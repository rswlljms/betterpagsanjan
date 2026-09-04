import type { SourceRecord } from "@/types/civic";

/** Global freshness label for the initial dataset. */
export const LAST_CHECKED = "September 2026";

/**
 * Central source registry (AGENTS.md §31). Civic records reference sources
 * by `id` so attribution stays consistent across the platform.
 *
 * "reference" sources are secondary compilations used to cross-check or to
 * cover history/geography; they are always labeled as secondary in the UI.
 */
export const sources: SourceRecord[] = [
  // ——— Statutes (primary) ———
  {
    id: "ra-7160",
    name: "Local Government Code of 1991 (Republic Act No. 7160)",
    organization: "Official Gazette of the Republic of the Philippines",
    url: "https://www.officialgazette.gov.ph/1991/10/10/republic-act-no-7160/",
    sourceType: "statute",
    description:
      "Defines the standard offices, functions, and powers of municipal governments in the Philippines, including business permitting and real property tax collection.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "ra-10121",
    name:
      "Philippine Disaster Risk Reduction and Management Act of 2010 (Republic Act No. 10121)",
    organization: "Official Gazette of the Republic of the Philippines",
    url: "https://www.officialgazette.gov.ph/2010/05/27/republic-act-no-10121/",
    sourceType: "statute",
    description:
      "Requires every municipality to maintain a Disaster Risk Reduction and Management Office (MDRRMO).",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "ra-9994",
    name:
      "Expanded Senior Citizens Act of 2010 (Republic Act No. 9994)",
    sourceType: "statute",
    description:
      "Grants senior citizens their benefits and privileges, including identification cards issued through the Office of the Senior Citizens Affairs (OSCA).",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "pd-1096",
    name: "National Building Code of the Philippines (Presidential Decree No. 1096)",
    sourceType: "statute",
    description:
      "Requires building permits for construction and mandates a building official in every local government unit.",
    accessedAt: LAST_CHECKED,
  },

  // ——— Government (primary) ———
  {
    id: "psa",
    name: "Philippine Statistics Authority",
    organization: "Republic of the Philippines",
    url: "https://psa.gov.ph",
    sourceType: "government",
    description:
      "Official statistics authority: censuses of population and geographic classifications.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "psa-psgc",
    name: "PSA Philippine Standard Geographic Code — Pagsanjan, Laguna",
    organization: "Philippine Statistics Authority",
    url: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
    sourceType: "government",
    description:
      "Official geographic code listing for Pagsanjan: barangays and official census population counts.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "dilg-911",
    name: "DILG — Unified 911 emergency hotline (nationwide launch)",
    organization: "Department of the Interior and Local Government",
    url: "https://dilg.gov.ph/news/One-Number-for-All-Emergencies-Unified-911-to-Launch-Nationwide/NC-2025-1177",
    sourceType: "government",
    description:
      "Confirms 911 as the nationwide emergency number in the Philippines.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "dti-cmci",
    name: "DTI CMCI — Pagsanjan LGU profile",
    organization: "Department of Trade and Industry",
    url: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Pagsanjan",
    sourceType: "government",
    description:
      "Government-published LGU profile used for the Municipal Hall address, trunkline, official website, mayor's name, and classification. Profile data is supplied by the LGU.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "pagsanjan-lgu-website",
    name: "Municipality of Pagsanjan — official website",
    url: "https://pagsanjan.gov.ph",
    sourceType: "government",
    description:
      "The official website of the Municipal Government of Pagsanjan on the government-reserved .gov.ph domain. The authoritative channel for official transactions, announcements, and current information.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "pagsanjan-mdrrmo-fb",
    name: "Pagsanjan MDRRMO — official Facebook page",
    url: "https://www.facebook.com/PagsanjanMdrrmo",
    sourceType: "government",
    description:
      "Official social media page of the Pagsanjan MDRRMO, used for posted emergency contact numbers. Numbers were transcribed through search indexing — verify before relying on them.",
    accessedAt: LAST_CHECKED,
  },

  // ——— Secondary references (cross-checking) ———
  {
    id: "philatlas-pagsanjan",
    name: "PhilAtlas — Pagsanjan, Laguna",
    url: "https://www.philatlas.com/luzon/r04a/laguna/pagsanjan.html",
    sourceType: "reference",
    description:
      "Secondary compilation of PSA census data, used for cross-checking. Not an authoritative source.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "wikipedia-pagsanjan",
    name: "Wikipedia — Pagsanjan",
    url: "https://en.wikipedia.org/wiki/Pagsanjan",
    sourceType: "reference",
    description:
      "Secondary encyclopedic source used for town history and river geography. Cross-checked; not an authoritative source.",
    accessedAt: LAST_CHECKED,
  },
  {
    id: "wikipedia-pagsanjan-falls",
    name: "Wikipedia — Pagsanjan Falls",
    url: "https://en.wikipedia.org/wiki/Pagsanjan_Falls",
    sourceType: "reference",
    description:
      "Secondary source on Pagsanjan Falls (Magdapio/Cavinti Falls), its jurisdiction, and access via the shooting-the-rapids boat trip.",
    accessedAt: LAST_CHECKED,
  },

  // ——— Original content ———
  {
    id: "betterpagsanjan",
    name: "BetterPagsanjan",
    sourceType: "original",
    description:
      "Plain-language explanations, navigation guidance, and general preparedness tips written by the BetterPagsanjan project. These are general guides — not official government issuances.",
    accessedAt: LAST_CHECKED,
  },
];

export function getSource(id: string): SourceRecord | undefined {
  return sources.find((source) => source.id === id);
}
