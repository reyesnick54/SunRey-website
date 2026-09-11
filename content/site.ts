/**
 * Global chrome copy — CLAUDE.md §2.3, §4.2, §6.1, §6.3.
 *
 * Copy that appears outside any single page: the gate screen, the header status
 * pill, and the footer. Page copy lives in the per-page files; route labels live
 * in `src/lib/nav.ts` (§3.1 makes that the single source of truth for routes).
 */

/**
 * The required disclosure — CLAUDE.md §2.3, verbatim.
 *
 * Renders in the footer of EVERY page, always visible, never behind a toggle,
 * and again as the first section of /legal. `lead` is the bolded first sentence.
 */
export const DISCLOSURE = {
  lead: 'SunRey is a pre-production system.',
  body: 'All balances, assets, and transactions shown in any SunRey environment are simulated and carry no monetary value. SunRey Chain operates as a testnet; mainnet is not active. SunRey is not a bank and holds no banking, brokerage, investment-advisory, custody, or money-transmission licenses. Nothing on this site is an offer to sell or a solicitation to buy any security or digital asset, and nothing here is legal, tax, investment, or financial advice. Forward-looking statements describe intended architecture and are not commitments.',
} as const;

/**
 * Header status pill — §6.1.
 *
 * §15.4 is an open question for Nick: PRE-PRODUCTION or TESTNET. The spec
 * specifies PRE-PRODUCTION, so that is what ships until he picks. The label on
 * the current holding page asserts an imminent release, which §2.2 forbids, so
 * it is not carried over.
 */
export const STATUS_PILL = 'Pre-production' as const;

/** Footer tier 3 — §6.3. */
export const FOOTER_LEGAL = {
  copyright: '© 2026 SunRey Technologies.',
  confidential: 'Confidential — for authorized recipients.',
} as const;

/**
 * The access gate screen — §4.2.
 *
 * `error` is verbatim from §4.2. The remaining strings are not supplied by the
 * spec; they are kept to the minimum a usable form needs (§0 rule 3: where the
 * spec does not supply a word, prefer silence). Flagged for Nick.
 */
export const GATE = {
  label: 'Passphrase',
  submit: 'Enter',
  error: 'That passphrase is not recognized.',
  /** Shown only when JavaScript is unavailable, where the gate cannot resolve. */
  noscript: 'This site requires JavaScript.',
  /** Shown when NEXT_PUBLIC_GATE_HASH is missing — a deploy misconfiguration. */
  unconfigured: 'This site is not configured for access.',
} as const;

/** Accessible names for chrome controls. Not visible copy. */
export const LABELS = {
  primaryNav: 'Primary',
  footerNav: 'Footer',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  home: 'SunRey — home',
  disclosure: 'Legal disclosure',
} as const;
