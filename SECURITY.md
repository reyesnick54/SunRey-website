# Security

The access gate on this site is **client-side only**. All page content is present in the
delivered HTML and JavaScript payload and is retrievable by anyone who opens developer
tools, disables JavaScript, or reads the network response — no passphrase required. The
site is served `noindex, nofollow` and `robots.txt` disallows all crawlers, but nothing
genuinely confidential should ever be published here: no valuation figures, no cap table,
no financial projections, no patent claim text, no partner names, no unreleased dates.
CLAUDE.md §4.4 and `src/middleware.ts.example` describe the roughly fifteen-minute upgrade
to real, server-side protection, where content is never sent to an unauthenticated browser.

## Notes

- The passphrase is stored only as a SHA-256 digest in `NEXT_PUBLIC_GATE_HASH`. That keeps
  the plaintext out of the JS bundle — which matters if the passphrase is reused elsewhere
  — but it does not make the gate secure, because the check itself runs in the browser and
  can simply be skipped.
- `crypto.subtle` requires a secure context. The gate works on `https://` and on
  `http://localhost`. Over a plain-http LAN address (`http://192.168.x.x:3000`) it fails
  closed and no passphrase will be accepted.
- The unlock flag lives in `sessionStorage` and `localStorage` under `sunrey.access`, with
  a 30-day expiry. It never leaves the visitor's browser.
- Rotating the passphrase: see `README.md`.

## Reporting

Email `hello@sunrey.xyz`. *(Placeholder — confirm before launch, CLAUDE.md §15.3.)*
