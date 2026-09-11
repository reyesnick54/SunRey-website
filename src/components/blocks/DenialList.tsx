import { Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * DenialList — an enumeration of items, each paired with the same trailing
 * label, followed by a closing paragraph.
 *
 * §8.7 ("what cannot mint") reads better as a hard-edged enumeration of
 * denials than as prose, and §11.6 explicitly reuses "the same treatment" for
 * its surveillance list with a different trailing label
 * ("detection interface" instead of "cannot mint"). Generic and prop-driven —
 * §11.1's "what agents may not do" is the next page that will want this shape.
 */

export type DenialListProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly string[];
  /** The label every row trails with, e.g. "cannot mint", "detection interface". */
  trailingLabel: string;
  closing: string;
  id: string;
};

export function DenialList({
  eyebrow,
  heading,
  items,
  trailingLabel,
  closing,
  id,
}: DenialListProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-12 flex flex-col divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div
            key={item}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <p className="text-body text-text">{item}</p>
            <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase">
              {trailingLabel}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-[62ch] text-body text-muted">{closing}</p>
    </Section>
  );
}
