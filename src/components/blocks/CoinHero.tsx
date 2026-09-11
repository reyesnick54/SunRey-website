import { Container, Display, Eyebrow, Lede, Rail } from '@/components/primitives';
import type { Hero as HeroData } from '@content/types';

/**
 * CoinHero — the SunRey Coin / MoonRey Coin heroes (CLAUDE.md §9.1, §10.1,
 * §13 Phase 3: "the coin heroes using the transparent .webp renders").
 *
 * Same composition as `PageHero` — eyebrow, two-tone display H1, lede,
 * rail, bottom-aligned within the container — with the coin's transparent
 * render placed alongside it. The render carries no plate or background of
 * its own (§14: "no black plate behind either"), so it sits directly on the
 * page's glow field like every other element on these two pages.
 *
 * A plain `<img>`, not `next/image`: the optimizer is disabled under static
 * export (`images.unoptimized`), and the source files are already sized and
 * pre-compressed .webp. Explicit width/height come from the content file so
 * the layout reserves the right space before the image loads (§12.2 CLS).
 */

export type CoinHeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CoinHeroProps = HeroData & {
  image: CoinHeroImage;
};

export function CoinHero({ eyebrow, heading, lede, rail, image }: CoinHeroProps) {
  return (
    <section className="relative flex min-h-[68vh] items-end">
      <Container className="w-full pb-[clamp(48px,9vh,96px)]">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between md:gap-14">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Display as="h1" size="l" tone="two-tone" lines={heading} />
            <Lede className="mt-2">{lede}</Lede>
            {rail ? <Rail items={rail} className="mt-6" /> : null}
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element -- the image
              optimizer is off under `output: 'export'` (§3), so next/image
              would add a component and change nothing about the bytes served.
              The render is a pre-sized transparent .webp. */}
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="eager"
            decoding="async"
            className="h-auto w-full max-w-[220px] shrink-0 self-center sm:max-w-[260px] md:max-w-[300px] md:self-end"
          />
        </div>
      </Container>
    </section>
  );
}
