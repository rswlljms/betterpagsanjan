import type { Metadata } from "next";
import { Check, ExternalLink, X } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { independence, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "BetterPagsanjan is an independent civic technology project for the people of Pagsanjan, Laguna. It is not an official website of the Municipality of Pagsanjan.",
};

const isItems = [
  "An independent civic technology project for the people of Pagsanjan",
  "A layer that organizes publicly available government information",
  "A guide that points official transactions to the right government office",
  "A platform that shows its sources and “last checked” dates",
];

const isNotItems = [
  "An official website, portal, or service of the Municipality of Pagsanjan",
  "Operated by, endorsed by, or speaking for the municipal government",
  "A system that can receive applications, complaints, or payments",
  "A source of government authority or official decisions",
];

const workflowSteps = [
  { step: "Draft", detail: "Information is collected from a public source." },
  { step: "Review", detail: "It is checked against the cited source." },
  { step: "Verified", detail: "The record carries its source and date." },
  { step: "Published", detail: "It appears on the platform with attribution." },
  {
    step: "Archived",
    detail: "Outdated records are removed or clearly labeled.",
  },
];

const phases = [
  {
    name: "Phase 1 — Civic foundation",
    detail:
      "Homepage, service finder, government directory, barangay directory, emergency information, search, and source attribution.",
  },
  {
    name: "Phase 2 — Public information",
    detail:
      "Ordinances, resolutions, public documents, statistics, transparency, and the civic map.",
  },
  {
    name: "Phase 3 — Civic participation",
    detail:
      "Public consultations, community feedback, and official reporting links.",
  },
  {
    name: "Phase 4 — Local innovation",
    detail:
      "Civic assistant with retrieval from the verified dataset, offline emergency center, and open data.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About BetterPagsanjan"
        description={independence.short}
      />

      <Container className="space-y-12 py-10 sm:py-12">
        <section aria-labelledby="what-heading" className="grid gap-4 lg:grid-cols-2">
          <h2 id="what-heading" className="sr-only">
            What BetterPagsanjan is and is not
          </h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What it is</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-2.5">
                {isItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-700" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What it is not</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-none space-y-2.5">
                {isNotItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <X className="mt-0.5 size-4 shrink-0 text-red-700" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section aria-labelledby="verification-heading">
          <h2
            id="verification-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            How information is handled
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            Civic facts on this platform must be traceable to a source. When
            information cannot be verified from an authoritative source, the
            platform says “Information not yet available” instead of inventing
            details. Verified records show their source and a last-checked date;
            anything pending is labeled as such.
          </p>
          <ol className="mt-6 flex list-none flex-wrap gap-3">
            {workflowSteps.map((item, index) => (
              <li
                key={item.step}
                className="flex-1 basis-40 rounded-lg border border-line bg-white p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                  Step {index + 1}
                </p>
                <p className="mt-1 font-semibold text-ink">{item.step}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-muted">
            This workflow governs BetterPagsanjan&rsquo;s own editorial process. It is
            not, and must never be presented as, an official municipal approval
            process.
          </p>
          <SourceAttribution
            className="mt-4 max-w-3xl"
            sourceId="betterpagsanjan"
          />
        </section>

        <section aria-labelledby="privacy-heading">
          <h2
            id="privacy-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Privacy
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            You do not need an account to browse, search, or read anything on
            BetterPagsanjan. The first version collects no personal information
            and has no sign-in. If submissions or the civic assistant are added
            later, their data collection will be explained before any data is
            requested.
          </p>
        </section>

        <section aria-labelledby="roadmap-heading">
          <h2
            id="roadmap-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Roadmap
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {phases.map((phase) => (
              <Card key={phase.name}>
                <CardContent className="pt-5">
                  <p className="font-semibold text-ink">{phase.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {phase.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section aria-labelledby="disclaimer-heading">
          <h2
            id="disclaimer-heading"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Independent project disclaimer
          </h2>
          <div className="mt-4 max-w-3xl space-y-2 rounded-lg border border-primary-200 bg-primary-50 p-5 text-sm leading-relaxed text-primary-900">
            {independence.footer.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <a
                href={site.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold underline"
              >
                Municipality of Pagsanjan — official website
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
