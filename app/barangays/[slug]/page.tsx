import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/civic/breadcrumbs";
import { SourceAttribution } from "@/components/civic/source-attribution";
import { VerificationBadge } from "@/components/civic/verification-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { barangays, getBarangayBySlug } from "@/data/barangays/barangays";

interface BarangayPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return barangays.map((barangay) => ({ slug: barangay.slug }));
}

export async function generateMetadata({
  params,
}: BarangayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const barangay = getBarangayBySlug(slug);
  if (!barangay) return {};
  return {
    title: `Barangay ${barangay.name}`,
    description: `Information about Barangay ${barangay.name}, Pagsanjan, Laguna.`,
  };
}

export default async function BarangayPage({ params }: BarangayPageProps) {
  const { slug } = await params;
  const barangay = getBarangayBySlug(slug);
  if (!barangay) notFound();

  return (
    <Container className="py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Barangays", href: "/barangays" },
          { label: `Barangay ${barangay.name}` },
        ]}
      />

      <div className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Barangay {barangay.name}
        </h1>
        <div className="mt-3">
          <VerificationBadge verification={barangay.verification} />
        </div>
        {barangay.description ? (
          <p className="mt-5 text-base leading-relaxed text-slate-700">
            {barangay.description}
          </p>
        ) : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-lg border border-dashed border-slate-300 bg-surface p-6 text-sm">
          <p className="font-semibold text-ink">
            Barangay officials, office, and contacts
          </p>
          <p className="mt-2 leading-relaxed text-muted">
            Information not yet available. BetterPagsanjan does not publish
            barangay officials, addresses, or contact numbers that cannot be
            verified from official sources. For barangay matters, visit or call
            your barangay hall directly.
          </p>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Common needs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <Link
                  href="/services/barangay-clearance"
                  className="font-medium text-primary-700 hover:underline"
                >
                  Barangay clearance
                </Link>{" "}
                — issued by the barangay hall where you reside.
              </p>
              <p>
                <Link
                  href="/government"
                  className="font-medium text-primary-700 hover:underline"
                >
                  Municipal offices
                </Link>{" "}
                — Municipal Hall contact details.
              </p>
              <p>
                <Link
                  href="/emergency"
                  className="font-medium text-primary-700 hover:underline"
                >
                  Emergency information
                </Link>{" "}
                — hotlines and preparedness guides.
              </p>
            </CardContent>
          </Card>

          <SourceAttribution
            sourceId={barangay.verification.sourceId}
            sourceUrl={barangay.verification.sourceUrl}
            lastChecked="September 2026"
            note={barangay.verification.note}
          />
        </aside>
      </div>
    </Container>
  );
}
