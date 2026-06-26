'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className,
  children,
  showClose = true,
}: {
  className?: string;
  children: React.ReactNode;
  showClose?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm data-[state=open]:animate-fadeUp" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-[101] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
          'card-surface overflow-hidden p-0 shadow-card-hover',
          'data-[state=open]:animate-fadeUp focus:outline-none',
          className,
        )}
      >
        <div className="accent-bar" />
        <div className="p-6 sm:p-8">{children}</div>
        {showClose && (
          <DialogPrimitive.Close
            className="absolute right-4 top-5 grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-white/5 hover:text-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
