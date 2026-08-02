import { ServiceSchema, type Service } from './types';

const raw: Service[] = [
  {
    slug: 'buying',
    icon: 'Home',
    title: 'Buying',
    desc: 'From shortlist to keys, we filter the noise, verify the details, and guide you toward a property that truly fits your goal.',
  },
  {
    slug: 'selling',
    icon: 'Tag',
    title: 'Selling',
    desc: 'Smart pricing, strong presentation, and targeted buyer outreach designed to attract serious interest, not just empty views.',
  },
  {
    slug: 'leasing',
    icon: 'KeyRound',
    title: 'Leasing',
    desc: 'Support for landlords and tenants with clear terms, tenant coordination, and a smoother leasing process from start to move-in.',
  },
  {
    slug: 'investment-advisory',
    icon: 'TrendingUp',
    title: 'Property Investment Advisory',
    desc: 'Not every project is a good investment. We help compare rental demand, payment plans, handover timelines, developer track record, resale potential, exit strategy, and long-term fit.',
  },
  {
    slug: 'property-management',
    icon: 'ClipboardCheck',
    title: 'Property Management',
    desc: 'End-to-end care for your property, from finding tenants to maintenance coordination and owner reporting, all handled with clarity and precision.',
  },
  {
    slug: 'mortgage-assistance',
    icon: 'Landmark',
    title: 'Mortgage Assistance',
    desc: 'Access to trusted UAE mortgage partners, with pre-approval support and competitive available rates, subject to eligibility and lender approval.',
  },
];

export const services: Service[] = raw.map((s) => ServiceSchema.parse(s));
