/**
 * Civic data integrity check.
 *
 * Validates the structured data in `data/` without making network requests:
 * source references, verification metadata, unique IDs/slugs, cross-links,
 * date formats, and the barangay census total. Run with:
 *
 *   npm run check:data
 *
 * The check is deterministic and offline, so CI can run it on every push.
 * External-link availability is handled separately by
 * `scripts/audit-civic-links.ts`, which is manual and report-only.
 */

import {
  ANNOUNCEMENT_STALE_AFTER_DAYS,
  announcements,
} from "../data/announcements";
import { barangays } from "../data/barangays/barangays";
import { consultations } from "../data/consultations";
import { emergencyContacts, nationalHotline } from "../data/emergency/contacts";
import { offices } from "../data/government/offices";
import { officials } from "../data/government/officials";
import { legislativeDocuments } from "../data/legislative/documents";
import { civicLocations } from "../data/locations/locations";
import { floodControlProjects } from "../data/projects/flood-control";
import { PROJECTS_FY2026_TOTAL, projects } from "../data/projects/projects";
import { reportingCategories } from "../data/reporting";
import { serviceCategories, services } from "../data/services/index";
import { LAST_CHECKED, sources } from "../data/sources";
import { statistics } from "../data/statistics";
import { transparencyRecords } from "../data/transparency/records";
import type { Verification } from "../types/civic";

type Level = "error" | "warning";

interface Issue {
  level: Level;
  area: string;
  message: string;
}

const issues: Issue[] = [];

function report(level: Level, area: string, message: string): void {
  issues.push({ level, area, message });
}

function error(area: string, message: string): void {
  report("error", area, message);
}

function warning(area: string, message: string): void {
  report("warning", area, message);
}

const MONTHS =
  "January|February|March|April|May|June|July|August|September|October|November|December";
const MONTH_YEAR = new RegExp(`^(?:${MONTHS}) \\d{4}$`);
const DISPLAY_DATE = new RegExp(`^(?:${MONTHS})(?: \\d{1,2},)? \\d{4}$`);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const YEAR = /^\d{4}$/;
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SERVICE_CATEGORY_IDS = new Set(serviceCategories.map((c) => c.id));
const SOURCE_IDS = new Set(sources.map((s) => s.id));
const SERVICE_SLUGS = new Set(services.map((s) => s.slug));
const OFFICE_IDS = new Set(offices.map((o) => o.id));
const LEGISLATIVE_SLUGS = new Set(legislativeDocuments.map((d) => d.slug));

const COLLECTIONS = [
  { name: "sources", value: sources },
  { name: "services", value: services },
  { name: "serviceCategories", value: serviceCategories },
  { name: "offices", value: offices },
  { name: "officials", value: officials },
  { name: "barangays", value: barangays },
  { name: "statistics", value: statistics },
  { name: "announcements", value: announcements },
  { name: "legislative", value: legislativeDocuments },
  { name: "projects", value: projects },
  { name: "floodControlProjects", value: floodControlProjects },
  { name: "transparency", value: transparencyRecords },
  { name: "locations", value: civicLocations },
  { name: "consultations", value: consultations },
  { name: "emergencyContacts", value: emergencyContacts },
  { name: "nationalHotline", value: nationalHotline },
  { name: "reportingCategories", value: reportingCategories },
];

function label(record: { id?: unknown; slug?: unknown }): string {
  if (typeof record.slug === "string") return record.slug;
  if (typeof record.id === "string") return record.id;
  return "(record without id)";
}

function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isIsoMonth(value: string): boolean {
  if (!/^\d{4}-\d{2}$/.test(value)) return false;
  const month = Number(value.slice(5, 7));
  return month >= 1 && month <= 12;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function requireString(
  value: unknown,
  area: string,
  context: string,
  field: string,
): boolean {
  if (!isNonEmptyString(value)) {
    error(area, `${context}: missing or empty "${field}"`);
    return false;
  }
  return true;
}

function requireStringArray(
  value: unknown,
  area: string,
  context: string,
  field: string,
  required: boolean,
): void {
  if (value === undefined) {
    if (required) error(area, `${context}: missing "${field}"`);
    return;
  }
  if (!Array.isArray(value) || value.length === 0) {
    error(area, `${context}: "${field}" must be a non-empty array`);
    return;
  }
  value.forEach((item, index) => {
    if (!isNonEmptyString(item)) {
      error(area, `${context}: "${field}[${index}]" is empty`);
    }
  });
}

function checkUnique(
  records: readonly { id?: unknown; slug?: unknown }[],
  area: string,
  field: "id" | "slug",
): void {
  const seen = new Map<string, string>();
  for (const record of records) {
    const value = record[field];
    if (!isNonEmptyString(value)) continue;
    const first = seen.get(value);
    if (first) {
      error(area, `duplicate ${field} "${value}" (also used by ${first})`);
    } else {
      seen.set(value, label(record));
    }
  }
}

function checkSlugShape(value: unknown, area: string, context: string): void {
  if (!isNonEmptyString(value)) return;
  if (!KEBAB.test(value)) {
    error(area, `${context}: "${value}" is not lowercase kebab-case`);
  }
}

function checkUrl(value: unknown, area: string, context: string): void {
  if (value === undefined) return;
  if (!isNonEmptyString(value)) {
    error(area, `${context}: URL is empty`);
    return;
  }
  if (/\s/.test(value)) {
    error(area, `${context}: URL contains whitespace (${value})`);
    return;
  }
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    error(area, `${context}: invalid URL (${value})`);
    return;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    error(area, `${context}: unsupported URL protocol (${value})`);
  }
}

function checkMonthYear(
  value: unknown,
  area: string,
  context: string,
  field: string,
): void {
  if (value === undefined) return;
  if (!isNonEmptyString(value) || !MONTH_YEAR.test(value)) {
    error(area, `${context}: "${field}" must look like "September 2026"`);
  }
}

function checkDisplayDate(
  value: unknown,
  area: string,
  context: string,
  field: string,
): void {
  if (value === undefined) return;
  if (!isNonEmptyString(value) || !DISPLAY_DATE.test(value)) {
    error(
      area,
      `${context}: "${field}" must look like "September 2026" or "September 3, 2026"`,
    );
  }
}

function checkIsoDate(
  value: unknown,
  area: string,
  context: string,
  field: string,
): void {
  if (value === undefined) return;
  if (!isNonEmptyString(value) || !isIsoDate(value)) {
    error(area, `${context}: "${field}" must be a valid ISO date (YYYY-MM-DD)`);
  }
}

function checkVerification(
  record: { id?: unknown; slug?: unknown; verification?: Verification },
  area: string,
  context: string,
): void {
  const verification = record.verification;
  if (!verification) {
    error(area, `${context}: missing verification block`);
    return;
  }
  if (verification.status !== "verified" && verification.status !== "pending") {
    error(
      area,
      `${context}: invalid verification status "${verification.status}"`,
    );
    return;
  }

  if (verification.sourceId !== undefined) {
    if (!isNonEmptyString(verification.sourceId)) {
      error(area, `${context}: verification sourceId is empty`);
    } else if (!SOURCE_IDS.has(verification.sourceId)) {
      error(
        area,
        `${context}: verification sourceId "${verification.sourceId}" is not in data/sources.ts`,
      );
    }
  }

  checkUrl(verification.sourceUrl, area, `${context} verification`);

  if (verification.verifiedAt !== undefined) {
    if (
      !isNonEmptyString(verification.verifiedAt) ||
      !(
        isIsoDate(verification.verifiedAt) ||
        isIsoMonth(verification.verifiedAt)
      )
    ) {
      error(
        area,
        `${context}: verifiedAt "${verification.verifiedAt}" must be YYYY-MM or YYYY-MM-DD`,
      );
    }
  }

  if (!isNonEmptyString(verification.note)) {
    error(area, `${context}: verification note is required`);
  }

  if (verification.status === "verified") {
    if (!isNonEmptyString(verification.sourceId)) {
      error(area, `${context}: verified record must cite a sourceId`);
    } else if (verification.sourceId === "betterpagsanjan") {
      error(
        area,
        `${context}: original BetterPagsanjan content cannot be the source of a verified civic fact`,
      );
    }
    if (!isNonEmptyString(verification.verifiedAt)) {
      error(area, `${context}: verified record must have a verifiedAt date`);
    }
  } else if (verification.verifiedAt !== undefined) {
    error(area, `${context}: pending record must not claim a verifiedAt date`);
  }
}

function checkPlaceholdersAndUrls(): void {
  const placeholder =
    /\b(?:TODO|TBD|FIXME|lorem ipsum|placeholder|example\.com|John Doe|Jane Doe)\b/i;
  const urlPattern = /https?:\/\/[^\s<>"']+/g;

  const visit = (value: unknown, path: string): void => {
    if (typeof value === "string") {
      if (placeholder.test(value)) {
        error(
          "content",
          `${path}: placeholder text found ("${value.slice(0, 80)}")`,
        );
      }
      if (/^\s*undefined\s*$/.test(value)) {
        error("content", `${path}: literal "undefined" string`);
      }
      const urls = value.match(urlPattern);
      if (urls) {
        for (const raw of urls) {
          const url = raw.replace(/[.,;:)\]}]+$/, "");
          checkUrl(url, "content", path);
        }
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    if (value && typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        visit(child, path ? `${path}.${key}` : key);
      }
    }
  };

  COLLECTIONS.forEach((collection) => visit(collection.value, collection.name));
}

// ——— Sources ———

checkUnique(sources, "sources", "id");
for (const source of sources) {
  const context = `source "${source.id}"`;
  requireString(source.id, "sources", context, "id");
  requireString(source.name, "sources", context, "name");
  checkSlugShape(source.id, "sources", context);
  checkUrl(source.url, "sources", context);
  checkMonthYear(source.accessedAt, "sources", context, "accessedAt");
  if (
    !["government", "statute", "reference", "original"].includes(
      source.sourceType,
    )
  ) {
    error("sources", `${context}: invalid sourceType "${source.sourceType}"`);
  }
}
checkMonthYear(LAST_CHECKED, "sources", "LAST_CHECKED", "value");

// ——— Services ———

checkUnique(services, "services", "id");
checkUnique(services, "services", "slug");
for (const service of services) {
  const context = `service "${label(service)}"`;
  requireString(service.id, "services", context, "id");
  requireString(service.slug, "services", context, "slug");
  requireString(service.title, "services", context, "title");
  requireString(service.description, "services", context, "description");
  checkSlugShape(service.slug, "services", context);
  requireString(service.category, "services", context, "category");
  if (!SERVICE_CATEGORY_IDS.has(service.category)) {
    error("services", `${context}: unknown category "${service.category}"`);
  }
  requireString(service.office?.name, "services", context, "office.name");
  checkUrl(
    service.officialChannel?.url,
    "services",
    `${context} officialChannel`,
  );
  requireString(
    service.officialChannel?.label,
    "services",
    context,
    "officialChannel.label",
  );
  requireStringArray(service.aliases, "services", context, "aliases", false);
  requireStringArray(
    service.eligibility,
    "services",
    context,
    "eligibility",
    false,
  );
  requireStringArray(
    service.requirements,
    "services",
    context,
    "requirements",
    false,
  );
  requireStringArray(service.steps, "services", context, "steps", false);
  requireStringArray(
    service.relatedServices,
    "services",
    context,
    "relatedServices",
    false,
  );
  service.relatedServices?.forEach((slug) => {
    if (!SERVICE_SLUGS.has(slug)) {
      error("services", `${context}: related service "${slug}" does not exist`);
    }
    if (slug === service.slug) {
      error("services", `${context}: relatedServices must not include itself`);
    }
  });
  if (
    service.fees !== undefined &&
    (!Array.isArray(service.fees) || service.fees.length === 0)
  ) {
    error(
      "services",
      `${context}: "fees" must be a non-empty array when present`,
    );
  }
  for (const [index, fee] of (service.fees ?? []).entries()) {
    requireString(
      fee.description,
      "services",
      `${context} fee[${index}]`,
      "description",
    );
    if (
      fee.amount !== undefined &&
      (!Number.isFinite(fee.amount) || fee.amount < 0)
    ) {
      error(
        "services",
        `${context}: fee[${index}].amount must be zero or a positive number`,
      );
    }
  }
  checkVerification(service, "services", context);
  checkDisplayDate(service.lastChecked, "services", context, "lastChecked");
  requireString(service.lastChecked, "services", context, "lastChecked");

  if (service.verification.status === "verified") {
    requireStringArray(
      service.requirements,
      "services",
      context,
      "requirements",
      true,
    );
    requireStringArray(service.steps, "services", context, "steps", true);
    if (!Array.isArray(service.fees) || service.fees.length === 0) {
      error(
        "services",
        `${context}: verified service must list at least one fee entry`,
      );
    }
    requireString(
      service.processingTime,
      "services",
      context,
      "processingTime",
    );
  }
}

checkUnique(serviceCategories, "service categories", "id");
for (const category of serviceCategories) {
  requireString(
    category.id,
    "service categories",
    `category "${label(category)}"`,
    "id",
  );
  requireString(
    category.name,
    "service categories",
    `category "${label(category)}"`,
    "name",
  );
  requireString(
    category.description,
    "service categories",
    `category "${label(category)}"`,
    "description",
  );
  if (!services.some((service) => service.category === category.id)) {
    warning("service categories", `category "${category.id}" has no services`);
  }
}

// ——— Offices and officials ———

checkUnique(offices, "offices", "id");
for (const office of offices) {
  const context = `office "${office.id}"`;
  requireString(office.id, "offices", context, "id");
  requireString(office.name, "offices", context, "name");
  requireString(office.description, "offices", context, "description");
  checkSlugShape(office.id, "offices", context);
  if (
    ![
      "executive",
      "legislative",
      "finance",
      "administration",
      "health-social",
      "safety",
    ].includes(office.group)
  ) {
    error("offices", `${context}: invalid group "${office.group}"`);
  }
  office.services?.forEach((slug) => {
    if (!SERVICE_SLUGS.has(slug)) {
      error("offices", `${context}: service "${slug}" does not exist`);
    }
  });
  if (
    office.email !== undefined &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(office.email)
  ) {
    error("offices", `${context}: invalid email "${office.email}"`);
  }
  checkVerification(office, "offices", context);
}

checkUnique(officials, "officials", "id");
for (const official of officials) {
  const context = `official "${official.id}"`;
  requireString(official.id, "officials", context, "id");
  requireString(official.position, "officials", context, "position");
  requireString(official.name, "officials", context, "name");
  checkSlugShape(official.id, "officials", context);
  requireString(official.sourceId, "officials", context, "sourceId");
  if (!SOURCE_IDS.has(official.sourceId)) {
    error("officials", `${context}: unknown sourceId "${official.sourceId}"`);
  }
  requireString(official.sourceUrl, "officials", context, "sourceUrl");
  checkUrl(official.sourceUrl, "officials", context);
  if (!isIsoDate(official.verifiedAt)) {
    error("officials", `${context}: verifiedAt must be a full ISO date`);
  }
}

// ——— Barangays ———

checkUnique(barangays, "barangays", "id");
checkUnique(barangays, "barangays", "slug");
const psgcCodes = new Set<string>();
let populationSum = 0;
let populationCount = 0;
for (const barangay of barangays) {
  const context = `barangay "${label(barangay)}"`;
  requireString(barangay.id, "barangays", context, "id");
  requireString(barangay.slug, "barangays", context, "slug");
  requireString(barangay.name, "barangays", context, "name");
  checkSlugShape(barangay.slug, "barangays", context);

  if (barangay.psgcCode !== undefined) {
    if (!/^\d{10}$/.test(barangay.psgcCode)) {
      error("barangays", `${context}: PSGC code must be 10 digits`);
    } else if (!barangay.psgcCode.startsWith("0403419")) {
      error(
        "barangays",
        `${context}: PSGC code is outside Pagsanjan (0403419)`,
      );
    }
    if (psgcCodes.has(barangay.psgcCode)) {
      error(
        "barangays",
        `${context}: duplicate PSGC code ${barangay.psgcCode}`,
      );
    }
    psgcCodes.add(barangay.psgcCode);
  }

  if (barangay.population2024 !== undefined) {
    if (
      !Number.isInteger(barangay.population2024) ||
      barangay.population2024 < 0
    ) {
      error("barangays", `${context}: population2024 must be a whole number`);
    } else {
      populationSum += barangay.population2024;
      populationCount += 1;
    }
  }

  if (
    barangay.urbanRural !== undefined &&
    barangay.urbanRural !== "Urban" &&
    barangay.urbanRural !== "Rural"
  ) {
    error(
      "barangays",
      `${context}: invalid urbanRural value "${barangay.urbanRural}"`,
    );
  }

  checkVerification(barangay, "barangays", context);
}

if (barangays.length !== 16) {
  error("barangays", `expected 16 barangays, found ${barangays.length}`);
}
if (populationCount !== barangays.length) {
  error(
    "barangays",
    `only ${populationCount} of ${barangays.length} barangays have a 2024 population`,
  );
}

const municipalPopulation = statistics.find(
  (item) => item.id === "population-2024",
);
const municipalPopValue = municipalPopulation
  ? Number(municipalPopulation.value.replace(/,/g, ""))
  : Number.NaN;

if (Number.isFinite(municipalPopValue)) {
  if (populationSum !== municipalPopValue) {
    error(
      "barangays",
      `barangay populations total ${populationSum.toLocaleString("en-PH")}, but the municipal 2024 population is ${municipalPopValue.toLocaleString("en-PH")}`,
    );
  }
} else {
  error(
    "barangays",
    "cannot check the population total: population-2024 statistic is missing or not numeric",
  );
}

const countStatistic = statistics.find((item) => item.id === "barangays");
if (countStatistic && Number(countStatistic.value) !== barangays.length) {
  error(
    "statistics",
    `"barangays" statistic says ${countStatistic.value}, but ${barangays.length} records exist`,
  );
}

// ——— Statistics ———

checkUnique(statistics, "statistics", "id");
for (const item of statistics) {
  const context = `statistic "${label(item)}"`;
  requireString(item.id, "statistics", context, "id");
  requireString(item.label, "statistics", context, "label");
  requireString(item.value, "statistics", context, "value");
  checkSlugShape(item.id, "statistics", context);
  requireString(item.sourceId, "statistics", context, "sourceId");
  if (!SOURCE_IDS.has(item.sourceId)) {
    error("statistics", `${context}: unknown sourceId "${item.sourceId}"`);
  }
  checkUrl(item.sourceUrl, "statistics", context);
  if (
    item.year !== undefined &&
    (!isNonEmptyString(item.year) || !YEAR.test(item.year))
  ) {
    error("statistics", `${context}: year must be four digits`);
  }
}

// ——— Announcements ———

checkUnique(announcements, "announcements", "id");
if (
  !Number.isInteger(ANNOUNCEMENT_STALE_AFTER_DAYS) ||
  ANNOUNCEMENT_STALE_AFTER_DAYS <= 0
) {
  error(
    "announcements",
    "ANNOUNCEMENT_STALE_AFTER_DAYS must be a positive integer",
  );
}
for (const announcement of announcements) {
  const context = `announcement "${label(announcement)}"`;
  requireString(announcement.id, "announcements", context, "id");
  requireString(announcement.title, "announcements", context, "title");
  requireString(announcement.summary, "announcements", context, "summary");
  checkSlugShape(announcement.id, "announcements", context);
  requireString(announcement.date, "announcements", context, "date");
  requireString(
    announcement.lastChecked,
    "announcements",
    context,
    "lastChecked",
  );
  checkIsoDate(announcement.date, "announcements", context, "date");
  checkIsoDate(
    announcement.lastChecked,
    "announcements",
    context,
    "lastChecked",
  );
  if (
    isIsoDate(announcement.date) &&
    isIsoDate(announcement.lastChecked) &&
    announcement.lastChecked < announcement.date
  ) {
    error(
      "announcements",
      `${context}: lastChecked (${announcement.lastChecked}) is before publication date (${announcement.date})`,
    );
  }
  requireString(announcement.sourceId, "announcements", context, "sourceId");
  if (!SOURCE_IDS.has(announcement.sourceId)) {
    error(
      "announcements",
      `${context}: unknown sourceId "${announcement.sourceId}"`,
    );
  }
  requireString(announcement.sourceUrl, "announcements", context, "sourceUrl");
  checkUrl(announcement.sourceUrl, "announcements", context);
  if (
    announcement.kind !== undefined &&
    !["announcement", "advisory", "notice", "event", "news"].includes(
      announcement.kind,
    )
  ) {
    error("announcements", `${context}: invalid kind "${announcement.kind}"`);
  }
}

// ——— Legislative documents ———

checkUnique(legislativeDocuments, "legislative", "id");
checkUnique(legislativeDocuments, "legislative", "slug");
for (const document of legislativeDocuments) {
  const context = `${document.documentType} "${label(document)}"`;
  requireString(document.id, "legislative", context, "id");
  requireString(document.slug, "legislative", context, "slug");
  requireString(document.title, "legislative", context, "title");
  requireString(document.summary, "legislative", context, "summary");
  checkSlugShape(document.slug, "legislative", context);
  if (
    document.documentType !== "ordinance" &&
    document.documentType !== "resolution"
  ) {
    error(
      "legislative",
      `${context}: invalid documentType "${document.documentType}"`,
    );
  }
  checkIsoDate(document.date, "legislative", context, "date");
  if (
    document.year !== undefined &&
    (!isNonEmptyString(document.year) || !YEAR.test(document.year))
  ) {
    error("legislative", `${context}: year must be four digits`);
  }
  if (
    document.date &&
    document.year &&
    document.date.slice(0, 4) !== document.year
  ) {
    error(
      "legislative",
      `${context}: year "${document.year}" does not match date "${document.date}"`,
    );
  }
  requireString(document.sourceUrl, "legislative", context, "sourceUrl");
  checkUrl(document.sourceUrl, "legislative", context);
  checkVerification(document, "legislative", context);
  checkDisplayDate(document.lastChecked, "legislative", context, "lastChecked");
  requireString(document.lastChecked, "legislative", context, "lastChecked");
}

// ——— Projects ———

const allProjects = [...projects, ...floodControlProjects];
checkUnique(allProjects, "projects", "id");
checkUnique(allProjects, "projects", "slug");

const PROJECT_STATUSES = [
  "proposed",
  "planned",
  "ongoing",
  "completed",
  "delayed",
  "cancelled",
];
for (const project of allProjects) {
  const context = `project "${label(project)}"`;
  requireString(project.id, "projects", context, "id");
  requireString(project.slug, "projects", context, "slug");
  requireString(project.name, "projects", context, "name");
  requireString(project.description, "projects", context, "description");
  checkSlugShape(project.slug, "projects", context);
  if (!PROJECT_STATUSES.includes(project.status)) {
    error("projects", `${context}: invalid status "${project.status}"`);
  }
  checkIsoDate(project.startDate, "projects", context, "startDate");
  checkIsoDate(
    project.targetCompletion,
    "projects",
    context,
    "targetCompletion",
  );
  if (
    project.startDate &&
    project.targetCompletion &&
    isIsoDate(project.startDate) &&
    isIsoDate(project.targetCompletion) &&
    project.targetCompletion < project.startDate
  ) {
    error("projects", `${context}: targetCompletion is before startDate`);
  }
  checkUrl(project.sourceUrl, "projects", context);
  checkVerification(project, "projects", context);
  checkDisplayDate(project.lastChecked, "projects", context, "lastChecked");
  requireString(project.lastChecked, "projects", context, "lastChecked");
  if (project.verification.status === "verified") {
    requireString(project.sourceUrl, "projects", context, "sourceUrl");
  }
}

const fy2026Total = projects
  .filter((project) => project.budget?.includes("FY2026 GAA (DPWH)"))
  .reduce((sum, project) => {
    const match = project.budget?.match(/₱([\d,]+)/);
    return sum + (match ? Number(match[1].replace(/,/g, "")) : 0);
  }, 0);
if (fy2026Total !== PROJECTS_FY2026_TOTAL) {
  error(
    "projects",
    `FY2026 project amounts total ${fy2026Total.toLocaleString("en-PH")}, but PROJECTS_FY2026_TOTAL is ${PROJECTS_FY2026_TOTAL.toLocaleString("en-PH")}`,
  );
}

// ——— Transparency ———

checkUnique(transparencyRecords, "transparency", "id");
checkUnique(transparencyRecords, "transparency", "slug");
const TRANSPARENCY_CATEGORIES = [
  "budget",
  "procurement",
  "financial",
  "plans-programs",
  "documents",
  "open-data",
];
for (const record of transparencyRecords) {
  const context = `transparency record "${label(record)}"`;
  requireString(record.id, "transparency", context, "id");
  requireString(record.slug, "transparency", context, "slug");
  requireString(record.title, "transparency", context, "title");
  requireString(record.description, "transparency", context, "description");
  checkSlugShape(record.slug, "transparency", context);
  if (!TRANSPARENCY_CATEGORIES.includes(record.category)) {
    error("transparency", `${context}: invalid category "${record.category}"`);
  }
  if (
    record.year !== undefined &&
    (!isNonEmptyString(record.year) || !YEAR.test(record.year))
  ) {
    error("transparency", `${context}: year must be four digits`);
  }
  checkUrl(record.documentUrl, "transparency", context);
  checkUrl(record.sourceUrl, "transparency", context);
  checkVerification(record, "transparency", context);
  checkDisplayDate(record.lastChecked, "transparency", context, "lastChecked");
  requireString(record.lastChecked, "transparency", context, "lastChecked");

  if (record.relatedLegislativeSlug !== undefined) {
    if (!LEGISLATIVE_SLUGS.has(record.relatedLegislativeSlug)) {
      error(
        "transparency",
        `${context}: relatedLegislativeSlug "${record.relatedLegislativeSlug}" does not exist`,
      );
    } else {
      const document = legislativeDocuments.find(
        (item) => item.slug === record.relatedLegislativeSlug,
      );
      if (record.year && document?.year && record.year !== document.year) {
        error(
          "transparency",
          `${context}: year ${record.year} does not match the linked document year ${document.year}`,
        );
      }
    }
  }

  if (record.verification.status === "verified") {
    if (!record.documentUrl && !record.sourceUrl) {
      error(
        "transparency",
        `${context}: verified record must link to its original document`,
      );
    }
  }
}

// ——— Civic locations ———

checkUnique(civicLocations, "locations", "id");
checkUnique(civicLocations, "locations", "slug");
const LOCATION_CATEGORIES = [
  "government",
  "emergency",
  "health",
  "education",
  "barangay",
  "transport",
  "tourism",
  "evacuation",
  "community",
  "public-facility",
];
for (const location of civicLocations) {
  const context = `location "${label(location)}"`;
  requireString(location.id, "locations", context, "id");
  requireString(location.slug, "locations", context, "slug");
  requireString(location.name, "locations", context, "name");
  checkSlugShape(location.slug, "locations", context);
  if (!LOCATION_CATEGORIES.includes(location.category)) {
    error("locations", `${context}: invalid category "${location.category}"`);
  }
  const hasLatitude = location.latitude !== undefined;
  const hasLongitude = location.longitude !== undefined;
  if (hasLatitude !== hasLongitude) {
    error(
      "locations",
      `${context}: latitude and longitude must be provided together`,
    );
  }
  if (
    hasLatitude &&
    (!Number.isFinite(location.latitude) ||
      location.latitude! < -90 ||
      location.latitude! > 90)
  ) {
    error("locations", `${context}: latitude must be a number in -90..90`);
  }
  if (
    hasLongitude &&
    (!Number.isFinite(location.longitude) ||
      location.longitude! < -180 ||
      location.longitude! > 180)
  ) {
    error("locations", `${context}: longitude must be a number in -180..180`);
  }
  if (hasLatitude && hasLongitude) {
    requireString(
      location.verification.sourceUrl,
      "locations",
      context,
      "verification.sourceUrl (coordinates need provenance)",
    );
  }
  checkUrl(location.osmUrl, "locations", context);
  checkVerification(location, "locations", context);
  checkDisplayDate(location.lastChecked, "locations", context, "lastChecked");
  requireString(location.lastChecked, "locations", context, "lastChecked");
}

// ——— Consultations ———

checkUnique(consultations, "consultations", "id");
checkUnique(consultations, "consultations", "slug");
for (const consultation of consultations) {
  const context = `consultation "${label(consultation)}"`;
  requireString(consultation.id, "consultations", context, "id");
  requireString(consultation.slug, "consultations", context, "slug");
  requireString(consultation.topic, "consultations", context, "topic");
  requireString(
    consultation.description,
    "consultations",
    context,
    "description",
  );
  checkSlugShape(consultation.slug, "consultations", context);
  checkIsoDate(consultation.opensAt, "consultations", context, "opensAt");
  checkIsoDate(consultation.closesAt, "consultations", context, "closesAt");
  if (
    consultation.opensAt &&
    consultation.closesAt &&
    isIsoDate(consultation.opensAt) &&
    isIsoDate(consultation.closesAt) &&
    consultation.closesAt < consultation.opensAt
  ) {
    error("consultations", `${context}: closesAt is before opensAt`);
  }
  checkUrl(consultation.documentUrl, "consultations", context);
  checkUrl(consultation.sourceUrl, "consultations", context);
  checkVerification(consultation, "consultations", context);
  checkDisplayDate(
    consultation.lastChecked,
    "consultations",
    context,
    "lastChecked",
  );
  requireString(
    consultation.lastChecked,
    "consultations",
    context,
    "lastChecked",
  );
}

// ——— Emergency contacts ———

checkUnique(emergencyContacts, "emergency", "id");
for (const contact of emergencyContacts) {
  const context = `emergency contact "${label(contact)}"`;
  requireString(contact.id, "emergency", context, "id");
  requireString(contact.name, "emergency", context, "name");
  requireString(contact.description, "emergency", context, "description");
  checkSlugShape(contact.id, "emergency", context);
  if (!Array.isArray(contact.numbers) || contact.numbers.length === 0) {
    error("emergency", `${context}: at least one number is required`);
  } else {
    const seen = new Set<string>();
    contact.numbers.forEach((number, index) => {
      if (!isNonEmptyString(number.value)) {
        error("emergency", `${context}: numbers[${index}].value is empty`);
      } else if (seen.has(number.value)) {
        error("emergency", `${context}: duplicate number "${number.value}"`);
      } else {
        seen.add(number.value);
      }
    });
  }
  checkVerification(contact, "emergency", context);
  checkDisplayDate(contact.lastChecked, "emergency", context, "lastChecked");
  requireString(contact.lastChecked, "emergency", context, "lastChecked");
  if (contact.verification.status === "verified") {
    requireString(
      contact.verification.sourceUrl,
      "emergency",
      context,
      "verification.sourceUrl",
    );
  } else {
    requireString(contact.caution, "emergency", context, "caution");
  }
}

requireString(
  nationalHotline.number,
  "emergency",
  "national hotline",
  "number",
);
requireString(
  nationalHotline.sourceId,
  "emergency",
  "national hotline",
  "sourceId",
);
if (!SOURCE_IDS.has(nationalHotline.sourceId)) {
  error(
    "emergency",
    `national hotline: unknown sourceId "${nationalHotline.sourceId}"`,
  );
}
checkUrl(nationalHotline.sourceUrl, "emergency", "national hotline");
checkDisplayDate(
  nationalHotline.lastChecked,
  "emergency",
  "national hotline",
  "lastChecked",
);
requireString(
  nationalHotline.lastChecked,
  "emergency",
  "national hotline",
  "lastChecked",
);

// ——— Reporting guide ———

checkUnique(reportingCategories, "reporting", "id");
for (const category of reportingCategories) {
  const context = `reporting category "${label(category)}"`;
  requireString(category.id, "reporting", context, "id");
  requireString(category.title, "reporting", context, "title");
  requireString(category.description, "reporting", context, "description");
  checkSlugShape(category.id, "reporting", context);
  requireStringArray(category.examples, "reporting", context, "examples", true);
  requireStringArray(
    category.whatToPrepare,
    "reporting",
    context,
    "whatToPrepare",
    true,
  );
  if (category.officeId !== undefined) {
    if (!OFFICE_IDS.has(category.officeId)) {
      error("reporting", `${context}: unknown officeId "${category.officeId}"`);
    }
  } else {
    requireString(category.officeNote, "reporting", context, "officeNote");
  }
  checkVerification(category, "reporting", context);
  checkDisplayDate(category.lastChecked, "reporting", context, "lastChecked");
  requireString(category.lastChecked, "reporting", context, "lastChecked");
}

// ——— Content-wide checks ———

checkPlaceholdersAndUrls();

// ——— Report ———

const errors = issues.filter((issue) => issue.level === "error");
const warnings = issues.filter((issue) => issue.level === "warning");

console.log("BetterPagsanjan civic data check\n");
console.log(`Sources:              ${sources.length}`);
console.log(`Services:             ${services.length}`);
console.log(`Service categories:   ${serviceCategories.length}`);
console.log(`Offices:              ${offices.length}`);
console.log(`Officials:            ${officials.length}`);
console.log(
  `Barangays:            ${barangays.length} (population ${populationSum.toLocaleString("en-PH")})`,
);
console.log(`Statistics:           ${statistics.length}`);
console.log(`Announcements:        ${announcements.length}`);
console.log(`Legislative records:  ${legislativeDocuments.length}`);
console.log(`Projects:             ${allProjects.length}`);
console.log(`Transparency records: ${transparencyRecords.length}`);
console.log(`Civic locations:      ${civicLocations.length}`);
console.log(`Consultations:        ${consultations.length}`);
console.log(`Emergency contacts:   ${emergencyContacts.length}`);
console.log(`Reporting guides:     ${reportingCategories.length}\n`);

for (const group of [errors, warnings]) {
  if (group.length === 0) continue;
  const heading = group === errors ? "ERRORS" : "WARNINGS";
  console.log(`${heading} (${group.length})`);
  for (const issue of group) {
    console.log(`  [${issue.area}] ${issue.message}`);
  }
  console.log("");
}

if (errors.length > 0) {
  console.log(
    `Civic data check failed: ${errors.length} error(s), ${warnings.length} warning(s).`,
  );
  process.exitCode = 1;
} else {
  console.log(`Civic data check passed with ${warnings.length} warning(s).`);
}
