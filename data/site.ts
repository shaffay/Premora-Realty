export type Stat = {
  value: number;
  suffix: string;
  label: string;
  icon: string;
};

/** "Premora in Numbers" — animated count-up stats. */
export const stats: Stat[] = [
  { value: 10, suffix: '+', label: 'Years of Expertise', icon: 'Award' },
  { value: 500, suffix: '+', label: 'Happy Clients', icon: 'Users' },
  { value: 2000, suffix: '+', label: 'Properties Sold', icon: 'Building2' },
  { value: 12, suffix: '', label: 'Prime Locations', icon: 'MapPin' },
];

export type ValueProp = {
  icon: string;
  title: string;
  desc: string;
};

/** "Why Choose Premora". */
export const whyChoose: ValueProp[] = [
  {
    icon: 'Gem',
    title: 'Curated Properties',
    desc: 'Every listing is hand-selected and verified — no clutter, only homes worth your time.',
  },
  {
    icon: 'LineChart',
    title: 'Investment Guidance',
    desc: 'Clear, data-led advice on yield, growth and timing across Dubai’s prime districts.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Honest Advice',
    desc: 'No pressure, no jargon. We tell you what we would do if it were our own money.',
  },
  {
    icon: 'LifeBuoy',
    title: 'End-to-End Support',
    desc: 'From first viewing to handover and beyond, one dedicated advisor stays with you.',
  },
];

/** Brand values used on the About page. */
export const values: ValueProp[] = [
  {
    icon: 'Eye',
    title: 'Clarity',
    desc: 'Transparent pricing, plain language and honest timelines on every deal we touch.',
  },
  {
    icon: 'HeartHandshake',
    title: 'Care',
    desc: 'We treat your goals as our own and stay long after the keys change hands.',
  },
  {
    icon: 'Sparkles',
    title: 'Excellence',
    desc: 'Meticulous detail and market mastery, delivered with a quiet, confident standard.',
  },
];

export type InvestmentStat = { value: string; label: string };

export const investmentStats: InvestmentStat[] = [
  { value: '0%', label: 'Capital Gains Tax' },
  { value: '6–9%', label: 'Typical Gross Yield' },
  { value: '0%', label: 'Annual Property Tax' },
  { value: 'AED', label: 'USD-Pegged Currency' },
];

export const contactInfo = {
  phone: '+971 50 123 4567',
  phoneHref: 'tel:+971501234567',
  whatsapp: '971501234567',
  email: 'hello@premora.ae',
  address: 'DIFC, Gate Village, Dubai, UAE',
  hours: 'Sun–Thu, 9:00 – 18:00',
  reraOrn: '00000',
  map: { lat: 25.2138, lng: 55.2799 },
};

export const interestOptions = [
  'Buying a home',
  'Selling a property',
  'Investment & yield',
  'Leasing / renting',
  'Property management',
  'General enquiry',
] as const;
