'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LABELS } from '@content/site';
import { NAV } from '@/lib/nav';

/**
 * Centred header navigation — CLAUDE.md §6.1.
 *
 * micro type, uppercase, --text-muted, becoming --text on hover with a
 * --sun-500 underline that grows from the left over 180ms. The active route is
 * --text with a persistent underline.
 *
 * The gap and tracking are tuned, not arbitrary. The container is 1112px wide
 * at every viewport from 1240px up; the wordmark takes 135 and the status pill
 * 171, which leaves 758 for eight nav items and their gaps. At `gap-4` and the
 * full `tracking-micro` the row measured 814 and squeezed the wordmark off its
 * 6.7593:1 ratio, which §14 forbids. `gap-2.5` with slightly tighter tracking
 * brings it inside the budget with room to spare.
 *
 * The underline stays --sun-500 on every route, MoonRey included: the header is
 * global chrome, and §6.1 specifies the gold underline there the same way it
 * keeps the wordmark's own colours everywhere.
 */

const LINK = [
  'relative inline-block py-1',
  'font-mono text-micro font-medium tracking-[0.12em] uppercase',
  'transition-colors duration-[var(--dur-nav)] ease-sunrey',
  // The underline. origin-left + scaleX is the growth-from-the-left.
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-sun-500 after:content-['']",
  'after:origin-left after:scale-x-0',
  'after:transition-transform after:duration-[var(--dur-nav)] after:ease-sunrey',
  'hover:text-text hover:after:scale-x-100',
  'focus-visible:text-text focus-visible:after:scale-x-100',
].join(' ');

export function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label={LABELS.primaryNav} className="hidden xl:block">
      <ul className="flex items-center gap-2.5">
        {NAV.map((route) => {
          const active = isActive(pathname, route.href);
          return (
            <li key={route.href}>
              <Link
                href={route.href}
                aria-current={active ? 'page' : undefined}
                className={`${LINK} ${active ? 'text-text after:scale-x-100' : 'text-muted'}`}
              >
                {route.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
