export type PaperBlock =
  | { type: 'section'; n: string; label: string; title: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; label: string; text: string }
  | { type: 'figure'; caption: string; src: string; w: number; h: number };

export type PaperMeta = {
  n: string;            // "01" — reading order, shown on the card
  slug: string;         // route segment under /white-papers/
  category: string;     // eyebrow on the card and the article header
  date: string;
  version?: string;
  title: string;
  subtitle: string;
  abstract: string;     // card copy
  notEstablished: string;  // quoted from the paper's own cover
  words: number;
  minutes: number;      // reading time, computed at generation
  sections: number;
  figures: number;      // diagrams carried over from the source PDF
};
