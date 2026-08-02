import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { Check } from 'lucide-react';
import { GoalsRow } from '@/components/sections/goals-row';
import { Reveal, RevealStagger } from '@/components/ui/reveal';
import { TeamGrid } from '@/components/sections/team-grid';
import { Icon } from '@/components/ui/icon';
import { MediaImage } from '@/components/ui/media-image';
import { CtaBand } from '@/components/sections/cta-band';
import { values, ourPromise } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'PREMORA Realty is a Dubai property consultancy built on a simple promise: real estate with clarity and care.',
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
        eyebrow="ABOUT PREMORA REALTY"
        title="Clarity in every deal, care in every detail."
        hue={340}
      />

      <Container className="grid items-center gap-12 py-10 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <SectionHeading
            eyebrow="WHO WE ARE"
            title="Real estate, done differently."
            rule="gold"
          />
          <p className="leading-relaxed text-body">
            PREMORA Realty is a Dubai-based real estate consultancy built around
            one simple belief: clients deserve clarity before they make one of
            life’s biggest financial decisions. Whether you are buying your first
            home, building an investment portfolio, selling, or relocating, we
            provide straightforward advice, carefully selected opportunities, and
            guidance that stays with you from first conversation to final
            handover.
          </p>
          <p className="leading-relaxed text-muted">
            No jargon. No pressure. Just clear advice, thoughtful guidance, and a
            team that puts your interests first.
          </p>
        </Reveal>
        <Reveal
          delay={0.1}
          className="relative aspect-[4/3] overflow-hidden rounded-card border border-gold/15"
        >
          <MediaImage
            src="/images/living2.jpg"
            alt="The PREMORA Realty office lounge in DIFC, Dubai"
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
        <SectionHeading
          eyebrow="GOALS WE SUPPORT"
          title="Wherever you are in your journey"
          align="center"
          rule="burgundy-gold"
        />
        <div className="mt-12">
          <GoalsRow />
        </div>
      </Container>

      <Container className="py-12">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-gold/25 bg-gradient-to-br from-primary-deep via-deeper to-burgundy-deep/60 px-8 py-14 sm:px-14">
          <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8">
            <SectionHeading
              eyebrow="OUR PROMISE"
              title="Three commitments we hold ourselves to"
              align="center"
              rule="gold"
            />
            <ul className="flex w-full flex-col gap-4">
              {ourPromise.map((promise) => (
                <li
                  key={promise}
                  className="flex items-start gap-4 rounded-2xl border border-gold/15 bg-black/25 p-5"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <span className="leading-relaxed text-body">{promise}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
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
