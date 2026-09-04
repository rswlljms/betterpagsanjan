import type { Metadata } from "next";
import { LegislativePlaceholder } from "@/components/civic/legislative-placeholder";

export const metadata: Metadata = {
  title: "Resolutions",
  description:
    "Searchable public index of Pagsanjan municipal resolutions — planned for the legislative phase of BetterPagsanjan.",
};

export default function ResolutionsPage() {
  return <LegislativePlaceholder documentType="resolution" />;
}
