import { Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * ScopeList — CLAUDE.md §9.4, "the human layer, in full."
 *
 * A plain two-column list of statements, hairline separated, no cards — the
 * spec is explicit that this section is not a grid. Ten items split evenly
 * into two independently-divided columns (first five, then the rest); at
 * `md` and below the columns simply stack in source order, so reading order
 * never jumps.
 */

export type ScopeListProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly string[];
  id: string;
};

export function ScopeList({ eyebrow, heading, items, id }: ScopeListProps) {
  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];

  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {columns.map((column, i) => (
          <div
            key={i === 0 ? 'left' : 'right'}
            className="flex flex-col divide-y divide-line border-y border-line"
          >
            {column.map((item) => (
              <p key={item} className="py-4 text-body text-text">
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
