import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { Reveal } from '@/components/ui/reveal';
import { BookConsultationButton } from '@/components/layout/book-consultation-button';
import { ServiceList } from '@/components/sections/service-list';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Buying, selling, leasing, investment advisory, property management and mortgage assistance — end-to-end property services from Premora Realty.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        eyebrow="WHAT WE DO"
        title="End-to-end property services"
        description="Whatever your goal, a dedicated Premora advisor guides you from first conversation to final handover."
        hue={150}
      />

      <Container className="py-8">
        <ServiceList />
      </Container>

      <Container className="py-12">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-gold/25 bg-gradient-to-br from-primary-deep via-deeper to-burgundy-deep/60 px-8 py-14 text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-balance font-serif text-3xl sm:text-4xl">
              Not sure where to start? Book a free consultation and we’ll map out
              your options.
            </h2>
            <BookConsultationButton variant="gold" size="lg" />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
