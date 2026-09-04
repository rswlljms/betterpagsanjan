"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, SearchX } from "lucide-react";
import { EmptyState } from "@/components/civic/empty-state";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { searchRecords, type SearchRecord, type SearchResultType } from "@/lib/search";

interface SiteSearchProps {
  records: SearchRecord[];
}

const typeFilters: { id: SearchResultType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "service", label: "Services" },
  { id: "office", label: "Offices" },
  { id: "barangay", label: "Barangays" },
  { id: "page", label: "Pages" },
];

const typeBadgeVariant: Record<SearchResultType, BadgeVariant> = {
  service: "primary",
  office: "accent",
  barangay: "success",
  page: "neutral",
};

const typeLabel: Record<SearchResultType, string> = {
  service: "Service",
  office: "Office",
  barangay: "Barangay",
  page: "Page",
};

const popularSearches = [
  "Business permit",
  "Barangay clearance",
  "Birth certificate",
  "Real property tax",
  "Emergency",
];

/**
 * Site-wide search over the static civic index. Query is synced to
 * ?q= so results are shareable.
 */
export function SiteSearch({ records }: SiteSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [type, setType] = useState<SearchResultType | "all">("all");

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  function applyParams(nextQuery: string) {
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const results = useMemo(() => {
    const matched = searchRecords(records, query);
    return type === "all"
      ? matched
      : matched.filter((record) => record.type === type);
  }, [records, query, type]);

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex max-w-xl gap-2"
      >
        <label htmlFor="site-search" className="sr-only">
          Search BetterPagsanjan
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              applyParams(event.target.value);
            }}
            placeholder="Search services, offices, barangays…"
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 text-sm text-slate-900 placeholder:text-muted focus:border-primary-500"
          />
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        {typeFilters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setType(filter.id)}
            aria-pressed={type === filter.id}
            className={cn(
              "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
              type === filter.id
                ? "border-primary-700 bg-primary-700 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {query.trim() === "" ? (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-ink">Popular searches</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => {
                  setQuery(term);
                  applyParams(term);
                }}
                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:border-primary-300 hover:text-primary-800"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : results.length > 0 ? (
        <>
          <p aria-live="polite" className="mt-8 text-sm text-muted">
            {results.length === 1
              ? "1 result"
              : `${results.length} results`}{" "}
            for “{query.trim()}”
          </p>
          <ul className="mt-4 max-w-3xl list-none space-y-3">
            {results.map((record) => (
              <li key={record.id}>
                <Link
                  href={record.href}
                  className="group flex flex-col gap-1.5 rounded-lg border border-line bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/40 sm:flex-row sm:items-start sm:gap-4"
                >
                  <span className="shrink-0 pt-0.5">
                    <Badge variant={typeBadgeVariant[record.type]}>
                      {record.badge ?? typeLabel[record.type]}
                    </Badge>
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 font-semibold text-ink">
                      {record.title}
                      <ArrowRight
                        className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-slate-600">
                      {record.description}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <EmptyState
          className="mt-8"
          icon={SearchX}
          title={`No results for “${query.trim()}”`}
          description="Try a different term — for example the name of a service, office, or barangay."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                applyParams("");
              }}
              className="min-h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Clear search
            </button>
          }
        />
      )}
    </div>
  );
}
