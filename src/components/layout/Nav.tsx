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
 * TYPEFACE. Jost — the brand display face, the same one the wordmark is built
 * around — not the JetBrains Mono that §5.2 assigns to micro labels generally.
 * Nick asked for the nav to match the branding, and he is right that it should:
 * the nav sits inches from the wordmark, and a monospace row beside a geometric
 * lockup reads as a different system. Mono stays where §5.2 put it everywhere
 * else — eyebrows, rails, data labels.
 *
 * The size, gap and tracking are tuned, not arbitrary. The binding case is the
 * 1024px breakpoint, where the container gives the row 921px and the wordmark
 * takes 135 — leaving about 762 for eight labels and seven gaps. Jost is
 * proportional and sets far narrower than mono at the same size, which buys
 * back the tracking: these values land near §5.2's micro spec and still fit.
 *
 * If a label is ever added or renamed, re-measure. The budget is fixed.
 *
 * The underline stays --sun-500 on every route, MoonRey included: the header is
 * global chrome, and §6.1 specifies the gold underline there the same way it
 * keeps the wordmark's own colours everywhere.
 */

const LINK = [
  'relative inline-block py-1',
  'font-display text-micro font-medium tracking-[0.15em] uppercase',
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
    <nav aria-label={LABELS.primaryNav} className="hidden lg:block">
      <ul className="flex items-center gap-4 xl:gap-5">
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
