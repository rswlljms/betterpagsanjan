import Link from "next/link";
import { Building2 } from "lucide-react";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Badge } from "@/components/ui/badge";
import { getServiceCategory } from "@/data/services";
import type { GovernmentService } from "@/types/civic";

export function ServiceCard({ service }: { service: GovernmentService }) {
  const category = getServiceCategory(service.category);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/40"
    >
      <div className="pb-4">
        {category ? <Badge variant="primary">{category.name}</Badge> : null}
        <h3 className="mt-3 font-semibold leading-snug text-ink">
          {service.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-3 text-xs text-muted">
        {service.office ? (
          <span className="inline-flex items-center gap-1">
            <Building2 className="size-3.5" aria-hidden />
            {service.office.name}
          </span>
        ) : null}
        <VerificationBadge verification={service.verification} />
      </div>
    </Link>
  );
}
