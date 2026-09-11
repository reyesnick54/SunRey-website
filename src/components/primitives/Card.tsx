import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from './cn';

/**
 * Card — CLAUDE.md §5.4.
 *
 * --bg-raised, 1px --line, 16px radius, no drop shadow. The entire hover
 * vocabulary of this site is: the border becomes --line-accent and a faint
 * inner glow appears, over 220ms. No lifts, no scales, no shadows. Do not add
 * any.
 *
 * Passing `href` makes the whole surface the link — so a Card with an href must
 * not contain another interactive element.
 */

export type CardProps = {
  children: ReactNode;
  href?: string;
  /** Apply the hover treatment on a non-link card. */
  interactive?: boolean;
  className?: string;
};

const BASE = 'block rounded-[var(--radius-card)] border border-line bg-bg-raised p-6 sm:p-8';

const HOVER = cn(
  'transition-[border-color,box-shadow] duration-[var(--dur-hover)] ease-sunrey',
  'hover:border-line-accent hover:shadow-[inset_0_0_48px_-16px_var(--line-accent)]',
  'focus-visible:border-line-accent',
);

export function Card({ children, href, interactive = false, className }: CardProps) {
  if (href) {
    return (
      <Link href={href} className={cn(BASE, HOVER, className)}>
        {children}
      </Link>
    );
  }

  return (
    <div className={cn(BASE, interactive && HOVER, className)}>{children}</div>
  );
}

/**
 * Callout — the bordered aside used throughout §8–§11. Accent border, no fill
 * change, no radius change.
 */
export function Callout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-card)] border border-line-accent p-6 sm:p-8',
        'text-body text-muted max-w-[var(--measure-body)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
