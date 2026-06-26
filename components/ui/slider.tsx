'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

export function Slider({
  className,
  ariaLabel,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  ariaLabel?: string;
}) {
  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex h-6 w-full touch-none select-none items-center',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10">
        <SliderPrimitive.Range className="absolute h-full bg-gold-sweep" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label={ariaLabel}
        className="block h-5 w-5 rounded-full border-2 border-gold bg-deeper shadow-[0_0_0_4px_rgba(203,163,92,.18)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 hover:scale-110"
      />
    </SliderPrimitive.Root>
  );
}
