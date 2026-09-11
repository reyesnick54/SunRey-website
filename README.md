# sunrey-website

The gated marketing and documentation site for SunRey — `sunrey.xyz`.

Eight pages plus ten white papers, read as articles. Static HTML behind one
shared passphrase. No backend, no chain data, no live figures.

`CLAUDE.md` is the authoritative specification. Where this file and that one
disagree, `CLAUDE.md` wins.

---

## Running it

```bash
npm install
npm run dev              # http://localhost:3000 — no gate, the gate is Cloudflare's
npm run build            # claims check, then a static export into out/
npm run lint
npm run verify           # responsive + accessibility sweep over out/ (needs a build first)
```

`npm run build` runs `check:claims` first, so a banned claim fails the build
before anything is exported. That is deliberate — see **Claims discipline**.

To exercise the gate locally you need the Cloudflare runtime, not `next dev`:

```bash
npm run build
npx wrangler pages dev out \
  --binding GATE_PASSWORD="whatever-you-like" GATE_SECRET="$(openssl rand -hex 32)"
```

---

## Deploying

### 1. Push to GitHub

The repository must be **private**. `CLAUDE.md` quotes the confidential strategy
report, and every white paper is behind the gate for a reason.

```bash
git remote add origin git@github.com:<you>/sunrey-website.git
git push -u origin main
```

### 2. Create the Cloudflare Pages project

Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 20 or later |

### 3. Set the two environment variables

Settings → Environment variables. Add both as **encrypted**, to **Production and
Preview**. Neither is ever committed, and neither is `NEXT_PUBLIC_`.

| Name | Value |
|---|---|
| `GATE_PASSWORD` | the shared passphrase |
| `GATE_SECRET` | 32 random bytes of hex — `openssl rand -hex 32` |

A deploy with either missing serves `503 Gate is not configured` rather than
letting anyone through. The gate fails closed by design.

### 4. Add the rate-limit rule — not optional

Security → WAF → Rate limiting rules → Create:

```
If   URI Path equals /__gate   AND   Request Method equals POST
Then Block for 10 minutes
When it exceeds 10 requests per 1 minute per IP
```

The Function is the lock. This is what stops someone trying ten thousand keys
against a short passphrase. Do not skip it.

### 5. Custom domains

Add `sunrey.xyz` and `www.sunrey.xyz` in the Pages project. DNS and SSL are
already at Cloudflare, so this is two clicks and a propagation wait.

### 6. Verify the gate from outside

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://sunrey.xyz/            # 401
curl -s https://sunrey.xyz/vault | grep -c 'Purpose Firewall'          # 0
```

If either line disagrees, stop and fix it before sending the link to anyone.

---

## Rotating the passphrase

Edit `GATE_PASSWORD` in the Cloudflare dashboard. It takes effect on the next
request. **No rebuild, no redeploy, no code change** — that is the whole reason
it lives in an environment variable.

Rotating `GATE_SECRET` as well invalidates every existing session cookie, which
is how you sign everyone out at once. Do that if the passphrase has leaked
rather than merely aged.

One shared passphrase has no per-person revocation and no access log. Once it
circulates it cannot be un-circulated, only rotated — which locks out everyone
together. That is workable for a small known group and stops being workable
somewhere around twenty people, or the first forwarded email. At that point
Cloudflare Access replaces the Function with per-person email login and an audit
trail, free up to 50 users. See `SECURITY.md`.

---

## Editing the copy

Every user-visible string lives in `content/`, one file per page, typed. No copy
is hard-coded in a component — that is enforced by review, and `§12.4` is the
rule.

```
content/home.ts           content/access.ts        content/legal.ts
content/blockchain.ts     content/vault.ts         content/not-found.ts
content/sunrey-coin.ts    content/exchange.ts      content/site.ts     ← footer, header, disclosure
content/moonrey-coin.ts   content/ai-agents.ts     content/glossary.ts ← terms used on 2+ pages
content/white-papers.ts
```

Change the string, run `npm run build`, push. Cloudflare rebuilds on push.

A term that appears on two or more pages belongs in `content/glossary.ts` and is
imported, so definitions cannot drift.

---

## Claims discipline

`npm run check:claims` scans `content/` for every banned term in `CLAUDE.md`
§2.2 and fails the build on a match. The rules and the exemptions are in
`scripts/claims.ts`.

The site deliberately uses some flagged words inside denials — "SunRey is not a
bank", "Not backed by people." — so `ALLOWED` carries those exact strings with
the section they come from. If the checker fires on a legitimate denial, add the
verbatim phrase to `ALLOWED` with its citation. **Never widen a rule to let a
claim through.**

### The white papers are scanned on different terms

`content/papers/` is generated from the supplied PDFs and §11.4 forbids editing
it. Those documents are more disciplined than the checker: every claim-shaped
match inside them turned out to be one of their own denials — "not automatically
backed by people", "Never imply a guaranteed return", "does not represent a
mainnet launch". So the papers are scanned for **superseded naming only**, and
the result is a notice rather than a build failure.

That notice currently reports about 80 occurrences — `Solstice`, `Compliance
Kernel`, `Personal Data Vault`, `Consent Ledger`, `Sovereign Cells`, `Pyramid`,
`PYR`, `clean room` — almost all in the papers' own glossaries and bibliographies,
where they cite historical documents by their real titles.

**This is an open editorial decision, not a bug.** §14 says no superseded name
should be user-visible; §11.4 says do not edit the papers. Both cannot hold. The
options are: leave them as the authors wrote them, revise the source PDFs and
re-run the generator, or add a short note to the white-papers index explaining
the historical naming. Nobody has decided yet.

---

## Adding or revising a white paper

The ten papers and their 47 diagrams are generated, never hand-written.

1. Put the new or revised PDF in `source-papers/`.
2. Add its metadata to `META` and its card copy to `ABSTRACT` in
   `scripts/papers/emit.py`.
3. Run the generator:

```bash
cd scripts/papers
python3 convert.py        # PDF text  → structured blocks
python3 figures.py        # PDF pages → the figures, at source resolution
python3 plate.py          # figures   → web assets, tinted to --fig-plate
python3 emit.py           # blocks + figures → typed TS modules
```

4. Copy `scripts/papers/ts/*` into `content/papers/` and
   `scripts/papers/web-figures/*.webp` into `public/papers/figures/`.

Reading order is deliberate and `index.ts` is already in it — the index page
renders it as given and does not sort. Section counts and reading times are
computed from the real text; never type them by hand.

**There are no PDFs on this site.** `source-papers/` sits at the repository
root, outside `public/`, and is never served. Do not move it in, do not link to
it, and do not add a download button.

---

## What is deliberately not here

No blog, no careers page, no contact form, no newsletter, no CMS, no analytics,
no live chain data, no wallet connection, no token purchase flow, no team page,
no press page. `CLAUDE.md` §1.2.

This site is one of four SunRey properties and shares nothing with the other
three. In particular its gate is not their gate: `dashboard.sunrey.xyz` reads
durable state and needs per-person, revocable access control from day one. Never
reuse this passphrase, this cookie, or this Function anywhere else.
