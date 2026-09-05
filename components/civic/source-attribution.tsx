import { getSource, LAST_CHECKED } from "@/data/sources";
import { cn } from "@/lib/utils";

interface SourceAttributionProps {
  /** id of a SourceRecord in data/sources.ts. */
  sourceId?: string;
  /** Direct document URL, when different from the source root. */
  sourceUrl?: string;
  lastChecked?: string;
  /** Context about how the information was summarized. */
  note?: string;
  className?: string;
}

/**
 * Reusable source attribution block (AGENTS.md §4, §10). Important
 * information must never appear to originate from BetterPagsanjan when it
 * comes from another organization.
 */
export function SourceAttribution({
  sourceId,
  sourceUrl,
  lastChecked = LAST_CHECKED,
  note,
  className,
}: SourceAttributionProps) {
  const source = sourceId ? getSource(sourceId) : undefined;
  const href = sourceUrl ?? source?.url;

  return (
    <aside
      aria-label="Source information"
      className={cn(
        "rounded-lg bg-bp-info-banner-bg p-4 text-sm",
        className,
      )}
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
        Source
      </h2>
      {source ? (
        <p className="mt-1 font-medium text-bp-graphite">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-link hover:underline"
            >
              {source.name}
            </a>
          ) : (
            source.name
          )}
        </p>
      ) : (
        <p className="mt-1 text-muted">
          Source information is being compiled for this section.
        </p>
      )}
      {lastChecked ? (
        <p className="mt-1 text-muted">Last checked: {lastChecked}</p>
      ) : null}
      {note ? <p className="mt-2 leading-relaxed text-bp-graphite">{note}</p> : null}
    </aside>
  );
}
