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
      {/* Premium dark base + atmospheric burgundy / gold washes */}
      <div className="absolute inset-0 -z-20 bg-base" />
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(85% 60% at 18% 12%, rgba(138,31,61,.24), transparent 60%), radial-gradient(70% 55% at 88% 18%, rgba(203,163,92,.12), transparent 60%)',
        }}
      />

      {/* Skyline silhouette anchored to the horizon, with a gold glow rising behind it */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 bottom-0 -z-10 h-[60%] sm:h-[64%]"
      >
        <div
          className="absolute inset-x-0 bottom-0 h-3/4"
          style={{
            background:
              'radial-gradient(70% 120% at 50% 100%, rgba(203,163,92,.26), rgba(138,31,61,.10) 45%, transparent 72%)',
          }}
        />
        <Image
          src="/images/dubai-skyline.png"
          alt="The Dubai skyline featuring the Burj Khalifa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* horizon glow line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        {/* fade the skyline base seamlessly into the page */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-base to-transparent" />
      </motion.div>

      {/* gentle top vignette so the headline reads cleanly */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-base/40 via-transparent to-transparent" />

      <Container className="relative w-full">
        <motion.div style={{ opacity }} className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
