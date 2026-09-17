import Image from "next/image";
import { LoaderOne } from "@/components/ui/loader";
import { PageSkeleton } from "@/components/ui/page-skeleton";

/**
 * Root loading UI (App Router file convention). Rendered as the `Suspense`
 * fallback while a route segment streams in. Brand loader (logo + LoaderOne)
 * on top preserves the site identity during transitions; `PageSkeleton`
 * below keeps the layout context and owns the screen-reader announcement.
 * Pure static markup — a Server Component with no client JavaScript.
 */
export default function RootLoading() {
  return (
    <div>
      <div
        aria-hidden
        className="flex flex-col items-center justify-center gap-4 px-4 pb-2 pt-10"
      >
        <Image
          src="/images/logo/better-pagsanjan-logo.svg"
          alt=""
          width={160}
          height={61}
          className="h-11 w-auto"
        />
        <LoaderOne />
      </div>
      <PageSkeleton />
    </div>
  );
}
