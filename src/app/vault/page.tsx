import type { Metadata } from 'next';

import { Body, Display, Eyebrow, Section } from '@/components/primitives';
import { BulletList } from '@/components/blocks/BulletList';
import { CopySection } from '@/components/blocks/CopySection';
import { Inversion } from '@/components/blocks/Inversion';
import { LabelRows } from '@/components/blocks/LabelRows';
import { NumberedSteps } from '@/components/blocks/NumberedSteps';
import { PageHero } from '@/components/blocks/PageHero';
import { SplitColumns } from '@/components/blocks/SplitColumns';
import { vault } from '@content/vault';

/**
 * Vault (`/vault`) — CLAUDE.md §11.3. Every block reads its copy from
 * `content/vault.ts`; this file only sequences them in the order §11.3
 * gives.
 *
 * "Information domains" reuses `LabelRows` as-is: the spec's own shape for
 * that section (an eight-row label/illustrative-sources list, hairline
 * separated) is exactly the label/value pair `LabelRows` already renders for
 * Exchange's components list (§11.6), so a second, near-identical
 * `DomainRows` component was not built.
 *
 * "The Purpose Firewall" needs a two-tone H2 ("Knowing that data exists /
 * is not permission to use it."), which `CopySection` cannot render (its
 * heading is always `tone="plain"`) — so, like `GrowMyMoney`'s own two-tone
 * heading, it is composed directly here from primitives instead.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: vault.meta.title,
  description: vault.meta.description,
};

export default function VaultPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <PageHero {...vault.hero} />

      <Inversion
        id="inversion-heading"
        eyebrow={vault.inversion.eyebrow}
        heading={vault.inversion.heading}
        left={vault.inversion.left}
        right={vault.inversion.right}
        below={vault.inversion.below}
      />

      <CopySection
        id="what-it-is-heading"
        eyebrow={vault.whatItIs.eyebrow}
        heading={vault.whatItIs.heading}
        body={vault.whatItIs.body}
        callout={vault.whatItIs.callout}
      />

      <LabelRows
        id="domains-heading"
        eyebrow={vault.domains.eyebrow}
        heading={vault.domains.heading}
        rows={vault.domains.rows}
      />

      <SplitColumns
        id="split-heading"
        eyebrow={vault.split.eyebrow}
        heading={vault.split.heading}
        onChainLabel={vault.split.onChainLabel}
        offChainLabel={vault.split.offChainLabel}
        onChain={vault.split.onChain}
        offChain={vault.split.offChain}
      />

      <Section as="section" divided aria-labelledby="purpose-firewall-heading">
        <div className="flex flex-col gap-6">
          <Eyebrow>{vault.purposeFirewall.eyebrow}</Eyebrow>
          <Display
            id="purpose-firewall-heading"
            as="h2"
            size="m"
            tone="two-tone"
            lines={vault.purposeFirewall.heading}
          />
          <div className="flex flex-col gap-5">
            {vault.purposeFirewall.body.map((paragraph) => (
              <Body key={paragraph}>{paragraph}</Body>
            ))}
          </div>
        </div>
      </Section>

      <NumberedSteps
        id="compute-to-data-heading"
        eyebrow={vault.computeToData.eyebrow}
        heading={vault.computeToData.heading}
        flowLabel={vault.computeToData.flowLabel}
        steps={vault.computeToData.steps}
        workedExamplePrefix={vault.computeToData.workedExamplePrefix}
        workedExample={vault.computeToData.workedExample}
        closing={vault.computeToData.closing}
      />

      <BulletList
        id="limits-heading"
        eyebrow={vault.limits.eyebrow}
        heading={vault.limits.heading}
        items={vault.limits.items}
      />
    </main>
  );
}
