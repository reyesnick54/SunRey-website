import { DISCLOSURE } from '@content/site';

/**
 * The required disclosure — CLAUDE.md §2.3, §6.3 tier 3.
 *
 * Renders in the footer of every page. Always visible, never behind a toggle.
 * 0.75rem / 1.65, --text-faint, max 72ch.
 *
 * The same copy is rendered again, unabridged, as the first section of /legal.
 * Both read from `DISCLOSURE` so the two can never drift apart.
 */
export function Disclosure({ className }: { className?: string }) {
  return (
    <p
      className={`max-w-[72ch] text-[0.75rem] leading-[1.65] text-faint ${className ?? ''}`}
    >
      <strong className="font-medium text-muted">{DISCLOSURE.lead}</strong>{' '}
      {DISCLOSURE.body}
    </p>
  );
}
