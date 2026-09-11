import localFont from 'next/font/local';

/**
 * Self-hosted variable fonts — CLAUDE.md §5.2, §3.
 *
 * No runtime Google Fonts request is made. The woff2 files in `public/fonts/`
 * are latin-subset variable faces copied from the `@fontsource-variable/*`
 * devDependencies; re-copy from `node_modules` to update them.
 *
 * `display: 'swap'` plus `adjustFontFallback` keeps the hero LCP text off the
 * critical font path without a layout shift — §12.2 requires CLS < 0.05 and
 * the LCP element is hero display type.
 */

export const jost = localFont({
  src: [
    {
      path: '../../public/fonts/jost-latin-variable.woff2',
      weight: '200 400',
      style: 'normal',
    },
  ],
  variable: '--font-jost',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Trebuchet MS', 'Century Gothic', 'Avenir Next', 'sans-serif'],
});

export const inter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-latin-variable.woff2',
      weight: '400 500',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: '../../public/fonts/jetbrains-mono-latin-variable.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
});

/** Every font variable, ready to drop on <html>. */
export const fontVariables = [jost.variable, inter.variable, jetbrainsMono.variable].join(' ');
