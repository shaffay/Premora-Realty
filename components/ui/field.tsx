'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const baseInput =
  'h-12 w-full rounded-lg border border-gold/20 bg-deeper/60 px-4 text-sm text-warm transition placeholder:text-dim hover:border-gold/35 focus:border-gold/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40';

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseInput, className)} {...props} />
));
Input.displayName = 'Input';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(baseInput, 'h-auto min-h-28 resize-y py-3', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export function Label({
  className,
  children,
  htmlFor,
}: {
  className?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        'mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted',
        className,
      )}
    >
      {children}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-burgundy-bright">{message}</p>;
}

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      <FieldError message={error} />
    </div>
  );
}
