import { LAST_CHECKED } from "@/data/sources";
import type { CivicLocation, CivicLocationCategory } from "@/types/civic";

/**
 * Civic locations (AGENTS.md §17).
 *
 * Locations are added ONLY when confirmed from an authoritative source.
 * Coordinates are never guessed — a record without coordinates is shown as
 * an address listing with a link to the official source, not as a map pin.
 *
 * The interactive map launches once enough verified pins exist; until then
 * the /map page renders this list honestly (no decorative map).
 */
export const civicLocations: CivicLocation[] = [
  {
    id: "municipal-hall",
    slug: "municipal-hall",
    name: "Pagsanjan Municipal Hall",
    category: "government",
    description:
      "Seat of the municipal government. Houses the Office of the Municipal Mayor and municipal offices.",
    address:
      "2F Municipal Hall, J. Rizal St., Brgy. Poblacion I, Pagsanjan, Laguna 4008",
    verification: {
      status: "verified",
      sourceId: "dti-cmci",
      sourceUrl: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Pagsanjan",
      verifiedAt: "2026-09-03",
      note: "Address as listed on the DTI CMCI LGU profile (LGU-supplied data). Coordinates have not been verified, so this record has no map pin yet.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "san-isidro-barangay-hall",
    slug: "san-isidro-barangay-hall",
    name: "Brgy. San Isidro Multi-Purpose Building (Barangay Hall & Center)",
    category: "barangay",
    description:
      "Barangay hall and center in San Isidro, funded at ₱6,000,000 under the FY2026 GAA (DPWH). Record reflects the appropriation — construction status unverified.",
    address: "Barangay San Isidro, Pagsanjan, Laguna",
    latitude: 14.282353,
    longitude: 121.45749,
    verification: {
      status: "verified",
      sourceId: "bettergov-budget-api",
      sourceUrl: "https://budget.bettergov.ph/gaa/2026",
      verifiedAt: "2026-09",
      note: "Coordinates as published in the FY2026 GAA project name via the BetterGov.PH Budget Data API (DBM data). Pin is approximate to the published coordinates.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "sampaloc-barangay-hall",
    slug: "sampaloc-barangay-hall",
    name: "Brgy. Sampaloc Multi-Purpose Building (Barangay Hall)",
    category: "barangay",
    description:
      "Barangay hall in Sampaloc, funded at ₱5,000,000 under the FY2026 GAA (DPWH). Record reflects the appropriation — construction status unverified.",
    address: "Barangay Sampaloc, Pagsanjan, Laguna",
    latitude: 14.268216,
    longitude: 121.442423,
    verification: {
      status: "verified",
      sourceId: "bettergov-budget-api",
      sourceUrl: "https://budget.bettergov.ph/gaa/2026",
      verifiedAt: "2026-09",
      note: "Coordinates as published in the FY2026 GAA project name via the BetterGov.PH Budget Data API (DBM data). Pin is approximate to the published coordinates.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "binan-covered-court",
    slug: "binan-covered-court",
    name: "Brgy. Biñan Multi-Purpose Covered Court",
    category: "community",
    description:
      "Covered court in Biñan, completion funded at ₱2,000,000 under the FY2026 GAA (DPWH). Record reflects the appropriation — construction status unverified.",
    address: "Barangay Biñan, Pagsanjan, Laguna",
    latitude: 14.260639,
    longitude: 121.431241,
    verification: {
      status: "verified",
      sourceId: "bettergov-budget-api",
      sourceUrl: "https://budget.bettergov.ph/gaa/2026",
      verifiedAt: "2026-09",
      note: "Coordinates as published in the FY2026 GAA project name via the BetterGov.PH Budget Data API (DBM data). Pin is approximate to the published coordinates.",
    },
    lastChecked: LAST_CHECKED,
  },
];

export const locationCategoryLabels: Record<CivicLocationCategory, string> = {
  government: "Government",
  emergency: "Emergency",
  health: "Health",
  education: "Education",
  barangay: "Barangay",
  transport: "Transport",
  tourism: "Tourism",
  evacuation: "Evacuation",
  community: "Community",
  "public-facility": "Public facility",
};

export function getLocationBySlug(slug: string): CivicLocation | undefined {
  return civicLocations.find((location) => location.slug === slug);
}

export function getMappableLocations(): CivicLocation[] {
  return civicLocations.filter(
    (location) =>
      typeof location.latitude === "number" &&
      typeof location.longitude === "number",
  );
}
