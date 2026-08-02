import { Suspense } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import {
  PropertiesExplorer,
  CardSkeletonGrid,
} from '@/components/property/properties-explorer';
import { CompareDrawer } from '@/components/property/compare-drawer';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'properties',
  });
  return {
    title: t('title'),
    description:
      'Browse PREMORA Realty’s curated portfolio of apartments, villas, penthouses and townhouses across Dubai’s most prime communities.',
    alternates: { canonical: '/properties' },
  };
}

export default async function PropertiesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'properties' });

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        description="Filter by location, type, price and bedrooms — switch between grid and map, save favourites and compare up to three homes side by side."
      />
      <Container className="pb-16">
        <Suspense fallback={<CardSkeletonGrid />}>
          <PropertiesExplorer />
        </Suspense>
      </Container>
      <CompareDrawer />
    </>
  );
}
