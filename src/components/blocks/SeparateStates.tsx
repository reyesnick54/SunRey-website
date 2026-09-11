import { Body, Card, Display, Eyebrow, Section } from '@/components/primitives';
import type { SeparateState } from '@content/access';
import type { Heading } from '@content/types';

/**
 * SeparateStates — CLAUDE.md §11.2, "three states that never merge."
 *
 * Deliberately three genuinely separate boxes with no shared border — the
 * separation between token participation, entitlement and fiat settlement
 * states is the entire point of this section, so each state renders as its
 * own independent `Card`, spaced generously apart, rather than as columns of
 * one bordered row (the shape every other three-or-more-item list on this
 * site uses). No hairlines connect them.
 */
export type SeparateStatesProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly SeparateState[];
  below: string;
  id: string;
};

export function SeparateStates({ eyebrow, heading, items, below, id }: SeparateStatesProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
        {items.map((item) => (
          <Card key={item.n}>
            <div className="flex h-full flex-col gap-3">
              <p
                aria-hidden="true"
                className="font-display text-[2.25rem] leading-none font-extralight text-accent-numeral"
              >
                {item.n}
              </p>
              <p className="font-display text-title tracking-title font-normal text-text">
                {item.title}
              </p>
              <Body>{item.copy}</Body>
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-10 max-w-[62ch] text-body text-muted">{below}</p>
    </Section>
  );
}
