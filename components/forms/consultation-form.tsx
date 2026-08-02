'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { leadSchema, type LeadInput } from '@/lib/lead-schema';
import { submitLead } from '@/lib/submit-lead';
import { interestOptions } from '@/data/site';
import { Button } from '@/components/ui/button';
import { Field, Input, Textarea } from '@/components/ui/field';
import { useToast } from '@/components/ui/toast';

type ConsultationFormProps = {
  source?: string;
  defaultInterest?: string;
  onSuccess?: () => void;
  compact?: boolean;
};

export function ConsultationForm({
  source,
  defaultInterest,
  onSuccess,
  compact,
}: ConsultationFormProps) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      interest: defaultInterest ?? interestOptions[0],
      source: source ?? 'consultation-modal',
    },
  });

  async function onSubmit(values: LeadInput) {
    const res = await submitLead(values);
    if (res.success) {
      setSubmitted(true);
      reset();
      toast('Request received — we’ll be in touch shortly.');
      onSuccess?.();
    } else {
      toast(res.error ?? 'Something went wrong.', 'error');
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 py-6 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-burgundy-gold">
          <CheckCircle2 className="h-7 w-7 text-warm" />
        </span>
        <h3 className="text-2xl">Thank you</h3>
        <p className="max-w-sm text-sm text-muted">
          Your consultation request has been received. A PREMORA Realty advisor
          will contact you shortly.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register('company')}
      />

      <div className={compact ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
        <Field label="Full Name" htmlFor="c-name" error={errors.name?.message}>
          <Input
            id="c-name"
            placeholder="Your name"
            autoComplete="name"
            {...register('name')}
          />
        </Field>
        <Field
          label="Phone / WhatsApp"
          htmlFor="c-phone"
          error={errors.phone?.message}
        >
          <Input
            id="c-phone"
            placeholder="Include your country code, e.g. +44 7700 900000"
            autoComplete="tel"
            inputMode="tel"
            {...register('phone')}
          />
        </Field>
      </div>

      <div className={compact ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
        <Field label="Email" htmlFor="c-email" error={errors.email?.message}>
          <Input
            id="c-email"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            {...register('email')}
          />
        </Field>
        <Field
          label="Country / Time Zone"
          htmlFor="c-country"
          error={errors.country?.message}
        >
          <Input
            id="c-country"
            placeholder="e.g. United Kingdom (GMT)"
            autoComplete="country-name"
            {...register('country')}
          />
        </Field>
      </div>

      <Field label="I'm interested in" htmlFor="c-interest">
        <select
          id="c-interest"
          className="h-12 w-full rounded-lg border border-gold/20 bg-deeper/60 px-4 text-sm text-warm transition hover:border-gold/35 focus:border-gold/55 focus:outline-none"
          {...register('interest')}
        >
          {interestOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="c-message" error={errors.message?.message}>
        <Textarea
          id="c-message"
          placeholder="Tell us about your goal, preferred area, budget, or timeline (optional)"
          {...register('message')}
        />
      </Field>

      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Sending…' : 'Request Consultation'}
      </Button>
    </form>
  );
}
