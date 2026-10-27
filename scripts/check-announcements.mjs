#!/usr/bin/env node
/**
 * Detects new posts on the official Pagsanjan municipal portal.
 *
 * This is a review aid, not a publisher. It reads the portal listing, compares
 * `news/<id>` links with the reviewed source links in `data/announcements.ts`,
 * and writes a checklist of unreviewed posts. A human still writes and commits
 * every summary (AGENTS.md §14, §16, §30).
 *
 * Usage:
 *   node scripts/check-announcements.mjs
 *   node scripts/check-announcements.mjs --base-url http://localhost:3000
 *   node scripts/check-announcements.mjs --data path/to/announcements.ts
 *
 * Exits 0 when the check completes, 1 when the portal cannot be read or its
 * listing markup cannot be parsed.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, "..");
const DEFAULT_BASE_URL = "https://www.pagsanjanlaguna.com";
const DEFAULT_MAX_PAGES = 10;
const REQUEST_DELAY_MS = 350;
const REQUEST_TIMEOUT_MS = 20_000;
const USER_AGENT =
  "BetterPagsanjan-Announcements-Check/1.0 (+https://betterpagsanjan.org; civic-information review)";

const MONTHS = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const FULL_DATE_PATTERN =
  /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})\b/;

const NAMED_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  rsquo: "\u2019",
  lsquo: "\u2018",
  ndash: "\u2013",
  mdash: "\u2014",
};

function log(message) {
  console.log(message);
}

function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

function decodeEntities(value) {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#")) {
      const isHex = entity[1]?.toLowerCase() === "x";
      const codePoint = Number.parseInt(
        entity.slice(isHex ? 2 : 1),
        isHex ? 16 : 10,
      );
      if (
        Number.isInteger(codePoint) &&
        codePoint >= 0 &&
        codePoint <= 0x10ffff
      ) {
        return String.fromCodePoint(codePoint);
      }
      return match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/**
 * Strips tags, decodes common entities, collapses whitespace, and normalizes
 * stylized Unicode (the portal sometimes publishes mathematical bold titles).
 */
function htmlToText(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
    .normalize("NFKC");
}

function absoluteUrl(value, baseUrl) {
  try {
    return new URL(value, baseUrl).href;
  } catch {
    return value;
  }
}

function normalizeBaseUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("--base-url must use http or https");
  }
  return url.href.replace(/\/+$/, "");
}

function pageUrl(baseUrl, page) {
  const url = new URL(baseUrl);
  if (page > 1) {
    url.searchParams.set("page", String(page));
  }
  return url.href;
}

async function fetchHtml(url, label) {
  let response;
  try {
    response = await fetch(url, {
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": USER_AGENT,
      },
      redirect: "follow",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Could not fetch ${label} (${url}): ${detail}`);
  }

  if (!response.ok) {
    throw new Error(`${label} returned HTTP ${response.status} (${url})`);
  }

  return response.text();
}

function extractArticleBlocks(html) {
  return [...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/gi)].map(
    (match) => match[0],
  );
}

function extractListingPosts(html) {
  const posts = [];

  for (const block of extractArticleBlocks(html)) {
    // Restrict to href values. Image sources also contain `/images/news/<id>`
    // and would otherwise be mistaken for post links.
    const link = block.match(/href=["']([^"']*\/news\/(\d+))["']/i);
    if (!link) continue;

    const heading = block.match(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/i);
    posts.push({
      id: link[2],
      url: link[1],
      title: heading ? htmlToText(heading[1]) : `News post ${link[2]}`,
    });
  }

  return posts;
}

function toIsoDate(match) {
  const [, monthName, dayValue, yearValue] = match;
  const month = MONTHS[monthName];
  const day = Number(dayValue);
  const year = Number(yearValue);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function extractDetail(html, fallback) {
  // The article hero is a dark section containing the real title and full
  // publication date. The site header also has an h1 ("Pagsanjan Laguna").
  const hero =
    html.match(
      /<section\b[^>]*class=["'][^"']*bg-slate-900[^"']*["'][\s\S]*?<\/section>/i,
    )?.[0] ?? html;

  const title =
    [...hero.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
      .map((match) => htmlToText(match[1]))
      .find(
        (candidate) => candidate && !/^Pagsanjan\s+Laguna$/i.test(candidate),
      ) ?? fallback.title;

  const dateMatch =
    hero.match(FULL_DATE_PATTERN) ?? html.match(FULL_DATE_PATTERN);
  const date = dateMatch ? toIsoDate(dateMatch) : null;

  return {
    title,
    date,
    dateKnown: date !== null,
  };
}

async function collectListing(baseUrl, maxPages) {
  const posts = new Map();

  for (let page = 1; page <= maxPages; page += 1) {
    const url = pageUrl(baseUrl, page);
    log(`Reading listing page ${page}: ${url}`);
    const html = await fetchHtml(url, `listing page ${page}`);
    const pagePosts = extractListingPosts(html);

    if (page === 1 && pagePosts.length === 0) {
      throw new Error(
        "The portal listing contained no news articles. Its markup may have changed.",
      );
    }

    let added = 0;
    for (const post of pagePosts) {
      if (!posts.has(post.id)) {
        posts.set(post.id, {
          ...post,
          url: absoluteUrl(post.url, baseUrl),
        });
        added += 1;
      }
    }

    log(`  found ${pagePosts.length} article(s); ${added} new to this run`);

    if (pagePosts.length === 0) {
      break;
    }

    // A repeated page usually means pagination has ended or is broken.
    if (page > 1 && added === 0) {
      log("  no new posts on this page; stopping");
      break;
    }

    if (page < maxPages) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return [...posts.values()];
}

async function readReviewedIds(dataFile) {
  const contents = await readFile(dataFile, "utf8");
  return new Set(
    [...contents.matchAll(/\/news\/(\d+)/g)].map((match) => match[1]),
  );
}

async function enrichNewPosts(posts) {
  const items = [];

  for (const [index, post] of posts.entries()) {
    log(`Reading new post ${index + 1}/${posts.length}: ${post.url}`);
    let detail = { title: post.title, date: null, dateKnown: false };

    try {
      const html = await fetchHtml(post.url, `news post ${post.id}`);
      detail = extractDetail(html, post);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log(`  warning: ${message}`);
    }

    items.push({
      id: post.id,
      title: detail.title,
      url: post.url,
      date: detail.date,
      dateKnown: detail.dateKnown,
    });

    if (index < posts.length - 1) {
      await sleep(REQUEST_DELAY_MS);
    }
  }

  return items;
}

function escapeMarkdownTitle(value) {
  return value.replace(/([\\[\]])/g, "\\$1");
}

function buildMarkdown(report) {
  const lines = [
    "# Announcement review candidates",
    "",
    `Checked: ${report.checkedAt}`,
    `Official listing: <${report.source}>`,
    "",
    `- Posts found: ${report.totalPosts}`,
    `- Already reviewed: ${report.reviewedCount}`,
    `- New candidates: ${report.newCount}`,
    "",
    "## New posts to review",
    "",
  ];

  if (report.items.length === 0) {
    lines.push("No unreviewed posts were found. No action is needed.", "");
  } else {
    for (const item of report.items) {
      const dateLabel = item.dateKnown ? item.date : "Date not retrieved";
      lines.push(
        `- [ ] ${dateLabel} — [${escapeMarkdownTitle(item.title)}](<${item.url}>)`,
      );
    }
    lines.push("");
  }

  lines.push(
    "## Review steps",
    "",
    "1. Open each post and confirm it is municipal news relevant to residents.",
    "2. Write a short summary in your own words in `data/announcements.ts`.",
    "3. Keep `date` as the publication date and set `lastChecked` to the review date.",
    '4. Use `kind: "news"`, `sourceId: "pagsanjan-legislative-portal"`, and the post URL as `sourceUrl`.',
    "5. Run lint, typecheck, and build; commit the reviewed summaries.",
    "6. Close the review issue after the commit.",
    "",
    "Publication dates are not event dates. A news post does not prove a program is still open.",
    "",
  );

  return lines.join("\n");
}

function buildReport(report) {
  return `${JSON.stringify(report, null, 2)}\n`;
}

async function writeReports(report, outDir) {
  await mkdir(outDir, { recursive: true });
  await Promise.all([
    writeFile(
      join(outDir, "announcement-candidates.md"),
      buildMarkdown(report),
      "utf8",
    ),
    writeFile(
      join(outDir, "announcement-candidates.json"),
      buildReport(report),
      "utf8",
    ),
  ]);
}

function printHelp() {
  console.log(`Check the official Pagsanjan portal for unreviewed news posts.

Usage:
  node scripts/check-announcements.mjs [options]

Options:
  --base-url <url>    Portal base URL (default: ${DEFAULT_BASE_URL})
  --data <path>       Reviewed announcements file
  --out-dir <path>    Directory for the generated reports
  --max-pages <n>     Maximum listing pages to read (default: ${DEFAULT_MAX_PAGES})
  -h, --help          Show this help

Outputs:
  announcement-candidates.md
  announcement-candidates.json
`);
}

function parseArgs(argv) {
  const options = {
    baseUrl: DEFAULT_BASE_URL,
    dataFile: join(REPO_ROOT, "data", "announcements.ts"),
    outDir: REPO_ROOT,
    maxPages: DEFAULT_MAX_PAGES,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    const readValue = () => {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`${arg} requires a value`);
      }
      index += 1;
      return value;
    };

    switch (arg) {
      case "--base-url":
        options.baseUrl = readValue();
        break;
      case "--data":
        options.dataFile = resolve(readValue());
        break;
      case "--out-dir":
        options.outDir = resolve(readValue());
        break;
      case "--max-pages": {
        const value = Number.parseInt(readValue(), 10);
        if (!Number.isInteger(value) || value < 1 || value > 50) {
          throw new Error("--max-pages must be an integer between 1 and 50");
        }
        options.maxPages = value;
        break;
      }
      default:
        throw new Error(`Unknown option: ${arg}`);
    }
  }

  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const baseUrl = normalizeBaseUrl(options.baseUrl);

  log(`Checking ${baseUrl} for new municipal news posts.`);
  const posts = await collectListing(baseUrl, options.maxPages);
  const reviewedIds = await readReviewedIds(options.dataFile);

  const newPosts = posts.filter((post) => !reviewedIds.has(post.id));
  const reviewedCount = posts.filter((post) => reviewedIds.has(post.id)).length;
  const items = await enrichNewPosts(newPosts);

  const report = {
    checkedAt: new Date().toISOString(),
    source: baseUrl,
    totalPosts: posts.length,
    reviewedCount,
    newCount: items.length,
    items,
  };

  await writeReports(report, options.outDir);

  log(
    `Done: ${report.newCount} new post(s) among ${report.totalPosts} listing post(s); ${report.reviewedCount} already reviewed.`,
  );
  log(
    `Reports: ${join(options.outDir, "announcement-candidates.md")} and ${join(options.outDir, "announcement-candidates.json")}`,
  );
}

main().catch((error) => {
  console.error(
    `Announcements check failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
