'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { newsletterSchema, type NewsletterInput } from '@/lib/lead-schema';
import { submitNewsletter } from '@/lib/submit-lead';
import { Input } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const t = useTranslations('footer');
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterInput) {
    const res = await submitNewsletter(values);
    if (res.success) setDone(true);
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm text-gold">
        <Check className="h-4 w-4" /> {t('subscribed')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          tabIndex={-1}
          aria-hidden
          className="hidden"
          {...register('company')}
        />
        <Input
          type="email"
          placeholder="you@email.com"
          aria-label="Email address"
          className="h-11"
          {...register('email')}
        />
        <Button type="submit" variant="gold" size="md" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {t('join')}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {errors.email && (
        <span className="text-xs text-burgundy-bright">
          {errors.email.message}
        </span>
      )}
    </form>
  );
}
