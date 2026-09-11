'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LABELS } from '@content/site';
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
 * Two zones: the wordmark left, the eight nav links filling the rest. The
 * status pill that used to sit on the right was removed at Nick's request along
 * with the rest of the pre-production labelling.
 *
 * THE WIDTH BUDGET. The container is 1240px with 64px of side padding (§5.3),
 * so the row has 1112px at every viewport from 1240px up — it stops growing
 * there, and the header gets no wider however wide the window is. The wordmark
 * takes 135, which leaves 953 for eight labels and their gaps; Nav.tsx measures
 * well inside that. At the 1024px breakpoint the row is 921 and the budget is
 * 762, which is what the nav's tracking and gap are tuned to.
 *
 * The zones are a `1fr auto 1fr` grid rather than a nav absolutely centred over
 * the row. Absolute centring ignores the side zones and collided with the old
 * pill at every width from 1280 up; the fix that followed squeezed the wordmark
 * off its 6.7593:1 ratio, which §14 forbids outright. Equal side tracks centre
 * the nav on the container — and since the padding is symmetric, on the
 * viewport too — while reserving each side's space, so neither can recur.
 *
 * The header is `fixed`, so the nav travels with the page rather than scrolling
 * away, and takes its background and border past 24px of scroll.
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
      {/*
        `1fr auto 1fr` from lg up, so the nav sits on the container's centre
        line and the wordmark keeps its own track. Below lg the row collapses to
        wordmark + hamburger and the third track disappears with it.
      */}
      <div className="mx-auto grid h-full max-w-[var(--container-max)] grid-cols-[auto_1fr] items-center gap-6 px-[var(--container-pad)] lg:grid-cols-[1fr_auto_1fr]">
        <Link
          href={HOME.href}
          aria-label={LABELS.home}
          className="relative z-10 shrink-0 justify-self-start text-text"
        >
          <Wordmark height={20} priority className="h-5 w-auto max-w-none" />
        </Link>

        <div className="hidden justify-self-center lg:block">
          <Nav />
        </div>

        <div className="relative z-10 flex items-center justify-self-end">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
