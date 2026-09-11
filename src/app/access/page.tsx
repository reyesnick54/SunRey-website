import type { Metadata } from 'next';

import { Card, Display, Eyebrow, Section, Title } from '@/components/primitives';
import { CopySection } from '@/components/blocks/CopySection';
import { Lifecycle } from '@/components/blocks/Lifecycle';
import { PageHero } from '@/components/blocks/PageHero';
import { SeparateStates } from '@/components/blocks/SeparateStates';
import { access } from '@content/access';

/**
 * Access (`/access`) — CLAUDE.md §11.2. Every block reads its copy from
 * `content/access.ts`; this file only sequences them in the order §11.2
 * gives.
 *
 * "The definition" and "Categories" are simple enough compositions of
 * existing primitives (a callout plus a hairline-divided denial list; a
 * small card grid plus a footnote) that they are written directly here
 * rather than through a dedicated block component — the same choice
 * `sunrey-coin/page.tsx` makes for its ticker-notice callout.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: access.meta.title,
  description: access.meta.description,
};

export default function AccessPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <PageHero {...access.hero} />

      <Section as="section" divided aria-labelledby="definition-heading">
        <div className="flex flex-col gap-6">
          <Eyebrow>{access.definition.eyebrow}</Eyebrow>
          <Display
            id="definition-heading"
            as="h2"
            size="m"
            tone="plain"
            lines={access.definition.heading}
          />
        </div>

        {/* At `lede` size per §11.2 — `Callout` is hard-coded to `body` size, so
            this one callout is built directly from its same visual treatment
            (border-line-accent, radius-card, matching padding) rather than
            fighting that primitive's fixed text size with a className. */}
        <div className="mt-10 rounded-[var(--radius-card)] border border-line-accent p-6 sm:p-8">
          <p className="max-w-[var(--measure-lede)] text-lede text-muted">
            {access.definition.callout}
          </p>
        </div>

        <div className="mt-10 flex flex-col divide-y divide-line border-y border-line">
          {access.definition.denials.map((denial) => (
            <div key={denial.title} className="flex flex-col gap-2 py-6">
              <Title as="h3">{denial.title}</Title>
              <p className="max-w-[var(--measure-body)] text-body text-muted">{denial.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <SeparateStates
        id="separate-states-heading"
        eyebrow={access.separateStates.eyebrow}
        heading={access.separateStates.heading}
        items={access.separateStates.items}
        below={access.separateStates.below}
      />

      <CopySection
        id="allocation-heading"
        eyebrow={access.allocation.eyebrow}
        heading={access.allocation.heading}
        body={access.allocation.body}
      />

      <Lifecycle
        id="lifecycle-heading"
        eyebrow={access.lifecycle.eyebrow}
        heading={access.lifecycle.heading}
        stages={access.lifecycle.stages}
        below={access.lifecycle.below}
      />

      <Section as="section" divided aria-labelledby="categories-heading">
        <div className="flex flex-col gap-6">
          <Eyebrow>{access.categories.eyebrow}</Eyebrow>
          <Display
            id="categories-heading"
            as="h2"
            size="m"
            tone="plain"
            lines={access.categories.heading}
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-[var(--grid-gap)] sm:grid-cols-3 lg:grid-cols-6">
          {access.categories.items.map((item) => (
            <Card key={item}>
              <p className="text-center font-display text-title tracking-title font-normal text-text">
                {item}
              </p>
            </Card>
          ))}
        </div>

      </Section>

      <CopySection
        id="direction-heading"
        eyebrow={access.direction.eyebrow}
        heading={access.direction.heading}
        body={access.direction.body}
      />
    </main>
  );
}
