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
                        <ExternalLink
                          className="mt-1 size-3.5 shrink-0"
                          aria-hidden
                        />
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

        <section aria-labelledby="open-data" className="mt-12 max-w-3xl">
          <h2
            id="open-data"
            className="text-xl font-bold tracking-tight text-ink"
          >
            Open data
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The same structured records behind these pages are available as
            read-only JSON — no account, no key. Every response carries the
            independence disclaimer, a last-checked date, and the source and
            verification metadata of each record.
          </p>
          <ul className="mt-4 list-none space-y-2 text-sm">
            {[
              { href: "/api/v1", label: "Index of resources" },
              { href: "/api/v1/emergency", label: "Emergency contacts" },
              { href: "/api/v1/services", label: "Service finder records" },
              { href: "/api/v1/barangays", label: "Barangay list" },
              { href: "/api/v1/offices", label: "Government offices" },
              { href: "/api/v1/sources", label: "Source registry" },
            ].map((endpoint) => (
              <li
                key={endpoint.href}
                className="flex flex-col gap-0.5 rounded-lg border border-line bg-white px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3"
              >
                <a
                  href={endpoint.href}
                  className="font-mono text-[13px] font-semibold text-primary-700 hover:underline"
                >
                  {endpoint.href}
                </a>
                <span className="text-muted">{endpoint.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Found an error or an out-of-date fact? The fix is to check the cited
          source — and BetterPagsanjan corrects records whenever a better
          authoritative source becomes available.
        </p>
      </Container>
    </>
  );
}
