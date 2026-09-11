import type { ReactNode } from 'react';

import { cn } from './cn';

/**
 * Eyebrow — CLAUDE.md §5.2 `micro`.
 *
 * Uppercase, letter-spaced 0.18em, mono. Gold by default (§5.1 permits
 * --sun-500 for micro labels); `tone="faint"` is the §5.2 spaced-rail colour.
 *
 * Accent colour comes from --accent-500, so a MoonRey subtree gets silver
 * automatically without a one-off override.
 */

export type EyebrowProps = {
  children: ReactNode;
  tone?: 'accent' | 'faint' | 'muted';
  as?: 'p' | 'span' | 'div' | 'h2';
  className?: string;
  id?: string;
};

const TONE = {
  accent: 'text-accent-500',
  faint: 'text-faint',
  muted: 'text-muted',
} as const;

export function Eyebrow({
  children,
  tone = 'accent',
  as: Tag = 'p',
  className,
  id,
}: EyebrowProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'font-mono text-micro font-medium tracking-micro uppercase',
        TONE[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Rail — CLAUDE.md §5.2, signature treatment 2.
 *
 * A row of uppercase micro words separated by `·`. The separators are decorative,
 * so they are hidden from the accessibility tree; the words read as a plain list.
 */
export function Rail({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-2',
        'font-mono text-micro font-medium tracking-micro text-faint uppercase',
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-x-3">
          {i > 0 ? (
            <span aria-hidden="true" className="text-faint/60">
              ·
            </span>
          ) : null}
          {item}
        </li>
      ))}
    </ul>
  );
}
