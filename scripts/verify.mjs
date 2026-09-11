/**
 * §14 verification sweep — responsive, accessibility, and the checks that need
 * a real browser rather than a grep.
 *
 * Serves `out/` statically (the gate is a Cloudflare concern and is verified
 * separately with `wrangler pages dev`), then for every route:
 *   - checks for horizontal overflow at each §14 width
 *   - runs axe-core for WCAG 2.1 A/AA violations
 *   - checks the landmark and heading rules
 *   - confirms every SVG carries role="img", a <title> and an aria-label
 *   - confirms every <img> has width, height and alt
 *
 * Screenshots land in .verify/ for eyeballing.
 */
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

const ROOT = new URL('../out/', import.meta.url).pathname;
const PORT = 4321;
const WIDTHS = [360, 390, 768, 1024, 1440, 1920];

const ROUTES = [
  '/', '/blockchain', '/sunrey-coin', '/moonrey-coin', '/exchange',
  '/ai-agents', '/access', '/vault', '/white-papers', '/legal',
  '/white-papers/proof-of-permission',
  '/white-papers/sunrey-post-quantum-security',
  '/this-route-does-not-exist',
];

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.ico': 'image/x-icon', '.json': 'application/json',
};

function serve() {
  return createServer(async (req, res) => {
    let path = decodeURIComponent((req.url ?? '/').split('?')[0]);
    let file = join(ROOT, normalize(path).replace(/^(\.\.[/\\])+/, ''));
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file) && existsSync(`${file}.html`)) file = `${file}.html`;
    if (!existsSync(file)) {
      const notFound = join(ROOT, '404.html');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(existsSync(notFound) ? await readFile(notFound) : 'not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  }).listen(PORT);
}

const problems = [];
const note = (route, kind, detail) => problems.push({ route, kind, detail });

const server = serve();
await mkdir(new URL('../.verify/', import.meta.url).pathname, { recursive: true });
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const context = await browser.newContext();

for (const route of ROUTES) {
  const page = await context.newPage();
  const failedRequests = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failedRequests.push(`${r.status()} ${r.url()}`);
  });

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });

    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      if (de.scrollWidth <= de.clientWidth + 1) return null;
      // Name the widest offender so the fix is obvious.
      let worst = null;
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.right > de.clientWidth + 1 || r.left < -1) {
          const over = Math.max(r.right - de.clientWidth, -r.left);
          if (!worst || over > worst.over) {
            worst = { over: Math.round(over), tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 80) };
          }
        }
      }
      return { doc: de.scrollWidth, view: de.clientWidth, worst };
    });
    if (overflow) note(route, `overflow@${width}`, JSON.stringify(overflow));

    if (width === 1440) {
      await page.screenshot({
        path: new URL(`../.verify/${route.replace(/\//g, '_') || '_home'}.png`, import.meta.url).pathname,
        fullPage: true,
      });
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });

  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  for (const v of axe.violations) {
    note(route, `axe:${v.impact}`, `${v.id} — ${v.help} (${v.nodes.length} node(s)) e.g. ${v.nodes[0]?.target?.join(' ')}`);
  }

  const structure = await page.evaluate(() => {
    const out = {};
    out.h1 = document.querySelectorAll('h1').length;
    out.main = document.querySelectorAll('main').length;
    out.nav = document.querySelectorAll('nav').length;
    out.footer = document.querySelectorAll('footer').length;
    out.svgMissing = [...document.querySelectorAll('svg')]
      .filter((s) => !s.hasAttribute('aria-hidden'))
      .filter((s) => s.getAttribute('role') !== 'img' || !s.querySelector('title') || !s.getAttribute('aria-label'))
      .map((s) => (s.getAttribute('aria-label') || s.querySelector('title')?.textContent || '(unlabelled)').slice(0, 40));
    out.imgMissing = [...document.querySelectorAll('img')]
      .filter((i) => !i.getAttribute('width') || !i.getAttribute('height') || i.getAttribute('alt') === null)
      .map((i) => i.getAttribute('src'));
    const order = [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => Number(h.tagName[1]));
    out.headingJumps = order.filter((lvl, i) => i > 0 && lvl - order[i - 1] > 1).length;
    return out;
  });

  if (structure.h1 !== 1) note(route, 'structure', `${structure.h1} <h1> elements`);
  if (structure.main !== 1) note(route, 'structure', `${structure.main} <main> elements`);
  if (structure.headingJumps) note(route, 'structure', `${structure.headingJumps} heading-level jump(s)`);
  for (const s of structure.svgMissing) note(route, 'svg', `missing role/title/aria-label: ${s}`);
  for (const i of structure.imgMissing) note(route, 'img', `missing width/height/alt: ${i}`);
  // The 404 route is *supposed* to 404 — that is what is being verified.
  const unexpected = failedRequests.filter((f) => !f.endsWith(route));
  for (const f of unexpected) note(route, 'request', f);

  await page.close();
}

await context.close();
await browser.close();
server.close();

if (problems.length === 0) {
  console.log(`verify — ${ROUTES.length} routes × ${WIDTHS.length} widths. No problems.`);
} else {
  const byKind = {};
  for (const p of problems) byKind[p.kind.split('@')[0].split(':')[0]] ??= 0, byKind[p.kind.split('@')[0].split(':')[0]]++;
  console.log(`verify — ${problems.length} problem(s):`, JSON.stringify(byKind));
  for (const p of problems) console.log(`  ${p.route.padEnd(46)} ${p.kind.padEnd(16)} ${p.detail}`);
}
await writeFile(new URL('../.verify/report.json', import.meta.url).pathname, JSON.stringify(problems, null, 1));
