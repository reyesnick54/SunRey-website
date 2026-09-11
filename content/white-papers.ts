import type { Hero, PageMeta } from './types';

/**
 * White Papers (`/white-papers` and `/white-papers/[slug]`) — CLAUDE.md §11.4
 * and §11.9. Production copy, transcribed verbatim.
 *
 * The ten papers themselves — abstracts, "does not establish" lines, section
 * counts, reading times and blocks — are generated content living in
 * `content/papers/`. This file holds only the copy that is NOT part of that
 * registry: the index page's hero and notice, its closing band, and the
 * small set of chrome strings the article route (§11.9) needs to render a
 * paper's own registry fields (its meta row, its footer nav, its
 * disclaimer prefix).
 */
export type WhitePapersContent = {
  meta: PageMeta;

  /** §11.4 hero */
  hero: Hero;

  /** §11.4 — the bordered notice immediately below the hero */
  notice: string;

  /** §11.4 — the closing band */
  closing: {
    heading: string;
    body: string;
  };

  /**
   * §11.9 — chrome strings for the article route. Every one of these is
   * combined at render time with a field from a paper's own registry entry
   * (its category, section count, minute count, title) — never restated
   * verbatim per paper, so the ten papers cannot drift from `index.ts`.
   */
  article: {
    /** "WHITE PAPER" — combined with `· {category}` for every card and header. */
    eyebrowPrefix: string;
    /** "sections" — the footer row reads "{sections} sections · ~{minutes} min read". */
    sectionsSuffix: string;
    /** "min read" */
    minReadSuffix: string;
    /** "← Back to white papers" */
    back: string;
    /** "Next:" — combined with "{next paper title} →". */
    nextPrefix: string;
    /** "Does not establish:" — combined with a paper's own `notEstablished`. */
    notEstablishedPrefix: string;
  };
};

export const whitePapers: WhitePapersContent = {
  meta: {
    title: 'SunRey White Papers & Technical Documents',
    description:
      'Architecture, economics and design constraints as written — including the parts that are unresolved.',
  },

  hero: {
    eyebrow: 'DOCUMENTS',
    heading: ['The thinking,', 'in full.'],
    lede:
      'Architecture, economics and design constraints as written — including the parts that are unresolved.',
  },

  notice:
    'These are conceptual architecture papers. They describe intended design, not shipped capability: regulated functions remain subject to jurisdiction-specific legal basis, provider coverage, security review and production authorization. Nothing here is legal, regulatory, securities, tax or investment advice, a token offering, or an offer of any security or digital asset.',

  closing: {
    heading: 'Architectural ancestry, not mission inheritance.',
    body: 'Parts of this architecture draw deliberately on prior work in federated information systems — schema mediation, link discovery, provenance, policy-aware access and immutable audit. The engineering is worth inheriting. The objective is inverted: rights, purpose limitation, minimization and accountability are architectural properties here, not governance added afterward.',
  },

  article: {
    eyebrowPrefix: 'WHITE PAPER',
    sectionsSuffix: 'sections',
    minReadSuffix: 'min read',
    back: '← Back to white papers',
    nextPrefix: 'Next:',
    notEstablishedPrefix: 'Does not establish:',
  },
};
