import Link from 'next/link';

import { Display, Eyebrow, Section } from '@/components/primitives';
import type { HomeContent } from '@content/home';

/**
 * The Currency of You — CLAUDE.md §7.7, §2.7.
 *
 * The approved treatment of the tagline: gold, restrained, with the
 * qualifying "not a claim on you" copy immediately adjacent so it can never
 * be read as a collateralization claim. Centred, body capped at 62ch — again
 * not one of the §5.2 measure tokens, so it is scoped locally like §7.6.
 */
export function CurrencyOfYou({
  eyebrow,
  heading,
  body,
  link,
}: HomeContent['currencyOfYou']) {
  return (
    <Section as="section" divided aria-labelledby="currency-of-you-heading">
      <div className="mx-auto flex max-w-[62ch] flex-col items-center gap-6 text-center">
        <Eyebrow>{eyebrow}</Eyebrow>

        <Display
          id="currency-of-you-heading"
          as="h2"
          size="l"
          tone="accent"
          lines={heading}
        />

        <div className="flex flex-col gap-5">
          {body.map((paragraph) => (
            <p key={paragraph} className="text-body text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <Link
          href={link.href}
          className="text-body font-medium text-accent-500 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300"
        >
          {link.label}
        </Link>
      </div>
    </Section>
  );
}
