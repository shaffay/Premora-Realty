'use client';

import { motion } from 'framer-motion';
import { RevealStagger, revealItem } from '@/components/ui/reveal';
import { MediaImage } from '@/components/ui/media-image';
import { agents } from '@/data/agents';

export function TeamGrid() {
  return (
    <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {agents.map((a) => (
        <motion.div
          key={a.id}
          variants={revealItem}
          className="group flex flex-col overflow-hidden rounded-card border border-gold/15 bg-card transition hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-card"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <MediaImage
              src={a.avatar}
              alt={a.name}
              hue={(a.name.length * 30) % 360}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              imageClassName="object-cover object-top transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <span className="absolute bottom-3 start-3 grid h-12 w-12 place-items-center rounded-full bg-burgundy-gold font-semibold text-warm">
              {a.initials}
            </span>
          </div>
          <div className="flex flex-col gap-1 p-5">
            <h3 className="font-serif text-xl text-warm">{a.name}</h3>
            <p className="text-sm text-gold/80">{a.role}</p>
            <p className="mt-1 text-xs text-dim">{a.languages.join(' · ')}</p>
          </div>
        </motion.div>
      ))}
    </RevealStagger>
  );
}
