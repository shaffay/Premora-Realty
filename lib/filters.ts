import type { Property } from '@/data/types';
import {
  priceBands,
  bedroomOptions,
  type SortKey,
  typeOptions,
} from './constants';

export type Filters = {
  location: string;
  type: string;
  price: string;
  beds: string;
  q: string;
  sort: SortKey;
  view: 'grid' | 'map';
};

export const defaultFilters: Filters = {
  location: '',
  type: '',
  price: '',
  beds: 'any',
  q: '',
  sort: 'featured',
  view: 'grid',
};

const validSorts: SortKey[] = [
  'featured',
  'price-asc',
  'price-desc',
  'newest',
  'largest',
];

/** Parse URL search params into a typed, validated Filters object. */
export function parseFilters(
  params: URLSearchParams | Record<string, string | undefined>,
): Filters {
  const get = (key: string): string => {
    if (params instanceof URLSearchParams) return params.get(key) ?? '';
    return params[key] ?? '';
  };

  const sort = get('sort') as SortKey;
  const view = get('view');
  const beds = get('beds');

  return {
    location: get('location'),
    type: typeOptions.includes(get('type') as never) ? get('type') : '',
    price: priceBands.some((b) => b.id === get('price')) ? get('price') : '',
    beds: bedroomOptions.some((b) => b.id === beds) ? beds : 'any',
    q: get('q'),
    sort: validSorts.includes(sort) ? sort : 'featured',
    view: view === 'map' ? 'map' : 'grid',
  };
}

/** Serialize Filters back into URLSearchParams, omitting defaults. */
export function filtersToParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.location) params.set('location', filters.location);
  if (filters.type) params.set('type', filters.type);
  if (filters.price) params.set('price', filters.price);
  if (filters.beds && filters.beds !== 'any') params.set('beds', filters.beds);
  if (filters.q) params.set('q', filters.q);
  if (filters.sort !== 'featured') params.set('sort', filters.sort);
  if (filters.view !== 'grid') params.set('view', filters.view);
  return params;
}

export function applyFilters(
  properties: Property[],
  filters: Filters,
): Property[] {
  let result = properties.filter((p) => {
    if (filters.location && p.communitySlug !== filters.location) return false;
    if (filters.type && p.type !== filters.type) return false;

    if (filters.price) {
      const band = priceBands.find((b) => b.id === filters.price);
      if (band) {
        if (p.price < band.min) return false;
        if (band.max !== null && p.price >= band.max) return false;
      }
    }

    if (filters.beds && filters.beds !== 'any') {
      const opt = bedroomOptions.find((b) => b.id === filters.beds);
      if (opt && opt.min !== null && p.beds < opt.min) return false;
    }

    if (filters.q) {
      const q = filters.q.toLowerCase().trim();
      const haystack =
        `${p.title} ${p.community} ${p.typeLabel} ${p.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  result = sortProperties(result, filters.sort);
  return result;
}

export function sortProperties(
  properties: Property[],
  sort: SortKey,
): Property[] {
  const sorted = [...properties];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'newest':
      return sorted.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
    case 'largest':
      return sorted.sort((a, b) => b.sqft - a.sqft);
    case 'featured':
    default:
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price,
      );
  }
}

export function hasActiveFilters(filters: Filters): boolean {
  return Boolean(
    filters.location ||
      filters.type ||
      filters.price ||
      (filters.beds && filters.beds !== 'any') ||
      filters.q,
  );
}
