import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Optional status badge, e.g. "Planned". */
  badge?: string;
}

/** Card used for section entry points on the homepage and hub pages. */
export function LinkCard({
  href,
  title,
  description,
  icon: Icon,
  badge,
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-primary-300 hover:bg-primary-50/40"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="mt-3 flex flex-wrap items-center gap-2 font-semibold text-ink">
        {title}
        {badge ? <Badge variant="accent">{badge}</Badge> : null}
      </span>
      <span className="mt-1 text-sm leading-relaxed text-slate-600">
        {description}
      </span>
      <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-primary-700">
        Open
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
