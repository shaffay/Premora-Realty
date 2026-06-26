import { ServiceSchema, type Service } from './types';

const raw: Service[] = [
  {
    slug: 'buying',
    icon: 'Home',
    title: 'Buying',
    desc: 'From shortlist to keys — curated listings, honest guidance and negotiation that protects your interests.',
  },
  {
    slug: 'selling',
    icon: 'Tag',
    title: 'Selling',
    desc: 'Strategic pricing, cinematic marketing and a qualified buyer network to sell faster, for more.',
  },
  {
    slug: 'leasing',
    icon: 'KeyRound',
    title: 'Leasing',
    desc: 'Tenant placement and landlord representation with transparent terms and dependable management.',
  },
  {
    slug: 'investment-advisory',
    icon: 'TrendingUp',
    title: 'Investment Advisory',
    desc: 'Data-led yield and capital-growth analysis to build a Dubai portfolio aligned to your goals.',
  },
  {
    slug: 'property-management',
    icon: 'ClipboardCheck',
    title: 'Property Management',
    desc: 'End-to-end care of your asset — maintenance, tenancy and reporting, handled with precision.',
  },
  {
    slug: 'mortgage-assistance',
    icon: 'Landmark',
    title: 'Mortgage Assistance',
    desc: 'Access to leading UAE lenders with pre-approval support and the sharpest available rates.',
  },
];

export const services: Service[] = raw.map((s) => ServiceSchema.parse(s));
