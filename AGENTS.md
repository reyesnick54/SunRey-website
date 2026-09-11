# SunRey — Website Build Instructions

**Repository:** `sunrey-web`
**Deploys to:** `sunrey.xyz` / `www.sunrey.xyz`
**Owner:** Nick — SunRey Technologies
**Spec version:** 1.0 · September 2026
**Status:** Authoritative build instruction. Read this file completely before writing code.

---

## 0. HOW TO USE THIS FILE

You are building the **public-facing SunRey website** — a gated, multi-page marketing and
documentation site. This is **not** the SunRey product, the consumer app (`app.sunrey.xyz`),
the API (`api.sunrey.xyz`), or the chain explorer (`blockchain.sunrey.xyz`). Those are separate
systems. Do not attempt to integrate with them. This site is static content with a client-side
access gate.

Work in the phase order given in **§13**. Do not skip ahead. After each phase, run
`npm run build` and `npm run lint` and fix all errors before continuing.

**Three rules that override everything else in this document:**

1. **§2 Claims Discipline is non-negotiable.** Every word of copy on this site must pass it.
   If you generate any sentence not present in §7–§11, check it against §2 before shipping it.
2. **Do not invent facts.** No statistics, no partner logos, no user counts, no funding figures,
   no valuations, no ticker symbols, no dates, no testimonials, no team bios. If a section
   feels empty without a number, leave it without a number.
3. **All copy in this file is production copy.** Use it verbatim. Do not paraphrase, do not
   "improve" it, do not add filler paragraphs. Where you need a word this file does not
   supply, prefer silence.

---

## 1. WHAT WE ARE BUILDING

A password-gated, eight-page website that explains SunRey to investors, partners, advisors,
and prospective team members. It replaces the current single-page "Finance, evolved."
holding page while keeping that page's visual identity and its hero.

### 1.1 The eight routes

| Nav label | Route | Purpose |
|---|---|---|
| — (logo) | `/` | **Home.** The financial operating system for a post-AI, post-robotic economy. |
| Blockchain | `/blockchain` | SunRey Chain — the sovereign economic base layer. |
| SunRey Coin | `/sunrey-coin` | The human economic layer. "The Currency of You." |
| MoonRey Coin | `/moonrey-coin` | The autonomous productive layer. |
| A.I. Agents | `/ai-agents` | SunRey Financial Agents, Grow My Money, the authority model. |
| Access | `/access` | SunRey Access — governed, non-cash rights to real productive capacity. |
| Vault | `/vault` | SunRey Vault and the Human Information Network. |
| White Papers | `/white-papers` | Document library, gated downloads. |

Nav order is exactly as listed. The nav is **horizontally centered** in the header, with the
logo left-aligned and a status pill right-aligned. See §6.

### 1.2 Explicitly out of scope for v1

No blog, no careers page, no contact form that stores data, no newsletter signup, no CMS,
no analytics beyond a privacy-preserving page-view counter (and only if trivially added),
no live chain data, no wallet connection, no token purchase flow, no team page, no press page.

---

## 2. CLAIMS DISCIPLINE — READ THIS TWICE

SunRey's own source documents carry explicit prohibitions on how the project may be
described. These are not stylistic preferences. They exist because SunRey touches banking,
securities, digital assets, and health data regulation simultaneously, and because the
platform is **pre-production**. Violating them creates legal exposure.

### 2.1 Current factual state — the ground truth

- SunRey runs on an **internal sandbox** (Hetzner), with durable PostgreSQL-backed accounts,
  ledger, internal transfers, native wallets, and Vault binding active.
- The blockchain is **preproduction / testnet-grade with native assets. It is not mainnet.**
- `ENVIRONMENT=simulation`. `PRODUCTION_ACTIVE=false`. `MAINNET_ACTIVE=false`.
  `LIVE_CONNECTIVITY_ENABLED=false`.
- **No licenses are held.** Every licensing reference in every SunRey document is prospective.
- **No patents are granted.** The portfolio is a provisional-filing strategy.
- No real money, no real digital assets, and no real personal data exist in the system.

### 2.2 Banned words and claims — never appear anywhere on this site

| Never write | Why |
|---|---|
| "licensed", "regulated", "chartered", "bank", "broker", "adviser", "custodian" (of SunRey) | No licenses exist. SunRey is not a bank. |
| "live", "launched", "in production", "mainnet", "operational network" | Mainnet is not active. |
| "patented", "patent-protected", "our patents", "13 patents" | Nothing is granted. Use "provisional patent portfolio" or "patent applications". |
| Any ticker symbol | "The SunRey Coin ticker is intentionally TBD and should not be inferred from prior names." |
| Any valuation figure or range | Source docs mark all ranges "illustrative strategic scenarios, not a fairness opinion". |
| "guaranteed", "passive yield", "returns", "APY", any % | "Avoid promising passive yield, guaranteed appreciation or company-profit participation." |
| "backed by people", "backed by your data", "own your data" | "Do not market SunRey Coin as 'backed by people' or as ownership of individuals' data." |
| "monetize your data", "sell your data" | Brand promise is the inverse. See §2.4. |
| "complete digital footprint", "digital twin of you", "profile", "dossier" | "Centralized dossier mentality" is an explicitly rejected design. |
| "delete everything", "erase your data", unconditional revocation | "Revocation stops future use where required but does not rewrite finalized history." |
| TPS / throughput / "fastest chain" claims | "Its competitive differentiation is not simply transactions per second." |
| "novel consensus", "our consensus algorithm" | SunRey uses "CometBFT or equivalent mature engine … rather than inventing a proprietary BFT algorithm." |
| Solstice, Sol Coin, Pyramid Coin, PYR, Solstice Alpha, Compliance Kernel, Sovereign Financial Fabric, Personal Data Vault, Sovereign Cells | Superseded naming. See §2.6. |

### 2.3 Required disclosure — appears in the footer of every page

Render this verbatim, always visible, never behind a toggle:

> **SunRey is a pre-production system.** All balances, assets, and transactions shown in any
> SunRey environment are simulated and carry no monetary value. SunRey Chain operates as a
> testnet; mainnet is not active. SunRey is not a bank and holds no banking, brokerage,
> investment-advisory, custody, or money-transmission licenses. Nothing on this site is an
> offer to sell or a solicitation to buy any security or digital asset, and nothing here is
> legal, tax, investment, or financial advice. Forward-looking statements describe intended
> architecture and are not commitments.

### 2.4 The tone-of-voice instruction, verbatim from the strategy report

> "The strongest consumer promise is not 'monetize your data.' It is **'put your money and
> your information to work for you.'** Data monetization can feel extractive; personal
> financial intelligence feels directly beneficial."

Write to that. Outcomes for the person, not extraction from the person.

### 2.5 Tense discipline

The architecture is designed; most of it is not shipped. Use:

- **Present tense** only for: the sandbox platform, the testnet chain with two native assets,
  the durable ledger/wallet/Vault slice, the patent strategy, the architecture itself.
- **"is designed to" / "can" / "is built so that"** for everything else.
- Never "does" where the honest verb is "will".

### 2.6 Canonical naming — use these exactly

| Use | Not |
|---|---|
| **SunRey** | Solstice |
| **SunRey Coin** | Sol Coin, Pyramid Coin, PYR |
| **MoonRey Coin** | — |
| **SunRey Chain** | SunRey Blockchain (acceptable in body prose, but "SunRey Chain" is the product name) |
| **SunRey Exchange** | Pyramid Exchange |
| **SunRey Vault** | Personal Data Vault |
| **SunRey Access** | — |
| **SunRey Financial Agents** | Personal Economy Agent |
| **Grow My Money** | — |
| **Human Information Network (HIN)** | — |
| **compute-to-data** | clean room |
| **consent and rights registry** | Consent Ledger |
| **Purpose Firewall** | — (this one is current, safe to use) |

Capitalize product names. "SunRey" always has a capital R.

### 2.7 One deliberate brand decision recorded here

**"The Currency of You"** originated as a tagline for **Pyramid Coin**, the retired asset name.
This spec deliberately re-points it to **SunRey Coin**. It is approved for use on `/` and
`/sunrey-coin` **only**, and only in the treatments given in §7 and §9 — where it is
immediately qualified so it cannot be read as a claim that the coin is collateralized by
people or by personal data. Do not use it anywhere else, and do not pair it with words like
"backed", "worth", "value of", or "own".

---

## 3. TECHNOLOGY

```
Next.js 15 · App Router · TypeScript (strict) · Tailwind CSS v4
Framer Motion (motion/react) for entrance + parallax
next/font for self-hosted fonts (no runtime Google Fonts request)
MDX for white-paper abstracts (@next/mdx)
Deployment: Vercel
Package manager: npm
```

**Constraints:**

- No UI kit. No shadcn, no MUI, no Chakra. Hand-build every component. The design is the
  product here; a generic component library will make it look generic.
- No state library. React state and URL are sufficient.
- No CSS-in-JS runtime. Tailwind utilities + a small `globals.css` token layer.
- Static export where possible: every page is `export const dynamic = 'force-static'`.
- Images: `next/image`, AVIF/WebP, explicit width/height, `priority` on hero only.
- No client-side JS beyond the gate provider and the motion leaves. Prefer Server Components;
  add `'use client'` only at those leaves. (The gate provider lives in `layout.tsx`, so every
  route carries it — that is expected; the constraint is that nothing *else* is a client
  component.)

### 3.1 Repository structure

```
sunrey-web/
├── AGENTS.md                       ← this file
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── public/
│   ├── fonts/                      ← self-hosted woff2
│   ├── papers/                     ← gated PDFs (see §11.4)
│   └── favicon/
├── content/
│   ├── home.ts                     ← one file per page; see §12.4
│   ├── blockchain.ts
│   ├── sunrey-coin.ts
│   ├── moonrey-coin.ts
│   ├── ai-agents.ts
│   ├── access.ts
│   ├── vault.ts
│   ├── white-papers.ts
│   ├── legal.ts
│   ├── not-found.ts
│   ├── papers/                     ← one .mdx per white paper (abstract only)
│   └── glossary.ts                 ← single source of truth for defined terms
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← fonts, gate provider, header, footer
│   │   ├── page.tsx                ← Home
│   │   ├── blockchain/page.tsx
│   │   ├── sunrey-coin/page.tsx
│   │   ├── moonrey-coin/page.tsx
│   │   ├── ai-agents/page.tsx
│   │   ├── access/page.tsx
│   │   ├── vault/page.tsx
│   │   ├── white-papers/page.tsx
│   │   ├── legal/page.tsx          ← full disclosures (linked from footer)
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── gate/                   ← AccessGate, GateProvider
│   │   ├── layout/                 ← Header, Nav, Footer, Wordmark, Disclosure
│   │   ├── primitives/             ← Section, Eyebrow, Display, Lede, Rule, Pill, Card
│   │   ├── blocks/                 ← Hero, DualEconomy, BentoGrid, Manifesto,
│   │   │                             LayerStack, ComparisonTable, PaperCard,
│   │   │                             PrincipleList, StatusBoard, CTABand
│   │   └── motion/                 ← Reveal, Parallax, GlowField
│   └── lib/
│       ├── gate.ts                 ← hashing + session helpers
│       ├── nav.ts                  ← nav config, single source of truth
│       └── papers.ts               ← paper registry
```

---

## 4. THE ACCESS GATE

### 4.1 What was chosen, and its honest limitation

**Chosen approach: client-side gate, one shared passphrase.**

You must understand and preserve this property: **a client-side gate is an obstacle, not
security.** The page HTML ships to every visitor's browser. Anyone who opens developer tools,
disables JavaScript, or reads the network response can see all site content without the
passphrase. Search-engine crawlers can also see it unless blocked.

Therefore:

1. **Nothing genuinely confidential goes on this site.** No valuation figures, no cap table,
   no financial projections, no patent claim text, no partner names, no unreleased dates,
   no security architecture detail beyond what §7–§11 specify. The gate deters casual
   sharing of a URL; it does not protect secrets.
2. `robots.ts` must return `disallow: '/'` for all agents, and the root `metadata` export must
   set `robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true }`.
   Next generates the meta tag from that object — **do not also hand-write a `<meta
   name="robots">` tag**, or the page emits two conflicting directives. Do not generate a
   sitemap.
3. Include the upgrade path in §4.4 as commented, ready-to-enable code.

Implement the gate exactly as specified below and add the `SECURITY.md` note in §4.5.

### 4.2 Behavior

- On first load of any route, if the visitor is not unlocked, render the **gate screen only**.
  The site content must not be visible behind it, must not flash before it, and must not be
  reachable by scrolling past it.
- The gate is a full-viewport screen matching the site's visual identity (§5): black ground,
  gold radial glow, centered SunRey wordmark, one passphrase field, one button.
- On submit: hash the input and compare to a stored hash. On match, write an unlock flag and
  render the site. On mismatch, shake the field and show `That passphrase is not recognized.`
- The unlock persists in `sessionStorage` (cleared when the browser tab closes) **and**
  `localStorage` under key `sunrey.access` with a 30-day expiry timestamp, so a returning
  visitor on the same device is not re-prompted daily. Wrap every storage read and write in
  `try/catch` — private browsing and blocked-storage contexts throw.
- Prevent the flash-of-content problem: render the gate as the default state and only reveal
  content after a `useEffect` storage check resolves. Show nothing (black screen) for that
  first tick, not the site.

### 4.3 Implementation

Store a **SHA-256 hash** of the passphrase, never the plaintext. This does not make the gate
secure — a determined visitor bypasses the check entirely — but it stops the passphrase
appearing in plain text in the JS bundle, which matters because the same passphrase may be
reused elsewhere.

`.env.example`:

```
# SHA-256 hex digest of the site passphrase.
# Generate with:  echo -n "your passphrase" | shasum -a 256
NEXT_PUBLIC_GATE_HASH=
```

`src/lib/gate.ts`:

```ts
const STORAGE_KEY = 'sunrey.access';
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function hashPassphrase(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input.trim());
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verify(input: string): Promise<boolean> {
  const expected = process.env.NEXT_PUBLIC_GATE_HASH;
  if (!expected) return false;
  return (await hashPassphrase(input)) === expected.toLowerCase();
}

export function isUnlocked(): boolean {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return true;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const { exp } = JSON.parse(raw) as { exp: number };
    if (Date.now() > exp) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function persistUnlock(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ exp: Date.now() + TTL_MS }));
  } catch {
    /* storage blocked — session-only unlock, gate re-prompts on reload */
  }
}
```

`crypto.subtle` requires a secure context. It works on `https://` and on `http://localhost`.
It does **not** work on a plain-http LAN address, so if the site is previewed over a local
network IP, the gate will fail closed. Note that in `SECURITY.md`.

### 4.4 Upgrade path — include as commented code

Add `src/middleware.ts.example` with a working Edge-middleware gate (signed cookie, password
in a server-only `GATE_PASSWORD` env var, content never sent to an unauthenticated browser),
plus a comment block explaining that renaming it to `middleware.ts` and moving the env var
from `NEXT_PUBLIC_GATE_HASH` to `GATE_PASSWORD` converts this to real protection in roughly
fifteen minutes. Do not enable it.

### 4.5 `SECURITY.md`

Write a short file stating plainly: the gate is client-side, all page content is present in
the delivered HTML and is retrievable without the passphrase, the site is `noindex`, nothing
confidential should be published here, and §4.4 describes the upgrade to server-side
protection. Four sentences. No hedging.

---

## 5. DESIGN SYSTEM

The visual direction already exists on the current holding page: black ground, warm gold
light, thin geometric type, faint diagonal light rays, a single high radial glow like a low
sun. **Preserve it exactly.** This build extends that identity across eight pages; it does not
reinvent it.

Structurally, model the page rhythm on a modern protocol site: a tall cinematic hero, then
alternating full-bleed sections — a bento feature grid, a split comparison, a layered stack
diagram, a quiet manifesto band, a card row — separated by generous vertical space, closing
with an oversized wordmark above the footer.

### 5.1 Color tokens

Define in `globals.css` on `:root`. The site is **dark-only by design** — a deliberate,
committed single look. Set `color-scheme: dark` and paint `body` explicitly. Do not build a
theme toggle.

```css
:root {
  color-scheme: dark;

  /* Ground */
  --bg:            #060505;   /* page base */
  --bg-raised:     #0C0A08;   /* cards */
  --bg-sunken:     #030303;   /* footer, gate */

  /* SunRey — human economy. Warm gold. Each has exactly one job. */
  --sun-100:       #FBEFCF;   /* two-tone display: line one, when warmed off pure --text */
  --sun-300:       #F0D68B;   /* gold prose at body/lede size */
  --sun-500:       #E3B23C;   /* primary accent: micro labels, display, rules, icons, glow */
  --sun-700:       #A87C1E;   /* secondary state (TESTNET pill), dim icon strokes */
  --sun-900:       #4A360D;   /* oversized numerals, footer wordmark gradient */

  /* MoonRey — autonomous economy. Cool silver. Mirrors the gold ramp role for role. */
  --moon-100:      #EEF2F6;   /* MoonRey two-tone display line one */
  --moon-300:      #C3CEDA;   /* silver prose at body/lede size */
  --moon-500:      #8FA3B8;   /* MoonRey primary accent */
  --moon-700:      #4A5A6B;   /* borders and fills ONLY — fails contrast as text */
  --moon-900:      #1A222A;   /* MoonRey footer wordmark gradient, diagram fills */

  /* Type — contrast against --bg is stated; do not "adjust" these */
  --text:          #F6F3ED;   /* 18.9:1  */
  --text-muted:    #A39C90;   /*  7.48:1 — passes body */
  --text-faint:    #7E776D;   /*  4.60:1 — passes body. NOT #6B655C, which fails at 3.53:1 */

  /* Lines and surfaces */
  --line:          rgba(246, 243, 237, 0.09);
  --line-gold:     rgba(227, 178, 60, 0.28);
  --line-moon:     rgba(143, 163, 184, 0.28);
  --line-accent:   var(--line-gold);   /* remapped to --line-moon on MoonRey pages */
  --hairline:      rgba(246, 243, 237, 0.03);
  --hairline-moon: rgba(199, 208, 218, 0.04);
  --bg-header:     rgba(6, 5, 5, 0.72);

  /* Effects */
  --glow-sun:      radial-gradient(60% 50% at 50% 0%, rgba(227,178,60,0.20) 0%, rgba(227,178,60,0.05) 45%, transparent 75%);
  --glow-moon:     radial-gradient(60% 50% at 50% 0%, rgba(143,163,184,0.16) 0%, transparent 72%);
}
```

**Color rules:**

- Gold is the accent, never the background. On any screen, gold-tinted pixels should be a
  small minority. The luxury of this identity comes from restraint.
- `--sun-500` is permitted for `micro` labels (eyebrows, rails, pills), display type, rules,
  icons and glows. For `body`- and `lede`-size gold prose, use `--sun-300` or lighter.
  Verified: `--sun-500` on `--bg` is 10.37:1 — it passes at every size; the rule is about
  restraint, not contrast.
- **MoonRey pages and MoonRey components use the silver ramp** in the same structural
  positions gold occupies elsewhere. This is the one place the palette shifts, and it is the
  visual expression of the dual-economy thesis. Do not mix gold and silver as decoration
  within a single block — a block is either a SunRey block or a MoonRey block. **The single
  sanctioned exception is the economic-loop diagram in §10.4**, where gold and silver appear
  together because the diagram's subject *is* the handoff between the two economies. Gold is
  load-bearing there, not decorative.
- Never use pure `#FFFFFF` or pure `#000000`.

### 5.2 Typography

```
Display / headings: Jost — weights 200, 300, 400. Self-hosted via next/font/local.
Body / UI:          Inter — weights 400, 500. Self-hosted.
Mono (labels, code): JetBrains Mono 400 — used only for micro-labels and data.
```

Jost is the correct match for the existing "Finance, evolved." lockup — geometric, high
x-height, elegant at light weights. Give every face a real fallback stack.

**Scale** (clamp-based, fluid):

| Token | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 9vw, 8rem)` | 200 | `-0.03em` | Hero H1 only |
| `display-l` | `clamp(2.5rem, 5.5vw, 4.5rem)` | 200 | `-0.025em` | Page H1 |
| `display-m` | `clamp(1.875rem, 3.2vw, 2.75rem)` | 300 | `-0.02em` | Section H2 |
| `title` | `1.25rem` | 400 | `-0.01em` | Card headings |
| `lede` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | 400 | `0` | Intro paragraphs, `--text-muted` |
| `body` | `1rem` / 1.7 | 400 | `0` | Body copy |
| `micro` | `0.75rem` | 500 | `0.18em` | UPPERCASE eyebrows and labels |

**Two signature type treatments, both already present on the holding page — keep both:**

1. **Two-tone display.** First line `--text`, second line `--sun-500`. As in
   "Finance, / **evolved.**" Use for the hero and one H2 per page maximum.
2. **Spaced rail.** A row of uppercase `micro` words separated by `·`, letter-spaced wide,
   in `--text-faint`. As in "MONEY · MARKETS · INTELLIGENCE · DIGITAL OWNERSHIP".

Body measure: max `68ch`. Lede measure: max `56ch`. Never full-width paragraphs.

### 5.3 Layout

- Container: `max-width: 1240px`, side padding `clamp(20px, 5vw, 64px)`. Set side padding once
  on the container; give sections vertical space with `padding-block`, never a `padding`
  shorthand that zeroes the sides.
- Section rhythm: `padding-block: clamp(96px, 14vh, 176px)`. Hero is taller.
- Grid: 12 columns, `gap: 24px`. Collapse to 1 column below `768px`.
- Every section is separated by either whitespace alone or a `1px` `--line` hairline. No
  heavy dividers, no boxes around sections.

### 5.4 Surfaces

Cards: `--bg-raised`, `1px solid --line`, `border-radius: 16px`, no drop shadow. On hover,
the border becomes `--line-accent` and a faint inner glow appears — 220ms ease. That is the
entire hover vocabulary. No lifts, no scales, no shadows.

### 5.5 The light field

The signature environmental effect. Build `<GlowField />` as a fixed, `pointer-events: none`,
`z-index: 0` layer:

- A radial gold glow anchored top-center (`--glow-sun`), roughly 70vh tall.
- Faint diagonal hairlines at about 18° from vertical, `--hairline`, spaced
  ~120px, rendered as a repeating linear gradient — this is the texture visible on the
  current holding page.
- On MoonRey pages, swap the glow to `--glow-moon` and the hairlines to `--hairline-moon`.
- The glow translates at 0.25× scroll speed (parallax). Disable the parallax entirely under
  `prefers-reduced-motion`.

### 5.6 Motion

Restrained and expensive-feeling. Standard easing `cubic-bezier(0.22, 1, 0.36, 1)`.

- `<Reveal>`: opacity 0→1, `translateY(24px)→0`, 700ms, triggered at 15% viewport
  intersection, `once: true`. Stagger children by 70ms.
- Hero: display type animates in on load, per-line, 900ms, 120ms stagger.
- Nav underline: 180ms width transition from left.
- **Everything above must be wrapped in a `prefers-reduced-motion` check.** When reduced
  motion is set, render the final state immediately with no transition.
- No auto-playing video, no looping background animation, no marquees, no parallax on text.

### 5.7 Iconography and imagery

- **No stock photography. No AI-generated imagery. No 3D renders of glowing orbs or cubes.**
  The reference sites use those; SunRey's identity is light and type, and it is stronger
  for it.
- Diagrams are **inline SVG**, hand-authored, using the palette tokens. Stroke `1.25px`,
  round caps, `--line` for structure and `--sun-500`/`--moon-500` for the one element being
  emphasized. Label everything in `micro` type. Every diagram needs a `<title>` and
  `role="img"` with an `aria-label` that states what it shows.
- Where a section needs visual weight without a diagram, use a large numeral, an oversized
  glyph in `--sun-900`, or generous emptiness. Emptiness is the house style.
- Icons: a small hand-drawn set of 1.25px-stroke line icons. No icon font, no icon library.

### 5.8 Responsive

Must work at 360px width. Single-column below 768px. Nav collapses to a full-screen overlay
menu (see §6.2). Diagrams and tables get their own `overflow-x: auto` container; the page
body must never scroll horizontally. Display type drops to the low end of its clamp. Reduce
section padding to `clamp(64px, 10vh, 96px)` below 768px.

---

## 6. GLOBAL LAYOUT

### 6.1 Header

Fixed to top. Transparent at scroll position 0; at >24px scroll, background becomes
`--bg-header` with `backdrop-filter: blur(16px)` and a `--line` bottom border. Transition
240ms.

Three zones:

- **Left:** the SunRey wordmark, linking to `/`. Reproduce the existing lockup —
  `S U N` + the gold-dotted `R` glyph + `E Y`, letter-spaced. Export as an optimized inline
  SVG; do not set it in a font.
- **Center:** the seven nav links (§1.1), `micro` type, uppercase, `--text-muted`, becoming
  `--text` on hover with a `--sun-500` underline that grows from the left. The active route's
  link is `--text` with a persistent underline.
- **Right:** a status pill — a small `--sun-500` dot with a soft pulse, then the label
  `PRE-PRODUCTION`. Border `--line-gold`, radius full, `micro` type. This replaces the
  current "LAUNCHING SOON" pill. It is not a link.

Header height 76px desktop, 64px mobile.

### 6.2 Mobile navigation

Below 1024px the centered links collapse to a hamburger on the right. Tapping it opens a
full-screen overlay: `--bg-sunken` with the glow field, links stacked at `display-m` size,
staggered in at 60ms intervals, close button top-right. Trap focus inside the overlay while
open, close on `Escape`, and restore focus to the trigger on close. Lock body scroll while
open.

### 6.3 Footer

Three tiers, on `--bg-sunken`:

**Tier 1 — the wordmark band.** The word `SUNREY` rendered at `clamp(4rem, 18vw, 14rem)`,
weight 200, in a vertical gradient from `--sun-900` to transparent, cropped so the bottom
third is cut off by the section edge. Purely typographic. This is the closing visual note of
every page.

**Tier 2 — links.** Four columns:

| Ecosystem | Assets | Documents | Company |
|---|---|---|---|
| Blockchain | SunRey Coin | White Papers | Legal & Disclosures |
| A.I. Agents | MoonRey Coin | | |
| Vault | | | |
| Access | | | |

**Tier 3 — the disclosure.** The full §2.3 text at `0.75rem` / 1.65 line-height in
`--text-faint`, max-width `72ch`. Below it: `© 2026 SunRey Technologies.` and
`Confidential — for authorized recipients.`

---

## 7. PAGE: HOME (`/`)

**Route:** `/` · **Title:** `SunRey — The Financial Operating System for a Post-AI Economy`
**Meta description:** `SunRey is an AI-native financial institution and human-information
network — two native economies settling on one sovereign chain.`

### 7.1 Hero

Full viewport height, minimum 760px. Glow field at full strength. Content bottom-aligned to
the lower 45% of the viewport, left-aligned within the container — matching the current
holding page composition.

```
EYEBROW (micro, --sun-500):
A NEW FINANCIAL ERA

H1 (display-xl, two-tone, two lines):
Finance,
evolved.                          ← second line in --sun-500

LEDE (max 56ch, --text-muted):
The financial operating system for a post-AI, post-robotic economy.
Intelligent agents that work for you, information that creates value on
your terms, and two native economies settling on one sovereign chain.

RAIL (micro, --text-faint, · separated):
MONEY · MARKETS · INTELLIGENCE · DIGITAL OWNERSHIP
```

No hero CTA button. The nav is the call to action. (This matches the restraint of the current
page and avoids a button that would have nowhere meaningful to go.)

### 7.2 Section — The premise

```
EYEBROW: THE PREMISE

H2 (display-m, two-tone):
When machines do the work,
what is a person worth?               ← second line in --sun-500

BODY (two columns on desktop, 68ch each):

For two centuries, human economic value has been measured by labor. That
measure is ending. AI systems and autonomous machines are absorbing an
increasing share of productive work, and the question underneath every
economy — how does a person participate in the value they help create? —
no longer has an obvious answer.

SunRey is built on a different one. Human value moves from labor to
information, judgment, permission and participation. Machine value moves to
verified productive capacity — energy, compute, transport, housing, output.
These are two distinct economies with two distinct measures, and they need
to settle against each other on shared infrastructure.

That infrastructure is what SunRey builds.
```

### 7.3 Section — The dual economy

The central conceptual block of the site. Two panels side by side, split by a vertical
hairline that dissolves at both ends. Left panel gold, right panel silver. On mobile they
stack, gold first.

```
EYEBROW: ONE CHAIN · TWO ECONOMIES

H2: Two economies. One sovereign ledger.

LEDE:
SunRey Coin represents the human economy. MoonRey Coin represents the
autonomous productive economy. Both are native assets of SunRey Chain —
not tokens issued on someone else's base layer.
```

**Left panel — SunRey Coin (gold):**

```
LABEL: SUNREY COIN
TITLE: The human economic layer
LINE:  People, communities and permissioned human information.

ROWS (label / value pairs, hairline separated):
Economic subject   People, communities, human information
Primary inputs     Identity, permissions, knowledge, preferences, participation
Primary outputs    Human intelligence, demand, contribution, authorized information value

LINK: Explore SunRey Coin →   /sunrey-coin
```

**Right panel — MoonRey Coin (silver):**

```
LABEL: MOONREY COIN
TITLE: The autonomous productive layer
LINE:  AI, robots, infrastructure and productive assets.

ROWS:
Economic subject   AI, robots, infrastructure, productive assets
Primary inputs     Energy, compute, resources, land, machines, industrial capacity
Primary outputs    Goods, services, energy, transport, housing, compute, automated output

LINK: Explore MoonRey Coin →   /moonrey-coin
```

**Below both panels**, centered, `--text-faint`, `micro`:

```
FUTURE DIGITAL ECONOMY  =  HUMAN ECONOMIC VALUE  +  AUTONOMOUS PRODUCTIVE VALUE
```

### 7.4 Section — The stack

A bento grid: one wide card spanning 2 columns on the top row, then a 3-across row, then a
2-across row. Each card is a link to its page.

```
EYEBROW: THE ARCHITECTURE
H2: An integrated system, not a collection of products.
```

| Card | Size | Heading | Copy | Links to |
|---|---|---|---|---|
| 1 | wide | **SunRey Chain** | The sovereign economic base layer. Identity, permissions, provenance, policy state and settlement as native concepts — not as applications running on top of a payments chain. | `/blockchain` |
| 2 | 1/3 | **Financial Agents** | AI that discovers and proposes. It never executes on its own authority. | `/ai-agents` |
| 3 | 1/3 | **The Vault** | Your information, held under your permission. Computation moves to the data. | `/vault` |
| 4 | 1/3 | **Access** | Governed, non-cash rights to real productive capacity. | `/access` |
| 5 | 1/2 | **SunRey Coin** | The economic coordination asset for the human layer. | `/sunrey-coin` |
| 6 | 1/2 | **MoonRey Coin** | The economic coordination asset for the autonomous layer. | `/moonrey-coin` |

### 7.5 Section — Grow My Money

Split layout: copy left, a simple inline-SVG flow diagram right.

```
EYEBROW: THE CONSUMER PROMISE

H2 (two-tone):
Put your money and your
information to work for you.        ← second line --sun-500

LEDE:
Not "monetize your data." The promise is simpler and it points the other
way: your money and your permissioned information should be working on your
behalf, continuously, inside limits you set.

BODY:
Grow My Money is the primary objective of the SunRey Financial Agents:
continuously determine the best permissible next action for your next
dollar — consistent with your goals, your risk tolerance, your liquidity
needs, legal permissions and the constraints you define.

The agent is designed to observe, explain, recommend and prepare. Whether it
may execute, and within what limits, is a decision you make and can revoke.

LINK: How the agents work →   /ai-agents
```

**Diagram (inline SVG, vertical flow, gold accent on the final node):**

```
Your goal
   ↓
Economic graph
   ↓
Opportunity discovery
   ↓
Growth plan
   ↓
Agent explanation
   ↓
Your approval          ← this node in --sun-500
   ↓
Execution
   ↓
Attribution
```

### 7.6 Section — The manifesto band

Full-bleed, `--bg-sunken`, extra vertical padding, no card, centered, max-width `54ch`.
This is the quietest and most important block on the page.

```
EYEBROW: THE GOVERNING PRINCIPLE

H2 (display-m, --text, generous line-height, each clause on its own line):

Information is not money.
Valuation is not monetary policy.
And intelligence — human or artificial —
is not sovereign authority.

BODY (--text-muted, centered):
Three boundaries hold the architecture together. Evidence, however well
verified, cannot create money. A valuation, however sophisticated, cannot
authorize issuance. And no model, agent, operator, endpoint or database
can move value on its own authority.

Economic facts live outside the chain. Monetary truth lives inside it.
```

### 7.7 Section — The Currency of You

The approved treatment of the tagline. Gold, restrained, with the qualifier immediately
adjacent so it can never be read as a collateralization claim.

```
EYEBROW: SUNREY COIN

H1-scale (display-l, --sun-500, centered):
The Currency of You.

BODY (centered, max 62ch, --text-muted):
Not a claim on you. Not ownership of your data. Not a score of your worth.

SunRey Coin is the economic coordination asset for the human layer of the
network — a way to settle, reward and coordinate the participation people
authorize. What creates value is the activity: the verified contribution,
the permitted computation, the authorized research, the network utility.
Never the person, and never their raw information.

LINK: Read the design principles →   /sunrey-coin
```

### 7.8 Section — Where we are

Honesty as a feature. This section is what makes the site credible to an investor or partner
who has seen a hundred pre-launch decks.

```
EYEBROW: BUILD STATUS

H2: Built in the open, honestly labelled.

LEDE:
SunRey is a pre-production system. We would rather tell you exactly what
runs today than describe a roadmap as a product.

STATUS BOARD (rows: label, state pill, note):

Accounts & ledger        RUNNING    Durable, PostgreSQL-backed, restart-verified
Internal transfers       RUNNING    Durable
Native wallets           RUNNING    SunRey and MoonRey assets
Vault                    RUNNING    Bound to durable state
SunRey Chain             TESTNET    Validator consensus, two native assets. Mainnet not active.
Financial Agents         PARTIAL    Research wired; conversational runtime in progress
Exchange                 SANDBOX    Simulation only
Access                   SANDBOX    Fixed sandbox inventory
Live banking & cards     DISABLED   Requires regulated partners
Data marketplace         DISABLED   Requires legal and provider prerequisites

Pill colors: RUNNING --sun-500 (10.37:1) · TESTNET --sun-700 (5.40:1)
             PARTIAL --moon-500 (7.85:1) · SANDBOX --moon-500 with a --moon-700 border
             DISABLED --text-faint (4.60:1)

All five pass 4.5:1 as micro text. --moon-700 and --moon-900 are border-and-fill tokens
only — never use them for text.

FOOTNOTE (--text-faint, micro):
All environments are simulated. No real money, no real digital assets and
no real personal data exist in the system.
```

### 7.9 Closing band

Full-bleed, glow at its strongest, generous padding, centered.

```
DISPLAY-L (two-tone):
The future of finance
is bright.                          ← second line --sun-500

LEDE (centered):
SunRey Technologies is building the economic layer for human information.

LINK PAIR:
Read the white papers →   /white-papers
Explore the architecture →   /blockchain
```

---

## 8. PAGE: BLOCKCHAIN (`/blockchain`)

**Title:** `SunRey Chain — The Sovereign Economic Base Layer`

### 8.1 Page hero

Shorter than home: `min-height: 68vh`.

```
EYEBROW: SUNREY CHAIN

H1 (display-l, two-tone):
The sovereign
economic base layer.                ← second line --sun-500

LEDE:
One chain beneath two economies. Identity, permissions, provenance, rights
and policy are native concepts — not applications bolted onto a payments
network.

RAIL: IDENTITY · RIGHTS · PROVENANCE · POLICY · SETTLEMENT
```

### 8.2 Section — Why a sovereign chain

```
EYEBROW: THE DECISION
H2: Sovereignty over the protocol, not over every primitive.

BODY (two columns):

SunRey Coin and MoonRey Coin are native assets of SunRey Chain. They are not
tokens issued on Ethereum or on any other third-party base layer. The reason
is not ideological. A network whose core logic is identity, consent,
provenance, policy state and jurisdictional control cannot rent that logic
from a chain that treats all of it as application data.

That sovereignty is deliberately bounded. Owning the protocol does not
require reinventing every cryptographic primitive. SunRey Chain is designed
around a mature, production-grade consensus engine and proven interoperability
components, replacing commodity layers only where there is a genuine
technical reason to do so. The distinctive work is the economic state
machine and the authority model — not consensus mathematics.

CALLOUT (bordered, --line-gold):
External blockchains may eventually interoperate with SunRey. They remain
external networks. SunRey Chain is the system of record for native SunRey
and MoonRey economic activity.
```

### 8.3 Section — Designed native capabilities

Eight cards, 4×2 grid on desktop, 2×4 on tablet, stacked on mobile. Each: a line icon,
a title, one sentence.

```
EYEBROW: DESIGNED NATIVE CAPABILITIES
H2: What the protocol treats as first-class.
```

| Capability | Copy |
|---|---|
| **Identity primitives** | Designed to link wallets and accounts to pseudonymous or verified identity states without exposing unnecessary personal information. |
| **Consent & rights registry** | Designed to record purpose, scope, duration, revocation, transferability and compensation terms as protocol objects. |
| **Attestations** | Designed to represent verified credentials and derived claims without republishing the underlying records. |
| **Provenance** | Designed to trace source, transformation and authorization history for every data-derived asset. |
| **Policy execution** | Designed to prevent disallowed transactions based on jurisdiction, asset class, user status or consent state. |
| **Settlement** | Designed to settle native assets, fiat-linked instruments, marketplace fees and participant rewards. |
| **Developer interfaces** | Designed to allow approved agents, researchers and applications to request proofs or computations. |
| **Auditability** | Designed to provide immutable evidence of policy decisions without exposing private data. |

### 8.4 Section — Two consensus planes

Split: copy left, a two-column inline-SVG diagram right.

```
EYEBROW: THE AUTHORITY MODEL
H2: Two kinds of agreement.

BODY:
Most chains have one consensus question: did this transaction happen?
SunRey Chain is designed to separate two.

Information Consensus is designed to establish whether an economic fact is
sufficiently supported by evidence — enough independent sources, enough
corroboration, enough lineage. Monetary Consensus finalizes valid monetary
state transitions. The separation means validators can agree on a block
without independently inventing issuance authority.

It is what would let the same network hold both a claim about the world and a
claim about money, and treat them as different kinds of truth.
```

**Diagram:** two vertical stacks — `EVIDENCE → CORROBORATION → INFORMATION CONSENSUS` on the
left, `PROPOSAL → POLICY → MONETARY CONSENSUS` on the right, with a single gold gate glyph
where they meet, labelled `AUTHORIZATION BOUNDARY`.

### 8.5 Section — The five roots

Every finalized block is designed to commit five separate cryptographic roots. Present as
five rows with a large `01`–`05` numeral in `--sun-900`.

```
EYEBROW: PROOF-BOUND STATE
H2: Five commitments, one block.

01  Transaction Root      Commits to the ordered execution set — what executed.
02  Monetary State Root   Commits to the resulting canonical protocol state.
03  Evidence Root         Commits to the supporting economic evidence.
04  Rights Root           Commits to consent, rights, license and purpose authorization context.
05  Policy Root           Commits to the exact methodology and policy version applied.

CALLOUT:
Historical evidence can later be challenged, and consent can later be
revoked, without rewriting finalized history. New statuses are represented
as subsequent append-only records.
```

### 8.6 Section — What cannot mint

A hard-edged list. This is the security argument, and it reads better as an enumeration of
denials than as prose.

```
EYEBROW: THE EVIDENCE-TO-MONEY FIREWALL
H2: Supply changes have exactly one path.

LIST (each row: item, then "cannot mint" in --text-faint):
Raw personal data
An economic observation
A verified economic fact
An economic claim
A valuation layer
An oracle
An AI agent
An API
A frontend
An exchange
An operational database

CLOSING (--text-muted, max 62ch):
These systems create evidence, calculations and proposals. Only the
canonical protocol path can finalize a supply-changing transition, and only
after the applicable governance and consensus requirements are satisfied.
```

### 8.7 Section — Status

```
EYEBROW: CURRENT STATE
H2: Testnet.

BODY:
SunRey Chain currently runs as a preproduction, testnet-grade network with
validator consensus, persistent state and two native assets, inside an
internal sandbox environment. Mainnet is not active.

Activation of any public network, regulated rail or live financial capability
requires external security review, provider prerequisites and formal
governance decisions that have not been taken. Premature activation is
treated as a named failure mode in the architecture, not an acceptable risk.
```

---

## 9. PAGE: SUNREY COIN (`/sunrey-coin`)

**Title:** `SunRey Coin — The Human Economic Layer`

### 9.1 Hero

```
EYEBROW: SUNREY COIN

H1 (display-l, two-tone):
The Currency
of You.                             ← second line --sun-500

LEDE:
The economic coordination asset for the human layer of the network. Its
value comes from what people authorize — not from what can be extracted
from them.

RAIL: PARTICIPATION · CONTRIBUTION · SETTLEMENT · COORDINATION
```

### 9.2 Section — What it is not

Lead with the denials. It is the honest order and it disarms the obvious objection first.

```
EYEBROW: FIRST, WHAT IT IS NOT
H2: A coin cannot own a person.

LIST (three items, each a heading + one sentence, hairline separated):

Not backed by people.
SunRey Coin is not collateralized by individuals, by their data, or by any
claim on their future participation.

Not ownership of anyone's information.
The network tokenizes rights around information — permissions, provenance,
verified attributes, computational access, derived insights and economic
rights. It does not tokenize a person or place a person's raw history
on-chain.

Not a score of human worth.
The human economy is designed to evaluate defined contributions, not to
assign an intrinsic value to a person. Age, health, genetics, psychology,
location and social relationships are not economic contributions merely
because data about them exists.
```

### 9.3 Section — What generates value

```
EYEBROW: THE ECONOMIC ENGINE
H2: Useful network activity.

LEDE:
The intended value driver is useful activity on the network — not a
narrative about what the coin represents.

GRID (six cards):
Network utility          Fees, settlement and coordination across the human layer.
Authorized computation   Compute-to-data requests executed against permissioned sources.
Verified contribution    Research participation, credentialed work, signed receipts.
Attestations            Issuance and verification of credentials and derived claims.
Information markets      Time-limited access rights, research contracts, permitted training.
Participant rewards      Compensation for qualifying participation and network services.
```

### 9.4 Section — What the coin coordinates

A list of the dimensions of authorized human participation the asset can coordinate. Present
as a two-column list with hairlines, `body` size, no cards.

```
EYEBROW: SCOPE
H2: The human layer, in full.

Identity and verified credentials
Financial state and economic behavior
Preferences, goals, purchase intent and consumer demand
Health, wellness, biological and research attributes — where legally permitted and explicitly authorized
Professional, educational and skill credentials
Digital, behavioral, mobility, entertainment and lifestyle signals — when permissioned
Community participation, memberships, relationships and reputation attestations
AI interactions, personal mandates, accepted recommendations and preference refinement
Consent, permission, purpose, provenance and compensation rights
Derived intelligence, eligibility proofs, research cohorts, attestations and compute-to-data outputs
```

### 9.5 Section — Design guardrails

```
EYEBROW: DESIGN GUARDRAILS
H2: Constraints we published before we needed them.

LIST:
· Utility is designed around a functional network with real demand,
  independent of speculative trading.
· No passive yield, guaranteed appreciation or company-profit participation
  is offered or implied.
· Supply, emissions, treasury controls, unlocks, governance and
  market-making will be defined transparently before any public distribution.
· Token classification analysis will be run in every target jurisdiction
  before offering, listing or rewarding the asset.
· SunRey Coin is valued separately from SunRey corporate equity. A token
  market capitalization is never used as a substitute for enterprise value.
· Sensitive raw human information stays off-chain. Only hashes, proof
  identifiers, consent references, settlement events and provenance
  identifiers are committed.
```

### 9.6 Ticker notice

A small bordered callout, `--line-gold`:

```
The SunRey Coin ticker is intentionally undetermined and should not be
inferred from prior names. It will be selected only after trademark,
exchange-symbol, regulatory and market-confusion review.
```

### 9.7 Cross-link band

```
Its counterpart in the autonomous economy →  MoonRey Coin  /moonrey-coin
```

---

## 10. PAGE: MOONREY COIN (`/moonrey-coin`)

**Title:** `MoonRey Coin — The Autonomous Productive Layer`

**This page uses the silver ramp throughout.** `--moon-500` replaces `--sun-500` and
`--line-moon` replaces `--line-gold` in every accent position; the glow field switches to
`--glow-moon`. This is the one page that shifts palette, and the shift should be immediately
legible on arrival. The one block exempt from this is the economic-loop diagram in §10.4,
which is deliberately bi-chromatic — see §5.1.

### 10.1 Hero

```
EYEBROW: MOONREY COIN

H1 (display-l, two-tone with --moon-500 on line two):
The economy
that does not sleep.                ← second line --moon-500

LEDE:
When AI systems, robots and infrastructure perform most routine productive
work, the object worth measuring is productive capacity — and it needs its
own asset.

RAIL: ENERGY · COMPUTE · MOBILITY · MANUFACTURING · OUTPUT
```

### 10.2 Section — The MoonRey question

```
EYEBROW: THE QUESTION

H2 (display-m, max 46ch, the whole question as the heading):
How much useful capacity can the network provide — where, when, at what
cost, under whose control, and with what reliability?

BODY:
MoonRey Coin is the native asset for the autonomous productive economy. Its
central object is productive capacity: the measurable ability of autonomous
systems to provide economically useful goods and services.

Energy. Compute. Food. Housing. Transport. Manufacturing. Resource output.
Autonomous services. These are not abstractions in a machine economy — they
are the supply side of every human demand expressed on the SunRey layer.
```

### 10.3 Section — Economic pools

Five cards, each with a title and its illustrative streams as a comma-separated line in
`--text-muted`.

| Pool | Illustrative streams |
|---|---|
| **Machine & intellectual assets** | AI models, model weights, robotics software, industrial algorithms, simulation systems, digital twins, production processes, automation IP. |
| **Resource & usage rights** | Mineral rights, water rights, spectrum rights, land-use rights, extraction rights, generation rights and other productive entitlements. |
| **Environmental & circular economy** | Carbon instruments, renewable-energy certificates, recycling, recovered materials, waste-to-energy, reuse, ecosystem services. |
| **Space economy** | Satellites, launch capacity, orbital communications, Earth observation, orbital compute, future space manufacturing and resource systems. |
| **Machine-to-machine commerce** | Robot-to-grid payments, AI-to-AI procurement, autonomous maintenance, compute purchasing, energy purchasing, self-directed supply-chain settlement. |

### 10.4 Section — The loop

The most important diagram on the site. A vertical seven-stage flow. Stages 1–2 gold
(human side), stage 3 neutral with a gold-to-silver gradient (the bridge), stages 4–5 silver
(machine side), stages 6–7 neutral, with a return arrow from 7 to 1 closing the loop.

```
EYEBROW: HOW THE TWO ECONOMIES MEET
H2: Human demand. Autonomous supply. One loop.

STAGES (label / layer):
Human goals, identity, preferences, permissions and demand     HUMAN LAYER
Financial agents translate goals into authorized economic intents  AGENT LAYER
SunRey Chain evaluates rights, policy, identity and settlement conditions  PROTOCOL LAYER
AI, compute, energy, robots, factories and resources are allocated  PRODUCTIVE LAYER
Goods and services are produced, moved, stored and delivered   OUTPUT LAYER
Economic value, costs, rewards and ownership changes are settled  LEDGER LAYER
Outcomes update wealth, demand and future allocation           ECONOMIC LOOP

WORKED EXAMPLE (bordered callout, --text-muted):
A person expresses a goal to reduce housing and energy costs through the
SunRey layer. Financial agents identify authorized options. SunRey Chain
validates permissions and jurisdiction. MoonRey-side markets source
available energy, autonomous construction, housing capacity, financing or
logistics. Settlement and attribution return to the user and the network.
```

### 10.5 Section — What is actually tokenized

```
EYEBROW: TOKENIZATION MODEL
H2: Verifiable rights, not implied ownership of the physical world.

BODY:
The strongest architecture tokenizes verifiable economic rights, state and
activity — not a claim that one coin literally contains all underlying
people, resources or physical assets.

A design question the architecture keeps open and deliberate: which
economic objects are merely measured by the network, and which are
represented as enforceable tokenized rights. Those are different
commitments with different legal consequences, and conflating them is how
resource-backed tokens fail.
```

### 10.6 Section — Open architecture decisions

Investors and technical partners respect a project that publishes its unresolved questions.

```
EYEBROW: OPEN DECISIONS
H2: What the next architecture phase must settle.

LIST:
· Distinct protocol roles for SunRey Coin and MoonRey Coin, so their
  utilities reinforce one another without becoming economically redundant.
· The Productive Capacity Graph and a canonical asset and capacity schema.
· Oracle security for high-value external facts — power generation, real
  estate ownership, resource reserves, robot output, industrial utilization.
· Which economic objects are measured versus represented as enforceable
  tokenized rights.
· Standards for AI-agent and robot identity, wallets, permissions, spending
  mandates and machine-to-machine contracting.
· The economic bridge between human demand and productive supply.
· Token economics, supply, issuance, fees, treasury, incentives and network
  security — modelled only after the utility architecture is stable.
· Separate regulatory classification for native coins, tokenized real-world
  rights, commodities, securities-like instruments, payment functions and
  autonomous commerce.
```

### 10.7 Cross-link band

```
Its counterpart in the human economy →  SunRey Coin  /sunrey-coin
```

---

## 11. REMAINING PAGES

### 11.1 A.I. AGENTS (`/ai-agents`)

**Title:** `SunRey Financial Agents — AI That Proposes, Never Executes`

**Hero:**

```
EYEBROW: SUNREY FINANCIAL AGENTS

H1 (two-tone):
AI is an analyst,
not a sovereign.                    ← second line --sun-500

LEDE:
SunRey's agents are designed to discover opportunities, explain them and
prepare them. What they may execute — and within what limits — is a decision
you make, bound in infrastructure rather than in a prompt.

RAIL: OBSERVE · EXPLAIN · RECOMMEND · PREPARE · EXECUTE
```

**Section — Grow My Money.** Reuse the §7.5 copy and diagram at full width, with this
addition after the diagram:

```
CALLOUT:
Grow My Money — continuously determine the best permissible next action for
the user's next dollar, consistent with goals, risk, liquidity needs, legal
permissions and user-defined constraints.
```

**Section — The autonomy ladder.** The core of this page. Five rows, each a large numeral,
a level name, a behavior and a control standard. Render as a table on desktop, stacked cards
on mobile. Row 5 is visually emphasized with `--line-gold`.

| | Level | Behavior | Control standard |
|---|---|---|---|
| 01 | **Observe** | Read financial state and identify patterns | Read-only, explicit data permissions |
| 02 | **Explain** | Explain cash flow, risks, fees and opportunities | Traceable reasoning and source references |
| 03 | **Recommend** | Recommend savings, transfers, debt actions or investments | Suitability and best-interest standards, where a regulated partner makes them applicable |
| 04 | **Prepare** | Stage a transaction for user approval | Clear fees, destination, risk and cancellation terms |
| 05 | **Execute** | Execute automatically within a user-approved mandate | Permissions from the applicable regulated partner, limits, audit logs, human override and revocation |

```
BELOW TABLE:
Autonomy is graduated, never binary. Every automated action is explainable,
and reversible wherever the underlying financial rail permits reversal.
```

**Section — The authority model.** A five-stage horizontal inline-SVG diagram:
`PROPOSAL → PERMISSION → RISK → EXECUTION AUTHORITY → SETTLEMENT`, with a gold gate glyph at
each boundary.

```
EYEBROW: THE AUTHORITY MODEL
H2: A proposal is not a permission.

BODY:
AI models discover and propose actions. They cannot directly execute
consequential financial state changes. Candidate opportunities are designed
to become structured Action Intents, which pass through deterministic
permission, risk, compliance and execution-authority layers before any
controlled settlement occurs.

Agent capabilities are enforced in infrastructure by design, never inferred
from a prompt — allowed actions, forbidden actions, account classes, limits,
expiry, jurisdiction and revocation state.
```

**Section — What agents may not do.** A denial list, same visual treatment as §8.6:

```
Silently merge high-impact identities
Fabricate evidence
Override rights
Activate monetary policy
Authorize issuance
Elevate their own permissions

CLOSING:
Agent mandates are scoped, revocable and purpose-bound. The deterministic
risk engine outranks every return-seeking agent in the system; if risk
fails, the action does not occur.
```

**Section — Named systems.** Six compact cards, title + one sentence:

| System | Copy |
|---|---|
| **Personal Economic Graph** | Economic relationships carrying source, verification, sensitivity, purpose, consent, expiration, jurisdiction and permitted-agent metadata. |
| **Agentic Capital Mesh** | Specialized macro, FX, relative-value, volatility, microstructure, execution and meta-allocation agents operating under a superior deterministic risk engine. |
| **Personal Oracle** | Converts source information into verifiable statements — that a criterion is satisfied, without revealing the record behind it. |
| **Regulatory Digital Twin** | A versioned capability-state machine mapping regulation to requirement to control to policy to implementation to test to evidence. |
| **Risk Engine** | Deterministic and superior to every agent. Position, exposure, concentration, liquidity, loss and drawdown limits, with independent kill switches. |
| **Model Registry** | Every economically consequential model is designed to carry a production identity, validation state, approved jurisdictions and a kill-switch state. |

---

### 11.2 ACCESS (`/access`)

**Title:** `SunRey Access — Governed Rights to Real Productive Capacity`

This is the least familiar concept on the site. Define it before describing it, and lead with
what it is not.

**Hero:**

```
EYEBROW: SUNREY ACCESS

H1 (two-tone):
Not a currency.
A right to use.                     ← second line --sun-500

LEDE:
Access is a governed, non-cash right to use real productive capacity —
mobility, lodging, compute, energy, transit, experiences — bounded by
verified allocatable capacity and reserved funding. In the current sandbox,
both are simulated.

RAIL: MOBILITY · LODGING · COMPUTE · ENERGY · TRANSIT · EXPERIENCES
```

**Section — The definition.** A single bordered callout, `--line-gold`, at `lede` size,
followed by three short denials:

```
CALLOUT:
Access is not a third currency and is not a fixed redemption promise. It is
a governed, non-cash right to use real productive capacity. Participation in
the network can influence allocation, while the system remains bounded by
actual category capacity and available funding.

THREE DENIALS (hairline rows):
Not a currency.        Access entitlements do not trade and are not money.
Not a promise.         Access cannot create an unfunded promise of goods or services.
Not unlimited.         Total entitlements never exceed verified allocatable capacity.
```

**Section — Three separate states.** A three-column diagram, deliberately shown as three
*separate* boxes with no shared border, because separation is the whole point.

```
EYEBROW: THE SEPARATION
H2: Three states that never merge.

01  Token participation state    What you hold and for how long.
02  Access entitlement state     What you are entitled to use.
03  Fiat funding & settlement    How the provider actually gets paid.

BELOW:
Keeping these three apart is what prevents Access from becoming an
unfunded promise, a shadow currency, or a claim the network cannot honor.
```

**Section — How allocation works.**

```
EYEBROW: ALLOCATION
H2: Time-weighted, capacity-bounded.

BODY:
Allocation uses time-weighted average balance rather than snapshot balances,
so participation is measured by duration rather than by timing a moment.
Diminishing-return transforms and configurable dual-economy weighting shape
the curve.

Above all, allocation is bounded: the total set of entitlements issued never
exceeds the verified allocatable capacity in that category. If the capacity
is not there, the entitlement is not issued.
```

**Section — Lifecycle.** A horizontal inline-SVG process line, ten stages, wrapping to two
rows on narrow screens:

```
Quote → Coverage → Co-pay → Entitlement reservation → Funding reservation →
Provider booking → Settlement → Fulfillment → Restoration / refund →
Three-way reconciliation
```

```
BELOW:
Providers settle in fiat and need not natively understand SunRey or MoonRey.
A capability-driven provider abstraction, and where appropriate a restricted
payment instrument bounded by amount, merchant category, geography,
expiration and single-use constraints, sits between the network and the
merchant.
```

**Section — Categories.** Six cards with a line icon each. Show the categories; show sandbox
inventory as clearly labelled sandbox figures, or omit the figures entirely — do not present
them as available.

```
EYEBROW: CATEGORIES
H2: Capacity people actually use.

Mobility · Lodging · Experiences · AI Compute · Transit · Energy

FOOTNOTE (--text-faint, micro):
Category inventory shown in any SunRey environment is simulated sandbox
capacity with no real-world redeemability.
```

**Section — Where this goes.**

```
EYEBROW: THE DIRECTION
H2: Intent, matched to capacity.

BODY:
The longer arc is autonomous allocation: authorized human intent — goals,
time, location, budget and desired experiences — matched by agents against
available productive capacity such as mobility, lodging, compute, energy,
robotics, food, logistics or manufacturing.

That is the point at which the SunRey layer and the MoonRey layer stop being
two descriptions of an economy and start being one mechanism.
```

---

### 11.3 VAULT (`/vault`)

**Title:** `SunRey Vault — The Human Information Network`

**Hero:**

```
EYEBROW: SUNREY VAULT · HUMAN INFORMATION NETWORK

H1 (two-tone):
Data stays private.
Proof moves.                        ← second line --sun-500

LEDE:
Permission moves. Computation moves to the data where possible. Money moves
as settlement. The record itself does not travel.

RAIL: CONSENT · PURPOSE · PROVENANCE · COMPUTATION · COMPENSATION
```

**Section — The inversion.** Two panels, deliberately asymmetric: the left ("historical")
panel in `--text-faint` on `--bg`, visually receding; the right ("SunRey") panel raised and
gold-bordered.

```
EYEBROW: THE INVERSION
H2: The same machinery, pointed the other way.

LEFT — HISTORICAL MODEL:
Aggregate data about people so institutions can understand them.

RIGHT — SUNREY MODEL:
Let a person control an integrated intelligence model of themselves, and
selectively authorize the financial, research or computational uses that
benefit them.

BELOW (centered, --text-muted):
The goal is not total surveillance. The goal is authorized economic
awareness.
```

**Section — What the Vault is.**

```
EYEBROW: THE VAULT
H2: A secure layer, not a collection.

BODY:
The SunRey Vault is the user-linked secure data layer. It is designed to be
implemented through encrypted storage, trusted execution environments,
confidential-compute providers, user-held keys, institutional custody
patterns, or a hybrid of these.

The defining requirement is simple and it is a requirement, not a feature:
sensitive source data is not casually replicated across counterparties. The
Vault exposes tightly scoped interfaces for authorized computation, and
nothing wider.

CALLOUT:
The objective is not to collect everything indiscriminately. It is to create
a standardized architecture that can represent many dimensions of a person
when they choose to connect them and when a lawful purpose exists.
```

**Section — Information domains.** Eight rows, label + illustrative sources in `--text-muted`.
Use exactly these eight; do not add a ninth and do not publish a count.

| Domain | Illustrative sources |
|---|---|
| Financial | Income, balances, spending, debt, savings, investing, insurance, remittances |
| Consumption | Purchases, subscriptions, merchants, product categories |
| Health & wellness | Wearables, sleep, labs, activity, medical sources where permitted |
| Psychological & cognitive | Assessments, self-reported goals, behavioral signals |
| Biological | Genomics, biomarkers, microbiome and other laboratory-derived sources where lawful |
| Digital & entertainment | Apps, media, music, games, content and device behavior |
| Mobility & lifestyle | Travel, location history where permissioned, leisure and activity |
| Identity & credentials | KYC, education, employment, licenses, memberships |

**Section — On-chain and off-chain.** Two columns, hard split, hairline down the middle.

```
EYEBROW: THE SPLIT
H2: What the chain sees. What it never sees.

ON-CHAIN (--sun-500 header):          OFF-CHAIN (--text-muted header):
Hashes and cryptographic commitments  Raw health, genetic and biometric records
Consent receipts and authorization    Detailed transaction history unless explicitly needed
Credential and attestation references Private communications and content
Data provenance and source verification  High-resolution behavioral datasets
Revocation and expiration status      Documents, images and large files
Policy execution results              Personally identifying source records
Settlement and compensation           Features that would create re-identification risk
```

**Section — The Purpose Firewall.**

```
EYEBROW: PURPOSE FIREWALL
H2 (two-tone):
Knowing that data exists
is not permission to use it.        ← second line --sun-500

BODY:
A factual statement can be true while its use remains unauthorized. SunRey
therefore separates truth from permission.

Rights grants, consent grants, purpose authorizations and provider-license
controls determine whether evidence may be used for contribution
verification, research, valuation or monetary proposal. A purpose authorized
for research does not automatically authorize monetary use.

Purpose is designed to be enforced in the backend, never left to an
application prompt.
```

**Section — Compute-to-data.** Six numbered steps, vertical, with the worked example below.

```
EYEBROW: COMPUTE-TO-DATA
H2: Send the question, not the records.

LABEL (micro, --text-faint, directly above the steps):
DESIGNED FLOW — NOT ACTIVE

01  An enterprise or researcher submits a defined query, purpose and jurisdiction.
02  The policy engine is designed to identify eligible data sources and the required consent or legal basis.
03  User permission rules are evaluated; new consent is collected where required.
04  Computation is designed to run inside the approved environment against eligible vault data.
05  The requester receives only the authorized aggregate, proof or derived output.
06  SunRey is designed to settle participant rewards, protocol fees and enterprise charges.

WORKED EXAMPLE (bordered callout, prefixed `ILLUSTRATIVE`):
A pharmaceutical researcher requests a cohort matching biomarker, age and
sleep criteria. SunRey would evaluate eligibility against participating
vaults, verify each person's permission policy, perform the approved
computation, produce the authorized output and settle compensation — without
giving the researcher unrestricted copies of anyone's health record.

CLOSING (--text-muted, centered):
The highest-value marketplace may ultimately sell answers rather than data.
```

**Section — The limits we state plainly.** Required for credibility and for accuracy.

```
EYEBROW: LIMITS
H2: What this architecture does not promise.

LIST:
· Revocation stops future use where required. It does not rewrite finalized
  history that was validly authorized at the time of execution.
· Permissions can be revoked where legally and technically possible. Some
  lawful bases and some completed computations are not reversible.
· Sensitive information participating in an authorized research or
  computation event makes the *event* the monetizable object — never the
  underlying human characteristic.
· SunRey does not create an irreversible marketplace in people. It creates a
  marketplace in permissioned computation, verified attributes, provenance
  and user-authorized participation.
```

---

### 11.4 WHITE PAPERS (`/white-papers`)

**Title:** `SunRey White Papers & Technical Documents`

**Hero:**

```
EYEBROW: DOCUMENTS

H1 (two-tone):
The thinking,
in full.                            ← second line --sun-500

LEDE:
Architecture, economics and design constraints as written — including the
parts that are unresolved.

NOTICE (bordered, --line-gold, immediately below the hero):
These documents are confidential and provided to authorized recipients only.
They describe intended architecture and design intent. They are not legal,
regulatory, securities, tax, investment or patent advice, and they are not
an offer of any security or digital asset.
```

**Paper registry.** Each entry is a card in a single column, generously spaced. Card contains:
category label, title, date, version, abstract, the "does not establish" line, and a download
action. **Do not add a page count** — that is a fact this spec does not supply and §0 rule 2
forbids inventing it.

Abstracts live in `content/papers/*.mdx`. They are production copy; use them verbatim.

---

**01 — Economic architecture · Version 1.0 · August 2026**
**SunRey + MoonRey: Dual-Economy Architecture for a Post-AI, Post-Automation World**

> Sets out the dual-economy thesis: SunRey represents the human economy of identity,
> information, permissions and participation, while MoonRey represents the autonomous
> productive economy of energy, compute, robotics and machine output. Establishes both as
> native assets of one sovereign chain, and maps the feedback loop between human demand and
> autonomous supply.
>
> *Does not establish:* the protocol parameters. Consensus, validator model, execution
> environment, privacy model and token economics are named as decisions for the next
> architecture phase, not settled here.

---

**02 — Protocol architecture · September 2026**
**SunRey Economic Awareness & Sovereign Monetary Architecture**

> Specifies the Economic Awareness Fabric, the separation of Information Consensus from
> Monetary Consensus, canonical economic claims with anti-double-counting, valuation layers
> that hold no issuance power, and proof-bound monetary transitions committing five
> cryptographic roots. The governing invariant: economic facts outside the chain, monetary
> truth inside it.
>
> *Does not establish:* execution. In its own words — "It should not be read as evidence that
> every wave has already been executed, externally audited or approved for production."

---

**03 — Strategy · August 2026**
**SunRey Strategy, Product Architecture & Compliance Framework**

> The commercial and regulatory frame: product architecture across app, chain, coin, exchange
> and information network; the compliance perimeter across banking, payments, securities,
> digital assets and privacy; the phased sequence with proof gates; and the design constraints
> the project holds itself to before it needs them.
>
> *Does not establish:* any valuation, licensing position or legal conclusion. Marked
> throughout as a confidential strategic concept report, and "not legal, tax, investment,
> securities, regulatory or formal valuation advice."

---

**04 — Intellectual property · September 2026**
**SunRey Patent Portfolio & Intellectual Property Strategy**

> Describes a coordinated provisional filing strategy across sixteen candidate families,
> spanning the sovereign economic state machine, deterministically authorized AI agents,
> rights-governed contribution and settlement, capacity-constrained access, purpose-controlled
> AI context, and proof-bound monetary state — with an omnibus filing used as the disclosure
> reservoir.
>
> *Does not establish:* patentability or protection. In its own words — "a technical
> patent-strategy document, not a legal patentability opinion," which "does not conclude that
> any claim is novel, non-obvious, patent-eligible or enforceable."

---

**Language rule for paper 04, restated because it is easy to get wrong:** describe it as a
**patent strategy** covering a **provisional filing program**. Never "13 patents," never
"our patents," never "patented," never a filing date, never claim text.

**Download behavior.** Client-side gate only, so a PDF placed in `public/papers/` is
retrievable by anyone who guesses the URL. Therefore:

- Store PDFs under `public/papers/` with **unguessable filenames** —
  `sunrey-dual-economy-8f3a91c2.pdf` — generated once and recorded in `src/lib/papers.ts`.
- The download button reveals the link only after the gate is satisfied.
- Every PDF must carry a footer watermark reading
  `CONFIDENTIAL — SUNREY TECHNOLOGIES — NOT FOR DISTRIBUTION`.
- If a paper is too sensitive for that (the strategy report contains valuation ranges and is
  marked "Confidential strategic concept report"), **do not publish the PDF at all.** Show
  the card and abstract with the action replaced by `Available on request` and a `mailto:`
  link. Default to this for paper 03 unless Nick explicitly clears it.

**Closing band on this page:**

```
DISPLAY-M (centered):
Architectural ancestry, not mission inheritance.

BODY (centered, max 60ch, --text-muted):
Parts of this architecture draw deliberately on prior work in federated
information systems — schema mediation, link discovery, provenance,
policy-aware access and immutable audit. The engineering is worth
inheriting. The objective is inverted: rights, purpose limitation,
minimization and accountability are architectural properties here, not
governance added afterward.
```

---

### 11.5 LEGAL (`/legal`)

Linked from the footer only; not in the nav. A single-column typographic page, `body` size,
`--text-muted`, max-width `68ch`. No design flourishes, no cards, no glow — just a rule under
each `H2`. Copy below is production copy. Leave a `{/* REVIEW: counsel */}` comment above each
section: Nick's counsel will revise this, and the markers tell them where to look.

```
H1 (display-m): Legal & Disclosures
SUBLINE (--text-faint): Last updated September 2026.
```

**H2 — Pre-production status**
Render the full §2.3 disclosure here as the first section, unabridged.

**H2 — Forward-looking statements**

> This site describes intended architecture, design intent and planned capability. Statements
> about what SunRey will do, may do, is designed to do, or intends to build are
> forward-looking. They are not commitments, guarantees, or descriptions of present
> capability. Architecture described here may change materially, and capabilities described
> here may never be built, may be built differently, or may be restricted or disabled in
> particular jurisdictions. Where this site describes what runs today, it is labelled as such.

**H2 — No offer of securities or digital assets**

> Nothing on this site constitutes an offer to sell, or a solicitation of an offer to buy,
> any security, digital asset, token, or financial instrument, in any jurisdiction. No
> subscription, allocation, presale, or distribution is being offered or accepted. No
> valuation, price, ticker, supply figure, or return is stated or implied anywhere on this
> site, and none should be inferred. Any future issuance of a native network asset would be
> subject to jurisdiction-by-jurisdiction classification analysis and to whatever regulatory
> process that analysis requires.

**H2 — No financial, legal or tax advice**

> Nothing on this site is legal, regulatory, securities, tax, accounting, investment, or
> financial advice, and nothing here should be relied upon as such. SunRey holds no banking,
> brokerage, investment-advisory, custody, money-transmission, or exchange licenses, and does
> not hold itself out as a bank, broker, adviser, or custodian. Descriptions of regulated
> capability describe architecture designed to operate with appropriately regulated partners
> in the future; they do not describe present authorization.

**H2 — Confidentiality**

> This site and its contents are confidential and are provided to authorized recipients only.
> Access is granted for the purpose of evaluating SunRey and for no other purpose. Recipients
> should not reproduce, distribute, publish, or disclose this material or the access
> credentials to it without written permission from SunRey Technologies. Documents made
> available here carry their own confidentiality terms, which apply in addition to these.

**H2 — Intellectual property**

> SunRey Technologies pursues a provisional patent filing strategy. No patent grant is
> claimed, asserted, or implied anywhere on this site, and no statement here should be read as
> an opinion on patentability, novelty, non-obviousness, patent eligibility, or
> enforceability. "SunRey," "MoonRey," and associated marks and designs are the property of
> SunRey Technologies. All third-party names referenced remain the property of their
> respective owners.

**H2 — Privacy of this site**

> This site is a static, gated information site. It does not collect personal information, does
> not set advertising or tracking cookies, and does not transmit visitor data to third parties.
> A single browser-local flag records that the access passphrase was entered, so returning
> visitors are not prompted repeatedly. That flag stays in the visitor's browser and is never
> sent to SunRey.

**H2 — Contact**

> SunRey Technologies — `hello@sunrey.xyz`
> *(placeholder — confirm before launch, see §15)*

---

### 11.6 NOT FOUND (`/not-found.tsx`)

Full header, full footer with the §2.3 disclosure, glow field at half strength. Centered,
vertically, minimum 60vh.

```
EYEBROW (--sun-500): 404

H1 (display-l, two-tone):
Nothing here.
Yet.                                ← second line --sun-500

LEDE (centered, max 48ch):
That page does not exist. The eight that do are in the navigation above.

LINK: Return home →   /
```

---

## 12. TECHNICAL REQUIREMENTS

### 12.1 Accessibility

- WCAG 2.1 AA. All body text meets 4.5:1 against its background; verify `--text-muted`
  (#A39C90) on `--bg` (#060505) and adjust upward if it falls short.
- Semantic landmarks: one `<h1>` per page, `<nav>`, `<main>`, `<footer>`, correct heading order.
- Every interactive element reachable and operable by keyboard, with a visible focus ring
  (`2px solid var(--sun-500)`, `outline-offset: 3px`). Never remove focus styles.
- The gate input has a real `<label>` (visually hidden is fine) and an `aria-live` region for
  the error message.
- Mobile menu: focus trap, `Escape` to close, focus restored to trigger, `aria-expanded` on
  the button.
- Every SVG diagram: `role="img"` plus a `<title>` and an `aria-label` describing what it
  depicts, not just naming it.
- Respect `prefers-reduced-motion` everywhere.

### 12.2 Performance

- Lighthouse **Accessibility 100** and **Performance ≥ 95** and **Best Practices ≥ 95** on
  every route. These exact thresholds are repeated in §14; keep them identical.
- LCP < 2.0s on a simulated 4G connection. The LCP element is hero display text, so it must
  not wait on a font: use `next/font` with `display: 'swap'` and a metric-matched fallback to
  avoid layout shift.
- CLS < 0.05. Reserve space for every image and diagram.
- No route ships more than 100KB of first-load JS.

### 12.3 Metadata

- Per-page `title` and `description` from §7–§11.
- `robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true }`
  on every page, via Next metadata only. See §4.1 item 2.
- OG image: one `opengraph-image.tsx` per route segment, all importing a single shared
  template rendered with `next/og` — black ground, gold radial glow, the SunRey wordmark, and
  the page title in Jost 200. 1200×630. No static OG files.
- Favicon set: a gold dot on black, matching the `R` glyph in the wordmark.
- `themeColor: '#060505'`.

### 12.4 Content governance

- All copy from this document lives in `content/` as typed exports, **not** hard-coded in JSX.
  One file per page: `content/home.ts`, `content/blockchain.ts`, and so on. Components import
  and render. This is the difference between a site Nick can edit and one he has to ask for.
- `content/glossary.ts` holds every defined term with its canonical definition. Any term used
  on two or more pages must come from there so definitions cannot drift.
- Add a `npm run check:claims` script: a small Node script that scans the `content/` directory
  for every banned term in §2.2 and exits non-zero on a match. Wire it into `npm run build`.
  This is the single most valuable piece of tooling in the repo — write it carefully.

  Two implementation details matter. First, match on **word boundaries and phrases**, not
  substrings: `live` must not fire on "delivered", and `returns` must not fire on "return
  arrow". Where a word is only banned in a specific sense — "live", "returns", "bank" — encode
  the banned *phrase* (`"live banking"`, `"live trading"`, `"guaranteed returns"`, `"SunRey is
  a bank"`) rather than the bare word, and add a short `reason` string to each rule so a
  failure explains itself. Second, keep an explicit `ALLOWED` list. This
  spec deliberately uses flagged words in permitted *denial* constructions, and the build
  cannot pass without exempting all seven of them verbatim:

  ```
  "SunRey is not a bank"                                  §2.3
  "Live banking & cards"                                  §7.8 status board
  "mainnet is not active" / "Mainnet not active"          §2.3, §7.8, §8.7
  'Not "monetize your data."'                             §7.5
  "Not backed by people."                                 §9.2
  "No passive yield, guaranteed appreciation"             §9.5
  "not collateralized by individuals, by their data"      §9.2
  ```
 Store the rules as a typed constant in `scripts/claims.ts` so the list is
  easy to extend as counsel reviews the copy.

---

### 12.5 Glossary — `content/glossary.ts`

These terms appear on two or more pages. Each has exactly one canonical definition, and every
page that uses the term imports it from here. If a page needs a different definition, the
definition is wrong — fix it here, once.

| Term | Canonical definition |
|---|---|
| **SunRey** | An AI-native financial institution and human-information network, designed to help people move, understand and grow money while giving them cryptographic control over how their information creates value. |
| **SunRey Chain** | The sovereign economic base layer beneath both economies, designed to treat identity, permissions, provenance, rights and policy as native protocol concepts. Currently a preproduction testnet. |
| **SunRey Coin** | The economic coordination asset for the human layer of the network. A native asset of SunRey Chain, not a token on a third-party base layer. |
| **MoonRey Coin** | The economic coordination asset for the autonomous productive layer — energy, compute, robotics, infrastructure and machine output. Also native to SunRey Chain. |
| **SunRey Vault** | The user-linked secure data layer. Designed so that sensitive source data is not casually replicated across counterparties, and exposes only tightly scoped interfaces for authorized computation. |
| **Human Information Network (HIN)** | The architecture by which a person can build a permission-aware model of themselves from authorized sources, and selectively authorize uses of it. |
| **SunRey Access** | A governed, non-cash right to use real productive capacity, bounded by verified allocatable capacity and reserved funding. Not a currency and not a redemption promise. |
| **SunRey Financial Agents** | The AI systems designed to observe, explain, recommend and prepare financial actions within limits the person sets. They propose; they do not hold execution authority. |
| **Grow My Money** | The primary objective of the Financial Agents: continuously determine the best permissible next action for the person's next dollar, consistent with goals, risk, liquidity needs, legal permissions and user-defined constraints. |
| **Action Intent** | The structured proposal an agent emits instead of an execution. Every consequential request becomes one, and passes deterministic permission, risk and compliance layers before settlement. |
| **Purpose Firewall** | The enforcement boundary separating truth from permission. Knowing that data exists is not permission to use it, and a purpose authorized for one use does not authorize another. |
| **compute-to-data** | Sending the computation to the information rather than copying the information to the requester. The requester receives only the authorized aggregate, proof or derived output. |
| **Information Consensus** | Agreement on whether an economic fact is sufficiently supported by evidence. Kept separate from Monetary Consensus. |
| **Monetary Consensus** | Agreement finalizing valid monetary state transitions. Validators reach it without independently inventing issuance authority. |
| **Testnet** | A network running with validator consensus, persistent state and native assets, in a non-production environment, with no real value and no mainnet activation. |

---

## 13. BUILD PHASES

Complete in order. Run `npm run build && npm run lint` at the end of each phase.

**Phase 0 — Foundation.**
Scaffold Next.js 15 + TypeScript strict + Tailwind v4. Install and self-host Jost, Inter,
JetBrains Mono via `next/font/local`. Write `globals.css` with every token from §5.1 and §5.2.
Build `Section`, `Eyebrow`, `Display`, `Lede`, `Rule`, `Pill`, `Card` primitives. Set up
`content/` with empty typed files. Write `check:claims`. **Gate: a blank page renders with
correct fonts, correct ground color, and the claims check passes on empty content.**

**Phase 1 — Gate and shell.**
Build the access gate per §4, including `SECURITY.md` and `middleware.ts.example`. Build
`Header` with centered nav and the `PRE-PRODUCTION` pill, the mobile overlay menu, and the
three-tier `Footer` with the oversized wordmark and the full disclosure. Build `GlowField`.
Wire `robots.ts` and metadata defaults. **Gate: the access gate blocks `/` and one stub
route, unlock persists across a reload and across a new tab, `Escape` closes the mobile menu,
focus is trapped and restored, and the disclosure renders in the footer.** (The all-routes
assertion is verified in Phase 6, once every route exists.)

**Phase 2 — Home.**
Build every block in §7 in order, with content from `content/home.ts`. This page establishes
the visual language for the rest of the site — do not move on until it is right at 360px,
768px and 1440px. **Gate: Lighthouse ≥ 95 on `/`, no horizontal scroll at 360px, reduced-motion
renders the final state with no transition.**

**Phase 3 — Blockchain, SunRey Coin, MoonRey Coin.**
§8, §9, §10. Build the MoonRey palette switch as a data attribute on `<main>` that reassigns
the accent tokens, not as a set of one-off overrides. Build the dual-economy panels, the
five-roots list, the denial lists, and the economic loop diagram. **Gate: the MoonRey page
uses the silver ramp consistently with no leaked gold; every diagram has a `<title>` and
`aria-label`.**

**Phase 4 — A.I. Agents, Access, Vault.**
§11.1–11.3. The autonomy ladder, the Access three-state separation, the on-chain/off-chain
split, and the compute-to-data flow are the four blocks to get right on these pages.

**Phase 5 — White Papers, Legal, 404.**
§11.4–11.6. Build the MDX abstract pipeline and the paper registry using the four abstracts
in §11.4 verbatim. Watermark the PDFs. Default paper 03 to `Available on request`. Build
`/legal` from §11.5 with the `{/* REVIEW: counsel */}` markers in place, and the 404 from
§11.6.

**Phase 6 — Verification.**
Run §14 in full. Fix everything. Then write `README.md`: how to set `NEXT_PUBLIC_GATE_HASH`,
how to rotate the passphrase, how to edit copy in `content/`, how to add a white paper, and
how to enable the server-side gate.

---

## 14. DEFINITION OF DONE

Do not report the build complete until every line below is verified.

**Claims**
- [ ] `npm run check:claims` passes with the full §2.2 list active.
- [ ] No ticker symbol appears anywhere in the repo.
- [ ] No valuation figure, funding figure, user count, or percentage return appears anywhere.
- [ ] No superseded name (Solstice, Sol Coin, Pyramid, PYR) appears in any user-visible string.
- [ ] The word "patented" appears nowhere. Patent language is provisional/strategy only.
- [ ] The §2.3 disclosure renders in the footer of every route — the eight nav pages,
      `/legal`, and the 404.
- [ ] Every forward-looking capability is written in "is designed to" / "can" form, not "does".

**Gate**
- [ ] No page content is visible before unlock, and no content flashes before the gate paints.
- [ ] The plaintext passphrase does not appear in the built bundle (`grep` the `.next` output).
- [ ] Unlock persists across reload and across a new tab; expires after 30 days.
- [ ] Storage failure (private browsing) degrades to session-only unlock without an error.
- [ ] `SECURITY.md` exists and states the bypass limitation in plain terms.
- [ ] `middleware.ts.example` exists, compiles if renamed, and is documented in `README.md`.

**Routing and nav**
- [ ] All eight nav routes plus `/legal` and a styled 404 exist and render.
- [ ] Nav order matches §1.1 exactly; the nav is horizontally centered on desktop.
- [ ] The active route is visually indicated.
- [ ] Every internal link resolves; no 404s from any page.

**Design**
- [ ] Every color, size and space value comes from a token. Zero hard-coded hex in components.
- [ ] The MoonRey page uses the silver ramp throughout with no gold leakage.
- [ ] No stock photography, no AI imagery, no 3D renders anywhere.
- [ ] All diagrams are hand-authored inline SVG using palette tokens.

**Responsive and accessibility**
- [ ] No horizontal scroll at 360px, 390px, 768px, 1024px, 1440px, 1920px.
- [ ] Lighthouse Accessibility 100 on every route.
- [ ] Full keyboard traversal of every page with a visible focus ring throughout.
- [ ] `prefers-reduced-motion` removes all transitions and parallax.
- [ ] Every SVG has `role="img"`, a `<title>` and an `aria-label`.

**Performance**
- [ ] Lighthouse Performance ≥ 95 and Best Practices ≥ 95 on every route.
- [ ] No route exceeds 100KB first-load JS.
- [ ] CLS < 0.05; no font-swap layout shift on the hero.

**Content**
- [ ] All copy lives in `content/`; no user-visible string is hard-coded in a component.
- [ ] `content/glossary.ts` contains all fifteen §12.5 terms verbatim, and every page that
      uses one of them imports it rather than restating it.
- [ ] The four §11.4 abstracts and the seven §11.5 legal sections are present verbatim, and
      each legal section carries a `{/* REVIEW: counsel */}` marker.
- [ ] No page count, version number, or date appears on a paper card beyond the version and
      date given in §11.4.
- [ ] `README.md` documents passphrase rotation, copy editing, adding a paper, and the
      server-gate upgrade.

---

## 15. WHAT TO ASK NICK BEFORE SHIPPING

Do not guess these. Build with the placeholder given, and flag each one in your final summary.

1. **The passphrase.** Build with the hash of `sunrey-preview` and note that it must be
   changed before the site is shared.
2. **Paper 03 clearance.** The strategy report contains illustrative valuation ranges and is
   marked confidential. Default to `Available on request` until Nick clears it explicitly.
3. **The contact address** for `/legal` and for `Available on request`. Placeholder:
   `hello@sunrey.xyz`.
4. **The status pill label.** Spec says `PRE-PRODUCTION`. The current holding page says
   `LAUNCHING SOON`, which §2.2 does not permit — it is a launch claim. Offer `PRE-PRODUCTION`
   or `TESTNET` and let Nick pick between those two.
5. **Whether `/` should keep "Finance, evolved."** This spec keeps it for brand continuity.
   The alternative hero, if he wants the post-AI framing in the H1 itself, is
   "The operating system / for what comes next."

---

*End of build instructions. Everything in §7–§11 is production copy. Everything in §2 is a
constraint, not a suggestion.*
