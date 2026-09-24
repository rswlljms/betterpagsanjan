import type { StatisticItem } from "@/types/civic";

/**
 * Verified statistics only (AGENTS.md §43). Conflicting figures between
 * sources are shown with their conflict — never silently averaged or
 * replaced with a made-up number (AGENTS.md §48).
 *
 * Census populations and the Q2_2024 income classification below are per
 * the PSGC Q2_2024 snapshot for Pagsanjan (code 0403419000), retrieved via
 * the BetterGov PSA Classification API mirror of PSA data
 * (source: bettergov-psgc-api; PSA remains authoritative). Figures were
 * transcribed in September 2026 and cross-checked against the PSA listing
 * and secondary compilations.
 */
export const statistics: StatisticItem[] = [
  {
    id: "population-2024",
    label: "Population",
    value: "45,602",
    context: "2024 Census of Population (POPCEN), declared official in 2025",
    year: "2024",
    sourceId: "bettergov-psgc-api",
    sourceUrl:
      "https://statistics.bettergov.ph/api/classification/psgc/Q2_2024/municipalities?prv=34&page_size=50",
    note: "PSGC Q2_2024 populations array (PSA data via mirror) for Pagsanjan (0403419000). Cross-checked with the PSA listing.",
  },
  {
    id: "population-2020",
    label: "Population (previous census)",
    value: "44,327",
    context: "2020 Census of Population and Housing",
    year: "2020",
    sourceId: "bettergov-psgc-api",
    sourceUrl:
      "https://statistics.bettergov.ph/api/classification/psgc/Q2_2024/municipalities?prv=34&page_size=50",
    note: "PSGC Q2_2024 populations array (PSA data via mirror). Cross-checked with the PhilAtlas secondary compilation attributing the same figure to the PSA 2020 census.",
  },
  {
    id: "population-2015",
    label: "Population (2015 census)",
    value: "42,164",
    context: "2015 Census of Population",
    year: "2015",
    sourceId: "bettergov-psgc-api",
    sourceUrl:
      "https://statistics.bettergov.ph/api/classification/psgc/Q2_2024/municipalities?prv=34&page_size=50",
    note: "PSGC Q2_2024 populations array (PSA data via mirror). Included for census trend comparison.",
  },
  {
    id: "barangays",
    label: "Barangays",
    value: "16",
    year: "2026",
    sourceId: "psa-psgc",
    sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
    note: "Count per the PSA listing, confirmed by 16 barangay records (codes 0403419001–0403419016) in the PSGC Q2_2024 snapshot via the BetterGov classification mirror.",
  },
  {
    id: "income-class",
    label: "Income classification",
    value: "2nd class (PSA) · 3rd class (DTI CMCI)",
    context: "Municipality income class",
    year: "2026",
    sourceId: "psa-psgc",
    sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
    note: "Conflicting figures: the PSA PSGC page text indicates 2nd class while the DTI CMCI LGU profile lists Pagsanjan as a Third Class Municipality. The PSGC Q2_2024 snapshot via the BetterGov classification mirror also lists 3rd (matching CMCI). All are shown rather than picking one; verify with official sources.",
  },
  {
    id: "land-area",
    label: "Land area",
    value: "26.4–27.4 km²",
    context: "Reported figures conflict between secondary sources",
    sourceId: "philatlas-pagsanjan",
    note: "Conflicting figures: PhilAtlas reports 27.40 km² and Wikipedia reports 26.36 km². No PSA-published figure could be confirmed, so both are shown rather than averaging them.",
  },
];
