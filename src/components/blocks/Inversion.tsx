import { Display, Eyebrow, Section } from '@/components/primitives';
import type { InversionPanel } from '@content/vault';
import type { Heading } from '@content/types';

/**
 * Inversion — CLAUDE.md §11.3, "the same machinery, pointed the other way."
 *
 * Two deliberately asymmetric panels: the historical model in `--text-faint`
 * on the page ground, visually receding; the SunRey model raised
 * (`--bg-raised`) and gold-bordered (`--line-accent`). The asymmetry is the
 * argument, so the two panels do not share a component — unlike every other
 * two-panel split on the site (`DualEconomy`, `TwoIndices`, `SplitColumns`),
 * there is no hairline between them and no attempt to balance their weight.
 */
export type InversionProps = {
  eyebrow: string;
  heading: Heading;
  left: InversionPanel;
  right: InversionPanel;
  below: string;
  id: string;
};

export function Inversion({ eyebrow, heading, left, right, below, id }: InversionProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-10">
        <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line/60 p-6 sm:p-8">
          <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase">
            {left.label}
          </p>
          <p className="text-body text-faint">{left.text}</p>
        </div>

        <div className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-line-accent bg-bg-raised p-6 sm:p-8">
          <p className="font-mono text-micro font-medium tracking-micro text-accent-500 uppercase">
            {right.label}
          </p>
          <p className="text-body text-text">{right.text}</p>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-[var(--measure-lede)] text-center text-body text-muted">
        {below}
      </p>
    </Section>
  );
}
