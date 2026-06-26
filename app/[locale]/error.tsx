'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="grid min-h-[70vh] place-items-center py-32 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="accent-bar w-24 rounded-full" />
        <p className="eyebrow text-burgundy-bright">Something went wrong</p>
        <h1 className="font-serif text-5xl text-warm">An unexpected error</h1>
        <p className="max-w-md text-muted">
          We’ve logged the issue. Please try again, or return to the homepage.
        </p>
        <Button variant="gold" size="lg" onClick={reset}>
          Try again
        </Button>
      </div>
    </Container>
  );
}
