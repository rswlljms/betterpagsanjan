import type { Metadata } from "next";
import { HardHat } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { EmptyState } from "@/components/civic/empty-state";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Public projects",
  description:
    "Public project directory for Pagsanjan with verifiable status information — built only from official records.",
};

const statusValues = [
  "Proposed",
  "Planned",
  "Ongoing",
  "Completed",
  "Delayed",
  "Cancelled",
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Public projects"
        description="A directory of public projects in Pagsanjan — location, implementing office, budget, and status, each traceable to an official record."
      />
      <Container className="py-10 sm:py-12">
        <EmptyState
          className="max-w-2xl"
          icon={HardHat}
          title="No verified projects listed yet"
          description="BetterPagsanjan never assigns a project status without supporting information. When verifiable project records are available — from official announcements, procurement data, or government reports — they will appear here with their source."
        />

        <div className="mt-8 max-w-2xl rounded-lg border border-line bg-surface p-4 text-sm">
          <p className="font-semibold text-ink">Planned project record</p>
          <p className="mt-1 leading-relaxed text-slate-600">
            Project name · Location · Implementing office · Status · Budget ·
            Start date · Target completion · Source · Last checked
          </p>
          <p className="mt-3 font-semibold text-ink">Status values</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {statusValues.map((status) => (
              <Badge key={status} variant="outline">
                {status}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
