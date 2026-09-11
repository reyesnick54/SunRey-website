import type { NavLink, PageMeta } from './types';

/**
 * Not Found (`/not-found`) — CLAUDE.md §11.7. Production copy, transcribed
 * verbatim.
 */
export type NotFoundContent = {
  meta: PageMeta;
  eyebrow: string;
  /** Two lines, two-tone — the second line accented (§5.2 treatment 1). */
  heading: readonly [string, string];
  lede: string;
  link: NavLink;
};

export const notFound: NotFoundContent = {
  meta: {
    title: 'Nothing Here — SunRey',
    description: 'That page does not exist. The eight that do are in the navigation above.',
  },

  eyebrow: '404',
  heading: ['Nothing here.', 'Yet.'],
  lede: 'That page does not exist. The eight that do are in the navigation above.',
  link: { label: 'Return home →', href: '/' },
};
