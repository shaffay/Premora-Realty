'use client';

import { useId, useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Small ⓘ affordance that explains a figure or label.
 *
 * Opens on hover and focus for pointer/keyboard users, and toggles on click so
 * it is reachable on touch devices where hover never fires.
 */
export function InfoTip({
  label,
  text,
  className,
}: {
  /** What the tip describes — announced to screen readers. */
  label: string;
  text: string;
  className?: string;
}) {
  const id = useId();
  const [pinned, setPinned] = useState(false);

  return (
    <span className={cn('relative inline-flex align-middle', className)}>
      <button
        type="button"
        aria-label={`About ${label}`}
        aria-describedby={id}
        aria-expanded={pinned}
        onClick={() => setPinned((v) => !v)}
        onBlur={() => setPinned(false)}
        className="peer grid h-4 w-4 place-items-center rounded-full text-gold/60 transition hover:text-gold focus:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
      >
        <Info className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span
        id={id}
        role="tooltip"
        className={cn(
          'pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-lg border border-gold/25 bg-[#0b1610] p-3 text-start text-xs font-normal normal-case leading-relaxed tracking-normal text-body opacity-0 shadow-card transition-opacity duration-150',
          'peer-hover:opacity-100 peer-focus:opacity-100',
          pinned && 'opacity-100',
        )}
      >
        {text}
      </span>
    </span>
  );
}
