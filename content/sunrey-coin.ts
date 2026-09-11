import type { Heading, Hero, Item, NavLink, PageMeta, Rail } from './types';

/**
 * SunRey Coin (`/sunrey-coin`) — CLAUDE.md §9. Production copy, transcribed
 * verbatim.
 *
 * §9.2 and §9.5 deliberately reuse a few otherwise-flagged words inside
 * permitted denial constructions, each one an exact match against the
 * §12.4 ALLOWED list — do not reword those sentences to work around
 * `check:claims`; they are already the exempted spelling.
 */

export type SunReyCoinContent = {
  meta: PageMeta;

  /** §9.1 */
  hero: Hero;
  heroImage: { src: string; alt: string; width: number; height: number };

  /** §9.2 — first, what it is not */
  whatItIsNot: {
    eyebrow: string;
    heading: Heading;
    items: readonly Item[];
  };

  /** §9.3 — what generates value */
  economicEngine: {
    eyebrow: string;
    heading: Heading;
    lede: string;
    items: readonly Item[];
  };

  /** §9.4 — what the coin coordinates */
  scope: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
  };

  /** §9.5 — design guardrails */
  guardrails: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
  };

  /** §9.6 — ticker notice */
  tickerNotice: string;

  /** §9.7 — cross-link band */
  crossLink: {
    prefix: string;
    link: NavLink;
  };
};

export const sunreyCoin: SunReyCoinContent = {
  meta: {
    title: 'SunRey Coin — The Human Economic Layer',
    description:
      'The economic coordination asset for the human layer of the network. A native asset of SunRey Chain, not a token on a third-party base layer.',
  },

  hero: {
    eyebrow: 'SUNREY COIN',
    heading: ['The Currency', 'of You.'],
    lede: 'The economic coordination asset for the human layer of the network. Its value comes from what people authorize — not from what can be extracted from them.',
    rail: ['PARTICIPATION', 'CONTRIBUTION', 'SETTLEMENT', 'COORDINATION'] as Rail,
  },

  heroImage: {
    src: '/sunrey-coin.webp',
    alt: 'An illustrative render of the SunRey Coin.',
    width: 578,
    height: 620,
  },

  whatItIsNot: {
    eyebrow: 'FIRST, WHAT IT IS NOT',
    heading: ['A coin cannot own a person.'],
    items: [
      {
        title: 'Not backed by people.',
        copy: 'SunRey Coin is not collateralized by individuals, by their data, or by any claim on their future participation.',
      },
      {
        title: "Not ownership of anyone's information.",
        copy: "The network tokenizes rights around information — permissions, provenance, verified attributes, computational access, derived insights and economic rights. It does not tokenize a person or place a person's raw history on-chain.",
      },
      {
        title: 'Not a score of human worth.',
        copy: 'The human economy is designed to evaluate defined contributions, not to assign an intrinsic value to a person. Age, health, genetics, psychology, location and social relationships are not economic contributions merely because data about them exists.',
      },
    ],
  },

  economicEngine: {
    eyebrow: 'THE ECONOMIC ENGINE',
    heading: ['Useful network activity.'],
    lede: 'The intended value driver is useful activity on the network — not a narrative about what the coin represents.',
    items: [
      {
        title: 'Network utility',
        copy: 'Fees, settlement and coordination across the human layer.',
      },
      {
        title: 'Authorized computation',
        copy: 'Compute-to-data requests executed against permissioned sources.',
      },
      {
        title: 'Verified contribution',
        copy: 'Research participation, credentialed work, signed receipts.',
      },
      {
        title: 'Attestations',
        copy: 'Issuance and verification of credentials and derived claims.',
      },
      {
        title: 'Information markets',
        copy: 'Time-limited access rights, research contracts, permitted training.',
      },
      {
        title: 'Participant rewards',
        copy: 'Compensation for qualifying participation and network services.',
      },
    ],
  },

  scope: {
    eyebrow: 'SCOPE',
    heading: ['The human layer, in full.'],
    items: [
      'Identity and verified credentials',
      'Financial state and economic behavior',
      'Preferences, goals, purchase intent and consumer demand',
      'Health, wellness, biological and research attributes — where legally permitted and explicitly authorized',
      'Professional, educational and skill credentials',
      'Digital, behavioral, mobility, entertainment and lifestyle signals — when permissioned',
      'Community participation, memberships, relationships and reputation attestations',
      'AI interactions, personal mandates, accepted recommendations and preference refinement',
      'Consent, permission, purpose, provenance and compensation rights',
      'Derived intelligence, eligibility proofs, research cohorts, attestations and compute-to-data outputs',
    ],
  },

  guardrails: {
    eyebrow: 'DESIGN GUARDRAILS',
    heading: ['Constraints we published before we needed them.'],
    items: [
      'Utility is designed around a functional network with real demand, independent of speculative trading.',
      'No passive yield, guaranteed appreciation or company-profit participation is offered or implied.',
      'Supply, emissions, treasury controls, unlocks, governance and market-making will be defined transparently before any public distribution.',
      'Token classification analysis will be run in every target jurisdiction before offering, listing or rewarding the asset.',
      'SunRey Coin is valued separately from SunRey corporate equity. A token market capitalization is never used as a substitute for enterprise value.',
      'Sensitive raw human information stays off-chain. Only hashes, proof identifiers, consent references, settlement events and provenance identifiers are committed.',
    ],
  },

  tickerNotice:
    'The SunRey Coin ticker is intentionally undetermined and should not be inferred from prior names. It will be selected only after trademark, exchange-symbol, regulatory and market-confusion review.',

  crossLink: {
    prefix: 'Its counterpart in the autonomous economy',
    link: { label: 'MoonRey Coin', href: '/moonrey-coin' },
  },
};
