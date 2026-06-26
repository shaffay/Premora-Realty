'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import { BedDouble, Bath, Maximize } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import type { Property } from '@/data/types';
import type { Locale } from '@/lib/i18n/routing';
import { formatPrice } from '@/lib/format';
import { MapFallback } from './map-fallback';
import { SkylinePlaceholder } from '@/components/ui/skyline-placeholder';
import { cn } from '@/lib/utils';

const hasMapKey = Boolean(process.env.NEXT_PUBLIC_MAPTILER_KEY);

const LiveMap = dynamic(() => import('./property-map'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center rounded-card border border-gold/15 bg-deeper text-sm text-dim">
      Loading map…
    </div>
  ),
});

export function MapView({ properties }: { properties: Property[] }) {
  const locale = useLocale() as Locale;
  const [selectedId, setSelectedId] = useState<string | null>(
    properties[0]?.id ?? null,
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
      <div className="order-2 flex max-h-[640px] flex-col gap-3 overflow-y-auto pe-1 lg:order-1">
        {properties.map((p) => {
          const active = selectedId === p.id;
          return (
            <div
              key={p.id}
              onMouseEnter={() => setSelectedId(p.id)}
              onClick={() => setSelectedId(p.id)}
              className={cn(
                'group flex gap-3 rounded-2xl border bg-card p-3 transition',
                active
                  ? 'border-gold/50 shadow-card'
                  : 'border-gold/10 hover:border-gold/30',
              )}
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                <SkylinePlaceholder hue={p.hue} showSkyline={false} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <Link
                  href={`/properties/${p.slug}`}
                  className="truncate font-serif text-lg text-warm transition hover:text-gold"
                >
                  {p.title}
                </Link>
                <span className="text-xs text-muted">{p.community}</span>
                <div className="mt-1 flex items-center gap-3 text-xs text-dim">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {p.beds === 0 ? 'Studio' : p.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {p.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="h-3.5 w-3.5" />
                    {p.sqft.toLocaleString()}
                  </span>
                </div>
                <span className="mt-auto font-serif text-lg font-semibold text-gold">
                  {formatPrice(p.price, locale)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="order-1 h-[420px] lg:order-2 lg:h-[640px]">
        {hasMapKey ? (
          <LiveMap
            properties={properties}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        ) : (
          <MapFallback
            properties={properties}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        )}
      </div>
    </div>
  );
}
