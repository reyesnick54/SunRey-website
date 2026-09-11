import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', '.wrangler/**', 'next-env.d.ts'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // The design system forbids raw values in components; these keep the
      // codebase honest about the smaller stuff.
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXAttribute[name.name='style']",
          message:
            'Inline styles are not permitted in components. Use Tailwind utilities backed by tokens in globals.css. (Exception: CSS custom property assignment in layout/ and motion/ — disable this rule inline with a reason.)',
        },
      ],
    },
  },
];

export default config;
