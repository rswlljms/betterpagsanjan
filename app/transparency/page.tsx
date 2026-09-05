import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  getTransparencyByCategory,
  transparencyCategories,
} from "@/data/transparency/records";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "Budget, procurement, projects, and public document information for Pagsanjan — as it becomes verifiable from official sources.",
};

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Transparency"
        description="Making Pagsanjan's public financial and document records easier to find and understand. This section grows only as verifiable official records are found — figures are never estimated or invented."
      />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transparencyCategories.map((area) => {
            const records = getTransparencyByCategory(area.id);
            return (
              <Card key={area.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText
                      className="size-5 shrink-0 text-primary-700"
                      aria-hidden
                    />
                    {area.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {area.description}
                  </p>
                  {records.length === 0 ? (
                    <p className="mt-3 text-xs italic text-muted">
                      Information not yet available
                    </p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {records.map((record) => (
                        <li
                          key={record.id}
                          className="rounded-lg border border-line p-3 text-sm"
                        >
                          <p className="font-medium text-ink">
                            {record.title}
                          </p>
                          <p className="mt-1 text-xs text-muted">
                            {record.description}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <VerificationBadge
                              verification={record.verification}
                            />
                            {record.year ? (
                              <span className="text-xs text-muted">
                                {record.year}
                              </span>
                            ) : null}
                          </div>
                          {(record.documentUrl ?? record.sourceUrl) ? (
                            <a
                              href={
                                record.documentUrl ?? record.sourceUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-700 hover:underline"
                            >
                              Original document
                              <ExternalLink
                                className="size-3.5"
                                aria-hidden
                              />
                            </a>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          BetterPagsanjan is an independent project. Transparency records will
          always link to the original official document, with the publication
          date and the date BetterPagsanjan last checked it. Nothing in this
          section is created by BetterPagsanjan.
        </p>

        <SourceAttribution
          className="mt-6 max-w-3xl"
          sourceId="betterpagsanjan"
          note="Section planning documented by the BetterPagsanjan project."
        />
      </Container>
    </>
  );
}
