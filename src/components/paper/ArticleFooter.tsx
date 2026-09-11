import Link from 'next/link';

import { Rule } from '@/components/primitives';
import { papers } from '@content/papers';
import { whitePapers } from '@content/white-papers';

/**
 * ArticleFooter — CLAUDE.md §11.9.
 *
 * Rule, back link, next-paper link (omitted on the last paper), then the
 * paper's own "does not establish" line in full — the reason these can
 * publish without a download gate.
 */
export function ArticleFooter({
  slug,
  notEstablished,
}: {
  slug: string;
  notEstablished: string;
}) {
  const { back, nextPrefix, notEstablishedPrefix } = whitePapers.article;
  const index = papers.findIndex((paper) => paper.slug === slug);
  const next = index >= 0 && index < papers.length - 1 ? papers[index + 1] : undefined;

  const linkClass =
    'text-body font-medium text-accent-500 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300';

  return (
    <div className="pt-16">
      <Rule />
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/white-papers" className={linkClass}>
          {back}
        </Link>
        {next ? (
          <Link href={`/white-papers/${next.slug}`} className={linkClass}>
            {nextPrefix} {next.title} &rarr;
          </Link>
        ) : null}
      </div>
      <p className="mt-10 max-w-[72ch] text-micro text-faint">
        {notEstablishedPrefix} {notEstablished}
      </p>
    </div>
  );
}
