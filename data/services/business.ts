import { LAST_CHECKED } from "@/data/sources";
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
      "A building permit is required under the National Building Code before constructing, altering, or demolishing a structure. This page explains what the permit covers and where to start in Pagsanjan.",
    aliases: [
      "construction permit",
      "building clearance",
      "renovation permit",
      "fencing permit",
    ],
    office: { name: "Office of the Building Official" },
    officialChannel: {
      label: "Office of the Building Official at the Pagsanjan Municipal Hall",
      note: "BetterPagsanjan cannot process applications. Apply through the municipal office or official government channels.",
    },
    verification: {
      status: "pending",
      sourceId: "pd-1096",
      note: "The National Building Code requires building permits for construction. Pagsanjan-specific requirements, fees, and steps have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
  },
];
