import type { Metadata } from "next";
import Link from "next/link";
import { Map as MapIcon } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { EmptyState } from "@/components/civic/empty-state";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Civic map",
  description:
    "Interactive civic map of Pagsanjan — government offices, emergency facilities, health centers, barangay halls, and evacuation centers. Planned.",
};

const plannedCategories = [
  "Government",
  "Emergency",
  "Health",
  "Education",
  "Barangay",
  "Transport",
  "Tourism",
  "Evacuation",
  "Community",
  "Public facility",
];

export default function MapPage() {
  return (
    <>
      <PageHero
        eyebrow="Civic map"
        title="Civic map of Pagsanjan"
        description="An interactive map of useful public locations — planned for Phase 2."
      />
      <Container className="py-10 sm:py-12">
        <EmptyState
          className="max-w-2xl"
          icon={MapIcon}
          title="The interactive map is not available yet"
          description="A map without verified locations would be decoration, not information. BetterPagsanjan will launch the map once facility locations can be confirmed from authoritative sources, with each pin carrying its own source."
        />

        <div className="mt-8 max-w-2xl">
          <p className="text-sm font-semibold text-ink">Planned categories</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {plannedCategories.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Meanwhile: emergency contacts and preparedness guidance are on the{" "}
            <Link
              href="/emergency"
              className="font-medium text-primary-700 hover:underline"
            >
              Emergency page
            </Link>
            , and the Municipal Hall address is on the{" "}
            <Link
              href="/government"
              className="font-medium text-primary-700 hover:underline"
            >
              Government page
            </Link>
            .
          </p>
        </div>
      </Container>
    </>
  );
}
