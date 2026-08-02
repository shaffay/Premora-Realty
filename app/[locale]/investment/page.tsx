import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/sections/page-header';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { MortgageCalculator } from '@/components/sections/mortgage-calculator';
import { InfoTip } from '@/components/ui/info-tip';
import { investmentStats } from '@/data/site';

export const metadata: Metadata = {
  title: 'Investment Planner',
  description:
    'Model your Dubai property investment — compare financing costs, rental income and long-term returns with the PREMORA Realty investment planner.',
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
        eyebrow="INVEST SMARTER"
        title="Invest with Clarity. Grow with Confidence."
        description="Compare financing costs, rental income, payment plans, and long-term returns before making your investment decision."
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
              <span className="flex items-center gap-1.5 text-sm text-muted">
                {s.label}
                {s.note && <InfoTip label={s.label} text={s.note} />}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-10">
        <SectionHeading
          eyebrow="INVESTMENT PLANNER"
          title="Mortgage, ROI and Investment Calculator"
          rule="burgundy-gold"
        />
        <p className="mb-8 mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Adjust the sliders to estimate your monthly payment, rental yield,
          cash-on-cash return, and overall investment performance. Compare
          different scenarios before making your investment decision. Your inputs
          are automatically saved to the URL so you can bookmark or share your
          analysis.
        </p>
        <MortgageCalculator
          initialPrice={initialPrice}
          initialDown={initialDown}
          initialRate={initialRate}
          initialTerm={initialTerm}
        />
        <p className="mt-4 text-xs text-dim">
          Figures are indicative only and do not constitute a financial offer or
          mortgage approval. Speak to a PREMORA Advisor for tailored guidance.
        </p>
      </Container>
    </>
  );
}
