import type { Heading, Hero, Item, PageMeta, Rail, Row } from './types';

/**
 * Exchange (`/exchange`) — CLAUDE.md §11.6. Production copy, transcribed
 * verbatim.
 *
 * Two sections in §11.6 — "Three markets" and "Listing discipline" — are
 * given without an explicit EYEBROW/H2 pair in the spec (every other section
 * on the site, and every other section on this page, has one). The eyebrow
 * and heading below for those two sections reuse the section's own name from
 * the spec ("Three markets", "Listing discipline") rather than inventing new
 * copy, to keep the page's heading structure consistent without adding a
 * claim the spec does not make.
 */

// ---------------------------------------------------------------------------
// §11.6 — the components
// ---------------------------------------------------------------------------

export type ExchangeContent = {
  meta: PageMeta;

  /** Hero */
  hero: Hero;

  /** Section — The difference */
  difference: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
    callout: string;
  };

  /** Section — Three markets */
  markets: {
    eyebrow: string;
    heading: Heading;
    items: readonly Item[];
  };

  /** Section — The components */
  components: {
    eyebrow: string;
    heading: Heading;
    rows: readonly Row[];
  };

  /** Section — Surveillance */
  surveillance: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
    trailingLabel: string;
    closing: string;
  };

  /** Section — Listing discipline */
  listingDiscipline: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
  };

  /** Section — Current state */
};

export const exchange: ExchangeContent = {
  meta: {
    title: 'SunRey Exchange — Eligibility Before the Match',
    description:
      'SunRey Exchange is designed to establish rights, policy and jurisdiction before an order is allowed to rest — because what trades here is not only assets.',
  },

  hero: {
    eyebrow: 'SUNREY EXCHANGE',
    heading: ['Eligibility before', 'the match.'],
    lede: 'A generic exchange matches price and quantity. This one is designed to establish rights, policy and jurisdiction before an order is allowed to rest — because what trades here is not only assets.',
    rail: ['DIGITAL ASSETS', 'INFORMATION RIGHTS', 'COMPUTE', 'CAPACITY'] as Rail,
  },

  difference: {
    eyebrow: 'THE DIFFERENCE',
    heading: ['The check belongs before the book, not after it.'],
    body: [
      'On a conventional venue, compliance is something that happens around the matching engine — screening at onboarding, surveillance after the fact, reconciliation at the end of the day. That works when every instrument is the same kind of thing and every participant is eligible for all of it.',
      'It stops working when the order book holds information rights that expire, compute that is jurisdiction-bound, and productive capacity that only some participants may hold. SunRey Exchange is designed so that rights, consent state, purpose and jurisdiction are evaluated before an order can rest — an ineligible order never reaches the book.',
    ],
    callout:
      'Exchange functionality is designed to remain disabled by default until the required regulated structure exists in a given jurisdiction.',
  },

  markets: {
    eyebrow: 'THE MARKETS',
    heading: ['Three markets.'],
    items: [
      {
        title: 'Digital assets',
        copy: 'The two native assets and any future approved network assets, alongside the fiat pairs a regulated partner permits in a given jurisdiction.',
      },
      {
        title: 'Information rights',
        copy: 'Time-limited access rights, research participation contracts and permitted training authorizations — the right to compute, never a copy of the record.',
      },
      {
        title: 'Intelligence & compute',
        copy: 'Derived intelligence, eligibility proofs, cohort constructions and compute products. The marketplace that may ultimately sell answers rather than data.',
      },
    ],
  },

  components: {
    eyebrow: 'THE COMPONENTS',
    heading: ['What sits behind the book.'],
    rows: [
      { label: 'Matching engine', value: 'Price-time priority across permitted order types.' },
      {
        label: 'Order management',
        value: 'Lifecycle, amendment, cancellation and rejection with reasons.',
      },
      {
        label: 'Market data',
        value: 'Book state and trade prints, with provenance and freshness carried.',
      },
      {
        label: 'Custody adapter',
        value: 'Segregated participant balances, never commingled with corporate assets.',
      },
      {
        label: 'Fiat gateway',
        value: 'Settlement through the regulated partner appropriate to the jurisdiction.',
      },
      {
        label: 'Compliance gateway',
        value: 'Identity, sanctions, travel rule and jurisdiction state at the boundary.',
      },
      {
        label: 'Asset registry',
        value: 'Per-jurisdiction classification, permitted participants, transfer status.',
      },
      {
        label: 'Listing governance',
        value: 'What may list where, on whose authority, and under what disclosures.',
      },
      {
        label: 'Market surveillance',
        value: 'Pattern detection with human review, never opaque automated enforcement.',
      },
      {
        label: 'Reconciliation',
        value: 'Three-way agreement between book, ledger and custodian.',
      },
    ],
  },

  surveillance: {
    eyebrow: 'SURVEILLANCE',
    heading: ['Detection is designed in, not bolted on.'],
    items: [
      'Wash trading',
      'Spoofing',
      'Layering',
      'Self-trading',
      'Abnormal volume',
      'Coordinated accounts',
      'Price manipulation',
    ],
    trailingLabel: 'detection interface',
    closing:
      'AI assists the investigation. It does not close it. Detection surfaces a case to a human reviewer with the evidence that raised it; no irreversible enforcement decision is designed to rest on an opaque model output alone.',
  },

  listingDiscipline: {
    eyebrow: 'LISTING DISCIPLINE',
    heading: ['Listing discipline.'],
    items: [
      'No exchange capability activates until the corresponding regulated structure exists in that jurisdiction.',
      'Participant assets and corporate assets are separately accounted at every point in the stack.',
      'An asset’s classification is per-jurisdiction, and features enable or disable from that classification rather than from a global switch.',
      'Information rights carry their consent and expiry state into the market; an expired right cannot be matched.',
      'Every order, fill, amendment and rejection is designed to be reconstructable — what happened, under which policy version, and why it was permitted.',
    ],
  },

};
