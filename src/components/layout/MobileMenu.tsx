'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { LABELS, STATUS_PILL } from '@content/site';
import { Pill } from '@/components/primitives';
import { NAV } from '@/lib/nav';
import { isActive } from './Nav';

/**
 * Mobile navigation — CLAUDE.md §6.2, §12.1.
 *
 * Below 1280px the centred links collapse to this — see the breakpoint note in
 * Header.tsx for why that is not §6.2's 1024px. Opening it renders a
 * full-screen --bg-sunken overlay with the glow, links stacked at display-m,
 * staggered in at 60ms intervals.
 *
 * Accessibility requirements, all of them load-bearing:
 *   - focus is trapped inside the overlay while it is open
 *   - Escape closes it
 *   - focus returns to the trigger on close
 *   - body scroll is locked while it is open
 *   - the trigger carries aria-expanded
 */

const FOCUSABLE = 'a[href], button:not([disabled])';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Route change closes the menu. Focus restoration is handled by the effect
  // below, which runs on every transition out of the open state.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const trigger = triggerRef.current;
    const { body, documentElement } = document;

    // Lock scroll, compensating for the scrollbar so the page cannot shift.
    const gap = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    // Move focus into the overlay.
    panel.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = Array.from(panel!.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;

      // Wrap at both ends, and pull focus back in if it has escaped entirely.
      if (event.shiftKey && (active === first || !panel!.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel!.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? LABELS.closeMenu : LABELS.openMenu}
        className="relative -mr-2 grid size-11 place-items-center rounded-full text-text xl:hidden"
      >
        <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={LABELS.primaryNav}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-bg-sunken xl:hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[image:var(--glow-sun)]"
          />

          <div className="relative flex h-[var(--header-h)] shrink-0 items-center justify-end px-[var(--container-pad)]">
            <button
              type="button"
              onClick={close}
              aria-label={LABELS.closeMenu}
              className="-mr-2 grid size-11 place-items-center rounded-full text-text"
            >
              <span aria-hidden="true" className="relative block size-5">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav
            aria-label={LABELS.primaryNav}
            className="relative flex-1 px-[var(--container-pad)] pt-6 pb-16"
          >
            <ul className="flex flex-col gap-5">
              {NAV.map((route, i) => {
                const active = isActive(pathname, route.href);
                return (
                  <li
                    key={route.href}
                    className="motion-safe:animate-[sunrey-rise_420ms_var(--ease)_both]"
                    /* eslint-disable-next-line no-restricted-syntax -- per-item
                       stagger delay (§6.2, 60ms intervals); a utility class per
                       index would be seven dead classes in the stylesheet. */
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <Link
                      href={route.href}
                      aria-current={active ? 'page' : undefined}
                      className={`font-display text-display-m tracking-display-m ${
                        active ? 'text-sun-500' : 'text-text'
                      }`}
                    >
                      {route.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12">
              <Pill tone="status" dot pulse>
                {STATUS_PILL}
              </Pill>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
