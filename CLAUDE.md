# SunRey — Website Build Instructions

**Repository:** `sunrey-website`
**Deploys to:** `sunrey.xyz` / `www.sunrey.xyz`
**Owner:** Nick — SunRey Technologies
**Spec version:** 3.4 · September 2026
**Changes since 3.3:** the light field is lifted so it actually reads on a screen —
hairlines 0.03/0.04 → 0.06/0.07 and the sun 0.20 → 0.26 (§5.1, §5.5); the gate's own
hairline matches. The mobile menu panel is portalled to `<body>` (§6.2) because the
header's backdrop-filter was capturing its `position: fixed`.
**Changes since 3.2:** the status-reporting sections are deleted, at the owner's
request, and §3.3.1 below overrides every part of §7–§11 that specified them. The
§2.3 disclosure now renders on `/legal` only; the footer carries one neutral line
and a link. See §15.4 — it records what was removed, what was kept, and why.
**Changes since 3.1:** the header nav is set in Jost to match the wordmark (§6.1).
Pre-production labelling removed from the site chrome at the
owner's request — the header status pill is gone, and so is the gate's
"Pre-production · simulated environment" line. The desktop nav now appears from
1024px (§6.1) rather than hiding behind the hamburger. The gate's sun is a proper
starburst with the wordmark beneath it (§11.8). The §2.3 footer disclosure is
unchanged and still carries the phrase — see §15.4.
**Changes since 3.0:** the papers' 47 diagrams are extracted and ship as artwork —
`figure` blocks now carry `src`/`w`/`h`, there is a `--fig-plate` token, and §11.9
specifies the figure plate. The old "diagrams did not survive extraction" instruction
is withdrawn.
**Changes since 2.1:** white papers are now READ ON THE SITE as articles, not
downloaded. Ten new routes under `/white-papers/`. PDFs leave `public/` entirely.
**Changes since 2.0:** all ten white papers supplied and specified (§11.4)
**Changes since 1.0:** Exchange page added (nav is now eight items) · the two
economic indices added to Blockchain · gate moved server-side · host is Cloudflare
Pages · wordmark is the real vector mark · paper registry expanded to ten
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

## 0.2 OVERRIDE — NO STATUS-REPORTING COPY  *(v3.3, owner instruction)*

The owner has asked, twice and unambiguously, that the words *pre-production*,
*simulation*, *simulated*, *sandbox* and *testnet* not appear anywhere on the
site. **This section overrides §7.8, §8.8, §11.2, §11.6 and §6.3 wherever they
conflict with it.** The following no longer exist and must not be rebuilt:

- **§7.8 — the Home build-status board.** Section, `StatusRow`/`StatusTone`
  types, `StatusBoard` block and the `Pill` primitive are all deleted. Home now
  runs §7.7 straight into §7.9.
- **§8.8 — Blockchain "Current state · Testnet".** Deleted; §8.7 is the last
  section on that page.
- **§11.6 — Exchange "Current state · Sandbox".** Deleted; listing discipline is
  the last section. The §11.6 difference callout keeps its first sentence and
  drops "What runs today is a simulation."
- **§11.2 — Access.** The hero lede ends at "reserved funding"; the categories
  footnote is gone.
- **§6.3 tier 3.** One line — no offer, no advice — plus a link to `/legal`.
  `FOOTER_LEGAL.summary` in `content/site.ts`.

**Two things were NOT removed, and removing them is not a build decision.**

1. **The §2.3 disclosure, in full, on `/legal`.** It is now the only place the
   site states that balances are simulated, that mainnet is not active and that
   no licences are held. Those statements are what keep the rest of the site
   accurate: the site tells investors SunRey has running accounts, a ledger,
   native wallets, a chain and an exchange, and that reads very differently with
   the disclosure than without it. Deleting it is a legal judgement about a
   pre-production platform describing itself to investors — counsel's call, not a
   build's. See §15.4.
2. **The ten white papers.** They carry this vocabulary roughly fifty times, in
   their own authors' words, inside their own claim-discipline and publication-
   boundary sections. §11.4 forbids editing them and they are SunRey's own signed
   documents. If the owner wants the vocabulary out of the papers, the papers get
   revised at source and the generator re-run (§11.4) — the site does not silently
   rewrite them.

**Deleting, not rewording, was the correct move.** Replacing "Testnet" with a
present-tense description of a live network would have been a false claim and a
§2.2 violation. Silence is permitted here; a contrary claim is not (§0, rule 3).

---

## 0.1 THIS SITE IS ONE OF FOUR PROPERTIES

SunRey runs four web properties. They have different audiences, different auth, and
different backend dependencies. **This spec covers only the first.** Do not build,
scaffold, link into, or share code with the others.

| Property | What it is | Auth | Blocked on |
|---|---|---|---|
| **`sunrey.xyz`** | This site. Gated marketing and documents. | One shared passphrase (§4) | Nothing |
| `app.sunrey.xyz` | Mobile/PWA demo | Its own | Already exists |
| `explorer.sunrey.xyz` | Chain explorer | Public or gated, TBD | A persistent testnet that does not exist yet |
| `dashboard.sunrey.xyz` | Desktop application | Individual team accounts, roles | Durable API domains still in progress |

Two rules follow from this table and both matter:

1. **This site has no backend.** It never calls `api.sunrey.xyz`, never reads chain
   state, never shows a live figure. Every number on it is either absent or a label
   like `TESTNET`. If a section seems to want live data, it does not get live data.
2. **This site's gate is not the others' gate.** A shared passphrase is right for
   investors reading documents and wrong for a team operating a financial platform.
   Never reuse this passphrase, this cookie, or this Function anywhere else.

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
| Exchange | `/exchange` | SunRey Exchange — eligibility before the match. |
| A.I. Agents | `/ai-agents` | SunRey Financial Agents, Grow My Money, the authority model. |
| Access | `/access` | SunRey Access — governed, non-cash rights to real productive capacity. |
| Vault | `/vault` | SunRey Vault and the Human Information Network. |
| White Papers | `/white-papers` | Index of ten papers, each opening as an article. |
| — | `/white-papers/[slug]` | The reading view for one paper. Ten of these. Not in the nav. |

Nav order is exactly as listed — **eight items**. The nav is **horizontally centered** in the header, with the
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
output: 'export'  — the whole site is static HTML. No SSR, no route handlers.
Framer Motion (motion/react) for entrance + parallax
next/font for self-hosted fonts (no runtime Google Fonts request)
MDX for white-paper abstracts (@next/mdx)
Host: Cloudflare Pages. Gate: a Pages Function (§4). DNS/SSL already at Cloudflare.
Package manager: npm
```

**Why static export.** The site has no backend (§0.1) and the gate runs in front of it
as a Cloudflare Pages Function, not inside Next. That means no `@cloudflare/next-on-pages`
runtime, no edge-rendered routes, nothing to misconfigure. `next build` emits `out/`;
Cloudflare Pages serves `out/`; the Function decides who may reach it.

Set in `next.config.mjs`: `output: 'export'`, `images: { unoptimized: true }`, and
`trailingSlash: true` so Pages resolves `/vault` to `/vault/index.html` cleanly.

If `opengraph-image.tsx` cannot generate under static export in the installed Next
version, do not fight it — render the eight OG images once with a script into
`public/og/` and reference them with explicit metadata. Say so in your summary.

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
sunrey-website/
├── CLAUDE.md                       ← this file
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── source-papers/                  ← the ten supplied PDFs. NOT served, NOT linked.
│                                     Source for the converter only; see §11.4.
├── public/
│   ├── fonts/                      ← self-hosted woff2
│   ├── wordmark.svg
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
│   ├── papers/                     ← GENERATED. index.ts + types.ts + one
│   │                                 module per paper, each exporting blocks[]
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
│   │   ├── white-papers/[slug]/page.tsx   ← the article route, §11.9
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

### 4.1 What this is, and its one weak point

**A Cloudflare Pages Function in front of every request, with one shared passphrase.**

The Function runs before any file is served. An unauthenticated request never receives
page HTML, never receives a PDF, never receives anything but the gate screen. This is a
real boundary, unlike a client-side gate where the content ships regardless.

**The passphrase is set by the site owner and lives only in Cloudflare.** It is not
written here, and §14 requires that it appear nowhere in this repo. Understand its
limitation and build the mitigations below: it is short, it is brand name plus digits,
and a wordlist would reach it quickly. The Function is only as strong as the secret it checks.
So this spec requires rate limiting (§4.5) and makes rotation a one-field change with no
redeploy (§4.3). Do not remove either. If the site is ever distributed beyond a small
known group, the passphrase should be lengthened — that is a settings change, not a code
change, which is the point.

Two things follow:

1. **`robots.ts` still returns `disallow: '/'`**, and the root metadata still sets
   `robots: { index: false, follow: false, nocache: true, noarchive: true, nosnippet: true }`.
   Defence in depth, and it costs nothing.
2. **There are no PDFs on this site.** The white papers are rendered as pages
   (§11.4), so the Function protects them exactly as it protects every other page.
   Nothing under `public/` is a document download.

### 4.2 Behaviour

- Any request without a valid session cookie gets the gate screen, HTTP 401.
- The gate screen is a single self-contained HTML document served by the Function —
  black ground, the glow field, the SunRey wordmark, one passphrase field, one button.
  It matches §5 and §11.7, and it embeds no site content.
- Submitting the form POSTs to `/__gate`. On a match the Function sets the session
  cookie and redirects to the originally requested path. On a mismatch it re-serves the
  gate with `That passphrase is not recognized.` in an `aria-live` region.
- The cookie is `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, 30-day `Max-Age`.
- Its value is `<expiry>.<hmac>` where the HMAC is SHA-256 over the expiry using a
  server-only secret. It is verified, not trusted: an expired or badly signed cookie is
  treated as absent. Nothing about the passphrase is stored in it.

### 4.3 Configuration — no secrets in the repo

Set both as **encrypted environment variables** in the Cloudflare Pages project, for
both Production and Preview. Neither appears in git, and neither is `NEXT_PUBLIC_`.

```
GATE_PASSWORD = <the shared passphrase>    # set in the Cloudflare dashboard, never here
GATE_SECRET   = <32 random bytes, hex>     # openssl rand -hex 32
```

Rotating the passphrase is editing `GATE_PASSWORD` in the Cloudflare dashboard. It takes
effect on the next request with no rebuild. Rotating `GATE_SECRET` additionally signs
every existing session out, which is how you evict everyone at once.

`.env.example` documents both with empty values and a comment saying they are set in
Cloudflare, never committed.

### 4.4 `functions/_middleware.ts`

Cloudflare Pages runs this for every request to the project. Requirements:

- Compare with **`crypto.subtle.timingSafeEqual`** over encoded bytes, never `===`.
  A length-leaking compare on a short password is a real weakness.
- Let one path through unauthenticated: `POST /__gate`. Everything else is gated,
  including `/_next/*`, `/papers/*` and the favicon.
- Sign and verify with `crypto.subtle` HMAC — `importKey` once per request is fine.
- On a failed attempt, delay the response ~400ms before returning. Cheap, and it makes
  online guessing far slower without affecting a legitimate visitor.
- Return `Cache-Control: no-store` on the gate response so no cache holds a 401 for a
  visitor who has since authenticated.
- Never log the submitted passphrase, and never echo it back in the response.

### 4.5 Rate limiting — required, configured in Cloudflare not in code

Add a WAF rate-limiting rule on the zone:

```
Path equals /__gate  AND  method is POST
→ 10 requests per minute per IP, block for 10 minutes
```

Write this into `README.md` as a deployment step. The Function is the lock; this is what
stops someone trying ten thousand keys.

### 4.6 `SECURITY.md`

Rewrite the file that Phase 1 produced. It currently describes the client-side gate,
which no longer exists. Four to six sentences, plain: the gate is a Cloudflare Pages
Function so unauthenticated requests receive no content; the passphrase is a single
shared secret and its strength is the limiting factor; rotation is an environment
variable with no redeploy; rate limiting is a WAF rule, not code; and nothing here
replaces per-person access control if the audience widens.

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
  --hairline:      rgba(246, 243, 237, 0.06);   /* v3.4 — 0.03 did not read on screen */
  --hairline-moon: rgba(199, 208, 218, 0.07);   /* v3.4 — was 0.04 */
  --bg-header:     rgba(6, 5, 5, 0.72);
  --fig-plate:     #F7F5F1;   /* white-paper figure plate — the one light surface (§11.9) */

  /* Effects */
  --glow-sun:      radial-gradient(60% 50% at 50% 0%, rgba(227,178,60,0.26) 0%, rgba(227,178,60,0.08) 45%, transparent 76%);
  --glow-moon:     radial-gradient(60% 50% at 50% 0%, rgba(143,163,184,0.20) 0%, rgba(143,163,184,0.06) 45%, transparent 74%);
}

**v3.4 — the light field was too faint to exist.** At the original 0.03 hairline and
0.20 sun, the ground read as flat black on a real display at real brightness: the one
environmental effect the identity has was invisible, which is the opposite of
"preserve it exactly". The values above are the corrected ones. They are still far
under `--line` (0.09), and gold-tinted pixels are still a small minority of any
screen, so §5.1's restraint rule holds. Do not put them back.
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
- Never use pure `#FFFFFF` or pure `#000000`. `--fig-plate` is the only light surface in
  the system, it exists solely to carry the white-paper artwork (§11.9), and it appears
  nowhere else — not as a card, not as a callout, not as an inverted section.

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
- The gate screen (§11.8) draws its own copy of the hairlines inline. Keep its alpha in
  step with `--hairline` — it is the first surface anyone sees.

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

- **Left:** the SunRey wordmark, linking to `/`. **Use `public/wordmark.svg`** — the real
  mark, traced to vector from the supplied artwork. Do **not** set it in a typeface and do
  not reconstruct it: the `R` is replaced entirely by a sun disc with three descending
  rays, which no font reproduces. Aspect ratio is 6.7593:1 — always size it by height and
  let width follow, or it distorts. Header height 20px (135px wide). The mark keeps its own
  colours everywhere, **including on the MoonRey page**: a brand mark that changes colour
  per page stops being a brand mark.
- **Center:** the eight nav links (§1.1), `micro` size, uppercase, `--text-muted`, becoming
  `--text` on hover with a `--sun-500` underline that grows from the left. The active route's
  link is `--text` with a persistent underline.

  **Set in Jost, not the mono §5.2 assigns to micro labels.** The nav sits inches from
  the wordmark, and a monospace row beside a geometric lockup reads as two different
  systems. Mono keeps every other micro job — eyebrows, rails, data labels, pills.
- **Right:** nothing. The status pill specified here through v3.1 was removed at the
  owner's request along with the rest of the pre-production labelling. The right grid
  track stays, empty above the nav breakpoint and holding the hamburger below it, so
  the nav keeps sitting on the container's centre line.

The nav shows from **1024px** up and the hamburger overlay covers everything below.
That is the §6.2 breakpoint, and it only fits because the pill is gone: the row has
921px at 1024, the wordmark takes 135, and the eight labels measure 653 at the
tracking `Nav.tsx` is tuned to. Re-measure if a label is ever added or renamed.

Header height 76px desktop, 64px mobile. The header is fixed, so the nav travels with
the page.

### 6.2 Mobile navigation

**The overlay panel is rendered into `<body>` with `createPortal`, not in place.**
`MobileMenu` sits inside `<header>`, and past 24px of scroll the header takes
`backdrop-filter: blur(16px)` (§6.1) — which makes the header the containing block for
every `position: fixed` descendant. The panel's `fixed inset-0` then meant the 64px
header strip rather than the viewport, so the menu opened correctly at the top of a page
and, once scrolled, appeared not to open at all: its close button rendered over the live
page and the links were clipped away below. Portalling it out restores `fixed` to the
viewport at every scroll position. Do not move it back inline, and do not "fix" this by
moving the blur onto a child — that leaves the same trap set for the next fixed element
anyone puts in the header.

Below 1024px the centered links collapse to a hamburger on the right. Tapping it opens a
full-screen overlay: `--bg-sunken` with the glow field, links stacked at `display-m` size,
staggered in at 60ms intervals, close button top-right. Trap focus inside the overlay while
open, close on `Escape`, and restore focus to the trigger on close. Lock body scroll while
open.

### 6.3 Footer

Three tiers, on `--bg-sunken`:

**Tier 1 — the wordmark band.** `public/wordmark.svg` at 1240px wide, `opacity: .16`,
faded out downward with a `mask-image: linear-gradient(180deg, #000 0%, rgba(0,0,0,.35) 62%,
transparent 96%)`, inside a 196px-tall `overflow:hidden` box so the base is cut off by the
section edge. The real mark, not type. This is the closing visual note of every page.

**Tier 2 — links.** Four columns:

| Ecosystem | Assets | Documents | Company |
|---|---|---|---|
| Blockchain | SunRey Coin | White Papers | Legal & Disclosures |
| A.I. Agents | MoonRey Coin | | |
| Exchange | | | |
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
We would rather tell you exactly what runs today than describe a roadmap
as a product.

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

### 8.4 Section — The two indices

The proprietary argument of this page. It goes immediately after the capabilities grid.
Split panel: Human Information Index in gold on the left, A.I. & Production Layer Index in
silver on the right, divided by a hairline that dissolves at both ends.

```
EYEBROW: WHAT ONLY THIS CHAIN MEASURES
H2: Two indices, one ledger.

LEDE:
Most chains measure themselves — blocks, fees, throughput. SunRey Chain is designed
to measure the two economies it settles: what human participation is contributing,
and what productive capacity actually exists.
```

**Left panel — Human Information Index (gold):**

```
LABEL: HUMAN INFORMATION INDEX
H3:    What participation is worth,
       never what a person is worth.

BODY:
The human-side index is designed to read the demand and clearing conditions of the
information layer — which categories of authorized participation are being requested,
by how many buyers, against how many eligible contributors, and at what historical
compensation.

ROWS:
Reads       Buyer demand, eligible contributors, category demand, geographic demand, historical clearing conditions
Informs     Compensation proposals, cohort feasibility, contributor-facing opportunity ranking
Cannot do   Issue supply, set a market price, or assign a value to a person
```

**Right panel — A.I. & Production Layer Index (silver):**

```
LABEL: A.I. & PRODUCTION LAYER INDEX
H3:    What the machines can
       actually deliver.

BODY:
The productive-side index is designed to read verified capacity rather than asserted
capacity: energy generated, compute available, output produced, utilization observed —
each carrying its source lineage, because independent sources matter more than repeated
endpoints reporting the same upstream fact.

ROWS:
Reads       Energy, compute, transport, housing, manufacturing and service capacity, with utilization and lineage
Informs     Allocation, Access capacity bounds, productive-contribution valuation
Cannot do   Issue supply, set a market price, or stand in as an oracle of its own
```

**Closing callout, bordered `--line-gold`:**

```
Both indices represent market and capacity conditions. Neither represents guaranteed
asset value, and neither sits on the path that can change supply — an index is
evidence, and evidence cannot mint.
```

**Why the "Cannot do" row is not optional.** The source documents name "authority drift"
— a database, endpoint or index acquiring an unintended supply-changing path — as a
top-tier failure mode, and state that an index "should represent market conditions, not
guaranteed asset value." An index page that implied pricing or issuance power would
contradict §8.7's firewall list on the same page. Do not soften this row.

### 8.5 Section — Two consensus planes

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

### 8.6 Section — The five roots

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

### 8.7 Section — What cannot mint

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

### 8.8 Section — Status

```
EYEBROW: CURRENT STATE
H2: Testnet.

BODY:
SunRey Chain currently runs as a testnet-grade network with validator
consensus, persistent state and two native assets, inside an internal
sandbox environment. Mainnet is not active.

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
These are conceptual architecture papers. They describe intended design, not
shipped capability: regulated functions remain subject to jurisdiction-specific
legal basis, provider coverage, security review and production authorization.
Nothing here is legal, regulatory, securities, tax or investment advice, a token
offering, or an offer of any security or digital asset.
```

**Paper registry — ten documents, supplied September 2026.** The index page is a single
column of ten cards. Each card is a **link to that paper's article route** — the whole
card is the hit target, not a button inside it.

**The content is already generated.** `content/papers/` holds one typed module per paper
plus `index.ts` (the registry) and `types.ts`. Every module exports `blocks: PaperBlock[]`
— the paper's full body, converted from the supplied PDF into `section`, `p`, `list`,
`callout` and `figure` blocks. Do not retype, rewrite, summarise or "improve" any of it.
Render the blocks (§11.9).

**The diagrams are generated too.** `public/papers/figures/` holds 47 `.webp` files, one
per figure, extracted from the source PDFs at their own resolution and tinted to the
figure plate (§5.1) so they sit seamlessly on a light surface. Each `figure` block carries
`src`, `w` and `h`; render the artwork, never a placeholder (§11.9). Seven papers carry
figures — 01 (7), 02 (4), 03 (10), 06 (6), 08 (5), 09 (7), 10 (8). Papers 04, 05 and 07
have none: they argue in tables, and an empty figure slot is correct for them.

The generator lives in `scripts/papers/` — `convert.py` (PDF → blocks), `figures.py`
(PDF → artwork), `plate.py` (artwork → web assets), `emit.py` (typed modules). Re-run
them against `source-papers/` only when a paper is revised; the committed output is
authoritative in between.

Card contents, all from `index.ts`: the `n` numeral, `category` as the eyebrow, `date`,
`title`, `subtitle`, `abstract`, the "does not establish" line, and a footer row reading
`{sections} sections · ~{minutes} min read`. Those two figures are computed at generation
from the real text — they are facts, not estimates, and they are the only numbers
permitted on the card. **Do not add a page count and do not add a figure count.**

Reading order below is deliberate — overview, thesis, protocol, the two assets, the
bridge, the agents, compliance, awareness, security. `index.ts` is already in that order;
render it as given and do not sort.

**All ten publish in full.** Each carries its own cover disclaimer and each describes
itself as a public or conceptual architecture paper. None contains a valuation range, a
cap table, patent claim text or a confidentiality marking. The Access paper states on its
cover that it "intentionally omits production allocation coefficients, internal funding
assumptions and provider-specific commercial implementation details" — it has already
been prepared for publication. Nothing is held back and nothing is "available on
request": every paper is readable end to end behind the gate.

Each "does not establish" line below is quoted from that paper's own cover. Do not
paraphrase them and do not write new ones.

---

**01 — Overview · Version 1.0 · September 2026**
**SunRey Master White Paper: An Economic Operating System for the Post-AI Economy**
`/white-papers/sunrey-master-economic-operating-system`

> The unifying document. Sets out four domains of personal economic capability and the
> three flagship consumer experiences, then traces the whole architecture — SunRey Coin,
> the Human Information Network, the Vault, MoonRey, Access, Grow My Money, the
> blockchain and the Exchange — as one integrated economic loop rather than a portfolio
> of products.
>
> *Does not establish:* production capability. A public architecture and economic design
> paper; its closing section states the design boundaries and public commitments the
> project holds itself to.

---

**02 — Macroeconomic thesis · September 2026**
**The Dual Economy: Human Value + Autonomous Productive Value**
`/white-papers/sunrey-dual-economy`

> The economic argument beneath everything else. Examines what happens when production
> and labor separate, why the human and autonomous layers must stay distinct rather than
> collapsing into one asset, and how demand and supply loop between them — through
> scarcity, participation, systemic risk and a stated research agenda of falsifiable
> questions.
>
> *Does not establish:* empirical forecast. In its own words — "not an empirical forecast,
> monetary-policy recommendation, token offering, securities disclosure, or claim of
> legally enforceable asset backing."

---

**03 — Protocol architecture · Version 1.0 · September 2026**
**SunRey Blockchain: The Sovereign Economic State Machine**
`/white-papers/sunrey-blockchain-state-machine`

> The protocol, in full: identity and actor primitives, rights and consent as native
> objects, the rich transaction envelope, consensus and finality, the four market
> families of the Exchange, permission-aware matching, compute-to-data settlement, and
> evidence treated as an economic primitive rather than a log.
>
> *Does not establish:* settled parameters. A public technical architecture paper that
> closes on open architecture decisions and a protocol maturity path, not a specification
> frozen for implementation.

---

**04 — Human economic layer · September 2026**
**The Currency of You: SunRey Coin and the Human Information Network**
`/white-papers/sunrey-currency-of-you-hin`

> How a person's information becomes economic participation without becoming property.
> Traces the path from permission through verified contribution to authorized economic use
> and compensation, covering compute-to-data, contribution valuation, privacy, and the
> boundary between human economic value and monetary authority.
>
> *Does not establish:* monetary parameters. "Public architecture paper. Conceptual design;
> regulated capabilities and production monetary parameters remain subject to legal,
> security, governance, and jurisdiction-specific approval."

---

**05 — Autonomous productive layer · September 2026**
**MoonRey: The Autonomous Productive Economy**
`/white-papers/moonrey-autonomous-productive-economy`

> Productive capacity as an economic object. Builds the Global Productive Capacity Graph,
> the productive-value pipeline, the oracle mesh and its source-independence rules, then
> machine economic identity, machine-to-machine commerce and capacity-market instruments —
> asking what output systems can reliably provide, not what assets exist.
>
> *Does not establish:* asset backing. "Not a token offering, securities disclosure,
> investment recommendation, reserve statement or claim of legal asset backing."

---

**06 — Economic access · September 2026**
**SunRey Access: Governed Access to Productive Capacity**
`/white-papers/sunrey-access-productive-capacity`

> The bridge between participation and real-world capability. Argues the shift from
> ownership to governed economic access in an automated economy, and specifies an
> entitlement bounded four ways at once — by rights, by verified capacity, by policy and
> by solvency — with token state, entitlement state and fiat settlement kept separate.
>
> *Does not establish:* commercial terms. The paper states it "intentionally omits
> production allocation coefficients, internal funding assumptions and provider-specific
> commercial implementation details."

---

**07 — AI financial systems · September 2026**
**Grow My Money: An Architecture for Deterministically Authorized AI Financial Agents**
`/white-papers/grow-my-money-ai-financial-agents`

> Why AI financial advice is the wrong frame, and what replaces it. Moves from
> recommendation to bounded agency through permission-aware context, explainable
> opportunity discovery, deterministic risk limits, policy-gated execution and auditable
> evidence — making the question one of authority rather than intelligence.
>
> *Does not establish:* authorization. "Regulated capabilities require jurisdiction-specific
> licensing, service-provider coverage, legal review, model validation, security approval,
> and production activation. No investment return is guaranteed."

---

**08 — Compliance architecture · September 2026**
**Proof of Permission: A Compliance-Native Architecture for AI-Driven Financial Systems**
`/white-papers/proof-of-permission`

> The control doctrine as engineering. Separates intelligence, recommendation and
> execution authority, then specifies deterministic authorization, machine-readable legal
> capability, bounded execution authority, canonical ledger truth and reconstructable
> evidence — so AI can reason and propose without becoming the legal or monetary principal.
>
> *Does not establish:* legal permission. "This paper describes a technical control model;
> it does not itself establish legal permission, licensing, regulatory approval, or
> production authorization in any jurisdiction."

---

**09 — Monetary architecture · September 2026**
**Economic Awareness & Sovereign Monetary Architecture**
`/white-papers/economic-awareness-sovereign-monetary`

> Separating the ability to understand economic reality from the authority to change
> monetary state. Specifies the Economic Awareness Fabric, source lineage and
> corroboration, Information Consensus, canonical claims with anti-double-counting,
> valuation layers that hold no issuance power, and the evidence-to-money firewall.
>
> *Does not establish:* novelty or approval. "Conceptual design; regulated capabilities,
> production monetary parameters and claims of technical novelty remain subject to legal,
> security, governance and jurisdiction-specific review."

---

**10 — Security architecture · Version 1.0 · September 2026**
**SunRey Post-Quantum Security Architecture**
`/white-papers/sunrey-post-quantum-security`

> A crypto-agile, zero-trust security architecture built on a single premise: that no key,
> model, service, node, provider, database, employee or connection becomes unrestricted
> economic authority. Cryptography protects communication and state; deterministic
> authorization protects economic authority; evidence proves what occurred.
>
> *Does not establish:* certification. The paper sets an explicit claim discipline and
> publication boundary, and makes no assertion of completed external audit or attestation.

---

**No downloads. The papers are read on the site.** This is the deliberate model:
a reader clicks a card and the paper opens as an article at
`/white-papers/<slug>`, in the site's own typography, with the header and footer
intact. There is no PDF link, no "download" affordance, no file-size label and no
document-viewer chrome. They remain *labelled* as white papers throughout — the
eyebrow on every card and every article header reads `WHITE PAPER` — but they
behave like long-form articles, because that is what a reader actually wants.

**The PDFs do not ship.** They live at repository root in `source-papers/`, which is
**not** inside `public/` and is therefore never served. They are the source the content
was generated from and the thing to re-run the converter against if a paper is revised.
Do not move them back into `public/`, do not link to them, and do not add a download
button "just in case".

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

### 11.6 EXCHANGE (`/exchange`)

**Title:** `SunRey Exchange — Eligibility Before the Match`

New page; not present in spec v1.0. Its copy is drafted from the strategy report (three
markets), the architecture feature reference (components, surveillance) and patent family
P5 (pre-match rights and policy eligibility). Everything on it is written as designed and
in simulation, because the Home status board marks Exchange `SANDBOX — Simulation only`
and a present-tense Exchange page would contradict it 300px away.

**Hero:**

```
EYEBROW: SUNREY EXCHANGE

H1 (two-tone):
Eligibility before
the match.                          ← second line --sun-500

LEDE:
A generic exchange matches price and quantity. This one is designed to establish
rights, policy and jurisdiction before an order is allowed to rest — because what
trades here is not only assets.

RAIL: DIGITAL ASSETS · INFORMATION RIGHTS · COMPUTE · CAPACITY
```

**Section — The difference.**

```
EYEBROW: THE DIFFERENCE
H2: The check belongs before the book, not after it.

BODY (two columns):

On a conventional venue, compliance is something that happens around the matching
engine — screening at onboarding, surveillance after the fact, reconciliation at the
end of the day. That works when every instrument is the same kind of thing and every
participant is eligible for all of it.

It stops working when the order book holds information rights that expire, compute
that is jurisdiction-bound, and productive capacity that only some participants may
hold. SunRey Exchange is designed so that rights, consent state, purpose and
jurisdiction are evaluated *before* an order can rest — an ineligible order never
reaches the book.

CALLOUT (bordered, --line-gold):
All exchange functionality is designed to remain disabled by default until the
required regulated structure exists. What runs today is a simulation.
```

**Section — Three markets.** Three cards:

| Market | Copy |
|---|---|
| **Digital assets** | The two native assets and any future approved network assets, alongside the fiat pairs a regulated partner permits in a given jurisdiction. |
| **Information rights** | Time-limited access rights, research participation contracts and permitted training authorizations — the right to compute, never a copy of the record. |
| **Intelligence & compute** | Derived intelligence, eligibility proofs, cohort constructions and compute products. The marketplace that may ultimately sell answers rather than data. |

**Section — The components.** Two-column label/description rows, hairline separated:

```
EYEBROW: THE COMPONENTS
H2: What sits behind the book.

Matching engine        Price-time priority across permitted order types.
Order management       Lifecycle, amendment, cancellation and rejection with reasons.
Market data            Book state and trade prints, with provenance and freshness carried.
Custody adapter        Segregated participant balances, never commingled with corporate assets.
Fiat gateway           Settlement through the regulated partner appropriate to the jurisdiction.
Compliance gateway     Identity, sanctions, travel rule and jurisdiction state at the boundary.
Asset registry         Per-jurisdiction classification, permitted participants, transfer status.
Listing governance     What may list where, on whose authority, and under what disclosures.
Market surveillance    Pattern detection with human review, never opaque automated enforcement.
Reconciliation         Three-way agreement between book, ledger and custodian.
```

**Section — Surveillance.** Denial list, same treatment as §8.7, trailing label
`detection interface`:

```
EYEBROW: SURVEILLANCE
H2: Detection is designed in, not bolted on.

Wash trading · Spoofing · Layering · Self-trading · Abnormal volume ·
Coordinated accounts · Price manipulation

CLOSING:
AI assists the investigation. It does not close it. Detection surfaces a case to a
human reviewer with the evidence that raised it; no irreversible enforcement decision
is designed to rest on an opaque model output alone.
```

**Section — Listing discipline.** Bulleted:

```
· No exchange capability activates until the corresponding regulated structure exists
  in that jurisdiction.
· Participant assets and corporate assets are separately accounted at every point in
  the stack.
· An asset's classification is per-jurisdiction, and features enable or disable from
  that classification rather than from a global switch.
· Information rights carry their consent and expiry state into the market; an expired
  right cannot be matched.
· Every order, fill, amendment and rejection is designed to be reconstructable — what
  happened, under which policy version, and why it was permitted.
```

**Section — Current state.**

```
EYEBROW: CURRENT STATE
H2: Sandbox.

BODY:
SunRey Exchange runs today as a simulation inside the internal sandbox. Order entry,
matching and settlement are modelled end to end against simulated balances; no real
money, no real digital assets and no real information rights are involved, and no
market is open to participants outside the team.

Production exchange operation is disabled by default and stays that way until the
regulated entity, custody arrangements, surveillance obligations and listing
governance for a given jurisdiction are all in place — each one an explicit decision,
never a consequence of the software being ready.
```

---

### 11.7 NOT FOUND (`/not-found.tsx`)

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

### 11.8 THE GATE SCREEN (served by the Function, §4.2)

Not a Next route — a self-contained HTML document inside `functions/_middleware.ts`.
It must inline its own CSS and contain no site content whatsoever.

```
Full viewport, --bg-sunken ground, the glow field at full strength.

CENTRED COLUMN (max 430px):

  A 520px starburst, ABOVE the lockup — not behind it
  public/wordmark.svg at 44px tall, directly underneath the burst

  LABEL (Jost, 12px, letter-spaced, --text-faint):
  AUTHORIZED ACCESS

  BODY (15px, --text-muted, max 34ch):
  This site is confidential and provided to authorized recipients only.

  [ passphrase field — type="password", real <label>, visually hidden ]
  [ ENTER — full-width, --sun-500 ground, --onAccent label ]

  ERROR (aria-live="polite", --sun-300):
  That passphrase is not recognized.

  FOOTER (11px, --text-faint):
  SunRey Technologies
```

The burst is a discrete SVG, not the §5.5 glow: 64 tapered rays on four length tiers,
each drawn pointing up and rotated into place so its tip-to-base gradient follows the
ray. Three layers — a wide bloom, the rays, and a warm-white core halo. The four tiers
are what make it read as radiant rather than as an even clock-face of spokes.

---

---

### 11.9 THE ARTICLE ROUTE (`/white-papers/[slug]`)

Ten static routes, generated from `content/papers/index.ts` with
`generateStaticParams`. A reading view, not a document viewer.

**Header.** Not the marketing hero — a quieter article header.

```
EYEBROW (micro, --sun-500):
WHITE PAPER · {category}

H1 (display-l, single tone, max 20ch):
{title}

SUBTITLE (lede, --text-muted, max 56ch):
{subtitle}

META ROW (micro, --text-faint, · separated):
{date} · {sections} SECTIONS · ~{minutes} MIN READ

RULE (1px --line, full container width)
```

**Body.** One column, `max-width: 68ch`, centred in the container — not the
12-column grid. This is the one page on the site laid out for continuous reading.

| Block | Render |
|---|---|
| `section` | `padding-top: 72px`. The `n` numeral in `--sun-900` at 52px, then `label` as a `micro` eyebrow in `--sun-500` when non-empty, then `title` as an H2 at `display-m`, 34px. |
| `p` | `body` size, `--text-muted`, `margin-top: 22px`, `text-wrap: pretty`. |
| `list` | The §5 bullet treatment — a `--sun-500` interpunct, 16px gap, items in `--text-muted`. |
| `callout` | Bordered `--line-gold`, radius 16, padding 26/30. `label` as a `micro` eyebrow in `--sun-500`, `text` below in `--text`. `margin-block: 34px`. |
| `figure` | The artwork on a figure plate, then the caption. See below — this block has the most structure of the five. |

**The figure plate.** The diagrams are the papers' own artwork: dark line work, navy
fills and the same gold as the site, drawn on a light ground. Inverting them would
destroy the colour coding that carries their meaning, so the article shows them on a
light surface instead, and that surface is the one deliberate light element on the site.

```
<figure>                     margin-block: 40px
  plate                      background --fig-plate, radius 16, padding clamp(14px, 2.4vw, 26px),
                             border 1px --line-gold, no shadow
    <img src w h>            width 100%, height auto, loading="lazy", decoding="async"
                             alt = the caption text with the "Figure N." prefix removed
  <figcaption>               micro, --text-faint, italic, margin-top 14px, max 72ch
```

The image's own background was tinted to `--fig-plate` when the assets were generated,
so image and plate are the same colour and no seam shows. `w`/`h` are on every block —
put them on the `<img>` so the space is reserved and the page does not shift (§12.2).
Full-bleed is wrong here: the plate stays inside the 68ch measure like everything else,
except that a figure wider than 1.6:1 may run to `min(100%, 860px)` and centre.

**On a small screen** the diagrams are dense — several are eleven boxes wide. Below
768px the plate keeps its own `overflow-x: auto` container and the image holds its
natural width down to 680px, so the reader pans rather than squints. Do not add a
lightbox, a zoom control or a click-to-expand: panning is enough and every extra
affordance is JS on a page that ships almost none.

**Two source defects to leave alone.** Paper 09 uses the same artwork for Figures 1 and
3, and paper 10 for Figures 3 and 8 — that repetition is in the supplied PDFs, and the
site reproduces what was supplied. Do not delete the duplicate, do not substitute
another diagram, and do not silently renumber. Nick has been told; if he sends revised
PDFs, re-run the generator.

**Progress rail.** A 2px `--sun-500` bar fixed at the very top of the viewport, width
tracking scroll depth, under `prefers-reduced-motion` rendered but not animated. This
is the only ornament the article page gets.

**Footer of the article**, above the site footer:

```
RULE

LEFT:  ← Back to white papers      /white-papers
RIGHT: Next: {next paper title} →  /white-papers/{next slug}
       (omitted on the last paper)

DISCLAIMER (micro, --text-faint, max 72ch, margin-top 40px):
Does not establish: {notEstablished}
```

That last line is the paper's own cover disclaimer and it appears on **every** article,
at the end, in full. It is the reason these can be published without a download gate.

**What this page must not do.** No sidebar table of contents — thirty sections in a
sidebar is noise, and the numbered section headers already give structure. No reading
position memory. No comment affordance. No print stylesheet. No share buttons. No
"related papers" grid beyond the single Next link.

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

Phases 0 and 1 already ran against spec v1.0. **Phase 1 must be redone**: it built the
client-side gate, which v2.0 replaces. Phases 0's output (tokens, fonts, primitives,
content scaffolding, `check:claims`) is still correct and is kept.

Run `npm run build && npm run lint` at the end of each phase.

**Phase 1R — Gate, shell, host.** *(replaces the original Phase 1)*
Delete `src/lib/gate.ts`, `src/components/gate/`, `src/middleware.ts.example`, and the
`NEXT_PUBLIC_GATE_HASH` entry in `.env.example`. Build `functions/_middleware.ts` per §4
with the §11.8 gate screen inside it. Set `output: 'export'` per §3. Build `Header` with
the eight-item nav, `public/wordmark.svg`, the `PRE-PRODUCTION` pill, the mobile overlay,
and the three-tier `Footer`. Build `GlowField` with the sun shafts. Rewrite `SECURITY.md`
per §4.6. **Gate: `npx wrangler pages dev out` serves the gate screen for `/`, `/vault`
and a PDF path; the configured passphrase gets in; the session survives a reload; a wrong one is
refused with a ~400ms delay; and no page HTML appears in the unauthenticated response
body.**

**Phase 2 — Home.** §7, content from `content/home.ts`. This page sets the visual
language. **Gate: Lighthouse Accessibility 100 and Performance ≥ 95 on `/`; no horizontal
scroll at 360px; reduced motion renders the final state with no transition.**

**Phase 3 — Blockchain, SunRey Coin, MoonRey Coin, Exchange.** §8, §9, §10, §11.6.
Exchange is §11.6.
The MoonRey palette switch is a data attribute on `<main>` that reassigns the accent
tokens, never one-off overrides. Build the two indices (§8.4), the five roots, the denial
lists, the economic loop, and the coin heroes using the transparent `.webp` renders.
**Gate: MoonRey uses the silver ramp with no leaked gold except the sanctioned loop
diagram; every diagram carries a `<title>` and `aria-label`.**

**Phase 4 — A.I. Agents, Access, Vault.** §11.1–11.3.

**Phase 5 — White Papers, Legal, 404.** §11.4, §11.5, §11.7 and **§11.9**.
The paper content is already generated in `content/papers/` — build the index page and
the ten article routes that render it. Do not edit the generated modules, do not add a
download link, and do not move `source-papers/` into `public/`. **Gate: all ten article
routes render; all 47 figures load from `public/papers/figures/` with no broken image and
no layout shift; the last block of every article is its own "does not establish" line;
no route anywhere links to a `.pdf`.**

**Phase 6 — Verification and deploy.** Run §14 in full. Then write `README.md`: the two
Cloudflare environment variables, how to rotate the passphrase, the WAF rate-limit rule
(§4.5), how to edit copy in `content/`, how to add a white paper, and the Pages build
settings (`npm run build`, output directory `out`).

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
- [ ] An unauthenticated `curl` of `/`, `/vault`, `/exchange` and a `/papers/*.pdf` path
      returns 401 with the gate screen and **no site content in the body**.
- [ ] The configured passphrase authenticates; the session survives a reload and a new tab; it expires
      after 30 days; a tampered cookie is rejected.
- [ ] The passphrase appears nowhere in the repo, nowhere in `out/`, and in no log line.
- [ ] Comparison uses `timingSafeEqual`; a failed attempt is delayed ~400ms.
- [ ] `POST /__gate` is the only unauthenticated path.
- [ ] Gate responses carry `Cache-Control: no-store`.
- [ ] `SECURITY.md` describes the Function, not the retired client-side gate.
- [ ] `README.md` documents both env vars, rotation, and the §4.5 WAF rule.
- [ ] No `NEXT_PUBLIC_GATE_HASH`, `src/lib/gate.ts` or `middleware.ts.example` remains.

**Routing and nav**
- [ ] All eight nav routes (Exchange included) plus `/legal` and a styled 404 exist and render.
- [ ] Nav order matches §1.1 exactly, all eight items; nav is horizontally centered and
      does not overflow the container at 1440px.
- [ ] The active route is visually indicated.
- [ ] Every internal link resolves; no 404s from any page.

**Design**
- [ ] Every color, size and space value comes from a token. Zero hard-coded hex in components.
- [ ] The MoonRey page uses the silver ramp throughout with no gold leakage.
- [ ] No stock photography, no AI imagery, no 3D renders anywhere.
- [ ] All diagrams are hand-authored inline SVG using palette tokens.
- [ ] The header, gate and footer all use `public/wordmark.svg` — no type-set lockup
      anywhere, and the mark is never stretched off its 6.7593:1 ratio.
- [ ] The coin renders are the transparent `.webp` files; no black plate behind either.

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
- [ ] The ten §11.4 abstracts and the seven §11.5 legal sections are present verbatim, and
      each legal section carries a `{/* REVIEW: counsel */}` marker.
- [ ] All ten cards link to their article route; the whole card is the hit target.
- [ ] All ten article routes build statically and render every block type.
- [ ] All 47 figures render on their plate, each with `width`/`height` from the block, an
      `alt` derived from its caption, and `loading="lazy"`; none is a broken image.
- [ ] `--fig-plate` appears only inside a white-paper figure, nowhere else on the site.
- [ ] No `.pdf` link exists anywhere in `out/`; `source-papers/` is not inside `public/`.
- [ ] Each article ends with its own "does not establish" line, verbatim.
- [ ] Section numerals, reading time and section counts come from `index.ts`, never typed.
- [ ] The two indices (§8.4) include the "Cannot do" row on both panels.
- [ ] No page count, version number, or date appears on a paper card beyond the version and
      date given in §11.4.
- [ ] `README.md` documents passphrase rotation, copy editing, adding a paper, and the
      server-gate upgrade.

---

## 15. OPEN ITEMS

Settled since v1.0: the passphrase is chosen and set in Cloudflare (§4.3), the host is Cloudflare Pages,
the gate is server-side, the nav has eight items, the wordmark is the supplied vector,
and all ten white papers are supplied, converted to on-site articles, and read rather
than downloaded.

Still outstanding — build around these, do not guess:

1. **The contact address** for `/legal`. Placeholder `hello@sunrey.xyz` — confirm
   before launch.
2. **Explorer naming.** This spec uses `explorer.sunrey.xyz`; the internal launch
   checklist says `blockchain.sunrey.xyz`. They must not both exist. The Blockchain page
   links to neither until it is settled.
3. **Whether `/` keeps "Finance, evolved."** Kept, for brand continuity with the holding
   page it replaces.

4. **What is left of the disclosure, and where.** v3.3 removed every
   status-reporting section from the site (§0.2). The §2.3 block now renders in
   one place — `/legal` — and the footer of every page links to it in one neutral
   line. That is as far as a build should go on its own. The remaining question
   is for Nick and his counsel: keep it as it stands, have counsel rewrite it, or
   replace the §2.3 text with wording counsel supplies. Any of the three can be
   dropped into `content/site.ts` in a minute. What a build must not do is delete
   it unilaterally — see §0.2, item 1, for the reasoning.
5. **The white papers still carry the vocabulary** (~50 occurrences across the
   ten). §11.4 forbids editing the generated modules. Revising the source PDFs
   and re-running `scripts/papers/` is the only clean route, and it is the owner's
   call whether the papers are worth reopening for it.

---

*End of build instructions. Everything in §7–§11 is production copy. Everything in §2 is a
constraint, not a suggestion.*
