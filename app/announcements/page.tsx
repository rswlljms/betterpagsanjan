import type { Metadata } from "next";
import { ExternalLink, Megaphone } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { EmptyState } from "@/components/civic/empty-state";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Container } from "@/components/ui/container";
import { announcements } from "@/data/announcements";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Announcements",
  description:
    "Announcements, advisories, and public notices for Pagsanjan — published only when traceable to an official source.",
};

export default function AnnouncementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Today in Pagsanjan"
        title="Announcements & advisories"
        description="Official announcements, public notices, and advisories that affect Pagsanjan residents."
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
                  Official LGU website
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              }
            />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Planned for this section: municipal announcements, public
              notices, disaster advisories, and community events — each with
              its source and publication date.
            </p>
            <SourceAttribution
              className="mt-6"
              sourceId="pagsanjan-lgu-website"
              note="Official announcements should always be confirmed with the Municipality of Pagsanjan's official channels."
            />
          </div>
        ) : (
          <ul className="max-w-3xl list-none space-y-4">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="rounded-lg border border-line bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
                  {announcement.kind ?? "Announcement"} · {announcement.date}
                </p>
                <h2 className="mt-1 font-semibold text-ink">
                  {announcement.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {announcement.summary}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
