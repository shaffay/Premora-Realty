import type { Property } from '@/data/types';
import { contactInfo } from '@/data/site';

export function organizationJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'PREMORA Realty',
    description:
      'Dubai real estate consultancy — real estate with clarity and care.',
    url: siteUrl,
    logo: `${siteUrl}/logo-monogram.png`,
    image: `${siteUrl}/logo-monogram.png`,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DIFC, Gate Village',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    areaServed: 'Dubai, United Arab Emirates',
    slogan: 'Real Estate with Clarity & Care',
  };
}

export function realEstateListingJsonLd(property: Property, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: `${property.title} — ${property.community}`,
    description: property.description,
    url: `${siteUrl}/properties/${property.slug}`,
    datePosted: property.listedAt,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'AED',
      availability: 'https://schema.org/InStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.community,
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.lat,
      longitude: property.lng,
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.sqft,
      unitCode: 'FTK',
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
  siteUrl: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
