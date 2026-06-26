'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { BookConsultationButton } from '@/components/layout/book-consultation-button';

export function CtaBand() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <section className="relative py-12">
      <Container>
        <Reveal className="on-dark relative overflow-hidden rounded-[28px] border border-gold/25 bg-gradient-to-br from-[#102a1e] via-[#081109] to-[#4a1020]/80 px-8 py-16 text-center shadow-card-hover sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-80" />
          <div className="skyline-dots pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <span className="accent-bar w-20 rounded-full" />
            <h2 className="text-balance font-serif text-4xl sm:text-5xl">
              {t('ctaTitle')}
            </h2>
            <p className="text-base leading-relaxed text-body">
              {t('ctaSubtitle')}
            </p>
            <BookConsultationButton variant="gold" size="lg">
              {tc('bookFreeConsultation')}
            </BookConsultationButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
