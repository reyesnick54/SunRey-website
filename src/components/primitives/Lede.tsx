import type { ReactNode } from 'react';

import { cn } from './cn';

/**
 * Lede and Body — CLAUDE.md §5.2.
 *
 * Measure is enforced here, not by the caller: lede caps at 56ch, body at 68ch.
 * Never full-width paragraphs.
 */

export function Lede({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode;
  tone?: 'muted' | 'text' | 'faint';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-lede max-w-[var(--measure-lede)]',
        tone === 'muted' && 'text-muted',
        tone === 'text' && 'text-text',
        tone === 'faint' && 'text-faint',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Body({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode;
  tone?: 'muted' | 'text' | 'faint';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-body max-w-[var(--measure-body)]',
        tone === 'muted' && 'text-muted',
        tone === 'text' && 'text-text',
        tone === 'faint' && 'text-faint',
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Prose — a run of paragraphs from a content file, at body measure.
 */
export function Prose({
  paragraphs,
  tone = 'muted',
  className,
}: {
  paragraphs: readonly string[];
  tone?: 'muted' | 'text' | 'faint';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {paragraphs.map((paragraph) => (
        <Body key={paragraph} tone={tone}>
          {paragraph}
        </Body>
      ))}
    </div>
  );
}
