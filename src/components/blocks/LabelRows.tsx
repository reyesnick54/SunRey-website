import { Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading, Row } from '@content/types';

/**
 * LabelRows — a two-column label/description list, hairline separated.
 *
 * Used by §11.6's "The components" (ten rows describing the exchange stack).
 * Generic and prop-driven for reuse wherever another page needs the same
 * label/value shape (Vault's on-chain/off-chain split, Access's states, …).
 *
 * The row grid collapses to one column below `sm`, so it never needs to
 * scroll on its own — but per the wide-content rule (§5.8, §12.1) the row
 * list still gets its own `overflow-x-auto` wrapper as a defensive floor: a
 * long label or value can never force the page body itself to scroll.
 */

export type LabelRowsProps = {
  eyebrow: string;
  heading: Heading;
  rows: readonly Row[];
  id: string;
};

export function LabelRows({ eyebrow, heading, rows, id }: LabelRowsProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-12 overflow-x-auto">
        <div className="flex min-w-[280px] flex-col divide-y divide-line border-y border-line">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8"
            >
              <p className="text-body text-text">{row.label}</p>
              <p className="text-body text-muted">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
