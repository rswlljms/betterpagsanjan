/**
 * Shared civic data types for BetterPagsanjan.
 *
 * Civic facts must always be traceable to a source. Records carry a
 * `verification` block so the UI can distinguish verified information
 * from information that still needs checking (AGENTS.md §13).
 */

export type SourceType = "government" | "statute" | "reference" | "original";

export interface SourceRecord {
  id: string;
  name: string;
  /** Organization or author behind the source. */
  organization?: string;
  url?: string;
  sourceType: SourceType;
  /** What this source is used for on the platform. */
  description?: string;
  /** When BetterPagsanjan last accessed this source (e.g. "September 2026"). */
  accessedAt?: string;
}

export type VerificationStatus = "verified" | "pending";

export interface Verification {
  status: VerificationStatus;
  /** id of a SourceRecord in data/sources.ts */
  sourceId?: string;
  /** Direct URL to the cited document, when different from the source root. */
  sourceUrl?: string;
  /** When the information was last verified (e.g. "2026-09"). */
  verifiedAt?: string;
  /** What the verification does and does not cover. */
  note?: string;
}

export interface OfficeInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  officeHours?: string;
}

export interface ServiceFee {
  description: string;
  /** PHP amount, only when officially published. */
  amount?: number;
  note?: string;
}

export interface OfficialChannel {
  /** Where the actual transaction happens. */
  label: string;
  url?: string;
  note?: string;
}

export interface GovernmentService {
  id: string;
  slug: string;
  title: string;
  /** id of a ServiceCategory. */
  category: string;
  description: string;
  /** Plain-language synonyms used by search. */
  aliases?: string[];
  office?: OfficeInfo;
  eligibility?: string[];
  requirements?: string[];
  steps?: string[];
  fees?: ServiceFee[];
  processingTime?: string;
  /**
   * Where the citizen actually transacts. BetterPagsanjan never processes
   * applications — it explains services and points to official channels.
   */
  officialChannel?: OfficialChannel;
  relatedServices?: string[];
  verification: Verification;
  /** e.g. "September 2026". */
  lastChecked?: string;
  featured?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export type OfficeGroup =
  | "executive"
  | "legislative"
  | "finance"
  | "administration"
  | "health-social"
  | "safety";

export interface GovernmentOffice {
  id: string;
  name: string;
  group: OfficeGroup;
  description: string;
  /** Legal basis for the office's existence, when applicable. */
  statutoryBasis?: string;
  /** Slugs of GovernmentServices handled by this office. */
  services?: string[];
  address?: string;
  phone?: string;
  email?: string;
  officeHours?: string;
  verification: Verification;
}

export interface Barangay {
  id: string;
  slug: string;
  name: string;
  description?: string;
  officeAddress?: string;
  phone?: string;
  verification: Verification;
}

export interface StatisticItem {
  id: string;
  label: string;
  value: string;
  /** Short context, e.g. what the figure measures. */
  context?: string;
  /** Reference year of the figure. */
  year?: string;
  sourceId: string;
  sourceUrl?: string;
  /** Caveats, e.g. conflicting figures between sources. */
  note?: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  /** ISO date of publication by the original source. */
  date: string;
  category?: string;
  sourceId: string;
  sourceUrl?: string;
  kind?: "announcement" | "advisory" | "notice" | "event";
}

export type LegislativeDocumentType = "ordinance" | "resolution";

export interface LegislativeDocument {
  id: string;
  slug: string;
  documentType: LegislativeDocumentType;
  /** e.g. "Ordinance No. 2024-01" — only when published officially. */
  number?: string;
  title: string;
  summary: string;
  /** ISO date passed/approved, when published. */
  date?: string;
  /** Four-digit year string, e.g. "2024". Derived from date when available. */
  year?: string;
  /** Free-form topics, e.g. "traffic", "market", "budget". */
  topics?: string[];
  /** Authors as published by the source, e.g. ["HON. ..."]. */
  authors?: string[];
  sourceUrl?: string;
  verification: Verification;
  lastChecked?: string;
}

export type ProjectStatus =
  | "proposed"
  | "planned"
  | "ongoing"
  | "completed"
  | "delayed"
  | "cancelled";

export interface PublicProject {
  id: string;
  slug: string;
  name: string;
  /**
   * Plain-language label for listings, derived from the official name
   * without adding new facts (e.g. DPWH "K0095 + 949" chainage rendered as
   * "Km 95.9"). The verbatim official `name` is always kept on the detail
   * page. Omit when the official name is already readable.
   */
  displayName?: string;
  description: string;
  location?: string;
  implementingOffice?: string;
  status: ProjectStatus;
  /** Budget text exactly as published, e.g. "₱5,000,000 (as published)". Never estimated. */
  budget?: string;
  startDate?: string;
  targetCompletion?: string;
  sourceUrl?: string;
  verification: Verification;
  lastChecked?: string;
}

export type TransparencyCategory =
  | "budget"
  | "procurement"
  | "financial"
  | "plans-programs"
  | "documents"
  | "open-data";

export interface TransparencyRecord {
  id: string;
  slug: string;
  title: string;
  category: TransparencyCategory;
  description: string;
  year?: string;
  /** Direct URL to the original official document. */
  documentUrl?: string;
  sourceUrl?: string;
  verification: Verification;
  lastChecked?: string;
}

export type CivicLocationCategory =
  | "government"
  | "emergency"
  | "health"
  | "education"
  | "barangay"
  | "transport"
  | "tourism"
  | "evacuation"
  | "community"
  | "public-facility";

export interface CivicLocation {
  id: string;
  slug: string;
  name: string;
  category: CivicLocationCategory;
  description?: string;
  address?: string;
  /** Coordinates only when confirmed from an authoritative source. Never guessed. */
  latitude?: number;
  longitude?: number;
  /** OpenStreetMap link, built from coordinates when available. */
  osmUrl?: string;
  verification: Verification;
  lastChecked?: string;
}
