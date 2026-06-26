'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Play, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { HeroSearch } from './hero-search';

export function Hero() {
  const t = useTranslations('home');
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-28"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed warm golden-hour Dubai skyline */}
      <div className="absolute inset-0 -z-20 bg-base" />
      <motion.div style={{ y }} className="absolute inset-0 -z-10 h-[115%]">
        <Image
          src="/images/hero-skyline.webp"
          alt="The Dubai Business Bay skyline at dusk with the Burj Khalifa reflected on the water"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Legibility + warmth: dark on the left for the headline, skyline revealed on the right */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-base via-base/70 to-base/10" />
      {/* Deepen the bottom for the search bar and the top for the glass nav */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-base via-transparent to-base/45" />
      {/* Brand atmosphere: burgundy upper-left, warm gold glow over the skyline */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(70% 60% at 12% 14%, rgba(138,31,61,.28), transparent 60%), radial-gradient(55% 70% at 78% 42%, rgba(203,163,92,.18), transparent 62%)',
        }}
      />
      {/* Subtle cinematic vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(8,17,9,.55) 100%)',
        }}
      />

      <Container className="relative w-full">
        <motion.div style={{ opacity }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <Image
              src="/images/premora-monogram.png"
              alt="Premora Realty monogram"
              width={120}
              height={98}
              priority
              className="h-20 w-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)] sm:h-24"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="eyebrow"
          >
            {t('eyebrow')}
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-4 text-balance font-serif text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl"
          >
            <span className="gold-shimmer">{t('title')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-body"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/properties">
                {t('searchCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#featured">
                <Play className="h-4 w-4" />
                {t('watchVideo')}
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 max-w-4xl"
        >
          <HeroSearch />
        </motion.div>
      </Container>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
        <ChevronDown className="h-6 w-6 text-gold/60 motion-safe:animate-scrollCue" />
      </div>
    </section>
  );
}
