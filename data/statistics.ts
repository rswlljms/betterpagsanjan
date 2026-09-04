import type { StatisticItem } from "@/types/civic";

/**
 * Verified statistics only (AGENTS.md §43). Conflicting figures between
 * sources are shown with their conflict — never silently averaged or
 * replaced with a made-up number (AGENTS.md §48).
 */
export const statistics: StatisticItem[] = [
  {
    id: "population-2024",
    label: "Population",
    value: "45,602",
    context: "2024 Census of Population (POPCEN), declared official in 2025",
    year: "2024",
    sourceId: "psa-psgc",
    sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
  },
  {
    id: "population-2020",
    label: "Population (previous census)",
    value: "44,327",
    context: "2020 Census of Population and Housing",
    year: "2020",
    sourceId: "philatlas-pagsanjan",
    note: "Secondary compilation attributing the figure to the PSA 2020 census. Included for comparison with the 2024 count.",
  },
  {
    id: "barangays",
    label: "Barangays",
    value: "16",
    year: "2026",
    sourceId: "psa-psgc",
    sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
  },
  {
    id: "income-class",
    label: "Income classification",
    value: "2nd class (PSA) · 3rd class (DTI CMCI)",
    context: "Municipality income class",
    year: "2026",
    sourceId: "psa-psgc",
    sourceUrl: "https://psa.gov.ph/classification/psgc/barangays/0403419000",
    note: "Conflicting figures: the PSA PSGC listing indicates 2nd class while the DTI CMCI LGU profile lists Pagsanjan as a Third Class Municipality. Both are shown rather than picking one; verify with official sources.",
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
