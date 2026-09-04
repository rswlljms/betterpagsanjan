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
      "A Certificate of Live Birth records a person's birth. Births are registered at the Municipal Civil Registrar's Office; certified copies for most purposes are requested from the Philippine Statistics Authority (PSA).",
    aliases: [
      "certificate of live birth",
      "psa birth certificate",
      "birth registration",
      "late registration of birth",
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
      note: "Civil registration is a mandated municipal function under the Local Government Code. Pagsanjan-specific fees, requirements, and processing times have not yet been verified from official sources.",
    },
    lastChecked: LAST_CHECKED,
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
