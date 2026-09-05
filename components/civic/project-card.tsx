import Link from "next/link";
import { MapPin } from "lucide-react";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { projectStatusLabels } from "@/data/projects/projects";
import type { PublicProject } from "@/types/civic";

const statusVariant: Record<PublicProject["status"], "primary" | "success" | "warning" | "neutral" | "danger" | "outline"> = {
  proposed: "neutral",
  planned: "primary",
  ongoing: "warning",
  completed: "success",
  delayed: "danger",
  cancelled: "outline",
};

export function ProjectCard({ project }: { project: PublicProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/40"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={statusVariant[project.status]}>
          {projectStatusLabels[project.status]}
        </Badge>
      </div>
      <h3 className="mt-3 font-semibold leading-snug text-ink">
        {project.displayName ?? project.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3 text-xs text-muted">
        {project.location ? (
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden />
            {project.location}
          </span>
        ) : null}
        <VerificationBadge verification={project.verification} />
      </div>
    </Link>
  );
}
