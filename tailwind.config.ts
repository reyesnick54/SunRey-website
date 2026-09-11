import type { Config } from 'tailwindcss';

/**
 * Tailwind v4 derives its design tokens from the `@theme` block in
 * `src/app/globals.css`, not from this file. This config exists only to declare
 * the source globs explicitly (so `content/` is scanned even though it sits
 * outside `src/`) and is loaded via `@config` from `globals.css`.
 *
 * Do not add colors, spacing or font families here. They live in `@theme`.
 */
const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
};

export default config;
