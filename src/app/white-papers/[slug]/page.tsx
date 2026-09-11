import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleFooter } from '@/components/paper/ArticleFooter';
import { ArticleHeader } from '@/components/paper/ArticleHeader';
import { PaperBlocks } from '@/components/paper/PaperBlocks';
import { ProgressRail } from '@/components/paper/ProgressRail';
import { papers, type PaperBlock } from '@content/papers';

import { blocks as economicAwarenessBlocks } from '@content/papers/economic-awareness-sovereign-monetary';
import { blocks as growMyMoneyBlocks } from '@content/papers/grow-my-money-ai-financial-agents';
import { blocks as moonreyBlocks } from '@content/papers/moonrey-autonomous-productive-economy';
import { blocks as proofOfPermissionBlocks } from '@content/papers/proof-of-permission';
import { blocks as accessBlocks } from '@content/papers/sunrey-access-productive-capacity';
import { blocks as blockchainBlocks } from '@content/papers/sunrey-blockchain-state-machine';
import { blocks as currencyOfYouBlocks } from '@content/papers/sunrey-currency-of-you-hin';
import { blocks as dualEconomyBlocks } from '@content/papers/sunrey-dual-economy';
import { blocks as masterBlocks } from '@content/papers/sunrey-master-economic-operating-system';
import { blocks as postQuantumBlocks } from '@content/papers/sunrey-post-quantum-security';

/**
 * The reading view (`/white-papers/[slug]`) — CLAUDE.md §11.9.
 *
 * Ten static routes, one per `content/papers/index.ts` entry. Each paper's
 * `blocks` module is generated content (§11.4) and is imported here as-is —
 * never edited, never retyped — and mapped by slug rather than dynamically
 * imported, so the whole route stays static-exportable (§3) with no
 * runtime module resolution.
 */
const BLOCKS_BY_SLUG: Record<string, readonly PaperBlock[]> = {
  'sunrey-master-economic-operating-system': masterBlocks,
  'sunrey-dual-economy': dualEconomyBlocks,
  'sunrey-blockchain-state-machine': blockchainBlocks,
  'sunrey-currency-of-you-hin': currencyOfYouBlocks,
  'moonrey-autonomous-productive-economy': moonreyBlocks,
  'sunrey-access-productive-capacity': accessBlocks,
  'grow-my-money-ai-financial-agents': growMyMoneyBlocks,
  'proof-of-permission': proofOfPermissionBlocks,
  'economic-awareness-sovereign-monetary': economicAwarenessBlocks,
  'sunrey-post-quantum-security': postQuantumBlocks,
};

export const dynamic = 'force-static';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
  if (!paper) return {};

  return {
    title: `${paper.title} — ${paper.subtitle}`,
    description: paper.abstract,
  };
}

export default async function WhitePaperArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const paper = papers.find((p) => p.slug === slug);
  const blocks = paper ? BLOCKS_BY_SLUG[paper.slug] : undefined;

  if (!paper || !blocks) {
    notFound();
  }

  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <ProgressRail />

      <ArticleHeader
        category={paper.category}
        title={paper.title}
        subtitle={paper.subtitle}
        date={paper.date}
        sections={paper.sections}
        minutes={paper.minutes}
      />

      <article className="mx-auto max-w-[var(--measure-body)] px-[var(--container-pad)] pb-[var(--section-pad)]">
        <PaperBlocks blocks={blocks} />
        <ArticleFooter slug={paper.slug} notEstablished={paper.notEstablished} />
      </article>
    </main>
  );
}
