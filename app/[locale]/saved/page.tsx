import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SavedView } from '@/components/property/saved-view';

export const metadata: Metadata = {
  title: 'Saved',
  description: 'Your saved Premora properties, searches and recently viewed homes.',
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
        title="Saved & recently viewed"
        description="Everything you’ve favourited, searched and explored — in one place, on this device."
        hue={340}
      />
      <Container className="py-8">
        <SavedView />
      </Container>
    </>
  );
}
