import Link from 'next/link';

import { FOOTER_LEGAL, LABELS } from '@content/site';
import { FOOTER_COLUMNS } from '@/lib/nav';
import { Disclosure } from './Disclosure';

/**
 * Footer — CLAUDE.md §6.3.
 *
 * Three tiers on --bg-sunken:
 *   1. The wordmark band. SUNREY at clamp(4rem, 18vw, 14rem), weight 200, in a
 *      vertical --sun-900 → transparent gradient, cropped so the bottom third is
 *      cut off by the section edge. Purely typographic, and decorative — it is
 *      hidden from the accessibility tree, since the page already says SunRey.
 *   2. Four link columns.
 *   3. The §2.3 disclosure, the copyright and the confidentiality line.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-auto bg-bg-sunken">
      {/*
        Tier 1 — the wordmark band.

        The crop is measured, not guessed. In Jost at line-height 1 the capitals
        occupy from 12.4% to 86.6% of the line box (cap height is 72.1% of the
        font size, and the baseline sits 84.5% down). Cutting the band at 0.62em
        therefore removes very close to the bottom third of the glyphs, at every
        size in the clamp, which is what §6.3 asks for. The font size is set on
        the band so the `em` height tracks it.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex h-[0.62em] select-none justify-center overflow-clip text-[clamp(4rem,18vw,14rem)]"
      >
        <span className="bg-[linear-gradient(to_bottom,var(--sun-900)_8%,transparent_100%)] bg-clip-text font-display text-[1em] leading-[1] font-extralight tracking-[-0.03em] text-transparent">
          SUNREY
        </span>
      </div>

      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-pad)]">
        {/* Tier 2 — links. */}
        <nav
          aria-label={LABELS.footerNav}
          className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line py-14 sm:grid-cols-4"
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="font-mono text-micro font-medium tracking-micro text-faint uppercase">
                {column.heading}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-muted transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Tier 3 — the disclosure. */}
        <div className="flex flex-col gap-6 border-t border-line py-12">
          <Disclosure />
          <p className="text-[0.75rem] leading-[1.65] text-faint">
            {FOOTER_LEGAL.copyright}{' '}
            <span className="block sm:inline">{FOOTER_LEGAL.confidential}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
