import type { ReactNode } from 'react';

import { cn } from './cn';

/**
 * Display — CLAUDE.md §5.2.
 *
 * The heading scale, plus signature type treatment 1: the two-tone display,
 * where line one is --text and line two is the accent. As in
 * "Finance, / evolved." Use it for the hero and at most one H2 per page.
 *
 * Lines are explicit, not soft-wrapped, because the line break is part of the
 * composition. Each line is a block span inside a single heading element, so
 * the page still has exactly one <h1> and the heading reads as one string.
 */

export type DisplaySize = 'xl' | 'l' | 'm';
export type DisplayTone = 'two-tone' | 'plain' | 'accent';

export type DisplayProps = {
  /** One entry per rendered line. */
  lines: readonly string[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  size?: DisplaySize;
  /**
   * `two-tone` accents every line from `accentFrom` onward (default: the last
   * line). `accent` colours the whole heading. `plain` is all --text.
   */
  tone?: DisplayTone;
  accentFrom?: number;
  className?: string;
  id?: string;
};

const SIZE = {
  xl: 'text-display-xl tracking-display-xl font-extralight',
  l: 'text-display-l tracking-display-l font-extralight',
  m: 'text-display-m tracking-display-m font-light',
} as const;

export function Display({
  lines,
  as: Tag = 'h2',
  size = 'm',
  tone = 'plain',
  accentFrom,
  className,
  id,
}: DisplayProps) {
  const firstAccent =
    tone === 'accent' ? 0 : tone === 'two-tone' ? (accentFrom ?? lines.length - 1) : lines.length;

  return (
    <Tag id={id} className={cn('font-display text-text', SIZE[size], className)}>
      {lines.map((line, i) => (
        <span
          key={line}
          className={cn('block', i >= firstAccent && 'text-accent-500')}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}

/**
 * Title — §5.2 `title`. Card headings.
 */
export function Title({
  children,
  as: Tag = 'h3',
  className,
}: {
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4' | 'p';
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        'font-display text-title tracking-title font-normal text-text',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
