import { Container, Display, Eyebrow, Lede, Rail, Rule } from '@/components/primitives';
import { whitePapers } from '@content/white-papers';
import type { PaperMeta } from '@content/papers';

export type ArticleHeaderProps = Pick<
  PaperMeta,
  'category' | 'title' | 'subtitle' | 'date' | 'sections' | 'minutes'
>;

/**
 * ArticleHeader — CLAUDE.md §11.9.
 *
 * The quieter article header, not the marketing hero: single-tone H1
 * (capped at 20ch so a long title wraps rather than running the full
 * container width), a lede capped at 56ch (`Lede`'s own default measure), a
 * micro meta row, then a full-width rule.
 */
export function ArticleHeader({
  category,
  title,
  subtitle,
  date,
  sections,
  minutes,
}: ArticleHeaderProps) {
  const { eyebrowPrefix, sectionsSuffix, minReadSuffix } = whitePapers.article;

  return (
    <header>
      <Container className="flex flex-col gap-6 pt-[clamp(48px,10vh,96px)] pb-10">
        <Eyebrow>
          {eyebrowPrefix} &middot; {category}
        </Eyebrow>
        <Display as="h1" size="l" tone="plain" lines={[title]} className="max-w-[20ch]" />
        <Lede>{subtitle}</Lede>
        <Rail
          items={[date, `${sections} ${sectionsSuffix}`, `~${minutes} ${minReadSuffix}`]}
        />
      </Container>
      <Container>
        <Rule />
      </Container>
    </header>
  );
}
