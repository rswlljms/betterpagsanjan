import type { Metadata } from "next";
import { Suspense } from "react";
import { AskAssistant } from "@/components/civic/ask-assistant";
import { PageHero } from "@/components/civic/page-hero";
import { Container } from "@/components/ui/container";
import { CardGridSkeleton } from "@/components/ui/page-skeleton";

export const metadata: Metadata = {
  title: "Ask BetterPagsanjan",
  description:
    "Ask a question in plain language and get links to the BetterPagsanjan pages that answer it. Retrieval-only — it never guesses requirements, fees, or policies.",
};

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="Assistant"
        title="Ask BetterPagsanjan"
        description="Ask about permits, offices, barangays, and civic information. Answers come only from pages already published on this site."
      />
      <Container className="py-10 sm:py-12">
        <Suspense fallback={<CardGridSkeleton />}>
          <AskAssistant />
        </Suspense>
      </Container>
    </>
  );
}
