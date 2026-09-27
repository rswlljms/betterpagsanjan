import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/civic/breadcrumbs";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { getLegislativeBySlug } from "@/data/legislative/documents";
import {
  getTransparencyBySlug,
  transparencyCategories,
  transparencyRecords,
} from "@/data/transparency/records";

interface TransparencyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return transparencyRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({
  params,
}: TransparencyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getTransparencyBySlug(slug);
  if (!record) return {};
  return {
    title: record.title,
    description: record.description,
  };
}

export default async function TransparencyDetailPage({
  params,
}: TransparencyDetailPageProps) {
  const { slug } = await params;
  const record = getTransparencyBySlug(slug);
  if (!record) notFound();

  const categoryName =
    transparencyCategories.find((area) => area.id === record.category)?.name ??
    record.category;
  const relatedDoc = record.relatedLegislativeSlug
    ? getLegislativeBySlug(record.relatedLegislativeSlug)
    : undefined;
  const relatedHref = relatedDoc
    ? relatedDoc.documentType === "ordinance"
      ? `/ordinances/${relatedDoc.slug}`
      : `/resolutions/${relatedDoc.slug}`
    : undefined;

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Transparency", href: "/transparency" },
          { label: record.title },
        ]}
      />
      <div className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="primary">{categoryName}</Badge>
          {record.year ? <Badge variant="outline">{record.year}</Badge> : null}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {record.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <VerificationBadge verification={record.verification} />
          {record.lastChecked ? (
            <span>Last checked: {record.lastChecked}</span>
          ) : null}
        </div>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          {record.description}
        </p>
        {(record.documentUrl ?? record.sourceUrl) ? (
          <p className="mt-6">
            <a
              href={record.documentUrl ?? record.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
            >
              View original official document
              <ExternalLink className="size-4" aria-hidden />
            </a>
          </p>
        ) : null}
        {relatedDoc && relatedHref ? (
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            Also indexed as{" "}
            <Link
              href={relatedHref}
              className="font-medium text-primary-700 hover:underline"
            >
              {relatedDoc.number ?? relatedDoc.title}
            </Link>{" "}
            under{" "}
            {relatedDoc.documentType === "ordinance"
              ? "Ordinances"
              : "Resolutions"}
            .
          </p>
        ) : null}
        <SourceAttribution
          className="mt-6"
          sourceId={record.verification.sourceId}
          sourceUrl={record.verification.sourceUrl ?? record.sourceUrl}
          lastChecked={record.lastChecked}
          note={record.verification.note}
        />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          BetterPagsanjan is an independent project. Transparency records always
          link to the original official document. Nothing in this section is
          created by BetterPagsanjan.
        </p>
      </div>
    </Container>
  );
}
