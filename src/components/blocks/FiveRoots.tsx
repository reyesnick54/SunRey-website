import { Body, Callout, Display, Eyebrow, Section, Title } from '@/components/primitives';
import type { BlockchainContent } from '@content/blockchain';

/**
 * FiveRoots — CLAUDE.md §8.6. Five rows, each with a large `01`–`05` numeral
 * in `--sun-900`/`--accent-900`, closing on a bordered callout.
 */
export function FiveRoots({ eyebrow, heading, roots, callout }: BlockchainContent['fiveRoots']) {
  return (
    <Section as="section" divided aria-labelledby="five-roots-heading">
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id="five-roots-heading" as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <div className="mt-14 flex flex-col divide-y divide-line border-y border-line">
        {roots.map((root) => (
          <div
            key={root.n}
            className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-10"
          >
            <p
              aria-hidden="true"
              className="font-display text-[2.75rem] leading-none font-extralight text-accent-numeral sm:w-20 sm:shrink-0"
            >
              {root.n}
            </p>
            <Title as="h3" className="sm:w-56 sm:shrink-0">
              {root.title}
            </Title>
            <Body>{root.copy}</Body>
          </div>
        ))}
      </div>

      <Callout className="mt-10">{callout}</Callout>
    </Section>
  );
}
