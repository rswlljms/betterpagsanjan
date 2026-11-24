import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getSource } from "@/data/sources";
import { formatMonthYear } from "@/lib/format";
import type { Announcement } from "@/types/civic";

const kindLabels: Record<NonNullable<Announcement["kind"]>, string> = {
  announcement: "Government announcement",
  advisory: "Public advisory",
  notice: "Public notice",
  event: "Community event",
  news: "Municipal news",
};

/**
 * Card for the latest reviewed announcements. Every card links to the
 * BetterPagsanjan summary, where the official source and last-checked date
 * are shown; the footer names the source organization so the summary is
 * never mistaken for an official post.
 */
export function AnnouncementCard({
  announcement,
}: {
  announcement: Announcement;
}) {
  const source = getSource(announcement.sourceId);
  const kindLabel = announcement.kind ? kindLabels[announcement.kind] : null;

  return (
    <Link
      href={`/announcements#${announcement.id}`}
      className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-bp-sm-4 transition hover:shadow-bp-sm"
    >
      <div className="pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="primary">
            {announcement.category ?? kindLabel ?? "Announcement"}
          </Badge>
          <span className="text-xs text-muted">
            Published{" "}
            <time dateTime={announcement.date}>
              {formatMonthYear(announcement.date)}
            </time>
          </span>
        </div>
        <h3 className="font-display mt-3 line-clamp-2 font-semibold leading-snug tracking-[0.2px] text-ink">
          {announcement.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-bp-graphite">
          {announcement.summary}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3 text-xs">
        <span className="inline-flex min-w-0 items-center gap-1.5 text-muted">
          <Building2 className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">
            {source?.organization ?? "Official government source"}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-link">
          Read details
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
