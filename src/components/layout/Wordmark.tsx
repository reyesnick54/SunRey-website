import { LABELS } from '@content/site';

/**
 * The SunRey wordmark — CLAUDE.md §6.1.
 *
 * This renders `public/wordmark.svg`, the real mark traced to vector from the
 * supplied artwork. §6.1 forbids both alternatives explicitly: it must not be
 * set in a typeface, and it must not be reconstructed by hand, because the R is
 * replaced entirely by a sun disc with three descending rays that no font
 * reproduces and no approximation gets right.
 *
 * ASPECT is 6.7593:1 and is load-bearing. Always drive the mark from one
 * dimension and let the other follow — `height` in the header and the gate,
 * `width` in the footer band — so it can never be stretched off ratio (§14).
 *
 * The mark keeps its own colours everywhere, including on the MoonRey page: a
 * brand mark that changes colour per page stops being a brand mark (§6.1).
 * Because it is an <img>, the `data-economy` accent swap cannot reach inside
 * it — which is exactly the behaviour we want.
 */

export const WORDMARK_ASPECT = 6.7593;

type Props = {
  /** Rendered height in px. Width is derived from ASPECT. */
  height?: number;
  /** Rendered width in px, for the footer band. Height is derived. */
  width?: number;
  className?: string;
  priority?: boolean;
};

export function Wordmark({ height, width, className, priority = false }: Props) {
  const w = width ?? Math.round((height ?? 20) * WORDMARK_ASPECT);
  const h = height ?? Math.round((width ?? 135) / WORDMARK_ASPECT);

  return (
    // eslint-disable-next-line @next/next/no-img-element -- SVG; the optimizer is off under static export (§3).
    <img
      src="/wordmark.svg"
      alt={LABELS.home}
      width={w}
      height={h}
      className={className}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}
