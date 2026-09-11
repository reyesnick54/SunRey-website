import { Body, Callout, Display, Eyebrow, Section } from '@/components/primitives';
import type { Heading } from '@content/types';

/**
 * NumberedSteps — CLAUDE.md §11.3, "send the question, not the records."
 *
 * Six numbered steps, vertical, each carrying an oversized numeral in the
 * same `--accent-900` treatment `FiveRoots` (§8.6) and `CapabilityGrid` use
 * elsewhere, preceded by the "designed flow — not active" label the spec
 * places directly above the steps, and closed by an illustrative worked
 * example and a centred closing line.
 */
export type NumberedStepsProps = {
  eyebrow: string;
  heading: Heading;
  flowLabel: string;
  steps: readonly string[];
  workedExamplePrefix: string;
  workedExample: string;
  closing: string;
  id: string;
};

export function NumberedSteps({
  eyebrow,
  heading,
  flowLabel,
  steps,
  workedExamplePrefix,
  workedExample,
  closing,
  id,
}: NumberedStepsProps) {
  return (
    <Section as="section" divided aria-labelledby={id}>
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id={id} as="h2" size="m" tone="plain" lines={heading} />
      </div>

      <p className="mt-12 font-mono text-micro font-medium tracking-micro text-faint uppercase">
        {flowLabel}
      </p>

      <ol className="mt-6 flex flex-col divide-y divide-line border-y border-line">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-5 py-5 sm:gap-8">
            <span
              aria-hidden="true"
              className="shrink-0 font-display text-[1.75rem] leading-none font-extralight text-accent-numeral"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <Body className="pt-1">{step}</Body>
          </li>
        ))}
      </ol>

      <Callout className="mt-12 flex flex-col gap-2">
        <span className="font-mono text-micro font-medium tracking-micro text-accent-500 uppercase">
          {workedExamplePrefix}
        </span>
        <span className="text-body text-text">{workedExample}</span>
      </Callout>

      <p className="mt-10 text-center text-body text-muted">{closing}</p>
    </Section>
  );
}
