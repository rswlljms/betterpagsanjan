import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, MessagesSquare } from "lucide-react";
import { PageHero } from "@/components/civic/page-hero";
import { EmptyState } from "@/components/civic/empty-state";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  consultationStatusLabels,
  consultations,
  getConsultationStatus,
} from "@/data/consultations";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Public consultations",
  description:
    "Public consultations affecting Pagsanjan — listed only when traceable to an official government notice, with dates, documents, and how to participate.",
};

const statusValues = Object.values(consultationStatusLabels);

export default function ConsultationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Civic participation"
        title="Public consultations"
        description="Draft ordinances, public notices, and community consultations that affect Pagsanjan — with opening dates, official documents, and how to participate through official channels."
      />
      <Container className="py-10 sm:py-12">
        <p className="mb-8 max-w-3xl rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-slate-600">
          BetterPagsanjan provides information{" "}
          <strong className="font-semibold text-ink">about</strong> a
          consultation. It is not the official government consultation system —
          participation always happens through the official channel listed on
          each record.
        </p>

        {consultations.length === 0 ? (
          <div className="max-w-2xl">
            <EmptyState
              icon={MessagesSquare}
              title="No consultations listed yet"
              description="When a consultation is announced through an official government notice — with its topic, dates, document, and participation instructions — it will appear here with its source. Nothing unverifiable is posted here."
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
            <SourceAttribution
              className="mt-6"
              sourceId="pagsanjan-lgu-website"
              note="Consultation notices should always be confirmed with the Municipality of Pagsanjan's official channels."
            />
          </div>
        ) : (
          <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultations.map((consultation) => {
              const status = getConsultationStatus(consultation);
              return (
                <li key={consultation.id} className="h-full">
                  <article className="flex h-full flex-col rounded-lg border border-line bg-white p-5">
                    {status ? (
                      <Badge variant="primary" className="self-start">
                        {consultationStatusLabels[status]}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="self-start">
                        Dates not published
                      </Badge>
                    )}
                    <h2 className="mt-3 font-semibold text-ink">
                      <Link
                        href={`/consultations/${consultation.slug}`}
                        className="hover:underline"
                      >
                        {consultation.topic}
                      </Link>
                    </h2>
                    <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {consultation.description}
                    </p>
                    <p className="mt-3 text-xs text-muted">
                      {consultation.opensAt ?? "Opening date not published"}
                      {" → "}
                      {consultation.closesAt ?? "Closing date not published"}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 max-w-2xl rounded-lg border border-line bg-surface p-4 text-sm">
          <p className="font-semibold text-ink">
            Consultation record structure
          </p>
          <p className="mt-1 leading-relaxed text-slate-600">
            Topic · Description · Opening date · Closing date · Official
            document · How to participate · Source · Last checked
          </p>
          <p className="mt-3 font-semibold text-ink">Status values</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {statusValues.map((status) => (
              <Badge key={status} variant="outline">
                {status}
              </Badge>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
