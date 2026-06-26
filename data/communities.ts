import { CommunitySchema, type Community } from './types';

const raw: Community[] = [
  {
    slug: 'downtown-dubai',
    name: 'Downtown Dubai',
    blurb:
      'The beating heart of the city — Burj Khalifa, The Dubai Mall and the Opera District at your door.',
    count: 1,
    fromPrice: 2450000,
    hue: 150,
    lat: 25.1972,
    lng: 55.2744,
    image: '/images/burj-khalifa.jpg',
  },
  {
    slug: 'dubai-marina',
    name: 'Dubai Marina',
    blurb:
      'A glittering man-made canal lined with towers, yachts and a waterfront promenade that never sleeps.',
    count: 1,
    fromPrice: 1350000,
    hue: 200,
    lat: 25.0805,
    lng: 55.1403,
    image: '/images/marina.jpg',
  },
  {
    slug: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    blurb:
      'The world’s most iconic island address — private beaches, signature villas and resort living.',
    count: 1,
    fromPrice: 28500000,
    hue: 35,
    lat: 25.1124,
    lng: 55.139,
    image: '/images/palm.jpg',
  },
  {
    slug: 'jvc',
    name: 'Jumeirah Village Circle',
    blurb:
      'A maturing, family-friendly community offering Dubai’s strongest entry-level yields.',
    count: 1,
    fromPrice: 800000,
    hue: 170,
    lat: 25.059,
    lng: 55.209,
    image: '/images/apt-building.jpg',
  },
  {
    slug: 'business-bay',
    name: 'Business Bay',
    blurb:
      'Dubai’s central business and lifestyle district, threaded by the canal beside Downtown.',
    count: 1,
    fromPrice: 12900000,
    hue: 280,
    lat: 25.185,
    lng: 55.265,
    image: '/images/dubai-aerial.jpg',
  },
  {
    slug: 'dubai-hills',
    name: 'Dubai Hills Estate',
    blurb:
      'A green, master-planned haven built around a championship golf course and a vast central park.',
    count: 1,
    fromPrice: 4200000,
    hue: 130,
    lat: 25.11,
    lng: 55.248,
    image: '/images/house-ext.jpg',
  },
  {
    slug: 'emaar-beachfront',
    name: 'Emaar Beachfront',
    blurb:
      'A private gated island where a marina community meets a white-sand Gulf shoreline.',
    count: 1,
    fromPrice: 5600000,
    hue: 205,
    lat: 25.095,
    lng: 55.145,
    image: '/images/house-modern2.jpg',
  },
  {
    slug: 'emirates-hills',
    name: 'Emirates Hills',
    blurb:
      'The "Beverly Hills of Dubai" — bespoke mansions around lakes and manicured fairways.',
    count: 1,
    fromPrice: 95000000,
    hue: 45,
    lat: 25.066,
    lng: 55.162,
    image: '/images/house-modern.jpg',
  },
  {
    slug: 'creek-harbour',
    name: 'Dubai Creek Harbour',
    blurb:
      'A future-facing waterfront district built around a marina, central park and wildlife sanctuary.',
    count: 1,
    fromPrice: 2100000,
    hue: 190,
    lat: 25.203,
    lng: 55.353,
    image: '/images/apt-building2.jpg',
  },
  {
    slug: 'city-walk',
    name: 'City Walk',
    blurb:
      'A low-rise urban village of boutiques, galleries and pavement cafés in the centre of the city.',
    count: 1,
    fromPrice: 1800000,
    hue: 25,
    lat: 25.205,
    lng: 55.262,
    image: '/images/loft.jpg',
  },
];

export const communities: Community[] = raw.map((c) => CommunitySchema.parse(c));

/** Communities highlighted on the home page strip. */
export const primeCommunities = communities.filter((c) =>
  ['downtown-dubai', 'dubai-marina', 'palm-jumeirah', 'dubai-hills'].includes(
    c.slug,
  ),
);

export function getCommunityBySlug(slug: string): Community | undefined {
  return communities.find((c) => c.slug === slug);
}
