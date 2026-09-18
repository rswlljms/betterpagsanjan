import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/civic/breadcrumbs";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  consultationStatusLabels,
  getConsultationBySlug,
  getConsultationStatus,
  consultations,
} from "@/data/consultations";

interface ConsultationPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return consultations.map((consultation) => ({ slug: consultation.slug }));
}

export async function generateMetadata({
  params,
}: ConsultationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const consultation = getConsultationBySlug(slug);
  if (!consultation) return {};
  return {
    title: consultation.topic,
    description: consultation.description,
  };
}

export default async function ConsultationPage({
  params,
}: ConsultationPageProps) {
  const { slug } = await params;
  const consultation = getConsultationBySlug(slug);
  if (!consultation) notFound();

  const status = getConsultationStatus(consultation);

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Consultations", href: "/consultations" },
          { label: consultation.topic },
        ]}
      />
      <div className="mt-6 max-w-3xl">
        {status ? (
          <Badge variant="primary">{consultationStatusLabels[status]}</Badge>
        ) : (
          <Badge variant="outline">Dates not published</Badge>
        )}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {consultation.topic}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <VerificationBadge verification={consultation.verification} />
          {consultation.lastChecked ? (
            <span>Last checked: {consultation.lastChecked}</span>
          ) : null}
        </div>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          {consultation.description}
        </p>

        <p className="mt-6 rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-slate-600">
          BetterPagsanjan provides information{" "}
          <strong className="font-semibold text-ink">about</strong> this
          consultation. It is not the official government consultation system —
          follow the official document and participation steps below to take
          part through the responsible office.
        </p>

        <dl className="mt-6 divide-y divide-line rounded-lg border border-line text-sm">
          <div className="flex gap-3 px-4 py-3">
            <dt className="w-36 shrink-0 font-medium text-slate-900">
              Opening date
            </dt>
            <dd className="text-slate-700">
              {consultation.opensAt ?? "Information not yet available."}
            </dd>
          </div>
          <div className="flex gap-3 px-4 py-3">
            <dt className="w-36 shrink-0 font-medium text-slate-900">
              Closing date
            </dt>
            <dd className="text-slate-700">
              {consultation.closesAt ?? "Information not yet available."}
            </dd>
          </div>
        </dl>

        {consultation.howToParticipate &&
        consultation.howToParticipate.length > 0 ? (
          <section aria-labelledby="participate-heading" className="mt-8">
            <h2
              id="participate-heading"
              className="text-lg font-semibold text-ink"
            >
              How to participate
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
              {consultation.howToParticipate.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ) : null}

        {(consultation.documentUrl ?? consultation.sourceUrl) ? (
          <p className="mt-6">
            <a
              href={consultation.documentUrl ?? consultation.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
            >
              View official consultation document
              <ExternalLink className="size-4" aria-hidden />
            </a>
          </p>
        ) : null}
        <SourceAttribution
          className="mt-6"
          sourceId={consultation.verification.sourceId}
          sourceUrl={
            consultation.verification.sourceUrl ?? consultation.sourceUrl
          }
          lastChecked={consultation.lastChecked}
          note={consultation.verification.note}
        />
      </div>
    </Container>
  );
}
