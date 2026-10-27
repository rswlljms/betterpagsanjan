"use client";

import { useEffect, useState } from "react";
import { ExternalLink, TriangleAlert } from "lucide-react";
import { formatMonthYear } from "@/lib/format";

interface AnnouncementFreshnessProps {
  /** ISO date of the newest reviewed announcement. */
  reviewedAt: string;
  /** Number of days after which the reviewed set is considered stale. */
  staleAfterDays: number;
  /** Official news feed to check for newer posts. */
  officialUrl: string;
}

const DAY_MS = 86_400_000;

function daysSince(reviewedAt: string, now: number): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(reviewedAt);
  if (!match) return null;

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue);
  const day = Number(dayValue);
  const reviewed = Date.UTC(year, month - 1, day);
  const reviewedDate = new Date(reviewed);

  if (
    reviewedDate.getUTCFullYear() !== year ||
    reviewedDate.getUTCMonth() !== month - 1 ||
    reviewedDate.getUTCDate() !== day
  ) {
    return null;
  }

  // Compare calendar dates in the visitor's timezone so "days ago" matches
  // the date shown on the page. The review dates are calendar dates, not
  // timestamps.
  const current = new Date(now);
  const today = Date.UTC(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
  );

  return Math.floor((today - reviewed) / DAY_MS);
}

/**
 * Client-side freshness warning (AGENTS.md §30). The page is statically
 * generated, so the age is computed in the browser after hydration; this
 * avoids freezing the build date into the page and avoids hydration
 * mismatches. The warning is informational — the reviewed summaries remain
 * visible and link to their sources.
 */
export function AnnouncementFreshness({
  reviewedAt,
  staleAfterDays,
  officialUrl,
}: AnnouncementFreshnessProps) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(daysSince(reviewedAt, Date.now()));
  }, [reviewedAt]);

  if (days === null || days <= staleAfterDays) return null;

  return (
    <div
      role="note"
      className="mb-4 max-w-3xl rounded-lg border border-amber-300 bg-amber-50 p-4"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
        <TriangleAlert className="size-4 shrink-0" aria-hidden />
        These summaries may be out of date
      </p>
      <p className="mt-1 text-sm leading-relaxed text-amber-900">
        The newest summary was reviewed {days} days ago (
        {formatMonthYear(reviewedAt)}). Check the official municipal news feed
        for newer posts.
      </p>
      <a
        href={officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-950 underline underline-offset-2 hover:no-underline"
      >
        Official municipal news feed
        <ExternalLink className="size-4" aria-hidden />
      </a>
    </div>
  );
}
