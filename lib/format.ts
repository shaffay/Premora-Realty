import type { Locale } from './i18n/routing';

const localeMap: Record<Locale, string> = {
  en: 'en-AE',
  ar: 'ar-AE',
};

/** Full AED price, e.g. "AED 2,450,000". */
export function formatPrice(value: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact AED price, e.g. "AED 2.45M". */
export function formatPriceShort(value: number, locale: Locale = 'en'): string {
  const abs = Math.abs(value);
  let short: string;
  if (abs >= 1_000_000) {
    short = `${trimZeros(value / 1_000_000)}M`;
  } else if (abs >= 1_000) {
    short = `${trimZeros(value / 1_000)}K`;
  } else {
    short = `${value}`;
  }
  return `${locale === 'ar' ? '' : 'AED '}${short}${locale === 'ar' ? ' د.إ' : ''}`;
}

function trimZeros(n: number): string {
  return n
    .toFixed(2)
    .replace(/\.00$/, '')
    .replace(/(\.\d)0$/, '$1');
}

export function formatNumber(value: number, locale: Locale = 'en'): string {
  return new Intl.NumberFormat(localeMap[locale]).format(value);
}

/** Price per square foot, e.g. "AED 1,690 / sq ft". */
export function formatPricePerSqft(
  price: number,
  sqft: number,
  locale: Locale = 'en',
): string {
  const perSqft = Math.round(price / sqft);
  return `${formatPrice(perSqft, locale)} / sq ft`;
}

export function bedLabel(beds: number): string {
  return beds === 0 ? 'Studio' : `${beds} Bed`;
}
