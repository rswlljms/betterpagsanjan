import type { Metadata } from "next";
import { ExternalLink, HardHat } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { ProjectCard } from "@/components/civic/project-card";
import { EmptyState } from "@/components/civic/empty-state";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  formatPeso,
  PROJECTS_FY2026_TOTAL,
  projectStatusLabels,
  projects,
} from "@/data/projects/projects";

export const metadata: Metadata = {
  title: "Public projects",
  description:
    "Public project directory for Pagsanjan with verifiable status information — built only from official records.",
};

const statusValues = Object.values(projectStatusLabels);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Public projects"
        description="A directory of public projects in Pagsanjan — location, implementing office, budget, and status, each traceable to an official record. BetterPagsanjan never assigns a project status without supporting information."
      />
      <Container className="py-10 sm:py-12">
        {projects.length === 0 ? (
          <EmptyState
            className="max-w-2xl"
            icon={HardHat}
            title="No verified projects listed yet"
            description="When verifiable project records are available — from official announcements, procurement data, or government reports — they will appear here with their source."
          />
        ) : (
          <>
            <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
              Showing {projects.length} national-government (DPWH) projects in
              Pagsanjan funded under the FY2026 General Appropriations Act,
              totaling{" "}
              <strong className="font-semibold text-ink">
                {formatPeso(PROJECTS_FY2026_TOTAL)}
              </strong>
              . These are appropriation records — funding authorized, not
              completion reports — and are not municipal budget figures. Browse
              the source data on the{" "}
              <a
                href="https://budget.bettergov.ph/gaa/2026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary-700 hover:underline"
              >
                BetterGov.PH FY2026 budget browser
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              .
            </p>
            <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted">
              Road project names use DPWH station codes — for example,{" "}
              <span className="font-mono text-xs">K0095 + 949</span> means
              kilometer 95.949 along the route. Card titles simplify these
              codes; each detail page keeps the official name exactly as
              published in the budget.
            </p>
            <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.id} className="h-full">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-8 max-w-2xl rounded-lg border border-line bg-surface p-4 text-sm">
          <p className="font-semibold text-ink">Project record structure</p>
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
