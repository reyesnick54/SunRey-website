import { Body, Display, Eyebrow, Section, cn } from '@/components/primitives';
import type { AutonomyLevel } from '@content/ai-agents';
import type { Heading } from '@content/types';

/**
 * AutonomyLadder — CLAUDE.md §11.1, "the core of this page."
 *
 * Five rows — numeral, level, behaviour, control standard — that read as a
 * table at `sm` and above (a shared grid template, with a header row giving
 * each column its label) and collapse to a single stacked column below it,
 * where each field gets its own inline micro-label so the mapping from
 * numeral to behaviour to control standard survives the loss of the grid.
 * The final row (Execute) is emphasised with `--line-accent` (`--line-gold`
 * on this page), per spec.
 */

const COLS = 'grid-cols-1 sm:grid-cols-[3.5rem_9rem_1fr_1fr]';

export type AutonomyLadderProps = {
  eyebrow: string;
  heading: Heading;
  rows: readonly AutonomyLevel[];
  below: string;
  id: string;
};

export function AutonomyLadder({ eyebrow, heading, rows, below, id }: AutonomyLadderProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      {/* The grid collapses to one column below `sm`, so it never needs to
          scroll on its own — but per the wide-content rule (§5.8, §12.1) it
          still gets a defensive `overflow-x-auto`, unconstrained by any
          `min-width`, so a long control-standard sentence can never force
          the page body itself to scroll. */}
      <div className="mt-14 overflow-x-auto">
        <div>
          <div className={cn('hidden gap-6 px-1 pb-3 sm:grid', COLS)}>
            <span aria-hidden="true" />
            <Eyebrow tone="faint" as="span">
              Level
            </Eyebrow>
            <Eyebrow tone="faint" as="span">
              Behavior
            </Eyebrow>
            <Eyebrow tone="faint" as="span">
              Control standard
            </Eyebrow>
          </div>

          <div className="flex flex-col gap-3">
            {rows.map((row, i) => {
              const isLast = i === rows.length - 1;

              return (
                <div
                  key={row.n}
                  className={cn(
                    'grid gap-3 rounded-[var(--radius-card)] border p-5 sm:items-start sm:gap-6 sm:p-6',
                    COLS,
                    isLast ? 'border-line-accent bg-bg-raised' : 'border-line',
                  )}
                >
                  <p
                    aria-hidden="true"
                    className="font-display text-[2rem] leading-none font-extralight text-accent-numeral"
                  >
                    {row.n}
                  </p>

                  <p className="font-display text-title tracking-title font-normal text-text">
                    {row.level}
                  </p>

                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase sm:hidden">
                      Behavior
                    </p>
                    <Body>{row.behavior}</Body>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase sm:hidden">
                      Control standard
                    </p>
                    <Body tone="faint">{row.controlStandard}</Body>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-[var(--measure-body)] text-body text-muted">{below}</p>
    </Section>
  );
}
