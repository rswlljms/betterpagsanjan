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
      "Pay real property tax (amilyar) at the Municipal Treasurer's Office based on your property's assessed value. The 2026 charter lists annual payment or quarterly payments on or before March 31, June 30, September 30, and December 31. Confirm the current assessment and any applicable adjustments with the Treasurer.",
    aliases: [
      "rpt",
      "amilyar",
      "property tax",
      "land tax",
      "tax declaration",
      "pay real property tax",
    ],
    office: { name: "Municipal Treasurer's Office" },
    eligibility: [
      "Registered property owners and their authorized representatives.",
    ],
    requirements: [
      "Latest Tax Declaration or Property Identification Number (PIN), from the Municipal Assessor's Office.",
      "Previous official receipt, if available.",
      "Authorization letter and valid ID if transacting as a representative.",
    ],
    steps: [
      "Present the Tax Declaration or PIN at the Real Property Tax collection window. The clerk verifies the property record (1 minute).",
      "Pay the assessed tax. The clerk receives payment and issues an official receipt (2 minutes).",
      "Collect the official receipt. The clerk records the payment in the RPT ledger (1 minute).",
    ],
    fees: [
      {
        description: "Basic real property tax",
        note: "1% of assessed value, as published in the 2026 charter.",
      },
      {
        description: "Special Education Fund (SEF) tax",
        note: "1% of assessed value, as published in the 2026 charter.",
      },
      {
        description: "Delinquent payment penalty",
        note: "The charter lists 2% per month, up to 72%. Confirm the amount applicable to your account with the Treasurer.",
      },
      {
        description: "Advance and prompt payment discount",
        note: "The charter lists 10% but does not specify the qualifying payment window in this table. Confirm eligibility with the Treasurer.",
      },
    ],
    processingTime:
      "The charter publishes a total of 5 minutes per real property unit (RPU), although its individual steps add up to 4 minutes. Both figures are reproduced as published; confirm timing with the office.",
    officialChannel: {
      label: "Municipal Treasurer's Office at the Pagsanjan Municipal Hall",
      url: "https://www.pagsanjanlaguna.com/citizenscharter",
      note: "BetterPagsanjan cannot accept tax payments. Pay only through official government channels.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf#page=150",
      verifiedAt: "2026-10-27",
      note: "Summarized from the 2026 Citizen's Charter, Treasurer service 4, printed pp. 149–150 (PDF pp. 150–151). Rates are quoted from the charter, not a calculation of your tax liability. The published total processing time differs from the sum of the steps.",
    },
    lastChecked: "October 27, 2026",
    featured: true,
  },
  {
    id: "health-services",
    slug: "health-services",
    title: "Health Services (Consultation & Check-up)",
    category: "health",
    description:
      "The Municipal Health Office provides general consultation, examination, and referrals when needed. This guide summarizes the charter's general consultation service; vaccination, maternal care, and other health programs have separate procedures. Clinic schedules have not yet been verified.",
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
    office: { name: "Municipal Health Office" },
    eligibility: ["Open to all, as stated in the charter."],
    requirements: [
      "Patient's Referral Record (1 original), from the Barangay Health Station of residence.",
      "Wireless Access for Health (WAH) form (1 original), from the Barangay Health Station of residence.",
      "EKas and Epress documents (1 original), as named in the charter; obtain them from the Barangay Health Station of residence.",
      "Valid ID (original).",
      "For children aged 0–5: original immunization card, from the Barangay Health Station or guardian.",
      "Laboratory or diagnostic results, if applicable (1 original or photocopy).",
    ],
    steps: [
      "Submit the documents at the information desk and obtain a queue number. The officer identifies the service needed (3 minutes); emergency cases are referred to the duty nurse (1 minute).",
      "Proceed to table 1 for registration by the Barangay Health Worker (5 minutes).",
      "Proceed to table 2 for vital signs (10 minutes).",
      "Go to the encoder at tables 3/4/5 for a PhilHealth status check, YAKAP registration/enrollment, and a WAH record (15 minutes).",
      "Consult the nurse at tables 6/7/8 (20 minutes). If further evaluation is needed, the nurse refers you to the Municipal Health Officer or Medical Officer (5 minutes).",
      "Proceed to the medical examination room when referred. The doctor examines you (20 minutes) and issues laboratory or diagnostic requests if needed (5 minutes). If hospitalization is required, the RHU Navigator facilitates referral (1 hour, case by case).",
      "Proceed to the pharmacy for prescribed medicines that are available. Staff check the record and prepare medicines (15 minutes), then explain how to use them (5 minutes).",
    ],
    fees: [
      {
        description: "General consultation steps",
        amount: 0,
        note: "The charter lists no fee for these steps. This does not establish charges for external tests, hospitalization, or unavailable medicines.",
      },
    ],
    processingTime:
      "The charter publishes 2 hours and 34 minutes in total. Its listed times, including conditional emergency and hospital-referral steps, add up to 2 hours and 44 minutes. These figures differ; actual steps depend on the patient's needs. Confirm timing and clinic availability with the Municipal Health Office.",
    officialChannel: {
      label: "Municipal Health Office, Pagsanjan",
      url: "https://www.pagsanjanlaguna.com/citizenscharter",
      note: "For emergencies, call 911. BetterPagsanjan does not provide medical advice.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf#page=181",
      verifiedAt: "2026-10-27",
      note: "Summarized from the 2026 Citizen's Charter, Municipal Health Office service 1, printed pp. 180–181 (PDF pp. 181–182). Covers general consultation only. Published time totals conflict; some steps are conditional. Clinic schedules and contact details remain unverified.",
    },
    lastChecked: "October 27, 2026",
    featured: true,
  },
  {
    id: "senior-citizen-id",
    slug: "senior-citizen-id",
    title: "Senior Citizen ID and Assistance",
    category: "social",
    description:
      "Pagsanjan's Office for Senior Citizens Affairs (OSCA) issues senior citizen IDs to qualified Filipino residents aged 60 and above. The requirements below cover a first-time ID application; replacement IDs and assistance programs have separate procedures.",
    aliases: [
      "osca",
      "senior id",
      "senior citizen discount",
      "seniors assistance",
      "ra 9994",
    ],
    office: { name: "Office for Senior Citizens Affairs (OSCA)" },
    eligibility: [
      "Qualified Filipino citizens aged 60 or above who are senior citizens of Pagsanjan, applying for an ID for the first time.",
    ],
    requirements: [
      "Photocopy of birth certificate, from the Municipal Civil Registrar or Philippine Statistics Authority (PSA).",
      "Cedula, from the Municipal Treasurer's Office.",
      "Barangay residency document, from the Barangay Hall.",
      "One 1×1 photograph.",
    ],
    steps: [
      "Submit the requirements to OSCA for verification (10 minutes).",
      "Complete the validation interview (5 minutes). Staff encode your information in the database or masterlist (5 minutes).",
      "Receive the senior citizen ID (5 minutes).",
    ],
    fees: [
      {
        description: "New senior citizen ID issuance",
        amount: 0,
        note: "The charter lists no fee for ID issuance. It does not establish costs for obtaining supporting documents.",
      },
    ],
    processingTime:
      "25 minutes, as published in the charter for a new ID application.",
    officialChannel: {
      label: "OSCA / Municipal Social Welfare and Development Office",
      url: "https://www.pagsanjanlaguna.com/citizenscharter",
      note: "BetterPagsanjan cannot process ID applications or benefit claims.",
    },
    verification: {
      status: "verified",
      sourceId: "pagsanjan-citizens-charter",
      sourceUrl:
        "https://www.pagsanjanlaguna.com/charter_documents/1791773600_6acc4ba076ef8.pdf#page=246",
      verifiedAt: "2026-10-27",
      note: "Summarized from the 2026 Citizen's Charter, service 18: Availment of Senior Citizen ID for New Applicant, printed p. 245 (PDF p. 246). Verification covers first-time ID issuance only, not replacement IDs or assistance claims.",
    },
    lastChecked: "October 27, 2026",
    featured: true,
  },
  {
    id: "barangay-clearance",
    slug: "barangay-clearance",
    title: "Barangay Clearance",
    category: "barangay",
    description:
      "A barangay clearance certifies that a person is a resident of good standing in a barangay. It is commonly required for employment, school enrollment, and business applications, and is issued by the barangay where you live. The municipal Citizen's Charter lists it as a requirement for some municipal services but does not publish barangay-level requirements or fees.",
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
      sourceId: "pagsanjan-citizens-charter",
      note: "The 2026 Pagsanjan Citizen's Charter lists a barangay clearance as a requirement for some municipal services, including business permits, but does not publish barangay-level requirements, fees, or procedures. Barangays issue clearances under the Local Government Code (RA 7160); confirm details with your barangay hall.",
    },
    lastChecked: "October 2026",
    featured: true,
  },
];
