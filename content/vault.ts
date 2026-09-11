import type { Heading, Hero, PageMeta, Rail, Row } from './types';

/**
 * Vault (`/vault`) — CLAUDE.md §11.3. Production copy, transcribed verbatim.
 *
 * §11.3's limits section exists precisely to state what is NOT promised —
 * transcribed exactly, including the conditional (never unconditional)
 * revocation language §2.2 requires.
 */

// ---------------------------------------------------------------------------
// §11.3 — the inversion
// ---------------------------------------------------------------------------

export type InversionPanel = {
  label: string;
  text: string;
};

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export type VaultContent = {
  meta: PageMeta;

  /** Hero */
  hero: Hero;

  /** The inversion */
  inversion: {
    eyebrow: string;
    heading: Heading;
    left: InversionPanel;
    right: InversionPanel;
    below: string;
  };

  /** What the Vault is */
  whatItIs: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
    callout: string;
  };

  /** Information domains — exactly eight */
  domains: {
    eyebrow: string;
    heading: Heading;
    rows: readonly Row[];
  };

  /** On-chain and off-chain */
  split: {
    eyebrow: string;
    heading: Heading;
    onChainLabel: string;
    offChainLabel: string;
    onChain: readonly string[];
    offChain: readonly string[];
  };

  /** The Purpose Firewall */
  purposeFirewall: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
  };

  /** Compute-to-data */
  computeToData: {
    eyebrow: string;
    heading: Heading;
    flowLabel: string;
    steps: readonly string[];
    workedExamplePrefix: string;
    workedExample: string;
    closing: string;
  };

  /** The limits we state plainly */
  limits: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
  };
};

export const vault: VaultContent = {
  meta: {
    title: 'SunRey Vault — The Human Information Network',
    description:
      'The user-linked secure data layer. Designed so that sensitive source data is not casually replicated across counterparties, and exposes only tightly scoped interfaces for authorized computation.',
  },

  hero: {
    eyebrow: 'SUNREY VAULT · HUMAN INFORMATION NETWORK',
    heading: ['Data stays private.', 'Proof moves.'],
    lede: 'Permission moves. Computation moves to the data where possible. Money moves as settlement. The record itself does not travel.',
    rail: ['CONSENT', 'PURPOSE', 'PROVENANCE', 'COMPUTATION', 'COMPENSATION'] as Rail,
  },

  inversion: {
    eyebrow: 'THE INVERSION',
    heading: ['The same machinery, pointed the other way.'],
    left: {
      label: 'HISTORICAL MODEL',
      text: 'Aggregate data about people so institutions can understand them.',
    },
    right: {
      label: 'SUNREY MODEL',
      text: 'Let a person control an integrated intelligence model of themselves, and selectively authorize the financial, research or computational uses that benefit them.',
    },
    below: 'The goal is not total surveillance. The goal is authorized economic awareness.',
  },

  whatItIs: {
    eyebrow: 'THE VAULT',
    heading: ['A secure layer, not a collection.'],
    body: [
      'The SunRey Vault is the user-linked secure data layer. It is designed to be implemented through encrypted storage, trusted execution environments, confidential-compute providers, user-held keys, institutional custody patterns, or a hybrid of these.',
      'The defining requirement is simple and it is a requirement, not a feature: sensitive source data is not casually replicated across counterparties. The Vault exposes tightly scoped interfaces for authorized computation, and nothing wider.',
    ],
    callout:
      'The objective is not to collect everything indiscriminately. It is to create a standardized architecture that can represent many dimensions of a person when they choose to connect them and when a lawful purpose exists.',
  },

  domains: {
    eyebrow: 'INFORMATION DOMAINS',
    heading: ['Information domains.'],
    rows: [
      {
        label: 'Financial',
        value: 'Income, balances, spending, debt, savings, investing, insurance, remittances',
      },
      {
        label: 'Consumption',
        value: 'Purchases, subscriptions, merchants, product categories',
      },
      {
        label: 'Health & wellness',
        value: 'Wearables, sleep, labs, activity, medical sources where permitted',
      },
      {
        label: 'Psychological & cognitive',
        value: 'Assessments, self-reported goals, behavioral signals',
      },
      {
        label: 'Biological',
        value:
          'Genomics, biomarkers, microbiome and other laboratory-derived sources where lawful',
      },
      {
        label: 'Digital & entertainment',
        value: 'Apps, media, music, games, content and device behavior',
      },
      {
        label: 'Mobility & lifestyle',
        value: 'Travel, location history where permissioned, leisure and activity',
      },
      {
        label: 'Identity & credentials',
        value: 'KYC, education, employment, licenses, memberships',
      },
    ],
  },

  split: {
    eyebrow: 'THE SPLIT',
    heading: ['What the chain sees. What it never sees.'],
    onChainLabel: 'ON-CHAIN',
    offChainLabel: 'OFF-CHAIN',
    onChain: [
      'Hashes and cryptographic commitments',
      'Consent receipts and authorization',
      'Credential and attestation references',
      'Data provenance and source verification',
      'Revocation and expiration status',
      'Policy execution results',
      'Settlement and compensation',
    ],
    offChain: [
      'Raw health, genetic and biometric records',
      'Detailed transaction history unless explicitly needed',
      'Private communications and content',
      'High-resolution behavioral datasets',
      'Documents, images and large files',
      'Personally identifying source records',
      'Features that would create re-identification risk',
    ],
  },

  purposeFirewall: {
    eyebrow: 'PURPOSE FIREWALL',
    heading: ['Knowing that data exists', 'is not permission to use it.'],
    body: [
      'A factual statement can be true while its use remains unauthorized. SunRey therefore separates truth from permission.',
      'Rights grants, consent grants, purpose authorizations and provider-license controls determine whether evidence may be used for contribution verification, research, valuation or monetary proposal. A purpose authorized for research does not automatically authorize monetary use.',
      'Purpose is designed to be enforced in the backend, never left to an application prompt.',
    ],
  },

  computeToData: {
    eyebrow: 'COMPUTE-TO-DATA',
    heading: ['Send the question, not the records.'],
    flowLabel: 'DESIGNED FLOW — NOT ACTIVE',
    steps: [
      'An enterprise or researcher submits a defined query, purpose and jurisdiction.',
      'The policy engine is designed to identify eligible data sources and the required consent or legal basis.',
      'User permission rules are evaluated; new consent is collected where required.',
      'Computation is designed to run inside the approved environment against eligible vault data.',
      'The requester receives only the authorized aggregate, proof or derived output.',
      'SunRey is designed to settle participant rewards, protocol fees and enterprise charges.',
    ],
    workedExamplePrefix: 'ILLUSTRATIVE',
    workedExample:
      "A pharmaceutical researcher requests a cohort matching biomarker, age and sleep criteria. SunRey would evaluate eligibility against participating vaults, verify each person's permission policy, perform the approved computation, produce the authorized output and settle compensation — without giving the researcher unrestricted copies of anyone's health record.",
    closing: 'The highest-value marketplace may ultimately sell answers rather than data.',
  },

  limits: {
    eyebrow: 'LIMITS',
    heading: ['What this architecture does not promise.'],
    items: [
      'Revocation stops future use where required. It does not rewrite finalized history that was validly authorized at the time of execution.',
      'Permissions can be revoked where legally and technically possible. Some lawful bases and some completed computations are not reversible.',
      'Sensitive information participating in an authorized research or computation event makes the event the monetizable object — never the underlying human characteristic.',
      'SunRey does not create an irreversible marketplace in people. It creates a marketplace in permissioned computation, verified attributes, provenance and user-authorized participation.',
    ],
  },
};
