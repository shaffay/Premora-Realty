'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { BedDouble, Bath, Maximize, MapPin } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import type { Property } from '@/data/types';
import type { Locale } from '@/lib/i18n/routing';
import { formatPrice, formatPricePerSqft } from '@/lib/format';
import { SkylinePlaceholder } from '@/components/ui/skyline-placeholder';
import { FavoriteButton } from './favorite-button';
import { CompareButton } from './compare-button';
import { cn } from '@/lib/utils';

const badgeStyles: Record<string, string> = {
  Featured: 'bg-gold/90 text-deeper',
  Signature: 'bg-burgundy-gold text-warm',
  New: 'bg-primary text-warm',
  Exclusive: 'bg-burgundy text-warm',
  'Investor Pick': 'bg-gold/15 text-gold border border-gold/40',
};

export function PropertyCard({
  property,
  index = 0,
  showCompare = true,
}: {
  property: Property;
  index?: number;
  showCompare?: boolean;
}) {
  const locale = useLocale() as Locale;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <Link
        href={`/properties/${property.slug}`}
        className="block overflow-hidden rounded-card border border-gold/15 bg-card shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/45 hover:shadow-card-hover"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <SkylinePlaceholder hue={property.hue} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <span
            className={cn(
              'absolute start-3 top-3 rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider',
              badgeStyles[property.badge] ?? badgeStyles.Featured,
            )}
          >
            {property.badge}
          </span>

          <div className="absolute end-3 top-3 flex gap-2">
            {showCompare && <CompareButton propertyId={property.id} />}
            <FavoriteButton propertyId={property.id} />
          </div>

          <div className="absolute bottom-3 start-3 flex items-center gap-1.5 text-xs text-ink/90">
            <MapPin className="h-3.5 w-3.5 text-gold" />
            {property.community}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="eyebrow text-[0.62rem] text-gold/70">
              {property.typeLabel}
            </span>
          </div>
          <h3 className="font-serif text-2xl leading-tight text-warm transition group-hover:text-gold">
            {property.title}
          </h3>

          <div className="flex items-center gap-4 border-y border-gold/10 py-3 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-gold/70" />
              {property.beds === 0 ? 'Studio' : property.beds}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-gold/70" />
              {property.baths}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-gold/70" />
              {property.sqft.toLocaleString()}
            </span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="font-serif text-2xl font-semibold text-gold">
                {formatPrice(property.price, locale)}
              </p>
              <p className="text-xs text-dim">
                {formatPricePerSqft(property.price, property.sqft, locale)}
              </p>
            </div>
            <span className="text-xs font-medium text-gold/80 transition group-hover:translate-x-0.5">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
