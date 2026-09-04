import { PageSkeleton } from "@/components/ui/page-skeleton";

/**
 * Root loading UI (App Router file convention). Rendered as the `Suspense`
 * fallback while a route segment streams in. Pure static skeleton — a
 * Server Component with no client JavaScript.
 */
export default function RootLoading() {
  return <PageSkeleton />;
}
