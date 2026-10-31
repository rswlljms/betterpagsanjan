/**
 * Site-wide configuration and independence disclaimer (AGENTS.md §54).
 */

/**
 * Canonical URL. Set NEXT_PUBLIC_SITE_URL in every deployment; the fallback
 * is a placeholder domain this project does not own, kept only so local
 * builds have a valid absolute URL. next.config.ts warns once per build or
 * server start while the variable is unset.
 */
const placeholderSiteUrl = "https://betterpagsanjan.org";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const site = {
  name: "BetterPagsanjan",
  tagline: "Government information, made easier for Pagsanjan.",
  description:
    "BetterPagsanjan is an independent civic technology project that makes public information about Pagsanjan, Laguna easier to find, understand, and use. It is not an official website of the Municipality of Pagsanjan.",
  url: configuredSiteUrl || placeholderSiteUrl,
  location: "Pagsanjan, Laguna, Philippines",
  lastChecked: "September 2026",
  /**
   * Official website of the Municipal Government of Pagsanjan —
   * "Bayan ng Pagsanjan Laguna | Official Government Portal"
   * (verified directly on the portal, October 2026).
   */
  officialWebsite: "https://www.pagsanjanlaguna.com",
  /**
   * The same official portal also hosts the legislative information system:
   * searchable ordinance/resolution archive, downloadable forms, and the
   * Citizen's Charter, all with official PDFs.
   */
  legislativePortal: "https://www.pagsanjanlaguna.com",
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
