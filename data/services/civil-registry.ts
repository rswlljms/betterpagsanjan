import { LAST_CHECKED } from "@/data/sources";
import type { GovernmentService } from "@/types/civic";

/**
 * Civil registry services. Certified copies of civil registry documents are
 * issued nationally through the Philippine Statistics Authority (PSA), while
 * registration of vital events happens at the Municipal Civil Registrar.
 */
export const civilRegistryServices: GovernmentService[] = [
  {
    id: "birth-certificate",
    slug: "birth-certificate",
    title: "Birth Certificate",
    category: "civil-registry",
    description:
      "A Certificate of Live Birth records a person's birth. The Local Civil Registry Office keeps birth records registered in Pagsanjan and issues a certified true copy (CTC) of the local record. Copies for nationwide use are requested separately from the Philippine Statistics Authority (PSA).",
    aliases: [
      "certificate of live birth",
      "certified true copy of birth certificate",
      "local civil registry birth certificate",
      "lcr birth certificate",
      "psa birth certificate",
      "birth record",
    ],
    office: {
      name: "Local Civil Registry Office (Municipal Civil Registrar's Office)",
    },
    eligibility: [
      "Pagsanjan constituents.",
      "Pagsanjan residents who were born in Pagsanjan, Laguna.",
    ],
    requirements: [
      "Request form for a birth certificate (available at the Local Civil Registry Office).",
      "Government-issued or valid identification card (the charter lists BIR, SSS, GSIS, PAG-IBIG, LTO, PRC, DFA, company ID, and Post Office IDs as examples).",
      "Authorization letter, if applicable (1 original).",
      "Copy of the requested document, if available (1 photocopy).",
    ],
    steps: [
      "Submit the filled-out certified true copy application form and valid ID to the Local Civil Registry Office. The office receives the application and issues an order of payment (about 5 minutes).",
      "Receive the order of payment from the clerk (about 3 minutes).",
      "Pay the certified true copy fee at the Municipal Treasurer's Office and get an official receipt (₱100.00; about 5 minutes).",
      "Receive a claim stub showing the date and time of release. The office verifies and searches for the record (about 5 minutes if a digital copy is available; 3 days if manual searching is needed).",
      "Receive the certified copy. The office records the serial number before release.",
    ],
    fees: [
      {
        description: "Certified true copy (CTC) of birth certificate",
        amount: 100,
      },
    ],
    processingTime:
      "About 18 minutes if the record is available in the digital database; 3 days if the record requires manual searching.",
    officialChannel: {
      label:
        "Local Civil Registry Office, Municipality of Pagsanjan · Philippine Statistics Authority for PSA-issued copies",
      note: "BetterPagsanjan cannot request or issue certificates. The steps and fee on this page cover the Local Civil Registry Office's certified true copy; PSA copies follow a separate process.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf",
      verifiedAt: "2026-10-26",
      note: "Requirements, steps, fee, and processing time transcribed from the 2026 Pagsanjan Citizen's Charter, Civil Registration section, printed p. 80 (PDF p. 81). Covers the Local Civil Registry Office's certified true copy of a birth certificate; PSA-issued copies follow a separate process.",
    },
    lastChecked: "October 2026",
    featured: true,
  },
  {
    id: "marriage-certificate",
    slug: "marriage-certificate",
    title: "Marriage Certificate",
    category: "civil-registry",
    description:
      "A Certificate of Marriage records a marriage that was registered with the civil registrar. Certified copies for most purposes are requested from the Philippine Statistics Authority (PSA).",
    aliases: [
      "certificate of marriage",
      "psa marriage certificate",
      "marriage registration",
      "cenomar",
    ],
    office: { name: "Municipal Civil Registrar's Office" },
    officialChannel: {
      label:
        "Municipal Civil Registrar's Office (registration) · Philippine Statistics Authority (certified copies)",
      note: "BetterPagsanjan cannot request or issue certificates.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Pagsanjan-specific fees, requirements, and processing times have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
  },
  {
    id: "death-certificate",
    slug: "death-certificate",
    title: "Death Certificate",
    category: "civil-registry",
    description:
      "A Certificate of Death records a person's death and is required for estate, insurance, and inheritance matters. Certified copies for most purposes are requested from the Philippine Statistics Authority (PSA).",
    aliases: [
      "certificate of death",
      "psa death certificate",
      "death registration",
    ],
    office: { name: "Municipal Civil Registrar's Office" },
    officialChannel: {
      label:
        "Municipal Civil Registrar's Office (registration) · Philippine Statistics Authority (certified copies)",
      note: "BetterPagsanjan cannot request or issue certificates.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Pagsanjan-specific fees, requirements, and processing times have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
  },
];
