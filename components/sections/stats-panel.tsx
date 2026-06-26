'use client';

import { useTranslations } from 'next-intl';
import { stats } from '@/data/site';
import { CountUp } from '@/components/ui/count-up';
import { Icon } from '@/components/ui/icon';

export function StatsPanel() {
  const t = useTranslations('home');
  return (
    <div className="relative overflow-hidden rounded-card border border-gold/15 bg-gradient-to-br from-primary-deep/60 to-deeper p-7 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
      <span className="eyebrow relative">{t('numbersTitle')}</span>
      <span className="relative mt-3 block rule-burgundy-gold" aria-hidden />
      <dl className="relative mt-6 grid grid-cols-2 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-2">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy-gold text-warm">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <dd className="font-serif text-4xl font-semibold text-gold">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
            <dt className="text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
