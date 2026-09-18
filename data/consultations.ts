import type { Consultation, ConsultationStatus } from "@/types/civic";

/**
 * Public consultations directory (AGENTS.md §25).
 *
 * No consultations are listed yet. BetterPagsanjan only lists
 * consultations that can be traced to an official government notice,
 * with their opening/closing dates, official document, and participation
 * instructions. Verified records will be added here with their source
 * and last-checked date.
 *
 * BetterPagsanjan provides information *about* a consultation — it is
 * never the official consultation system.
 */
export const consultations: Consultation[] = [];

export function getConsultationBySlug(slug: string): Consultation | undefined {
  return consultations.find((consultation) => consultation.slug === slug);
}

/**
 * Derive a display status from officially published dates only.
 * Returns undefined when dates are unpublished — the UI then shows
 * "Dates not published" instead of guessing.
 */
export function getConsultationStatus(
  consultation: Consultation,
  now: Date = new Date(),
): ConsultationStatus | undefined {
  const { opensAt, closesAt } = consultation;
  if (!opensAt && !closesAt) return undefined;
  const nowTime = now.getTime();
  if (opensAt && nowTime < new Date(opensAt).getTime()) return "upcoming";
  if (closesAt && nowTime > new Date(closesAt).getTime()) return "closed";
  return "open";
}

export const consultationStatusLabels: Record<ConsultationStatus, string> = {
  upcoming: "Upcoming",
  open: "Open",
  closed: "Closed",
};
