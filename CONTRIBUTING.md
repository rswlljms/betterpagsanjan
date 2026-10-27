# Contributing to BetterPagsanjan

Thank you for helping make Pagsanjan's public information easier to find,
understand, and use.

BetterPagsanjan is an **independent civic technology project**. It is not an
official website of the Municipality of Pagsanjan, and contributions must never
imply otherwise.

## Workflow

Trunk-based development. The default branch (`main`) is always deployable.

The project is currently maintained by a solo developer. The maintainer
commits directly to `main` in small, verified slices; short-lived branches are
optional and reserved for experimental work that may not ship.

1. Sync `main`: `git checkout main && git pull`
2. Work in small slices: implement → verify → commit → next slice.
3. Run the checks below, then commit directly to `main`.
4. Push after the slice is verified.

External contributors: fork the repository, create a branch in the fork, and
open a pull request against `main`. Keep your fork synced with upstream before
branching.

## Commit messages

Conventional Commits. Format: `<type>: <short description>`

Types: `feat`, `fix`, `content`, `docs`, `style`, `refactor`, `perf`,
`test`, `build`, `ci`, `chore`, `revert`.

```text
feat: add business permit to service finder
fix: correct barangay search empty state on mobile
content: update civil registry requirements from municipal source
docs: document civic data verification workflow
```

Explain the _why_ in the body when it is not obvious from the diff. Messages
are enforced by commitlint, locally and in CI.

Keep concerns separate: do not mix formatting with behavior, or refactoring
with features.

## Before every commit

```bash
git diff --staged            # review what you are about to commit
npm run lint                 # eslint (runs automatically on staged files via husky)
npm run typecheck            # tsc --noEmit
```

Never commit secrets, `.env` files, or build output. If a test fails, revert
to the last commit and investigate — commits are save points.

## Pull requests

- Fill out the PR template, including the civic data checklist for any
  content change.
- Link the issue with `Closes #<number>` when applicable.
- Keep the independent-project disclaimer and source attribution intact.
- Verify on a narrow mobile viewport; preserve keyboard navigation and
  visible focus states.

## Versioning and changelog

- Versioning follows [Semantic Versioning](https://semver.org/): breaking →
  major, additive → minor, fix → patch. `package.json` is the source of truth.
- The changelog (`CHANGELOG.md`, Keep a Changelog format) is written for
  citizens and reusers, grouped by impact (`Added` / `Changed` / `Fixed` /
  `Removed`). Write the entry in the same change that makes the change.
- Releases are git tags (`v0.1.0`, `v0.2.0`, …):

```bash
git tag -a v0.2.0 -m "Release 0.2.0"
git push origin v0.2.0
```

## Civic data rules (non-negotiable)

1. **Never fabricate government data** — no invented officials, fees,
   requirements, statistics, or contact numbers. Use "Information not yet
   available."
2. **Every civic fact carries a source** — reference `data/sources.ts` and
   keep an accurate `lastChecked` date.
3. **Show conflicts, don't hide them** — if sources disagree, display the
   disagreement.
4. **Never process transactions** — explain the service, then point citizens
   to the responsible office or official channel.

See `README.md` and `AGENTS.md` for the full project charter. Content
corrections from citizens are welcome via the "Content correction" issue
template — verifiable sources required.
