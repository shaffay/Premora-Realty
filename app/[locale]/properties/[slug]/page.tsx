import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, BedDouble, Bath, Maximize, Building2, Check } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { PropertyGallery } from '@/components/property/property-gallery';
import { AdvisorCard } from '@/components/property/advisor-card';
import { MortgageEstimate } from '@/components/property/mortgage-estimate';
import { PropertyCard } from '@/components/property/property-card';
import { TrackView } from '@/components/property/track-view';
import {
  properties,
  getPropertyBySlug,
  getSimilarProperties,
} from '@/data/properties';
import { getAgentById } from '@/data/agents';
import { formatPrice, formatPricePerSqft } from '@/lib/format';
import { realEstateListingJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/i18n/routing';

import { SITE_URL } from '@/lib/site-url';

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const property = getPropertyBySlug(params.slug);
  if (!property) return { title: 'Property not found' };
  return {
    title: `${property.title} — ${property.community}`,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: `${property.title} — ${property.community} · PREMORA Realty`,
      description: property.description.slice(0, 160),
      type: 'website',
    },
  };
}

export default async function PropertyDetailPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string };
}) {
  setRequestLocale(locale);
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const t = await getTranslations({ locale, namespace: 'detail' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const agent = getAgentById(property.agentId);
  const similar = getSimilarProperties(property);
  const lng = locale as Locale;

  const specs = [
    { icon: BedDouble, label: tc('beds'), value: property.beds === 0 ? 'Studio' : property.beds },
    { icon: Bath, label: tc('baths'), value: property.baths },
    { icon: Maximize, label: tc('sqft'), value: property.sqft.toLocaleString() },
    { icon: Building2, label: 'Type', value: property.typeLabel },
  ];

  return (
    <>
      <TrackView propertyId={property.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateListingJsonLd(property, SITE_URL)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(
              [
                { name: 'Home', url: '/' },
                { name: 'Properties', url: '/properties' },
                { name: property.title, url: `/properties/${property.slug}` },
              ],
              SITE_URL,
            ),
          ),
        }}
      />

      <Container className="pt-28">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-warm"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </Link>
      </Container>

      <Container className="grid gap-10 py-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-8">
          <PropertyGallery property={property} />

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-gold/70">{property.community}, Dubai</span>
            <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
              <span className="font-serif text-3xl font-semibold text-gold">
                {formatPrice(property.price, lng)}
              </span>
              <span className="text-sm text-muted">
                {formatPricePerSqft(property.price, property.sqft, lng)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-gold/15 bg-card py-5 text-center"
              >
                <s.icon className="h-5 w-5 text-gold" />
                <span className="font-serif text-2xl text-warm">{s.value}</span>
                <span className="text-xs uppercase tracking-wider text-dim">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-serif text-2xl text-warm">{t('about')}</h2>
            <span className="mt-3 block rule-gold" aria-hidden />
            <p className="mt-4 leading-relaxed text-body">{property.description}</p>
          </div>

          <div>
            <h2 className="font-serif text-2xl text-warm">{t('features')}</h2>
            <span className="mt-3 block rule-gold" aria-hidden />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {property.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-body">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/25 text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <AdvisorCard agent={agent} property={property} />
          <MortgageEstimate property={property} />
        </aside>
      </Container>

      {similar.length > 0 && (
        <Container className="py-16">
          <h2 className="font-serif text-3xl text-warm">{t('similar')}</h2>
          <span className="mt-3 block rule-burgundy-gold" aria-hidden />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} showCompare={false} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
