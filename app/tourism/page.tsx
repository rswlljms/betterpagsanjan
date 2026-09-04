import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { tourismHighlights } from "@/data/tourism/highlights";

export const metadata: Metadata = {
  title: "Explore Pagsanjan",
  description:
    "Pagsanjan's falls, rivers, gorge, history, and heritage — presented with sources and clearly labeled interpretations.",
};

export default function TourismPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Explore Pagsanjan"
        description="The town behind the famous falls: two rivers, a dramatic gorge, and three and a half centuries of history. Historical entries rely on clearly labeled reference sources."
      />
      <Container className="py-10 sm:py-12">
        <ul className="grid list-none gap-4 lg:grid-cols-2">
          {tourismHighlights.map((highlight) => (
            <li key={highlight.id}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center gap-2">
                    {highlight.title}
                    {highlight.secondarySource ? (
                      <Badge variant="neutral">Secondary source</Badge>
                    ) : null}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {highlight.description}
                  </p>
                  <div className="mt-3">
                    <VerificationBadge verification={highlight.verification} />
                  </div>
                  <SourceAttribution
                    className="mt-4"
                    sourceId={highlight.verification.sourceId}
                    sourceUrl={highlight.verification.sourceUrl}
                    note={highlight.verification.note}
                  />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex max-w-3xl items-start gap-2 rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm leading-relaxed text-primary-900">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            Planning to visit? Confirm current conditions, rates, and accredited
            operators with official channels — start with the{" "}
            <a
              href={site.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold underline"
            >
              official municipal website
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
            . BetterPagsanjan does not book tours or collect payments.
          </p>
        </div>
      </Container>
    </>
  );
}
