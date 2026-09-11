/**
 * `npm run check:claims` — CLAUDE.md §12.4.
 *
 * Scans `content/` for every banned term in §2.2 and exits non-zero on a match.
 * Wired into `npm run build`, so a claims violation fails the build.
 *
 * Scope is `content/` by design: §12.4 puts every user-visible string there, and
 * §14 requires that no copy is hard-coded in a component. Widening the scan to
 * `src/` would fire on identifiers and CSS tokens, and a checker that cries wolf
 * gets suppressed.
 *
 * Rules and exemptions live in `./claims.ts`. Add to them there, not here.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ALLOWED,
  BANNED,
  normalise,
  phraseToPattern,
  rulePattern,
  type ClaimRule,
} from './claims.ts';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'content');
const EXTENSIONS = ['.ts', '.tsx', '.md', '.mdx'];

type Span = { start: number; end: number };

type Violation = {
  file: string;
  line: number;
  column: number;
  excerpt: string;
  matched: string;
  rule: ClaimRule;
};

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      out.push(full);
    }
  }
  return out.sort();
}

/** Every span in `text` covered by an ALLOWED phrase. */
function allowedSpans(text: string): Span[] {
  const spans: Span[] = [];
  for (const { phrase } of ALLOWED) {
    const pattern = phraseToPattern(phrase);
    for (const match of text.matchAll(pattern)) {
      if (match.index === undefined) continue;
      spans.push({ start: match.index, end: match.index + match[0].length });
    }
  }
  return spans;
}

function isExempt(spans: readonly Span[], start: number, end: number): boolean {
  return spans.some((span) => start >= span.start && end <= span.end);
}

/** Line and column (both 1-based) for a character offset. */
function locate(text: string, offset: number): { line: number; column: number } {
  const before = text.slice(0, offset);
  const line = before.split('\n').length;
  const column = offset - (before.lastIndexOf('\n') + 1) + 1;
  return { line, column };
}

function excerptAt(text: string, offset: number): string {
  const lineStart = text.lastIndexOf('\n', offset) + 1;
  const lineEnd = text.indexOf('\n', offset);
  return text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd).trim();
}

function scan(file: string): Violation[] {
  const raw = readFileSync(file, 'utf8');
  const text = normalise(raw);
  const spans = allowedSpans(text);
  const violations: Violation[] = [];

  for (const rule of BANNED) {
    for (const match of text.matchAll(rulePattern(rule))) {
      if (match.index === undefined) continue;
      const start = match.index;
      const end = start + match[0].length;
      if (isExempt(spans, start, end)) continue;

      const { line, column } = locate(text, start);
      violations.push({
        file: relative(ROOT, file).split(sep).join('/'),
        line,
        column,
        excerpt: excerptAt(text, start),
        matched: match[0],
        rule,
      });
    }
  }

  return violations;
}

function main(): void {
  let files: string[];
  try {
    files = walk(CONTENT_DIR);
  } catch {
    console.error(`check:claims — content directory not found at ${CONTENT_DIR}`);
    process.exit(2);
  }

  const violations = files
    .flatMap(scan)
    .sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column);

  if (violations.length === 0) {
    console.log(
      `check:claims — ${BANNED.length} rules, ${ALLOWED.length} exemptions, ` +
        `${files.length} file${files.length === 1 ? '' : 's'} scanned. No violations.`,
    );
    return;
  }

  console.error(
    `\ncheck:claims — ${violations.length} claims violation${violations.length === 1 ? '' : 's'} ` +
      `in ${new Set(violations.map((v) => v.file)).size} file(s).\n`,
  );

  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}:${v.column}`);
    console.error(`    matched   "${v.matched}"  [${v.rule.id}]`);
    console.error(`    in        ${v.excerpt}`);
    console.error(`    why       ${v.rule.reason}`);
    console.error(`    see       CLAUDE.md ${v.rule.ref}\n`);
  }

  console.error(
    'CLAUDE.md §2 is a constraint, not a suggestion. Rewrite the copy, or — if this\n' +
      'is a permitted denial construction — add the verbatim string to ALLOWED in\n' +
      'scripts/claims.ts with the section it comes from.\n',
  );

  process.exit(1);
}

main();
