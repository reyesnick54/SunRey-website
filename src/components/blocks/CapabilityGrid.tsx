import { Body, Card, Display, Eyebrow, Section, Title, cn } from '@/components/primitives';
import type { Heading, Item } from '@content/types';

/**
 * CapabilityGrid — a grid of title + one-sentence cards.
 *
 * Covers §8.3's eight designed native capabilities (4×2 desktop, 2×4 tablet,
 * stacked mobile) and §11.6's three markets (single row desktop, stacked
 * mobile). Neither section supplies a link target, so cards are non-interactive
 * (`interactive` hover only, no `href`).
 *
 * §5.7 asks for "a large numeral, an oversized glyph … or generous emptiness"
 * where a section wants visual weight without a diagram — rather than inventing
 * a set of hand-drawn icons with no source meaning to draw from, `numbered`
 * renders that oversized index numeral per card, in the same --sun-900/
 * --accent-900 treatment §8.6 and §11.9 use for numerals elsewhere on the site.
 */

export type CapabilityGridProps = {
  eyebrow: string;
  heading: Heading;
  items: readonly Item[];
  id: string;
  /** Grid template at each breakpoint. Defaults to the §8.3 4×2/2×4 shape. */
  gridClassName?: string;
  numbered?: boolean;
};

export function CapabilityGrid({
  eyebrow,
  heading,
  items,
  id,
  gridClassName = 'sm:grid-cols-2 lg:grid-cols-4',
  numbered = true,
}: CapabilityGridProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className={cn('mt-14 grid grid-cols-1 gap-[var(--grid-gap)]', gridClassName)}>
        {items.map((item, i) => (
          <Card key={item.title}>
            <div className="flex h-full flex-col gap-3">
              {numbered ? (
                <p
                  aria-hidden="true"
                  className="font-display text-[2.25rem] leading-none font-extralight text-accent-numeral"
                >
                  {String(i + 1).padStart(2, '0')}
                </p>
              ) : null}
              <Title as="h3">{item.title}</Title>
              <Body>{item.copy}</Body>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
