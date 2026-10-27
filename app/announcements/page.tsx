import type { Metadata } from "next";
import { ExternalLink, Megaphone } from "lucide-react";
import { AnnouncementFreshness } from "@/components/civic/announcement-freshness";
import { PageHero } from "@/components/civic/page-hero";
import { EmptyState } from "@/components/civic/empty-state";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Container } from "@/components/ui/container";
import {
  ANNOUNCEMENT_STALE_AFTER_DAYS,
  announcements,
} from "@/data/announcements";
import { site } from "@/data/site";
import { formatMonthYear } from "@/lib/format";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Reviewed summaries of announcements, advisories, and public notices for Pagsanjan, with links to their official sources.",
};

export default function AnnouncementsPage() {
  const newestReviewedAt = announcements.reduce<string | undefined>(
    (newest, announcement) =>
      !newest || announcement.lastChecked > newest
        ? announcement.lastChecked
        : newest,
    undefined,
  );

  return (
    <>
      <PageHero
        eyebrow="Today in Pagsanjan"
        title="Announcements & advisories"
        description="BetterPagsanjan summaries of municipal news, announcements, and advisories, with links to the original sources. Dates below are publication dates, not event schedules."
      />
      <Container className="py-10 sm:py-12">
        {announcements.length === 0 ? (
          <div className="max-w-2xl">
            <EmptyState
              icon={Megaphone}
              title="No announcements published yet"
              description="BetterPagsanjan only lists announcements that can be traced to an official government source, with their publication date. Nothing unverifiable is posted here."
              action={
                <a
                  href={site.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Official municipal news feed
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              }
            />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Planned for this section: municipal announcements, public notices,
              disaster advisories, and community events — each with its source
              and publication date.
            </p>
            <SourceAttribution
              className="mt-6"
              sourceId="pagsanjan-legislative-portal"
              lastChecked="October 27, 2026"
              note="Official announcements should always be confirmed with the Municipality of Pagsanjan's official channels."
            />
          </div>
        ) : (
          <>
            <div className="mb-4 flex max-w-3xl flex-col gap-3 rounded-lg border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed text-slate-600">
                Newest review:{" "}
                {newestReviewedAt ? (
                  <>
                    <time
                      dateTime={newestReviewedAt}
                      className="font-medium text-ink"
                    >
                      {formatMonthYear(newestReviewedAt)}
                    </time>
                    . The official feed may have newer posts.
                  </>
                ) : (
                  "Information not yet available."
                )}
              </p>
              <a
                href={site.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-link hover:underline"
              >
                Official municipal news feed
                <ExternalLink className="size-4" aria-hidden />
              </a>
            </div>
            {newestReviewedAt ? (
              <AnnouncementFreshness
                reviewedAt={newestReviewedAt}
                staleAfterDays={ANNOUNCEMENT_STALE_AFTER_DAYS}
                officialUrl={site.officialWebsite}
              />
            ) : null}
            <ul className="max-w-3xl list-none space-y-4">
              {announcements.map((announcement) => (
                <li
                  key={announcement.id}
                  id={announcement.id}
                  className="scroll-mt-32 rounded-lg border border-line bg-white p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                    {announcement.kind ?? "Announcement"} · Published{" "}
                    <time dateTime={announcement.date}>
                      {formatMonthYear(announcement.date)}
                    </time>
                  </p>
                  <h2 className="mt-1 font-semibold text-ink">
                    {announcement.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {announcement.summary}
                  </p>
                  <SourceAttribution
                    className="mt-4"
                    sourceId={announcement.sourceId}
                    sourceUrl={announcement.sourceUrl}
                    lastChecked={formatMonthYear(announcement.lastChecked)}
                    note="Summary by BetterPagsanjan. Follow the source link to read the original municipal post."
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </>
  );
}
