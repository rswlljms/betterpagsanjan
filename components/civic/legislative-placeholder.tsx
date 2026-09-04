import { Gavel } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { EmptyState } from "@/components/civic/empty-state";
import { Container } from "@/components/ui/container";

interface LegislativePlaceholderProps {
  documentType: "ordinance" | "resolution";
}

/**
 * Honest placeholder for the legislative index (AGENTS.md §23). The index
 * is built in Phase 2 — no document records are invented meanwhile.
 */
export function LegislativePlaceholder({
  documentType,
}: LegislativePlaceholderProps) {
  const title = documentType === "ordinance" ? "Ordinances" : "Resolutions";
  const longName =
    documentType === "ordinance"
      ? "municipal ordinances"
      : "municipal resolutions";

  return (
    <>
      <PageHero
        eyebrow="Legislative"
        title={title}
        description={`A searchable public index of Pagsanjan ${longName} passed by the Sangguniang Bayan — with document numbers, dates, and sources.`}
      />
      <Container className="py-10 sm:py-12">
        <EmptyState
          className="max-w-2xl"
          icon={Gavel}
          title={`The ${documentType} index is not yet available`}
          description="BetterPagsanjan has not yet collected verified legislative documents for Pagsanjan, and this platform does not invent government records. When the index launches, it will include year, document type, document number, and keyword search."
        />
        <div className="mt-6 max-w-2xl rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-slate-600">
          <p className="font-semibold text-ink">Planned filters</p>
          <p className="mt-1">
            Year · Document type · Document number · Keyword · Topic
          </p>
        </div>
      </Container>
    </>
  );
}
