import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { mainNav } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['/', ...mainNav.map((n) => n.href), '/donate'];
  const unique = Array.from(new Set(routes));

  return unique.map((route) => ({
    url: `${site.url}${route === '/' ? '' : route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/donate' ? 0.9 : 0.7,
  }));
}
