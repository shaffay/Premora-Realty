export type MortgageInput = {
  /** Property price in AED */
  price: number;
  /** Down payment as a percentage (0-100) */
  downPaymentPct: number;
  /** Annual interest rate as a percentage, e.g. 4.5 */
  interestRate: number;
  /** Loan term in years */
  termYears: number;
};

export type MortgageResult = {
  loanAmount: number;
  downPayment: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPaid: number;
};

/**
 * Standard fixed-rate amortization.
 * M = P · r(1+r)^n / ((1+r)^n − 1)
 */
export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { price, downPaymentPct, interestRate, termYears } = input;

  const downPayment = (price * downPaymentPct) / 100;
  const loanAmount = Math.max(price - downPayment, 0);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = termYears * 12;

  let monthlyPayment: number;
  if (loanAmount === 0 || numPayments === 0) {
    monthlyPayment = 0;
  } else if (monthlyRate === 0) {
    monthlyPayment = loanAmount / numPayments;
  } else {
    const growth = Math.pow(1 + monthlyRate, numPayments);
    monthlyPayment = (loanAmount * (monthlyRate * growth)) / (growth - 1);
  }

  const totalPaid = monthlyPayment * numPayments + downPayment;
  const totalInterest = monthlyPayment * numPayments - loanAmount;

  return {
    loanAmount: Math.round(loanAmount),
    downPayment: Math.round(downPayment),
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(Math.max(totalInterest, 0)),
    totalPaid: Math.round(totalPaid),
  };
}

export type RoiInput = {
  price: number;
  grossYieldPct: number;
};

export type RoiResult = {
  annualRent: number;
  monthlyRent: number;
};

export function calculateRoi({ price, grossYieldPct }: RoiInput): RoiResult {
  const annualRent = (price * grossYieldPct) / 100;
  return {
    annualRent: Math.round(annualRent),
    monthlyRent: Math.round(annualRent / 12),
  };
}

/** Cash-on-cash return: net annual rent over cash invested (down payment). */
export function cashOnCashReturn(
  annualRent: number,
  downPayment: number,
  annualMortgage: number,
): number {
  if (downPayment === 0) return 0;
  const netCashFlow = annualRent - annualMortgage;
  return (netCashFlow / downPayment) * 100;
}

export const DEFAULT_YIELD_PCT = 7.2;
