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
      note: "Requirements, steps, fee, and processing time transcribed from the 2026 Pagsanjan Citizen's Charter, Civil Registration section, printed pp. 80–81 (PDF pp. 81–82). Covers the Local Civil Registry Office's certified true copy of a birth certificate; PSA-issued copies follow a separate process.",
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
      "The Local Civil Registry Office issues a certified true copy (CTC) of a marriage certificate registered in Pagsanjan. This guide covers the local copy; PSA-issued copies, marriage registration, and a Certificate of No Marriage (CENOMAR) follow separate procedures.",
    aliases: [
      "certificate of marriage",
      "psa marriage certificate",
      "marriage registration",
      "cenomar",
    ],
    office: {
      name: "Local Civil Registry Office (Municipal Civil Registrar's Office)",
    },
    eligibility: [
      "Pagsanjan constituents and non-residents who married in Pagsanjan, Laguna, as listed in the charter. The marriage record must be registered in Pagsanjan.",
    ],
    requirements: [
      "Marriage certificate request form from the information desk.",
      "Government-issued or valid ID (the charter lists BIR, SSS, GSIS, PAG-IBIG, LTO, PRC, DFA, company ID, and Post Office IDs as examples).",
      "Authorization letter, if applicable (1 original).",
      "Copy of the requested document, if available (1 photocopy).",
    ],
    steps: [
      "Submit the completed CTC application form and ID. The office receives the requirements and prepares an order of payment (5 minutes).",
      "Receive the order of payment (3 minutes).",
      "Pay ₱100 at the Municipal Treasurer's Office and receive an official receipt (5 minutes).",
      "Present the receipt and receive a claim stub with the release date and time. The office searches for and certifies the local record (5 minutes if digitally available; 3 days for manual searching).",
      "Collect the certified copy. The office records its serial number before release.",
    ],
    fees: [
      {
        description: "Local certified true copy of marriage certificate",
        amount: 100,
      },
    ],
    processingTime:
      "The charter lists 18 minutes for a digitally available record, or 3 days if manual searching is required.",
    officialChannel: {
      label: "Local Civil Registry Office, Municipality of Pagsanjan",
      url: "https://www.pagsanjanlaguna.com/citizenscharter",
      note: "BetterPagsanjan cannot request or issue certificates. These requirements and fees cover a local certified copy, not a PSA-issued copy or CENOMAR.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf#page=82",
      verifiedAt: "2026-10-27",
      note: "Summarized from the 2026 Citizen's Charter, Civil Registration service 14, printed pp. 81–82 (PDF pp. 82–83). Covers certified true copies of locally registered marriage records, not marriage registration, PSA copies, or CENOMAR.",
    },
    lastChecked: "October 27, 2026",
  },
  {
    id: "death-certificate",
    slug: "death-certificate",
    title: "Death Certificate",
    category: "civil-registry",
    description:
      "The Local Civil Registry Office issues a certified true copy (CTC) of a death certificate registered in Pagsanjan. This guide covers an existing local record; death registration and PSA-issued copies follow separate procedures.",
    aliases: [
      "certificate of death",
      "psa death certificate",
      "death registration",
    ],
    office: {
      name: "Local Civil Registry Office (Municipal Civil Registrar's Office)",
    },
    eligibility: [
      "Requests for death records registered in Pagsanjan. The charter lists Pagsanjan constituents and deaths of non-residents in Pagsanjan; confirm the requester's authority with the Local Civil Registry Office.",
    ],
    requirements: [
      "Death certificate request form from the information desk.",
      "Government-issued or valid ID (the charter lists BIR, SSS, GSIS, PAG-IBIG, LTO, PRC, DFA, company ID, and Post Office IDs as examples).",
      "Letter of authority, if applicable (1 original).",
      "Copy of the requested document, if available (1 photocopy).",
    ],
    steps: [
      "Submit the completed CTC application form and ID. The office receives the requirements and prepares an order of payment (5 minutes).",
      "Receive the order of payment (3 minutes).",
      "Pay ₱100 at the Municipal Treasurer's Office and receive an official receipt (5 minutes).",
      "Present the receipt and receive a claim stub with the release date and time. The office searches for and certifies the local record (5 minutes if digitally available; 3 days for manual searching).",
      "Collect the certified copy. The office records its serial number before release.",
    ],
    fees: [
      {
        description: "Local certified true copy of death certificate",
        amount: 100,
      },
    ],
    processingTime:
      "The charter lists 18 minutes for a digitally available record, or 3 days if manual searching is required.",
    officialChannel: {
      label: "Local Civil Registry Office, Municipality of Pagsanjan",
      url: "https://www.pagsanjanlaguna.com/citizenscharter",
      note: "BetterPagsanjan cannot request or issue certificates. These requirements and fees cover a local certified copy, not death registration or a PSA-issued copy.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf#page=83",
      verifiedAt: "2026-10-27",
      note: "Summarized from the 2026 Citizen's Charter, Civil Registration service 15, printed pp. 82–83 (PDF pp. 83–84). Covers copies of existing local records. The charter's eligibility wording describes the deceased's residency; it does not establish who is authorized to request the record.",
    },
    lastChecked: "October 27, 2026",
  },
];
