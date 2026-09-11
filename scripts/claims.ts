/**
 * Claims rules — CLAUDE.md §2.2, enforced by `npm run check:claims`.
 *
 * ---------------------------------------------------------------------------
 * HOW TO READ THIS FILE
 * ---------------------------------------------------------------------------
 *
 * Two lists, and the order matters:
 *
 *   BANNED   Every rule from §2.2. A rule is either a literal `phrase`, matched
 *            case-insensitively on word boundaries with flexible whitespace, or
 *            an explicit `pattern` for shapes a phrase cannot express (currency
 *            amounts, percentages, cashtags).
 *
 *   ALLOWED  Verbatim strings this spec deliberately uses in permitted denial
 *            constructions. A banned match that falls inside an allowed span is
 *            not a violation. The build cannot pass without these.
 *
 * Two implementation rules, from §12.4, that must not be relaxed:
 *
 *   1. Match on word boundaries and phrases, never substrings. `live` must not
 *      fire on "delivered"; `returns` must not fire on "return arrow". Where a
 *      word is only banned in a specific sense — "live", "returns", "bank" —
 *      encode the banned PHRASE, not the bare word.
 *   2. Every rule carries a `reason`, so a failure explains itself to whoever
 *      hits it, and a `ref` back to the section of CLAUDE.md that requires it.
 *
 * ---------------------------------------------------------------------------
 * EXTENDING THIS FILE
 * ---------------------------------------------------------------------------
 *
 * Counsel will add rules here as they review the copy. Adding a rule: append to
 * BANNED with a unique `id`. Adding an exemption: append the verbatim string to
 * ALLOWED with the section it comes from. Never widen a rule to a bare word to
 * "catch more" — that produces false positives, false positives get suppressed,
 * and a suppressed checker protects nothing.
 */

export type ClaimRule = {
  /** Unique, kebab-case. Printed on failure. */
  id: string;
  /**
   * A literal phrase. Matched case-insensitively, with runs of whitespace
   * treated as flexible, and anchored to word boundaries at either end where
   * the phrase begins or ends with a word character.
   */
  phrase?: string;
  /** An explicit pattern, for shapes a phrase cannot express. Must be global. */
  pattern?: RegExp;
  /** Why this is banned. Shown to whoever trips it. */
  reason: string;
  /** The section of CLAUDE.md that requires the rule. */
  ref: string;
};

export type AllowedPhrase = {
  /** The exempt string, verbatim. */
  phrase: string;
  /** Where in CLAUDE.md it comes from. */
  ref: string;
};

/* ==========================================================================
   §2.2 — "licensed", "regulated", "chartered", "bank", "broker", "adviser",
   "custodian" (of SunRey).

   These words are all legitimate in denials and in "regulated partner"
   constructions, which §11.1 and §11.5 use repeatedly. Only claims that SunRey
   IS one of these things are banned.
   ========================================================================== */

const LICENSING: readonly ClaimRule[] = [
  {
    id: 'sunrey-is-licensed',
    pattern:
      /\b(?:SunRey|we|the\s+(?:company|platform|network))\s+(?:is|are|becomes?|became)\s+(?:a\s+|an\s+|fully\s+)*(?:licen[cs]ed|regulated|chartered|registered)\b/gi,
    reason:
      'No licenses are held. Every licensing reference in every SunRey document is prospective.',
    ref: '§2.1, §2.2',
  },
  {
    id: 'our-license',
    pattern: /\b(?:our|SunRey(?:'s|’s)?|the\s+company(?:'s|’s)?)\s+(?:banking\s+|money\s+transmission\s+|broker(?:age)?\s+|custody\s+)?licen[cs]es?\b/gi,
    reason: 'No licenses are held. Use prospective language, or say what is not held.',
    ref: '§2.1, §2.2',
  },
  {
    id: 'fully-licensed',
    phrase: 'fully licensed',
    reason: 'No licenses are held.',
    ref: '§2.2',
  },
  {
    id: 'licensed-and-regulated',
    phrase: 'licensed and regulated',
    reason: 'No licenses are held. SunRey is not regulated.',
    ref: '§2.2',
  },
  {
    id: 'licensed-institution',
    pattern:
      /\b(?:a\s+|an\s+)?licen[cs]ed\s+(?:bank|broker|broker-dealer|dealer|adviser|advisor|custodian|exchange|institution|entity)\b/gi,
    reason: 'No licenses are held. SunRey is not a licensed institution of any kind.',
    ref: '§2.2',
  },
  {
    id: 'sunrey-is-a-bank',
    pattern:
      /\b(?:SunRey|we|the\s+(?:company|platform))\s+(?:is|are)\s+(?:a\s+|an\s+)?(?:digital\s+|neo\s*|challenger\s+)?(?:bank|broker(?:-dealer)?|dealer|adviser|advisor|custodian|trust\s+company)\b/gi,
    reason: 'SunRey is not a bank, broker, adviser or custodian.',
    ref: '§2.2, §2.3',
  },
  {
    id: 'sunrey-bank',
    pattern: /\bSunRey\s+(?:Bank|Trust|Securities|Brokerage)\b/g,
    reason: 'SunRey is not a bank. No such entity exists.',
    ref: '§2.2',
  },
  {
    id: 'chartered-bank',
    pattern: /\b(?:chartered|national|state)\s+bank\b/gi,
    reason: 'SunRey holds no charter.',
    ref: '§2.2',
  },
  {
    id: 'registered-investment-adviser',
    pattern: /\bregistered\s+investment\s+advis[eo]r\b/gi,
    reason: 'SunRey holds no investment-advisory registration.',
    ref: '§2.2',
  },
];

/* ==========================================================================
   §2.2 — "live", "launched", "in production", "mainnet", "operational network".

   `mainnet` is banned as a bare word because the only permitted uses are the
   three denials in ALLOWED. `live` and `production` are banned only in the
   senses that assert activation.
   ========================================================================== */

const ACTIVATION: readonly ClaimRule[] = [
  {
    id: 'mainnet',
    phrase: 'mainnet',
    reason:
      'Mainnet is not active (MAINNET_ACTIVE=false). The only permitted uses are the denials in the ALLOWED list.',
    ref: '§2.1, §2.2, §2.3',
  },
  {
    id: 'live-banking',
    phrase: 'live banking',
    reason:
      'Live connectivity is disabled (LIVE_CONNECTIVITY_ENABLED=false). Permitted only as the §7.8 status-board row label.',
    ref: '§2.1, §2.2',
  },
  {
    id: 'live-trading',
    phrase: 'live trading',
    reason: 'The exchange is simulation only.',
    ref: '§2.2, §7.8',
  },
  {
    id: 'is-live',
    pattern:
      /\b(?:is|are|now|goes?|going|went)\s+live\b|\blive\s+(?:network|platform|environment|system|deployment|rail|rails)\b/gi,
    reason: 'Nothing is live. The platform runs on an internal sandbox.',
    ref: '§2.1, §2.2',
  },
  {
    id: 'launched',
    pattern: /\blaunch(?:ed|ing)\b/gi,
    reason:
      'Nothing has launched. "LAUNCHING SOON" is a launch claim and is not permitted; the status pill reads PRE-PRODUCTION.',
    ref: '§2.2, §6.1, §15',
  },
  {
    id: 'in-production',
    pattern: /\b(?:in|into|reached|entering)\s+production\b|\bproduction[-\s]ready\b/gi,
    reason:
      'PRODUCTION_ACTIVE=false. "production-grade consensus engine" (§8.2) is fine; being in production is not.',
    ref: '§2.1, §2.2',
  },
  {
    id: 'operational-network',
    phrase: 'operational network',
    reason: 'No network is operational. SunRey Chain is testnet-grade.',
    ref: '§2.2',
  },
  {
    id: 'real-money',
    pattern: /\breal\s+(?:money|funds|assets)\s+(?:is|are)\s+(?:held|supported|available)\b/gi,
    reason: 'No real money and no real digital assets exist in the system.',
    ref: '§2.1',
  },
];

/* ==========================================================================
   §2.2 — patents. Nothing is granted. The portfolio is a provisional-filing
   strategy; say "provisional patent portfolio" or "patent applications".
   ========================================================================== */

const PATENTS: readonly ClaimRule[] = [
  {
    id: 'patented',
    phrase: 'patented',
    reason: 'No patents are granted. §14 requires this word to appear nowhere.',
    ref: '§2.2, §14',
  },
  {
    id: 'patent-protected',
    pattern: /\bpatent[-\s]protected\b/gi,
    reason: 'No patents are granted.',
    ref: '§2.2',
  },
  {
    id: 'our-patents',
    pattern: /\b(?:our|SunRey(?:'s|’s)?|the\s+company(?:'s|’s)?)\s+patents\b/gi,
    reason: 'No patents are granted. Describe a provisional filing strategy instead.',
    ref: '§2.2, §11.4',
  },
  {
    id: 'patent-count',
    pattern: /\b\d+\s+(?:granted\s+|issued\s+)?patents\b/gi,
    reason:
      'Never "13 patents". Nothing is granted, and a count implies grants.',
    ref: '§2.2, §11.4',
  },
  {
    id: 'granted-patent',
    pattern: /\b(?:granted|issued|awarded)\s+patents?\b|\bpatents?\s+(?:granted|issued|awarded)\b/gi,
    reason: 'No patents are granted.',
    ref: '§2.2',
  },
];

/* ==========================================================================
   §2.2 — ticker symbols. "The SunRey Coin ticker is intentionally TBD and
   should not be inferred from prior names." Talking about the absence of a
   ticker (§9.6) is fine; a symbol is not.
   ========================================================================== */

const TICKERS: readonly ClaimRule[] = [
  {
    id: 'cashtag',
    pattern: /\$[A-Z]{2,6}\b/g,
    reason: 'No ticker symbol appears anywhere on this site.',
    ref: '§2.2, §14',
  },
  {
    id: 'ticker-is',
    pattern: /\bticker\s*(?:symbol\s*)?(?:is|:)\s*[A-Z]{2,6}\b/g,
    reason: 'The ticker is intentionally undetermined.',
    ref: '§2.2, §9.6',
  },
  {
    id: 'legacy-ticker-pyr',
    phrase: 'PYR',
    reason: 'Retired ticker for the retired asset name Pyramid Coin.',
    ref: '§2.2, §2.6',
  },
];

/* ==========================================================================
   §2.2 — valuations, funding figures, user counts. All source-document ranges
   are marked "illustrative strategic scenarios, not a fairness opinion".
   ========================================================================== */

const FIGURES: readonly ClaimRule[] = [
  {
    id: 'currency-amount',
    pattern: /[$€£¥]\s?\d/g,
    reason:
      'No valuation, funding or price figure appears anywhere on this site. ("your next dollar" is fine — it carries no number.)',
    ref: '§2.2, §14',
  },
  {
    id: 'large-number',
    pattern: /\b\d[\d,.]*\s*(?:million|billion|trillion)\b/gi,
    reason: 'No valuation, funding figure or user count.',
    ref: '§2.2, §14',
  },
  {
    id: 'valued-at',
    pattern: /\b(?:valued\s+at|valuation\s+of|market\s+cap(?:italization)?\s+of|pre-money|post-money)\b/gi,
    reason:
      'All valuation ranges in the source documents are illustrative scenarios, not a fairness opinion.',
    ref: '§2.2',
  },
  {
    id: 'raised-funding',
    pattern: /\b(?:raised|secured|closed)\s+(?:a\s+)?(?:seed|series\s+[a-z]|pre-seed|round|funding)\b/gi,
    reason: 'No funding figures or rounds.',
    ref: '§2.2, §14',
  },
  {
    id: 'user-count',
    pattern: /\b\d[\d,.]*\+?\s+(?:users|customers|members|participants|institutions|partners)\b/gi,
    reason: 'No user counts. Do not invent facts (§0 rule 2).',
    ref: '§0, §14',
  },
];

/* ==========================================================================
   §2.2 — "guaranteed", "passive yield", "returns", "APY", any %.
   "Avoid promising passive yield, guaranteed appreciation or company-profit
   participation."
   ========================================================================== */

const YIELD: readonly ClaimRule[] = [
  {
    id: 'guaranteed',
    phrase: 'guaranteed',
    reason:
      'Nothing is guaranteed. Permitted only inside the §9.5 denial in the ALLOWED list.',
    ref: '§2.2, §9.5',
  },
  {
    id: 'passive-yield',
    phrase: 'passive yield',
    reason: 'No passive yield is offered or implied.',
    ref: '§2.2, §9.5',
  },
  {
    id: 'yield-promise',
    pattern: /\b(?:earn|generate|deliver|provide|offer)s?\s+(?:a\s+)?(?:yield|returns?|interest)\b/gi,
    reason: 'No yield or return is offered or implied.',
    ref: '§2.2, §9.5',
  },
  {
    id: 'returns-claim',
    pattern:
      /\b(?:guaranteed|expected|projected|annual|annualised|annualized|investment|high|strong|outsized)\s+returns?\b|\breturns?\s+of\s+\d/gi,
    reason:
      'No return is stated or implied. (This rule is phrase-scoped so it never fires on "return arrow".)',
    ref: '§2.2, §11.5, §12.4',
  },
  {
    id: 'apy',
    pattern: /\bAP[YR]\b/g,
    reason: 'No rate is stated or implied.',
    ref: '§2.2',
  },
  {
    id: 'percentage',
    pattern: /\d+(?:\.\d+)?\s?%/g,
    reason: 'No percentage appears anywhere on this site.',
    ref: '§2.2, §14',
  },
  {
    id: 'profit-participation',
    pattern: /\b(?:profit|revenue)[-\s]sharing\b|\bshare\s+(?:in|of)\s+(?:our\s+|the\s+company(?:'s|’s)?\s+)?profits\b/gi,
    reason: 'No company-profit participation is offered or implied.',
    ref: '§2.2, §9.5',
  },
];

/* ==========================================================================
   §2.2 — "backed by people", "backed by your data", "own your data".
   "Do not market SunRey Coin as 'backed by people' or as ownership of
   individuals' data."
   ========================================================================== */

const BACKING: readonly ClaimRule[] = [
  {
    id: 'backed-by-people',
    pattern: /\bbacked\s+by\s+(?:people|humans|individuals|human\s+\w+)\b/gi,
    reason: 'SunRey Coin is not collateralized by individuals.',
    ref: '§2.2, §9.2',
  },
  {
    id: 'backed-by-data',
    pattern: /\bbacked\s+by\s+(?:your|their|personal|human)\s+data\b/gi,
    reason: 'SunRey Coin is not collateralized by anyone’s data.',
    ref: '§2.2, §9.2',
  },
  {
    id: 'own-your-data',
    pattern: /\b(?:own|owns|owning)\s+(?:your|their)\s+data\b/gi,
    reason:
      'The network tokenizes rights around information, not ownership of a person’s data.',
    ref: '§2.2, §9.2',
  },
];

/* ==========================================================================
   §2.2 — "monetize your data", "sell your data".
   The brand promise is the inverse (§2.4): "put your money and your information
   to work for you."
   ========================================================================== */

const EXTRACTION: readonly ClaimRule[] = [
  {
    id: 'monetize-your-data',
    pattern: /\bmoneti[sz]e\s+(?:your|their|his|her|user)\s+data\b/gi,
    reason:
      'Data monetization reads as extractive. The promise points the other way (§2.4). Permitted only inside the §7.5 denial.',
    ref: '§2.2, §2.4, §7.5',
  },
  {
    id: 'sell-your-data',
    pattern: /\bsell(?:ing|s)?\s+(?:your|their|user|personal|human)\s+data\b/gi,
    reason: 'SunRey does not create a marketplace in people or in raw personal data.',
    ref: '§2.2, §11.3',
  },
];

/* ==========================================================================
   §2.2 — "complete digital footprint", "digital twin of you", "profile",
   "dossier". The "centralized dossier mentality" is an explicitly rejected
   design.

   Note: "Regulatory Digital Twin" (§11.1) is a named system and is untouched by
   these rules — only a digital twin OF A PERSON is banned.
   ========================================================================== */

const DOSSIER: readonly ClaimRule[] = [
  {
    id: 'dossier',
    phrase: 'dossier',
    reason: 'The centralized dossier mentality is an explicitly rejected design.',
    ref: '§2.2',
  },
  {
    id: 'profile',
    pattern: /\bprofil(?:e|es|ed|ing)\b/gi,
    reason:
      'A profile is a dossier by another name. Say what is actually held: permissions, attestations, provenance, authorized computation.',
    ref: '§2.2',
  },
  {
    id: 'complete-digital-footprint',
    pattern: /\b(?:complete|full|entire|total)\s+digital\s+footprint\b/gi,
    reason: 'SunRey does not aggregate a complete digital footprint.',
    ref: '§2.2',
  },
  {
    id: 'digital-twin-of-a-person',
    pattern: /\bdigital\s+twin\s+of\s+(?:you|a\s+person|the\s+user|yourself|people)\b/gi,
    reason:
      'A digital twin of a person is the rejected design. The Regulatory Digital Twin (§11.1) is unrelated and permitted.',
    ref: '§2.2, §11.1',
  },
];

/* ==========================================================================
   §2.2 — "delete everything", "erase your data", unconditional revocation.
   "Revocation stops future use where required but does not rewrite finalized
   history."
   ========================================================================== */

const REVOCATION: readonly ClaimRule[] = [
  {
    id: 'delete-everything',
    pattern: /\b(?:delete|erase|wipe|purge|remove)\s+(?:everything|all\s+(?:your|their)\s+data|(?:your|their)\s+(?:entire\s+)?(?:data|history|record))\b/gi,
    reason:
      'Revocation stops future use where required. It does not rewrite finalized history.',
    ref: '§2.2, §11.3',
  },
  {
    id: 'unconditional-revocation',
    pattern:
      /\b(?:unconditional|absolute|total|complete|instant|immediate)\s+revocation\b|\brevoke\s+(?:everything|at\s+any\s+time\s+for\s+any\s+reason)\b/gi,
    reason:
      'Some lawful bases and some completed computations are not reversible. Do not promise unconditional revocation.',
    ref: '§2.2, §11.3',
  },
  {
    id: 'right-to-be-forgotten',
    phrase: 'right to be forgotten',
    reason:
      'Implies unconditional erasure of finalized history, which the architecture does not provide.',
    ref: '§2.2, §11.3',
  },
];

/* ==========================================================================
   §2.2 — TPS / throughput / "fastest chain". "Its competitive differentiation
   is not simply transactions per second."
   ========================================================================== */

const PERFORMANCE: readonly ClaimRule[] = [
  {
    id: 'tps',
    pattern: /\bTPS\b/g,
    reason: 'Competitive differentiation is not transactions per second.',
    ref: '§2.2',
  },
  {
    id: 'transactions-per-second',
    phrase: 'transactions per second',
    reason: 'Competitive differentiation is not transactions per second.',
    ref: '§2.2',
  },
  {
    id: 'throughput',
    phrase: 'throughput',
    reason: 'No throughput claims.',
    ref: '§2.2',
  },
  {
    id: 'fastest-chain',
    pattern: /\b(?:fastest|quickest|highest[-\s]performance|most\s+scalable)\s+(?:chain|blockchain|network|ledger)\b/gi,
    reason: 'No superlative performance claims.',
    ref: '§2.2',
  },
];

/* ==========================================================================
   §2.2 — "novel consensus", "our consensus algorithm". SunRey uses "CometBFT
   or equivalent mature engine … rather than inventing a proprietary BFT
   algorithm."
   ========================================================================== */

const CONSENSUS: readonly ClaimRule[] = [
  {
    id: 'novel-consensus',
    pattern: /\b(?:novel|new|proprietary|custom|bespoke|our\s+own)\s+consensus\b/gi,
    reason:
      'SunRey uses a mature consensus engine rather than inventing a proprietary BFT algorithm.',
    ref: '§2.2, §8.2',
  },
  {
    id: 'our-consensus-algorithm',
    pattern: /\b(?:our|SunRey(?:'s|’s)?)\s+consensus\s+(?:algorithm|protocol|engine)\b/gi,
    reason: 'The consensus engine is not SunRey’s invention.',
    ref: '§2.2, §8.2',
  },
];

/* ==========================================================================
   §2.2 and §2.6 — superseded naming. Use the canonical names.
   ========================================================================== */

const NAMING: readonly ClaimRule[] = [
  { id: 'solstice', phrase: 'Solstice', reason: 'Superseded. Use "SunRey".', ref: '§2.2, §2.6' },
  { id: 'sol-coin', phrase: 'Sol Coin', reason: 'Superseded. Use "SunRey Coin".', ref: '§2.2, §2.6' },
  { id: 'pyramid', phrase: 'Pyramid', reason: 'Superseded. Use "SunRey Coin" / "SunRey Exchange".', ref: '§2.2, §2.6, §14' },
  { id: 'compliance-kernel', phrase: 'Compliance Kernel', reason: 'Superseded naming.', ref: '§2.2, §2.6' },
  { id: 'sovereign-financial-fabric', phrase: 'Sovereign Financial Fabric', reason: 'Superseded naming.', ref: '§2.2, §2.6' },
  { id: 'personal-data-vault', phrase: 'Personal Data Vault', reason: 'Superseded. Use "SunRey Vault".', ref: '§2.2, §2.6' },
  { id: 'sovereign-cells', phrase: 'Sovereign Cells', reason: 'Superseded naming.', ref: '§2.2, §2.6' },
  { id: 'personal-economy-agent', phrase: 'Personal Economy Agent', reason: 'Superseded. Use "SunRey Financial Agents".', ref: '§2.6' },
  { id: 'consent-ledger', phrase: 'Consent Ledger', reason: 'Superseded. Use "consent and rights registry".', ref: '§2.6' },
  { id: 'clean-room', pattern: /\bclean[-\s]?rooms?\b/gi, reason: 'Superseded. Use "compute-to-data".', ref: '§2.6' },
];

/* ==========================================================================
   The full rule set.
   ========================================================================== */

export const BANNED: readonly ClaimRule[] = [
  ...LICENSING,
  ...ACTIVATION,
  ...PATENTS,
  ...TICKERS,
  ...FIGURES,
  ...YIELD,
  ...BACKING,
  ...EXTRACTION,
  ...DOSSIER,
  ...REVOCATION,
  ...PERFORMANCE,
  ...CONSENSUS,
  ...NAMING,
];

/* ==========================================================================
   ALLOWED — CLAUDE.md §12.4.

   This spec deliberately uses flagged words in permitted denial constructions.
   The build cannot pass without exempting all seven of them verbatim. A banned
   match inside one of these spans is not a violation.
   ========================================================================== */

export const ALLOWED: readonly AllowedPhrase[] = [
  { phrase: 'SunRey is not a bank', ref: '§2.3' },
  { phrase: 'Live banking & cards', ref: '§7.8 status board' },
  { phrase: 'mainnet is not active', ref: '§2.3, §8.7' },
  { phrase: 'Mainnet not active', ref: '§7.8' },
  { phrase: 'Not "monetize your data."', ref: '§7.5' },
  { phrase: 'Not backed by people.', ref: '§9.2' },
  { phrase: 'No passive yield, guaranteed appreciation', ref: '§9.5' },
  { phrase: 'not collateralized by individuals, by their data', ref: '§9.2' },
];

/* ==========================================================================
   Matching helpers. Exported so the runner and any future test share one
   implementation of "word boundary and phrase, not substring".
   ========================================================================== */

const REGEX_SPECIALS = /[.*+?^${}()|[\]\\]/g;

/**
 * Build a case-insensitive, word-boundary-anchored, whitespace-flexible pattern
 * from a literal phrase.
 *
 * Boundaries are applied only where the phrase actually begins or ends with a
 * word character — `\b` before a `$` or a quote mark would never match.
 */
export function phraseToPattern(phrase: string): RegExp {
  const escaped = phrase
    .replace(REGEX_SPECIALS, '\\$&')
    .replace(/\s+/g, '\\s+');
  const lead = /^\w/.test(phrase) ? '\\b' : '';
  const tail = /\w$/.test(phrase) ? '\\b' : '';
  return new RegExp(`${lead}${escaped}${tail}`, 'gi');
}

/** The pattern a rule matches with. */
export function rulePattern(rule: ClaimRule): RegExp {
  if (rule.pattern) {
    // Clone, so a shared lastIndex can never leak between files.
    const flags = rule.pattern.flags.includes('g')
      ? rule.pattern.flags
      : `${rule.pattern.flags}g`;
    return new RegExp(rule.pattern.source, flags);
  }
  if (rule.phrase) return phraseToPattern(rule.phrase);
  throw new Error(`Rule "${rule.id}" has neither a phrase nor a pattern.`);
}

/**
 * Normalise typographic characters to their ASCII equivalents so a curly quote
 * in the copy cannot slip a banned phrase past a rule.
 *
 * Every replacement here is strictly one character for one character, so string
 * offsets — and therefore reported line and column numbers — are preserved.
 */
export function normalise(text: string): string {
  return text
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[   ]/g, ' ');
}
