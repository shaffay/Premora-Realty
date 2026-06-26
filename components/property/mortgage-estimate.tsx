'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import type { Property } from '@/data/types';
import type { Locale } from '@/lib/i18n/routing';
import { calculateMortgage } from '@/lib/calculator';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/button';

const DOWN_PCT = 20;
const RATE = 4.5;
const TERM = 25;

export function MortgageEstimate({ property }: { property: Property }) {
  const t = useTranslations('detail');
  const locale = useLocale() as Locale;

  const { monthlyPayment } = calculateMortgage({
    price: property.price,
    downPaymentPct: DOWN_PCT,
    interestRate: RATE,
    termYears: TERM,
  });

  const calcHref = `/investment?price=${property.price}&down=${DOWN_PCT}&rate=${RATE}&term=${TERM}`;

  return (
    <div className="card-surface flex flex-col gap-3 p-6">
      <span className="eyebrow text-gold/70">{t('estimateMortgage')}</span>
      <div className="flex items-end gap-1">
        <span className="font-serif text-4xl font-semibold text-gold">
          {formatPrice(monthlyPayment, locale)}
        </span>
        <span className="mb-1 text-sm text-muted">{t('perMonth')}</span>
      </div>
      <p className="text-xs text-dim">{t('estimateNote')}</p>
      <Button asChild variant="outline" size="md" className="mt-1 self-start">
        <Link href={calcHref}>
          {t('openCalculator')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
