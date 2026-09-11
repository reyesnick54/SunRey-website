/**
 * Content types — CLAUDE.md §12.4.
 *
 * Every user-visible string on this site lives in `content/`, not in JSX. These
 * are the shared shapes; a page that needs a specialised block (the status
 * board, the autonomy ladder, the economic loop) declares that block's type in
 * its own content file and re-exports it.
 *
 * Copy in `content/` is production copy transcribed verbatim from CLAUDE.md
 * §7–§11. Do not paraphrase it and do not add filler.
 */

/** Per-page metadata — CLAUDE.md §12.3. */
export type PageMeta = {
  /** Absolute <title>, exactly as given in §7–§11. */
  title: string;
  /** Meta description. */
  description: string;
};

/**
 * A display heading, one entry per rendered line. The line break is part of the
 * composition (§5.2, signature treatment 1), so it is authored here.
 */
export type Heading = readonly string[];

/** The spaced rail beneath a hero — §5.2, signature treatment 2. */
export type Rail = readonly string[];

/** A hero block — §7.1 and the page heroes in §8–§11. */
export type Hero = {
  eyebrow: string;
  heading: Heading;
  lede: string;
  rail?: Rail;
};

/** The common section shape. Specialised blocks extend this per page. */
export type ContentSection = {
  /** Stable anchor and React key. */
  id: string;
  eyebrow?: string;
  heading?: Heading;
  lede?: string;
  body?: readonly string[];
};

/** A label / value row, hairline separated. */
export type Row = {
  label: string;
  value: string;
};

/** A titled item with one sentence of copy — cards, capability grids, pools. */
export type Item = {
  title: string;
  copy: string;
};

/** An internal link with its visible label. */
export type NavLink = {
  label: string;
  href: string;
};

/** The shape every page content file exports. */
export type PageContent = {
  meta: PageMeta;
  hero?: Hero;
  sections: readonly ContentSection[];
};

/** A defined term — CLAUDE.md §12.5. */
export type GlossaryEntry = {
  /** The term as it is written in prose. */
  term: string;
  /** The one canonical definition. If a page needs a different one, this is wrong. */
  definition: string;
};
