import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { CommunityCard } from '@/components/property/community-card';
import { CtaBand } from '@/components/sections/cta-band';
import { communities } from '@/data/communities';

export const metadata: Metadata = {
  title: 'Explore Dubai Communities',
  description:
    'Explore the Dubai communities that match your lifestyle, budget and investment goals — from waterfront towers to family villa enclaves.',
  alternates: { canonical: '/communities' },
};

export default function CommunitiesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        eyebrow="DUBAI"
        title="Explore Dubai Communities"
        description="From waterfront towers to family villa enclaves, explore the communities that match your lifestyle, budget, and investment goals."
        hue={195}
      />
      <Container className="py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((c, i) => (
            <CommunityCard key={c.slug} community={c} index={i} withBlurb />
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
