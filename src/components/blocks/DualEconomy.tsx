import Link from 'next/link';

import { Body, Display, Eyebrow, Lede, Rule, Section, Title, cn } from '@/components/primitives';
import type { EconomyPanel, HomeContent } from '@content/home';

/**
 * The dual economy — CLAUDE.md §7.3.
 *
 * The central conceptual block of the site: two panels, deliberately gold
 * (SunRey Coin) and silver (MoonRey Coin), side by side. This is the one
 * sanctioned place on a SunRey-accented page where the silver ramp appears
 * decoratively alongside gold — §7.3 specifies the split explicitly, because
 * the block's subject *is* the pairing of the two economies, the same
 * reasoning §5.1 gives the §10.4 loop diagram its exemption. The two accent
 * colours are therefore applied directly per panel rather than through the
 * page-wide `--accent-*` indirection, which stays pointed at gold throughout.
 *
 * Left panel gold, right panel silver, split by a hairline that dissolves at
 * both ends. On mobile the panels stack, gold first — which is simply DOM
 * order here, since the layout collapses to a single column below `md`.
 */

const ACCENT = {
  sun: {
    label: 'text-sun-500',
    link: 'text-sun-500 hover:text-sun-300 focus-visible:text-sun-300',
  },
  moon: {
    label: 'text-moon-500',
    link: 'text-moon-500 hover:text-moon-300 focus-visible:text-moon-300',
  },
} as const;

function Panel({ panel, accent }: { panel: EconomyPanel; accent: 'sun' | 'moon' }) {
  const tone = ACCENT[accent];

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-3">
        <p
          className={cn(
            'font-mono text-micro font-medium tracking-micro uppercase',
            tone.label,
          )}
        >
          {panel.label}
        </p>
        <Title as="h3">{panel.title}</Title>
        <Body>{panel.line}</Body>
      </div>

      <div className="flex flex-col">
        {panel.rows.map((row, i) => (
          <div key={row.label}>
            {i > 0 ? <Rule className="my-4" /> : null}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <p className="font-mono text-micro font-medium tracking-micro text-faint uppercase">
                {row.label}
              </p>
              <p className="text-body text-muted">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={panel.link.href}
        className={cn(
          'text-body font-medium transition-colors duration-[var(--dur-hover)] ease-sunrey',
          tone.link,
        )}
      >
        {panel.link.label}
      </Link>
    </div>
  );
}

export function DualEconomy({
  eyebrow,
  heading,
  lede,
  sun,
  moon,
  equation,
}: HomeContent['dualEconomy']) {
  return (
    <Section as="section" divided aria-labelledby="dual-economy-heading">
      <div className="flex flex-col gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Display id="dual-economy-heading" as="h2" size="m" tone="plain" lines={heading} />
        <Lede>{lede}</Lede>
      </div>

      <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-stretch md:gap-14">
        <Panel panel={sun} accent="sun" />
        <Rule
          orientation="vertical"
          fade
          className="hidden self-stretch md:block"
        />
        <Panel panel={moon} accent="moon" />
      </div>

      <p className="mt-14 text-center font-mono text-micro font-medium tracking-micro text-faint uppercase">
        {equation}
      </p>
    </Section>
  );
}
