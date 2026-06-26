'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-base disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-warm shadow-[0_10px_30px_-12px_rgba(30,91,64,.8)] hover:bg-primary-hover hover:shadow-[0_16px_40px_-14px_rgba(36,110,77,.9)]',
        gold: 'bg-gold-sweep bg-[length:200%_auto] text-deeper font-semibold shadow-gold hover:bg-[position:100%_0] hover:shadow-[0_16px_50px_-12px_rgba(203,163,92,.5)]',
        outline:
          'border border-gold/40 text-warm hover:border-gold/80 hover:bg-gold/10',
        burgundy:
          'bg-burgundy text-warm hover:bg-burgundy-bright shadow-[0_10px_30px_-12px_rgba(138,31,61,.8)]',
        ghost: 'text-body hover:text-warm hover:bg-white/5',
        whatsapp: 'bg-whatsapp text-deeper font-semibold hover:brightness-110',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
