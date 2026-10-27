# BetterPagsanjan roadmap

Updated: October 27, 2026.

BetterPagsanjan is an independent civic information project, not an official
municipal service. This roadmap supplements the priorities in `AGENTS.md`.

## Current position

Features from charter Phases 1–4 are implemented: civic directories, service
discovery, public information, a map, participation guides, an assistant,
offline emergency information, and read-only open data. Implementation does
not mean every record is verified or that each phase is fully complete.
Consultations are still empty; reporting routes, office contacts, and most
facility locations need local verification. Filipino localization is outstanding.

## Phase 5 — Trust and launch

### 1. Publish reviewed municipal updates

- [x] Publish a small manually reviewed set from the municipal news portal.
- [x] Show original-story links, publication dates, and per-record check dates
      on the announcements page; link homepage previews to those records.
- [x] Label summaries as BetterPagsanjan summaries. Publication dates are not
      event dates, registration deadlines, or proof a program is still open.
- [x] Correct the announcements fallback attribution to the current portal.
- [x] Establish a regular editorial review cadence for new and outdated posts:
      a weekly detection workflow opens or updates one review issue, the page
      warns after 60 days without review, and links to the official news feed.
      Publishing remains a manual, reviewed commit.

### 2. Expand Citizen's Charter service coverage

The starting dataset has three verified service guides (new and renewal
business permits and local birth-certificate copies) and seven pending guides.

- [x] Transcribe local marriage- and death-certificate copies.
- [x] Transcribe real property tax payment, general health consultation,
      new senior citizen IDs, and building permits.
- [x] Include requirements, steps, fees, processing times, exact printed/PDF
      page citations, scope limitations, and individual verification dates.
- [x] Retain published discrepancies and conditional requirements explicitly.
- [ ] Verify barangay clearance from barangay-level sources when available;
      the municipal charter does not establish its local procedure or fees.

Authoritative starting point: [2026 Citizen's Charter](https://www.pagsanjanlaguna.com/citizenscharter).

After the October 27 transcription pass, nine of ten guides have verified
charter details within their stated scope. Barangay clearance remains pending.
Lint, typecheck, production build, and mobile/desktop browser smoke checks
passed for this content increment; the remaining quality-gate work is below.

### 3. Verify local contact and location information

- [ ] Verify contacts/hours for the offices serving the priority services.
- [ ] Recheck emergency contacts, especially the pending PNP numbers.
- [ ] Confirm candidate facility pins and evacuation facilities using
      authoritative location evidence.
- [ ] Expand barangay contact information and the government roster only when
      supported by dated sources.
- [ ] Migrate remaining shared freshness labels to per-record dates as each
      record is actually reviewed; never advance dates in bulk.

### 4. Strengthen quality gates

- [x] Add data-integrity checks for source references, verification dates,
      unique IDs/slugs, cross-links, and census totals. `npm run check:data`
      runs offline in CI and also checks date formats, placeholder strings, and
      the FY2026 project total.
- [ ] Check public API contracts and high-value citizen journeys.
- [ ] Check mobile layouts, keyboard access, focus, contrast, and offline
      emergency behavior; add useful automated coverage to CI.
- [x] Audit official links and introduce a repeatable broken-link review.
      `npm run check:links` probes every cited URL and reports missing, blocked,
      or unreachable links; it is manual and report-only so CI never depends on
      government-site uptime. First run (October 27, 2026): 69 reachable, 8
      bot-blocked (PSA, Official Gazette, pagsanjan.gov.ph), and 1 unreachable
      (DILG). Recheck the blocked pages in a browser before editing their data.

### 5. Release and launch

- [ ] Confirm the deployment target, production domain, and actual deployment
      status with the maintainer. A failed domain lookup alone is not proof
      that no deployment exists.
- [ ] Configure production site URLs and server-side model credentials.
- [ ] Make assistant rate limits suitable for the chosen deployment topology.
- [ ] Run lint, typecheck, production build, and deployment smoke checks.
- [ ] Prepare the next release (proposed v0.4.0), its curated changelog, and tag
      after release review.

## Follow-on phase — English and Filipino

- [ ] Add maintainable language routing/dictionaries and translate navigation
      and shared interface text first.
- [ ] Translate priority service summaries with human review.
- [ ] Require human review for emergency, legal, and procedural translations.
- [ ] Preserve source links and verification scope in both languages.

## Completion standard

Each increment must solve a citizen need, preserve mobile accessibility,
provide traceable sources and honest freshness, pass relevant checks, and
clearly direct actual transactions to official channels. Unavailable facts
remain unavailable rather than being filled with estimates.
