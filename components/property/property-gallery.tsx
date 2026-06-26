'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Property } from '@/data/types';
import { SkylinePlaceholder } from '@/components/ui/skyline-placeholder';
import { FavoriteButton } from './favorite-button';
import { cn } from '@/lib/utils';

const VIEWS = ['Hero', 'Living', 'Kitchen', 'Master Suite', 'View'];

export function PropertyGallery({ property }: { property: Property }) {
  const [active, setActive] = useState(0);

  // Vary the hue slightly per "photo" to differentiate frames.
  const frames = VIEWS.map((label, i) => ({
    label: `${property.typeLabel} · ${label}`,
    hue: (property.hue + i * 14) % 360,
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-gold/15">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <SkylinePlaceholder
            hue={frames[active]!.hue}
            label={frames[active]!.label}
            intensity="rich"
          />
        </motion.div>
        <span className="absolute start-4 top-4 rounded-full bg-burgundy-gold px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-warm">
          {property.badge}
        </span>
        <FavoriteButton
          propertyId={property.id}
          className="absolute end-4 top-4 h-11 w-11"
        />
      </div>

      <div className="grid grid-cols-5 gap-3">
        {frames.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show ${f.label}`}
            aria-pressed={active === i}
            className={cn(
              'relative aspect-[4/3] overflow-hidden rounded-xl border transition',
              active === i
                ? 'border-gold/70 ring-1 ring-gold/40'
                : 'border-gold/10 opacity-70 hover:opacity-100',
            )}
          >
            <SkylinePlaceholder hue={f.hue} showSkyline={i % 2 === 0} />
          </button>
        ))}
      </div>
    </div>
  );
}
