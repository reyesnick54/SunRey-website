import Link from 'next/link';

import { Display, Lede, Section } from '@/components/primitives';
import type { HomeContent } from '@content/home';

/**
 * Closing band — CLAUDE.md §7.9.
 *
 * "Glow at its strongest": the section deliberately keeps the default
 * (transparent) surface rather than `sunken`, so the page's shared
 * `<GlowField>` — fixed to the viewport, not the document, per its own
 * component doc — shows through in full rather than being painted over.
 */
export function ClosingBand({ heading, lede, links }: HomeContent['closing']) {
  return (
    <Section as="section" divided spacious aria-labelledby="closing-heading">
      <div className="mx-auto flex max-w-[var(--measure-lede)] flex-col items-center gap-6 text-center">
        <Display id="closing-heading" as="h2" size="l" tone="two-tone" lines={heading} />
        <Lede className="mx-auto">{lede}</Lede>

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body font-medium text-accent-500 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
