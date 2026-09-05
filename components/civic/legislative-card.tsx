import Link from "next/link";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import type { LegislativeDocument } from "@/types/civic";

export function LegislativeCard({ document }: { document: LegislativeDocument }) {
  const href =
    document.documentType === "ordinance"
      ? `/ordinances/${document.slug}`
      : `/resolutions/${document.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/40"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        {document.number ? (
          <Badge variant="primary">{document.number}</Badge>
        ) : null}
        {document.year ? <Badge variant="outline">{document.year}</Badge> : null}
      </div>
      <h3 className="mt-3 font-semibold leading-snug text-ink">
        {document.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {document.summary}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-line pt-3">
        {(document.topics ?? []).slice(0, 3).map((topic) => (
          <Badge key={topic} variant="neutral">
            {topic}
          </Badge>
        ))}
        <span className="ml-auto">
          <VerificationBadge verification={document.verification} />
        </span>
      </div>
    </Link>
  );
}
