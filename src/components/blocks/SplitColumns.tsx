import { Display, Eyebrow, Rule, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * SplitColumns — CLAUDE.md §11.3, "what the chain sees. What it never
 * sees." A hard split, two columns of equal weight, hairline down the
 * middle — unlike `Inversion` two sections above it on the same page, this
 * split is symmetric: on-chain and off-chain are two lists of the same
 * length and the same visual register, just headed differently.
 */
export type SplitColumnsProps = {
  eyebrow: string;
  heading: Heading;
  onChainLabel: string;
  offChainLabel: string;
  onChain: readonly string[];
  offChain: readonly string[];
  id: string;
};

export function SplitColumns({
  eyebrow,
  heading,
  onChainLabel,
  offChainLabel,
  onChain,
  offChain,
  id,
}: SplitColumnsProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-stretch md:gap-14">
        <div className="flex flex-1 flex-col gap-5">
          <p className="font-mono text-micro font-medium tracking-micro text-accent-500 uppercase">
            {onChainLabel}
          </p>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {onChain.map((item) => (
              <li key={item} className="py-3 text-body text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Rule orientation="vertical" fade className="hidden self-stretch md:block" />

        <div className="flex flex-1 flex-col gap-5">
          <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase">
            {offChainLabel}
          </p>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {offChain.map((item) => (
              <li key={item} className="py-3 text-body text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
