import { CapabilityGrid } from './CapabilityGrid';
import type { Heading, Item } from '@content/types';

/**
 * EconomicPools — CLAUDE.md §10.3, MoonRey's five economic pools.
 *
 * Same `title` + one-sentence-of-copy card shape `CapabilityGrid` already
 * renders for Blockchain's eight capabilities (§8.3) and Exchange's three
 * markets (§11.6) — five cards here, at 2-across/3-across rather than
 * 2-across/4-across, and without the oversized index numeral (the pools are
 * named categories, not a proof-bound sequence, so a "01"–"05" would imply
 * an order the spec never gives them).
 */

export type EconomicPoolsProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly Item[];
  id: string;
};

export function EconomicPools({ eyebrow, heading, items, id }: EconomicPoolsProps) {
  return (
    <CapabilityGrid
      eyebrow={eyebrow}
      heading={heading}
      items={items}
      id={id}
      gridClassName="sm:grid-cols-2 lg:grid-cols-3"
      numbered={false}
    />
  );
}
