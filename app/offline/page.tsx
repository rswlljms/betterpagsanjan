import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Offline",
  description: "You are offline. Cached emergency information may be available.",
};

export default function OfflinePage() {
  return (
    <Container className="py-20 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-surface text-muted">
          <WifiOff className="size-6" aria-hidden />
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          You&rsquo;re offline
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          The page you requested isn&rsquo;t cached on this device. Emergency
          information you&rsquo;ve opened before may still be available below —
          but cached content can be outdated, so verify anything
          time-sensitive once you&rsquo;re back online.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <ButtonLink href="/emergency" variant="danger">
            Emergency information
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Try the homepage
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
