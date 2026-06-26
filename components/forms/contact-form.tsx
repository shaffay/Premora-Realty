'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { leadSchema, type LeadInput } from '@/lib/lead-schema';
import { submitLead } from '@/lib/submit-lead';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/field';
import { useToast } from '@/components/ui/toast';

export function ContactForm() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { source: 'contact-page' },
  });

  async function onSubmit(values: LeadInput) {
    const res = await submitLead(values);
    if (res.success) {
      setSubmitted(true);
      reset();
    } else {
      toast(res.error ?? 'Something went wrong.', 'error');
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface flex flex-col items-center gap-3 p-10 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-burgundy-gold">
          <CheckCircle2 className="h-7 w-7 text-warm" />
        </span>
        <h3 className="font-serif text-2xl text-warm">Message received</h3>
        <p className="max-w-sm text-sm text-muted">
          A Premora advisor will be in touch within one business day.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-surface flex flex-col gap-4 p-6 sm:p-8"
    >
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        className="hidden"
        {...register('company')}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="ct-name" error={errors.name?.message}>
          <Input id="ct-name" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Phone" htmlFor="ct-phone" error={errors.phone?.message}>
          <Input
            id="ct-phone"
            autoComplete="tel"
            inputMode="tel"
            {...register('phone')}
          />
        </Field>
      </div>
      <Field label="Email" htmlFor="ct-email" error={errors.email?.message}>
        <Input
          id="ct-email"
          type="email"
          autoComplete="email"
          {...register('email')}
        />
      </Field>
      <Field label="Message" htmlFor="ct-message" error={errors.message?.message}>
        <Textarea
          id="ct-message"
          placeholder="How can we help?"
          {...register('message')}
        />
      </Field>
      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
}
