/**
 * Civic link audit (manual, report-only).
 *
 * Collects every URL cited anywhere in the civic data — sources, verification
 * blocks, documents, projects, officials, and map links — and probes it over
 * the network. This is deliberately NOT part of CI: a government site being
 * briefly down, rate-limiting bots, or blocking a GitHub runner must not fail
 * a build or imply that the underlying civic fact is wrong.
 *
 *   npm run check:links
 *   npm run check:links -- --strict   # exit 1 on missing/unreachable links
 *
 * Review failures by hand. A 401/403/429 is reported as "blocked" rather than
 * broken, because many official sites reject automated requests.
 */

import { announcements } from "../data/announcements";
import { barangays } from "../data/barangays/barangays";
import { consultations } from "../data/consultations";
import { emergencyContacts, nationalHotline } from "../data/emergency/contacts";
import { offices } from "../data/government/offices";
import { officials } from "../data/government/officials";
import { legislativeDocuments } from "../data/legislative/documents";
import { civicLocations } from "../data/locations/locations";
import { floodControlProjects } from "../data/projects/flood-control";
import { projects } from "../data/projects/projects";
import { reportingCategories } from "../data/reporting";
import { services, serviceCategories } from "../data/services/index";
import { sources } from "../data/sources";
import { statistics } from "../data/statistics";
import { transparencyRecords } from "../data/transparency/records";

type LinkStatus = "ok" | "blocked" | "missing" | "error" | "unreachable";

interface ProbeResult {
  status: LinkStatus;
  detail: string;
}

interface CollectedUrl {
  url: string;
  paths: Set<string>;
}

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

const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");
const timeoutArg = process.argv.find((arg) => arg.startsWith("--timeout="));
const concurrencyArg = process.argv.find((arg) =>
  arg.startsWith("--concurrency="),
);
const timeoutMs = timeoutArg ? Number(timeoutArg.split("=")[1]) : 15_000;
const concurrency = concurrencyArg ? Number(concurrencyArg.split("=")[1]) : 5;

function collectUrls(): CollectedUrl[] {
  const found = new Map<string, CollectedUrl>();
  const pattern = /https?:\/\/[^\s<>"']+/g;

  const visit = (value: unknown, path: string): void => {
    if (typeof value === "string") {
      const matches = value.match(pattern);
      for (const match of matches ?? []) {
        const url = match.replace(/[.,;:)\]}]+$/, "");
        const existing = found.get(url);
        if (existing) {
          existing.paths.add(path);
        } else {
          found.set(url, { url, paths: new Set([path]) });
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
        visit(child, `${path}.${key}`);
      }
    }
  };

  COLLECTIONS.forEach((collection) => visit(collection.value, collection.name));
  return [...found.values()].sort((a, b) => a.url.localeCompare(b.url));
}

async function request(url: string, method: "HEAD" | "GET"): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "BetterPagsanjanLinkAudit/1.0 (independent civic project; manual broken-link review)",
        accept: "text/html,application/pdf,application/json;q=0.9,*/*;q=0.8",
        ...(method === "GET" ? { range: "bytes=0-0" } : {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

function classify(status: number): LinkStatus {
  if (status >= 200 && status < 400) return "ok";
  if ([401, 403, 429].includes(status)) return "blocked";
  if ([404, 410].includes(status)) return "missing";
  return "error";
}

async function probe(url: string): Promise<ProbeResult> {
  let response: Response | undefined;
  let lastError: unknown;

  for (const method of ["HEAD", "GET"] as const) {
    try {
      response = await request(url, method);
      // Some official servers reject HEAD or return 5xx for it; retry with a
      // ranged GET before treating the link as broken.
      if (response.status >= 200 && response.status < 400) break;
      if (method === "HEAD") {
        await response.body?.cancel();
        continue;
      }
      break;
    } catch (cause) {
      lastError = cause;
      await response?.body?.cancel();
      response = undefined;
    }
  }

  if (!response) {
    if (lastError instanceof Error && lastError.name === "AbortError") {
      return {
        status: "unreachable",
        detail: `timed out after ${timeoutMs} ms`,
      };
    }
    return {
      status: "unreachable",
      detail:
        lastError instanceof Error ? lastError.message : String(lastError),
    };
  }

  const result = classify(response.status);
  const detail = `HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ""}`;
  await response.body?.cancel();
  return { status: result, detail };
}

async function run(): Promise<void> {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    console.error("Invalid --timeout value.");
    process.exitCode = 2;
    return;
  }
  if (!Number.isInteger(concurrency) || concurrency <= 0 || concurrency > 20) {
    console.error("Invalid --concurrency value (1–20).");
    process.exitCode = 2;
    return;
  }

  const links = collectUrls();
  console.log(`BetterPagsanjan cited-link audit (report-only)\n`);
  console.log(`Unique URLs: ${links.length}`);
  console.log(`Timeout: ${timeoutMs} ms · Concurrency: ${concurrency}\n`);

  const results = new Map<string, ProbeResult>();
  let next = 0;

  async function worker(): Promise<void> {
    while (next < links.length) {
      const link = links[next++];
      const result = await probe(link.url);
      results.set(link.url, result);
      process.stdout.write(".");
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, links.length) }, worker),
  );
  process.stdout.write("\n\n");

  const order: LinkStatus[] = [
    "missing",
    "unreachable",
    "error",
    "blocked",
    "ok",
  ];
  const labels: Record<LinkStatus, string> = {
    missing: "MISSING",
    unreachable: "UNREACHABLE",
    error: "SERVER ERROR",
    blocked: "BOT-BLOCKED (check manually)",
    ok: "OK",
  };

  for (const status of order) {
    const group = links.filter(
      (link) => results.get(link.url)?.status === status,
    );
    if (group.length === 0) continue;
    console.log(`${labels[status]} (${group.length})`);
    for (const link of group) {
      const result = results.get(link.url)!;
      console.log(`  ${result.detail}  ${link.url}`);
      console.log(`      used by: ${[...link.paths].slice(0, 3).join(", ")}`);
    }
    console.log("");
  }

  const counts = order.map(
    (status) =>
      `${labels[status]}: ${links.filter((link) => results.get(link.url)?.status === status).length}`,
  );
  console.log(counts.join(" · "));
  console.log(
    "\nThis audit uses live network requests. A failure can mean the site is down,\n" +
      "rate-limiting bots, or blocking this runner — verify by hand before editing data.\n" +
      "CI does not run this check.",
  );

  if (strict) {
    const failures = links.filter((link) => {
      const status = results.get(link.url)?.status;
      return (
        status === "missing" || status === "unreachable" || status === "error"
      );
    });
    if (failures.length > 0) {
      console.log(`\nStrict mode: ${failures.length} link(s) need review.`);
      process.exitCode = 1;
    }
  }
}

void run();
