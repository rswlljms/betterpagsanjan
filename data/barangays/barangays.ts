import type { Barangay } from "@/types/civic";

/**
 * The 16 barangays of Pagsanjan. Count confirmed against the PSA Philippine
 * Standard Geographic Code; names cross-checked against two secondary
 * compilations (PhilAtlas, Wikipedia) that agree with the PSGC listing.
 *
 * 10-digit PSGC codes are per the PSGC Q2_2024 snapshot, retrieved via the
 * BetterGov PSA Classification API mirror of PSA data
 * (source: bettergov-psgc-api; PSA remains authoritative). Codes were
 * transcribed in September 2026 from a filtered barangay query
 * (reg=4, prv=34, mun=19).
 *
 * Barangay officials, offices, and contact details are deliberately absent
 * until verified from official sources (AGENTS.md §14, §20).
 *
 * 2024 POPCEN populations and urban/rural tags below are transcribed from
 * the PSA PSGC page for Pagsanjan (source: psa-psgc). psa.gov.ph blocks
 * automated access, so figures were read from the search-indexed PSA page
 * in September 2026 and cross-checked by summation: the 16 barangay
 * figures total exactly 45,602, matching the municipal 2024 census total.
 */
export const barangays: Barangay[] = [
  {
    id: "anibong",
    slug: "anibong",
    name: "Anibong",
    psgcCode: "0403419001",
    population2024: 420,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing for Pagsanjan, cross-checked with secondary compilations. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "barangay-i",
    slug: "barangay-i",
    name: "Barangay I (Poblacion)",
    description:
      "One of the two poblacion barangays at the town proper, where the Municipal Hall is located.",
    psgcCode: "0403419012",
    population2024: 1491,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. The Municipal Hall location note is from the DTI CMCI LGU profile. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "barangay-ii",
    slug: "barangay-ii",
    name: "Barangay II (Poblacion)",
    description: "One of the two poblacion barangays at the town proper.",
    psgcCode: "0403419013",
    population2024: 1945,
    urbanRural: "Urban",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "binan",
    slug: "binan",
    name: "Biñan",
    psgcCode: "0403419002",
    population2024: 6494,
    urbanRural: "Urban",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "buboy",
    slug: "buboy",
    name: "Buboy",
    psgcCode: "0403419003",
    population2024: 1838,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "cabanbanan",
    slug: "cabanbanan",
    name: "Cabanbanan",
    psgcCode: "0403419004",
    population2024: 5736,
    urbanRural: "Urban",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "calusiche",
    slug: "calusiche",
    name: "Calusiche",
    psgcCode: "0403419005",
    population2024: 1107,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "dingin",
    slug: "dingin",
    name: "Dingin",
    psgcCode: "0403419006",
    population2024: 1747,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "lambac",
    slug: "lambac",
    name: "Lambac",
    psgcCode: "0403419007",
    population2024: 1120,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "layugan",
    slug: "layugan",
    name: "Layugan",
    psgcCode: "0403419008",
    population2024: 457,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "magdapio",
    slug: "magdapio",
    name: "Magdapio",
    description:
      "Shares its name with Magdapio Falls, the falls popularly known as Pagsanjan Falls.",
    psgcCode: "0403419009",
    population2024: 2525,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. The falls name association is from secondary reference material. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "maulawin",
    slug: "maulawin",
    name: "Maulawin",
    psgcCode: "0403419010",
    population2024: 4684,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "pinagsanjan",
    slug: "pinagsanjan",
    name: "Pinagsanjan",
    psgcCode: "0403419011",
    population2024: 5194,
    urbanRural: "Urban",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "sabang",
    slug: "sabang",
    name: "Sabang",
    psgcCode: "0403419014",
    population2024: 3799,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "sampaloc",
    slug: "sampaloc",
    name: "Sampaloc",
    psgcCode: "0403419015",
    population2024: 4267,
    urbanRural: "Urban",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
  {
    id: "san-isidro",
    slug: "san-isidro",
    name: "San Isidro",
    psgcCode: "0403419016",
    population2024: 2778,
    urbanRural: "Rural",
    verification: {
      status: "verified",
      sourceId: "psa-psgc",
      sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
      verifiedAt: "2026-09-03",
      note: "Barangay name per the PSA PSGC listing. 10-digit code per the PSGC Q2_2024 snapshot via the BetterGov classification mirror (PSA data).",
    },
  },
];

export function getBarangayBySlug(slug: string): Barangay | undefined {
  return barangays.find((barangay) => barangay.slug === slug);
}
