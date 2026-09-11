import { Container, Display, Eyebrow, Lede, Rail } from '@/components/primitives';
import type { Hero as HeroData } from '@content/types';

/**
 * Hero — CLAUDE.md §7.1.
 *
 * Full viewport height, minimum 760px, with content bottom-aligned to the
 * lower portion of the viewport and left-aligned within the container —
 * matching the composition of the current holding page. No CTA button: the
 * nav is the call to action (§7.1).
 *
 * `<main>` carries the fixed header's height as top padding (see page.tsx), so
 * the min-height here accounts for that offset: header + hero together fill
 * at least one viewport, with the 760px floor applied to the same total.
 */
export function Hero({ eyebrow, heading, lede, rail }: HeroData) {
  return (
    <section className="relative flex min-h-[max(calc(760px-var(--header-h)),calc(100vh-var(--header-h)))] items-end">
      <Container className="w-full pb-[clamp(56px,12vh,120px)]">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display as="h1" size="xl" tone="two-tone" lines={heading} />
          <Lede className="mt-2">{lede}</Lede>
          {rail ? <Rail items={rail} className="mt-6" /> : null}
        </div>
      </Container>
    </section>
  );
}
