import { LAST_CHECKED } from "@/data/sources";
import type { PublicProject, ProjectStatus } from "@/types/civic";

/**
 * Public project directory (AGENTS.md §24).
 *
 * Seed records below are national-government (DPWH) projects physically
 * located in Pagsanjan, Laguna, transcribed in September 2026 from the
 * FY2026 General Appropriations Act via the BetterGov.PH Budget Data API
 * (source: bettergov-budget-api; upstream: DBM publications).
 *
 * These are APPROPRIATION records — funding authorized under the FY2026
 * GAA — not implementation reports. Every record carries status "planned"
 * with an explicit note that construction status has not been verified.
 * Never change a status without supporting information, and never present
 * these national figures as municipal budget figures.
 */
const GAA_2026_SOURCE = "https://budget.bettergov.ph/gaa/2026";

function dpwh2026(
  entry: Pick<
    PublicProject,
    "id" | "slug" | "name" | "displayName" | "location" | "budget"
  >,
): PublicProject {
  return {
    ...entry,
    description:
      "DPWH infrastructure project in Pagsanjan, Laguna funded under the FY2026 General Appropriations Act. This record reflects the national appropriation only — construction status has not been verified.",
    implementingOffice: "Department of Public Works and Highways (DPWH)",
    status: "planned",
    sourceUrl: GAA_2026_SOURCE,
    verification: {
      status: "verified",
      sourceId: "bettergov-budget-api",
      sourceUrl: GAA_2026_SOURCE,
      verifiedAt: "2026-09",
      note: "Project name and peso amount as published in the FY2026 GAA via the BetterGov.PH Budget Data API (DBM data). Appropriation record only — implementation status unverified. Verify against official DBM/DPWH documents before formal citation.",
    },
    lastChecked: LAST_CHECKED,
  };
}

export const projects: PublicProject[] = [
  dpwh2026({
    id: "hanging-bridge-magdapio-2026",
    slug: "hanging-bridge-magdapio-2026",
    name: "Construction of Hanging Bridge at Sta. 0 + 000 - 0 + 085, Barangay Magdapio, Pagsanjan, Laguna",
    location: "Barangay Magdapio, Pagsanjan, Laguna",
    budget: "₱82,647,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0095-949-2026",
    slug: "pagsanjan-lucban-road-0095-949-2026",
    name: "Pagsanjan-Lucban Rd - (S01672LZ) K0095 + 949 - K0096 + 000",
    displayName: "Pagsanjan–Lucban Road works, Km 95.9 – Km 96.0",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱43,246,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0098-2026",
    slug: "pagsanjan-lucban-road-0098-2026",
    name: "Pagsanjan-Lucban Rd - K0098 + 621 - K0099 + 240, K0107 + 071 - K0107 + 220",
    displayName:
      "Pagsanjan–Lucban Road works, Km 98.6 – Km 99.2 and Km 107.1 – Km 107.2",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱41,896,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0101-2026",
    slug: "pagsanjan-lucban-road-0101-2026",
    name: "Pagsanjan-Lucban Rd - (S01672LZ) K0101 + 197 - K0101 + 230",
    displayName: "Pagsanjan–Lucban Road works, Km 101.2",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱37,581,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0093-2026",
    slug: "pagsanjan-lucban-road-0093-2026",
    name: "Pagsanjan-Lucban Rd - (S01672LZ) K0093 + 640 - K0093 + 680",
    displayName: "Pagsanjan–Lucban Road works, Km 93.6",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱30,368,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0095-400-2026",
    slug: "pagsanjan-lucban-road-0095-400-2026",
    name: "Pagsanjan-Lucban Rd - K0095 + 400 - K0095 + 911",
    displayName: "Pagsanjan–Lucban Road works, Km 95.4 – Km 95.9",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱27,970,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "sta-cruz-pagsanjan-diversion-road-2026",
    slug: "sta-cruz-pagsanjan-diversion-road-2026",
    name: "Sta. Cruz - Pagsanjan Diversion Road, Laguna, Sta. 1 + 300 - 1 + 839",
    displayName: "Sta. Cruz–Pagsanjan Diversion Road works, Sta. 1.3 – Sta. 1.8",
    location: "Sta. Cruz–Pagsanjan Diversion Road, Laguna",
    budget: "₱24,055,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0104-2026",
    slug: "pagsanjan-lucban-road-0104-2026",
    name: "Pagsanjan-Lucban Rd - (S01672LZ) K0104 + 840 - K0104 + 855",
    displayName: "Pagsanjan–Lucban Road works, Km 104.8 – Km 104.9",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱22,776,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0108-2026",
    slug: "pagsanjan-lucban-road-0108-2026",
    name: "Pagsanjan-Lucban Rd - K0108 + 534 - K0109 + 097",
    displayName: "Pagsanjan–Lucban Road works, Km 108.5 – Km 109.1",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱15,007,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0106-2026",
    slug: "pagsanjan-lucban-road-0106-2026",
    name: "Pagsanjan-Lucban Rd - K0106 + 720 - K0106 + 941",
    displayName: "Pagsanjan–Lucban Road works, Km 106.7 – Km 106.9",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱9,622,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "multi-purpose-building-san-isidro-2026",
    slug: "multi-purpose-building-san-isidro-2026",
    name: "Construction of Multi-Purpose Building (Barangay Hall & Center), Barangay San Isidro, Pagsanjan, Laguna",
    location: "Barangay San Isidro, Pagsanjan, Laguna",
    budget: "₱6,000,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "multi-purpose-building-sampaloc-2026",
    slug: "multi-purpose-building-sampaloc-2026",
    name: "Construction of Multi-Purpose Building (Barangay Hall), Barangay Sampaloc, Pagsanjan, Laguna",
    location: "Barangay Sampaloc, Pagsanjan, Laguna",
    budget: "₱5,000,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "pagsanjan-lucban-road-0109-2026",
    slug: "pagsanjan-lucban-road-0109-2026",
    name: "Pagsanjan-Lucban Rd - K0109 + 910 - K0110 + 000",
    displayName: "Pagsanjan–Lucban Road works, Km 109.9 – Km 110.0",
    location: "Pagsanjan–Lucban Road, Pagsanjan, Laguna",
    budget: "₱2,165,000 — FY2026 GAA (DPWH)",
  }),
  dpwh2026({
    id: "covered-court-binan-2026",
    slug: "covered-court-binan-2026",
    name: "Completion of Multi-Purpose (Covered Court), Barangay Binan, Pagsanjan, Laguna",
    location: "Barangay Biñan, Pagsanjan, Laguna",
    budget: "₱2,000,000 — FY2026 GAA (DPWH)",
  }),
];

/** Sum of the FY2026 GAA amounts above, in exact pesos. */
export const PROJECTS_FY2026_TOTAL = 350333000;

export function formatPeso(amount: number): string {
  return `₱${amount.toLocaleString("en-PH")}`;
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  proposed: "Proposed",
  planned: "Planned",
  ongoing: "Ongoing",
  completed: "Completed",
  delayed: "Delayed",
  cancelled: "Cancelled",
};

export function getProjectBySlug(slug: string): PublicProject | undefined {
  return projects.find((project) => project.slug === slug);
}
