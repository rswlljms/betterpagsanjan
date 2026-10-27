import type { GovernmentService } from "@/types/civic";

/**
 * Business-related services. Fields that are still unverified remain
 * pending and say so; the 2026 Citizen's Charter is the cited source for
 * verified requirements, fees, steps, and processing times (AGENTS.md §14).
 */
export const businessServices: GovernmentService[] = [
  {
    id: "business-permit-new",
    slug: "business-permit",
    title: "Business Permit (New Application)",
    category: "business",
    description:
      "A business permit — sometimes called a mayor's permit — is required before legally operating a business in a Philippine municipality. In Pagsanjan, new permits are processed at the Municipal Treasurer's Office through the Business One-Stop Shop. The 2026 Citizen's Charter says processing takes about one hour when requirements are complete.",
    aliases: [
      "mayors permit",
      "business registration",
      "start a business",
      "new business",
      "business plate",
      "bpls",
    ],
    office: { name: "Municipal Treasurer's Office" },
    eligibility: [
      "Citizens doing business, or planning to do business, within the Municipality of Pagsanjan.",
    ],
    requirements: [
      "New application: location sketch, photos, barangay clearance, cedula, DTI or SEC registration, proof of capital, tax clearance, and work permits.",
      "Additional documents may be required depending on the business type: DTI, NWRB, PTO, or a lease contract.",
      "If a representative is transacting: authorization letter or special power of attorney (SPA), and a valid identification card.",
    ],
    steps: [
      "Submit the Unified Clearance Form and complete requirements to the Municipal Treasurer's Office. The office checks completeness (about 30 minutes), then reviews the application and computes the taxes and fees (about 5 minutes).",
      "Pay the business taxes, fees, and charges at the Municipal Treasurer's Office and get an official receipt (about 5 minutes). The Bureau of Fire Protection handles the fire safety fee separately (about 5 minutes).",
      "Receive the business permit, plate, and sticker (about 5 minutes).",
    ],
    fees: [
      {
        description: "Business taxes, fees, and charges",
        note: "Computed by the Municipal Treasurer's Office based on capitalization or gross receipts. The charter publishes no fixed amount.",
      },
      {
        description: "Fire safety fee",
        note: "Collected separately by the Bureau of Fire Protection. The charter does not state the amount.",
      },
    ],
    processingTime:
      "About 50 minutes across the listed steps. The charter says the Business One-Stop Shop can complete processing in about one hour if requirements are complete.",
    officialChannel: {
      label: "Municipal Treasurer's Office, Municipality of Pagsanjan",
      note: "BetterPagsanjan cannot process applications or payments. Apply through the Municipal Treasurer's Office or its official channels.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf",
      verifiedAt: "2026-10-26",
      note: "Requirements, steps, fees, and processing time transcribed from the 2026 Pagsanjan Citizen's Charter, Business Permits section, printed p. 154 (PDF p. 155). The charter publishes no fixed fee; taxes and charges are computed, and the BFP collects its fire safety fee separately.",
    },
    lastChecked: "October 2026",
    featured: true,
  },
  {
    id: "business-permit-renewal",
    slug: "business-permit-renewal",
    title: "Business Permit Renewal",
    category: "business",
    description:
      "Business permits in Pagsanjan are renewed annually. Renewals are processed at the Municipal Treasurer's Office through the Business One-Stop Shop; the 2026 Citizen's Charter says processing takes about one hour when requirements are complete.",
    aliases: [
      "renew business permit",
      "mayors permit renewal",
      "business permit renewal schedule",
    ],
    office: { name: "Municipal Treasurer's Office" },
    eligibility: [
      "Citizens doing business, or planning to do business, within the Municipality of Pagsanjan.",
    ],
    requirements: [
      "Renewal: previous Mayor's Permit, barangay clearance, sales/tax records, cedula, Real Property Tax Clearance, and work permits.",
      "Additional documents may be required depending on the business type: DTI, NWRB, PTO, or a lease contract.",
      "If a representative is transacting: authorization letter or special power of attorney (SPA), and a valid identification card.",
    ],
    steps: [
      "Submit the Unified Clearance Form and complete requirements to the Municipal Treasurer's Office. The office checks completeness (about 30 minutes), then reviews the application and computes the taxes and fees (about 5 minutes).",
      "Pay the business taxes, fees, and charges at the Municipal Treasurer's Office and get an official receipt (about 5 minutes). The Bureau of Fire Protection handles the fire safety fee separately (about 5 minutes).",
      "Receive the business permit, plate, and sticker (about 5 minutes).",
    ],
    fees: [
      {
        description: "Business taxes, fees, and charges",
        note: "Computed by the Municipal Treasurer's Office based on capitalization or gross receipts. The charter publishes no fixed amount.",
      },
      {
        description: "Fire safety fee",
        note: "Collected separately by the Bureau of Fire Protection. The charter does not state the amount.",
      },
    ],
    processingTime:
      "About 50 minutes across the listed steps. The charter says the Business One-Stop Shop can complete processing in about one hour if requirements are complete.",
    officialChannel: {
      label: "Municipal Treasurer's Office, Municipality of Pagsanjan",
      note: "BetterPagsanjan cannot process renewals or payments. Renew through the Municipal Treasurer's Office or its official channels.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf",
      verifiedAt: "2026-10-26",
      note: "Requirements, steps, fees, and processing time transcribed from the 2026 Pagsanjan Citizen's Charter, Business Permits section, printed p. 154 (PDF p. 155). The charter publishes no fixed fee; taxes and charges are computed, and the BFP collects its fire safety fee separately.",
    },
    lastChecked: "October 2026",
  },
  {
    id: "building-permit",
    slug: "building-permit",
    title: "Building Permit",
    category: "business",
    description:
      "Apply to Pagsanjan's Office of the Building Official (OBO) before starting work that requires a building permit. The 2026 charter distinguishes simple, complex, and highly technical applications. Ask OBO to confirm the classification and permits required for your project.",
    aliases: [
      "construction permit",
      "building clearance",
      "renovation permit",
      "fencing permit",
    ],
    office: { name: "Office of the Building Official" },
    eligibility: [
      "Applicants for building permits for buildings and other structures in Pagsanjan, including citizens, businesses, and government entities.",
      "Simple examples in the charter include private garages up to 90 square meters, carports, agricultural buildings, and certain repairs or stand-alone permits. See the source for the complete classification list.",
      "Complex examples include interior renovations, changes of occupancy, multiple-unit residences, single detached houses up to 7 storeys, and commercial buildings up to 9 storeys.",
      "Highly technical examples include commercial buildings above 9 storeys, hospitals, public-assembly buildings, disaster-response structures, and special structures. OBO determines the applicable classification.",
    ],
    requirements: [
      "Completed application forms from OBO: notarized Unified Building form, Civil/Structural, Sanitary, Electrical, and Mechanical/Electronics forms if applicable.",
      "Certified true copy of the Transfer Certificate of Title or Original Certificate of Title on file with the Register of Deeds.",
      "Tax Declaration from the Municipal Assessor's Office and current real property tax receipt from the Municipal Treasurer's Office.",
      "If the applicant is not the registered lot owner: notarized lease contract or deed of absolute sale, plus the lot owner's authorization to construct.",
      "Five sets of plans, specifications, and bill of materials signed by the appropriately licensed professionals listed in the charter, as applicable to the project.",
      "For buildings of 2 storeys or more: structural computations signed and sealed by a civil or structural engineer.",
      "Photocopies of PRC IDs and Professional Tax Receipts (PTR) of engineers who signed and sealed the plans and application forms.",
      "Locational clearance (2 copies), from the Municipal Planning and Development Office.",
      "Fire safety clearance certificate, from the Bureau of Fire Protection station in Pagsanjan.",
      "Authorization for the person allowed to follow up the application.",
      "Special Power of Attorney if the owner is not signing the forms, plans, and other documents.",
      "Barangay permit from the Barangay Hall.",
      "Clearances from other agencies when applicable. The charter names DPWH, ATO, HLURB, and DENR; confirm the applicable agency and clearance with OBO.",
    ],
    steps: [
      "Submit all documents to OBO. Staff check and encode the application, evaluate plans, inspect the site, prepare an inspection report, assess fees, and issue an order of payment. Incomplete applications are not accepted under the charter.",
      "Pay at the Municipal Treasury Office or One-Stop Shop and obtain an official receipt.",
      "Return to OBO and submit the official receipt for recording.",
      "The Building Official or Municipal Engineer reviews and signs the building and ancillary plans and permit for approval.",
      "Claim the approved plans and permit, with the approved Fire Safety Evaluation Clearance (FSEC) and checklist described in the charter.",
    ],
    fees: [
      {
        description: "Building permit assessment",
        note: "Based on the Building Code and system-generated assessment. The charter publishes no fixed peso amount for this service; pay the amount in the official order of payment.",
      },
    ],
    processingTime:
      "Published totals: 2 days for simple applications, 4 days for complex applications, and 16 days for highly technical applications. Each total is marked as with zoning/locational clearance and FSEC or Fire Safety Inspection Certificate (FSIC). The charter allows multi-stage processing; confirm the applicable timeline with OBO.",
    officialChannel: {
      label: "Office of the Building Official at the Pagsanjan Municipal Hall",
      url: "https://www.pagsanjanlaguna.com/citizenscharter",
      note: "BetterPagsanjan cannot process applications. Apply through the municipal office or official government channels.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf#page=291",
      verifiedAt: "2026-10-27",
      note: "Summarized from the 2026 Citizen's Charter: simple building permits, printed pp. 290–292 (PDF pp. 291–293); complex, printed pp. 292–294 (PDF pp. 293–295); highly technical, printed pp. 294–296 (PDF pp. 295–297). Common requirements and steps are summarized together; examples of classifications are not exhaustive. Fees require an official assessment.",
    },
    lastChecked: "October 27, 2026",
  },
];
