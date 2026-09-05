import { LAST_CHECKED } from "@/data/sources";
import type {
  TransparencyCategory,
  TransparencyRecord,
} from "@/types/civic";

/**
 * Transparency records (AGENTS.md §22).
 *
 * Seed records below come from two municipal sources, verified September
 * 2026: the 2026 supplemental budgets from appropriation ordinances on the
 * legislative portal, and 2022 financial disclosures plus the Citizen's
 * Charter index on the municipal websites. Every record links to its
 * original — figures are never transcribed, estimated, or invented.
 * Categories without a verified record stay honestly empty.
 */
export const transparencyRecords: TransparencyRecord[] = [
  {
    id: "supplemental-budget-04-2026",
    slug: "supplemental-budget-04-2026",
    title: "Supplemental Budget No. 04-2026 — ₱520,000.00",
    category: "budget",
    description:
      "Priority programs and projects of the municipal government, authorized under Appropriation Ordinance No. 04-2026 (approved August 24, 2026). Also indexed under Ordinances.",
    year: "2026",
    documentUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-04-2026-1788329372.pdf",
    verification: {
      status: "verified",
      sourceId: "pagsanjan-legislative-portal",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-04-2026-1788329372.pdf",
      verifiedAt: "2026-09",
      note: "Amount and authorization as published in the official ordinance PDF.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "supplemental-budget-03-2026",
    slug: "supplemental-budget-03-2026",
    title: "Supplemental Budget No. 03-2026 — ₱6,579,500.00",
    category: "budget",
    description:
      "Priority programs and projects of the municipal government, authorized under Appropriation Ordinance No. 03-2026 (approved July 1, 2026). Also indexed under Ordinances.",
    year: "2026",
    documentUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-03-2026-1785294899.pdf",
    verification: {
      status: "verified",
      sourceId: "pagsanjan-legislative-portal",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-03-2026-1785294899.pdf",
      verifiedAt: "2026-09",
      note: "Amount and authorization as published in the official ordinance PDF.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "supplemental-budget-02-2026",
    slug: "supplemental-budget-02-2026",
    title: "Supplemental Budget No. 02-2026 — ₱31,000,000.00",
    category: "budget",
    description:
      "Authorized under Appropriation Ordinance No. 02-2026 (approved April 15, 2026). Also indexed under Ordinances.",
    year: "2026",
    documentUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-02-2026-1778049205.pdf",
    verification: {
      status: "verified",
      sourceId: "pagsanjan-legislative-portal",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/uploads/documents/appropriation-ordinance-no-02-2026-1778049205.pdf",
      verifiedAt: "2026-09",
      note: "Amount and authorization as published in the official ordinance PDF.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "sipb-2022",
    slug: "sipb-2022",
    title: "Annual Statement of Indebtedness, Payments and Balances",
    category: "financial",
    description:
      "Financial disclosure published on the municipal Transparency Reports page (2022 upload). Figures live in the original image and are not transcribed here.",
    year: "2022",
    documentUrl:
      "http://pagsanjan.gov.ph/wp-content/uploads/2022/03/SIPB-scaled.jpg",
    verification: {
      status: "verified",
      sourceId: "pagsanjan-lgu-website",
      sourceUrl: "https://pagsanjan.gov.ph/?page_id=802",
      verifiedAt: "2026-09",
      note: "Disclosure exists on the official .gov.ph transparency page; dated upload, figures not transcribed.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "sre-2022",
    slug: "sre-2022",
    title: "Statement of Receipts and Expenditures",
    category: "financial",
    description:
      "Financial disclosure published on the municipal Transparency Reports page (2022 upload). Figures live in the original image and are not transcribed here.",
    year: "2022",
    documentUrl:
      "http://pagsanjan.gov.ph/wp-content/uploads/2022/03/SRE-scaled.jpg",
    verification: {
      status: "verified",
      sourceId: "pagsanjan-lgu-website",
      sourceUrl: "https://pagsanjan.gov.ph/?page_id=802",
      verifiedAt: "2026-09",
      note: "Disclosure exists on the official .gov.ph transparency page; dated upload, figures not transcribed.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "citizens-charter",
    slug: "citizens-charter",
    title: "Citizen's Charter",
    category: "documents",
    description:
      "Service standards and procedures published on the official legislative portal. Individual service entries are not yet transcribed — browse the full charter on the portal.",
    documentUrl: "https://www.pagsanjanlaguna.com/citizenscharter",
    verification: {
      status: "verified",
      sourceId: "pagsanjan-legislative-portal",
      sourceUrl: "https://www.pagsanjanlaguna.com/citizenscharter",
      verifiedAt: "2026-09",
      note: "Charter index exists on the official portal; contents not individually transcribed.",
    },
    lastChecked: LAST_CHECKED,
  },
];

export const transparencyCategories: {
  id: TransparencyCategory;
  name: string;
  description: string;
}[] = [
  {
    id: "budget",
    name: "Budget",
    description:
      "Annual budgets, appropriations, and financial summaries once published in verifiable form.",
  },
  {
    id: "procurement",
    name: "Procurement",
    description:
      "Biddings, awards, and contract information from official procurement channels.",
  },
  {
    id: "financial",
    name: "Financial information",
    description:
      "Reports and financial statements released by the local government.",
  },
  {
    id: "plans-programs",
    name: "Plans & programs",
    description:
      "Development plans, programs, and reports with their official sources.",
  },
  {
    id: "documents",
    name: "Public documents",
    description:
      "Development plans, reports, and other public documents with their sources.",
  },
  {
    id: "open-data",
    name: "Open data",
    description:
      "Reusable civic datasets for researchers, journalists, and developers.",
  },
];

export function getTransparencyByCategory(
  category: TransparencyCategory,
): TransparencyRecord[] {
  return transparencyRecords.filter((record) => record.category === category);
}

export function getTransparencyBySlug(
  slug: string,
): TransparencyRecord | undefined {
  return transparencyRecords.find((record) => record.slug === slug);
}
