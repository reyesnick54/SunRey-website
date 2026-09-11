import { Body, Callout, Display, Eyebrow, Section, cn } from '@/components/primitives';
import type { Heading } from '@content/types';
import type { LoopStage } from '@content/moonrey-coin';

/**
 * EconomicLoop — CLAUDE.md §10.4, "the most important diagram on the site."
 *
 * Seven vertical stages, each carrying its own real, accessible text (a
 * layer tag and the stage's description) — unlike this site's other inline
 * diagrams, there is no separate prose passage elsewhere on the page that
 * already states what the seven stages are, so the stage list here is
 * rendered as ordinary DOM text in an `<ol>`, not folded into an
 * `aria-hidden` SVG the way `GrowMyMoney` or `ConsensusPlanes` do it. The
 * *shape* of the flow — the coloured spine connecting each stage, and the
 * return arrow closing the loop — is what's drawn.
 *
 * This is the §5.1-sanctioned exception to the MoonRey page's silver-only
 * rule: stages 1–2 are gold, stage 3 is a gold-to-silver bridge, stages 4–5
 * are silver, stages 6–7 are neutral, and a return arrow runs from the
 * seventh stage back to the first, closing the cycle. Colour is applied
 * directly from `sun-*`/`moon-*` here, never through the page's `--accent-*`
 * indirection, because the diagram's subject *is* the handoff between the
 * two economies.
 */

export type EconomicLoopProps = {
  eyebrow: string;
  heading: Heading;
  stages: readonly LoopStage[];
  workedExample: string;
  id: string;
};

/** Spine dot fill, one per stage, in order. */
const DOT: readonly string[] = [
  'bg-sun-500',
  'bg-sun-500',
  'bg-gradient-to-b from-sun-500 to-moon-500',
  'bg-moon-500',
  'bg-moon-500',
  'bg-bg border border-line',
  'bg-bg border border-line',
];

/** Spine bar below each stage, connecting it to the next. Six entries for seven stages. */
const BAR: readonly string[] = [
  'bg-sun-500',
  'bg-gradient-to-b from-sun-500 to-moon-500',
  'bg-gradient-to-b from-sun-500 to-moon-500',
  'bg-moon-500',
  'bg-gradient-to-b from-moon-500 to-line',
  'bg-line',
];

/** Layer-tag text colour, one per stage, in order. */
const LABEL: readonly string[] = [
  'text-sun-500',
  'text-sun-500',
  'text-faint',
  'text-moon-500',
  'text-moon-500',
  'text-faint',
  'text-faint',
];

export function EconomicLoop({ eyebrow, heading, stages, workedExample, id }: EconomicLoopProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-14 flex max-w-[640px] items-stretch gap-4">
        {/* The return arrow: stage seven closes the loop back to stage one. A
            self-contained decorative diagram — the substantive content of
            each stage is the accessible text in the list beside it. */}
        <div className="relative w-6 shrink-0">
          <svg
            role="img"
            aria-label="A curved return arrow running from the seventh stage, the economic loop, back up to the first stage, the human layer — closing the cycle from settled outcomes to renewed demand."
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <title>The loop closes: outcomes return from the economic loop to the human layer</title>
            <defs>
              <marker
                id="economic-loop-arrowhead"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 Z" className="fill-faint" />
              </marker>
            </defs>
            <path
              d="M14,98 C 2,98 2,2 14,2"
              className="fill-none stroke-faint"
              strokeWidth={1.25}
              vectorEffect="non-scaling-stroke"
              markerEnd="url(#economic-loop-arrowhead)"
            />
          </svg>
        </div>

        <ol className="flex flex-1 flex-col">
          {stages.map((stage, i) => {
            const isLast = i === stages.length - 1;

            return (
              <li key={stage.text} className="relative flex gap-5 pb-10 last:pb-0">
                <div className="relative w-6 shrink-0">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-1 left-1/2 size-3 -translate-x-1/2 rounded-full',
                      DOT[i],
                    )}
                  />
                  {!isLast ? (
                    <span
                      aria-hidden="true"
                      className={cn('absolute top-4 bottom-0 left-1/2 w-px -translate-x-1/2', BAR[i])}
                    />
                  ) : null}
                </div>

                <div className="flex flex-col gap-1.5">
                  <p
                    className={cn(
                      'font-mono text-micro font-medium tracking-micro uppercase',
                      LABEL[i],
                    )}
                  >
                    {stage.layer}
                  </p>
                  <Body>{stage.text}</Body>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <Callout className="mt-12">{workedExample}</Callout>
    </Section>
  );
}
