import type { Heading, Hero, PageMeta, Rail, Row } from './types';

/**
 * Blockchain (`/blockchain`) — CLAUDE.md §8. Production copy, transcribed
 * verbatim.
 *
 * Like `content/home.ts`, this page mixes several block shapes that do not
 * fit the generic `ContentSection` (a two-panel index comparison, a
 * two-column body with a callout, a consensus diagram, oversized-numeral
 * rows, a denial list), so this file declares its own per-block types.
 */

// ---------------------------------------------------------------------------
// §8.3 — designed native capabilities
// ---------------------------------------------------------------------------

export type CapabilityItem = {
  title: string;
  copy: string;
};

// ---------------------------------------------------------------------------
// §8.4 — the two indices
// ---------------------------------------------------------------------------

export type IndexPanel = {
  label: string;
  /** The H3, two lines. */
  heading: Heading;
  body: string;
  /** "Reads" and "Informs" — ordinary rows. */
  rows: readonly Row[];
  /** "Cannot do" — present on both panels, never softened or omitted. */
  cannotDo: string;
};

// ---------------------------------------------------------------------------
// §8.5 — two consensus planes
// ---------------------------------------------------------------------------

export type ConsensusDiagram = {
  /** EVIDENCE → CORROBORATION → INFORMATION CONSENSUS */
  left: readonly string[];
  /** PROPOSAL → POLICY → MONETARY CONSENSUS */
  right: readonly string[];
  gate: string;
  ariaLabel: string;
};

// ---------------------------------------------------------------------------
// §8.6 — the five roots
// ---------------------------------------------------------------------------

export type RootItem = {
  n: string;
  title: string;
  copy: string;
};

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export type BlockchainContent = {
  meta: PageMeta;

  /** §8.1 */
  hero: Hero;

  /** §8.2 — why a sovereign chain */
  whySovereign: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
    callout: string;
  };

  /** §8.3 — designed native capabilities */
  capabilities: {
    eyebrow: string;
    heading: Heading;
    items: readonly CapabilityItem[];
  };

  /** §8.4 — the two indices */
  twoIndices: {
    eyebrow: string;
    heading: Heading;
    lede: string;
    human: IndexPanel;
    production: IndexPanel;
    closingCallout: string;
  };

  /** §8.5 — two consensus planes */
  consensus: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
    diagram: ConsensusDiagram;
  };

  /** §8.6 — the five roots */
  fiveRoots: {
    eyebrow: string;
    heading: Heading;
    roots: readonly RootItem[];
    callout: string;
  };

  /** §8.7 — what cannot mint */
  cannotMint: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
    trailingLabel: string;
    closing: string;
  };

};

export const blockchain: BlockchainContent = {
  meta: {
    title: 'SunRey Chain — The Sovereign Economic Base Layer',
    description:
      'SunRey Chain is the sovereign economic base layer beneath both economies — identity, permissions, provenance, rights and policy as native protocol concepts.',
  },

  hero: {
    eyebrow: 'SUNREY CHAIN',
    heading: ['The sovereign', 'economic base layer.'],
    lede: 'One chain beneath two economies. Identity, permissions, provenance, rights and policy are native concepts — not applications bolted onto a payments network.',
    rail: ['IDENTITY', 'RIGHTS', 'PROVENANCE', 'POLICY', 'SETTLEMENT'] as Rail,
  },

  whySovereign: {
    eyebrow: 'THE DECISION',
    heading: ['Sovereignty over the protocol, not over every primitive.'],
    body: [
      'SunRey Coin and MoonRey Coin are native assets of SunRey Chain. They are not tokens issued on Ethereum or on any other third-party base layer. The reason is not ideological. A network whose core logic is identity, consent, provenance, policy state and jurisdictional control cannot rent that logic from a chain that treats all of it as application data.',
      'That sovereignty is deliberately bounded. Owning the protocol does not require reinventing every cryptographic primitive. SunRey Chain is designed around a mature, production-grade consensus engine and proven interoperability components, replacing commodity layers only where there is a genuine technical reason to do so. The distinctive work is the economic state machine and the authority model — not consensus mathematics.',
    ],
    callout:
      'External blockchains may eventually interoperate with SunRey. They remain external networks. SunRey Chain is the system of record for native SunRey and MoonRey economic activity.',
  },

  capabilities: {
    eyebrow: 'DESIGNED NATIVE CAPABILITIES',
    heading: ['What the protocol treats as first-class.'],
    items: [
      {
        title: 'Identity primitives',
        copy: 'Designed to link wallets and accounts to pseudonymous or verified identity states without exposing unnecessary personal information.',
      },
      {
        title: 'Consent & rights registry',
        copy: 'Designed to record purpose, scope, duration, revocation, transferability and compensation terms as protocol objects.',
      },
      {
        title: 'Attestations',
        copy: 'Designed to represent verified credentials and derived claims without republishing the underlying records.',
      },
      {
        title: 'Provenance',
        copy: 'Designed to trace source, transformation and authorization history for every data-derived asset.',
      },
      {
        title: 'Policy execution',
        copy: 'Designed to prevent disallowed transactions based on jurisdiction, asset class, user status or consent state.',
      },
      {
        title: 'Settlement',
        copy: 'Designed to settle native assets, fiat-linked instruments, marketplace fees and participant rewards.',
      },
      {
        title: 'Developer interfaces',
        copy: 'Designed to allow approved agents, researchers and applications to request proofs or computations.',
      },
      {
        title: 'Auditability',
        copy: 'Designed to provide immutable evidence of policy decisions without exposing private data.',
      },
    ],
  },

  twoIndices: {
    eyebrow: 'WHAT ONLY THIS CHAIN MEASURES',
    heading: ['Two indices, one ledger.'],
    lede: 'Most chains measure themselves — blocks, fees, throughput. SunRey Chain is designed to measure the two economies it settles: what human participation is contributing, and what productive capacity actually exists.',
    human: {
      label: 'HUMAN INFORMATION INDEX',
      heading: ['What participation is worth,', 'never what a person is worth.'],
      body: 'The human-side index is designed to read the demand and clearing conditions of the information layer — which categories of authorized participation are being requested, by how many buyers, against how many eligible contributors, and at what historical compensation.',
      rows: [
        {
          label: 'Reads',
          value:
            'Buyer demand, eligible contributors, category demand, geographic demand, historical clearing conditions',
        },
        {
          label: 'Informs',
          value:
            'Compensation proposals, cohort feasibility, contributor-facing opportunity ranking',
        },
      ],
      cannotDo: 'Issue supply, set a market price, or assign a value to a person',
    },
    production: {
      label: 'A.I. & PRODUCTION LAYER INDEX',
      heading: ['What the machines can', 'actually deliver.'],
      body: 'The productive-side index is designed to read verified capacity rather than asserted capacity: energy generated, compute available, output produced, utilization observed — each carrying its source lineage, because independent sources matter more than repeated endpoints reporting the same upstream fact.',
      rows: [
        {
          label: 'Reads',
          value:
            'Energy, compute, transport, housing, manufacturing and service capacity, with utilization and lineage',
        },
        {
          label: 'Informs',
          value: 'Allocation, Access capacity bounds, productive-contribution valuation',
        },
      ],
      cannotDo: 'Issue supply, set a market price, or stand in as an oracle of its own',
    },
    closingCallout:
      'Both indices represent market and capacity conditions. Neither represents guaranteed asset value, and neither sits on the path that can change supply — an index is evidence, and evidence cannot mint.',
  },

  consensus: {
    eyebrow: 'THE AUTHORITY MODEL',
    heading: ['Two kinds of agreement.'],
    body: [
      'Most chains have one consensus question: did this transaction happen? SunRey Chain is designed to separate two.',
      'Information Consensus is designed to establish whether an economic fact is sufficiently supported by evidence — enough independent sources, enough corroboration, enough lineage. Monetary Consensus finalizes valid monetary state transitions. The separation means validators can agree on a block without independently inventing issuance authority.',
      'It is what would let the same network hold both a claim about the world and a claim about money, and treat them as different kinds of truth.',
    ],
    diagram: {
      left: ['EVIDENCE', 'CORROBORATION', 'INFORMATION CONSENSUS'],
      right: ['PROPOSAL', 'POLICY', 'MONETARY CONSENSUS'],
      gate: 'AUTHORIZATION BOUNDARY',
      ariaLabel:
        'Two converging chains of agreement: on the left, Evidence leads to Corroboration leads to Information Consensus; on the right, Proposal leads to Policy leads to Monetary Consensus. Both meet at a single gate labelled Authorization Boundary.',
    },
  },

  fiveRoots: {
    eyebrow: 'PROOF-BOUND STATE',
    heading: ['Five commitments, one block.'],
    roots: [
      {
        n: '01',
        title: 'Transaction Root',
        copy: 'Commits to the ordered execution set — what executed.',
      },
      {
        n: '02',
        title: 'Monetary State Root',
        copy: 'Commits to the resulting canonical protocol state.',
      },
      {
        n: '03',
        title: 'Evidence Root',
        copy: 'Commits to the supporting economic evidence.',
      },
      {
        n: '04',
        title: 'Rights Root',
        copy: 'Commits to consent, rights, license and purpose authorization context.',
      },
      {
        n: '05',
        title: 'Policy Root',
        copy: 'Commits to the exact methodology and policy version applied.',
      },
    ],
    callout:
      'Historical evidence can later be challenged, and consent can later be revoked, without rewriting finalized history. New statuses are represented as subsequent append-only records.',
  },

  cannotMint: {
    eyebrow: 'THE EVIDENCE-TO-MONEY FIREWALL',
    heading: ['Supply changes have exactly one path.'],
    items: [
      'Raw personal data',
      'An economic observation',
      'A verified economic fact',
      'An economic claim',
      'A valuation layer',
      'An oracle',
      'An AI agent',
      'An API',
      'A frontend',
      'An exchange',
      'An operational database',
    ],
    trailingLabel: 'cannot mint',
    closing:
      'These systems create evidence, calculations and proposals. Only the canonical protocol path can finalize a supply-changing transition, and only after the applicable governance and consensus requirements are satisfied.',
  },

};
