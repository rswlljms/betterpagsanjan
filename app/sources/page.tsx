import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { sources } from "@/data/sources";
import type { SourceType } from "@/types/civic";

export const metadata: Metadata = {
  title: "Sources",
  description:
    "The source registry behind BetterPagsanjan: government sources, statutes, secondary references, and original content.",
};

const typeLabels: Record<SourceType, string> = {
  government: "Government",
  statute: "Statute",
  reference: "Secondary reference",
  original: "Original content",
};

const typeBadgeVariant: Record<SourceType, BadgeVariant> = {
  government: "success",
  statute: "primary",
  reference: "neutral",
  original: "accent",
};

export default function SourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Sources"
        description="Every civic fact on BetterPagsanjan is traced to a source. Government and statutory sources are authoritative; secondary references are used only for cross-checking and are always labeled."
      />
      <Container className="py-10 sm:py-12">
        <ul className="grid list-none gap-4 lg:grid-cols-2">
          {sources.map((source) => (
            <li key={source.id}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={typeBadgeVariant[source.sourceType]}>
                      {typeLabels[source.sourceType]}
                    </Badge>
                    {source.accessedAt ? (
                      <span className="text-xs text-muted">
                        Last checked: {source.accessedAt}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 font-semibold text-ink">
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 text-primary-700 hover:underline"
                      >
                        {source.name}
                        <ExternalLink className="mt-1 size-3.5 shrink-0" aria-hidden />
                      </a>
                    ) : (
                      source.name
                    )}
                  </p>
                  {source.organization ? (
                    <p className="mt-0.5 text-xs text-muted">
                      {source.organization}
                    </p>
                  ) : null}
                  {source.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {source.description}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Found an error or an out-of-date fact? The fix is to check the cited
          source — and BetterPagsanjan corrects records whenever a better
          authoritative source becomes available.
        </p>
      </Container>
    </>
  );
}
