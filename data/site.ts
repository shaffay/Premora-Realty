export type Goal = {
  icon: string;
  title: string;
  desc: string;
};

/**
 * "Goals We Support" — replaces the previous placeholder vanity metrics.
 * Shown on the home page and the About page.
 */
export const goals: Goal[] = [
  {
    icon: 'Home',
    title: 'Buy to Live',
    desc: 'Find a home that fits your lifestyle, location needs, budget, and long-term plans.',
  },
  {
    icon: 'TrendingUp',
    title: 'Buy to Invest',
    desc: 'Compare projects based on rental demand, payment plan, resale potential, and expected growth.',
  },
  {
    icon: 'KeyRound',
    title: 'Buy for Rental Income',
    desc: 'Identify properties suited for steady tenant demand and practical ownership costs.',
  },
  {
    icon: 'Tag',
    title: 'Sell or Upgrade',
    desc: 'Get guidance on pricing, positioning, and timing when you are ready to sell or move up.',
  },
];

export type ValueProp = {
  icon: string;
  title: string;
  desc: string;
};

/** "Why Choose PREMORA Realty". */
export const whyChoose: ValueProp[] = [
  {
    icon: 'Gem',
    title: 'Curated Opportunities',
    desc: 'We shortlist properties based on location, value, payment plan, developer track record, and your goal.',
  },
  {
    icon: 'LineChart',
    title: 'Clear Investment Guidance',
    desc: 'We help you compare rental yield, payment plans, handover timelines, resale potential, and market fit.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Honest Advice',
    desc: 'No pressure, no jargon. We explain the pros and risks as if it were our own money.',
  },
  {
    icon: 'LifeBuoy',
    title: 'End-to-End Support',
    desc: 'From first inquiry to reservation, paperwork, handover, and after-sales follow-up, we stay with you.',
  },
];

/** Brand values used on the About page. */
export const values: ValueProp[] = [
  {
    icon: 'Eye',
    title: 'Clarity',
    desc: 'Transparent pricing, straightforward advice and realistic expectations from day one.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Care',
    desc: 'We treat your goals as our own and stay with you long after the keys change hands.',
  },
  {
    icon: 'Sparkles',
    title: 'Excellence',
    desc: 'Every recommendation is backed by market knowledge, careful research and attention to detail.',
  },
];

/** "Our Promise" — three commitments shown on the About page. */
export const ourPromise: string[] = [
  'We recommend only properties we’d confidently invest in ourselves.',
  'If a property isn’t right for you, we’ll tell you.',
  'We measure success by long-term relationships, not one-time transactions.',
];

/** "Why Clients Contact Us" — shown above the contact form. */
export const contactReasons: ValueProp[] = [
  {
    icon: 'Home',
    title: 'Buying a Home',
    desc: 'Find the right property for how you actually want to live.',
  },
  {
    icon: 'TrendingUp',
    title: 'Property Investment',
    desc: 'Compare yield, payment plans and long-term returns before you commit.',
  },
  {
    icon: 'Tag',
    title: 'Selling a Property',
    desc: 'Price it right, present it well and reach serious buyers.',
  },
  {
    icon: 'ClipboardCheck',
    title: 'Leasing & Property Management',
    desc: 'Tenant placement, coordination and owner reporting, handled end to end.',
  },
];

export type InvestmentStat = {
  value: string;
  label: string;
  /** Optional clarifying note surfaced through an info tooltip. */
  note?: string;
};

export const investmentStats: InvestmentStat[] = [
  { value: '0%', label: 'Capital Gains Tax' },
  {
    value: '6–9%',
    label: 'Typical Gross Rental Yield',
    note: 'Varies by property, location and market conditions.',
  },
  { value: '0%', label: 'Annual Property Tax' },
  { value: 'AED', label: 'USD-Pegged Currency' },
];

export const contactInfo = {
  phone: '+971 50 123 4567',
  phoneHref: 'tel:+971501234567',
  whatsapp: '971501234567',
  email: 'hello@premora.ae',
  address: 'DIFC, Gate Village, Dubai, UAE',
  hours: 'Sunday – Thursday, 9:00 AM – 6:00 PM (GST)',
  reraOrn: '00000',
  map: { lat: 25.2138, lng: 55.2799 },
};

export const interestOptions = [
  'Buy for personal use',
  'Buy for investment',
  'Buy for rental income',
  'Sell a property',
  'Rent a property',
  'Property management enquiry',
  'General enquiry',
] as const;

/**
 * Regulatory note shown site-wide in the footer. PREMORA Realty is Dubai-licensed;
 * listings outside the emirate are surfaced under developer authorization.
 */
export const complianceDisclaimer =
  'PREMORA Realty is a Dubai-licensed real estate brokerage. Non-Dubai property opportunities are offered subject to developer authorization and applicable emirate regulations.';
