'use client';

import { motion } from 'framer-motion';
import { RevealStagger, revealItem } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { services } from '@/data/services';

export function ServiceList() {
  return (
    <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <motion.article
          key={s.slug}
          variants={revealItem}
          className="group relative flex flex-col gap-4 overflow-hidden rounded-card border border-gold/15 bg-card p-7 transition hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card"
        >
          <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-burgundy/10 blur-2xl transition group-hover:bg-burgundy/20" />
          <div className="relative flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-burgundy-gold text-warm shadow-gold">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <span className="font-serif text-5xl font-semibold text-white/5">
              0{i + 1}
            </span>
          </div>
          <h3 className="relative font-serif text-2xl text-warm">{s.title}</h3>
          <p className="relative text-sm leading-relaxed text-muted">{s.desc}</p>
        </motion.article>
      ))}
    </RevealStagger>
  );
}
