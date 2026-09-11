import type { Heading, Hero, Item, PageMeta, Rail } from './types';

/**
 * Access (`/access`) — CLAUDE.md §11.2. Production copy, transcribed
 * verbatim.
 *
 * "The definition" section (denials) has no explicit EYEBROW/H2 pair in the
 * spec — every other section on this page has one. Following the precedent
 * set in `content/exchange.ts` and `content/moonrey-coin.ts`, the eyebrow and
 * heading below reuse the section's own name from the spec.
 */

// ---------------------------------------------------------------------------
// §11.2 — three separate states
// ---------------------------------------------------------------------------

export type SeparateState = {
  n: string;
  title: string;
  copy: string;
};

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export type AccessContent = {
  meta: PageMeta;

  /** Hero */
  hero: Hero;

  /** The definition — callout, then three short denials */
  definition: {
    eyebrow: string;
    heading: Heading;
    callout: string;
    denials: readonly Item[];
  };

  /** Three separate states */
  separateStates: {
    eyebrow: string;
    heading: Heading;
    items: readonly SeparateState[];
    below: string;
  };

  /** How allocation works */
  allocation: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };

  /** Lifecycle */
  lifecycle: {
    eyebrow: string;
    heading: Heading;
    stages: readonly string[];
    below: string;
  };

  /** Categories */
  categories: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
    footnote: string;
  };

  /** Where this goes */
  direction: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };
};

export const access: AccessContent = {
  meta: {
    title: 'SunRey Access — Governed Rights to Real Productive Capacity',
    description:
      'A governed, non-cash right to use real productive capacity, bounded by verified allocatable capacity and reserved funding. Not a currency and not a redemption promise.',
  },

  hero: {
    eyebrow: 'SUNREY ACCESS',
    heading: ['Not a currency.', 'A right to use.'],
    lede: 'Access is a governed, non-cash right to use real productive capacity — mobility, lodging, compute, energy, transit, experiences — bounded by verified allocatable capacity and reserved funding. In the current sandbox, both are simulated.',
    rail: [
      'MOBILITY',
      'LODGING',
      'COMPUTE',
      'ENERGY',
      'TRANSIT',
      'EXPERIENCES',
    ] as Rail,
  },

  definition: {
    eyebrow: 'THE DEFINITION',
    heading: ['The definition.'],
    callout:
      'Access is not a third currency and is not a fixed redemption promise. It is a governed, non-cash right to use real productive capacity. Participation in the network can influence allocation, while the system remains bounded by actual category capacity and available funding.',
    denials: [
      {
        title: 'Not a currency.',
        copy: 'Access entitlements do not trade and are not money.',
      },
      {
        title: 'Not a promise.',
        copy: 'Access cannot create an unfunded promise of goods or services.',
      },
      {
        title: 'Not unlimited.',
        copy: 'Total entitlements never exceed verified allocatable capacity.',
      },
    ],
  },

  separateStates: {
    eyebrow: 'THE SEPARATION',
    heading: ['Three states that never merge.'],
    items: [
      {
        n: '01',
        title: 'Token participation state',
        copy: 'What you hold and for how long.',
      },
      {
        n: '02',
        title: 'Access entitlement state',
        copy: 'What you are entitled to use.',
      },
      {
        n: '03',
        title: 'Fiat funding & settlement',
        copy: 'How the provider actually gets paid.',
      },
    ],
    below:
      'Keeping these three apart is what prevents Access from becoming an unfunded promise, a shadow currency, or a claim the network cannot honor.',
  },

  allocation: {
    eyebrow: 'ALLOCATION',
    heading: ['Time-weighted, capacity-bounded.'],
    body: [
      'Allocation uses time-weighted average balance rather than snapshot balances, so participation is measured by duration rather than by timing a moment. Diminishing-return transforms and configurable dual-economy weighting shape the curve.',
      'Above all, allocation is bounded: the total set of entitlements issued never exceeds the verified allocatable capacity in that category. If the capacity is not there, the entitlement is not issued.',
    ],
  },

  lifecycle: {
    eyebrow: 'LIFECYCLE',
    heading: ['Lifecycle.'],
    stages: [
      'Quote',
      'Coverage',
      'Co-pay',
      'Entitlement reservation',
      'Funding reservation',
      'Provider booking',
      'Settlement',
      'Fulfillment',
      'Restoration / refund',
      'Three-way reconciliation',
    ],
    below:
      'Providers settle in fiat and need not natively understand SunRey or MoonRey. A capability-driven provider abstraction, and where appropriate a restricted payment instrument bounded by amount, merchant category, geography, expiration and single-use constraints, sits between the network and the merchant.',
  },

  categories: {
    eyebrow: 'CATEGORIES',
    heading: ['Capacity people actually use.'],
    items: ['Mobility', 'Lodging', 'Experiences', 'AI Compute', 'Transit', 'Energy'],
    footnote:
      'Category inventory shown in any SunRey environment is simulated sandbox capacity with no real-world redeemability.',
  },

  direction: {
    eyebrow: 'THE DIRECTION',
    heading: ['Intent, matched to capacity.'],
    body: [
      'The longer arc is autonomous allocation: authorized human intent — goals, time, location, budget and desired experiences — matched by agents against available productive capacity such as mobility, lodging, compute, energy, robotics, food, logistics or manufacturing.',
      'That is the point at which the SunRey layer and the MoonRey layer stop being two descriptions of an economy and start being one mechanism.',
    ],
  },
};
