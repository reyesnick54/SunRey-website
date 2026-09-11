import { cn } from './cn';

/**
 * Rule — CLAUDE.md §5.3.
 *
 * A 1px hairline. No heavy dividers anywhere on the site: sections are
 * separated by whitespace alone or by one of these.
 *
 * `fade` dissolves the line at both ends — the §7.3 dual-economy split.
 *
 * The tone sets a local `--rule-color` custom property and the gradient reads
 * it, so there are no inline styles and no hard-coded colour values here.
 */

export type RuleProps = {
  orientation?: 'horizontal' | 'vertical';
  tone?: 'line' | 'accent' | 'hairline';
  fade?: boolean;
  className?: string;
};

const TONE = {
  line: '[--rule-color:var(--line)]',
  accent: '[--rule-color:var(--line-accent)]',
  hairline: '[--rule-color:var(--hairline)]',
} as const;

const SOLID = 'bg-[var(--rule-color)]';

const FADE = {
  horizontal:
    'bg-[linear-gradient(to_right,transparent,var(--rule-color)_18%,var(--rule-color)_82%,transparent)]',
  vertical:
    'bg-[linear-gradient(to_bottom,transparent,var(--rule-color)_18%,var(--rule-color)_82%,transparent)]',
} as const;

export function Rule({
  orientation = 'horizontal',
  tone = 'line',
  fade = false,
  className,
}: RuleProps) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        TONE[tone],
        fade ? FADE[orientation] : SOLID,
        className,
      )}
    />
  );
}
