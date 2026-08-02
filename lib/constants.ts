import { propertyCategories } from '@/data/types';

export type PriceBand = {
  id: string;
  label: string;
  min: number;
  max: number | null;
};

export const priceBands: PriceBand[] = [
  { id: 'under-1m', label: 'Under AED 1M', min: 0, max: 1_000_000 },
  { id: '1m-3m', label: 'AED 1M – 3M', min: 1_000_000, max: 3_000_000 },
  { id: '3m-6m', label: 'AED 3M – 6M', min: 3_000_000, max: 6_000_000 },
  { id: '6m-15m', label: 'AED 6M – 15M', min: 6_000_000, max: 15_000_000 },
  { id: '15m-plus', label: 'AED 15M+', min: 15_000_000, max: null },
];

export const bedroomOptions = [
  { id: 'any', label: 'Any', min: null },
  { id: 'studio', label: 'Studio', min: 0 },
  { id: '1', label: '1+', min: 1 },
  { id: '2', label: '2+', min: 2 },
  { id: '3', label: '3+', min: 3 },
  { id: '4', label: '4+', min: 4 },
] as const;

export const typeOptions = propertyCategories;

export type SortKey =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'largest';

export const sortOptions: { id: SortKey; labelKey: string }[] = [
  { id: 'featured', labelKey: 'featured' },
  { id: 'price-asc', labelKey: 'priceAsc' },
  { id: 'price-desc', labelKey: 'priceDesc' },
  { id: 'newest', labelKey: 'newest' },
  { id: 'largest', labelKey: 'largest' },
];

export const WHATSAPP_DEFAULT = '971501234567';

export function whatsappLink(
  number = WHATSAPP_DEFAULT,
  message = 'Hello PREMORA Realty, I would like to learn more about a property.',
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
