import type { Metadata } from "next";
import { ServiceGuide } from "@/components/civic/service-guide";
import { PageHero } from "@/components/civic/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Which service do I need?",
  description:
    "Answer two quick questions in plain language and get pointed to the right Pagsanjan government service. No account, nothing stored.",
};

export default function ServiceGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Service Guide"
        title="Which service do I need?"
        description="Not sure where to start? Pick what you want to do — we'll point you to the right service page. No account, nothing is stored."
      />
      <Container className="py-10 sm:py-12">
        <ServiceGuide />
      </Container>
    </>
  );
}
