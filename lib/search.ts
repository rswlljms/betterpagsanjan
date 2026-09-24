import { barangays } from "@/data/barangays/barangays";
import { consultations } from "@/data/consultations";
import { offices } from "@/data/government/offices";
import { reportingCategories } from "@/data/reporting";
import { legislativeDocuments } from "@/data/legislative/documents";
import { civicLocations } from "@/data/locations/locations";
import { floodControlProjects } from "@/data/projects/flood-control";
import { projects } from "@/data/projects/projects";
import { getServiceCategory, services } from "@/data/services";
import { transparencyRecords } from "@/data/transparency/records";

export type SearchResultType =
  | "service"
  | "office"
  | "barangay"
  | "legislative"
  | "project"
  | "transparency"
  | "location"
  | "consultation"
  | "page";

export interface SearchRecord {
  id: string;
  title: string;
  type: SearchResultType;
  description: string;
  href: string;
  keywords: string[];
  badge?: string;
}

const pageRecords: SearchRecord[] = [
  {
    id: "page-services",
    title: "Services",
    type: "page",
    description:
      "Find Pagsanjan government services — permits, certificates, taxes, and assistance — explained in plain language.",
    href: "/services",
    keywords: [
      "permit",
      "clearance",
      "certificate",
      "fees",
      "requirements",
      "office",
      "service finder",
    ],
  },
  {
    id: "page-government",
    title: "Government directory",
    type: "page",
    description:
      "Municipal offices, their functions, and how to reach the responsible offices in Pagsanjan.",
    href: "/government",
    keywords: [
      "offices",
      "mayor",
      "sanggunian",
      "directory",
      "departments",
      "municipal hall",
    ],
  },
  {
    id: "page-barangays",
    title: "Barangays",
    type: "page",
    description: "Directory of the barangays of Pagsanjan, Laguna.",
    href: "/barangays",
    keywords: ["barangay", "directory", "villages", "districts"],
  },
  {
    id: "page-announcements",
    title: "Announcements",
    type: "page",
    description:
      "Announcements, advisories, and public notices sourced from official channels.",
    href: "/announcements",
    keywords: ["news", "advisory", "notice", "bulletin", "updates", "events"],
  },
  {
    id: "page-transparency",
    title: "Transparency",
    type: "page",
    description:
      "Budget, procurement, projects, and public document information for Pagsanjan.",
    href: "/transparency",
    keywords: [
      "budget",
      "procurement",
      "financial",
      "documents",
      "audit",
      "open data",
    ],
  },
  {
    id: "page-ordinances",
    title: "Ordinances",
    type: "page",
    description: "Searchable public index of Pagsanjan municipal ordinances.",
    href: "/ordinances",
    keywords: ["ordinance", "legislation", "law", "sangguniang bayan"],
  },
  {
    id: "page-resolutions",
    title: "Resolutions",
    type: "page",
    description: "Searchable public index of Pagsanjan municipal resolutions.",
    href: "/resolutions",
    keywords: ["resolution", "legislation", "sangguniang bayan"],
  },
  {
    id: "page-projects",
    title: "Projects",
    type: "page",
    description:
      "Public project directory with status information, based on verified public records.",
    href: "/projects",
    keywords: [
      "infrastructure",
      "programs",
      "ongoing",
      "completed",
      "flood control",
    ],
  },
  {
    id: "page-consultations",
    title: "Public consultations",
    type: "page",
    description:
      "Consultation notices with opening dates, official documents, and how to participate through official channels.",
    href: "/consultations",
    keywords: [
      "consultation",
      "public hearing",
      "participation",
      "feedback",
      "ordinance draft",
      "notice",
    ],
  },
  {
    id: "page-report",
    title: "Report a community issue",
    type: "page",
    description:
      "Guide to reporting road damage, flooding, garbage, streetlights, and other concerns through official channels. BetterPagsanjan does not receive reports.",
    href: "/report",
    keywords: [
      "report",
      "complaint",
      "road damage",
      "flooding",
      "drainage",
      "garbage",
      "streetlight",
      "traffic",
      "barangay",
      "municipal hall",
    ],
  },
  {
    id: "page-statistics",
    title: "Statistics",
    type: "page",
    description:
      "Pagsanjan statistics with sources: population, geography, and more.",
    href: "/statistics",
    keywords: [
      "population",
      "census",
      "demographics",
      "data",
      "figures",
      "psa",
    ],
  },
  {
    id: "page-emergency",
    title: "Emergency information",
    type: "page",
    description:
      "Emergency hotlines, disaster preparedness guides, and safety information for Pagsanjan.",
    href: "/emergency",
    keywords: [
      "emergency",
      "hotline",
      "disaster",
      "typhoon",
      "bagyo",
      "flood",
      "baha",
      "evacuation",
      "911",
      "mdrrmo",
      "safety",
      "earthquake",
    ],
  },
  {
    id: "page-tourism",
    title: "Explore Pagsanjan",
    type: "page",
    description:
      "Pagsanjan's falls, rivers, history, and heritage — with sources.",
    href: "/tourism",
    keywords: [
      "tourism",
      "falls",
      "pagsanjan gorge",
      "rapids",
      "shooting the rapids",
      "history",
      "heritage",
      "travel",
      "visit",
    ],
  },
  {
    id: "page-map",
    title: "Civic map",
    type: "page",
    description:
      "Interactive map of government, emergency, health, and community locations in Pagsanjan.",
    href: "/map",
    keywords: ["map", "locations", "facilities", "evacuation centers"],
  },
  {
    id: "page-about",
    title: "About",
    type: "page",
    description:
      "What BetterPagsanjan is, what it is not, and how information is verified.",
    href: "/about",
    keywords: ["about", "independent", "project", "mission", "contact"],
  },
  {
    id: "page-sources",
    title: "Sources",
    type: "page",
    description:
      "The source registry behind BetterPagsanjan's civic information.",
    href: "/sources",
    keywords: ["sources", "references", "attribution", "citations", "registry"],
  },
  {
    id: "page-ask",
    title: "Ask BetterPagsanjan",
    type: "page",
    description:
      "Ask a question in plain language and get links to the pages that answer it. Retrieval-only — it never guesses.",
    href: "/ask",
    keywords: ["ask", "assistant", "help", "question", "chat"],
  },
  {
    id: "page-service-guide",
    title: "Which service do I need?",
    type: "page",
    description:
      "Answer two quick questions in plain language and get pointed to the right government service.",
    href: "/services/guide",
    keywords: ["guide", "which service", "help", "start", "quiz", "assistant"],
  },
];

export const searchIndex: SearchRecord[] = [
  ...services.map((service): SearchRecord => {
    const category = getServiceCategory(service.category);
    return {
      id: `service-${service.id}`,
      title: service.title,
      type: "service",
      description: service.description,
      href: `/services/${service.slug}`,
      keywords: [
        ...(service.aliases ?? []),
        category?.name ?? "",
        service.office?.name ?? "",
      ].filter(Boolean),
      badge: category?.name,
    };
  }),
  ...offices.map((office): SearchRecord => ({
    id: `office-${office.id}`,
    title: office.name,
    type: "office",
    description: office.description,
    href: "/government",
    keywords: [office.group.replace("-", " "), ...(office.services ?? [])],
    badge: "Government office",
  })),
  ...barangays.map((barangay): SearchRecord => ({
    id: `barangay-${barangay.id}`,
    title: `Barangay ${barangay.name}`,
    type: "barangay",
    description: barangay.description ?? "Barangay of Pagsanjan, Laguna.",
    href: `/barangays/${barangay.slug}`,
    keywords: ["barangay", "pagsanjan"],
  })),
  ...legislativeDocuments.map((doc): SearchRecord => ({
    id: `legislative-${doc.id}`,
    title: doc.number ? `${doc.number} — ${doc.title}` : doc.title,
    type: "legislative",
    description: doc.summary,
    href:
      doc.documentType === "ordinance"
        ? `/ordinances/${doc.slug}`
        : `/resolutions/${doc.slug}`,
    keywords: [
      doc.documentType,
      doc.number ?? "",
      doc.year ?? "",
      ...(doc.topics ?? []),
    ].filter(Boolean),
    badge: doc.documentType === "ordinance" ? "Ordinance" : "Resolution",
  })),
  ...[...projects, ...floodControlProjects].map((project): SearchRecord => ({
    id: `project-${project.id}`,
    title: project.displayName ?? project.name,
    type: "project",
    description: project.description,
    href: `/projects/${project.slug}`,
    keywords: [
      project.name,
      project.status,
      project.location ?? "",
      project.implementingOffice ?? "",
    ].filter(Boolean),
    badge: "Project",
  })),
  ...transparencyRecords.map((record): SearchRecord => ({
    id: `transparency-${record.id}`,
    title: record.title,
    type: "transparency",
    description: record.description,
    href: "/transparency",
    keywords: [record.category, record.year ?? ""].filter(Boolean),
    badge: "Transparency",
  })),
  ...consultations.map((consultation): SearchRecord => ({
    id: `consultation-${consultation.id}`,
    title: consultation.topic,
    type: "consultation",
    description: consultation.description,
    href: `/consultations/${consultation.slug}`,
    keywords: [
      "consultation",
      consultation.opensAt ?? "",
      consultation.closesAt ?? "",
    ].filter(Boolean),
    badge: "Consultation",
  })),
  ...reportingCategories.map((category): SearchRecord => ({
    id: `report-${category.id}`,
    title: `${category.title} — how to report`,
    type: "page",
    description: category.description,
    href: "/report",
    keywords: ["report", category.title, ...category.examples].filter(Boolean),
    badge: "Reporting guide",
  })),
  ...civicLocations.map((location): SearchRecord => ({
    id: `location-${location.id}`,
    title: location.name,
    type: "location",
    description:
      location.description ?? location.address ?? "Verified civic location.",
    href: "/map",
    keywords: [location.category, location.address ?? ""].filter(Boolean),
    badge: "Location",
  })),
  ...pageRecords,
];

/**
 * Simple client-side ranked search. Every term must match somewhere;
 * title matches rank highest. Enough for the initial dataset — swap for
 * PostgreSQL full-text search when the dataset grows (AGENTS.md §9).
 */
export function searchRecords(
  records: SearchRecord[],
  query: string,
): SearchRecord[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: { record: SearchRecord; score: number }[] = [];

  for (const record of records) {
    const title = record.title.toLowerCase();
    const keywords = record.keywords.join(" ").toLowerCase();
    const description = record.description.toLowerCase();
    let score = 0;
    let matchedAll = true;

    for (const term of terms) {
      if (title.startsWith(term)) score += 40;
      else if (title.includes(term)) score += 30;
      else if (keywords.includes(term)) score += 20;
      else if (description.includes(term)) score += 10;
      else {
        matchedAll = false;
        break;
      }
    }

    if (matchedAll && score > 0) scored.push({ record, score });
  }

  return scored.sort((a, b) => b.score - a.score).map((entry) => entry.record);
}

/** Filler words stripped before question-tolerant ranking (EN + Filipino). */
const stopwords = new Set([
  "how",
  "what",
  "where",
  "when",
  "who",
  "which",
  "do",
  "does",
  "did",
  "is",
  "are",
  "was",
  "were",
  "am",
  "be",
  "can",
  "could",
  "would",
  "should",
  "i",
  "me",
  "my",
  "we",
  "you",
  "your",
  "the",
  "a",
  "an",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "get",
  "got",
  "need",
  "needs",
  "want",
  "please",
  "tell",
  "give",
  "know",
  "about",
  "it",
  "this",
  "that",
  "there",
  "with",
  "from",
  "paano",
  "ano",
  "ang",
  "ng",
  "mga",
  "sa",
  "ko",
  "nang",
  "ay",
  "ba",
  "po",
]);

/**
 * Question-tolerant ranked retrieval for the Ask assistant and /api/ask.
 * Unlike searchRecords (every term must match — right for keyword search),
 * this strips filler words and ranks by any-term score, so natural
 * questions like "How do I get a business permit?" find the right pages.
 * Returns at most `limit` records scoring at least `minScore`.
 *
 * Score weights: title start 40 / title includes 30 / keyword 20 /
 * description 10. A minScore of 30 means at least one meaningful term
 * appears in a page title — the /api/ask relevance gate uses this so the
 * model is only called for questions with a genuine on-site anchor.
 */
export function searchRecordsRanked(
  records: SearchRecord[],
  query: string,
  limit = 4,
  minScore = 0,
): SearchRecord[] {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 2 && !stopwords.has(term));
  if (terms.length === 0) return [];

  const scored: { record: SearchRecord; score: number }[] = [];

  for (const record of records) {
    const title = record.title.toLowerCase();
    const keywords = record.keywords.join(" ").toLowerCase();
    const description = record.description.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (title.startsWith(term)) score += 40;
      else if (title.includes(term)) score += 30;
      else if (keywords.includes(term)) score += 20;
      else if (description.includes(term)) score += 10;
    }

    if (score >= Math.max(1, minScore)) scored.push({ record, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.record);
}
