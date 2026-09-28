"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { EmptyState } from "@/components/civic/empty-state";
import { ProjectCard } from "@/components/civic/project-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projectStatusLabels } from "@/data/projects/projects";
import type { ProjectStatus, PublicProject } from "@/types/civic";

type Dataset = "appropriations" | "implementations";

interface ProjectFinderProps {
  appropriations: PublicProject[];
  implementations: PublicProject[];
}

const statusOrder: ProjectStatus[] = [
  "proposed",
  "planned",
  "ongoing",
  "completed",
  "delayed",
  "cancelled",
];

const datasetLabels: Record<Dataset, string> = {
  appropriations: "Appropriations",
  implementations: "Implementation records",
};

/**
 * URL-synced project finder: keyword search + dataset + status filters.
 * Mirrors the LegislativeFinder pattern so civic search feels familiar.
 * Appropriations (funding authorized) and implementation records
 * (contracts as published) stay in separate sections — never mixed —
 * because they answer different citizen questions.
 */
export function ProjectFinder({
  appropriations,
  implementations,
}: ProjectFinderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [dataset, setDataset] = useState(searchParams.get("dataset") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setDataset(searchParams.get("dataset") ?? "");
    setStatus(searchParams.get("status") ?? "");
  }, [searchParams]);

  function applyParams(next: { q: string; dataset: string; status: string }) {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.dataset) params.set("dataset", next.dataset);
    if (next.status) params.set("status", next.status);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function update(
    next: Partial<{ q: string; dataset: string; status: string }>,
  ) {
    const merged = {
      q: next.q ?? query,
      dataset: next.dataset ?? dataset,
      status: next.status ?? status,
    };
    setQuery(merged.q);
    setDataset(merged.dataset);
    setStatus(merged.status);
    applyParams(merged);
  }

  const availableStatuses = useMemo(() => {
    const present = new Set<ProjectStatus>();
    for (const project of [...appropriations, ...implementations]) {
      present.add(project.status);
    }
    return statusOrder.filter((s) => present.has(s));
  }, [appropriations, implementations]);

  const matchProject = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return (project: PublicProject) => {
      if (status && project.status !== status) return false;
      if (terms.length === 0) return true;
      const haystack = [
        project.displayName ?? "",
        project.name,
        project.location ?? "",
        project.description,
        project.implementingOffice ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    };
  }, [query, status]);

  const matchedAppropriations = useMemo(
    () => appropriations.filter(matchProject),
    [appropriations, matchProject],
  );
  const matchedImplementations = useMemo(
    () => implementations.filter(matchProject),
    [implementations, matchProject],
  );

  const showAppropriations = !dataset || dataset === "appropriations";
  const showImplementations = !dataset || dataset === "implementations";
  const total =
    (showAppropriations ? matchedAppropriations.length : 0) +
    (showImplementations ? matchedImplementations.length : 0);

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex max-w-xl gap-2"
      >
        <label htmlFor="project-search" className="sr-only">
          Search projects
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="Search projects by name or barangay…"
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 text-sm text-slate-900 placeholder:text-muted focus:border-primary-500"
          />
          {query ? (
            <button
              type="button"
              onClick={() => update({ q: "" })}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>
        <Button type="submit" tabIndex={-1}>
          Search
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className="text-sm font-medium text-slate-700"
          id="project-dataset-label"
        >
          Records
        </span>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="project-dataset-label"
        >
          {(Object.keys(datasetLabels) as Dataset[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => update({ dataset: dataset === d ? "" : d })}
              aria-pressed={dataset === d}
              className={cn(
                "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
                dataset === d
                  ? "border-primary-700 bg-primary-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
              )}
            >
              {datasetLabels[d]}
            </button>
          ))}
        </div>
        {availableStatuses.length > 0 ? (
          <>
            <span
              className="ml-2 text-sm font-medium text-slate-700"
              id="project-status-label"
            >
              Status
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-labelledby="project-status-label"
            >
              {availableStatuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => update({ status: status === s ? "" : s })}
                  aria-pressed={status === s}
                  className={cn(
                    "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
                    status === s
                      ? "border-primary-700 bg-primary-700 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                  )}
                >
                  {projectStatusLabels[s]}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-muted">
        {total === 1 ? "1 project found" : `${total} projects found`}
      </p>

      {total > 0 ? (
        <>
          {showAppropriations && matchedAppropriations.length > 0 ? (
            <section aria-label="National appropriations" className="mt-4">
              <h2 className="mb-3 text-xl font-bold tracking-tight text-ink">
                National appropriations in Pagsanjan
              </h2>
              <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matchedAppropriations.map((project) => (
                  <li key={project.id} className="h-full">
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showImplementations && matchedImplementations.length > 0 ? (
            <section aria-label="DPWH implementation records" className="mt-12">
              <h2 className="mb-3 text-xl font-bold tracking-tight text-ink">
                DPWH implementation records in Pagsanjan
              </h2>
              <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {matchedImplementations.map((project) => (
                  <li key={project.id} className="h-full">
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </>
      ) : (
        <EmptyState
          className="mt-4"
          icon={SearchX}
          title="No projects match your search"
          description="Try different words or clear the filters."
          action={
            <Button
              variant="secondary"
              onClick={() => update({ q: "", dataset: "", status: "" })}
            >
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
