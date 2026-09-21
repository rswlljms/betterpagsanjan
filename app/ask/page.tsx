import type { Metadata } from "next";
import { AskAssistant } from "@/components/civic/ask-assistant";
import { PageHero } from "@/components/civic/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Ask BetterPagsanjan",
  description:
    "Chat with Ask BetterPagsanjan about permits, offices, barangays, and civic information. Retrieval-only — it never guesses requirements, fees, or policies.",
};

export default function AskPage() {
  return (
    <>
      <PageHero
        eyebrow="Assistant"
        title="Ask BetterPagsanjan"
        description="Chat about permits, offices, barangays, and civic information. Replies come only from pages already published on this site."
      />
      <Container className="py-10 sm:py-12">
        <AskAssistant />
      </Container>
    </>
  );
}
