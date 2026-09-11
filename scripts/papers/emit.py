"""Emit typed TS content modules for the white-paper reading view."""
import json, re
from pathlib import Path

META = [
 ("01","sunrey-master-economic-operating-system","Overview","September 2026","1.0",
  "SunRey Master White Paper",
  "An Economic Operating System for the Post-AI Economy",
  "production capability. A public architecture and economic design paper; its closing section states the design boundaries and public commitments the project holds itself to."),
 ("02","sunrey-dual-economy","Macroeconomic thesis","September 2026",None,
  "The Dual Economy",
  "Human Value + Autonomous Productive Value",
  "empirical forecast. In its own words — “not an empirical forecast, monetary-policy recommendation, token offering, securities disclosure, or claim of legally enforceable asset backing.”"),
 ("03","sunrey-blockchain-state-machine","Protocol architecture","September 2026","1.0",
  "SunRey Blockchain",
  "The Sovereign Economic State Machine",
  "settled parameters. A public technical architecture paper that closes on open architecture decisions and a protocol maturity path, not a specification frozen for implementation."),
 ("04","sunrey-currency-of-you-hin","Human economic layer","September 2026",None,
  "The Currency of You",
  "SunRey Coin and the Human Information Network",
  "monetary parameters. “Public architecture paper. Conceptual design; regulated capabilities and production monetary parameters remain subject to legal, security, governance, and jurisdiction-specific approval.”"),
 ("05","moonrey-autonomous-productive-economy","Autonomous productive layer","September 2026",None,
  "MoonRey",
  "The Autonomous Productive Economy",
  "asset backing. “Not a token offering, securities disclosure, investment recommendation, reserve statement or claim of legal asset backing.”"),
 ("06","sunrey-access-productive-capacity","Economic access","September 2026",None,
  "SunRey Access",
  "Governed Access to Productive Capacity",
  "commercial terms. The paper states it “intentionally omits production allocation coefficients, internal funding assumptions and provider-specific commercial implementation details.”"),
 ("07","grow-my-money-ai-financial-agents","AI financial systems","September 2026",None,
  "Grow My Money",
  "An Architecture for Deterministically Authorized AI Financial Agents",
  "authorization. “Regulated capabilities require jurisdiction-specific licensing, service-provider coverage, legal review, model validation, security approval, and production activation. No investment return is guaranteed.”"),
 ("08","proof-of-permission","Compliance architecture","September 2026",None,
  "Proof of Permission",
  "A Compliance-Native Architecture for AI-Driven Financial Systems",
  "legal permission. “This paper describes a technical control model; it does not itself establish legal permission, licensing, regulatory approval, or production authorization in any jurisdiction.”"),
 ("09","economic-awareness-sovereign-monetary","Monetary architecture","September 2026",None,
  "Economic Awareness & Sovereign Monetary Architecture",
  "A TIA / Genisys-Inspired Architecture for the Human Economy, the Productive Economy and Proof-Bound Monetary State",
  "novelty or approval. “Conceptual design; regulated capabilities, production monetary parameters and claims of technical novelty remain subject to legal, security, governance and jurisdiction-specific review.”"),
 ("10","sunrey-post-quantum-security","Security architecture","September 2026","1.0",
  "SunRey Post-Quantum Security Architecture",
  "A Crypto-Agile, Zero-Trust Security Architecture for Financial Infrastructure, Blockchain and the AI Economy",
  "certification. The paper sets an explicit claim discipline and publication boundary, and makes no assertion of completed external audit or attestation."),
]

ABSTRACT = {
 "01":"The unifying document. Sets out four domains of personal economic capability and the three flagship consumer experiences, then traces the whole architecture — SunRey Coin, the Human Information Network, the Vault, MoonRey, Access, Grow My Money, the blockchain and the Exchange — as one integrated economic loop rather than a portfolio of products.",
 "02":"The economic argument beneath everything else. Examines what happens when production and labor separate, why the human and autonomous layers must stay distinct rather than collapsing into one asset, and how demand and supply loop between them — through scarcity, participation, systemic risk and a stated research agenda of falsifiable questions.",
 "03":"The protocol, in full: identity and actor primitives, rights and consent as native objects, the rich transaction envelope, consensus and finality, the four market families of the Exchange, permission-aware matching, compute-to-data settlement, and evidence treated as an economic primitive rather than a log.",
 "04":"How a person’s information becomes economic participation without becoming property. Traces the path from permission through verified contribution to authorized economic use and compensation, covering compute-to-data, contribution valuation, privacy, and the boundary between human economic value and monetary authority.",
 "05":"Productive capacity as an economic object. Builds the Global Productive Capacity Graph, the productive-value pipeline, the oracle mesh and its source-independence rules, then machine economic identity, machine-to-machine commerce and capacity-market instruments — asking what output systems can reliably provide, not what assets exist.",
 "06":"The bridge between participation and real-world capability. Argues the shift from ownership to governed economic access in an automated economy, and specifies an entitlement bounded four ways at once — by rights, by verified capacity, by policy and by solvency — with token state, entitlement state and fiat settlement kept separate.",
 "07":"Why AI financial advice is the wrong frame, and what replaces it. Moves from recommendation to bounded agency through permission-aware context, explainable opportunity discovery, deterministic risk limits, policy-gated execution and auditable evidence — making the question one of authority rather than intelligence.",
 "08":"The control doctrine as engineering. Separates intelligence, recommendation and execution authority, then specifies deterministic authorization, machine-readable legal capability, bounded execution authority, canonical ledger truth and reconstructable evidence — so AI can reason and propose without becoming the legal or monetary principal.",
 "09":"Separating the ability to understand economic reality from the authority to change monetary state. Specifies the Economic Awareness Fabric, source lineage and corroboration, Information Consensus, canonical claims with anti-double-counting, valuation layers that hold no issuance power, and the evidence-to-money firewall.",
 "10":"A crypto-agile, zero-trust security architecture built on a single premise: that no key, model, service, node, provider, database, employee or connection becomes unrestricted economic authority. Cryptography protects communication and state; deterministic authorization protects economic authority; evidence proves what occurred.",
}

def ts(v):
    if v is None: return 'undefined'
    return json.dumps(v, ensure_ascii=False)

FIGS = json.loads(Path('web-figures/manifest.json').read_text())


def attach_figures(key, blocks):
    """Pair each figure caption with the artwork extracted from the same PDF."""
    bynum = {f['num']: f for f in FIGS.get(key, [])}
    used = set()
    for b in blocks:
        if b['type'] != 'figure':
            continue
        m = re.match(r'\w+\s+(\d+)', b['caption'])
        f = bynum.get(int(m.group(1))) if m else None
        if not f:
            raise SystemExit(f"{key}: no artwork for {b['caption'][:40]!r}")
        used.add(f['num'])
        b['src'] = f"/papers/figures/{f['file']}"
        b['w'], b['h'] = f['w'], f['h']
    missing = set(bynum) - used
    if missing:
        raise SystemExit(f"{key}: extracted figures with no caption block: {sorted(missing)}")
    return blocks


dst = Path('ts'); dst.mkdir(exist_ok=True)
index = []
for n, slug, cat, date, ver, title, subtitle, notest in META:
    key = f'{n}-{slug}'
    blocks = attach_figures(key, json.loads(Path(f'json/{key}.json').read_text()))
    words = sum(len(b.get('text','').split()) for b in blocks) + \
            sum(len(' '.join(b['items']).split()) for b in blocks if b['type']=='list')
    mins = max(1, round(words / 220))
    body = ",\n  ".join(json.dumps(b, ensure_ascii=False) for b in blocks)
    (dst / f'{slug}.ts').write_text(
f"""// Generated from the supplied PDF. Do not hand-edit block by block; if the
// source paper changes, re-run the converter so the whole file stays in sync.
import type {{ PaperBlock }} from './types';

export const blocks: PaperBlock[] = [
  {body}
];
""", encoding='utf-8')
    index.append(dict(n=n, slug=slug, category=cat, date=date, version=ver, title=title,
                      subtitle=subtitle, abstract=ABSTRACT[n], notEstablished=notest,
                      words=words, minutes=mins,
                      sections=sum(1 for b in blocks if b['type']=='section'),
                      figures=sum(1 for b in blocks if b['type']=='figure')))

(dst / 'types.ts').write_text('''export type PaperBlock =
  | { type: 'section'; n: string; label: string; title: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; label: string; text: string }
  | { type: 'figure'; caption: string; src: string; w: number; h: number };

export type PaperMeta = {
  n: string;            // "01" — reading order, shown on the card
  slug: string;         // route segment under /white-papers/
  category: string;     // eyebrow on the card and the article header
  date: string;
  version?: string;
  title: string;
  subtitle: string;
  abstract: string;     // card copy
  notEstablished: string;  // quoted from the paper's own cover
  words: number;
  minutes: number;      // reading time, computed at generation
  sections: number;
  figures: number;      // diagrams carried over from the source PDF
};
''', encoding='utf-8')

(dst / 'index.ts').write_text(
"// Generated registry. Reading order is deliberate — see CLAUDE.md §11.4.\n"
"import type { PaperMeta } from './types';\n\n"
"export const papers: PaperMeta[] = " +
json.dumps(index, ensure_ascii=False, indent=2).replace('"n":','n:').replace('"slug":','slug:')
 .replace('"category":','category:').replace('"date":','date:').replace('"version":','version:')
 .replace('"title":','title:').replace('"subtitle":','subtitle:').replace('"abstract":','abstract:')
 .replace('"notEstablished":','notEstablished:').replace('"words":','words:')
 .replace('"minutes":','minutes:').replace('"sections":','sections:')
 .replace('"figures":','figures:')
+ ";\n\nexport type { PaperMeta, PaperBlock } from './types';\n", encoding='utf-8')

for p in index:
    print(f"  {p['n']}  {p['slug']:<42} {p['sections']:>2} sec  {p['figures']:>2} fig  {p['words']:>5} wd  ~{p['minutes']} min")
print(f"\n  total {sum(p['words'] for p in index):,} words across {len(index)} papers")
