import type { Metadata } from 'next';

import { BulletList } from '@/components/blocks/BulletList';
import { CoinHero } from '@/components/blocks/CoinHero';
import { CopySection } from '@/components/blocks/CopySection';
import { CrossLink } from '@/components/blocks/CrossLink';
import { EconomicLoop } from '@/components/blocks/EconomicLoop';
import { EconomicPools } from '@/components/blocks/EconomicPools';
import { moonreyCoin } from '@content/moonrey-coin';

/**
 * MoonRey Coin (`/moonrey-coin`) — CLAUDE.md §10. Every block reads its copy
 * from `content/moonrey-coin.ts`; this file only sequences them in the order
 * §10.1–§10.7 gives.
 *
 * `data-economy="moon"` on `<main>` is the one and only palette switch
 * (§5.1, §13 Phase 3): it reassigns `--accent-*`, `--line-accent` and
 * `--glow-accent` to the silver ramp for every descendant that reads them —
 * `CoinHero`, `CopySection`, `EconomicPools`, `BulletList` and `CrossLink`
 * all do, so nothing below needs a one-off `moon-*` override. `GlowField`
 * (in the root layout) independently derives the same "moon" economy from
 * the route via `economyForPath('/moonrey-coin')` in `src/lib/nav.ts`, so
 * the background glow can never disagree with this attribute. The single
 * exception is `EconomicLoop`'s diagram, which is deliberately bi-chromatic
 * and reaches for `sun-*`/`moon-*` directly — see that component's own doc.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: moonreyCoin.meta.title,
  description: moonreyCoin.meta.description,
};

export default function MoonReyCoinPage() {
  return (
    <main data-economy="moon" className="relative z-10 grow pt-[var(--header-h)]">
      <CoinHero {...moonreyCoin.hero} image={moonreyCoin.heroImage} />

      <CopySection
        id="question-heading"
        eyebrow={moonreyCoin.question.eyebrow}
        heading={moonreyCoin.question.heading}
        body={moonreyCoin.question.body}
      />

      <EconomicPools
        id="pools-heading"
        eyebrow={moonreyCoin.pools.eyebrow}
        heading={moonreyCoin.pools.heading}
        items={moonreyCoin.pools.items}
      />

      <EconomicLoop
        id="loop-heading"
        eyebrow={moonreyCoin.loop.eyebrow}
        heading={moonreyCoin.loop.heading}
        stages={moonreyCoin.loop.stages}
        workedExample={moonreyCoin.loop.workedExample}
      />

      <CopySection
        id="tokenization-heading"
        eyebrow={moonreyCoin.tokenization.eyebrow}
        heading={moonreyCoin.tokenization.heading}
        body={moonreyCoin.tokenization.body}
      />

      <BulletList
        id="open-decisions-heading"
        eyebrow={moonreyCoin.openDecisions.eyebrow}
        heading={moonreyCoin.openDecisions.heading}
        items={moonreyCoin.openDecisions.items}
      />

      <CrossLink prefix={moonreyCoin.crossLink.prefix} link={moonreyCoin.crossLink.link} />
    </main>
  );
}
