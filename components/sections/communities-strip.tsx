import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { CommunityCard } from '@/components/property/community-card';
import { primeCommunities } from '@/data/communities';

export function CommunitiesStrip() {
  const t = useTranslations('home');
  const tc = useTranslations('common');

  return (
    <section className="relative py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t('communitiesEyebrow')}
            title={t('communitiesTitle')}
          />
          <Button asChild variant="ghost" size="md" className="hidden sm:inline-flex">
            <Link href="/communities">
              {tc('viewAll')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {primeCommunities.map((c, i) => (
            <CommunityCard key={c.slug} community={c} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
