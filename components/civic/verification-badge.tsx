import { BadgeCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatMonthYear } from "@/lib/format";
import type { Verification } from "@/types/civic";

/**
 * Communicates whether a civic record has been checked against an
 * authoritative source (AGENTS.md §13, §30).
 */
export function VerificationBadge({ verification }: { verification: Verification }) {
  if (verification.status === "verified") {
    return (
      <Badge variant="success">
        <BadgeCheck className="size-3.5" aria-hidden />
        Verified
        {verification.verifiedAt ? ` · ${formatMonthYear(verification.verifiedAt)}` : ""}
      </Badge>
    );
  }

  return (
    <Badge variant="warning">
      <Clock className="size-3.5" aria-hidden />
      Verification pending
    </Badge>
  );
}
