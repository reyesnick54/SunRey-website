/**
 * Navigation — CLAUDE.md §1.1, §6.1, §6.3.
 *
 * Single source of truth for routes. The header nav, the mobile overlay and the
 * footer columns all read from here; nothing hard-codes a path.
 *
 * NAV order is exactly §1.1 and must not be reordered.
 */

export type Route = {
  /** Visible label. */
  label: string;
  href: string;
};

/** The eight centred header links. `/` is the wordmark, not a nav item. */
export const NAV: readonly Route[] = [
  { label: 'Blockchain', href: '/blockchain' },
  { label: 'SunRey Coin', href: '/sunrey-coin' },
  { label: 'MoonRey Coin', href: '/moonrey-coin' },
  { label: 'Exchange', href: '/exchange' },
  { label: 'A.I. Agents', href: '/ai-agents' },
  { label: 'Access', href: '/access' },
  { label: 'Vault', href: '/vault' },
  { label: 'White Papers', href: '/white-papers' },
];

export const HOME: Route = { label: 'SunRey', href: '/' };
export const LEGAL: Route = { label: 'Legal & Disclosures', href: '/legal' };

/** Footer link columns — §6.3 tier 2. */
export const FOOTER_COLUMNS: readonly { heading: string; links: readonly Route[] }[] = [
  {
    heading: 'Ecosystem',
    links: [
      { label: 'Blockchain', href: '/blockchain' },
      { label: 'A.I. Agents', href: '/ai-agents' },
      { label: 'Exchange', href: '/exchange' },
      { label: 'Vault', href: '/vault' },
      { label: 'Access', href: '/access' },
    ],
  },
  {
    heading: 'Assets',
    links: [
      { label: 'SunRey Coin', href: '/sunrey-coin' },
      { label: 'MoonRey Coin', href: '/moonrey-coin' },
    ],
  },
  {
    heading: 'Documents',
    links: [{ label: 'White Papers', href: '/white-papers' }],
  },
  {
    heading: 'Company',
    links: [LEGAL],
  },
];

/**
 * Which economy's palette a route wears — CLAUDE.md §5.1, §10.
 *
 * One mapping, used by both the page (`data-economy` on <main>, §13 Phase 3) and
 * the GlowField, so the glow can never disagree with the page it sits behind.
 */
export type Economy = 'sun' | 'moon';

export function economyForPath(pathname: string): Economy {
  return pathname.startsWith('/moonrey-coin') ? 'moon' : 'sun';
}
