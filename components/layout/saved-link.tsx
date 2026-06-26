'use client';

import { Heart } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { useFavorites } from '@/store/favorites';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { cn } from '@/lib/utils';

export function SavedLink({ className }: { className?: string }) {
  const mounted = useHasMounted();
  const count = useFavorites((s) => s.favorites.length);

  return (
    <Link
      href="/saved"
      aria-label={`Saved properties${mounted && count ? ` (${count})` : ''}`}
      className={cn(
        'relative grid h-10 w-10 place-items-center rounded-full border border-gold/20 text-body transition hover:border-gold/45 hover:text-warm',
        className,
      )}
    >
      <Heart className="h-4 w-4" />
      {mounted && count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-burgundy px-1 text-[0.6rem] font-bold text-warm">
          {count}
        </span>
      )}
    </Link>
  );
}
