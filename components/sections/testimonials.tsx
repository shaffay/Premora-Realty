'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { RevealStagger, revealItem } from '@/components/ui/reveal';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <Container className="relative">
        <SectionHeading
          eyebrow={t('testimonialsEyebrow')}
          title={t('testimonialsTitle')}
          align="center"
          rule="burgundy-gold"
        />
        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((tst) => (
            <motion.figure
              key={tst.id}
              variants={revealItem}
              className="relative flex flex-col gap-5 rounded-card border border-gold/15 bg-card p-7 shadow-card"
            >
              <Quote className="h-8 w-8 text-burgundy-bright/70" />
              <blockquote className="font-serif text-xl leading-relaxed text-ink">
                “{tst.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy-gold font-semibold text-warm">
                  {tst.initials}
                </span>
                <span className="flex flex-col">
                  <span className="font-medium text-warm">{tst.name}</span>
                  <span className="text-xs text-muted">{tst.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
