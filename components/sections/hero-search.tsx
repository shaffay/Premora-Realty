'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { useRouter } from '@/lib/i18n/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { communities } from '@/data/communities';
import { priceBands, typeOptions } from '@/lib/constants';

export function HeroSearch() {
  const t = useTranslations('home');
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  function onSearch() {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (price) params.set('price', price);
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : '/properties');
  }

  return (
    <div className="glass grid gap-3 rounded-2xl border border-gold/20 p-3 shadow-card-hover sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger aria-label={t('searchLocation')}>
          <SelectValue placeholder={t('searchLocation')} />
        </SelectTrigger>
        <SelectContent>
          {communities.map((c) => (
            <SelectItem key={c.slug} value={c.slug}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type} onValueChange={setType}>
        <SelectTrigger aria-label={t('searchType')}>
          <SelectValue placeholder={t('searchType')} />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={price} onValueChange={setPrice}>
        <SelectTrigger aria-label={t('searchPrice')}>
          <SelectValue placeholder={t('searchPrice')} />
        </SelectTrigger>
        <SelectContent>
          {priceBands.map((b) => (
            <SelectItem key={b.id} value={b.id}>
              {b.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="gold" size="lg" onClick={onSearch} className="lg:px-6">
        <Search className="h-4 w-4" />
        {t('searchCta')}
      </Button>
    </div>
  );
}
