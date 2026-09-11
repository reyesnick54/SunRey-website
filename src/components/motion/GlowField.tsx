'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { economyForPath } from '@/lib/nav';

/**
 * The light field — CLAUDE.md §5.5.
 *
 * The signature environmental effect: a radial glow anchored top-centre, and
 * faint diagonal hairlines at ~18° from vertical, ~120px apart. Fixed,
 * pointer-events: none, z-index 0 — it sits behind everything and is never
 * interactive.
 *
 * On MoonRey routes the glow and hairlines switch to the silver ramp. The route
 * mapping is shared with the page's own `data-economy` attribute
 * (`economyForPath`), so the glow can never disagree with the page in front of it.
 *
 * Parallax: the glow translates at 0.25x scroll speed, driven by a CSS custom
 * property written from a rAF-throttled scroll listener. It is disabled outright
 * under prefers-reduced-motion — the listener is never attached, so there is no
 * work to throttle either.
 *
 * This is deliberately not built on motion/react: GlowField renders on every
 * route from the root layout, so a library here would land in the shared
 * first-load bundle for the whole site (§12.2). The entrance animations in
 * Phase 2 are the motion/react leaves §3 calls for.
 */

/** Cap the drift so the field never fully abandons a long page. */
const MAX_DRIFT_VH = 0.5;
const RATE = 0.25;

export function GlowField() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const economy = economyForPath(pathname);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = window.innerHeight * MAX_DRIFT_VH;
      const drift = Math.min(window.scrollY * RATE, max);
      node.style.setProperty('--glow-drift', `${-drift}px`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-economy={economy}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden [--glow-drift:0px]"
    >
      {/* Diagonal hairlines — ~18° from vertical, ~120px apart. */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(108deg,transparent_0px,transparent_119px,var(--hairline-accent)_119px,var(--hairline-accent)_120px)]" />

      {/* The sun. Translated at 0.25x scroll by --glow-drift. */}
      <div className="absolute inset-x-0 top-0 h-[70vh] translate-y-[var(--glow-drift)] bg-[image:var(--glow-accent)] will-change-transform" />
    </div>
  );
}
