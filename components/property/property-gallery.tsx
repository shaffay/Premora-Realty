'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Property } from '@/data/types';
import { MediaImage } from '@/components/ui/media-image';
import { FavoriteButton } from './favorite-button';
import { cn } from '@/lib/utils';

// Shared interior shots used alongside each listing's hero photo.
const INTERIORS = [
  { src: '/images/living2.jpg', label: 'Living' },
  { src: '/images/kitchen.jpg', label: 'Kitchen' },
  { src: '/images/bedroom.jpg', label: 'Master Suite' },
  { src: '/images/apt-interior.jpg', label: 'Reception' },
];

export function PropertyGallery({ property }: { property: Property }) {
  const [active, setActive] = useState(0);

  const frames = [
    { src: property.image, label: `${property.typeLabel} · Feature` },
    ...INTERIORS,
  ];

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
          <MediaImage
            src={frames[active]!.src}
            alt={`${property.title} — ${frames[active]!.label}`}
            hue={property.hue}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
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
            <MediaImage
              src={f.src}
              alt={f.label}
              hue={property.hue}
              sizes="20vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
