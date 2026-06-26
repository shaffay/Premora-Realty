'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Icon } from '@/components/ui/icon';
import { RevealStagger, revealItem } from '@/components/ui/reveal';
import { motion } from 'framer-motion';
import { whyChoose } from '@/data/site';

export function WhyChoose() {
  const t = useTranslations('home');

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-40" />
      <Container className="relative">
        <SectionHeading
          eyebrow={t('whyEyebrow')}
          title={t('whyTitle')}
          align="center"
          rule="burgundy-gold"
        />
        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((w) => (
            <motion.div
              key={w.title}
              variants={revealItem}
              className="group relative overflow-hidden rounded-card border border-gold/15 bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card"
            >
              <span className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-burgundy/10 blur-2xl transition group-hover:bg-burgundy/20" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-burgundy-gold text-warm shadow-gold">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-serif text-2xl text-warm">
                {w.title}
              </h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-muted">
                {w.desc}
              </p>
            </motion.div>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
