/**
 * Regenerate functions/wordmark.ts from public/wordmark.svg.
 *
 * The gate screen (CLAUDE.md §11.8) is served by the Pages Function to
 * unauthenticated visitors, and §4.4 lets exactly one path through
 * unauthenticated — POST /__gate. Every asset, /wordmark.svg included, sits
 * behind the gate, so the mark has to be inlined into the Function rather than
 * linked. Run this whenever the traced mark changes.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/wordmark.svg', 'utf8').trim();

writeFileSync(
  'functions/wordmark.ts',
  `/**
 * The SunRey wordmark, inlined for the gate screen — CLAUDE.md §6.1, §11.8.
 *
 * GENERATED from public/wordmark.svg. Do not hand-edit: re-run
 * \`node scripts/inline-wordmark.mjs\` if the mark is ever retraced.
 *
 * It is inlined rather than linked because the gate screen is served by the
 * Function to unauthenticated visitors, and §4.4 lets exactly one path through
 * unauthenticated — POST /__gate. /wordmark.svg is gated like every other
 * asset, so a <img src> there would render broken behind the lock.
 */

export const WORDMARK_SVG = ${JSON.stringify(svg)};
`,
);

console.log(`functions/wordmark.ts written (${svg.length} bytes of SVG)`);
