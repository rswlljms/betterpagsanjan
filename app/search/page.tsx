import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/civic/page-hero";
import { SiteSearch } from "@/components/civic/site-search";
import { Container } from "@/components/ui/container";
import { CardGridSkeleton } from "@/components/ui/page-skeleton";
import { searchIndex } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Pagsanjan services, government offices, barangays, and civic information.",
};

export default function SearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Search BetterPagsanjan"
        description="One search across services, government offices, barangays, and civic information."
      />
      <Container className="py-10 sm:py-12">
        <Suspense fallback={<CardGridSkeleton />}>
          <SiteSearch records={searchIndex} />
        </Suspense>
      </Container>
    </>
  );
}
