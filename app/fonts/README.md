# Self-hosted fonts

BetterPagsanjan serves its fonts from this folder instead of fetching them
from Google at build time (`next/font/google` → `next/font/local`).

Why:

- **Build reliability.** `next/font/google` fetches CSS from Google on every
  cold build. Google sometimes answers with its legacy `/l/font?kit=…&skey=…`
  URLs, which Turbopack's font resolver rejects with
  `next/font/google queries have exactly one entry`. Self-hosting removes
  that network dependency entirely (AGENTS.md §36).
- **Privacy and offline use.** No request to Google is needed to render the
  site, which also keeps the PWA/offline experience self-contained
  (AGENTS.md §19).
- **Performance.** Only the latin subset is shipped.

## Files

| File                    | Family  | Weight    | Subset |
| ----------------------- | ------- | --------- | ------ |
| `inter-latin-var.woff2` | Inter   | 100 – 900 | latin  |
| `poppins-400.woff2`     | Poppins | 400       | latin  |
| `poppins-500.woff2`     | Poppins | 500       | latin  |
| `poppins-600.woff2`     | Poppins | 600       | latin  |
| `poppins-700.woff2`     | Poppins | 700       | latin  |

Downloaded from the Google Fonts CSS API (latin subset) on October 26, 2026.
Inter is a single variable file covering the requested weights; Poppins is
served per weight.

## License

Both families are licensed under the SIL Open Font License 1.1:

- Inter — see `OFL-Inter.txt`
- Poppins — see `OFL-Poppins.txt`

The license files must stay alongside the fonts when they are redistributed.
