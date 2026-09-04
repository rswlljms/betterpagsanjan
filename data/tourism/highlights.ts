import type { Verification } from "@/types/civic";

export interface TourismHighlight {
  id: string;
  title: string;
  description: string;
  /** Marked on secondary-sourced entries. */
  secondarySource?: boolean;
  verification: Verification;
}

/**
 * Pagsanjan local-identity highlights. History and geography entries rely
 * on secondary reference material (flagged in the UI); nothing is stated
 * that the cited source does not support.
 */
export const tourismHighlights: TourismHighlight[] = [
  {
    id: "pagsanjan-falls",
    title: "Pagsanjan Falls (Magdapio Falls)",
    description:
      "The famous waterfall reached from Pagsanjan is formally known as Magdapio Falls — renamed Cavinti Falls by a 2009 ordinance of the neighboring town of Cavinti, within whose territory the falls lies. The world-famous way to reach it, however, starts in Pagsanjan: the boat trip through the gorge. Its longest drop is commonly listed at about 120 meters.",
    secondarySource: true,
    verification: {
      status: "verified",
      sourceId: "wikipedia-pagsanjan-falls",
      sourceUrl: "https://en.wikipedia.org/wiki/Pagsanjan_Falls",
      verifiedAt: "2026-09-03",
      note: "From a secondary encyclopedic source. The jurisdiction nuance (falls within Cavinti; access and boat trip from Pagsanjan) is part of why the town and falls share a name.",
    },
  },
  {
    id: "shooting-the-rapids",
    title: "“Shooting the rapids”",
    description:
      "The traditional banca boat trip runs up the Bumbungan River through Pagsanjan Gorge to the falls, with boatmen steering through rapids in both directions. The Pagsanjan Gorge Tourist Zone was proclaimed in 1939 under President Manuel L. Quezon.",
    secondarySource: true,
    verification: {
      status: "verified",
      sourceId: "wikipedia-pagsanjan",
      sourceUrl: "https://en.wikipedia.org/wiki/Pagsanjan",
      verifiedAt: "2026-09-03",
      note: "From a secondary encyclopedic source. Confirm current rates, schedules, and accredited operators with official channels before your trip.",
    },
  },
  {
    id: "rivers",
    title: "Two rivers meet here",
    description:
      "Pagsanjan sits at the confluence of the Bumbungan and Balanac rivers, which is also the origin of the town's name — from “Pinagsangahan,” meaning a branching or river juncture, later Hispanicized to Pagsanjan.",
    secondarySource: true,
    verification: {
      status: "verified",
      sourceId: "wikipedia-pagsanjan",
      sourceUrl: "https://en.wikipedia.org/wiki/Pagsanjan",
      verifiedAt: "2026-09-03",
      note: "From a secondary encyclopedic source.",
    },
  },
  {
    id: "history",
    title: "A former capital of Laguna",
    description:
      "Pagsanjan was founded as an independent town on December 12, 1668, by decree of Governor-General Juan Manuel de la Peña Bonifaz, from a settlement earlier served as a visita of Lumban by Franciscan missionaries from 1578. It served as the capital of Laguna province from 1688 to 1858 — 170 years — before the capital moved to Santa Cruz.",
    secondarySource: true,
    verification: {
      status: "verified",
      sourceId: "wikipedia-pagsanjan",
      sourceUrl: "https://en.wikipedia.org/wiki/Pagsanjan",
      verifiedAt: "2026-09-03",
      note: "From a secondary encyclopedic source; dates could not be confirmed against a primary government source yet.",
    },
  },
];
