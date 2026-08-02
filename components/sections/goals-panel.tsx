'use client';

import { useTranslations } from 'next-intl';
import { goals } from '@/data/site';
import { Icon } from '@/components/ui/icon';

/**
 * "Goals We Support" — the sidebar companion to the featured listings on the
 * home page. Replaces the previous vanity-metric panel.
 */
export function GoalsPanel() {
  const t = useTranslations('home');
  return (
    <div className="relative h-full overflow-hidden rounded-card border border-gold/15 bg-gradient-to-br from-primary-deep/60 to-deeper p-7 shadow-card">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
      <span className="eyebrow relative">{t('numbersTitle')}</span>
      <span className="relative mt-3 block rule-burgundy-gold" aria-hidden />
      <dl className="relative mt-6 flex flex-col gap-6">
        {goals.map((g) => (
          <div key={g.title} className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-burgundy-gold text-warm">
              <Icon name={g.icon} className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-1">
              <dt className="font-serif text-xl leading-tight text-warm">
                {g.title}
              </dt>
              <dd className="text-sm leading-relaxed text-muted">{g.desc}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
