import Link from 'next/link';

import { FOOTER_LEGAL, LABELS } from '@content/site';
import { FOOTER_COLUMNS } from '@/lib/nav';
import { Disclosure } from './Disclosure';
import { Wordmark } from './Wordmark';

/**
 * Footer — CLAUDE.md §6.3.
 *
 * Three tiers on --bg-sunken:
 *   1. The wordmark band — public/wordmark.svg at 1240px wide, faded downward,
 *      cropped by a 196px box so its base is cut off by the section edge. The
 *      real mark, not type (§6.3, §14).
 *   2. Four link columns.
 *   3. The §2.3 disclosure, the copyright and the confidentiality line.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-auto bg-bg-sunken">
      {/*
        Tier 1 — the wordmark band (§6.3).

        The mark is 1240px wide inside a 196px-tall clipped box, so its base is
        cut off by the section edge rather than by a measured crop. The mask
        fades it out downward. Decorative: the page already says SunRey, so it
        is hidden from the accessibility tree.

        Below 1240px the mark keeps its width and overflows the viewport on both
        sides — which is the intended composition, and why the box clips rather
        than scrolls.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex h-[196px] select-none justify-center overflow-hidden [-webkit-mask-image:linear-gradient(180deg,#000_0%,rgba(0,0,0,.35)_62%,transparent_96%)] [mask-image:linear-gradient(180deg,#000_0%,rgba(0,0,0,.35)_62%,transparent_96%)]"
      >
        <Wordmark width={1240} className="max-w-none shrink-0 opacity-[.16]" />
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
