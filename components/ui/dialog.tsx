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
      <DialogPrimitive.Overlay className="dialog-overlay fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
      {/* Centering + safe-area viewport: scrolls as a whole if the modal is
          ever taller than the screen, with a guaranteed gutter on every side. */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
        <DialogPrimitive.Content
          className={cn(
            'dialog-pop relative my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col',
            'card-surface overflow-hidden p-0 shadow-card-hover focus:outline-none',
            className,
          )}
        >
          <div className="accent-bar shrink-0" />
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8">
            {children}
          </div>
          {showClose && (
            <DialogPrimitive.Close
              className="absolute end-4 top-5 grid h-9 w-9 place-items-center rounded-full bg-panel/60 text-muted backdrop-blur transition hover:bg-white/10 hover:text-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  );
}
