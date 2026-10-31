/**
 * SEO correctness check (AGENTS.md §45).
 *
 * Two properties are easy to lose in a refactor and invisible in a build:
 *
 * 1. Every page declares the canonical path of its own route. Without it,
 *    canonical tags and `og:url` disappear, and a staging host competes with
 *    the eventual production domain as an independent copy.
 * 2. Every route generated from `generateStaticParams` sets
 *    `dynamicParams = false`. Otherwise Next renders unknown slugs on demand,
 *    `notFound()` lands after the response headers, and made-up URLs answer
 *    `200` with the not-found page (soft 404s).
 *
 * Offline and deterministic, so CI can run it on every push.
 */

import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP_DIR = join(process.cwd(), "app");

const problems: string[] = [];
let checked = 0;

function pageFiles(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name === "page.tsx")
    .map((entry) => join(entry.parentPath ?? entry.path, entry.name));
}

/** "/" for app/page.tsx, "/services/guide" for app/services/guide/page.tsx. */
function routeOf(file: string): string {
  const segments = relative(APP_DIR, file)
    .split(sep)
    .slice(0, -1)
    .filter((segment) => !segment.startsWith("["));
  return `/${segments.join("/")}`;
}

for (const file of pageFiles(APP_DIR)) {
  const rel = relative(process.cwd(), file).replaceAll(sep, "/");
  const source = readFileSync(file, "utf8");
  const route = routeOf(file);
  checked++;

  const canonicalCall = /canonical\(\s*[`"']([^`"']*)/.exec(source);
  if (!canonicalCall) {
    problems.push(`${rel}: no canonical path — add ...canonical("${route}")`);
  } else {
    const declared = canonicalCall[1];
    // Dynamic routes declare a template prefix such as `/services/${slug}`;
    // compare everything before the interpolation.
    const prefix = declared.split("${")[0];
    const isDynamic = prefix !== declared;
    const matches = isDynamic ? prefix === `${route}/` : prefix === route;
    if (!matches) {
      problems.push(
        `${rel}: canonical path "${declared}" does not match route "${route}"`,
      );
    }
  }

  if (/export function generateStaticParams/.test(source)) {
    if (!/export const dynamicParams = false;/.test(source)) {
      problems.push(
        `${rel}: generateStaticParams without \`export const dynamicParams = false;\` — unknown slugs will return 200 instead of 404`,
      );
    }
  }
}

console.log("SEO check");
console.log(`  pages checked: ${checked}`);

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log("  canonical paths present on every page");
console.log("  static routes reject unknown slugs");
console.log("\nSEO check passed.");
