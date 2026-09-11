import { Display, Eyebrow, Lede, Pill, Section } from '@/components/primitives';
import type { HomeContent } from '@content/home';

/**
 * Where we are — CLAUDE.md §7.8.
 *
 * Honesty as a feature: what runs today, pill-labelled, with a plain-language
 * note per row. The footnote borrows the Footer's own treatment for small
 * fine print (§6.3) — micro size, `--text-faint`, sentence case — rather than
 * the eyebrow's uppercase/tracked "micro" treatment, which the site reserves
 * for short labels, not full sentences.
 */
export function StatusBoard({
  eyebrow,
  heading,
  lede,
  rows,
  footnote,
}: HomeContent['statusBoard']) {
  return (
    <Section as="section" divided aria-labelledby="status-board-heading">
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id="status-board-heading" as="h2" size="m" tone="plain" lines={heading} />
        <Lede>{lede}</Lede>
      </div>

      <div className="mt-12 flex flex-col divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-3 py-5 sm:grid-cols-[minmax(0,15rem)_auto_1fr] sm:items-center sm:gap-6"
          >
            <p className="text-body text-text">{row.label}</p>
            <Pill tone={row.tone}>{row.state}</Pill>
            <p className="text-body text-muted">{row.note}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-micro text-faint">{footnote}</p>
    </Section>
  );
}
