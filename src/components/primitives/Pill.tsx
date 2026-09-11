import type { ReactNode } from 'react';

import { cn } from './cn';

/**
 * Pill — CLAUDE.md §6.1 (header status pill) and §7.8 (status board).
 *
 * Contrast against --bg for each tone, all as micro text, all above 4.5:1:
 *   running  --sun-500   10.37:1
 *   testnet  --sun-700    5.40:1
 *   partial  --moon-500   7.85:1
 *   sandbox  --moon-500   7.85:1, with a --moon-700 border
 *   disabled --text-faint 4.60:1
 *
 * --moon-700 and --moon-900 are border-and-fill tokens only. They are never
 * used for text here, and must not be.
 */

export type PillTone =
  | 'status'
  | 'running'
  | 'testnet'
  | 'partial'
  | 'sandbox'
  | 'disabled';

export type PillProps = {
  children: ReactNode;
  tone?: PillTone;
  /** Render a leading dot in the pill's own colour. */
  dot?: boolean;
  /** Soft pulse on the dot. Disabled under prefers-reduced-motion (§5.6). */
  pulse?: boolean;
  className?: string;
};

const TONE: Record<PillTone, { text: string; border: string; dot: string }> = {
  status: { text: 'text-accent-500', border: 'border-line-accent', dot: 'bg-accent-500' },
  running: { text: 'text-sun-500', border: 'border-line-gold', dot: 'bg-sun-500' },
  testnet: { text: 'text-sun-700', border: 'border-line-gold', dot: 'bg-sun-700' },
  partial: { text: 'text-moon-500', border: 'border-line-moon', dot: 'bg-moon-500' },
  sandbox: { text: 'text-moon-500', border: 'border-moon-700', dot: 'bg-moon-500' },
  disabled: { text: 'text-faint', border: 'border-line', dot: 'bg-faint' },
};

export function Pill({
  children,
  tone = 'status',
  dot = false,
  pulse = false,
  className,
}: PillProps) {
  const t = TONE[tone];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5',
        'font-mono text-micro font-medium tracking-micro uppercase whitespace-nowrap',
        t.text,
        t.border,
        className,
      )}
    >
      {dot ? (
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 shrink-0 rounded-full',
            t.dot,
            pulse && 'motion-safe:animate-pulse',
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
