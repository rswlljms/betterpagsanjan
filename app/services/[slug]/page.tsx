import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, ExternalLink, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/civic/breadcrumbs";
import { ServiceCard } from "@/components/civic/service-card";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { VerificationNotice } from "@/components/civic/verification-notice";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getServiceBySlug, getServiceCategory, services } from "@/data/services";
import { site } from "@/data/site";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

const sectionTitleClass = "text-lg font-semibold text-ink";

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const category = getServiceCategory(service.category);
  const related = services
    .filter(
      (candidate) =>
        candidate.category === service.category && candidate.id !== service.id,
    )
    .slice(0, 3);

  const hasProcedureDetails = Boolean(
    service.eligibility ||
      service.requirements ||
      service.steps ||
      service.fees ||
      service.processingTime,
  );

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <div className="mt-6 max-w-3xl">
        {category ? <Badge variant="primary">{category.name}</Badge> : null}
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {service.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <VerificationBadge verification={service.verification} />
          {service.lastChecked ? (
            <span>Last checked: {service.lastChecked}</span>
          ) : null}
        </div>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          {service.description}
        </p>
      </div>

      {service.verification.status === "pending" ? (
        <div className="mt-6 max-w-3xl">
          <VerificationNotice>
            This page currently provides general information only.
            Requirements, fees, steps, processing times, and office contact
            details for Pagsanjan have not yet been verified from official
            sources. Confirm details with the responsible office before
            transacting.
          </VerificationNotice>
        </div>
      ) : null}

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {hasProcedureDetails ? (
            <>
              {service.eligibility ? (
                <section>
                  <h2 className={sectionTitleClass}>Who can apply</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                    {service.eligibility.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {service.requirements ? (
                <section>
                  <h2 className={sectionTitleClass}>Requirements</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                    {service.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {service.steps ? (
                <section>
                  <h2 className={sectionTitleClass}>How to apply</h2>
                  <ol className="mt-4 space-y-4">
                    {service.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span
                          aria-hidden
                          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800"
                        >
                          {index + 1}
                        </span>
                        <span className="pt-0.5 text-sm leading-relaxed text-slate-700">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {service.fees ? (
                <section>
                  <h2 className={sectionTitleClass}>Fees</h2>
                  <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
                    {service.fees.map((fee) => (
                      <li
                        key={fee.description}
                        className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                      >
                        <span className="text-slate-700">{fee.description}</span>
                        {fee.amount != null ? (
                          <span className="shrink-0 font-semibold text-ink">
                            ₱{fee.amount.toLocaleString("en-PH")}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {service.processingTime ? (
                <section>
                  <h2 className={sectionTitleClass}>Processing time</h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    {service.processingTime}
                  </p>
                </section>
              ) : null}
            </>
          ) : null}

          <section>
            <h2 className={sectionTitleClass}>What to do next</h2>
            <ol className="mt-4 space-y-4">
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800"
                >
                  1
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-slate-700">
                  <strong className="font-semibold text-ink">
                    Confirm requirements and fees first.
                  </strong>{" "}
                  Details for Pagsanjan have not yet been verified here. Contact
                  the responsible office or check the{" "}
                  <a
                    href={site.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 hover:underline"
                  >
                    official municipal website
                  </a>{" "}
                  before preparing your documents.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800"
                >
                  2
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-slate-700">
                  <strong className="font-semibold text-ink">
                    Bring a valid ID and your documents.
                  </strong>{" "}
                  Most government transactions require a valid government-issued
                  ID and photocopies. Ask the office exactly what it needs.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-800"
                >
                  3
                </span>
                <span className="pt-0.5 text-sm leading-relaxed text-slate-700">
                  <strong className="font-semibold text-ink">
                    Transact with the office directly.
                  </strong>{" "}
                  BetterPagsanjan cannot receive applications, payments, or
                  requests. Official transactions happen only at the government
                  office or its official channels.
                </span>
              </li>
            </ol>
            <SourceAttribution
              className="mt-6"
              sourceId="betterpagsanjan"
              note="General guidance written by BetterPagsanjan. It is not an official procedure."
            />
          </section>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2
                  className="size-4 shrink-0 text-primary-700"
                  aria-hidden
                />
                Responsible office
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium text-slate-900">
                {service.office?.name ?? "Not yet available"}
              </p>
              {service.office?.address ? (
                <p className="flex gap-2 text-muted">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {service.office.address}
                </p>
              ) : (
                <p className="text-muted">
                  Office address and hours are not yet verified. Municipal Hall
                  contact details are on the{" "}
                  <Link
                    href="/government"
                    className="text-primary-700 hover:underline"
                  >
                    Government page
                  </Link>
                  .
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Official channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {service.officialChannel ? (
                <p className="text-slate-700">
                  {service.officialChannel.label}
                </p>
              ) : null}
              <a
                href={site.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
              >
                Municipality of Pagsanjan — official website
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              <p className="text-xs leading-relaxed text-muted">
                BetterPagsanjan never processes applications, requests, or
                payments. Always transact through official government channels.
              </p>
            </CardContent>
          </Card>

          <SourceAttribution
            sourceId={service.verification.sourceId}
            sourceUrl={service.verification.sourceUrl}
            lastChecked={service.lastChecked}
            note={service.verification.note}
          />
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className={sectionTitleClass}>Related services</h2>
          <ul className="mt-4 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((candidate) => (
              <li key={candidate.id} className="h-full">
                <ServiceCard service={candidate} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}
