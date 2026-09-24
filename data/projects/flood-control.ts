import { LAST_CHECKED } from "@/data/sources";
import type { PublicProject } from "@/types/civic";

/**
 * DPWH implementation records in Pagsanjan (AGENTS.md §24).
 *
 * Seed records below were transcribed in September 2026 from filtered
 * queries against the BetterGov.PH Flood Watch read-only API
 * (source: bettergov-flood-watch; upstream: DPWH transparency data),
 * e.g. `GET /api/flood-control-projects?q=Pagsanjan&limit=40`.
 *
 * These are IMPLEMENTATION records — contract, budget, status, contractor,
 * and dates as published — not appropriation records and never municipal
 * budget figures. Status values follow the DPWH publication verbatim
 * (Completed → completed, On-Going → ongoing). Never change a status
 * without supporting information. Verify against official DPWH documents
 * before formal citation.
 */
const FLOOD_API =
  "https://flood-control.bettergov.ph/api/flood-control-projects";

function dpwhRecord(entry: {
  contractId: string;
  slug: string;
  name: string;
  displayName?: string;
  location: string;
  status: PublicProject["status"];
  budget: string;
  startDate?: string;
  targetCompletion?: string;
  description: string;
}): PublicProject {
  const { contractId, ...rest } = entry;
  return {
    ...rest,
    id: `flood-${contractId.toLowerCase()}`,
    implementingOffice: "Department of Public Works and Highways (DPWH)",
    sourceUrl: `${FLOOD_API}?q=${contractId}&limit=5`,
    verification: {
      status: "verified",
      sourceId: "bettergov-flood-watch",
      sourceUrl: `${FLOOD_API}?q=${contractId}&limit=5`,
      verifiedAt: "2026-09",
      note: `DPWH contract ${contractId} as published via BetterGov.PH Flood Watch (DPWH transparency data). Status, budget, contractor, and dates as published — verify against official DPWH documents before formal citation. Implementation record, not a municipal budget figure.`,
    },
    lastChecked: LAST_CHECKED,
  };
}

export const floodControlProjects: PublicProject[] = [
  dpwhRecord({
    contractId: "22DH0064",
    slug: "flood-22dh0064-bank-improvement-magdapio",
    name: "BANK IMPROVEMENT ALONG PAGSANJAN RIVER, BRGY. MAGDAPIO, PAGSANJAN, LAGUNA",
    displayName: "Bank improvement along Pagsanjan River, Brgy. Magdapio",
    location: "Barangay Magdapio, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱93,605,267.39 — DPWH contract (infra year 2022, GAA 2022 OO-2)",
    startDate: "2022-09-09",
    targetCompletion: "2023-08-25",
    description:
      "DPWH bank improvement along Pagsanjan River in Brgy. Magdapio (contract 22DH0064, DMLC Builders). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "24DH0031",
    slug: "flood-24dh0031-river-control-pinagsanjan",
    name: "CONSTRUCTION OF RIVER CONTROL ALONG PAGSANJAN RIVER, BRGY. PINAGSANJAN, PAGSANJAN, LAGUNA",
    displayName: "River control along Pagsanjan River, Brgy. Pinagsanjan",
    location: "Barangay Pinagsanjan, Pagsanjan, Laguna",
    status: "ongoing",
    budget: "₱93,566,114.77 — DPWH contract (infra year 2024, GAA 2024 OO-2)",
    startDate: "2024-03-01",
    description:
      "DPWH river control along Pagsanjan River in Brgy. Pinagsanjan (contract 24DH0031, 11-16 Construction). On-going at 75.96% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "24DH0033",
    slug: "flood-24dh0033-balanac-maulawin",
    name: "CONSTRUCTION OF RIVER CONTROL ALONG BALANAC RIVER, BRGY. MAULAWIN, PAGSANJAN, LAGUNA",
    displayName: "River control along Balanac River, Brgy. Maulawin",
    location: "Barangay Maulawin, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱93,594,921.19 — DPWH contract (infra year 2024, GAA 2024 OO-2)",
    startDate: "2024-03-15",
    targetCompletion: "2025-02-28",
    description:
      "DPWH river control along Balanac River in Brgy. Maulawin (contract 24DH0033, 11-16 Construction). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "24DH0059",
    slug: "flood-24dh0059-drainage-sampaloc",
    name: "CONSTRUCTION OF DRAINAGE CANAL ALONG MABINI STREET, BRGY. SAMPALOC, PAGSANJAN, LAGUNA",
    displayName: "Drainage canal along Mabini Street, Brgy. Sampaloc",
    location: "Barangay Sampaloc, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱4,949,780.34 — DPWH contract (infra year 2024, GAA 2024 SSP)",
    startDate: "2024-07-11",
    targetCompletion: "2024-12-17",
    description:
      "DPWH drainage canal along Mabini Street in Brgy. Sampaloc (contract 24DH0059, D.M. Catignas Enterprises). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
];

export function getFloodControlProjectBySlug(
  slug: string,
): PublicProject | undefined {
  return floodControlProjects.find((project) => project.slug === slug);
}
