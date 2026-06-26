import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="grid min-h-[70vh] place-items-center py-32 text-center">
      <div className="flex flex-col items-center gap-5">
        <div className="accent-bar w-24 rounded-full" />
        <p className="eyebrow">404</p>
        <h1 className="font-serif text-6xl text-warm">Page not found</h1>
        <p className="max-w-md text-muted">
          The page you’re looking for has moved or no longer exists. Let’s get
          you back to finding your home in Dubai.
        </p>
        <div className="flex gap-3">
          <Button asChild variant="gold" size="lg">
            <Link href="/">Return home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/properties">Browse properties</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
