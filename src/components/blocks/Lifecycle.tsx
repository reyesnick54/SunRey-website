import { Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * Lifecycle — CLAUDE.md §11.2, the ten-stage Access process line.
 *
 * Ten real, accessible stage labels ("Quote", "Coverage", …) in an `<ol>`,
 * connected by small decorative arrow glyphs. Per §11.2 the line "wraps to
 * two rows on narrow screens" — a `flex-wrap` row does exactly that natively,
 * which is a better fit than an `overflow-x` scroll container for content the
 * spec explicitly wants to wrap rather than pan. The arrows carry no
 * information beyond what the `<ol>` order already gives, so they are
 * `aria-hidden`, the same reasoning `EconomicLoop` (§10.4) uses for its own
 * connecting shape.
 */

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-faint">
      <path
        d="M3 8h9M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type LifecycleProps = {
  eyebrow: string;
  heading: Heading;
  stages: readonly string[];
  below: string;
  id: string;
};

export function Lifecycle({ eyebrow, heading, stages, below, id }: LifecycleProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <ol className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-4">
        {stages.map((stage, i) => (
          <li key={stage} className="flex items-center gap-2">
            <span className="rounded-full border border-line px-3 py-1.5 font-mono text-micro font-medium tracking-micro text-text uppercase">
              {stage}
            </span>
            {i < stages.length - 1 ? <ArrowIcon /> : null}
          </li>
        ))}
      </ol>

      <p className="mt-10 max-w-[var(--measure-body)] text-body text-muted">{below}</p>
    </Section>
  );
}
