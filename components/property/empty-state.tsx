'use client';

import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState({ onReset }: { onReset: () => void }) {
  const tp = useTranslations('properties');
  return (
    <div className="card-surface flex flex-col items-center gap-4 px-6 py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-burgundy/15 text-burgundy-bright">
        <SearchX className="h-7 w-7" />
      </span>
      <h3 className="font-serif text-2xl text-warm">{tp('emptyTitle')}</h3>
      <p className="max-w-sm text-sm text-muted">{tp('emptyBody')}</p>
      <Button variant="gold" size="md" onClick={onReset}>
        {tp('reset')}
      </Button>
    </div>
  );
}
