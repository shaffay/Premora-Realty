'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { locales, type Locale } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

const labels: Record<Locale, string> = { en: 'EN', ar: 'ع' };

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- pathname/params typing across locales
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full border border-gold/20 p-0.5',
        isPending && 'opacity-60',
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <Globe className="ml-1.5 h-3.5 w-3.5 text-gold/70" aria-hidden />
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          className={cn(
            'rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide transition',
            l === locale
              ? 'bg-gold/15 text-gold'
              : 'text-dim hover:text-warm',
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
