import { Body, Callout, Display, Eyebrow, Lede, Rule, Section, cn } from '@/components/primitives';
import type { BlockchainContent, IndexPanel } from '@content/blockchain';

/**
 * TwoIndices — CLAUDE.md §8.4, the proprietary argument of the Blockchain
 * page. Split panel: Human Information Index in gold on the left, A.I. &
 * Production Layer Index in silver on the right, divided by a hairline that
 * dissolves at both ends — the same sanctioned two-economy pairing pattern
 * `DualEconomy` uses on Home (§7.3), applied here to indices instead of
 * coins. Both accent colours are applied directly per panel rather than
 * through the page-wide `--accent-*` indirection.
 *
 * The "Cannot do" row is mandatory on both panels per §8.4's own note ("not
 * optional… do not soften this row") and is rendered with exactly the same
 * weight as "Reads" and "Informs" — no visual softening, no omission.
 */

const ACCENT = {
  human: 'text-sun-500',
  production: 'text-moon-500',
} as const;

function Panel({ panel, accent }: { panel: IndexPanel; accent: 'human' | 'production' }) {
  const rows = [...panel.rows, { label: 'Cannot do', value: panel.cannotDo }];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p
          className={cn(
            'font-mono text-micro font-medium tracking-micro uppercase',
            ACCENT[accent],
          )}
        >
          {panel.label}
        </p>
        <Display as="h3" size="m" tone="plain" lines={panel.heading} />
        <Body>{panel.body}</Body>
      </div>

      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div key={row.label}>
            {i > 0 ? <Rule className="my-4" /> : null}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase">
                {row.label}
              </p>
              <p className="text-body text-muted">{row.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TwoIndices({
  eyebrow,
  heading,
  lede,
  human,
  production,
  closingCallout,
}: BlockchainContent['twoIndices']) {
  return (
    <Section as="section" divided aria-labelledby="two-indices-heading">
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id="two-indices-heading" as="h2" size="m" tone="plain" lines={heading} />
        <Lede>{lede}</Lede>
      </div>

      <div className="mt-14 overflow-x-auto">
        <div className="flex flex-col gap-10 md:min-w-[720px] md:flex-row md:items-stretch md:gap-14">
          <Panel panel={human} accent="human" />
          <Rule orientation="vertical" fade className="hidden self-stretch md:block" />
          <Panel panel={production} accent="production" />
        </div>
      </div>

      <Callout className="mt-14">{closingCallout}</Callout>
    </Section>
  );
}
