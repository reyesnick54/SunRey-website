'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LABELS, STATUS_PILL } from '@content/site';
import { Pill } from '@/components/primitives';
import { HOME } from '@/lib/nav';
import { MobileMenu } from './MobileMenu';
import { Nav } from './Nav';
import { Wordmark } from './Wordmark';

/**
 * Header — CLAUDE.md §6.1.
 *
 * Fixed to top. Transparent at scroll 0; past 24px it takes --bg-header, a 16px
 * backdrop blur and a --line bottom border, over 240ms.
 *
 * Three zones: wordmark left, the seven centred nav links, status pill right.
 * The pill is not a link.
 *
 * BREAKPOINT, and why it is 1280px rather than §6.2's 1024px. Measured at micro
 * type with §5.2's 0.18em tracking, the seven §1.1 labels are 723px wide even at
 * a tight gap. The nav is centred on the VIEWPORT, not on the space left over,
 * so each side needs (W - 723)/2 of clearance: 139px of wordmark plus 64px of
 * container padding on the left, and a 171px status pill plus padding on the
 * right. That resolves to W >= ~1272. At 1024px the nav would overlap the
 * wordmark by roughly 40px — there is no gap or wordmark size that fixes it.
 *
 * So all three zones appear together at 1280px and the overlay menu covers
 * everything below, which also keeps the pill from ever disappearing. Flagged
 * for Nick: honouring 1024px exactly needs shorter labels (§1.1) or tighter
 * nav tracking (§5.2). Both are his call, not mine.
 *
 * Note the second constraint, which is easy to miss: the wordmark and pill sit
 * inside the 1240px container (§5.3) while the nav is centred on the VIEWPORT.
 * Above 1240px the container stops growing, so the clearances stay fixed at
 * 55px and 23px no matter how wide the window gets — which is why neither the
 * wordmark nor the nav gap may grow at large sizes. They used to, and collided.
 */

const SCROLL_THRESHOLD = 24;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // A plain passive listener, deliberately not rAF-throttled: the handler is a
    // single numeric comparison, and React bails out when the boolean is
    // unchanged, so there is nothing to throttle. An rAF gate here would also be
    // a liability — in a backgrounded tab rAF is starved, and a pending frame
    // would swallow every scroll event until the tab is shown again.
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-40 h-[var(--header-h)]',
        'transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-header)] ease-sunrey',
        'border-b',
        scrolled
          ? 'border-line bg-bg-header backdrop-blur-[16px]'
          : 'border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-full max-w-[var(--container-max)] items-center justify-between gap-6 px-[var(--container-pad)]">
        <Link
          href={HOME.href}
          aria-label={LABELS.home}
          className="relative z-10 shrink-0 text-text"
        >
          <Wordmark className="h-5 w-auto" />
        </Link>

        {/* Centred on the viewport, not on the remaining space. */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center xl:flex">
          <div className="pointer-events-auto">
            <Nav />
          </div>
        </div>

        <div className="relative z-10 flex shrink-0 items-center">
          <div className="hidden xl:block">
            <Pill tone="status" dot pulse>
              {STATUS_PILL}
            </Pill>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
