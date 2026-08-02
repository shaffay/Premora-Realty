'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Download, MessageSquare } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { InfoTip } from '@/components/ui/info-tip';
import { BookConsultationButton } from '@/components/layout/book-consultation-button';
import { cn } from '@/lib/utils';
import {
  calculateMortgage,
  calculateRoi,
  cashOnCashReturn,
  DEFAULT_YIELD_PCT,
} from '@/lib/calculator';
import { formatPrice } from '@/lib/format';
import type { Locale } from '@/lib/i18n/routing';

type Props = {
  initialPrice: number;
  initialDown: number;
  initialRate: number;
  initialTerm: number;
};

export function MortgageCalculator({
  initialPrice,
  initialDown,
  initialRate,
  initialTerm,
}: Props) {
  const locale = useLocale() as Locale;
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(initialDown);
  const [rate, setRate] = useState(initialRate);
  const [term, setTerm] = useState(initialTerm);

  const result = useMemo(
    () =>
      calculateMortgage({
        price,
        downPaymentPct: down,
        interestRate: rate,
        termYears: term,
      }),
    [price, down, rate, term],
  );
  const roi = useMemo(
    () => calculateRoi({ price, grossYieldPct: DEFAULT_YIELD_PCT }),
    [price],
  );
  const coc = cashOnCashReturn(
    roi.annualRent,
    result.downPayment,
    result.monthlyPayment * 12,
  );

  // Keep the URL shareable without triggering a navigation/render.
  useEffect(() => {
    const params = new URLSearchParams({
      price: String(price),
      down: String(down),
      rate: String(rate),
      term: String(term),
    });
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [price, down, rate, term]);

  function downloadSummary() {
    const lines = [
      'PREMORA Realty — Investment Summary',
      '========================================',
      `Property price:      ${formatPrice(price, locale)}`,
      `Down payment (${down}%): ${formatPrice(result.downPayment, locale)}`,
      `Loan amount:         ${formatPrice(result.loanAmount, locale)}`,
      `Interest rate:       ${rate}%`,
      `Term:                ${term} years`,
      '',
      `Monthly payment:     ${formatPrice(result.monthlyPayment, locale)}`,
      `Total interest:      ${formatPrice(result.totalInterest, locale)}`,
      '',
      `Gross rental yield:  ${DEFAULT_YIELD_PCT}%`,
      `Est. annual rent:    ${formatPrice(roi.annualRent, locale)}`,
      `Cash-on-cash return: ${formatSignedPct(coc)}`,
      '',
      'Indicative only — not a financial offer. Speak to a PREMORA Advisor.',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'premora-investment-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card-surface grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr]">
      {/* Controls */}
      <div className="flex flex-col gap-7">
        <SliderRow
          label="Property Price"
          value={formatPrice(price, locale)}
          min={400000}
          max={100000000}
          step={50000}
          current={price}
          onChange={setPrice}
          ariaLabel="Property price"
        />
        <SliderRow
          label="Down Payment"
          value={`${down}% · ${formatPrice(result.downPayment, locale)}`}
          min={10}
          max={60}
          step={5}
          current={down}
          onChange={setDown}
          ariaLabel="Down payment percentage"
        />
        <SliderRow
          label="Interest Rate"
          value={`${rate.toFixed(2)}%`}
          min={1.99}
          max={8}
          step={0.05}
          current={rate}
          onChange={setRate}
          ariaLabel="Interest rate"
        />
        <SliderRow
          label="Loan Term"
          value={`${term} years`}
          min={5}
          max={30}
          step={1}
          current={term}
          onChange={setTerm}
          ariaLabel="Loan term in years"
        />
      </div>

      {/* Results */}
      <div className="flex flex-col gap-4 rounded-2xl border border-gold/20 bg-gradient-to-br from-primary-deep/50 to-deeper p-6">
        <span className="eyebrow flex items-center gap-1.5 text-gold/70">
          Estimated Monthly Payment
          <InfoTip
            label="Estimated Monthly Payment"
            text="Estimated monthly mortgage repayment based on your financing assumptions."
          />
        </span>
        <p className="font-serif text-5xl font-semibold text-gold">
          {formatPrice(result.monthlyPayment, locale)}
        </p>
        <div className="my-2 h-px w-full bg-gold/15" />
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <Stat
            label="Loan Amount"
            value={formatPrice(result.loanAmount, locale)}
            tip="Amount financed after your down payment."
          />
          <Stat
            label="Down Payment"
            value={formatPrice(result.downPayment, locale)}
          />
          <Stat
            label="Gross Rental Yield"
            value={`${DEFAULT_YIELD_PCT}%`}
            tip="Estimated annual rental income expressed as a percentage of the property’s purchase price."
          />
          <Stat label="Est. Annual Rent" value={formatPrice(roi.annualRent, locale)} />
          <Stat
            label="Total Interest"
            value={formatPrice(result.totalInterest, locale)}
          />
          <Stat
            label="Cash-on-Cash Return"
            value={formatSignedPct(coc)}
            tip="The annual return generated on the actual cash you invest (such as your down payment and purchase costs), before considering appreciation."
            tone={coc < 0 ? 'negative' : 'positive'}
          />
        </dl>

        {coc < 0 && (
          <p className="text-xs leading-relaxed text-burgundy-bright">
            Over a {term}-year term the mortgage repayments exceed the estimated
            rent, so this scenario is cash-flow negative. Lengthening the term or
            raising the down payment improves it.
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          <BookConsultationButton
            variant="gold"
            size="lg"
            defaultInterest="Buy for investment"
          >
            <MessageSquare className="h-4 w-4" />
            Speak to an Investment Advisor
          </BookConsultationButton>
          <Button variant="outline" size="md" onClick={downloadSummary}>
            <Download className="h-4 w-4" />
            Download Investment Summary
          </Button>
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
  ariaLabel,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-muted">{label}</span>
        <span className="font-serif text-lg text-gold">{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[current]}
        onValueChange={([v]) => onChange(v ?? min)}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

/**
 * Percentage with an explicit sign, so a cash-flow-negative scenario reads as
 * deliberate rather than looking like a rendering glitch. Rounds -0.04 to 0.0%
 * instead of the misleading "-0.0%".
 */
function formatSignedPct(value: number): string {
  const rounded = Number(value.toFixed(1));
  if (rounded === 0) return '0.0%';
  return `${rounded > 0 ? '+' : '−'}${Math.abs(rounded).toFixed(1)}%`;
}

function Stat({
  label,
  value,
  tip,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  tip?: string;
  tone?: 'neutral' | 'positive' | 'negative';
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-dim">
        {label}
        {tip && <InfoTip label={label} text={tip} />}
      </dt>
      <dd
        className={cn(
          'font-serif text-xl',
          tone === 'negative' ? 'text-burgundy-bright' : 'text-warm',
        )}
      >
        {value}
      </dd>
    </div>
  );
}
