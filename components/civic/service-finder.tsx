"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import { EmptyState } from "@/components/civic/empty-state";
import { ServiceCard } from "@/components/civic/service-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GovernmentService, ServiceCategory } from "@/types/civic";

interface ServiceFinderProps {
  services: GovernmentService[];
  categories: ServiceCategory[];
}

/**
 * Client-side service finder: filters services by query and category and
 * keeps the URL shareable via ?q= and ?category= (pattern borrowed from
 * the reference projects' URL-synced search).
 */
export function ServiceFinder({ services, categories }: ServiceFinderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(
    searchParams.get("category") ?? "",
  );

  // Keep local state in sync when the URL changes (e.g. back/forward).
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    setCategory(searchParams.get("category") ?? "");
  }, [searchParams]);

  function applyParams(next: { q?: string; category?: string }) {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.category) params.set("category", next.category);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function onQueryChange(value: string) {
    setQuery(value);
    applyParams({ q: value, category });
  }

  function onCategoryChange(value: string) {
    setCategory(value);
    applyParams({ q: query, category: value });
  }

  const filtered = useMemo(() => {
    const terms = query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return services.filter((service) => {
      if (category && service.category !== category) return false;
      if (terms.length === 0) return true;
      const haystack = [
        service.title,
        service.description,
        service.office?.name ?? "",
        ...(service.aliases ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [services, query, category]);

  const hasFilters = query.trim() !== "" || category !== "";

  return (
    <div>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex max-w-xl gap-2"
      >
        <label htmlFor="service-search" className="sr-only">
          Search services
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search services, e.g. business permit…"
            className="min-h-11 w-full rounded-lg border border-line bg-white pl-9 pr-9 text-sm text-ink placeholder:text-bp-stone"
          />
          {query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-bp-paper hover:text-bp-graphite"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>
        <Button type="submit" tabIndex={-1}>
          Search
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          aria-pressed={category === ""}
          className={cn(
            "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
            category === ""
              ? "border-bp-ink bg-bp-ink text-white"
              : "border-line bg-white text-bp-graphite hover:border-bp-stone",
          )}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onCategoryChange(item.id === category ? "" : item.id)}
            aria-pressed={category === item.id}
            className={cn(
              "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
              category === item.id
                ? "border-bp-ink bg-bp-ink text-white"
                : "border-line bg-white text-bp-graphite hover:border-bp-stone",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="mt-8 text-sm text-muted">
        {filtered.length === 1
          ? "1 service found"
          : `${filtered.length} services found`}
        {hasFilters ? "" : ` · ${services.length} listed`}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-4 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <li key={service.id} className="h-full">
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          className="mt-4"
          icon={SearchX}
          title="No services match your search"
          description="Try different words, clear the category filter, or browse the full list of services."
          action={
            <Button variant="secondary" onClick={() => { onQueryChange(""); onCategoryChange(""); }}>
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
