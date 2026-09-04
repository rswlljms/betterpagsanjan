import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

interface VerificationNoticeProps {
  title?: string;
  children?: ReactNode;
}

/**
 * Prominent notice used when a record's Pagsanjan-specific details have
 * not yet been verified against official sources (AGENTS.md §13, §14).
 */
export function VerificationNotice({
  title = "Verification pending",
  children,
}: VerificationNoticeProps) {
  return (
    <div
      role="note"
      className="rounded-lg border border-amber-300 bg-amber-50 p-4"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
        <TriangleAlert className="size-4 shrink-0" aria-hidden />
        {title}
      </p>
      <div className="mt-1 text-sm leading-relaxed text-amber-900">
        {children}
      </div>
    </div>
  );
}
