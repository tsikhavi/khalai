import type {MetadataRoute} from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://khalai.studio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't index authenticated pages
        disallow: [
          '/api/',
          '/login',
          '/register',
          '/*/dashboard/admin/',
          '/*/dashboard/settings',
          '/*/dashboard/messages',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
