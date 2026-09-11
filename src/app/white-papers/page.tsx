import type { Metadata } from 'next';

import { Callout, Display, Section } from '@/components/primitives';
import { PageHero } from '@/components/blocks/PageHero';
import { PaperCard } from '@/components/paper/PaperCard';
import { papers } from '@content/papers';
import { whitePapers } from '@content/white-papers';

/**
 * White Papers (`/white-papers`) — CLAUDE.md §11.4. Every block reads its
 * copy from `content/white-papers.ts` and its per-paper fields from the
 * generated `content/papers/index.ts` registry; this file only sequences
 * them in §11.4's order and does not re-sort or re-type either.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: whitePapers.meta.title,
  description: whitePapers.meta.description,
};

export default function WhitePapersPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <PageHero {...whitePapers.hero} />

      <Section as="section">
        <Callout>{whitePapers.notice}</Callout>
      </Section>

      <Section as="section" divided>
        <div className="flex flex-col gap-6">
          {papers.map((paper) => (
            <PaperCard key={paper.slug} paper={paper} />
          ))}
        </div>
      </Section>

      <Section as="section" divided spacious aria-labelledby="papers-closing-heading">
        <div className="mx-auto flex max-w-[60ch] flex-col items-center gap-6 text-center">
          <Display
            id="papers-closing-heading"
            as="h2"
            size="m"
            tone="plain"
            lines={[whitePapers.closing.heading]}
          />
          <p className="max-w-[60ch] text-body text-muted">{whitePapers.closing.body}</p>
        </div>
      </Section>
    </main>
  );
}
