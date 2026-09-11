import type { Metadata } from 'next';

import { BulletList } from '@/components/blocks/BulletList';
import { CapabilityGrid } from '@/components/blocks/CapabilityGrid';
import { CopySection } from '@/components/blocks/CopySection';
import { DenialList } from '@/components/blocks/DenialList';
import { LabelRows } from '@/components/blocks/LabelRows';
import { PageHero } from '@/components/blocks/PageHero';
import { exchange } from '@content/exchange';

/**
 * Exchange (`/exchange`) — CLAUDE.md §11.6. Every block reads its copy from
 * `content/exchange.ts`; this file only sequences them in the order §11.6
 * gives.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: exchange.meta.title,
  description: exchange.meta.description,
};

export default function ExchangePage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <PageHero {...exchange.hero} />

      <CopySection
        id="difference-heading"
        eyebrow={exchange.difference.eyebrow}
        heading={exchange.difference.heading}
        body={exchange.difference.body}
        columns={2}
        callout={exchange.difference.callout}
      />

      <CapabilityGrid
        id="markets-heading"
        eyebrow={exchange.markets.eyebrow}
        heading={exchange.markets.heading}
        items={exchange.markets.items}
        gridClassName="md:grid-cols-3"
        numbered={false}
      />

      <LabelRows
        id="components-heading"
        eyebrow={exchange.components.eyebrow}
        heading={exchange.components.heading}
        rows={exchange.components.rows}
      />

      <DenialList
        id="surveillance-heading"
        eyebrow={exchange.surveillance.eyebrow}
        heading={exchange.surveillance.heading}
        items={exchange.surveillance.items}
        trailingLabel={exchange.surveillance.trailingLabel}
        closing={exchange.surveillance.closing}
      />

      <BulletList
        id="listing-discipline-heading"
        eyebrow={exchange.listingDiscipline.eyebrow}
        heading={exchange.listingDiscipline.heading}
        items={exchange.listingDiscipline.items}
      />
    </main>
  );
}
