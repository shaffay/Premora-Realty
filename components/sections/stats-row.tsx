'use client';

import { CountUp } from '@/components/ui/count-up';
import { Icon } from '@/components/ui/icon';
import { RevealStagger, revealItem } from '@/components/ui/reveal';
import { motion } from 'framer-motion';
import { stats } from '@/data/site';

export function StatsRow() {
  return (
    <RevealStagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={revealItem}
          className="flex flex-col items-center gap-2 rounded-card border border-gold/15 bg-card p-6 text-center"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy-gold text-warm">
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
          <span className="font-serif text-4xl font-semibold text-gold">
            <CountUp value={s.value} suffix={s.suffix} />
          </span>
          <span className="text-sm text-muted">{s.label}</span>
        </motion.div>
      ))}
    </RevealStagger>
  );
}
