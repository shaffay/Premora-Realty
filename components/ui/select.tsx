'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  'aria-label': ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}) {
  return (
    <SelectPrimitive.Trigger
      aria-label={ariaLabel}
      className={cn(
        'flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-gold/20 bg-deeper/60 px-4 text-sm text-warm transition',
        'hover:border-gold/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 data-[placeholder]:text-dim',
        className,
      )}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 text-gold/70" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={6}
        className="z-[120] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg border border-gold/20 bg-panel shadow-card-hover"
      >
        <SelectPrimitive.Viewport className="p-1.5">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <SelectPrimitive.Item
      value={value}
      className="relative flex cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-3 text-sm text-body outline-none transition data-[highlighted]:bg-primary/30 data-[highlighted]:text-warm"
    >
      <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-3.5 w-3.5 text-gold" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
