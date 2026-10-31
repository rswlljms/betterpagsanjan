import type { Metadata } from "next";

/**
 * Route paths are site-relative and always start with "/". Next resolves them
 * against `metadataBase` in the root layout, so the emitted canonical and
 * Open Graph URLs are absolute regardless of the deployment host.
 */
export type RoutePath = `/${string}`;

/**
 * Canonical URL and Open Graph URL for one route.
 *
 *   export const metadata: Metadata = {
 *     title: "Services",
 *     ...canonical("/services"),
 *   };
 *
 * Every indexable page sets this. Without it, a staging host and the eventual
 * production domain look like independent copies to search engines, and shared
 * links carry no canonical address.
 */
export function canonical(
  path: RoutePath,
): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { url: path },
  };
}
