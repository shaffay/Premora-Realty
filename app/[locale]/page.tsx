import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { FeaturedProperties } from '@/components/sections/featured-properties';
import { WhyChoose } from '@/components/sections/why-choose';
import { CommunitiesStrip } from '@/components/sections/communities-strip';
import { Testimonials } from '@/components/sections/testimonials';
import { CtaBand } from '@/components/sections/cta-band';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyChoose />
      <CommunitiesStrip />
      <Testimonials />
      <CtaBand />
    </>
  );
}
