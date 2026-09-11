import { LABELS } from '@content/site';

/**
 * The SunRey wordmark — CLAUDE.md §6.1.
 *
 * Hand-authored inline SVG reproducing the existing lockup: S U N, the
 * gold-dotted R glyph, E Y, letter-spaced. Not set in a font (§6.1), so it
 * renders identically everywhere and costs one request less than a webfont.
 *
 * Geometry was measured off the current holding-page lockup and normalised to a
 * 100-unit cap height (cap top y=0, baseline y=100). S U N E Y are a monoline —
 * a uniform 6.06-unit stroke — so they are stroked centrelines rather than
 * filled outlines, which keeps the path data small and the curves exact.
 *
 * The R is a filled glyph and the only coloured element: a sun disc cut by the
 * ray rhythm, plus three parallel rays clipped to the stem line at x=0 and to
 * the ray baseline. It deliberately breaks the cap height — the disc rises
 * above it and the rays fall below it — exactly as in the original.
 *
 * The R stays gold on MoonRey routes. The palette switch in §10 applies to page
 * content (`data-economy` on <main>), not to the brand mark.
 */

const STROKE = 6.06;

/** Letter origins along the baseline — the lockup's letter-spacing. */
const X = { S: 0, U: 150.5, N: 306.1, R: 457.6, E: 598.5, Y: 737.4 } as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -13 830 119"
      role="img"
      aria-label={LABELS.home}
      className={className}
      focusable="false"
    >
      <title>SunRey</title>

      {/* S U N E Y — monoline, --text via currentColor */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      >
        {/* S — squared geometric bowls joined by a shallow diagonal spine */}
        <path
          d={`M ${X.S + 87.0} 23.7 L ${X.S + 87.0} 20.7
              A 17.7 17.7 0 0 0 ${X.S + 69.3} 3.0
              L ${X.S + 20.7} 3.0
              A 17.7 17.7 0 0 0 ${X.S + 3.0} 20.7
              L ${X.S + 3.0} 36.4
              L ${X.S + 87.0} 62.4
              L ${X.S + 87.0} 79.3
              A 17.7 17.7 0 0 1 ${X.S + 69.3} 97.0
              L ${X.S + 20.7} 97.0
              A 17.7 17.7 0 0 1 ${X.S + 3.0} 79.3
              L ${X.S + 3.0} 76.3`}
        />

        {/* U — two stems closed by a true semicircle */}
        <path
          d={`M ${X.U + 3.03} 0 L ${X.U + 3.03} 50.4
              A 47.6 47.6 0 0 0 ${X.U + 98.2} 50.4
              L ${X.U + 98.2} 0`}
        />

        {/* N — full-height right stem, main diagonal, and a second ray-parallel
            diagonal that turns down into the short left stem. */}
        <path d={`M ${X.N + 90.2} 0 L ${X.N + 90.2} 100`} />
        <path d={`M ${X.N + 3.03} 0 L ${X.N + 90.2} 91.7`} />
        <path d={`M ${X.N + 70.8} 100 L ${X.N + 2.78} 27.8 L ${X.N + 2.78} 100`} />

        {/* E — the middle arm carries an upturned terminal */}
        <path
          d={`M ${X.E + 89.9} 3.03 L ${X.E + 3.03} 3.03 L ${X.E + 3.03} 98.0 L ${X.E + 89.9} 98.0`}
        />
        <path d={`M ${X.E + 60.6} 39.4 L ${X.E + 60.6} 59.1 L ${X.E + 3.03} 59.1`} />

        {/* Y */}
        <path d={`M ${X.Y + 2.5} 0 L ${X.Y + 46.0} 46.5 L ${X.Y + 89.4} 0`} />
        <path d={`M ${X.Y + 46.0} 46.5 L ${X.Y + 46.0} 100`} />
      </g>

      {/* R — the gold glyph. Disc, then three rays, clipped to the stem line. */}
      <g fill="var(--sun-500)">
        <path
          d={`M ${X.R + 24.83} 6.76 A 34.3 34.3 0 1 1 ${X.R + 66.55} 54.08 Z`}
        />
        <path
          d={`M ${X.R + 0} 6.6 L ${X.R + 6.1} 6.6 L ${X.R + 93.4} 105.6
              L ${X.R + 78.8} 105.6 L ${X.R + 0} 16.3 Z`}
        />
        <path
          d={`M ${X.R + 0} 35.2 L ${X.R + 62.1} 105.6 L ${X.R + 47.5} 105.6 L ${X.R + 0} 51.7 Z`}
        />
        <path
          d={`M ${X.R + 0} 72.4 L ${X.R + 29.3} 105.6 L ${X.R + 14.6} 105.6 L ${X.R + 0} 89.0 Z`}
        />
      </g>
    </svg>
  );
}
