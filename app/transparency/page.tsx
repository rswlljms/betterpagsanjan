import type { Metadata } from "next";
import {
  BarChart3,
  FileSearch,
  FileText,
  Landmark,
  Receipt,
} from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "Budget, procurement, projects, and public document information for Pagsanjan — as it becomes verifiable from official sources.",
};

const areas = [
  {
    icon: Landmark,
    title: "Budget",
    description:
      "Annual budgets, appropriations, and financial summaries once published in verifiable form.",
  },
  {
    icon: Receipt,
    title: "Procurement",
    description:
      "Biddings, awards, and contract information from official procurement channels.",
  },
  {
    icon: BarChart3,
    title: "Financial information",
    description:
      "Reports and financial statements released by the local government.",
  },
  {
    icon: FileText,
    title: "Public documents",
    description:
      "Development plans, reports, and other public documents with their sources.",
  },
  {
    icon: FileSearch,
    title: "Open data",
    description:
      "Reusable civic datasets for researchers, journalists, and developers.",
  },
];

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Transparency"
        description="Making Pagsanjan's public financial and document records easier to find and understand. This section grows only as verifiable official records are found — figures are never estimated or invented."
      />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <Card key={area.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <area.icon
                    className="size-5 shrink-0 text-primary-700"
                    aria-hidden
                  />
                  {area.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-slate-600">
                  {area.description}
                </p>
                <p className="mt-3 text-xs italic text-muted">
                  Information not yet available
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          BetterPagsanjan is an independent project. Transparency records will
          always link to the original official document, with the publication
          date and the date BetterPagsanjan last checked it. Nothing in this
          section is created by BetterPagsanjan.
        </p>

        <SourceAttribution
          className="mt-6 max-w-3xl"
          sourceId="betterpagsanjan"
          note="Section planning documented by the BetterPagsanjan project."
        />
      </Container>
    </>
  );
}
