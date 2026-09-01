import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, MapPin, Building2, Wallet } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { PropertyCard } from '@/components/property/property-card';
import { CtaBand } from '@/components/sections/cta-band';
import { communities, getCommunityBySlug } from '@/data/communities';
import { properties } from '@/data/properties';
import { formatPriceShort } from '@/lib/format';
import { breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/i18n/routing';

import { SITE_URL } from '@/lib/site-url';

export function generateStaticParams() {
  return communities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const community = getCommunityBySlug(params.slug);
  if (!community) return { title: 'Community not found' };
  return {
    title: community.name,
    description: community.blurb,
    alternates: { canonical: `/communities/${community.slug}` },
  };
}

export default function CommunityDetailPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  setRequestLocale(locale);
  const community = getCommunityBySlug(slug);
  if (!community) notFound();

  const lng = locale as Locale;
  const listings = properties.filter((p) => p.communitySlug === slug);

  const stats = [
    { icon: Building2, label: 'Listings', value: `${community.count}` },
    {
      icon: Wallet,
      label: 'From',
      value: formatPriceShort(community.fromPrice, lng),
    },
    { icon: MapPin, label: 'Location', value: 'Dubai, UAE' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(
              [
                { name: 'Home', url: '/' },
                { name: 'Communities', url: '/communities' },
                { name: community.name, url: `/communities/${community.slug}` },
              ],
              SITE_URL,
            ),
          ),
        }}
      />
      <PageHeader
        eyebrow="COMMUNITY"
        title={community.name}
        description={community.blurb}
        hue={community.hue}
      />

      <Container className="-mt-4 pb-4">
        <Link
          href="/communities"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-warm"
        >
          <ArrowLeft className="h-4 w-4" />
          All communities
        </Link>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-2xl border border-gold/15 bg-card p-5"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy-gold text-warm">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-xl text-gold">{s.value}</p>
                <p className="text-xs uppercase tracking-wider text-dim">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <h2 className="font-serif text-3xl text-warm">
          Available in {community.name}
        </h2>
        <span className="mt-3 block rule-gold" aria-hidden />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </Container>
      <CtaBand />
    </>
  );
}
