import type { MetadataRoute } from 'next';

/**
 * CLAUDE.md §4.1 item 2.
 *
 * Defence in depth, and it costs nothing. The real boundary is the Pages
 * Function (§4): a crawler without the passphrase receives the gate screen and
 * no content, so nothing here is load-bearing. It stays because a site that is
 * confidential should also say so to anything that asks.
 *
 * `force-static` is required under `output: 'export'` — without it the route
 * is treated as dynamic and the export fails.
 *
 * No sitemap is generated, deliberately.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
