import { LAST_CHECKED } from "@/data/sources";
import type { Verification } from "@/types/civic";

export interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  numbers: { label?: string; value: string }[];
  verification: Verification;
  /** Extra caution shown with the numbers, e.g. when transcribed. */
  caution?: string;
}

/**
 * National emergency hotline. Verified from the DILG announcement of the
 * nationwide Unified 911 launch. This is always the primary instruction.
 */
export const nationalHotline = {
  number: "911",
  name: "National emergency hotline",
  description:
    "The nationwide emergency number of the Philippines. Call 911 for police, fire, or medical emergencies.",
  sourceId: "dilg-911",
  sourceUrl:
    "https://dilg.gov.ph/news/One-Number-for-All-Emergencies-Unified-911-to-Launch-Nationwide/NC-2025-1177",
  lastChecked: LAST_CHECKED,
} as const;

/**
 * Local emergency contacts. Numbers are reproduced exactly as posted by
 * their cited source. Local numbers can change — for life-threatening
 * emergencies, 911 always comes first.
 */
export const emergencyContacts: EmergencyContact[] = [
  {
    id: "mdrrmo-opcen",
    name: "MDRRMO — Emergency Operations Center",
    description:
      "Municipal Disaster Risk Reduction and Management Office. Coordinates rescue, relief, and early warning during disasters.",
    numbers: [
      { label: "Globe", value: "0997-823-9254" },
      { label: "Smart", value: "0963-986-6435" },
      { label: "Landline", value: "321-2448" },
    ],
    verification: {
      status: "pending",
      sourceId: "pagsanjan-mdrrmo-fb",
      note: "Numbers were transcribed from the MDRRMO's official Facebook page through search indexing.",
    },
    caution:
      "Transcribed from the MDRRMO's official Facebook page. Numbers may change — verify before relying on them, and call 911 first in life-threatening emergencies.",
  },
  {
    id: "pnp-pagsanjan",
    name: "Pagsanjan Police Station (PNP)",
    description: "Philippine National Police station serving Pagsanjan.",
    numbers: [
      { value: "821-0422" },
      { value: "501-4054" },
    ],
    verification: {
      status: "pending",
      sourceId: "pagsanjan-mdrrmo-fb",
      note: "Numbers were transcribed from the MDRRMO's official Facebook page through search indexing.",
    },
    caution:
      "Transcribed from the MDRRMO's official Facebook page. Numbers may change — verify before relying on them, and call 911 first in emergencies.",
  },
  {
    id: "bfp-pagsanjan",
    name: "Bureau of Fire Protection — Pagsanjan",
    description: "Fire station serving Pagsanjan.",
    numbers: [{ value: "501-4520" }],
    verification: {
      status: "pending",
      sourceId: "pagsanjan-mdrrmo-fb",
      note: "Numbers were transcribed from the MDRRMO's official Facebook page through search indexing.",
    },
    caution:
      "Transcribed from the MDRRMO's official Facebook page. Numbers may change — verify before relying on them, and call 911 first in emergencies.",
  },
  {
    id: "municipal-hall",
    name: "Pagsanjan Municipal Hall",
    description:
      "Municipal government trunkline. Office hours and department extensions have not yet been verified.",
    numbers: [{ value: "(049) 808-4057" }],
    verification: {
      status: "verified",
      sourceId: "dti-cmci",
      sourceUrl: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Pagsanjan",
      verifiedAt: "2026-09-03",
      note: "As listed on the DTI CMCI LGU profile (LGU-supplied data).",
    },
  },
];
