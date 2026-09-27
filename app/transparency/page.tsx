import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { TransparencyFinder } from "@/components/civic/transparency-finder";
import { Container } from "@/components/ui/container";
import { CardGridSkeleton } from "@/components/ui/page-skeleton";
import {
  transparencyCategories,
  transparencyRecords,
} from "@/data/transparency/records";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "Budget, procurement, projects, and public document information for Pagsanjan — as it becomes verifiable from official sources.",
};

function getTransparencyYears(): string[] {
  const years = new Set<string>();
  for (const record of transparencyRecords) {
    if (record.year) years.add(record.year);
  }
  return [...years].sort((a, b) => b.localeCompare(a));
}

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Transparency"
        description="Making Pagsanjan's public financial and document records easier to find and understand. This section grows only as verifiable official records are found — figures are never estimated or invented."
      />
      <Container className="py-10 sm:py-12">
        <Suspense fallback={<CardGridSkeleton />}>
          <TransparencyFinder
            areas={transparencyCategories}
            records={transparencyRecords}
            years={getTransparencyYears()}
          />
        </Suspense>

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
