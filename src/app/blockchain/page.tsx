import type { Metadata } from 'next';

import { CapabilityGrid } from '@/components/blocks/CapabilityGrid';
import { ConsensusPlanes } from '@/components/blocks/ConsensusPlanes';
import { CopySection } from '@/components/blocks/CopySection';
import { DenialList } from '@/components/blocks/DenialList';
import { FiveRoots } from '@/components/blocks/FiveRoots';
import { PageHero } from '@/components/blocks/PageHero';
import { TwoIndices } from '@/components/blocks/TwoIndices';
import { blockchain } from '@content/blockchain';

/**
 * Blockchain (`/blockchain`) — CLAUDE.md §8. Every block reads its copy from
 * `content/blockchain.ts`; this file only sequences them in the order
 * §8.1–§8.8 gives.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: blockchain.meta.title,
  description: blockchain.meta.description,
};

export default function BlockchainPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <PageHero {...blockchain.hero} />

      <CopySection
        id="why-sovereign-heading"
        eyebrow={blockchain.whySovereign.eyebrow}
        heading={blockchain.whySovereign.heading}
        body={blockchain.whySovereign.body}
        columns={2}
        callout={blockchain.whySovereign.callout}
      />

      <CapabilityGrid
        id="capabilities-heading"
        eyebrow={blockchain.capabilities.eyebrow}
        heading={blockchain.capabilities.heading}
        items={blockchain.capabilities.items}
      />

      <TwoIndices {...blockchain.twoIndices} />

      <ConsensusPlanes {...blockchain.consensus} />

      <FiveRoots {...blockchain.fiveRoots} />

      <DenialList
        id="cannot-mint-heading"
        eyebrow={blockchain.cannotMint.eyebrow}
        heading={blockchain.cannotMint.heading}
        items={blockchain.cannotMint.items}
        trailingLabel={blockchain.cannotMint.trailingLabel}
        closing={blockchain.cannotMint.closing}
      />

      <CopySection
        id="status-heading"
        eyebrow={blockchain.status.eyebrow}
        heading={blockchain.status.heading}
        body={blockchain.status.body}
      />
    </main>
  );
}
