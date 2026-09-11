import { CapabilityGrid } from './CapabilityGrid';
import type { Heading, Item } from '@content/types';

/**
 * NamedSystems — CLAUDE.md §11.1, "named systems."
 *
 * The same title + one-sentence card shape `CapabilityGrid` already renders
 * for Blockchain's eight capabilities (§8.3) and Exchange's three markets
 * (§11.6) — six cards here, at 2-across/3-across, without the oversized
 * index numeral (these are named systems, not a proof-bound sequence).
 */
export type NamedSystemsProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly Item[];
  id: string;
};

export function NamedSystems({ eyebrow, heading, items, id }: NamedSystemsProps) {
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
