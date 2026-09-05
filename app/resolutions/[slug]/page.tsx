import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/civic/breadcrumbs";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import {
  getLegislativeBySlug,
  legislativeDocuments,
} from "@/data/legislative/documents";

interface ResolutionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return legislativeDocuments
    .filter((doc) => doc.documentType === "resolution")
    .map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: ResolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegislativeBySlug(slug);
  if (!doc || doc.documentType !== "resolution") return {};
  return {
    title: doc.number ? `${doc.number} — ${doc.title}` : doc.title,
    description: doc.summary,
  };
}

export default async function ResolutionPage({ params }: ResolutionPageProps) {
  const { slug } = await params;
  const doc = getLegislativeBySlug(slug);
  if (!doc || doc.documentType !== "resolution") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name: doc.number ? `${doc.number} — ${doc.title}` : doc.title,
    description: doc.summary,
    legislationType: "Resolution",
    ...(doc.date ? { datePublished: doc.date } : {}),
  };

  return (
    <Container className="py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Resolutions", href: "/resolutions" },
          { label: doc.number ?? doc.title },
        ]}
      />
      <div className="mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-1.5">
          {doc.number ? (
            <Badge variant="primary">{doc.number}</Badge>
          ) : null}
          {doc.year ? <Badge variant="outline">{doc.year}</Badge> : null}
          {(doc.topics ?? []).map((topic) => (
            <Badge key={topic} variant="neutral">
              {topic}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {doc.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <VerificationBadge verification={doc.verification} />
          {doc.lastChecked ? (
            <span>Last checked: {doc.lastChecked}</span>
          ) : null}
          {doc.date ? <span>Approved: {doc.date}</span> : null}
        </div>
        <p className="mt-5 text-base leading-relaxed text-slate-700">
          {doc.summary}
        </p>
        {doc.authors && doc.authors.length > 0 ? (
          <section aria-label="Authors" className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {doc.authors.length === 1 ? "Author" : "Authors"}
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {doc.authors.map((author) => (
                <li key={author}>{author}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {doc.sourceUrl ? (
          <p className="mt-6">
            <a
              href={doc.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-primary-700 hover:underline"
            >
              View original official document
              <ExternalLink className="size-4" aria-hidden />
            </a>
          </p>
        ) : null}
        <SourceAttribution
          className="mt-6"
          sourceId={doc.verification.sourceId}
          sourceUrl={doc.verification.sourceUrl ?? doc.sourceUrl}
          lastChecked={doc.lastChecked}
          note={doc.verification.note}
        />
        <p className="mt-6 text-sm leading-relaxed text-muted">
          BetterPagsanjan summarizes public legislative records for discovery.
          For the authoritative text, always consult the original official
          document or the Sangguniang Bayan.
        </p>
      </div>
    </Container>
  );
}
