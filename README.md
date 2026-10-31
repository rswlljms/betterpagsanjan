# BetterPagsanjan

> **Government information, made easier for Pagsanjan.**

BetterPagsanjan is an **independent civic technology project** for the people of
Pagsanjan, Laguna, Philippines. It makes publicly available civic information
easier to find, understand, and use.

**BetterPagsanjan is not an official website of the Municipality of Pagsanjan.**
It is not operated by, endorsed by, or affiliated with the municipal government.
Information is compiled from publicly available sources. For official
transactions, requirements, fees, and policies, verify information with the
appropriate government office.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, static-first) + TypeScript
- Tailwind CSS v4 (civic design tokens in `app/globals.css`)
- Poppins + Inter, self-hosted via `next/font/local` (`app/fonts/`), Lucide icons
- Structured TypeScript data (`data/`) — no database yet, migration-friendly
- PWA foundation: web manifest + service worker (`public/sw.js`)

## Getting started

```bash
npm install
npm run dev              # local development
npm run build            # production build
npm run lint             # eslint
npx tsc --noEmit         # type check
npm run check:data       # validate civic data and source references
npm run check:rate-limit # verify the assistant's request limiter
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, the sitemap, and
the robots file point at the real domain.

## Configuration

Copy `.env.example` to `.env.local` and fill in what you need. Real values are
never committed — only the documentation copy (`.env.example`) is tracked.

| Variable               | Required           | Purpose                                                                                                                                    |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Base URL used by metadata, the sitemap, and robots.txt. Unset builds fall back to an unregistered placeholder domain.                      |
| `LLM_API_KEY`          | Optional           | Google AI Studio key for Ask BetterPagsanjan. Without it the assistant answers from the civic index and never calls a model.               |
| `LLM_MODEL`            | Optional           | Model for grounded answers. Defaults to `gemini-3.6-flash`.                                                                                |
| `SITE_LAUNCHED`        | Optional           | Set to `true` only when the site should be indexed. While unset, `robots.txt` disallows everything and responses carry a `noindex` header. |

## Deployment

The intended target is **Vercel** (AGENTS.md §9). Every page is prerendered at
build time; only `/api/ask` and the read-only `/api/v1/*` routes run on demand.
The Next.js preset and its defaults are correct — no build or output directory
overrides are needed.

### Stage 1 — staging deployment

Worth doing before the domain exists: it proves the deploy path and lets the
browser-only behaviour (service worker, offline page, serverless assistant) be
tested for real. The deployment stays out of search results.

1. Import the repository in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` to the generated `https://<project>.vercel.app`
   address, so metadata and the sitemap point at an address that is actually
   reachable.
3. Set `LLM_API_KEY` as a server-side variable (never `NEXT_PUBLIC_`), or leave
   it unset to ship the assistant in deterministic mode.
4. Leave `SITE_LAUNCHED` unset. `robots.txt` disallows crawling and every
   response carries `X-Robots-Tag: noindex, nofollow`.
5. Smoke check: homepage, a service page, search, the map, `/api/v1/services`,
   a few assistant questions, and `/offline` with the network disconnected.

### Stage 2 — public launch

1. Register the domain, add it in Vercel, and point its DNS at Vercel.
2. Change `NEXT_PUBLIC_SITE_URL` to that domain and set `SITE_LAUNCHED=true`.
3. Redeploy. `robots.txt` is prerendered, so an environment change alone does
   not update it.
4. Confirm `/robots.txt` allows crawling and lists the sitemap, and that
   responses no longer carry `X-Robots-Tag`; then submit `sitemap.xml` in
   Search Console.
5. Tag the release.

Run `npm run lint`, `npm run typecheck`, `npm run check:data`,
`npm run check:rate-limit`, and `npm run build` before either stage.

The assistant's rate limit (`app/api/ask/route.ts`, `lib/rate-limit.ts`) keeps
counters in module memory. That is a per-visitor limit on a single long-lived
Node process, but on Vercel each serverless instance has its own counter, so it
brakes bursts rather than enforcing a site-wide quota. Move the store to
Upstash Redis or Vercel KV when traffic makes the difference matter.

## Announcements review

`data/announcements.ts` is a manually reviewed set. It is not fetched at build
time or runtime, and nothing on the official portal is published automatically.

```bash
npm run check:announcements
```

The check reads the official portal's news listing, compares `news/<id>` links
with the reviewed links in `data/announcements.ts`, and writes ignored reports
(`announcement-candidates.md` and `.json`) listing unreviewed posts. A weekly
GitHub Actions workflow runs the same check and opens or updates one review
issue; it never publishes content.

To publish a candidate, write a short summary in your own words, set `date` to
the post's publication date, and set `lastChecked` to the date you reviewed it.
The announcements page links to the official news feed and shows a warning once
the newest review is more than `ANNOUNCEMENT_STALE_AFTER_DAYS` (60) days old.

## Data integrity checks

`npm run check:data` validates the structured data without any network access.
It runs in CI and checks:

- every `sourceId` against the registry in `data/sources.ts`;
- verification metadata (`status`, `verifiedAt`, source links, and notes);
- unique IDs and slugs, plus lowercase kebab-case URL slugs;
- service/category, office/service, transparency/legislation, and reporting
  cross-links;
- ISO and display date formats, and date ordering where one date depends on
  another;
- the 16-barangay PSGC list and its 2024 population total against the municipal
  statistic;
- the FY2026 project total and placeholder or malformed URL strings.

`npm run check:links` is a **manual, report-only** audit of every URL cited in
the civic data. It reports missing, blocked, and unreachable links with the
records that use them, and never runs in CI — a government site being down or
blocking bots must not fail a build. Review its findings by hand; add `--strict`
to make missing or unreachable links exit non-zero. Its first run found 69
reachable URLs, 8 that block automated requests, and 1 unreachable agency page.

## Project structure

```text
app/          Routes (one segment per section), sitemap, robots, manifest
components/   ui/ (primitives) and civic/ (domain components)
data/         Structured civic data — the single source of content
  services/     Service finder records (categories + per-domain files)
  government/   Municipal offices and verified officials
  barangays/    PSA-verified barangay list
  emergency/    Hotlines with per-contact verification status
  tourism/      Local-identity highlights with sources
  sources.ts    Central source registry
  site.ts       Site config and independence disclaimer
lib/          Search index + helpers, formatting, cn()
scripts/      Maintenance checks (announcements, data integrity, link audit)
types/        Shared civic data types
```

## Content rules (non-negotiable)

1. **Never fabricate government data.** No invented officials, fees,
   requirements, statistics, or contact numbers. Use “Information not yet
   available.”
2. **Every civic fact carries a source.** Records reference the central
   registry in `data/sources.ts` and show a _last checked_ date.
3. **Conflicts are shown, not hidden.** If authoritative sources disagree,
   the platform displays the conflict.
4. **BetterPagsanjan never processes transactions.** Service pages explain and
   then point to the responsible office or official channel.
5. **Emergency numbers state their provenance.** Unverified transcriptions are
   labeled with a caution; 911 always comes first.

See `AGENTS.md` for the complete project charter.

See [ROADMAP.md](ROADMAP.md) for current priorities, verification gaps, and
the trust-and-launch plan.

## License

This project is dual-licensed:

- **MIT License** — source code, free to use, modify, and distribute
  (see `LICENSE`).
- **CC BY 4.0** — text and compiled civic content, reusable with
  attribution to BetterPagsanjan.
