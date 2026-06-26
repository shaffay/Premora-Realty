'use client';

import { GitCompareArrows, Check } from 'lucide-react';
import { useCompare } from '@/store/compare';
import { useHasMounted } from '@/hooks/use-has-mounted';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export function CompareButton({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const mounted = useHasMounted();
  const comparing = useCompare((s) => s.ids.includes(propertyId));
  const isFull = useCompare((s) => s.ids.length >= 3);
  const toggle = useCompare((s) => s.toggle);
  const { toast } = useToast();

  const active = mounted && comparing;

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!active && isFull) {
      toast('You can compare up to 3 properties.', 'error');
      return;
    }
    toggle(propertyId);
  }

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? 'Remove from compare' : 'Add to compare'}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition',
        active
          ? 'border-gold/60 bg-gold/20 text-gold'
          : 'border-white/15 bg-black/40 text-warm hover:border-gold/50',
        className,
      )}
    >
      {active ? (
        <Check className="h-4 w-4" />
      ) : (
        <GitCompareArrows className="h-4 w-4" />
      )}
    </button>
  );
}
