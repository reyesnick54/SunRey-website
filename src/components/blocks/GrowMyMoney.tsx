import Link from 'next/link';

import { Body, Display, Eyebrow, Lede, Section, cn } from '@/components/primitives';
import type { GrowMyMoneyDiagram as DiagramData, HomeContent } from '@content/home';

/**
 * Grow My Money — CLAUDE.md §7.5.
 *
 * Split layout: copy left, an inline-SVG flow diagram right. Reused verbatim
 * (copy and diagram both) by the A.I. Agents page per §11.1 — this component
 * takes only the typed content as props, so it carries no Home-specific
 * assumption.
 */

const ROW_H = 52;
const PAD_Y = 24;
const DOT_R = 4;
const LABEL_X = 42;
const DIAGRAM_W = 240;

function Diagram({ nodes, accentIndex, ariaLabel }: DiagramData) {
  const height = PAD_Y * 2 + ROW_H * (nodes.length - 1);
  const cx = DOT_R + 1;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${DIAGRAM_W} ${height}`}
      className="h-auto w-full max-w-[280px]"
    >
      <title>Grow My Money: from a stated goal to an executed, attributed action</title>
      <g aria-hidden="true">
        {nodes.map((node, i) => {
          const y = PAD_Y + i * ROW_H;
          const accent = i === accentIndex;

          return (
            <g key={node}>
              {i > 0 ? (
                <line
                  x1={cx}
                  y1={y - ROW_H + DOT_R + 5}
                  x2={cx}
                  y2={y - DOT_R - 5}
                  className="stroke-line"
                  strokeWidth={1.25}
                  strokeLinecap="round"
                />
              ) : null}
              <circle
                cx={cx}
                cy={y}
                r={DOT_R}
                strokeWidth={1.25}
                className={cn('fill-bg', accent ? 'stroke-accent-500' : 'stroke-line')}
              />
              <text
                x={LABEL_X}
                y={y}
                dominantBaseline="middle"
                className={cn(
                  'font-mono text-[11px] tracking-micro uppercase',
                  accent ? 'fill-accent-500' : 'fill-muted',
                )}
              >
                {node}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function GrowMyMoney({
  eyebrow,
  heading,
  lede,
  body,
  link,
  diagram,
}: HomeContent['growMyMoney']) {
  return (
    <Section as="section" divided aria-labelledby="grow-my-money-heading">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center md:gap-[var(--grid-gap)]">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display
            id="grow-my-money-heading"
            as="h2"
            size="m"
            tone="two-tone"
            lines={heading}
          />
          <Lede>{lede}</Lede>
          <div className="flex flex-col gap-5">
            {body.map((paragraph) => (
              <Body key={paragraph}>{paragraph}</Body>
            ))}
          </div>
          <Link
            href={link.href}
            className="text-body font-medium text-accent-500 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300"
          >
            {link.label}
          </Link>
        </div>

        <div className="flex justify-center md:justify-end">
          <Diagram {...diagram} />
        </div>
      </div>
    </Section>
  );
}
