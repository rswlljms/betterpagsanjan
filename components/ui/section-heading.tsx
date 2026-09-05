import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends ComponentProps<"div"> {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  /** Heading level for the title, to keep document outline correct. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {eyebrow}
          </p>
        ) : null}
        <Tag className="font-display mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </Tag>
        {description ? (
          <p className="mt-2 text-sm text-bp-graphite sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-bp-graphite hover:text-bp-ink"
        >
          {action.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
