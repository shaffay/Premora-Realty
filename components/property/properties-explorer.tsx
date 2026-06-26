'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/lib/i18n/navigation';
import { useFavorites } from '@/store/favorites';
import { properties as allProperties } from '@/data/properties';
import { communities } from '@/data/communities';
import {
  parseFilters,
  filtersToParams,
  applyFilters,
  defaultFilters,
  type Filters,
} from '@/lib/filters';
import { useDebounce } from '@/hooks/use-debounce';
import { useToast } from '@/components/ui/toast';
import { FilterBar } from './filter-bar';
import { ResultsToolbar } from './results-toolbar';
import { PropertyCard } from './property-card';
import { MapView } from './map-view';
import { EmptyState } from './empty-state';
import { CardSkeletonGrid } from './property-skeleton';

function buildSearchLabel(filters: Filters): string {
  const parts: string[] = [];
  const community = communities.find((c) => c.slug === filters.location);
  if (community) parts.push(community.name);
  if (filters.type) parts.push(filters.type);
  if (filters.q) parts.push(`“${filters.q}”`);
  return parts.length ? parts.join(' · ') : 'All Dubai properties';
}

export function PropertiesExplorer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const saveSearch = useFavorites((s) => s.saveSearch);
  const savedSearches = useFavorites((s) => s.savedSearches);

  const filters = useMemo(
    () => parseFilters(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const [searchInput, setSearchInput] = useState(filters.q);
  const debouncedSearch = useDebounce(searchInput, 350);
  const firstRender = useRef(true);

  const updateUrl = useCallback(
    (next: Filters, scroll = false) => {
      const qs = filtersToParams(next).toString();
      router.replace(qs ? `/properties?${qs}` : '/properties', { scroll });
    },
    [router],
  );

  // Push debounced search into the URL.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (debouncedSearch === filters.q) return;
    updateUrl({ ...filters, q: debouncedSearch });
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the input in sync when the URL changes externally (e.g. reset).
  useEffect(() => {
    setSearchInput(filters.q);
  }, [filters.q]);

  const onChange = useCallback(
    (patch: Partial<Filters>) => updateUrl({ ...filters, ...patch }),
    [filters, updateUrl],
  );

  const onReset = useCallback(() => {
    setSearchInput('');
    updateUrl(defaultFilters);
  }, [updateUrl]);

  const results = useMemo(
    () => applyFilters(allProperties, filters),
    [filters],
  );

  const currentQuery = filtersToParams(filters).toString();
  const searchSaved = savedSearches.some((s) => s.query === currentQuery);

  function onSaveSearch() {
    saveSearch(currentQuery, buildSearchLabel(filters));
    toast('Search saved. Find it on your Saved page.');
  }

  return (
    <div className="flex flex-col gap-6">
      <FilterBar
        filters={filters}
        onChange={onChange}
        onReset={onReset}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
      />

      <ResultsToolbar
        count={results.length}
        sort={filters.sort}
        onSortChange={(sort) => onChange({ sort })}
        view={filters.view}
        onViewChange={(view) => onChange({ view })}
        onSaveSearch={onSaveSearch}
        searchSaved={searchSaved}
      />

      {results.length === 0 ? (
        <EmptyState onReset={onReset} />
      ) : filters.view === 'map' ? (
        <MapView properties={results} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export { CardSkeletonGrid };
