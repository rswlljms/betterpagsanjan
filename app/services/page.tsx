import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/civic/page-hero";
import { ServiceFinder } from "@/components/civic/service-finder";
import { Container } from "@/components/ui/container";
import { CardGridSkeleton } from "@/components/ui/page-skeleton";
import { serviceCategories, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Find Pagsanjan government services — permits, certificates, taxes, and assistance — explained in plain language, with pointers to the responsible offices.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Finder"
        title="Government services"
        description="Search Pagsanjan services in plain language. Each page explains the service and points you to the responsible office — BetterPagsanjan never processes applications or payments."
      />
      <Container className="py-10 sm:py-12">
        <Suspense fallback={<CardGridSkeleton />}>
          <ServiceFinder services={services} categories={serviceCategories} />
        </Suspense>
      </Container>
    </>
  );
}
