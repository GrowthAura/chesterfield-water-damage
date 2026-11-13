import { SITE_URL } from '../lib/services';

// Allow: / + Sitemap on www. NO Host: line, ever.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
