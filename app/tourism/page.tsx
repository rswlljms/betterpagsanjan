import type { Metadata } from "next";
import { ExternalLink, Info } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";
import { heroPhotos } from "@/data/tourism/hero-photos";
import { tourismHighlights } from "@/data/tourism/highlights";
import { canonical } from "@/lib/metadata";

export const metadata: Metadata = {
  ...canonical("/tourism"),
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
                  <CardTitle
                    as="h2"
                    className="flex flex-wrap items-center gap-2"
                  >
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

        <section
          id="photo-credits"
          className="mt-12 scroll-mt-24 border-t border-line pt-8"
        >
          <h2 className="font-display text-xl font-semibold text-ink">
            Photo Credits
          </h2>
          <p className="mt-2 text-sm text-bp-graphite">
            Photographs of Pagsanjan landmarks appearing on the homepage hero
            mosaic are used under Creative Commons licenses. Full attribution
            and file provenance:
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {heroPhotos.map((photo) => (
              <li
                key={photo.id}
                className="rounded-lg border border-line bg-white p-3 text-xs text-bp-graphite"
              >
                <p className="font-semibold text-ink">{photo.subject}</p>
                <p className="mt-1">
                  Photo:{" "}
                  {photo.photographerUrl ? (
                    <a
                      href={photo.photographerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-bp-ink"
                    >
                      {photo.photographer}
                    </a>
                  ) : (
                    photo.photographer
                  )}
                </p>
                <p className="mt-0.5">
                  License:{" "}
                  <a
                    href={photo.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-bp-ink"
                  >
                    {photo.license}
                  </a>{" "}
                  ·{" "}
                  <a
                    href={photo.filePageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-bp-ink"
                  >
                    Wikimedia Commons
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
