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
 * Three zones: wordmark left, the eight centred nav links, status pill right.
 * The pill is not a link.
 *
 * THE WIDTH BUDGET, which is tighter than it looks. The container is 1240px
 * with 64px of side padding (§5.3), so the row has 1112px to work with at every
 * viewport from 1240px up — it stops growing there, and the header gets no
 * wider however wide the window is. The wordmark takes 135 and the status pill
 * 171, leaving 758 for eight nav labels and their gaps. Nav.tsx is tuned to
 * that budget and measures 718.
 *
 * The zones are a `1fr auto 1fr` grid rather than a nav absolutely centred over
 * the row. Absolute centring ignores the side zones, and with eight items it
 * overlapped the status pill by 22px at every width from 1280 up; the fix that
 * followed squeezed the wordmark off its 6.7593:1 ratio, which §14 forbids
 * outright. Equal side tracks centre the nav on the container — and since the
 * padding is symmetric, on the viewport too — while reserving each side's
 * space, so neither collision can recur.
 *
 * BREAKPOINT, and why it is 1280px rather than §6.2's 1024px: at 1024px the
 * row has 896px, which is less than 135 + 718 + 171 + gaps. There is no gap or
 * tracking that fixes that without making the labels illegible, so all three
 * zones appear together at 1280px and the overlay menu covers everything below.
 * Flagged for Nick: honouring 1024px exactly needs shorter labels (§1.1).
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
        Three zones — §6.1: wordmark left, nav centred, status pill right.

        A grid of `1fr auto 1fr`, not absolute centring. Both side tracks take
        the same width, so the nav sits on the container's centre line — and
        because the container's side padding is symmetric, that is the viewport
        centre line too. The difference from absolute centring is that the side
        tracks reserve their own space: with eight nav items the centred row is
        814px wide and the pill is 171px, and absolute centring overlapped them
        by 22px at every width from 1280 up. A grid cannot overlap.
      */}
      <div className="mx-auto grid h-full max-w-[var(--container-max)] grid-cols-[auto_1fr] items-center gap-6 px-[var(--container-pad)] xl:grid-cols-[1fr_auto_1fr]">
        <Link
          href={HOME.href}
          aria-label={LABELS.home}
          className="relative z-10 shrink-0 justify-self-start text-text"
        >
          <Wordmark height={20} priority className="h-5 w-auto max-w-none" />
        </Link>

        <div className="hidden justify-self-center xl:block">
          <Nav />
        </div>

        <div className="relative z-10 flex items-center justify-self-end">
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
