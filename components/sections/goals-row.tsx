'use client';

import { motion } from 'framer-motion';
import { goals } from '@/data/site';
import { Icon } from '@/components/ui/icon';
import { RevealStagger, revealItem } from '@/components/ui/reveal';

/** "Goals We Support" laid out four-across — used on the About page. */
export function GoalsRow() {
  return (
    <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {goals.map((g) => (
        <motion.div
          key={g.title}
          variants={revealItem}
          className="flex flex-col gap-3 rounded-card border border-gold/15 bg-card p-6"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy-gold text-warm">
            <Icon name={g.icon} className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-xl leading-tight text-warm">
            {g.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{g.desc}</p>
        </motion.div>
      ))}
    </RevealStagger>
  );
}
