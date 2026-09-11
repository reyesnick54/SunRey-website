import { cn } from '@/components/primitives';
import type { PaperBlock } from '@content/papers';

type FigureBlock = Extract<PaperBlock, { type: 'figure' }>;

/**
 * The caption's own "Figure N." prefix, stripped for the `alt` text — §11.9:
 * "alt = the caption text with the 'Figure N.' prefix removed".
 */
function altFromCaption(caption: string): string {
  return caption.replace(/^Figure\s+\d+\.\s*/i, '');
}

/**
 * PaperFigure — CLAUDE.md §11.9, "the figure plate."
 *
 * The one deliberate light surface on the site (`--fig-plate`, §5.1). The
 * artwork was tinted to that colour when the assets were generated, so image
 * and plate share one background and no seam shows.
 *
 * `w`/`h` reserve the space so the page never shifts (§12.2). A figure wider
 * than 1.6:1 is allowed to break out of the 68ch reading column up to
 * 860px, centred on the viewport — which, because the whole page container
 * is itself centred, is the same point as the container's centre. Below
 * 768px that breakout is disabled and the plate falls back to its own
 * `overflow-x: auto`, with the image held to its natural width down to
 * 680px, so the reader pans a dense diagram rather than squinting at it.
 */
export function PaperFigure({ block }: { block: FigureBlock }) {
  const { src, w, h, caption } = block;
  const wide = w / h > 1.6;
  const alt = altFromCaption(caption);

  return (
    <figure className="my-10">
      <div
        className={cn(
          'overflow-x-auto rounded-[var(--radius-card)] border border-line-gold bg-fig-plate p-[clamp(14px,2.4vw,26px)]',
          wide &&
            'md:relative md:left-1/2 md:w-screen md:max-w-[860px] md:-translate-x-1/2',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static export; intrinsic w/h reserve the layout space without next/image's optimizer. */}
        <img
          src={src}
          width={w}
          height={h}
          loading="lazy"
          decoding="async"
          alt={alt}
          className="h-auto max-w-full min-w-[680px] md:w-full md:min-w-0"
        />
      </div>
      <figcaption className="mt-3.5 max-w-[72ch] font-mono text-micro text-faint italic">
        {caption}
      </figcaption>
    </figure>
  );
}
