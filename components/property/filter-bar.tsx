'use client';

import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import { FilterSelect } from './filter-select';
import { Input } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import type { Filters } from '@/lib/filters';
import { hasActiveFilters } from '@/lib/filters';
import { communities } from '@/data/communities';
import { priceBands, typeOptions, bedroomOptions } from '@/lib/constants';

export function FilterBar({
  filters,
  onChange,
  onReset,
  searchValue,
  onSearchChange,
}: {
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
  onReset: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  const t = useTranslations('home');
  const tp = useTranslations('properties');

  return (
    <div className="card-surface flex flex-col gap-3 p-4">
      <div className="relative">
        <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-dim" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, community or feature…"
          aria-label="Search properties"
          className="ps-11"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          value={filters.location}
          onChange={(v) => onChange({ location: v })}
          placeholder={t('searchLocation')}
          allLabel="All Locations"
          options={communities.map((c) => ({ value: c.slug, label: c.name }))}
        />
        <FilterSelect
          value={filters.type}
          onChange={(v) => onChange({ type: v })}
          placeholder={t('searchType')}
          allLabel="All Types"
          options={typeOptions.map((tp) => ({ value: tp, label: tp }))}
        />
        <FilterSelect
          value={filters.price}
          onChange={(v) => onChange({ price: v })}
          placeholder={t('searchPrice')}
          allLabel="Any Price"
          options={priceBands.map((b) => ({ value: b.id, label: b.label }))}
        />
        <FilterSelect
          value={filters.beds === 'any' ? '' : filters.beds}
          onChange={(v) => onChange({ beds: v === '' ? 'any' : v })}
          placeholder={tp('bedrooms')}
          allLabel="Any Beds"
          options={bedroomOptions
            .filter((b) => b.id !== 'any')
            .map((b) => ({ value: b.id, label: b.label }))}
        />
      </div>

      {hasActiveFilters(filters) && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4" />
            {tp('reset')}
          </Button>
        </div>
      )}
    </div>
  );
}
