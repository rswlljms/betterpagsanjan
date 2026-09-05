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
  getResolutions,
} from "@/data/legislative/documents";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Resolutions",
  description:
    "Searchable public index of Pagsanjan municipal resolutions — numbers, dates, topics, and official sources.",
};

export default function ResolutionsPage() {
  const resolutions = getResolutions();
  return (
    <>
      <PageHero
        eyebrow="Legislative"
        title="Resolutions"
        description="A searchable public index of Pagsanjan municipal resolutions approved by the Sangguniang Bayan — with document numbers, dates, and sources. Records appear here only from verifiable official sources."
      />
      <Container className="py-10 sm:py-12">
        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
          Showing {resolutions.length} recent records indexed by
          BetterPagsanjan. The complete archive lives on the{" "}
          <a
            href={`${site.legislativePortal}/resolutions`}
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
            documents={resolutions}
            years={getLegislativeYears(resolutions)}
            topics={getLegislativeTopics(resolutions)}
            documentType="resolution"
          />
        </Suspense>
      </Container>
    </>
  );
}
