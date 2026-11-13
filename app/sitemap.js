import { SERVICES, SITE_URL } from '../lib/services';

// 20 URLs: homepage WITH trailing slash, every other page no-slash.
// Date-only lastmod, no image entries.
const LASTMOD = '2026-11-14';

export default function sitemap() {
  const urls = [{ url: `${SITE_URL}/`, lastModified: LASTMOD, changeFrequency: 'weekly', priority: 1.0 }];
  for (const path of ['services', ...SERVICES.map((s) => s.slug), 'about', 'contact']) {
    urls.push({
      url: `${SITE_URL}/${path}`,
      lastModified: LASTMOD,
      changeFrequency: 'monthly',
      priority: path === 'services' ? 0.9 : 0.8,
    });
  }
  return urls;
}
