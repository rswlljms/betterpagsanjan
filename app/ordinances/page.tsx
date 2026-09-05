import type { Metadata } from "next";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";
import { LegislativeFinder } from "@/components/civic/legislative-finder";
import { PageHero } from "@/components/civic/page-hero";
import { Container } from "@/components/ui/container";
import { CardGridSkeleton } from "@/components/ui/page-skeleton";
import {
  getLegislativeTopics,
  getLegislativeYears,
  getOrdinances,
} from "@/data/legislative/documents";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Ordinances",
  description:
    "Searchable public index of Pagsanjan municipal ordinances — numbers, dates, topics, and official sources.",
};

export default function OrdinancesPage() {
  const ordinances = getOrdinances();
  return (
    <>
      <PageHero
        eyebrow="Legislative"
        title="Ordinances"
        description="A searchable public index of Pagsanjan municipal ordinances passed by the Sangguniang Bayan — with document numbers, dates, and sources. Records appear here only from verifiable official sources."
      />
      <Container className="py-10 sm:py-12">
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
          Showing {ordinances.length} recent records indexed by
          BetterPagsanjan. The complete archive lives on the{" "}
          <a
            href={`${site.legislativePortal}/ordinances`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
          >
            official municipal legislative portal
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
          , where every record links to its official document PDF.
        </p>
        <Suspense fallback={<CardGridSkeleton />}>
          <LegislativeFinder
            documents={ordinances}
            years={getLegislativeYears(ordinances)}
            topics={getLegislativeTopics(ordinances)}
            documentType="ordinance"
          />
        </Suspense>
      </Container>
    </>
  );
}
