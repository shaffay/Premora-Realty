import type { MetadataRoute } from 'next';
import { properties } from '@/data/properties';
import { communities } from '@/data/communities';

import { SITE_URL } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/properties',
    '/communities',
    '/services',
    '/investment',
    '/about',
    '/contact',
  ];

  const now = new Date();

  const base: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE_URL}/properties/${p.slug}`,
    lastModified: new Date(p.listedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const communityRoutes: MetadataRoute.Sitemap = communities.map((c) => ({
    url: `${SITE_URL}/communities/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...base, ...propertyRoutes, ...communityRoutes];
}
