import type { Metadata } from 'next';

import { Callout, Section } from '@/components/primitives';
import { BulletList } from '@/components/blocks/BulletList';
import { CapabilityGrid } from '@/components/blocks/CapabilityGrid';
import { CoinHero } from '@/components/blocks/CoinHero';
import { CrossLink } from '@/components/blocks/CrossLink';
import { ScopeList } from '@/components/blocks/ScopeList';
import { ThreeDenials } from '@/components/blocks/ThreeDenials';
import { sunreyCoin } from '@content/sunrey-coin';

/**
 * SunRey Coin (`/sunrey-coin`) — CLAUDE.md §9. Every block reads its copy
 * from `content/sunrey-coin.ts`; this file only sequences them in the order
 * §9.1–§9.7 gives.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: sunreyCoin.meta.title,
  description: sunreyCoin.meta.description,
};

export default function SunReyCoinPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <CoinHero {...sunreyCoin.hero} image={sunreyCoin.heroImage} />

      <ThreeDenials
        id="what-it-is-not-heading"
        eyebrow={sunreyCoin.whatItIsNot.eyebrow}
        heading={sunreyCoin.whatItIsNot.heading}
        items={sunreyCoin.whatItIsNot.items}
      />

      <CapabilityGrid
        id="economic-engine-heading"
        eyebrow={sunreyCoin.economicEngine.eyebrow}
        heading={sunreyCoin.economicEngine.heading}
        items={sunreyCoin.economicEngine.items}
        gridClassName="sm:grid-cols-2 lg:grid-cols-3"
      />

      <ScopeList
        id="scope-heading"
        eyebrow={sunreyCoin.scope.eyebrow}
        heading={sunreyCoin.scope.heading}
        items={sunreyCoin.scope.items}
      />

      <BulletList
        id="guardrails-heading"
        eyebrow={sunreyCoin.guardrails.eyebrow}
        heading={sunreyCoin.guardrails.heading}
        items={sunreyCoin.guardrails.items}
      />

      <Section as="section" divided>
        <Callout>{sunreyCoin.tickerNotice}</Callout>
      </Section>

      <CrossLink prefix={sunreyCoin.crossLink.prefix} link={sunreyCoin.crossLink.link} />
    </main>
  );
}
