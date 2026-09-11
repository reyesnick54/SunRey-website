/**
 * Access gate storage and verification — CLAUDE.md §4.3.
 *
 * READ §4.1 BEFORE CHANGING ANYTHING HERE. This is a client-side gate. It is an
 * obstacle, not security: the page bundle ships to every visitor, and anyone who
 * opens devtools can bypass this check entirely. Hashing the passphrase does not
 * make the gate secure — it only keeps the plaintext out of the JS bundle, which
 * matters because the same passphrase may be reused elsewhere.
 *
 * `crypto.subtle` requires a secure context: https:// and http://localhost only.
 * Over a plain-http LAN address the gate fails closed. See SECURITY.md.
 *
 * §4.4 and src/middleware.ts.example describe the upgrade to real protection.
 */

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
