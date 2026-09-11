import { Body, Display, Eyebrow, Section } from '@/components/primitives';
import type { HomeContent } from '@content/home';

/**
 * The premise — CLAUDE.md §7.2.
 *
 * Two columns on desktop, 68ch each. The section's third paragraph is a
 * one-line close ("That infrastructure is what SunRey builds."), so it runs
 * full-width below the two columns rather than forcing a two-column grid to
 * hold three unevenly-sized paragraphs.
 */
export function Premise({ eyebrow, heading, body }: HomeContent['premise']) {
  const [first, second, closing] = body;

  return (
    <Section as="section" divided aria-labelledby="premise-heading">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display id="premise-heading" as="h2" size="m" tone="two-tone" lines={heading} />
        </div>

        <div className="grid gap-y-6 gap-x-12 md:grid-cols-2">
          {first ? <Body>{first}</Body> : null}
          {second ? <Body>{second}</Body> : null}
        </div>

        {closing ? <Body tone="text">{closing}</Body> : null}
      </div>
    </Section>
  );
}
