/**
 * Global chrome copy — CLAUDE.md §2.3, §4.2, §6.1, §6.3.
 *
 * Copy that appears outside any single page: the gate screen, the header status
 * pill, and the footer. Page copy lives in the per-page files; route labels live
 * in `src/lib/nav.ts` (§3.1 makes that the single source of truth for routes).
 */

/**
 * The required disclosure — CLAUDE.md §2.3.
 *
 * This block now renders in exactly one place: /legal. The owner asked for the
 * pre-production and simulation wording off the site, so it no longer appears
 * in the footer of every page, on the home status board, or on the Blockchain,
 * Exchange and Access pages.
 *
 * It is kept whole here, and kept on /legal, deliberately. It is the only place
 * the site states that balances are simulated, that no licences are held and
 * that nothing here is an offer — and those statements are what make the rest
 * of the site's claims accurate rather than misleading to an investor. Moving
 * them behind one footer link is an editorial decision the owner can make;
 * deleting them outright is a legal one, and it needs counsel, not me.
 */
export const DISCLOSURE = {
  lead: 'All balances, assets, and transactions shown in any SunRey environment are simulated and carry no monetary value.',
  body: 'SunRey Chain operates as a testnet; mainnet is not active. SunRey is not a bank and holds no banking, brokerage, investment-advisory, custody, or money-transmission licenses. Nothing on this site is an offer to sell or a solicitation to buy any security or digital asset, and nothing here is legal, tax, investment, or financial advice. Forward-looking statements describe intended architecture and are not commitments.',
} as const;

/**
 * Footer tier 3 — §6.3.
 *
 * One neutral line and a link. The two sentences kept here are the ones every
 * finance site carries regardless of what stage it is at — no offer, no advice.
 * The status wording moved to /legal in full.
 */
export const FOOTER_LEGAL = {
  summary:
    'This site describes intended architecture. Nothing on it is an offer to sell or a solicitation to buy any security or digital asset, and nothing here is legal, tax, investment or financial advice. Full disclosures:',
  copyright: '© 2026 SunRey Technologies.',
  confidential: 'Confidential — for authorized recipients.',
} as const;

/**
 * The access gate screen — §4.2.
 *
 * Kept here for reference only. The gate is a Cloudflare Pages Function now
 * (§4), served before Next renders anything, so it carries its own copy inline
 * in `functions/_middleware.ts` — it cannot import from this file.
 */
export const GATE = {
  label: 'Passphrase',
  submit: 'Enter',
  error: 'That passphrase is not recognized.',
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
