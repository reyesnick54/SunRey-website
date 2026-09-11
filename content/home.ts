import type { Heading, Hero, NavLink, PageMeta, Rail, Row } from './types';

/**
 * Home (`/`) — CLAUDE.md §7. Production copy, transcribed verbatim.
 *
 * §7 mixes several block shapes that do not fit the generic `ContentSection` —
 * a two-panel economy comparison, a bento grid, a diagram, a status board —
 * so this file declares its own per-block types (per `content/types.ts`'s
 * instruction) instead of forcing them through `PageContent`. Every block
 * component under `src/components/blocks/` imports its slice of `home`
 * directly.
 */

// ---------------------------------------------------------------------------
// §7.4 — the bento stack
// ---------------------------------------------------------------------------

export type BentoCardSize = 'wide' | 'third' | 'half';

export type BentoCard = {
  size: BentoCardSize;
  title: string;
  copy: string;
  href: string;
};

// ---------------------------------------------------------------------------
// §7.3 — the dual economy
// ---------------------------------------------------------------------------

export type EconomyPanel = {
  label: string;
  title: string;
  line: string;
  rows: readonly Row[];
  link: NavLink;
};

// ---------------------------------------------------------------------------
// §7.8 — the status board
// ---------------------------------------------------------------------------

export type StatusTone = 'running' | 'testnet' | 'partial' | 'sandbox' | 'disabled';

export type StatusRow = {
  label: string;
  state: string;
  tone: StatusTone;
  note: string;
};

// ---------------------------------------------------------------------------
// §7.5 — the Grow My Money flow diagram
// ---------------------------------------------------------------------------

export type GrowMyMoneyDiagram = {
  /** One entry per node, top to bottom. */
  nodes: readonly string[];
  /** Index of the node rendered in the accent colour — "Your approval". */
  accentIndex: number;
  ariaLabel: string;
};

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export type HomeContent = {
  meta: PageMeta;

  /** §7.1 */
  hero: Hero;

  /** §7.2 — the premise */
  premise: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };

  /** §7.3 — the dual economy */
  dualEconomy: {
    eyebrow: string;
    heading: Heading;
    lede: string;
    sun: EconomyPanel;
    moon: EconomyPanel;
    equation: string;
  };

  /** §7.4 — the stack */
  stack: {
    eyebrow: string;
    heading: Heading;
    cards: readonly BentoCard[];
  };

  /** §7.5 — Grow My Money */
  growMyMoney: {
    eyebrow: string;
    heading: Heading;
    lede: string;
    body: readonly string[];
    link: NavLink;
    diagram: GrowMyMoneyDiagram;
  };

  /** §7.6 — the manifesto band */
  manifesto: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };

  /** §7.7 — The Currency of You */
  currencyOfYou: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
    link: NavLink;
  };

  /** §7.8 — where we are */
  statusBoard: {
    eyebrow: string;
    heading: Heading;
    lede: string;
    rows: readonly StatusRow[];
    footnote: string;
  };

  /** §7.9 — closing band */
  closing: {
    heading: Heading;
    lede: string;
    links: readonly NavLink[];
  };
};

export const home: HomeContent = {
  meta: {
    title: 'SunRey — The Financial Operating System for a Post-AI Economy',
    description:
      'SunRey is an AI-native financial institution and human-information network — two native economies settling on one sovereign chain.',
  },

  hero: {
    eyebrow: 'A NEW FINANCIAL ERA',
    heading: ['Finance,', 'evolved.'],
    lede: 'The financial operating system for a post-AI, post-robotic economy. Intelligent agents that work for you, information that creates value on your terms, and two native economies settling on one sovereign chain.',
    rail: ['MONEY', 'MARKETS', 'INTELLIGENCE', 'DIGITAL OWNERSHIP'] as Rail,
  },

  premise: {
    eyebrow: 'THE PREMISE',
    heading: ['When machines do the work,', 'what is a person worth?'],
    body: [
      'For two centuries, human economic value has been measured by labor. That measure is ending. AI systems and autonomous machines are absorbing an increasing share of productive work, and the question underneath every economy — how does a person participate in the value they help create? — no longer has an obvious answer.',
      'SunRey is built on a different one. Human value moves from labor to information, judgment, permission and participation. Machine value moves to verified productive capacity — energy, compute, transport, housing, output. These are two distinct economies with two distinct measures, and they need to settle against each other on shared infrastructure.',
      'That infrastructure is what SunRey builds.',
    ],
  },

  dualEconomy: {
    eyebrow: 'ONE CHAIN · TWO ECONOMIES',
    heading: ['Two economies. One sovereign ledger.'],
    lede: 'SunRey Coin represents the human economy. MoonRey Coin represents the autonomous productive economy. Both are native assets of SunRey Chain — not tokens issued on someone else’s base layer.',
    sun: {
      label: 'SUNREY COIN',
      title: 'The human economic layer',
      line: 'People, communities and permissioned human information.',
      rows: [
        { label: 'Economic subject', value: 'People, communities, human information' },
        {
          label: 'Primary inputs',
          value: 'Identity, permissions, knowledge, preferences, participation',
        },
        {
          label: 'Primary outputs',
          value:
            'Human intelligence, demand, contribution, authorized information value',
        },
      ],
      link: { label: 'Explore SunRey Coin →', href: '/sunrey-coin' },
    },
    moon: {
      label: 'MOONREY COIN',
      title: 'The autonomous productive layer',
      line: 'AI, robots, infrastructure and productive assets.',
      rows: [
        {
          label: 'Economic subject',
          value: 'AI, robots, infrastructure, productive assets',
        },
        {
          label: 'Primary inputs',
          value: 'Energy, compute, resources, land, machines, industrial capacity',
        },
        {
          label: 'Primary outputs',
          value:
            'Goods, services, energy, transport, housing, compute, automated output',
        },
      ],
      link: { label: 'Explore MoonRey Coin →', href: '/moonrey-coin' },
    },
    equation:
      'FUTURE DIGITAL ECONOMY = HUMAN ECONOMIC VALUE + AUTONOMOUS PRODUCTIVE VALUE',
  },

  stack: {
    eyebrow: 'THE ARCHITECTURE',
    heading: ['An integrated system, not a collection of products.'],
    cards: [
      {
        size: 'wide',
        title: 'SunRey Chain',
        copy: 'The sovereign economic base layer. Identity, permissions, provenance, policy state and settlement as native concepts — not as applications running on top of a payments chain.',
        href: '/blockchain',
      },
      {
        size: 'third',
        title: 'Financial Agents',
        copy: 'AI that discovers and proposes. It never executes on its own authority.',
        href: '/ai-agents',
      },
      {
        size: 'third',
        title: 'The Vault',
        copy: 'Your information, held under your permission. Computation moves to the data.',
        href: '/vault',
      },
      {
        size: 'third',
        title: 'Access',
        copy: 'Governed, non-cash rights to real productive capacity.',
        href: '/access',
      },
      {
        size: 'half',
        title: 'SunRey Coin',
        copy: 'The economic coordination asset for the human layer.',
        href: '/sunrey-coin',
      },
      {
        size: 'half',
        title: 'MoonRey Coin',
        copy: 'The economic coordination asset for the autonomous layer.',
        href: '/moonrey-coin',
      },
    ],
  },

  growMyMoney: {
    eyebrow: 'THE CONSUMER PROMISE',
    heading: ['Put your money and your', 'information to work for you.'],
    lede: 'Not "monetize your data." The promise is simpler and it points the other way: your money and your permissioned information should be working on your behalf, continuously, inside limits you set.',
    body: [
      'Grow My Money is the primary objective of the SunRey Financial Agents: continuously determine the best permissible next action for your next dollar — consistent with your goals, your risk tolerance, your liquidity needs, legal permissions and the constraints you define.',
      'The agent is designed to observe, explain, recommend and prepare. Whether it may execute, and within what limits, is a decision you make and can revoke.',
    ],
    link: { label: 'How the agents work →', href: '/ai-agents' },
    diagram: {
      nodes: [
        'Your goal',
        'Economic graph',
        'Opportunity discovery',
        'Growth plan',
        'Agent explanation',
        'Your approval',
        'Execution',
        'Attribution',
      ],
      accentIndex: 5,
      ariaLabel:
        'A vertical flow diagram showing how a goal becomes an approved action: Your goal, then Economic graph, Opportunity discovery, Growth plan, Agent explanation, Your approval, Execution, and Attribution.',
    },
  },

  manifesto: {
    eyebrow: 'THE GOVERNING PRINCIPLE',
    heading: [
      'Information is not money.',
      'Valuation is not monetary policy.',
      'And intelligence — human or artificial —',
      'is not sovereign authority.',
    ],
    body: [
      'Three boundaries hold the architecture together. Evidence, however well verified, cannot create money. A valuation, however sophisticated, cannot authorize issuance. And no model, agent, operator, endpoint or database can move value on its own authority.',
      'Economic facts live outside the chain. Monetary truth lives inside it.',
    ],
  },

  currencyOfYou: {
    eyebrow: 'SUNREY COIN',
    heading: ['The Currency of You.'],
    body: [
      'Not a claim on you. Not ownership of your data. Not a score of your worth.',
      'SunRey Coin is the economic coordination asset for the human layer of the network — a way to settle, reward and coordinate the participation people authorize. What creates value is the activity: the verified contribution, the permitted computation, the authorized research, the network utility. Never the person, and never their raw information.',
    ],
    link: { label: 'Read the design principles →', href: '/sunrey-coin' },
  },

  statusBoard: {
    eyebrow: 'BUILD STATUS',
    heading: ['Built in the open, honestly labelled.'],
    lede: 'SunRey is a pre-production system. We would rather tell you exactly what runs today than describe a roadmap as a product.',
    rows: [
      {
        label: 'Accounts & ledger',
        state: 'RUNNING',
        tone: 'running',
        note: 'Durable, PostgreSQL-backed, restart-verified',
      },
      {
        label: 'Internal transfers',
        state: 'RUNNING',
        tone: 'running',
        note: 'Durable',
      },
      {
        label: 'Native wallets',
        state: 'RUNNING',
        tone: 'running',
        note: 'SunRey and MoonRey assets',
      },
      {
        label: 'Vault',
        state: 'RUNNING',
        tone: 'running',
        note: 'Bound to durable state',
      },
      {
        label: 'SunRey Chain',
        state: 'TESTNET',
        tone: 'testnet',
        note: 'Validator consensus, two native assets. Mainnet not active.',
      },
      {
        label: 'Financial Agents',
        state: 'PARTIAL',
        tone: 'partial',
        note: 'Research wired; conversational runtime in progress',
      },
      {
        label: 'Exchange',
        state: 'SANDBOX',
        tone: 'sandbox',
        note: 'Simulation only',
      },
      {
        label: 'Access',
        state: 'SANDBOX',
        tone: 'sandbox',
        note: 'Fixed sandbox inventory',
      },
      {
        label: 'Live banking & cards',
        state: 'DISABLED',
        tone: 'disabled',
        note: 'Requires regulated partners',
      },
      {
        label: 'Data marketplace',
        state: 'DISABLED',
        tone: 'disabled',
        note: 'Requires legal and provider prerequisites',
      },
    ],
    footnote: 'All environments are simulated. No real money, no real digital assets and no real personal data exist in the system.',
  },

  closing: {
    heading: ['The future of finance', 'is bright.'],
    lede: 'SunRey Technologies is building the economic layer for human information.',
    links: [
      { label: 'Read the white papers →', href: '/white-papers' },
      { label: 'Explore the architecture →', href: '/blockchain' },
    ],
  },
};
