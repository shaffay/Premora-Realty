'use client';

import { Heart } from 'lucide-react';
import { motion, useAnimationControls } from 'framer-motion';
import { useFavorites } from '@/store/favorites';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { cn } from '@/lib/utils';

export function FavoriteButton({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const mounted = useHasMounted();
  const isFavorite = useFavorites((s) => s.favorites.includes(propertyId));
  const toggle = useFavorites((s) => s.toggleFavorite);
  const controls = useAnimationControls();

  const active = mounted && isFavorite;

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(propertyId);
    controls.start({
      scale: [1, 1.35, 0.9, 1],
      transition: { duration: 0.4, ease: 'easeInOut' },
    });
  }

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? 'Remove from saved' : 'Save property'}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition',
        active
          ? 'border-burgundy/60 bg-burgundy/30 text-burgundy-bright'
          : 'border-white/15 bg-black/40 text-warm hover:border-gold/50',
        className,
      )}
    >
      <motion.span animate={controls}>
        <Heart className={cn('h-4 w-4', active && 'fill-current')} />
      </motion.span>
    </button>
  );
}
