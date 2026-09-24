import type { Metadata } from "next";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { StatCard } from "@/components/civic/stat-card";
import { Container } from "@/components/ui/container";
import { statistics } from "@/data/statistics";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Pagsanjan statistics with sources and years: population, barangays, land area, and classification.",
};

export default function StatisticsPage() {
  return (
    <>
      <PageHero
        eyebrow="Data"
        title="Pagsanjan at a glance"
        description="Every figure on this page carries its source and year. Where official sources disagree, the conflict is shown instead of hidden."
      />
      <Container className="py-10 sm:py-12">
        <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statistics.map((item) => (
            <li key={item.id}>
              <StatCard item={item} />
            </li>
          ))}
        </ul>

        <div className="mt-8 max-w-3xl space-y-4">
          <SourceAttribution
            sourceId="bettergov-psgc-api"
            sourceUrl="https://statistics.bettergov.ph/api/classification/psgc/Q2_2024/municipalities?prv=34&page_size=50"
            lastChecked="September 2026"
            note="PSGC Q2_2024 snapshot mirror of PSA data: census populations (2015, 2020, 2024), 16 barangay codes (0403419001–0403419016), and income classification for Pagsanjan (0403419000). PSA remains the authoritative source — verify against official PSA releases before formal citation."
          />
          <SourceAttribution
            sourceId="psa-psgc"
            sourceUrl="https://psa.gov.ph/classification/psgc/barangays/0403419000"
            lastChecked="September 2026"
            note="Population and barangay figures come from the PSA Philippine Standard Geographic Code and census releases. Note: psa.gov.ph blocks automated access, so some figures were confirmed through search-indexed PSA pages and cross-checked against secondary compilations."
          />
          <SourceAttribution
            sourceId="philatlas-pagsanjan"
            lastChecked="September 2026"
            note="Secondary compilation used for the 2020 census figure and land-area cross-check. Secondary figures are always labeled — they are not treated as authoritative."
          />
        </div>
      </Container>
    </>
  );
}
