import { Body, Display, Eyebrow, Section, Title } from '@/components/primitives';
import type { Heading, Item } from '@content/types';

/**
 * ThreeDenials — CLAUDE.md §9.2, "what it is not."
 *
 * Three items, each a heading plus one sentence, hairline separated. The
 * shape is exactly `Item` (title + copy) — the same generic pair
 * `CapabilityGrid` and `EconomicPools` render as cards — laid out instead as
 * a stacked, undecorated list, because §9.2 asks the page to "lead with the
 * denials" before anything else: a card grid this early would read as a
 * feature list, not a disarming order of admissions.
 */

export type ThreeDenialsProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly Item[];
  id: string;
};

export function ThreeDenials({ eyebrow, heading, items, id }: ThreeDenialsProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-12 flex flex-col divide-y divide-line border-y border-line">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-2 py-6">
            <Title as="h3">{item.title}</Title>
            <Body>{item.copy}</Body>
          </div>
        ))}
      </div>
    </Section>
  );
}
