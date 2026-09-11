import type { GlossaryEntry } from './types';

/**
 * Glossary — CLAUDE.md §12.5.
 *
 * Single source of truth for every term that appears on two or more pages. Each
 * term has exactly one canonical definition, and every page that uses the term
 * imports it from here rather than restating it. If a page seems to need a
 * different definition, the definition is wrong — fix it here, once.
 *
 * All fifteen §12.5 terms are added verbatim in the phase that first needs them.
 */
export const glossary: Record<string, GlossaryEntry> = {};
