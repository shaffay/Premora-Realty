import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { cn } from '@/lib/utils';

export function PageHeader({
  eyebrow,
  title,
  description,
  hue = 150,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  hue?: number;
  className?: string;
}) {
  return (
    <section
      className={cn('relative overflow-hidden pb-12 pt-36', className)}
      style={{
        background: `radial-gradient(circle at 20% 10%, hsl(${hue} 40% 12% / .6), transparent 55%)`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-50" />
      <div className="skyline-dots pointer-events-none absolute inset-0 opacity-10" />
      <Container className="relative">
        <Reveal className="flex max-w-3xl flex-col gap-4">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="text-balance font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            {title}
          </h1>
          <span className="rule-burgundy-gold" aria-hidden />
          {description && (
            <p className="max-w-2xl text-lg leading-relaxed text-body">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
