import type { Metadata } from "next";
import { LegislativePlaceholder } from "@/components/civic/legislative-placeholder";

export const metadata: Metadata = {
  title: "Ordinances",
  description:
    "Searchable public index of Pagsanjan municipal ordinances — planned for the legislative phase of BetterPagsanjan.",
};

export default function OrdinancesPage() {
  return <LegislativePlaceholder documentType="ordinance" />;
}
