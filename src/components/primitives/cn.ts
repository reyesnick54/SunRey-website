/**
 * Minimal class-name joiner. No `clsx` dependency — the site has no UI kit and
 * this is the only utility the primitives need.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
