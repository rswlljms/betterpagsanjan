"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, FileText, SearchX } from "lucide-react";
import { EmptyState } from "@/components/civic/empty-state";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TransparencyCategory, TransparencyRecord } from "@/types/civic";

interface TransparencyArea {
  id: TransparencyCategory;
  name: string;
  description: string;
}

interface TransparencyFinderProps {
  areas: TransparencyArea[];
  records: TransparencyRecord[];
  years: string[];
}

/**
 * URL-synced transparency finder: category + year filters.
 * Mirrors the LegislativeFinder pattern so civic search feels familiar.
 * Without active filters every area is shown, including honest empty
 * states for categories with no verified records yet.
 */
export function TransparencyFinder({
  areas,
  records,
  years,
}: TransparencyFinderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [year, setYear] = useState(searchParams.get("year") ?? "");

  useEffect(() => {
    setCategory(searchParams.get("category") ?? "");
    setYear(searchParams.get("year") ?? "");
  }, [searchParams]);

  function applyParams(next: { category: string; year: string }) {
    const params = new URLSearchParams();
    if (next.category) params.set("category", next.category);
    if (next.year) params.set("year", next.year);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function update(next: Partial<{ category: string; year: string }>) {
    const merged = {
      category: next.category ?? category,
      year: next.year ?? year,
    };
    setCategory(merged.category);
    setYear(merged.year);
    applyParams(merged);
  }

  const filtering = category !== "" || year !== "";

  const visibleAreas = useMemo(
    () =>
      areas
        .filter((area) => !category || area.id === category)
        .map((area) => ({
          area,
          records: records.filter(
            (record) =>
              record.category === area.id && (!year || record.year === year),
          ),
        }))
        .filter((group) => !filtering || group.records.length > 0),
    [areas, records, category, year, filtering],
  );

  const matchCount = visibleAreas.reduce(
    (total, group) => total + group.records.length,
    0,
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="text-sm font-medium text-slate-700"
          id="transparency-category-label"
        >
          Category
        </span>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="transparency-category-label"
        >
          {areas.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() =>
                update({ category: category === area.id ? "" : area.id })
              }
              aria-pressed={category === area.id}
              className={cn(
                "min-h-9 rounded-full border px-3.5 text-sm font-medium transition-colors",
                category === area.id
                  ? "border-primary-700 bg-primary-700 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
              )}
            >
              {area.name}
            </button>
          ))}
        </div>
        {years.length > 0 ? (
          <>
            <label
              htmlFor="transparency-year"
              className="ml-2 text-sm font-medium text-slate-700"
            >
              Year
            </label>
            <select
              id="transparency-year"
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
          </>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        {filtering
          ? matchCount === 1
            ? "1 record found"
            : `${matchCount} records found`
          : `${records.length} ${records.length === 1 ? "record" : "records"} across ${areas.length} areas`}
      </p>

      {visibleAreas.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleAreas.map(({ area, records: areaRecords }) => (
            <Card key={area.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText
                    className="size-5 shrink-0 text-primary-700"
                    aria-hidden
                  />
                  {area.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm leading-relaxed text-slate-600">
                  {area.description}
                </p>
                {areaRecords.length === 0 ? (
                  <p className="mt-3 text-xs italic text-muted">
                    Information not yet available
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {areaRecords.map((record) => (
                      <li
                        key={record.id}
                        className="rounded-lg border border-line p-3 text-sm"
                      >
                        <Link
                          href={`/transparency/${record.slug}`}
                          className="font-medium text-ink hover:text-primary-700 hover:underline"
                        >
                          {record.title}
                        </Link>
                        <p className="mt-1 text-xs text-muted">
                          {record.description}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <VerificationBadge
                            verification={record.verification}
                          />
                          {record.year ? (
                            <span className="text-xs text-muted">
                              {record.year}
                            </span>
                          ) : null}
                        </div>
                        {(record.documentUrl ?? record.sourceUrl) ? (
                          <a
                            href={record.documentUrl ?? record.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-700 hover:underline"
                          >
                            Original document
                            <ExternalLink className="size-3.5" aria-hidden />
                          </a>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-4"
          icon={SearchX}
          title="No records match your filters"
          description="Try a different category or year, or clear the filters."
          action={
            <Button
              variant="secondary"
              onClick={() => update({ category: "", year: "" })}
            >
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
