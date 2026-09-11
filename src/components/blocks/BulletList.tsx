import { Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * BulletList — the site's one bullet treatment (§5, referenced again at
 * §11.9): a `--sun-500`/`--accent-500` interpunct, 16px gap, items in
 * `--text-muted`. Used by §11.6's "Listing discipline". Generic and
 * prop-driven for the guardrail/open-decision lists other pages need
 * (§9.5, §10.6, §11.3's compute-to-data limits).
 */

export type BulletListProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly string[];
  id: string;
};

export function BulletList({ eyebrow, heading, items, id }: BulletListProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <ul className="mt-10 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex gap-4">
            <span aria-hidden="true" className="mt-[0.65em] text-accent-500">
              &middot;
            </span>
            <p className="max-w-[var(--measure-body)] text-body text-muted">{item}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
