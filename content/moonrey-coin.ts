import type { Heading, Hero, Item, NavLink, PageMeta, Rail } from './types';

/**
 * MoonRey Coin (`/moonrey-coin`) — CLAUDE.md §10. Production copy,
 * transcribed verbatim.
 *
 * This is the one page that switches the whole accent ramp to silver
 * (`data-economy="moon"` on `<main>`, §5.1/§13 Phase 3) — every string below
 * is rendered through components that read `--accent-*`, never a hard-coded
 * `--moon-*` value, except inside `EconomicLoop`'s diagram, which is the
 * §5.1-sanctioned exception because its subject *is* the handoff between the
 * two economies.
 *
 * §10.3 gives five pool cards without an explicit EYEBROW/H2 pair (every
 * other section on this page has one). As `content/exchange.ts` does for
 * the same situation in §11.6, the eyebrow and heading below reuse the
 * section's own name from the spec ("Economic pools") rather than inventing
 * new copy.
 */

// ---------------------------------------------------------------------------
// §10.4 — the loop
// ---------------------------------------------------------------------------

/** One of the seven vertical stages of the economic loop. */
export type LoopStage = {
  /** The stage's own description. */
  text: string;
  /** The layer tag rendered above it — HUMAN LAYER, AGENT LAYER, … */
  layer: string;
};

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export type MoonReyCoinContent = {
  meta: PageMeta;

  /** §10.1 */
  hero: Hero;
  heroImage: { src: string; alt: string; width: number; height: number };

  /** §10.2 — the MoonRey question */
  question: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };

  /** §10.3 — economic pools */
  pools: {
    eyebrow: string;
    heading: Heading;
    items: readonly Item[];
  };

  /** §10.4 — the loop */
  loop: {
    eyebrow: string;
    heading: Heading;
    stages: readonly LoopStage[];
    workedExample: string;
  };

  /** §10.5 — what is actually tokenized */
  tokenization: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };

  /** §10.6 — open architecture decisions */
  openDecisions: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
  };

  /** §10.7 — cross-link band */
  crossLink: {
    prefix: string;
    link: NavLink;
  };
};

export const moonreyCoin: MoonReyCoinContent = {
  meta: {
    title: 'MoonRey Coin — The Autonomous Productive Layer',
    description:
      'The economic coordination asset for the autonomous productive layer — energy, compute, robotics, infrastructure and machine output. Also native to SunRey Chain.',
  },

  hero: {
    eyebrow: 'MOONREY COIN',
    heading: ['The economy', 'that does not sleep.'],
    lede: 'When AI systems, robots and infrastructure perform most routine productive work, the object worth measuring is productive capacity — and it needs its own asset.',
    rail: ['ENERGY', 'COMPUTE', 'MOBILITY', 'MANUFACTURING', 'OUTPUT'] as Rail,
  },

  heroImage: {
    src: '/moonrey-coin.webp',
    alt: 'An illustrative render of the MoonRey Coin.',
    width: 578,
    height: 620,
  },

  question: {
    eyebrow: 'THE QUESTION',
    heading: [
      'How much useful capacity can the network provide — where, when, at what cost, under whose control, and with what reliability?',
    ],
    body: [
      'MoonRey Coin is the native asset for the autonomous productive economy. Its central object is productive capacity: the measurable ability of autonomous systems to provide economically useful goods and services.',
      'Energy. Compute. Food. Housing. Transport. Manufacturing. Resource output. Autonomous services. These are not abstractions in a machine economy — they are the supply side of every human demand expressed on the SunRey layer.',
    ],
  },

  pools: {
    eyebrow: 'ECONOMIC POOLS',
    heading: ['Economic pools.'],
    items: [
      {
        title: 'Machine & intellectual assets',
        copy: 'AI models, model weights, robotics software, industrial algorithms, simulation systems, digital twins, production processes, automation IP.',
      },
      {
        title: 'Resource & usage rights',
        copy: 'Mineral rights, water rights, spectrum rights, land-use rights, extraction rights, generation rights and other productive entitlements.',
      },
      {
        title: 'Environmental & circular economy',
        copy: 'Carbon instruments, renewable-energy certificates, recycling, recovered materials, waste-to-energy, reuse, ecosystem services.',
      },
      {
        title: 'Space economy',
        copy: 'Satellites, launch capacity, orbital communications, Earth observation, orbital compute, future space manufacturing and resource systems.',
      },
      {
        title: 'Machine-to-machine commerce',
        copy: 'Robot-to-grid payments, AI-to-AI procurement, autonomous maintenance, compute purchasing, energy purchasing, self-directed supply-chain settlement.',
      },
    ],
  },

  loop: {
    eyebrow: 'HOW THE TWO ECONOMIES MEET',
    heading: ['Human demand. Autonomous supply. One loop.'],
    stages: [
      {
        text: 'Human goals, identity, preferences, permissions and demand',
        layer: 'HUMAN LAYER',
      },
      {
        text: 'Financial agents translate goals into authorized economic intents',
        layer: 'AGENT LAYER',
      },
      {
        text: 'SunRey Chain evaluates rights, policy, identity and settlement conditions',
        layer: 'PROTOCOL LAYER',
      },
      {
        text: 'AI, compute, energy, robots, factories and resources are allocated',
        layer: 'PRODUCTIVE LAYER',
      },
      {
        text: 'Goods and services are produced, moved, stored and delivered',
        layer: 'OUTPUT LAYER',
      },
      {
        text: 'Economic value, costs, rewards and ownership changes are settled',
        layer: 'LEDGER LAYER',
      },
      {
        text: 'Outcomes update wealth, demand and future allocation',
        layer: 'ECONOMIC LOOP',
      },
    ],
    workedExample:
      'A person expresses a goal to reduce housing and energy costs through the SunRey layer. Financial agents identify authorized options. SunRey Chain validates permissions and jurisdiction. MoonRey-side markets source available energy, autonomous construction, housing capacity, financing or logistics. Settlement and attribution return to the user and the network.',
  },

  tokenization: {
    eyebrow: 'TOKENIZATION MODEL',
    heading: ['Verifiable rights, not implied ownership of the physical world.'],
    body: [
      'The strongest architecture tokenizes verifiable economic rights, state and activity — not a claim that one coin literally contains all underlying people, resources or physical assets.',
      'A design question the architecture keeps open and deliberate: which economic objects are merely measured by the network, and which are represented as enforceable tokenized rights. Those are different commitments with different legal consequences, and conflating them is how resource-backed tokens fail.',
    ],
  },

  openDecisions: {
    eyebrow: 'OPEN DECISIONS',
    heading: ['What the next architecture phase must settle.'],
    items: [
      'Distinct protocol roles for SunRey Coin and MoonRey Coin, so their utilities reinforce one another without becoming economically redundant.',
      'The Productive Capacity Graph and a canonical asset and capacity schema.',
      'Oracle security for high-value external facts — power generation, real estate ownership, resource reserves, robot output, industrial utilization.',
      'Which economic objects are measured versus represented as enforceable tokenized rights.',
      'Standards for AI-agent and robot identity, wallets, permissions, spending mandates and machine-to-machine contracting.',
      'The economic bridge between human demand and productive supply.',
      'Token economics, supply, issuance, fees, treasury, incentives and network security — modelled only after the utility architecture is stable.',
      'Separate regulatory classification for native coins, tokenized real-world rights, commodities, securities-like instruments, payment functions and autonomous commerce.',
    ],
  },

  crossLink: {
    prefix: 'Its counterpart in the human economy',
    link: { label: 'SunRey Coin', href: '/sunrey-coin' },
  },
};
