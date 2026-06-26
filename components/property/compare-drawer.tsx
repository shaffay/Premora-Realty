'use client';

import { useLocale } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, GitCompareArrows } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useCompare } from '@/store/compare';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { properties as allProperties } from '@/data/properties';
import { formatPrice } from '@/lib/format';
import type { Locale } from '@/lib/i18n/routing';
import { SkylinePlaceholder } from '@/components/ui/skyline-placeholder';
import { Button } from '@/components/ui/button';

export function CompareDrawer() {
  const mounted = useHasMounted();
  const ids = useCompare((s) => s.ids);
  const remove = useCompare((s) => s.remove);
  const clear = useCompare((s) => s.clear);
  const locale = useLocale() as Locale;

  const items = mounted
    ? ids.map((id) => allProperties.find((p) => p.id === id)).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
          className="fixed inset-x-0 bottom-16 z-40 mx-auto w-[calc(100vw-1.5rem)] max-w-4xl sm:bottom-4"
        >
          <div className="card-surface flex flex-col gap-3 p-4 shadow-card-hover">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-warm">
                <GitCompareArrows className="h-4 w-4 text-gold" />
                Compare ({items.length}/3)
              </span>
              <button
                onClick={clear}
                className="text-xs text-dim transition hover:text-warm"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {items.map(
                (p) =>
                  p && (
                    <div
                      key={p.id}
                      className="relative overflow-hidden rounded-xl border border-gold/15 bg-deeper"
                    >
                      <button
                        onClick={() => remove(p.id)}
                        aria-label={`Remove ${p.title}`}
                        className="absolute end-1.5 top-1.5 z-10 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-warm transition hover:bg-burgundy"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <div className="relative h-16 w-full">
                        <SkylinePlaceholder hue={p.hue} showSkyline={false} />
                      </div>
                      <div className="p-2">
                        <p className="truncate text-xs font-medium text-warm">
                          {p.title}
                        </p>
                        <p className="text-[0.7rem] text-gold">
                          {formatPrice(p.price, locale)}
                        </p>
                        <p className="mt-0.5 text-[0.65rem] text-dim">
                          {p.beds === 0 ? 'Studio' : `${p.beds} bd`} ·{' '}
                          {p.baths} ba · {p.sqft.toLocaleString()} ft²
                        </p>
                      </div>
                    </div>
                  ),
              )}
              {items.length < 3 && (
                <div className="grid place-items-center rounded-xl border border-dashed border-gold/20 p-2 text-center text-[0.7rem] text-dim">
                  Add up to {3 - items.length} more
                </div>
              )}
            </div>
            <Button asChild variant="outline" size="sm" className="self-end">
              <Link href="/properties">Keep browsing</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
