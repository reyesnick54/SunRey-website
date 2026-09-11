/**
 * The access gate — CLAUDE.md §4.
 *
 * A Cloudflare Pages Function that runs in front of EVERY request to this
 * project. An unauthenticated request never receives page HTML, never receives
 * an asset, never receives anything but the gate screen below. That is the
 * whole point of doing this here rather than in the client: with a client-side
 * gate the content ships regardless and the lock is decorative.
 *
 * Two environment variables, both encrypted, both set in the Cloudflare Pages
 * dashboard and never in this repo (§4.3):
 *
 *   GATE_PASSWORD  the shared passphrase
 *   GATE_SECRET    32 random bytes, hex — signs the session cookie
 *
 * Rotating GATE_PASSWORD takes effect on the next request with no rebuild.
 * Rotating GATE_SECRET additionally invalidates every existing session, which
 * is how you evict everyone at once.
 */

import { WORDMARK_SVG } from './wordmark';

interface Env {
  GATE_PASSWORD: string;
  GATE_SECRET: string;
}

/**
 * Minimal local typing for the Pages Functions runtime.
 *
 * Declared here rather than pulled from @cloudflare/workers-types: this is the
 * only Function in the project and it uses three fields. A types-only
 * dependency that has to stay version-matched with the runtime is a
 * maintenance cost with nothing to show for it at this size.
 */
type PagesContext<E> = {
  request: Request;
  env: E;
  next: () => Promise<Response>;
};

type PagesFunctionHandler<E> = (context: PagesContext<E>) => Promise<Response>;

const COOKIE = 'sunrey_session';
const SESSION_DAYS = 30;
const FAIL_DELAY_MS = 400;

/* ---------------------------------------------------------------------------
   Session cookie: "<expiry>.<hmac>"

   The HMAC is SHA-256 over the expiry using GATE_SECRET. Nothing about the
   passphrase is stored in it. The cookie is verified, never trusted: an
   expired or badly signed value is treated exactly like no cookie at all.
   --------------------------------------------------------------------------- */

const encoder = new TextEncoder();

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(expiry: string, secret: string): Promise<string> {
  const mac = await crypto.subtle.sign('HMAC', await hmacKey(secret), encoder.encode(expiry));
  return toHex(mac);
}

/**
 * Constant-time comparison. `crypto.subtle.timingSafeEqual` is available in
 * the Workers runtime; where it is not, fall back to an XOR accumulation that
 * touches every byte. Never `===` on a secret: a length-leaking or
 * early-exit compare on a short passphrase is a real weakness (§4.4).
 */
function timingSafeEqual(a: ArrayBuffer, b: ArrayBuffer): boolean {
  if (a.byteLength !== b.byteLength) return false;

  const subtle = crypto.subtle as SubtleCrypto & {
    timingSafeEqual?: (x: ArrayBuffer, y: ArrayBuffer) => boolean;
  };
  if (typeof subtle.timingSafeEqual === 'function') {
    return subtle.timingSafeEqual(a, b);
  }

  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  // Touches every byte regardless of where the first difference is.
  for (let i = 0; i < x.length; i += 1) diff |= (x[i] as number) ^ (y[i] as number);
  return diff === 0;
}

/**
 * Compare two secrets without leaking their length through the comparison.
 * Both sides are hashed first, so the timing-safe compare always runs over
 * two equal-length digests whatever the inputs were.
 */
async function secretsMatch(submitted: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(submitted)),
    crypto.subtle.digest('SHA-256', encoder.encode(expected)),
  ]);
  return timingSafeEqual(a, b);
}

async function hasValidSession(request: Request, secret: string): Promise<boolean> {
  const header = request.headers.get('Cookie');
  if (!header) return false;

  const raw = header
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE}=`));
  if (!raw) return false;

  const value = raw.slice(COOKIE.length + 1);
  const [expiry, mac] = value.split('.');
  if (!expiry || !mac) return false;

  const expiresAt = Number(expiry);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const expected = await sign(expiry, secret);
  return timingSafeEqual(encoder.encode(mac).buffer as ArrayBuffer, encoder.encode(expected).buffer as ArrayBuffer);
}

async function sessionCookie(secret: string): Promise<string> {
  const expiry = String(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const mac = await sign(expiry, secret);
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `${COOKIE}=${expiry}.${mac}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

/* ---------------------------------------------------------------------------
   The gate screen — CLAUDE.md §11.8.

   One self-contained document. It inlines its own CSS, embeds no site content,
   and links to no asset that the Function would have to let through
   unauthenticated. The wordmark and the sun mark are inline SVG for exactly
   that reason: /wordmark.svg is behind the gate like everything else.
   --------------------------------------------------------------------------- */

/**
 * The starburst — CLAUDE.md §11.8.
 *
 * A burst, not a wheel of spokes. Each ray is a tapered triangle drawn pointing
 * up and then rotated into place, so the tip-to-base gradient follows the ray
 * instead of running across the whole figure. Lengths cycle on four tiers, which
 * is what gives the burst its irregular, radiant read rather than the even
 * clock-face a single length produces.
 *
 * Three layers stack into the light: a wide bloom, a tight bright core halo, and
 * the rays between them. The core is warm white rather than pure white (§5.1).
 */
function sunMark(): string {
  const RAYS = 64;
  const rays: string[] = [];

  for (let i = 0; i < RAYS; i += 1) {
    const angle = (i / RAYS) * 360;

    // Four tiers of length. The longest sit on the 16ths, so the burst reads as
    // a few dominant shafts over a dense field of shorter ones.
    let len: number;
    if (i % 16 === 0) len = 288;
    else if (i % 8 === 0) len = 232;
    else if (i % 4 === 0) len = 176;
    else if (i % 2 === 0) len = 126;
    else len = 88;

    const half = len > 240 ? 5.2 : len > 170 ? 3.8 : len > 110 ? 2.8 : 2.0;
    const base = 300 - 12; // rays start just outside the core, not at dead centre

    rays.push(
      `<g transform="rotate(${angle.toFixed(2)} 300 300)">` +
        `<polygon points="300,${300 - len} ${300 - half},${base} ${300 + half},${base}" fill="url(#ray)"/>` +
        `</g>`,
    );
  }

  return `<svg class="sun" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="bloom" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F0D68B" stop-opacity=".34"/>
      <stop offset="26%" stop-color="#E3B23C" stop-opacity=".16"/>
      <stop offset="58%" stop-color="#E3B23C" stop-opacity=".05"/>
      <stop offset="100%" stop-color="#E3B23C" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="core" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FDF3D8" stop-opacity="1"/>
      <stop offset="22%" stop-color="#FBEFCF" stop-opacity=".92"/>
      <stop offset="52%" stop-color="#E3B23C" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#E3B23C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E3B23C" stop-opacity="0"/>
      <stop offset="55%" stop-color="#E3B23C" stop-opacity=".38"/>
      <stop offset="88%" stop-color="#F0D68B" stop-opacity=".85"/>
      <stop offset="100%" stop-color="#FDF3D8" stop-opacity=".95"/>
    </linearGradient>
  </defs>
  <circle cx="300" cy="300" r="300" fill="url(#bloom)"/>
  <g>${rays.join('')}</g>
  <circle cx="300" cy="300" r="86" fill="url(#core)"/>
</svg>`;
}

/**
 * The wordmark — the real traced vector from public/wordmark.svg, inlined by
 * scripts/inline-wordmark.mjs. Not set in a typeface: the R is a sun disc with
 * three descending rays, which no font reproduces (§6.1). Aspect ratio
 * 6.7593:1, sized by height here so it can never be stretched.
 */
function wordmark(): string {
  return WORDMARK_SVG.replace('<svg ', '<svg class="wordmark" ');
}

function gateScreen(error: boolean, next: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
<title>SunRey</title>
<style>
  :root {
    --bg-sunken: #030303;
    --text: #F6F3ED;
    --text-muted: #A39C90;
    --text-faint: #7E776D;
    --sun-300: #F0D68B;
    --sun-500: #E3B23C;
    --line: rgba(246,243,237,.09);
    color-scheme: dark;
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    background: var(--bg-sunken);
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    overflow-x: hidden;
  }
  .field {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(60% 50% at 50% 0%, rgba(227,178,60,.20) 0%, rgba(227,178,60,.05) 45%, transparent 75%);
  }
  .shafts {
    position: fixed; inset: -10% -20%; pointer-events: none; z-index: 0; opacity: .5;
    background: repeating-linear-gradient(18deg, transparent 0 118px, rgba(246,243,237,.03) 118px 119px);
  }
  main { position: relative; z-index: 1; width: 100%; max-width: 430px; text-align: center; }
  /* The burst sits above the lockup, not behind it: a fixed-height box the
     oversized SVG is centred in and allowed to overflow, then the wordmark
     directly underneath. */
  .mark {
    position: relative; height: 210px; margin-bottom: 10px;
  }
  .sun {
    position: absolute; left: 50%; top: 50%; width: 520px; height: 520px;
    transform: translate(-50%, -50%); max-width: none; pointer-events: none;
  }
  .lockup { position: relative; line-height: 0; }
  .wordmark { height: 44px; width: auto; }
  @media (max-width: 460px) {
    .mark { height: 168px; }
    .sun { width: 420px; height: 420px; }
    .wordmark { height: 38px; }
  }
  .label {
    font-family: Jost, 'Trebuchet MS', 'Century Gothic', sans-serif;
    font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
    color: var(--text-faint); margin: 26px 0 14px;
  }
  p.intro {
    font-size: 15px; line-height: 1.6; color: var(--text-muted);
    max-width: 34ch; margin: 0 auto 28px;
  }
  form { display: flex; flex-direction: column; gap: 12px; }
  input[type="password"] {
    width: 100%; padding: 14px 16px; font: inherit; font-size: 15px;
    color: var(--text); background: rgba(246,243,237,.04);
    border: 1px solid var(--line); border-radius: 10px; text-align: center;
    letter-spacing: .08em;
  }
  input[type="password"]:focus-visible,
  button:focus-visible { outline: 2px solid var(--sun-500); outline-offset: 3px; }
  button {
    width: 100%; padding: 14px 16px; border: 0; border-radius: 10px;
    background: var(--sun-500); color: #060505; cursor: pointer;
    font-family: Jost, 'Trebuchet MS', sans-serif;
    font-size: 12px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase;
  }
  button:hover { background: var(--sun-300); }
  .error { min-height: 20px; font-size: 13px; color: var(--sun-300); margin-top: 4px; }
  footer { margin-top: 40px; font-size: 11px; line-height: 1.7; color: var(--text-faint); }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
</head>
<body>
  <div class="field"></div>
  <div class="shafts"></div>
  <main>
    <div class="mark">${sunMark()}</div>
    <div class="lockup">${wordmark()}</div>
    <div class="label">Authorized access</div>
    <p class="intro">This site is confidential and provided to authorized recipients only.</p>
    <form method="POST" action="/__gate">
      <input type="hidden" name="next" value="${escapeAttr(next)}">
      <label class="sr" for="passphrase">Passphrase</label>
      <input id="passphrase" name="passphrase" type="password" autocomplete="current-password"
             autofocus required spellcheck="false" autocapitalize="off">
      <button type="submit">Enter</button>
      <div class="error" role="status" aria-live="polite">${error ? 'That passphrase is not recognized.' : ''}</div>
    </form>
    <footer>SunRey Technologies</footer>
  </main>
</body>
</html>`;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Only same-origin absolute paths are accepted as a redirect target, so the
 * gate can never be used as an open redirect.
 */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

function gateResponse(error: boolean, next: string): Response {
  return new Response(gateScreen(error, next), {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const onRequest: PagesFunctionHandler<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  if (!env.GATE_PASSWORD || !env.GATE_SECRET) {
    // Fail closed. A missing secret must never mean "let everyone in".
    return new Response('Gate is not configured.', {
      status: 503,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  // The one unauthenticated path (§4.4).
  if (url.pathname === '/__gate' && request.method === 'POST') {
    const form = await request.formData();
    const submitted = String(form.get('passphrase') ?? '');
    const target = safeNext(String(form.get('next') ?? '/'));

    // Never logged, never echoed back.
    if (await secretsMatch(submitted, env.GATE_PASSWORD)) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: target,
          'Set-Cookie': await sessionCookie(env.GATE_SECRET),
          'Cache-Control': 'no-store',
        },
      });
    }

    // Cheap, and it makes online guessing far slower without a legitimate
    // visitor ever noticing (§4.4).
    await sleep(FAIL_DELAY_MS);
    return gateResponse(true, target);
  }

  if (await hasValidSession(request, env.GATE_SECRET)) {
    return next();
  }

  return gateResponse(false, url.pathname + url.search);
};
