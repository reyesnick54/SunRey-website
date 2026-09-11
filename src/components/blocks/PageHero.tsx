import { Container, Display, Eyebrow, Lede, Rail } from '@/components/primitives';
import type { Hero as HeroData } from '@content/types';

/**
 * PageHero — the shorter hero used by every page below Home (CLAUDE.md §8.1,
 * §9.1, §10.1, §11.1–§11.3, §11.6: "Shorter than home: min-height: 68vh.").
 *
 * Same composition as Home's `<Hero>` — eyebrow, two-tone display H1, lede,
 * optional rail, bottom-aligned and left-aligned within the container — just
 * shorter, so it reads as a family without repeating Home's exact geometry.
 * Generic and prop-driven: every subpage hero in §8–§11 uses this directly.
 */
export function PageHero({ eyebrow, heading, lede, rail }: HeroData) {
  return (
    <section className="relative flex min-h-[68vh] items-end">
      <Container className="w-full pb-[clamp(48px,9vh,96px)]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h1" size="l" tone="two-tone" lines={heading} />
          <Lede className="mt-2">{lede}</Lede>
          {rail ? <Rail items={rail} className="mt-6" /> : null}
        </div>
      </Container>
    </section>
  );
}
