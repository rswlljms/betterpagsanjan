import { LAST_CHECKED } from "@/data/sources";
import type { CivicLocation, CivicLocationCategory } from "@/types/civic";

/**
 * Civic locations (AGENTS.md §17).
 *
 * Verified records come from an authoritative source. Candidate leads
 * (e.g. Google Maps pins supplied by contributors) may be listed with
 * status "pending", approximate coordinates, and an explicit caution —
 * never as verified facts. A record without confirmed coordinates is
 * shown as an address listing with a link to the source, not as a map
 * pin; pending pins carry a "Verification pending" badge and must be
 * confirmed on site or against an LGU / PNP / BFP / DOH source.
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
      "Seat of the municipal government. Houses the Office of the Municipal Mayor and municipal offices. The DTI CMCI profile lists the address on J. Rizal St.; a contributor map pin places the hall on General Taino Street — the street naming is unverified, so both are shown.",
    address:
      "2F Municipal Hall, J. Rizal St., Brgy. Poblacion I, Pagsanjan, Laguna 4008",
    latitude: 14.2724675,
    longitude: 121.4557503,
    verification: {
      status: "verified",
      sourceId: "dti-cmci",
      sourceUrl: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Pagsanjan",
      verifiedAt: "2026-09-03",
      note: "Address as listed on the DTI CMCI LGU profile (LGU-supplied data). Coordinates transcribed from a contributor map pin for Pagsanjan Municipal Hall, General Taino Street (https://maps.app.goo.gl/xJqERHMhmjjqGjTr7) — approximate, and the street name conflicts with the CMCI listing, so confirm on site.",
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
  {
    id: "pagsanjan-police-station",
    slug: "pagsanjan-police-station",
    name: "Pagsanjan Municipal Police Station",
    category: "emergency",
    description:
      "Philippine National Police station serving Pagsanjan. For life-threatening emergencies call 911 first — local numbers can change.",
    latitude: 14.2825492,
    longitude: 121.4575131,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/gjPeneDDX8hvi7ieA",
      note: "Candidate lead: coordinates transcribed from a Google Maps place pin, approximate and not yet confirmed against a PNP or LGU source. Street address, hours, and contact numbers not yet verified.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "pagsanjan-fire-station",
    slug: "pagsanjan-fire-station",
    name: "Pagsanjan Fire Station",
    category: "emergency",
    description:
      "Bureau of Fire Protection station serving Pagsanjan. For fire emergencies call 911 first — local numbers can change.",
    latitude: 14.2826748,
    longitude: 121.4574761,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/jqUqrUfhstuM1iUx7",
      note: "Candidate lead: coordinates transcribed from a Google Maps place pin, approximate and not yet confirmed against a BFP or LGU source. Street address, hours, and contact numbers not yet verified.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "pagsanjan-rural-health-unit",
    slug: "pagsanjan-rural-health-unit",
    name: "Pagsanjan Rural Health Unit",
    category: "health",
    description:
      "Public primary-care facility. Services, hours, and contact details not yet verified — confirm with the municipal health office before visiting.",
    latitude: 14.264544,
    longitude: 121.4402655,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/KypvEHGVC4K1Y3iY9",
      note: "Candidate lead: coordinates transcribed from a Google Maps place pin, approximate and not yet confirmed against a DOH or LGU source.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "pagsanjan-municipal-health-center",
    slug: "pagsanjan-municipal-health-center",
    name: "Pagsanjan Municipal Health Center",
    category: "health",
    description:
      "Public health facility listed separately from the Rural Health Unit as pinned. Services, hours, and whether this is a distinct unit not yet verified.",
    latitude: 14.2722738,
    longitude: 121.4557672,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/daS4SSqPSjwsUAB79",
      note: "Candidate lead: coordinates transcribed from a Google Maps place pin, approximate and not yet confirmed against a DOH or LGU source.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "magdapio-barangay-health-station",
    slug: "magdapio-barangay-health-station",
    name: "Magdapio Barangay Health Station",
    category: "health",
    description:
      "Barangay-level health station in Magdapio. Services and hours not yet verified.",
    latitude: 14.2721467,
    longitude: 121.4600433,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/LrJtpEc4DDNFXhQJA",
      note: "Candidate lead: coordinates transcribed from a Google Maps place pin, approximate and not yet confirmed against a DOH or LGU source.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "pagsanjan-medical-clinic-inc",
    slug: "pagsanjan-medical-clinic-inc",
    name: "Pagsanjan Medical Clinic Incorporated",
    category: "health",
    description:
      "Private medical clinic. Not a government facility — services, hours, and fees not verified.",
    latitude: 14.2723219,
    longitude: 121.4557752,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/sMVPeo6EZDvGF7VN8",
      note: "Candidate lead: private facility pinned on Google Maps. Coordinates approximate; nothing about services or fees verified.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "fammed-diagnostic-center",
    slug: "fammed-diagnostic-center",
    name: "Fammed Diagnostic Center",
    category: "health",
    description:
      "Private diagnostic laboratory. Not a government facility — services, hours, and fees not verified.",
    latitude: 14.2646849,
    longitude: 121.4328342,
    verification: {
      status: "pending",
      sourceId: "google-maps-pin",
      sourceUrl: "https://maps.app.goo.gl/ZdWuoz4rWHfMUZbG6",
      note: "Candidate lead: private facility pinned on Google Maps. Coordinates approximate; nothing about services or fees verified.",
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
