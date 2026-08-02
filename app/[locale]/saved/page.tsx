import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SavedView } from '@/components/property/saved-view';

export const metadata: Metadata = {
  title: 'Saved',
  description: 'Your saved PREMORA Realty properties, searches and recently viewed homes.',
  robots: { index: false },
  alternates: { canonical: '/saved' },
};

export default function SavedPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        eyebrow="YOUR SHORTLIST"
        title="Your Saved & Recently Viewed Properties"
        description="Keep track of your saved properties, recently viewed listings and compare your favourite opportunities whenever you’re ready."
        hue={340}
      />
      <Container className="py-8">
        <SavedView />
      </Container>
    </>
  );
}
