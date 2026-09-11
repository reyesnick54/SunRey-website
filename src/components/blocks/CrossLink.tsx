import Link from 'next/link';

import { Section } from '@/components/primitives';
import type { NavLink } from '@content/types';

/**
 * CrossLink — CLAUDE.md §9.7 and §10.7, the one-line band at the foot of
 * each coin page pointing at its counterpart in the other economy.
 *
 * The link colour comes from `--accent-*`, so on `/moonrey-coin` (where
 * `data-economy="moon"` is set on `<main>`) it resolves to silver even
 * though the destination it names is the gold SunRey Coin page — the
 * colour describes which page you are leaving, not the one you are going
 * to, consistent with every other accent-coloured link on that page.
 */

export type CrossLinkProps = {
  prefix: string;
  link: NavLink;
};

export function CrossLink({ prefix, link }: CrossLinkProps) {
  return (
    <Section as="section" divided>
      <p className="mx-auto max-w-[var(--measure-lede)] text-center text-lede text-muted">
        {prefix}{' '}
        <span aria-hidden="true" className="text-faint">
          &rarr;
        </span>{' '}
        <Link
          href={link.href}
          className="font-medium text-accent-500 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300"
        >
          {link.label}
        </Link>
      </p>
    </Section>
  );
}
