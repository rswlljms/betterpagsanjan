import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/civic/breadcrumbs";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  getProjectBySlug,
  projectStatusLabels,
  projects,
} from "@/data/projects/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />
      <div className="mt-6 max-w-3xl">
        <Badge variant="primary">
          {projectStatusLabels[project.status]}
        </Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {project.displayName ?? project.name}
        </h1>
        {project.displayName ? (
          <p className="mt-3 rounded-lg border border-line bg-surface p-3 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-slate-700">
              Official name in the FY2026 GAA:{" "}
            </span>
            {project.name}
          </p>
        ) : null}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <VerificationBadge verification={project.verification} />
          {project.lastChecked ? (
            <span>Last checked: {project.lastChecked}</span>
          ) : null}
        </div>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          {project.description}
        </p>

        <dl className="mt-8 divide-y divide-line rounded-lg border border-line text-sm">
          {project.location ? (
            <div className="flex gap-3 px-4 py-3">
              <dt className="flex w-36 shrink-0 items-start gap-1.5 font-medium text-slate-900">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                Location
              </dt>
              <dd className="text-slate-700">{project.location}</dd>
            </div>
          ) : null}
          {project.implementingOffice ? (
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-36 shrink-0 font-medium text-slate-900">
                Implementing office
              </dt>
              <dd className="text-slate-700">{project.implementingOffice}</dd>
            </div>
          ) : null}
          {project.budget ? (
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-36 shrink-0 font-medium text-slate-900">
                Budget
              </dt>
              <dd className="text-slate-700">{project.budget}</dd>
            </div>
          ) : null}
          {project.startDate ? (
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-36 shrink-0 font-medium text-slate-900">
                Start date
              </dt>
              <dd className="text-slate-700">{project.startDate}</dd>
            </div>
          ) : null}
          {project.targetCompletion ? (
            <div className="flex gap-3 px-4 py-3">
              <dt className="w-36 shrink-0 font-medium text-slate-900">
                Target completion
              </dt>
              <dd className="text-slate-700">{project.targetCompletion}</dd>
            </div>
          ) : null}
        </dl>

        {project.sourceUrl ? (
          <p className="mt-6">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
            >
              View official source record
              <ExternalLink className="size-4" aria-hidden />
            </a>
          </p>
        ) : null}
        <SourceAttribution
          className="mt-6"
          sourceId={project.verification.sourceId}
          sourceUrl={project.verification.sourceUrl ?? project.sourceUrl}
          lastChecked={project.lastChecked}
          note={project.verification.note}
        />
      </div>
    </Container>
  );
}
