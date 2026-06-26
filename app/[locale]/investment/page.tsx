import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { MortgageCalculator } from '@/components/sections/mortgage-calculator';
import { investmentStats } from '@/data/site';

export const metadata: Metadata = {
  title: 'Investment',
  description:
    'Model your Dubai property investment — tax-free returns, strong yields and a live mortgage & ROI calculator from Premora Realty.',
  alternates: { canonical: '/investment' },
};

function toNumber(v: string | string[] | undefined, fallback: number): number {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function InvestmentPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  setRequestLocale(locale);

  const initialPrice = Math.min(
    100_000_000,
    Math.max(400_000, toNumber(searchParams.price, 2_450_000)),
  );
  const initialDown = Math.min(60, Math.max(10, toNumber(searchParams.down, 20)));
  const initialRate = Math.min(8, Math.max(1.99, toNumber(searchParams.rate, 4.5)));
  const initialTerm = Math.min(30, Math.max(5, toNumber(searchParams.term, 25)));

  return (
    <>
      <PageHeader
        eyebrow="INVEST WITH CONFIDENCE"
        title="Grow your wealth in Dubai"
        description="Tax-free returns, world-class infrastructure and strong rental yields. Use our calculator to model your numbers."
        hue={45}
      />

      <Container className="py-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {investmentStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.05}
              className="flex flex-col items-center gap-1 rounded-card border border-gold/15 bg-card p-6 text-center"
            >
              <span className="font-serif text-4xl font-semibold text-gold">
                {s.value}
              </span>
              <span className="text-sm text-muted">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <SectionHeading
          eyebrow="CALCULATOR"
          title="Mortgage & ROI Calculator"
          rule="burgundy-gold"
        />
        <p className="mb-8 mt-3 max-w-2xl text-sm text-muted">
          Adjust the sliders to estimate your monthly repayment, rental yield and
          cash-on-cash return. Your inputs are saved to the URL — share or bookmark
          your scenario.
        </p>
        <MortgageCalculator
          initialPrice={initialPrice}
          initialDown={initialDown}
          initialRate={initialRate}
          initialTerm={initialTerm}
        />
        <p className="mt-4 text-xs text-dim">
          Figures are indicative only and do not constitute a financial offer or
          mortgage approval. Speak to a Premora advisor for tailored guidance.
        </p>
      </Container>
    </>
  );
}
