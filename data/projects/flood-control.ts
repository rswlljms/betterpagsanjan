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
  dpwhRecord({
    contractId: "19DH0038",
    slug: "flood-19dh0038-box-culvert-pinagsanjan",
    name: "CONSTRUCTION OF BOX CULVERT, BRGY. PINAGSANJAN, PAGSANJAN, LAGUNA",
    displayName: "Box culvert, Brgy. Pinagsanjan",
    location: "Barangay Pinagsanjan, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱1,446,596.29 — DPWH contract (infra year 2019, GAA 2019 LP)",
    startDate: "2019-07-08",
    targetCompletion: "2019-08-30",
    description:
      "DPWH box culvert in Brgy. Pinagsanjan (contract 19DH0038, 11 Diamond Eagle Construction Corporation). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "18DH0077",
    slug: "flood-18dh0077-drainage-lambac",
    name: "CONSTRUCTION OF DRAINAGE SYSTEM, SITIO 4, LAMBAC, PAGSANJAN, LAGUNA",
    displayName: "Drainage system, Sitio 4, Brgy. Lambac",
    location: "Sitio 4, Barangay Lambac, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱2,890,300.42 — DPWH contract (infra year 2018, GAA 2018 LP)",
    startDate: "2018-07-04",
    targetCompletion: "2018-10-01",
    description:
      "DPWH drainage system in Sitio 4, Brgy. Lambac (contract 18DH0077, Justbilt Builders). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "22DH0013",
    slug: "flood-22dh0013-river-control-sta-cruz",
    name: "CONSTRUCTION OF RIVER CONTROL ALONG STA. CRUZ RIVER, PAGSANJAN SECTION, PAGSANJAN, LAGUNA",
    displayName: "River control along Sta. Cruz River, Pagsanjan section",
    location: "Sta. Cruz River (Pagsanjan section), Pagsanjan, Laguna",
    status: "completed",
    budget: "₱83,309,816.57 — DPWH contract (infra year 2022, GAA 2022 OO-2)",
    startDate: "2022-02-19",
    targetCompletion: "2022-12-09",
    description:
      "DPWH river control along the Pagsanjan section of Sta. Cruz River (contract 22DH0013, DMLC Builders). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "22DH0069",
    slug: "flood-22dh0069-bank-improvement-sta-cruz",
    name: "BANK IMPROVEMENT ALONG SANTA CRUZ RIVER, PAGSANJAN SECTION, PAGSANJAN, LAGUNA",
    displayName: "Bank improvement along Sta. Cruz River, Pagsanjan section",
    location: "Sta. Cruz River (Pagsanjan section), Pagsanjan, Laguna",
    status: "completed",
    budget: "₱93,604,490.24 — DPWH contract (infra year 2022, GAA 2022 OO-2)",
    startDate: "2022-09-09",
    targetCompletion: "2023-06-07",
    description:
      "DPWH bank improvement along the Pagsanjan section of Sta. Cruz River (contract 22DH0069, JTC Cruz Construction Co., Inc.). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "20DH0016",
    slug: "flood-20dh0016-river-control-maulawin",
    name: "CONSTRUCTION OF RIVER CONTROL ALONG PAGSANJAN RIVER, BRGY. MAULAWIN, PAGSANJAN, LAGUNA",
    displayName: "River control along Pagsanjan River, Brgy. Maulawin (2020)",
    location: "Barangay Maulawin, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱47,497,725.51 — DPWH contract (infra year 2020, GAA 2020 OO-2)",
    startDate: "2020-06-23",
    targetCompletion: "2021-03-05",
    description:
      "DPWH river control along Pagsanjan River in Brgy. Maulawin (contract 20DH0016, Orani Construction and Supply Corporation). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "18DH0078",
    slug: "flood-18dh0078-open-canal-maulawin",
    name: "CONSTRUCTION OF OPEN CANAL, BRGY. MAULAWIN, MUNICIPALITY OF PAGSANJAN, LAGUNA",
    displayName: "Open canal, Brgy. Maulawin",
    location: "Barangay Maulawin, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱4,818,177.50 — DPWH contract (infra year 2018, GAA 2018 LP)",
    startDate: "2018-07-04",
    targetCompletion: "2018-10-31",
    description:
      "DPWH open canal in Brgy. Maulawin (contract 18DH0078, Justbilt Builders). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "21DH0010",
    slug: "flood-21dh0010-river-control-magdapio",
    name: "CONSTRUCTION OF FLOOD MITIGATION STRUCTURE, CONSTRUCTION OF RIVER CONTROL ALONG PAGSANJAN RIVER, BRGY. MAGDAPIO, PAGSANJAN, LAGUNA",
    displayName: "River control along Pagsanjan River, Brgy. Magdapio (2021)",
    location: "Barangay Magdapio, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱93,603,640.05 — DPWH contract (infra year 2021, GAA 2021 OO-2)",
    startDate: "2021-04-05",
    targetCompletion: "2022-05-10",
    description:
      "DPWH flood mitigation and river control along Pagsanjan River in Brgy. Magdapio (contract 21DH0010, Newbig Four J Construction Inc.). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "24DH0035",
    slug: "flood-24dh0035-balanac-sampaloc-dos",
    name: "CONSTRUCTION OF FLOOD CONTROL STRUCTURE ALONG BALANAC RIVER, BARANGAY SAMPALOC DOS, PAGSANJAN, LAGUNA",
    displayName: "Flood control along Balanac River, Sampaloc Dos",
    location: "Sampaloc Dos, Pagsanjan, Laguna",
    status: "completed",
    budget: "₱96,499,165.86 — DPWH contract (infra year 2024, GAA 2024 SSP)",
    startDate: "2024-03-15",
    targetCompletion: "2024-10-04",
    description:
      "DPWH flood control along Balanac River in Sampaloc Dos (contract 24DH0035, Protech Construction & Development Corp.). Completed with 100% progress as published — barangay naming as published; an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "24DH0034",
    slug: "flood-24dh0034-balanac-poblacion-dos",
    name: "CONSTRUCTION OF FLOOD CONTROL STRUCTURE ALONG BALANAC RIVER, BARANGAY POBLACION DOS, PAGSANJAN, LAGUNA",
    displayName: "Flood control along Balanac River, Poblacion Dos",
    location: "Poblacion Dos, Pagsanjan, Laguna",
    status: "ongoing",
    budget: "₱57,899,695.61 — DPWH contract (infra year 2024, GAA 2024 SSP)",
    startDate: "2024-03-15",
    description:
      "DPWH flood control along Balanac River in Poblacion Dos (contract 24DH0034, 11 Diamond Eagle Construction Corporation). On-going at 65.44% progress as published — barangay naming as published; an implementation record, not a funding authorization.",
  }),
  dpwhRecord({
    contractId: "18DH0032",
    slug: "flood-18dh0032-river-control-pagsanjan",
    name: "CONSTRUCTION/MAINTENANCE FOR FLOOD MITIGATION, STRUCTURES AND DRAINAGE SYSTEM, CONSTRUCTION OF RIVER CONTROL ALONG PAGSANJAN RIVER, PAGSANJAN, LAGUNA",
    displayName: "River control along Pagsanjan River, Pagsanjan (2018)",
    location: "Pagsanjan, Laguna",
    status: "completed",
    budget: "₱38,981,180.65 — DPWH contract (infra year 2018, GAA 2018 OO-2)",
    startDate: "2018-02-21",
    targetCompletion: "2019-02-27",
    description:
      "DPWH flood mitigation and river control along Pagsanjan River in Pagsanjan town (contract 18DH0032, Newbig Four J Construction Inc.; no barangay in the published description). Completed with 100% progress as published — an implementation record, not a funding authorization.",
  }),
];

export function getFloodControlProjectBySlug(
  slug: string,
): PublicProject | undefined {
  return floodControlProjects.find((project) => project.slug === slug);
}
