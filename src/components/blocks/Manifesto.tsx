import { Display, Eyebrow, Section } from '@/components/primitives';
import type { HomeContent } from '@content/home';

/**
 * The manifesto band — CLAUDE.md §7.6.
 *
 * Full-bleed, `--bg-sunken`, extra vertical padding, no card, centred,
 * max-width 54ch — the quietest and most important block on the page. 54ch
 * matches neither the lede (56ch) nor body (68ch) measure tokens, so the
 * paragraphs are laid out directly against a locally-scoped max-width rather
 * than through the `Lede`/`Body` primitives' own caps.
 */
export function Manifesto({ eyebrow, heading, body }: HomeContent['manifesto']) {
  return (
    <Section
      as="section"
      surface="sunken"
      spacious
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto flex max-w-[54ch] flex-col items-center gap-8 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>

        <Display
          id="manifesto-heading"
          as="h2"
          size="m"
          tone="plain"
          lines={heading}
          className="leading-[1.35]"
        />

        <div className="flex flex-col gap-5">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-body text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
