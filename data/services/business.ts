import { LAST_CHECKED } from "@/data/sources";
import type { GovernmentService } from "@/types/civic";

/**
 * Business-related services. These entries intentionally contain general
 * information only — Pagsanjan-specific requirements, fees, steps, and
 * processing times are not published until verified from official sources
 * (AGENTS.md §14).
 */
export const businessServices: GovernmentService[] = [
  {
    id: "business-permit-new",
    slug: "business-permit",
    title: "Business Permit (New Application)",
    category: "business",
    description:
      "A business permit — sometimes called a mayor's permit — is required before legally operating a business in a Philippine municipality. This page explains what the permit is for and where to start in Pagsanjan.",
    aliases: [
      "mayors permit",
      "business registration",
      "start a business",
      "new business",
      "business plate",
      "bpls",
    ],
    office: { name: "Business Permits and Licensing Office" },
    officialChannel: {
      label: "Responsible office at the Pagsanjan Municipal Hall",
      note: "BetterPagsanjan cannot process applications. Apply through the municipal office or official government channels.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Business permitting is a municipal function under the Local Government Code. The responsible Pagsanjan office and the specific requirements, fees, and steps have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
    featured: true,
  },
  {
    id: "business-permit-renewal",
    slug: "business-permit-renewal",
    title: "Business Permit Renewal",
    category: "business",
    description:
      "Business permits in Philippine municipalities are typically renewed once a year. This page will list renewal windows, requirements, and fees for Pagsanjan once verified.",
    aliases: [
      "renew business permit",
      "mayors permit renewal",
      "business permit renewal schedule",
    ],
    office: { name: "Business Permits and Licensing Office" },
    officialChannel: {
      label: "Responsible office at the Pagsanjan Municipal Hall",
      note: "Renewals are processed by the municipal government. BetterPagsanjan cannot renew permits.",
    },
    verification: {
      status: "pending",
      sourceId: "ra-7160",
      note: "Renewal schedules and requirements for Pagsanjan have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
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
