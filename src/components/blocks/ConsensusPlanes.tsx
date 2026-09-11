import { Body, Display, Eyebrow, Section } from '@/components/primitives';
import type { BlockchainContent, ConsensusDiagram } from '@content/blockchain';

/**
 * ConsensusPlanes — CLAUDE.md §8.5. Copy left, a two-column inline-SVG
 * diagram right: two vertical stacks converging on a single gold gate glyph
 * at the point labelled AUTHORIZATION BOUNDARY.
 */

const ROW_H = 56;
const TOP_PAD = 16;
const STACK_H = TOP_PAD + ROW_H * 2;
const GATE_Y = STACK_H + 56;
const LABEL_Y = GATE_Y + 34;
const WIDTH = 320;
const LEFT_X = 92;
const RIGHT_X = WIDTH - 92;
const GATE_X = WIDTH / 2;
const HEIGHT = LABEL_Y + 16;

function Stack({ x, stages }: { x: number; stages: readonly string[] }) {
  return (
    <g aria-hidden="true">
      {stages.map((stage, i) => {
        const y = TOP_PAD + i * ROW_H;
        const isLast = i === stages.length - 1;

        return (
          <g key={stage}>
            {i > 0 ? (
              <line
                x1={x}
                y1={y - ROW_H + 10}
                x2={x}
                y2={y - 10}
                className="stroke-line"
                strokeWidth={1.25}
                strokeLinecap="round"
              />
            ) : null}
            <circle
              cx={x}
              cy={y}
              r={3.5}
              strokeWidth={1.25}
              className={isLast ? 'fill-bg stroke-accent-500' : 'fill-bg stroke-line'}
            />
            <text
              x={x}
              y={y - 14}
              textAnchor="middle"
              className={
                isLast
                  ? 'fill-accent-500 font-mono text-[10px] tracking-micro uppercase'
                  : 'fill-faint font-mono text-[10px] tracking-micro uppercase'
              }
            >
              {stage}
            </text>
          </g>
        );
      })}
      <line
        x1={x}
        y1={TOP_PAD + ROW_H * (stages.length - 1) + 10}
        x2={GATE_X + (x < GATE_X ? 14 : -14)}
        y2={GATE_Y - 12}
        className="stroke-line-accent"
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </g>
  );
}

function Diagram({ left, right, gate, ariaLabel }: ConsensusDiagram) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full max-w-[360px]"
    >
      <title>Two consensus planes converging at a single authorization boundary</title>
      <Stack x={LEFT_X} stages={left} />
      <Stack x={RIGHT_X} stages={right} />
      <g aria-hidden="true">
        <circle
          cx={GATE_X}
          cy={GATE_Y}
          r={18}
          className="fill-none stroke-line-accent"
          strokeWidth={1.25}
        />
        <rect
          x={GATE_X - 11}
          y={GATE_Y - 13}
          width={22}
          height={26}
          rx={2.5}
          className="fill-none stroke-accent-500"
          strokeWidth={1.25}
        />
        <line
          x1={GATE_X}
          y1={GATE_Y - 13}
          x2={GATE_X}
          y2={GATE_Y + 13}
          className="stroke-accent-500"
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <text
          x={GATE_X}
          y={LABEL_Y}
          textAnchor="middle"
          className="fill-muted font-mono text-[10px] tracking-micro uppercase"
        >
          {gate}
        </text>
      </g>
    </svg>
  );
}

export function ConsensusPlanes({
  eyebrow,
  heading,
  body,
  diagram,
}: BlockchainContent['consensus']) {
  return (
    <Section as="section" divided aria-labelledby="consensus-heading">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center md:gap-[var(--grid-gap)]">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display id="consensus-heading" as="h2" size="m" tone="plain" lines={heading} />
          <div className="flex flex-col gap-5">
            {body.map((paragraph) => (
              <Body key={paragraph}>{paragraph}</Body>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Diagram {...diagram} />
        </div>
      </div>
    </Section>
  );
}
