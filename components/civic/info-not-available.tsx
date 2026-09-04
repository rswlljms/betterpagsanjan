interface InfoNotAvailableProps {
  label?: string;
  /** Optional extra context, e.g. why it is unavailable. */
  detail?: string;
}

/**
 * Inline marker for civic facts that have not been verified
 * (AGENTS.md §14). Rendered instead of inventing values.
 */
export function InfoNotAvailable({
  label = "Information not yet available",
  detail,
}: InfoNotAvailableProps) {
  return (
    <p className="text-sm italic text-muted">
      {label}
      {detail ? <span className="not-italic"> — {detail}</span> : null}
    </p>
  );
}
