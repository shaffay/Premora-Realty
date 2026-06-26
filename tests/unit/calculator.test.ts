import { describe, it, expect } from 'vitest';
import {
  calculateMortgage,
  calculateRoi,
  cashOnCashReturn,
} from '@/lib/calculator';

describe('calculateMortgage', () => {
  it('computes the standard amortized monthly payment', () => {
    // 2.45M price, 20% down → 1.96M loan, 4.5% over 25y.
    const result = calculateMortgage({
      price: 2_450_000,
      downPaymentPct: 20,
      interestRate: 4.5,
      termYears: 25,
    });

    expect(result.downPayment).toBe(490_000);
    expect(result.loanAmount).toBe(1_960_000);
    // Known-good amortized payment ≈ AED 10,896.
    expect(result.monthlyPayment).toBeGreaterThan(10_800);
    expect(result.monthlyPayment).toBeLessThan(11_000);
  });

  it('handles a zero interest rate as straight-line repayment', () => {
    const result = calculateMortgage({
      price: 1_200_000,
      downPaymentPct: 25,
      interestRate: 0,
      termYears: 10,
    });
    // 900k loan over 120 months = 7,500/mo, no interest.
    expect(result.loanAmount).toBe(900_000);
    expect(result.monthlyPayment).toBe(7_500);
    expect(result.totalInterest).toBe(0);
  });

  it('returns zero payment when fully paid in cash', () => {
    const result = calculateMortgage({
      price: 800_000,
      downPaymentPct: 100,
      interestRate: 4.5,
      termYears: 25,
    });
    expect(result.loanAmount).toBe(0);
    expect(result.monthlyPayment).toBe(0);
  });

  it('charges more interest over a longer term', () => {
    const base = {
      price: 5_000_000,
      downPaymentPct: 20,
      interestRate: 4,
    };
    const short = calculateMortgage({ ...base, termYears: 15 });
    const long = calculateMortgage({ ...base, termYears: 30 });
    expect(long.monthlyPayment).toBeLessThan(short.monthlyPayment);
    expect(long.totalInterest).toBeGreaterThan(short.totalInterest);
  });
});

describe('calculateRoi', () => {
  it('derives annual and monthly rent from gross yield', () => {
    const roi = calculateRoi({ price: 2_000_000, grossYieldPct: 7.2 });
    expect(roi.annualRent).toBe(144_000);
    expect(roi.monthlyRent).toBe(12_000);
  });
});

describe('cashOnCashReturn', () => {
  it('returns net cash flow over cash invested as a percentage', () => {
    // 144k rent, 100k mortgage, 400k down → 44k / 400k = 11%.
    expect(cashOnCashReturn(144_000, 400_000, 100_000)).toBeCloseTo(11, 5);
  });

  it('guards against division by zero', () => {
    expect(cashOnCashReturn(100_000, 0, 50_000)).toBe(0);
  });
});
