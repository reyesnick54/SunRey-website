import type { MetadataRoute } from 'next';

/**
 * CLAUDE.md §4.1 item 2.
 *
 * The gate is client-side, so page content is present in the delivered HTML and
 * is retrievable without the passphrase. Blocking crawlers is therefore not
 * decoration — it is the only thing keeping this site out of search results.
 *
 * No sitemap is generated, deliberately.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
  };
}
