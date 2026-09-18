import { LAST_CHECKED } from "@/data/sources";
import type { ReportingCategory } from "@/types/civic";

/**
 * Community issue reporting guide (AGENTS.md §26).
 *
 * This is an INFORMATIONAL guide only. BetterPagsanjan does not receive,
 * forward, or track reports — nothing read here is sent to the LGU. Each
 * card points the reader to the official channel where an actual report
 * is filed.
 *
 * Office mappings below follow the standard functions of municipal
 * offices under RA 7160 / RA 10121. The specific Pagsanjan routing has
 * not been verified, so every record stays `pending` with a note to
 * confirm with the Municipal Hall or barangay hall. No reporting
 * hotlines are invented — the only numbers cited are the verified
 * Municipal Hall trunkline (DTI CMCI) and 911 (DILG).
 */

function guide(
  entry: Omit<ReportingCategory, "verification" | "lastChecked"> & {
    sourceId?: string;
  },
): ReportingCategory {
  const { sourceId = "ra-7160", ...rest } = entry;
  return {
    ...rest,
    verification: {
      status: "pending",
      sourceId,
      note: "General guidance based on the standard functions of municipal offices. The responsible Pagsanjan office and its reporting procedure have not yet been verified — confirm with the Municipal Hall or your barangay hall.",
    },
    lastChecked: LAST_CHECKED,
  };
}

const LOCATION_PREP = [
  "Exact location — street, landmark, and barangay",
  "Date and time you observed the issue",
  "A photo from a safe distance, if it is safe to take one",
];

export const reportingCategories: ReportingCategory[] = [
  guide({
    id: "road-damage",
    title: "Road damage",
    description:
      "Potholes, cracked pavement, damaged road shoulders, or debris that makes a public road unsafe.",
    examples: ["Potholes", "Caved-in road section", "Debris blocking a road"],
    officeId: "municipal-engineering",
    officeNote:
      "Start with the Municipal Hall or your barangay hall — they will route the report to the office responsible for the road.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "flooding",
    title: "Flooding",
    description:
      "Flooded streets, overflowing waterways, or rising water that threatens homes during heavy rain.",
    examples: [
      "Flooded street",
      "Overflowing creek or drainage",
      "Water entering homes",
    ],
    officeId: "mdrrmo",
    urgent: true,
    whatToPrepare: LOCATION_PREP,
    sourceId: "ra-10121",
  }),
  guide({
    id: "drainage",
    title: "Drainage",
    description:
      "Clogged, broken, or overflowing canals and drains that cause standing water even without heavy rain.",
    examples: [
      "Clogged canal",
      "Broken drain cover",
      "Standing water from a blocked drain",
    ],
    officeId: "municipal-engineering",
    officeNote:
      "Start with the Municipal Hall or your barangay hall — they will route the report to the office responsible for drainage.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "garbage",
    title: "Garbage",
    description:
      "Uncollected waste, illegal dumping, or overflowing bins in public areas.",
    examples: [
      "Uncollected garbage",
      "Illegal dumping",
      "Overflowing public bin",
    ],
    officeNote:
      "Responsible office in Pagsanjan: information not yet available. Start with the Municipal Hall or your barangay hall.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "streetlights",
    title: "Streetlights",
    description:
      "Broken, flickering, or dark streetlights that make a public road or pathway unsafe at night.",
    examples: [
      "Broken streetlight",
      "Flickering streetlight",
      "Dark stretch of public road",
    ],
    officeId: "municipal-engineering",
    officeNote:
      "Start with the Municipal Hall or your barangay hall — they will route the report to the office responsible for streetlights.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "public-facilities",
    title: "Public facilities",
    description:
      "Damage to public buildings, parks, markets, terminals, or other facilities maintained by the municipality.",
    examples: [
      "Damaged public building",
      "Broken park fixture",
      "Damaged public market stall area",
    ],
    officeId: "municipal-engineering",
    officeNote:
      "Start with the Municipal Hall or your barangay hall — they will route the report to the office responsible for the facility.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "traffic",
    title: "Traffic",
    description:
      "Traffic safety concerns on public roads — missing signs, unsafe intersections, or obstructions on sidewalks.",
    examples: [
      "Missing or damaged road sign",
      "Unsafe intersection",
      "Sidewalk blocked by an obstruction",
    ],
    officeNote:
      "Responsible office in Pagsanjan: information not yet available. Start with the Municipal Hall or your barangay hall.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "environment",
    title: "Environment",
    description:
      "Concerns affecting rivers, creeks, trees, or public green areas — including pollution and illegal cutting.",
    examples: [
      "Waste dumped in a river or creek",
      "Suspected illegal tree cutting",
      "Smoke or chemical smell in a public area",
    ],
    officeNote:
      "Responsible office in Pagsanjan: information not yet available. Start with the Municipal Hall or your barangay hall.",
    whatToPrepare: LOCATION_PREP,
  }),
  guide({
    id: "other-concerns",
    title: "Other local concerns",
    description:
      "Any other community concern that does not fit the categories above — describe it and let the receiving office route it.",
    examples: [
      "Stray-animal concern in a public area",
      "Noise or nuisance concern",
      "Concern about a public program",
    ],
    officeNote:
      "Start with the Municipal Hall or your barangay hall — describe the concern and ask which office handles it.",
    whatToPrepare: [
      "A one-sentence description of the concern",
      ...LOCATION_PREP,
    ],
  }),
];

export function getReportingCategory(
  id: string,
): ReportingCategory | undefined {
  return reportingCategories.find((category) => category.id === id);
}
