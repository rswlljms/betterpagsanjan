import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
          404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <ButtonLink href="/">Go to the homepage</ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Browse services
          </ButtonLink>
          <ButtonLink href="/search" variant="secondary">
            Search
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
