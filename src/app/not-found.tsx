import type { Metadata } from 'next';
import Link from 'next/link';

import { Display, Eyebrow, Lede } from '@/components/primitives';
import { notFound } from '@content/not-found';

/**
 * 404 (`/not-found`) — CLAUDE.md §11.7.
 *
 * Root layout already supplies the full header and footer (with the §2.3
 * disclosure) around every page including this one, so this file only owns
 * the centred body: eyebrow, two-tone H1, lede, return link, minimum 60vh.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: notFound.meta.title,
  description: notFound.meta.description,
};

export default function NotFound() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto flex max-w-[48ch] flex-col items-center gap-6 px-[var(--container-pad)] text-center">
          <Eyebrow>{notFound.eyebrow}</Eyebrow>
          <Display as="h1" size="l" tone="two-tone" lines={notFound.heading} />
          <Lede className="mx-auto">{notFound.lede}</Lede>
          <Link
            href={notFound.link.href}
            className="mt-2 text-body font-medium text-accent-500 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300"
          >
            {notFound.link.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
