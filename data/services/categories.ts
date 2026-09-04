import type { ServiceCategory } from "@/types/civic";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "business",
    name: "Business & Permits",
    description:
      "Starting, operating, and renewing a business, plus construction-related permits.",
  },
  {
    id: "civil-registry",
    name: "Civil Registry",
    description:
      "Registration of births, marriages, and deaths, and requesting certified copies.",
  },
  {
    id: "taxation",
    name: "Taxes & Fees",
    description: "Local taxes and payments, such as real property tax.",
  },
  {
    id: "health",
    name: "Health",
    description: "Public health services, consultations, and health programs.",
  },
  {
    id: "social",
    name: "Social Services",
    description:
      "Assistance programs for senior citizens, persons with disabilities, families, and youth.",
  },
  {
    id: "barangay",
    name: "Barangay Services",
    description:
      "Clearances and certifications issued by barangay offices where you live.",
  },
];
