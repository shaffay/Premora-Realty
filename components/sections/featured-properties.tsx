import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/property/property-card';
import { GoalsPanel } from './goals-panel';
import { featuredProperties } from '@/data/properties';

export function FeaturedProperties() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <section id="featured" className="relative py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t('featuredEyebrow')}
            title={t('featuredTitle')}
            rule="burgundy-gold"
          />
          <Button asChild variant="outline" size="md" className="hidden sm:inline-flex">
            <Link href="/properties">
              {tc('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
            {featuredProperties.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <GoalsPanel />
          </div>
        </div>

        <div className="mt-10 sm:hidden">
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/properties">
              {tc('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
