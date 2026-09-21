# Changelog

All notable changes to BetterPagsanjan are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Write the entry in the same change that makes the change — do not reconstruct
it at release time. Each entry should describe citizen-visible impact, not
internal mechanics.

## [Unreleased]

### Changed

- Replaced the browser-tab icon with the BetterPagsanjan falls-and-sun
  mark; favicon assets now live in a dedicated folder
  (`public/images/favicon`, .ico + sized .png files, PWA icons and the
  maskable install icon updated to match)

### Fixed

- Emergency contacts now show a per-contact last-checked date and keep older
  conflicting numbers in a collapsed "previously posted" line instead of a
  long note; the Emergency page warns that cached or saved copies can go
  stale
- Civic map pins no longer overstate their provenance: GAA-chainage
  barangay-hall pins are pending leads (chainage is not coordinates), and
  private clinics were removed from the map
- Civic map is announced as a text-complemented region (not an application),
  with verified/pending counts on the map page and an honest evacuation
  center empty state

### Added

- Service guide (`/services/guide`): answer two quick questions in plain
  language — what you need to do, plus one follow-up — and get pointed
  to the right service page. Client-side only, no account, nothing
  stored; every outcome resolves to a real service record
- Ask BetterPagsanjan (`/ask`): a deterministic civic discovery assistant
  that answers plain-language questions with links to the site's own
  pages, shows 911-first emergency numbers for urgent questions, and
  says when nothing on the site matches instead of guessing
- Open data documentation on the Sources page listing the read-only
  `/api/v1/*` JSON endpoints
- Self-sufficient offline emergency page: 911 plus local hotlines with
  tap-to-call links, last-checked dates, and a grab-and-go checklist are
  baked into `/offline`, so they work even on a cache miss; service
  worker bumped to v3
- Read-only open data API (`/api/v1`, `/api/v1/emergency`,
  `/api/v1/services`, `/api/v1/barangays`, `/api/v1/offices`,
  `/api/v1/sources`) reusing the existing structured data layer with
  source and verification metadata and the independence disclaimer
- Global utility bar below the main nav, matching the reference info-bar
  behavior (BetterSolano/BetterLibmanan `assets/js/info-bar.js`): one rate
  slot rotating `1 USD = ₱ 62.61` → `1 EUR = …` → `1 JPY = …` (GBP, AED,
  SAR, SGD, CAD, AUD, KRW) every 4s with a short fade, static Pagsanjan
  temperature (Open-Meteo) and ticking Philippine time; reference-style "--"
  placeholders, nothing invented, hidden offline
- Interactive civic map with all 16 barangay areas (hover for names,
  select to open the barangay page) plus facility pins
- Live Pagsanjan weather on the homepage Today section, with source
  attribution and observation time
- Police station, fire station, and five health facilities on the map
  as clearly labeled unverified leads, and a map pin for the Municipal
  Hall with its conflicting street names shown

## [0.1.0] - 2026-09-05

### Added

- Initial public civic information platform (Next.js App Router, static-first)
- Service finder with structured service records
- Government directory (offices and verified officials)
- Barangay directory
- Emergency center with verified hotlines
- Announcements, ordinances, resolutions, and projects sections
- Transparency, statistics, tourism, map, and search pages
- Source registry with per-record verification metadata and last-checked dates
- PWA foundation (web manifest, service worker, offline page)
- SEO baseline (sitemap, robots, canonical URLs, Open Graph metadata)

[Unreleased]: https://github.com/rswlljms/betterpagsanjan/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/rswlljms/betterpagsanjan/releases/tag/v0.1.0
