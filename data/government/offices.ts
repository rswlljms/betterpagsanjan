import { LAST_CHECKED } from "@/data/sources";
import type { GovernmentOffice } from "@/types/civic";

/**
 * Directory of municipal offices. Entries describe the standard offices
 * that Philippine municipalities maintain under the Local Government Code
 * (RA 7160) and related laws. Pagsanjan-specific contact details, addresses,
 * and office hours are deliberately left out until verified from official
 * sources (AGENTS.md §14). No officials are listed anywhere on the platform.
 */
export const offices: GovernmentOffice[] = [
  {
    id: "office-of-the-mayor",
    name: "Office of the Municipal Mayor",
    group: "executive",
    description:
      "Heads the municipal government, executes laws and ordinances, and oversees municipal administration, programs, and services.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "This office is mandated for every municipality under RA 7160. Pagsanjan office hours and contact details have not yet been verified.",
    },
  },
  {
    id: "sangguniang-bayan",
    name: "Sangguniang Bayan (Municipal Council)",
    group: "legislative",
    description:
      "The municipal legislative body, presided over by the Vice Mayor. Passes ordinances, approves resolutions, and appropriates municipal funds.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "The Sangguniang Bayan is mandated for every municipality under RA 7160. Pagsanjan session schedules and contact details have not yet been verified.",
    },
  },
  {
    id: "municipal-treasurer",
    name: "Municipal Treasurer's Office",
    group: "finance",
    description:
      "Collects local taxes, fees, and charges — including real property tax — and keeps municipal funds.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    services: ["real-property-tax"],
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Contact details and payment schedules for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "municipal-assessor",
    name: "Municipal Assessor's Office",
    group: "finance",
    description:
      "Appraises and assesses real property within the municipality for taxation purposes, and keeps tax declarations.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Contact details and procedures for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "business-permits-and-licensing",
    name: "Business Permits and Licensing Office",
    group: "administration",
    description:
      "Handles new business permit applications and annual renewals. The exact office name and setup in Pagsanjan still need verification.",
    services: ["business-permit", "business-permit-renewal"],
    verification: {
      status: "pending",
      note: "Business permitting is a standard municipal function, but the responsible Pagsanjan office and its contact details have not yet been verified.",
    },
  },
  {
    id: "municipal-civil-registrar",
    name: "Municipal Civil Registrar's Office",
    group: "administration",
    description:
      "Registers vital events — births, marriages, and deaths — and keeps the civil registry records of the municipality.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    services: ["birth-certificate", "marriage-certificate", "death-certificate"],
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Contact details and fees for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "rural-health-unit",
    name: "Municipal Health Office / Rural Health Unit",
    group: "health-social",
    description:
      "Provides primary health care: consultations, immunization, maternal and child health, and local health programs.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    services: ["health-services"],
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Clinic schedules and contact details for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "mswdo",
    name: "Municipal Social Welfare and Development Office",
    group: "health-social",
    description:
      "Implements social welfare programs and assistance for families, senior citizens, persons with disabilities, women, children, and youth.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    services: ["senior-citizen-id"],
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Program lists and contact details for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "mpdo",
    name: "Municipal Planning and Development Office",
    group: "administration",
    description:
      "Prepares integrated development plans, coordinates municipal development programs, and maintains the comprehensive land use plan.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Contact details for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "municipal-engineering",
    name: "Municipal Engineering Office",
    group: "administration",
    description:
      "Provides engineering services for municipal infrastructure, public works, and government building projects.",
    statutoryBasis: "Local Government Code of 1991 (RA 7160)",
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Contact details for Pagsanjan have not yet been verified.",
    },
  },
  {
    id: "building-official",
    name: "Office of the Building Official",
    group: "administration",
    description:
      "Issues building permits and enforces the National Building Code within the municipality.",
    statutoryBasis: "National Building Code of the Philippines (PD 1096)",
    services: ["building-permit"],
    verification: {
      status: "pending",
      sourceId: "pd-1096",
      note: "The office responsible for building permits in Pagsanjan and its contact details have not yet been verified.",
    },
  },
  {
    id: "mdrrmo",
    name: "Municipal Disaster Risk Reduction and Management Office (MDRRMO)",
    group: "safety",
    description:
      "Leads disaster preparedness, response, and risk reduction, and coordinates early warning and emergency operations in the municipality.",
    statutoryBasis:
      "Philippine Disaster Risk Reduction and Management Act of 2010 (RA 10121)",
    verification: {
      status: "pending",
      sourceId: "ra-10121",
      note: "An MDRRMO is mandated for every municipality under RA 10121. Pagsanjan emergency contact numbers have not yet been verified — for emergencies, call 911.",
    },
  },
];

export function getOffice(id: string): GovernmentOffice | undefined {
  return offices.find((office) => office.id === id);
}

export const LAST_CHECKED_LABEL = LAST_CHECKED;
