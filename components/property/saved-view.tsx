'use client';

import { Heart, Bookmark, Clock, X, ArrowRight, SearchX } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useFavorites } from '@/store/favorites';
import { useRecentlyViewed } from '@/store/recently-viewed';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { properties as allProperties } from '@/data/properties';
import { PropertyCard } from './property-card';
import { Button } from '@/components/ui/button';

export function SavedView() {
  const mounted = useHasMounted();
  const favorites = useFavorites((s) => s.favorites);
  const savedSearches = useFavorites((s) => s.savedSearches);
  const removeSearch = useFavorites((s) => s.removeSearch);
  const recentIds = useRecentlyViewed((s) => s.ids);

  if (!mounted) {
    return <div className="h-40" />;
  }

  const favProps = favorites
    .map((id) => allProperties.find((p) => p.id === id))
    .filter(Boolean);
  const recentProps = recentIds
    .map((id) => allProperties.find((p) => p.id === id))
    .filter(Boolean);

  const empty = favProps.length === 0 && savedSearches.length === 0;

  return (
    <div className="flex flex-col gap-16">
      <section>
        <h2 className="flex items-center gap-2 font-serif text-3xl text-warm">
          <Heart className="h-6 w-6 text-burgundy-bright" />
          Saved Properties
        </h2>
        <span className="mt-3 block rule-gold" aria-hidden />
        {favProps.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favProps.map(
              (p, i) => p && <PropertyCard key={p.id} property={p} index={i} />,
            )}
          </div>
        ) : (
          <div className="card-surface mt-8 flex flex-col items-center gap-4 px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-burgundy/15 text-burgundy-bright">
              <SearchX className="h-6 w-6" />
            </span>
            <p className="text-muted">
              You haven’t saved any properties yet. Tap the heart on any listing to
              keep it here.
            </p>
            <Button asChild variant="gold" size="md">
              <Link href="/properties">
                Browse properties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {savedSearches.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 font-serif text-3xl text-warm">
            <Bookmark className="h-6 w-6 text-gold" />
            Saved Searches
          </h2>
          <span className="mt-3 block rule-gold" aria-hidden />
          <div className="mt-6 flex flex-wrap gap-3">
            {savedSearches.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-2 rounded-full border border-gold/20 bg-card py-2 ps-4 pe-2 text-sm"
              >
                <Link
                  href={s.query ? `/properties?${s.query}` : '/properties'}
                  className="text-body transition hover:text-gold"
                >
                  {s.label}
                </Link>
                <button
                  onClick={() => removeSearch(s.id)}
                  aria-label={`Remove ${s.label}`}
                  className="grid h-6 w-6 place-items-center rounded-full text-dim transition hover:bg-white/5 hover:text-warm"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {recentProps.length > 0 && (
        <section>
          <h2 className="flex items-center gap-2 font-serif text-3xl text-warm">
            <Clock className="h-6 w-6 text-gold" />
            Recently Viewed
          </h2>
          <span className="mt-3 block rule-gold" aria-hidden />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentProps.map(
              (p, i) =>
                p && (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    index={i}
                    showCompare={false}
                  />
                ),
            )}
          </div>
        </section>
      )}

      {empty && recentProps.length === 0 && null}
    </div>
  );
}
