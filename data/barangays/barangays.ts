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
 */
export const barangays: Barangay[] = [
  {
    id: "anibong",
    slug: "anibong",
    name: "Anibong",
    psgcCode: "0403419001",
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
