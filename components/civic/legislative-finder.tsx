"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { EmptyState } from "@/components/civic/empty-state";
import { LegislativeCard } from "@/components/civic/legislative-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LegislativeDocument } from "@/types/civic";

interface LegislativeFinderProps {
  documents: LegislativeDocument[];
  years: string[];
  topics: string[];
  documentType: "ordinance" | "resolution";
}

/**
 * URL-synced legislative finder: keyword search + year + topic filters.
 * Mirrors the ServiceFinder pattern so legislative search feels familiar.
 * Works with zero records (honest empty state) and scales when records arrive.
 */
export function LegislativeFinder({
  documents,
  years,
  topics,
  documentType,
}: LegislativeFinderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [year, setYear] = useState(searchParams.get("year") ?? "");
  const [topic, setTopic] = useState(searchParams.get("topic") ?? "");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setYear(searchParams.get("year") ?? "");
    setTopic(searchParams.get("topic") ?? "");
  }, [searchParams]);

  function applyParams(next: { q: string; year: string; topic: string }) {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.year) params.set("year", next.year);
    if (next.topic) params.set("topic", next.topic);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function update(next: Partial<{ q: string; year: string; topic: string }>) {
    const merged = {
      q: next.q ?? query,
      year: next.year ?? year,
      topic: next.topic ?? topic,
    };
    setQuery(merged.q);
    setYear(merged.year);
    setTopic(merged.topic);
    applyParams(merged);
  }

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return documents.filter((doc) => {
      if (year && doc.year !== year) return false;
      if (topic && !(doc.topics ?? []).includes(topic)) return false;
      if (terms.length === 0) return true;
      const haystack = [
        doc.title,
        doc.summary,
        doc.number ?? "",
        ...(doc.topics ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [documents, query, year, topic]);

  const label = documentType === "ordinance" ? "ordinances" : "resolutions";

  // No verified records yet — honest empty state, filters hidden.
  if (documents.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title={`The ${documentType} index is not yet available`}
        description="BetterPagsanjan has not yet collected verified legislative documents for Pagsanjan, and this platform does not invent government records. When the index launches, it will include year, document number, and keyword search — shareable via URL."
      />
    );
  }

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex max-w-xl gap-2"
      >
        <label htmlFor={`${documentType}-search`} className="sr-only">
          Search {label}
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id={`${documentType}-search`}
            type="search"
            value={query}
            onChange={(event) =>
              update({ q: event.target.value })
            }
            placeholder={`Search ${label} by keyword or number…`}
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

      {years.length > 0 || topics.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label
            htmlFor={`${documentType}-year`}
            className="text-sm font-medium text-slate-700"
          >
            Year
          </label>
          <select
            id={`${documentType}-year`}
            value={year}
            onChange={(event) => update({ year: event.target.value })}
            className="min-h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-sm text-slate-900"
          >
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {topics.length > 0 ? (
            <>
              <span className="sr-only" id={`${documentType}-topic-label`}>
                Filter by topic
              </span>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby={`${documentType}-topic-label`}
              >
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update({ topic: topic === t ? "" : t })}
                    aria-pressed={topic === t}
                    className={cn(
                      "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
                      topic === t
                        ? "border-primary-700 bg-primary-700 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      <p aria-live="polite" className="mt-8 text-sm text-muted">
        {filtered.length === 1
          ? `1 ${documentType} found`
          : `${filtered.length} ${label} found`}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2">
          {filtered.map((doc) => (
            <li key={doc.id} className="h-full">
              <LegislativeCard document={doc} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          className="mt-4"
          icon={SearchX}
          title={`No ${label} match your search`}
          description="Try different words or clear the filters."
          action={
            <Button
              variant="secondary"
              onClick={() => update({ q: "", year: "", topic: "" })}
            >
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
