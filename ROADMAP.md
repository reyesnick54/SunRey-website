# SunRey Web — Sequencing

**Version 1.0 · September 2026**
Four properties, what blocks what, and the order to build them in.

---

## The shape of it

```
                        sunrey.xyz          ← ships first, alone
                     (gated marketing)         depends on nothing
                            │
                            │ links out to, never embeds
                ┌───────────┼───────────────┐
                ▼           ▼               ▼
         app.sunrey.xyz   explorer.     dashboard.
         (mobile demo)    sunrey.xyz    sunrey.xyz
              │               │              │
           EXISTS        blocked on     blocked on
                        persistent      durable API
                         testnet         domains +
                                       team accounts
```

The single most important decision already made: **the marketing site does not wait for
the platform.** It has no backend, reads no chain state, and shows no live figure. That
is what lets it ship while the testnet and the durable domains are still in progress.

---

## Property 1 — `sunrey.xyz` · buildable today

Ten screens, gated, static. Full specification in `CLAUDE.md` v2.0.

| Phase | What | Gate to pass |
|---|---|---|
| 0 | Foundation — tokens, fonts, primitives, claims checker | ✅ done |
| 1R | **Redo** gate as a Cloudflare Pages Function; shell; wordmark | Unauthenticated `curl` returns no content |
| 2 | Home | Lighthouse A11y 100, no scroll at 360px |
| 3 | Blockchain, SunRey Coin, MoonRey Coin, Exchange | Silver ramp clean on MoonRey |
| 4 | A.I. Agents, Access, Vault | — |
| 5 | White Papers, Legal, 404 | Papers 05–10 render nothing |
| 6 | Verification, README, deploy | Full §14 checklist |

**Phase 1 has to be redone.** It built a client-side gate against spec v1.0. v2.0 replaces
that with a server-side Function. The Phase 0 output is unaffected and is kept.

### Deploying it

1. Push the repo to a private GitHub repo — `sunrey-web`.
2. Cloudflare Pages → Create project → connect the repo.
   Build command `npm run build`, output directory `out`.
3. Environment variables, encrypted, **Production and Preview both**:
   `GATE_PASSWORD` and `GATE_SECRET` (`openssl rand -hex 32`).
4. Custom domains: `sunrey.xyz` and `www.sunrey.xyz`.
5. WAF rate-limiting rule: `POST /__gate` → 10/min per IP, 10-minute block.
   **This is not optional.** It is what makes a short passphrase survive contact with
   the internet.
6. Verify: `curl -s https://sunrey.xyz/vault | grep -c "Purpose Firewall"` must return 0.

### The thing to watch

The passphrase is one shared secret with no per-person revocation. Once it circulates it
cannot be un-circulated — only rotated, which locks everyone out at once. That is
workable for a small known group and stops being workable somewhere around twenty people
or the first forwarded email. When that happens, Cloudflare Access replaces the Function
with per-person email login and an access log, and costs nothing up to 50 users. Rotating
`GATE_SECRET` in the meantime signs every existing session out.

---

## Property 2 — `app.sunrey.xyz` · exists

The Lovable-built mobile/PWA demo. Nothing in this programme touches it. The marketing
site links to it; it does not share code, auth or deployment with it.

---

## Property 3 — `explorer.sunrey.xyz` · blocked

A block explorer with nothing to explore is a blank page with good typography. This one
needs, in order:

1. A **persistent testnet** — validator process, durable chain state, blocks advancing,
   restart recovery, health monitoring. Item B on the internal launch checklist, marked
   to-do.
2. **SR/MR faucets** producing real transaction hashes. Item C.
3. Then the explorer itself: latest block, height, block time, validators, transactions,
   network status, both supplies, and search across block / tx hash / address.

**Settle the name first.** The internal checklist says `blockchain.sunrey.xyz`; you said
`explorer.sunrey.xyz`. Both must not exist — one is the canonical host and the other is
at most a redirect. The Blockchain page on the marketing site links to neither until
this is decided.

**Its content discipline is the same as the marketing site's.** A visible `SunRey Testnet`
label, never `Mainnet`. Simulated-value disclosure on every page. An explorer that looks
like a mainnet explorer is the most likely place on the whole estate for someone to
mistake a sandbox for a live network.

---

## Property 4 — `dashboard.sunrey.xyz` · blocked

The desktop Personal Economic Operating System — not an enlarged phone screen. Blocked on
durable Agent, HIN, Access, FX and remaining Exchange mutation paths, plus individual team
accounts with the six roles. Checklist items E and Phase 5.

Structure when it comes: Home · Money · Grow · Agent · Exchange · SunRey/MoonRey · Access ·
Vault · Profile.

**It must not share the marketing site's gate.** Different audience, different auth model.
One shared password across both means either your team shares a login or your investors
get accounts — and the dashboard reads real durable state, so its access control has to be
per-person and revocable from day one.

---

## What I need from you

1. **Six white paper titles**, with dates and categories. Four are written. The registry
   is built to hold ten and renders only what exists, so the site ships correctly without
   them and gains them later.
2. **Explorer vs blockchain** as the subdomain.
3. **A real contact address** for the Legal page and for "Available on request" —
   `hello@sunrey.xyz` is a placeholder in the spec.

---

## Order of operations, plainly

**Now:** Phase 1R through 6 on the marketing site. One phase per prompt in Claude Code,
stopping at each gate. Roughly a day of supervised work.

**On first deploy:** Cloudflare Pages project, two env vars, WAF rule, domains.

**Then, and only then:** the persistent testnet. It unblocks the explorer, the faucets and
a large share of the remaining checklist. It is the highest-leverage next thing on the
platform side, and nothing on the marketing site is waiting for it.

**Last:** the dashboard, once accounts and durable domains land.

---

*Companion to `CLAUDE.md` v2.0, which is the authoritative build specification for
`sunrey.xyz`. Where the two disagree, `CLAUDE.md` wins.*
