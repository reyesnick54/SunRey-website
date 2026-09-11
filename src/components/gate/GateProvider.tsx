'use client';

import { useEffect, useState } from 'react';

import { AccessGate } from './AccessGate';
import { isUnlocked } from '@/lib/gate';

/**
 * Access gate boundary — CLAUDE.md §4.2.
 *
 * Three states, and the order is the whole point:
 *
 *   'checking'  The first tick, before the storage read resolves. Renders a
 *               black screen — NOT the site, and not the gate either, so a
 *               returning visitor never sees the gate flash before their
 *               content. This is also what the server renders, so the HTML
 *               document itself contains no page content to flash.
 *   'locked'    The gate screen, and nothing else.
 *   'unlocked'  The site.
 *
 * `children` is only ever rendered in the 'unlocked' state. Site content is
 * therefore never mounted behind the gate, cannot paint before it, and cannot be
 * reached by scrolling past it.
 *
 * This does NOT make the content secret — the RSC payload still ships to the
 * browser and is readable without the passphrase. See §4.1 and SECURITY.md.
 */

type State = 'checking' | 'locked' | 'unlocked';

export function GateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>('checking');

  useEffect(() => {
    setState(isUnlocked() ? 'unlocked' : 'locked');
  }, []);

  if (state === 'checking') {
    // Deliberately empty. A black screen for one tick beats a flash of either
    // the site or the gate. --bg is already painted on <body>.
    return <div className="min-h-dvh bg-bg" />;
  }

  if (state === 'locked') {
    return <AccessGate onUnlock={() => setState('unlocked')} />;
  }

  return <>{children}</>;
}
