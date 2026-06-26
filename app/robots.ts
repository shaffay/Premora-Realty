import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://premora.ae';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/saved', '/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
