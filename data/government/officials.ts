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
 *
 * Currency note (September 2026): the DTI CMCI LGU profile still names
 * Cesar V. Areza as mayor, but August 2026 resolutions on the municipal
 * legislative portal repeatedly authorize "Municipal Mayor Hon. Januario
 * Ferry G. Garcia" — the dated official record is treated as current and
 * the conflict is stated here rather than hidden (AGENTS.md §48).
 */
export const officials: PublicOfficial[] = [
  {
    id: "mayor",
    position: "Municipal Mayor",
    name: "Januario Ferry G. Garcia",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl:
      "https://www.pagsanjanlaguna.com/uploads/documents/resolution-no-127-2026-1788329628.pdf",
    verifiedAt: "2026-09-04",
    note: "Named as Municipal Mayor in Sangguniang Bayan Resolution No. 127-2026 (approved August 24, 2026). The DTI CMCI LGU profile still lists Cesar V. Areza; the dated resolution is treated as the more current record.",
  },
  {
    id: "vice-mayor",
    position: "Municipal Vice Mayor",
    name: "Rod H. Fernandez",
    sourceId: "pagsanjan-legislative-portal",
    sourceUrl: "https://www.pagsanjanlaguna.com/legislative",
    verifiedAt: "2026-09-04",
    note: "Listed as Municipal Vice Mayor on the Sangguniang Bayan roster of the municipal legislative portal.",
  },
];
