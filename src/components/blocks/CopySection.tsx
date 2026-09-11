import { Body, Callout, Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * CopySection — a plain eyebrow + H2 + body section, with an optional
 * two-column body and an optional trailing bordered callout.
 *
 * Covers the several §8/§11 sections that are nothing more than that shape:
 * §8.2 (two columns + callout), §8.8 and §11.6's "Current state" (one column,
 * no callout), §11.6's "The difference" (two columns + callout). Generic and
 * prop-driven so any future page section of this shape can reuse it.
 */

export type CopySectionProps = {
  eyebrow: string;
  heading: Heading;
  /** Paragraphs. With `columns={2}` the first two run side by side and any
   * remainder runs full-width below them, matching how §8.2's own closing
   * line sits under its two columns. */
  body: readonly string[];
  columns?: 1 | 2;
  callout?: string;
  id: string;
};

export function CopySection({
  eyebrow,
  heading,
  body,
  columns = 1,
  callout,
  id,
}: CopySectionProps) {
  const [first, second, ...rest] = body;

  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
        </div>

        {columns === 2 ? (
          <div className="grid gap-y-6 gap-x-12 md:grid-cols-2">
            {first ? <Body>{first}</Body> : null}
            {second ? <Body>{second}</Body> : null}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {body.map((paragraph) => (
              <Body key={paragraph}>{paragraph}</Body>
            ))}
          </div>
        )}

        {columns === 2 && rest.length > 0 ? (
          <div className="flex flex-col gap-6">
            {rest.map((paragraph) => (
              <Body key={paragraph}>{paragraph}</Body>
            ))}
          </div>
        ) : null}

        {callout ? <Callout>{callout}</Callout> : null}
      </div>
    </Section>
  );
}
