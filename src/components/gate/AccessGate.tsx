'use client';

import { useId, useRef, useState } from 'react';

import { GATE } from '@content/site';
import { Wordmark } from '@/components/layout/Wordmark';
import { persistUnlock, verify } from '@/lib/gate';

/**
 * The gate screen — CLAUDE.md §4.2.
 *
 * Full viewport, site visual identity: black ground, gold radial glow, centred
 * wordmark, one passphrase field, one button. This is the ONLY thing rendered
 * while the visitor is locked — site content is not mounted behind it, so it
 * cannot flash, and it cannot be reached by scrolling.
 */

export function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const errorId = useId();

  const configured = Boolean(process.env.NEXT_PUBLIC_GATE_HASH);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    let ok = false;
    try {
      ok = await verify(value);
    } catch {
      // crypto.subtle is unavailable outside a secure context (§4.3). Fail closed.
      ok = false;
    }
    setBusy(false);

    if (ok) {
      persistUnlock();
      onUnlock();
      return;
    }

    setError(configured ? GATE.error : GATE.unconfigured);
    setShake((n) => n + 1);
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-bg-sunken px-[var(--container-pad)]">
      {/* The gate carries its own light field; GlowField is not mounted yet. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[image:var(--glow-sun)]"
      />

      <div className="relative flex w-full max-w-[min(30rem,100%)] flex-col items-center gap-10">
        <Wordmark className="h-8 w-auto text-text sm:h-9" />

        <form onSubmit={onSubmit} className="flex w-full flex-col items-center gap-4">
          <label htmlFor={inputId} className="sr-only">
            {GATE.label}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            key={shake}
            name="passphrase"
            type="password"
            autoComplete="current-password"
            autoFocus
            spellCheck={false}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(null);
            }}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? true : undefined}
            className={[
              'w-full rounded-full border bg-bg/60 px-5 py-3 text-center',
              'text-body text-text placeholder:text-faint',
              'transition-colors duration-[var(--dur-hover)] ease-sunrey',
              error ? 'border-line-gold' : 'border-line hover:border-line-gold',
              // The mismatch shake. `key={shake}` restarts the animation; the
              // reduced-motion block in globals.css collapses it to nothing.
              error ? 'motion-safe:animate-[sunrey-shake_420ms_ease-in-out]' : '',
            ].join(' ')}
          />

          <button
            type="submit"
            disabled={busy}
            className={[
              'rounded-full border border-line-gold px-6 py-2.5',
              'font-mono text-micro font-medium tracking-micro text-sun-500 uppercase',
              'transition-[background-color,color] duration-[var(--dur-hover)] ease-sunrey',
              'hover:bg-sun-500 hover:text-bg disabled:opacity-60',
            ].join(' ')}
          >
            {GATE.submit}
          </button>

          {/* Always present so the error is announced, not just revealed. */}
          <p
            id={errorId}
            role="status"
            aria-live="polite"
            className="min-h-5 text-center text-micro text-sun-300"
          >
            {error}
          </p>
        </form>
      </div>

      <noscript>
        <p className="relative mt-8 text-center text-micro text-faint">{GATE.noscript}</p>
      </noscript>
    </div>
  );
}
