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
  { id: "legislative", label: "Legislative" },
  { id: "project", label: "Projects" },
  { id: "transparency", label: "Transparency" },
  { id: "location", label: "Locations" },
  { id: "page", label: "Pages" },
];

const typeBadgeVariant: Record<SearchResultType, BadgeVariant> = {
  service: "primary",
  office: "accent",
  barangay: "success",
  legislative: "primary",
  project: "warning",
  transparency: "neutral",
  location: "success",
  page: "neutral",
};

const typeLabel: Record<SearchResultType, string> = {
  service: "Service",
  office: "Office",
  barangay: "Barangay",
  legislative: "Legislative",
  project: "Project",
  transparency: "Transparency",
  location: "Location",
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
            className="min-h-11 w-full rounded-lg border border-line bg-white pl-9 pr-4 text-sm text-ink placeholder:text-bp-stone"
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
                ? "border-bp-ink bg-bp-ink text-white"
                : "border-line bg-white text-bp-graphite hover:border-bp-stone",
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
                className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-bp-graphite hover:border-bp-stone hover:text-bp-ink"
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
                  className="group flex flex-col gap-1.5 rounded-xl bg-white p-4 shadow-bp-sm-4 transition hover:shadow-bp-sm sm:flex-row sm:items-start sm:gap-4"
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
                        className="size-4 shrink-0 text-bp-stone transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-sm leading-relaxed text-bp-graphite">
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
              className="min-h-11 rounded-full border border-line bg-white px-6 text-sm font-semibold text-bp-graphite hover:border-bp-stone hover:text-bp-ink"
            >
              Clear search
            </button>
          }
        />
      )}
    </div>
  );
}
