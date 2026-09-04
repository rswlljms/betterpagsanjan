import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Container } from "@/components/ui/container";
import { barangays } from "@/data/barangays/barangays";

export const metadata: Metadata = {
  title: "Barangays",
  description:
    "Directory of the 16 barangays of Pagsanjan, Laguna, verified against the Philippine Standard Geographic Code.",
};

export default function BarangaysPage() {
  return (
    <>
      <PageHero
        eyebrow="Barangays"
        title="Barangays of Pagsanjan"
        description="Pagsanjan has 16 barangays — two poblacion barangays at the town proper and 14 more across the municipality. Barangay names are verified against the PSA Philippine Standard Geographic Code."
      />

      <Container className="py-10 sm:py-12">
        <ul className="grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {barangays.map((barangay) => (
            <li key={barangay.id}>
              <Link
                href={`/barangays/${barangay.slug}`}
                className="flex items-center justify-between gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-slate-800 transition-colors hover:border-primary-300 hover:bg-primary-50/40 hover:text-primary-900"
              >
                {barangay.name}
                <ChevronRight
                  className="size-4 shrink-0 text-slate-400"
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>

        <SourceAttribution
          className="mt-8 max-w-3xl"
          sourceId="psa-psgc"
          sourceUrl="https://psa.gov.ph/classification/psgc/barangays/0403419000"
          lastChecked="September 2026"
          note="Barangay count confirmed through the PSA Philippine Standard Geographic Code; names cross-checked against two secondary compilations (PhilAtlas, Wikipedia) that agree with the PSGC listing."
        />
      </Container>
    </>
  );
}
