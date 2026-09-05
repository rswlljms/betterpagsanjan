import { barangays } from "@/data/barangays/barangays";
import { offices } from "@/data/government/offices";
import { legislativeDocuments } from "@/data/legislative/documents";
import { civicLocations } from "@/data/locations/locations";
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
    description:
      "Searchable public index of Pagsanjan municipal ordinances.",
    href: "/ordinances",
    keywords: ["ordinance", "legislation", "law", "sangguniang bayan"],
  },
  {
    id: "page-resolutions",
    title: "Resolutions",
    type: "page",
    description:
      "Searchable public index of Pagsanjan municipal resolutions.",
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
    keywords: ["infrastructure", "programs", "ongoing", "completed", "flood control"],
  },
  {
    id: "page-statistics",
    title: "Statistics",
    type: "page",
    description: "Pagsanjan statistics with sources: population, geography, and more.",
    href: "/statistics",
    keywords: ["population", "census", "demographics", "data", "figures", "psa"],
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
    description: "The source registry behind BetterPagsanjan's civic information.",
    href: "/sources",
    keywords: ["sources", "references", "attribution", "citations", "registry"],
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
  ...projects.map((project): SearchRecord => ({
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
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
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

  return scored
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.record);
}
