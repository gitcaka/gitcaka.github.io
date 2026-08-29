import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://wukang-cao-research.caka152005.chatgpt.site'
  ).replace(/\/$/, '');
  const routes = [
    '',
    '/research',
    '/projects',
    '/experience',
    '/outputs',
    '/notes',
    '/about',
    '/contact',
    ...projects.map((project) => `/projects/${project.slug}`),
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : route.startsWith('/projects/') ? 0.7 : 0.8,
  }));
}
