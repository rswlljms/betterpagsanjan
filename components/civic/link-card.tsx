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
      className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-bp-sm-4 transition hover:shadow-bp-sm"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-bp-paper text-bp-graphite">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="mt-3 flex flex-wrap items-center gap-2 font-semibold text-ink">
        {title}
        {badge ? <Badge variant="accent">{badge}</Badge> : null}
      </span>
      <span className="mt-1 text-sm leading-relaxed text-bp-graphite">
        {description}
      </span>
      <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-bp-graphite group-hover:text-bp-ink">
        Open
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
