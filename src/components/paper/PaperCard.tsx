import { Card, Eyebrow, Title } from '@/components/primitives';
import { whitePapers } from '@content/white-papers';
import type { PaperMeta } from '@content/papers';

/**
 * PaperCard — CLAUDE.md §11.4.
 *
 * One row of the index's single column of ten. The whole card is the link
 * (via `Card`'s own `href` prop) — there is no button inside it. Every
 * word rendered comes from the paper's own registry entry (`content/papers/
 * index.ts`) or from the small set of chrome strings in `content/
 * white-papers.ts`; nothing here is invented, and nothing adds a page count
 * or a figure count (§11.4 is explicit that neither belongs on the card).
 */
export function PaperCard({ paper }: { paper: PaperMeta }) {
  const { eyebrowPrefix, sectionsSuffix, minReadSuffix, notEstablishedPrefix } =
    whitePapers.article;

  return (
    <Card href={`/white-papers/${paper.slug}`}>
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        <p
          aria-hidden="true"
          className="font-display text-[2.75rem] leading-none font-extralight text-accent-numeral sm:w-16 sm:shrink-0"
        >
          {paper.n}
        </p>

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Eyebrow>
              {eyebrowPrefix} &middot; {paper.category}
            </Eyebrow>
            <span className="text-micro text-faint">{paper.date}</span>
          </div>

          <div>
            <Title as="h2">{paper.title}</Title>
            <p className="mt-1 text-body text-muted">{paper.subtitle}</p>
          </div>

          <p className="max-w-[var(--measure-body)] text-body text-muted">{paper.abstract}</p>

          <p className="max-w-[var(--measure-body)] text-micro text-faint italic">
            {notEstablishedPrefix} {paper.notEstablished}
          </p>

          <p className="text-micro text-faint">
            {paper.sections} {sectionsSuffix} &middot; ~{paper.minutes} {minReadSuffix}
          </p>
        </div>
      </div>
    </Card>
  );
}
