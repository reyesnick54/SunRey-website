import { Body, Display, Eyebrow, Section } from '@/components/primitives';
import type { AuthorityModelDiagram } from '@content/ai-agents';
import type { Heading } from '@content/types';

/**
 * AuthorityModel — CLAUDE.md §11.1, "a proposal is not a permission."
 *
 * A five-stage horizontal diagram — Proposal, Permission, Risk, Execution
 * Authority, Settlement — with a gold gate glyph at each of the four
 * boundaries between them, echoing the single gate `ConsensusPlanes` draws
 * at the Blockchain page's one authorization boundary (§8.5), repeated here
 * once per stage transition.
 *
 * The stage sequence exists nowhere else on the page as plain text, so —
 * like `GrowMyMoney` and `ConsensusPlanes` — the whole diagram sits inside a
 * single `role="img"` SVG with a descriptive `aria-label`, and everything
 * inside it is `aria-hidden`. The diagram is wider than the container at
 * small viewport widths (five long labels, four gates), so it renders at its
 * own intrinsic pixel size inside an `overflow-x-auto` wrapper (§5.8) rather
 * than scaling down to illegibility.
 */

const STAGE_W = 190;
const PAD_X = 90;
const ROW_Y = 42;
const LABEL_Y = ROW_Y + 26;
const LINE_H = 12;
const HEIGHT = LABEL_Y + LINE_H * 2 + 6;

function StageLabel({ x, y, text }: { x: number; y: number; text: string }) {
  const words = text.split(' ');

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="fill-muted font-mono text-[10px] tracking-micro uppercase"
    >
      {words.map((word, i) => (
        <tspan key={word} x={x} dy={i === 0 ? 0 : LINE_H}>
          {word}
        </tspan>
      ))}
    </text>
  );
}

function Gate({ x }: { x: number }) {
  return (
    <g transform={`translate(${x}, ${ROW_Y})`}>
      <circle
        r={16}
        className="fill-none stroke-line-accent"
        strokeWidth={1.25}
      />
      <rect
        x={-8}
        y={-11}
        width={16}
        height={22}
        rx={2.5}
        className="fill-bg stroke-accent-500"
        strokeWidth={1.25}
      />
      <line
        x1={0}
        y1={-11}
        x2={0}
        y2={11}
        className="stroke-accent-500"
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </g>
  );
}

function Diagram({ stages, ariaLabel }: AuthorityModelDiagram) {
  const width = PAD_X * 2 + STAGE_W * (stages.length - 1);

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${width} ${HEIGHT}`}
      width={width}
      height={HEIGHT}
      className="h-auto"
    >
      <title>
        The authority model: Proposal, Permission, Risk, Execution Authority and Settlement,
        each boundary between stages passing through a gate
      </title>
      <g aria-hidden="true">
        {stages.map((stage, i) => {
          const x = PAD_X + i * STAGE_W;
          const isLast = i === stages.length - 1;

          return (
            <g key={stage}>
              {!isLast ? (
                <line
                  x1={x + 22}
                  y1={ROW_Y}
                  x2={x + STAGE_W - 22}
                  y2={ROW_Y}
                  className="stroke-line"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                />
              ) : null}
              {!isLast ? <Gate x={x + STAGE_W / 2} /> : null}
              <circle
                cx={x}
                cy={ROW_Y}
                r={4}
                strokeWidth={1.25}
                className="fill-bg stroke-line"
              />
              <StageLabel x={x} y={LABEL_Y} text={stage} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export type AuthorityModelProps = {
  eyebrow: string;
  heading: Heading;
  body: readonly string[];
  diagram: AuthorityModelDiagram;
  id: string;
};

export function AuthorityModel({ eyebrow, heading, body, diagram, id }: AuthorityModelProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
        <div className="flex flex-col gap-5">
          {body.map((paragraph) => (
            <Body key={paragraph}>{paragraph}</Body>
          ))}
        </div>
      </div>

      <div className="mt-14 overflow-x-auto">
        <Diagram {...diagram} />
      </div>
    </Section>
  );
}
