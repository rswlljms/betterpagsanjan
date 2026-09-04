export interface PublicOfficial {
  id: string;
  position: string;
  name: string;
  sourceId: string;
  sourceUrl: string;
  verifiedAt: string;
  note?: string;
}

/**
 * Public officials, published only when attributable to an official
 * government source (AGENTS.md §21, §14). Positions without a verified
 * name are listed on the Government page as "not yet available" — never
 * invented.
 */
export const officials: PublicOfficial[] = [
  {
    id: "mayor",
    position: "Municipal Mayor",
    name: "Cesar V. Areza",
    sourceId: "dti-cmci",
    sourceUrl: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Pagsanjan",
    verifiedAt: "2026-09-03",
    note: "As published on the DTI CMCI LGU profile for Pagsanjan (LGU-supplied data), accessed September 3, 2026.",
  },
];
