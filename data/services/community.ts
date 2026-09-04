import { LAST_CHECKED } from "@/data/sources";
import type { GovernmentService } from "@/types/civic";

/**
 * Taxation, health, social, and barangay-level services.
 */
export const communityServices: GovernmentService[] = [
  {
    id: "real-property-tax",
    slug: "real-property-tax",
    title: "Real Property Tax Payment",
    category: "taxation",
    description:
      "Real property tax is levied on land, buildings, and machinery within a municipality and is collected by the Municipal Treasurer's Office. This page will list assessment and payment details for Pagsanjan once verified.",
    aliases: [
      "rpt",
      "amilyar",
      "property tax",
      "land tax",
      "tax declaration",
      "pay real property tax",
    ],
    office: { name: "Municipal Treasurer's Office" },
    officialChannel: {
      label: "Municipal Treasurer's Office at the Pagsanjan Municipal Hall",
      note: "BetterPagsanjan cannot accept tax payments. Pay only through official government channels.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Real property tax collection is a municipal function under the Local Government Code. Pagsanjan-specific rates, schedules, and procedures have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
    featured: true,
  },
  {
    id: "health-services",
    slug: "health-services",
    title: "Health Services (Consultation & Check-up)",
    category: "health",
    description:
      "Municipal health offices and rural health units provide primary health care such as consultations, immunization, maternal and child health services, and health programs for residents.",
    aliases: [
      "rural health unit",
      "rhu",
      "medical consultation",
      "check up",
      "immunization",
      "vaccination",
      "free medicine",
      "health center",
    ],
    office: { name: "Rural Health Unit" },
    officialChannel: {
      label: "Rural Health Unit of Pagsanjan",
      note: "For emergencies, call 911. BetterPagsanjan does not provide medical advice.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Primary health care is a mandated municipal function under the Local Government Code. Pagsanjan clinic schedules, programs, and contact details have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
    featured: true,
  },
  {
    id: "senior-citizen-id",
    slug: "senior-citizen-id",
    title: "Senior Citizen ID and Assistance",
    category: "social",
    description:
      "Senior citizens are entitled to benefits and privileges under the Expanded Senior Citizens Act (RA 9994), including a national ID issued through the Office of the Senior Citizens Affairs (OSCA) in each municipality.",
    aliases: [
      "osca",
      "senior id",
      "senior citizen discount",
      "seniors assistance",
      "ra 9994",
    ],
    office: { name: "Office of the Senior Citizens Affairs (OSCA)" },
    officialChannel: {
      label: "OSCA / Municipal Social Welfare and Development Office",
      note: "BetterPagsanjan cannot process ID applications or benefit claims.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-9994",
      note: "The OSCA and senior citizen benefits are mandated by RA 9994. Pagsanjan application requirements and office details have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
    featured: true,
  },
  {
    id: "barangay-clearance",
    slug: "barangay-clearance",
    title: "Barangay Clearance",
    category: "barangay",
    description:
      "A barangay clearance certifies that a person is a resident of good standing in a barangay. It is commonly required for employment, school enrollment, and business applications, and is issued by the barangay where you live.",
    aliases: [
      "barangay certificate",
      "barangay business clearance",
      "certificate of residency",
      "barangay hall",
    ],
    office: { name: "Barangay Hall of your barangay" },
    officialChannel: {
      label: "Barangay hall of the barangay where you reside",
      note: "BetterPagsanjan cannot issue clearances. Contact your barangay office directly.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Barangays issue clearances under the Local Government Code. Pagsanjan barangay fees and requirements have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
    featured: true,
  },
];
