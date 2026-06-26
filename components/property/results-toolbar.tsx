'use client';

import { useTranslations } from 'next-intl';
import { LayoutGrid, Map, BookmarkPlus, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { sortOptions, type SortKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function ResultsToolbar({
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
  onSaveSearch,
  searchSaved,
}: {
  count: number;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  view: 'grid' | 'map';
  onViewChange: (view: 'grid' | 'map') => void;
  onSaveSearch: () => void;
  searchSaved: boolean;
}) {
  const tp = useTranslations('properties');
  const ts = useTranslations('sort');

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted">
        <span className="font-serif text-2xl text-gold">{count}</span>{' '}
        {tp('resultsFound', { count }).replace(/^\d+\s*/, '')}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortKey)}>
          <SelectTrigger aria-label={tp('sort')} className="h-10 w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {ts(opt.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={onSaveSearch}
          disabled={searchSaved}
          className="h-10"
        >
          {searchSaved ? (
            <Check className="h-4 w-4 text-gold" />
          ) : (
            <BookmarkPlus className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {searchSaved ? tp('searchSaved') : tp('saveSearch')}
          </span>
        </Button>

        <div className="flex h-10 items-center rounded-full border border-gold/20 p-0.5">
          <button
            onClick={() => onViewChange('grid')}
            aria-pressed={view === 'grid'}
            aria-label={tp('grid')}
            className={cn(
              'flex h-full items-center gap-1.5 rounded-full px-3 text-sm transition',
              view === 'grid' ? 'bg-gold/15 text-gold' : 'text-dim hover:text-warm',
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">{tp('grid')}</span>
          </button>
          <button
            onClick={() => onViewChange('map')}
            aria-pressed={view === 'map'}
            aria-label={tp('map')}
            className={cn(
              'flex h-full items-center gap-1.5 rounded-full px-3 text-sm transition',
              view === 'map' ? 'bg-gold/15 text-gold' : 'text-dim hover:text-warm',
            )}
          >
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">{tp('map')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
