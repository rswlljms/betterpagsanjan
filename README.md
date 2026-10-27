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
npm run dev      # local development
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit # type check
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, the sitemap, and
the robots file point at the real domain.

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
scripts/      Maintenance checks (announcement review)
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
