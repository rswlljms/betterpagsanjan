import { businessServices } from "./business";
import { serviceCategories } from "./categories";
import { civilRegistryServices } from "./civil-registry";
import { communityServices } from "./community";
import type { GovernmentService, ServiceCategory } from "@/types/civic";

export { serviceCategories };

export const services: GovernmentService[] = [
  ...businessServices,
  ...civilRegistryServices,
  ...communityServices,
].sort((a, b) => a.title.localeCompare(b.title));

export function getServiceBySlug(slug: string): GovernmentService | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceCategory(id: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.id === id);
}

export function getFeaturedServices(): GovernmentService[] {
  return services.filter((service) => service.featured);
}
