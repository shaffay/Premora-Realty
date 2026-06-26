import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatsRow } from '@/components/sections/stats-row';
import { Reveal, RevealStagger } from '@/components/ui/reveal';
import { TeamGrid } from '@/components/sections/team-grid';
import { Icon } from '@/components/ui/icon';
import { MediaImage } from '@/components/ui/media-image';
import { CtaBand } from '@/components/sections/cta-band';
import { values } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Premora Realty is a Dubai property consultancy built on a simple promise: real estate with clarity and care.',
  alternates: { canonical: '/about' },
};

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        eyebrow="ABOUT PREMORA"
        title="Clarity in every deal, care in every detail"
        hue={340}
      />

      <Container className="grid items-center gap-12 py-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <SectionHeading eyebrow="WHO WE ARE" title="Who we are" rule="gold" />
          <p className="leading-relaxed text-body">
            Premora Realty is a Dubai-based property consultancy built on a simple
            promise: real estate with clarity and care. We guide residents and
            international investors through every step of buying, selling and
            growing a portfolio in the UAE’s most prime locations.
          </p>
          <p className="leading-relaxed text-muted">
            No jargon, no pressure — just honest advice, curated listings and a
            team that treats your goals as its own.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative aspect-[4/3] overflow-hidden rounded-card border border-gold/15"
        >
          <MediaImage
            src="/images/living2.jpg"
            alt="The Premora Realty office lounge in DIFC, Dubai"
            hue={150}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Reveal>
      </Container>

      <Container className="py-12">
        <RevealStagger className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <Reveal key={v.title}>
              <div className="card-surface flex h-full flex-col gap-4 p-7">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-burgundy-gold text-warm shadow-gold">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-serif text-2xl text-warm">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </RevealStagger>
      </Container>

      <Container className="py-12">
        <StatsRow />
      </Container>

      <Container className="py-12">
        <SectionHeading
          eyebrow="OUR TEAM"
          title="Advisors who put you first"
          align="center"
          rule="burgundy-gold"
        />
        <TeamGrid />
      </Container>

      <CtaBand />
    </>
  );
}
