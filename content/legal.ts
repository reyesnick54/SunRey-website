import type { PageMeta } from './types';

/**
 * Legal (`/legal`) — CLAUDE.md §11.5. Production copy, transcribed verbatim.
 *
 * Linked from the footer only; not in the nav (§1.1, §6.3). A single-column
 * typographic page — no cards, no glow, just a rule under each H2.
 *
 * The seven legal sections below (Pre-production status through Privacy of
 * this site — §14's "seven §11.5 legal sections") each carry a
 * `{/* REVIEW: counsel *\/}` marker at the point they render, per §11.5's own
 * instruction that counsel will revise this file. `isDisclosure` marks the
 * one section (Pre-production status) that renders the shared `<Disclosure>`
 * component instead of its own paragraphs, so that copy can never drift from
 * the footer's (§2.3, §6.3).
 *
 * Contact is an eighth, separate section — §11.5 gives it its own inline
 * placeholder note rather than a counsel-review marker, since the open item
 * is an address to confirm (§15), not language to legal-review.
 */
export type LegalSection = {
  heading: string;
  paragraphs: readonly string[];
  /** True only for "Pre-production status" — render `<Disclosure/>`, not `paragraphs`. */
  isDisclosure?: boolean;
};

export type LegalContent = {
  meta: PageMeta;
  subline: string;
  /** The seven legal sections, in §11.5 order. */
  sections: readonly LegalSection[];
  /** The eighth section — §11.5's own placeholder, open per §15 item 1. */
  contact: {
    heading: string;
    org: string;
    email: string;
    placeholder: string;
  };
};

export const legal: LegalContent = {
  meta: {
    title: 'Legal & Disclosures',
    description:
      'Pre-production status, forward-looking statements, and the disclosures that govern this site.',
  },

  subline: 'Last updated September 2026.',

  sections: [
    {
      heading: 'Pre-production status',
      paragraphs: [],
      isDisclosure: true,
    },
    {
      heading: 'Forward-looking statements',
      paragraphs: [
        'This site describes intended architecture, design intent and planned capability. Statements about what SunRey will do, may do, is designed to do, or intends to build are forward-looking. They are not commitments, guarantees, or descriptions of present capability. Architecture described here may change materially, and capabilities described here may never be built, may be built differently, or may be restricted or disabled in particular jurisdictions. Where this site describes what runs today, it is labelled as such.',
      ],
    },
    {
      heading: 'No offer of securities or digital assets',
      paragraphs: [
        'Nothing on this site constitutes an offer to sell, or a solicitation of an offer to buy, any security, digital asset, token, or financial instrument, in any jurisdiction. No subscription, allocation, presale, or distribution is being offered or accepted. No valuation, price, ticker, supply figure, or return is stated or implied anywhere on this site, and none should be inferred. Any future issuance of a native network asset would be subject to jurisdiction-by-jurisdiction classification analysis and to whatever regulatory process that analysis requires.',
      ],
    },
    {
      heading: 'No financial, legal or tax advice',
      paragraphs: [
        'Nothing on this site is legal, regulatory, securities, tax, accounting, investment, or financial advice, and nothing here should be relied upon as such. SunRey holds no banking, brokerage, investment-advisory, custody, money-transmission, or exchange licenses, and does not hold itself out as a bank, broker, adviser, or custodian. Descriptions of regulated capability describe architecture designed to operate with appropriately regulated partners in the future; they do not describe present authorization.',
      ],
    },
    {
      heading: 'Confidentiality',
      paragraphs: [
        'This site and its contents are confidential and are provided to authorized recipients only. Access is granted for the purpose of evaluating SunRey and for no other purpose. Recipients should not reproduce, distribute, publish, or disclose this material or the access credentials to it without written permission from SunRey Technologies. Documents made available here carry their own confidentiality terms, which apply in addition to these.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'SunRey Technologies pursues a provisional patent filing strategy. No patent grant is claimed, asserted, or implied anywhere on this site, and no statement here should be read as an opinion on patentability, novelty, non-obviousness, patent eligibility, or enforceability. "SunRey," "MoonRey," and associated marks and designs are the property of SunRey Technologies. All third-party names referenced remain the property of their respective owners.',
      ],
    },
    {
      heading: 'Privacy of this site',
      paragraphs: [
        'This site is a static, gated information site. It does not collect personal information, does not set advertising or tracking cookies, and does not transmit visitor data to third parties. A single browser-local flag records that the access passphrase was entered, so returning visitors are not prompted repeatedly. That flag stays in the visitor’s browser and is never sent to SunRey.',
      ],
    },
  ],

  contact: {
    heading: 'Contact',
    org: 'SunRey Technologies',
    email: 'hello@sunrey.xyz',
    placeholder: '(placeholder — confirm before launch, see §15)',
  },
};
