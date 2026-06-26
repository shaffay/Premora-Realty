'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import type { Property } from '@/data/types';
import type { Locale } from '@/lib/i18n/routing';
import { formatPriceShort } from '@/lib/format';
import { cn } from '@/lib/utils';

// Approximate geographic bounds of the Dubai listings.
const BOUNDS = { minLat: 25.04, maxLat: 25.22, minLng: 55.12, maxLng: 55.37 };

function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100;
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100;
  return {
    left: `${Math.min(92, Math.max(6, x))}%`,
    top: `${Math.min(88, Math.max(8, y))}%`,
  };
}

export function MapFallback({
  properties,
  selectedId,
  onSelect,
}: {
  properties: Property[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const tp = useTranslations('properties');
  const locale = useLocale() as Locale;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-card border border-gold/15 bg-gradient-to-br from-[#0c1a13] to-[#081008]">
      {/* faux map grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(203,163,92,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(203,163,92,.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* faux coastline */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,72 C20,66 32,78 46,70 C60,62 70,74 84,66 C92,61 96,64 100,60 L100,100 L0,100 Z"
          fill="rgba(30,91,64,.18)"
          stroke="rgba(203,163,92,.18)"
          strokeWidth="0.3"
        />
      </svg>

      <span className="absolute start-4 top-4 z-10 rounded-full border border-gold/20 bg-black/40 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-gold/80 backdrop-blur">
        {tp('mapPreview')}
      </span>

      {properties.map((p) => {
        const pos = project(p.lat, p.lng);
        const active = selectedId === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            style={pos}
            aria-label={`${p.title} — ${formatPriceShort(p.price, locale)}`}
            aria-pressed={active}
            className={cn(
              'absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold shadow-card transition-all',
              active
                ? 'z-30 scale-110 bg-gold text-deeper ring-2 ring-gold/50'
                : 'bg-burgundy text-warm hover:scale-105 hover:bg-burgundy-bright',
            )}
          >
            {formatPriceShort(p.price, locale)}
            <span
              className={cn(
                'absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45',
                active ? 'bg-gold' : 'bg-burgundy',
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
