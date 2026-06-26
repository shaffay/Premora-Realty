import { TestimonialSchema, type Testimonial } from './types';

const raw: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Premora made buying our first Dubai home feel effortless. They explained every step in plain language and never once pushed us. The clarity was the whole difference.',
    name: 'Aisha & Rami',
    role: 'Downtown Dubai · Buyers',
    initials: 'AR',
  },
  {
    id: 't2',
    quote:
      'As an overseas investor I needed numbers I could trust. Omar built a yield model that actually held up after handover. My portfolio has grown two units since.',
    name: 'James Whitfield',
    role: 'London · Investor',
    initials: 'JW',
  },
  {
    id: 't3',
    quote:
      'Selling our villa could have been stressful. Instead it was calm, well-marketed and closed above asking. The care they showed our family was genuine.',
    name: 'Priya Nair',
    role: 'Palm Jumeirah · Seller',
    initials: 'PN',
  },
  {
    id: 't4',
    quote:
      'Honest advice is rare in this market. Premora told me when not to buy — and that is exactly why I trusted them when the right property finally came.',
    name: 'Khalid Al Mansoori',
    role: 'Emirates Hills · Buyer',
    initials: 'KM',
  },
];

export const testimonials: Testimonial[] = raw.map((t) =>
  TestimonialSchema.parse(t),
);
