import { describe, it, expect } from 'vitest';
import {
  parseFilters,
  filtersToParams,
  applyFilters,
  sortProperties,
  defaultFilters,
  hasActiveFilters,
} from '@/lib/filters';
import { properties } from '@/data/properties';

describe('parseFilters', () => {
  it('falls back to defaults for missing or invalid params', () => {
    const filters = parseFilters(new URLSearchParams(''));
    expect(filters).toEqual(defaultFilters);
  });

  it('rejects invalid enum values', () => {
    const filters = parseFilters(
      new URLSearchParams('type=Spaceship&sort=banana&beds=99&price=zillion'),
    );
    expect(filters.type).toBe('');
    expect(filters.sort).toBe('featured');
    expect(filters.beds).toBe('any');
    expect(filters.price).toBe('');
  });

  it('parses valid params', () => {
    const filters = parseFilters(
      new URLSearchParams('location=palm-jumeirah&type=Villa&view=map'),
    );
    expect(filters.location).toBe('palm-jumeirah');
    expect(filters.type).toBe('Villa');
    expect(filters.view).toBe('map');
  });
});

describe('filtersToParams', () => {
  it('omits default values from the query string', () => {
    const params = filtersToParams(defaultFilters);
    expect(params.toString()).toBe('');
  });

  it('round-trips non-default filters', () => {
    const source = {
      ...defaultFilters,
      location: 'dubai-marina',
      type: 'Apartment',
      sort: 'price-asc' as const,
    };
    const restored = parseFilters(filtersToParams(source));
    expect(restored.location).toBe('dubai-marina');
    expect(restored.type).toBe('Apartment');
    expect(restored.sort).toBe('price-asc');
  });
});

describe('applyFilters', () => {
  it('filters by community', () => {
    const result = applyFilters(properties, {
      ...defaultFilters,
      location: 'palm-jumeirah',
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.communitySlug === 'palm-jumeirah')).toBe(true);
  });

  it('filters by price band (1M–3M, upper bound exclusive)', () => {
    const result = applyFilters(properties, {
      ...defaultFilters,
      price: '1m-3m',
    });
    expect(result.every((p) => p.price >= 1_000_000 && p.price < 3_000_000)).toBe(
      true,
    );
  });

  it('filters by minimum bedrooms', () => {
    const result = applyFilters(properties, { ...defaultFilters, beds: '4' });
    expect(result.every((p) => p.beds >= 4)).toBe(true);
  });

  it('matches free-text search against title and community', () => {
    const result = applyFilters(properties, {
      ...defaultFilters,
      q: 'penthouse',
    });
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((p) =>
        `${p.title} ${p.typeLabel}`.toLowerCase().includes('penthouse'),
      ),
    ).toBe(true);
  });

  it('returns an empty array when nothing matches', () => {
    const result = applyFilters(properties, {
      ...defaultFilters,
      q: 'nonexistent-zzzz',
    });
    expect(result).toHaveLength(0);
  });
});

describe('sortProperties', () => {
  it('sorts by price ascending and descending', () => {
    const asc = sortProperties(properties, 'price-asc');
    const desc = sortProperties(properties, 'price-desc');
    expect(asc[0]!.price).toBeLessThanOrEqual(asc[asc.length - 1]!.price);
    expect(desc[0]!.price).toBeGreaterThanOrEqual(desc[desc.length - 1]!.price);
  });

  it('sorts largest by square footage', () => {
    const largest = sortProperties(properties, 'largest');
    expect(largest[0]!.sqft).toBeGreaterThanOrEqual(largest[1]!.sqft);
  });
});

describe('hasActiveFilters', () => {
  it('is false for defaults and true once a filter is set', () => {
    expect(hasActiveFilters(defaultFilters)).toBe(false);
    expect(hasActiveFilters({ ...defaultFilters, type: 'Villa' })).toBe(true);
  });
});
