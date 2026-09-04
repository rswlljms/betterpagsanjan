/**
 * Site-wide configuration and independence disclaimer (AGENTS.md §54).
 */

export const site = {
  name: "BetterPagsanjan",
  tagline: "Government information, made easier for Pagsanjan.",
  description:
    "BetterPagsanjan is an independent civic technology project that makes public information about Pagsanjan, Laguna easier to find, understand, and use. It is not an official website of the Municipality of Pagsanjan.",
  /**
   * Set NEXT_PUBLIC_SITE_URL in production so canonical URLs and the
   * sitemap point at the real domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://betterpagsanjan.org",
  location: "Pagsanjan, Laguna, Philippines",
  lastChecked: "September 2026",
  /**
   * Official website of the Municipal Government of Pagsanjan
   * (verified via the DTI CMCI LGU profile, September 2026).
   */
  officialWebsite: "https://pagsanjan.gov.ph",
};

export const independence = {
  short:
    "BetterPagsanjan is an independent civic technology project. It is not an official website of the Municipality of Pagsanjan.",
  footer: [
    "BetterPagsanjan is an independent civic technology project for the people of Pagsanjan, Laguna.",
    "BetterPagsanjan is not an official website of the Municipality of Pagsanjan. Information is compiled from publicly available sources.",
    "For official transactions, requirements, fees, and policies, verify information with the appropriate government office.",
  ] as string[],
};
