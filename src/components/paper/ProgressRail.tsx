'use client';

import { useEffect, useRef } from 'react';

/**
 * ProgressRail — CLAUDE.md §11.9: "A 2px --sun-500 bar fixed at the very top
 * of the viewport, width tracking scroll depth... under prefers-reduced-motion
 * rendered but not animated. This is the only ornament the article page
 * gets."
 *
 * The one client leaf this task adds. Everything else on the article route
 * is a Server Component; this stays a small, self-contained island — a
 * rAF-throttled scroll listener writing one CSS custom property via a ref,
 * the same pattern `GlowField` already uses sitewide — so it does not turn
 * `PaperBlocks`, `ArticleHeader` or anything else into a client component.
 *
 * Under reduced motion the listener is never attached (mirroring
 * `GlowField`), so the rail renders at its static default and never moves —
 * "rendered but not animated," not merely slowed down.
 */
export function ProgressRail() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      bar.style.setProperty('--progress', `${pct}%`);
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
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-0.5">
      <div
        ref={barRef}
        className="h-full w-[var(--progress)] bg-accent-500 [--progress:0%]"
      />
    </div>
  );
}
