import { Body, Card, Display, Eyebrow, Section, Title } from '@/components/primitives';
import type { BentoCardSize, HomeContent } from '@content/home';

/**
 * The stack — CLAUDE.md §7.4.
 *
 * A bento grid: one wide card on its own top row, then a 3-across row, then a
 * 2-across row. Built on a 6-column grid so all three row shapes share one
 * unit (wide = 6/6, third = 2/6, half = 3/6) and stay aligned to a common
 * gutter; below `md` every card is full width and the rows simply stack in
 * source order. Each card is a link to its page (§7.4) — the whole card is
 * the Card primitive's hit target.
 */

const SPAN: Record<BentoCardSize, string> = {
  wide: 'md:col-span-6',
  third: 'md:col-span-2',
  half: 'md:col-span-3',
};

export function BentoGrid({ eyebrow, heading, cards }: HomeContent['stack']) {
  return (
    <Section as="section" divided aria-labelledby="stack-heading">
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id="stack-heading" as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-[var(--grid-gap)] md:grid-cols-6">
        {cards.map((card) => (
          <Card key={card.href} href={card.href} className={SPAN[card.size]}>
            <div className="flex h-full flex-col gap-3">
              <Title as="h3">{card.title}</Title>
              <Body>{card.copy}</Body>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
