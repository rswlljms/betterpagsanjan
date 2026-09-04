import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("rounded bg-slate-200", className)}
    />
  );
}

/**
 * Placeholder cards shown while a route segment or a `useSearchParams`
 * client component is resolving (App Router `loading.tsx` / `Suspense`
 * fallback). Decorative bars are hidden from assistive technology; the
 * wrapping `role="status"` announces the loading text instead.
 */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      className="animate-pulse"
    >
      <span className="sr-only">Loading content…</span>
      <div aria-hidden className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="rounded-lg border border-line bg-white p-5"
          >
            <Bar className="h-4 w-2/3" />
            <Bar className="mt-3 h-3 w-full" />
            <Bar className="mt-2 h-3 w-5/6" />
            <Bar className="mt-4 h-8 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Full-page skeleton matching the `PageHero` + content layout, used by
 * the root `app/loading.tsx`.
 */
export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      <div aria-hidden className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Bar className="h-3 w-24" />
          <Bar className="mt-3 h-9 w-2/3 max-w-md" />
          <Bar className="mt-3 h-4 w-full max-w-2xl" />
          <Bar className="mt-2 h-4 w-4/6 max-w-xl" />
        </div>
      </div>
      <div
        aria-hidden
        className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8"
      >
        <Bar className="h-10 w-full max-w-xl rounded-lg" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="rounded-lg border border-line bg-white p-5"
            >
              <Bar className="h-4 w-2/3" />
              <Bar className="mt-3 h-3 w-full" />
              <Bar className="mt-2 h-3 w-5/6" />
            </div>
          ))}
        </div>
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        Loading page…
      </span>
    </div>
  );
}
