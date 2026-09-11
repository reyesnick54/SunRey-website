# Security

The site is gated by a Cloudflare Pages Function (`functions/_middleware.ts`) that runs
in front of every request, so an unauthenticated visitor receives the gate screen and no
site content at all — not page HTML, not an asset, not a white paper. Access is one
shared passphrase, which means the strength of the whole boundary is the strength of that
one secret: it is short, and a wordlist would reach it, which is why the Function
compares it in constant time, delays every failed attempt by ~400ms, and why the WAF
rate-limit rule on `POST /__gate` documented in `README.md` is not optional. Rotating the
passphrase is editing the `GATE_PASSWORD` environment variable in the Cloudflare
dashboard — it takes effect on the next request with no redeploy, and rotating
`GATE_SECRET` alongside it signs every existing session out at once. Neither value is in
this repository, in the build output, or in any log line.

A shared passphrase suits a small, known group reading documents. It has no per-person
revocation and no access log, so once it circulates it cannot be un-circulated, only
rotated — which locks everyone out together. If the audience widens beyond roughly twenty
people, or the first forwarded email escapes, replace this with Cloudflare Access for
per-person login and an audit trail. Nothing here is suitable for the other SunRey
properties: `dashboard.sunrey.xyz` reads durable state and needs per-person, revocable
access control from its first day, and it must never share this passphrase, this cookie,
or this Function.
