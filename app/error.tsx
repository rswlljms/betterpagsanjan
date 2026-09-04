"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-20 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          An unexpected error occurred while loading this page. Please try
          again.
        </p>
        <Button onClick={reset} className="mt-6">
          Try again
        </Button>
      </div>
    </Container>
  );
}
