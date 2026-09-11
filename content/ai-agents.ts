import type { Heading, Hero, Item, PageMeta, Rail } from './types';

/**
 * A.I. Agents (`/ai-agents`) — CLAUDE.md §11.1. Production copy, transcribed
 * verbatim.
 *
 * The Grow My Money section is reused verbatim from `content/home.ts` §7.5 —
 * both the copy and the diagram — per §11.1's own instruction, so this file
 * holds only the one addition that section makes on this page: the callout
 * rendered after the diagram. See `src/app/ai-agents/page.tsx`.
 *
 * §11.1 gives no explicit EYEBROW/H2 pair for "The autonomy ladder", "What
 * agents may not do" or "Named systems" — every other section on this page,
 * and on its sibling pages, has one. Following the precedent set in
 * `content/exchange.ts` and `content/moonrey-coin.ts` for the same situation,
 * the eyebrow and heading below for those three sections reuse the section's
 * own name from the spec rather than inventing new copy.
 */

// ---------------------------------------------------------------------------
// §11.1 — the autonomy ladder
// ---------------------------------------------------------------------------

export type AutonomyLevel = {
  n: string;
  level: string;
  behavior: string;
  controlStandard: string;
};

// ---------------------------------------------------------------------------
// §11.1 — the authority model
// ---------------------------------------------------------------------------

export type AuthorityModelDiagram = {
  /** PROPOSAL → PERMISSION → RISK → EXECUTION AUTHORITY → SETTLEMENT */
  stages: readonly string[];
  ariaLabel: string;
};

// ---------------------------------------------------------------------------
// The page
// ---------------------------------------------------------------------------

export type AiAgentsContent = {
  meta: PageMeta;

  /** Hero */
  hero: Hero;

  /** Grow My Money — copy and diagram reused from `content/home.ts`; this is
   * only the callout §11.1 adds after the diagram. */
  growMyMoneyCallout: string;

  /** The autonomy ladder */
  autonomyLadder: {
    eyebrow: string;
    heading: Heading;
    rows: readonly AutonomyLevel[];
    below: string;
  };

  /** The authority model */
  authorityModel: {
    eyebrow: string;
    heading: Heading;
    body: readonly string[];
    diagram: AuthorityModelDiagram;
  };

  /** What agents may not do */
  cannotDo: {
    eyebrow: string;
    heading: Heading;
    items: readonly string[];
    trailingLabel: string;
    closing: string;
  };

  /** Named systems */
  namedSystems: {
    eyebrow: string;
    heading: Heading;
    items: readonly Item[];
  };
};

export const aiAgents: AiAgentsContent = {
  meta: {
    title: 'SunRey Financial Agents — AI That Proposes, Never Executes',
    description:
      'The AI systems designed to observe, explain, recommend and prepare financial actions within limits the person sets. They propose; they do not hold execution authority.',
  },

  hero: {
    eyebrow: 'SUNREY FINANCIAL AGENTS',
    heading: ['AI is an analyst,', 'not a sovereign.'],
    lede: "SunRey's agents are designed to discover opportunities, explain them and prepare them. What they may execute — and within what limits — is a decision you make, bound in infrastructure rather than in a prompt.",
    rail: ['OBSERVE', 'EXPLAIN', 'RECOMMEND', 'PREPARE', 'EXECUTE'] as Rail,
  },

  growMyMoneyCallout:
    'Grow My Money — continuously determine the best permissible next action for the user’s next dollar, consistent with goals, risk, liquidity needs, legal permissions and user-defined constraints.',

  autonomyLadder: {
    eyebrow: 'THE AUTONOMY LADDER',
    heading: ['The autonomy ladder.'],
    rows: [
      {
        n: '01',
        level: 'Observe',
        behavior: 'Read financial state and identify patterns',
        controlStandard: 'Read-only, explicit data permissions',
      },
      {
        n: '02',
        level: 'Explain',
        behavior: 'Explain cash flow, risks, fees and opportunities',
        controlStandard: 'Traceable reasoning and source references',
      },
      {
        n: '03',
        level: 'Recommend',
        behavior: 'Recommend savings, transfers, debt actions or investments',
        controlStandard:
          'Suitability and best-interest standards, where a regulated partner makes them applicable',
      },
      {
        n: '04',
        level: 'Prepare',
        behavior: 'Stage a transaction for user approval',
        controlStandard: 'Clear fees, destination, risk and cancellation terms',
      },
      {
        n: '05',
        level: 'Execute',
        behavior: 'Execute automatically within a user-approved mandate',
        controlStandard:
          'Permissions from the applicable regulated partner, limits, audit logs, human override and revocation',
      },
    ],
    below:
      'Autonomy is graduated, never binary. Every automated action is explainable, and reversible wherever the underlying financial rail permits reversal.',
  },

  authorityModel: {
    eyebrow: 'THE AUTHORITY MODEL',
    heading: ['A proposal is not a permission.'],
    body: [
      'AI models discover and propose actions. They cannot directly execute consequential financial state changes. Candidate opportunities are designed to become structured Action Intents, which pass through deterministic permission, risk, compliance and execution-authority layers before any controlled settlement occurs.',
      'Agent capabilities are enforced in infrastructure by design, never inferred from a prompt — allowed actions, forbidden actions, account classes, limits, expiry, jurisdiction and revocation state.',
    ],
    diagram: {
      stages: ['PROPOSAL', 'PERMISSION', 'RISK', 'EXECUTION AUTHORITY', 'SETTLEMENT'],
      ariaLabel:
        'A five-stage horizontal flow: Proposal, then Permission, Risk, Execution Authority and Settlement, with a gate at each boundary between stages.',
    },
  },

  cannotDo: {
    eyebrow: 'WHAT AGENTS MAY NOT DO',
    heading: ['What agents may not do.'],
    items: [
      'Silently merge high-impact identities',
      'Fabricate evidence',
      'Override rights',
      'Activate monetary policy',
      'Authorize issuance',
      'Elevate their own permissions',
    ],
    trailingLabel: 'not permitted',
    closing:
      'Agent mandates are scoped, revocable and purpose-bound. The deterministic risk engine outranks every return-seeking agent in the system; if risk fails, the action does not occur.',
  },

  namedSystems: {
    eyebrow: 'NAMED SYSTEMS',
    heading: ['Named systems.'],
    items: [
      {
        title: 'Personal Economic Graph',
        copy: 'Economic relationships carrying source, verification, sensitivity, purpose, consent, expiration, jurisdiction and permitted-agent metadata.',
      },
      {
        title: 'Agentic Capital Mesh',
        copy: 'Specialized macro, FX, relative-value, volatility, microstructure, execution and meta-allocation agents operating under a superior deterministic risk engine.',
      },
      {
        title: 'Personal Oracle',
        copy: 'Converts source information into verifiable statements — that a criterion is satisfied, without revealing the record behind it.',
      },
      {
        title: 'Regulatory Digital Twin',
        copy: 'A versioned capability-state machine mapping regulation to requirement to control to policy to implementation to test to evidence.',
      },
      {
        title: 'Risk Engine',
        copy: 'Deterministic and superior to every agent. Position, exposure, concentration, liquidity, loss and drawdown limits, with independent kill switches.',
      },
      {
        title: 'Model Registry',
        copy: 'Every economically consequential model is designed to carry a production identity, validation state, approved jurisdictions and a kill-switch state.',
      },
    ],
  },
};
