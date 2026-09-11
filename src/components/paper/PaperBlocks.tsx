import { Callout, Display, Eyebrow } from '@/components/primitives';
import type { PaperBlock } from '@content/papers';
import { PaperFigure } from './PaperFigure';

/**
 * PaperBlocks — CLAUDE.md §11.9's block-rendering table.
 *
 * The reading body of an article: one column, laid out by the page at 68ch,
 * rendering each of the five block types a generated paper module can emit.
 * Nothing here is copy — every string comes from the paper's own `blocks`
 * array in `content/papers/<slug>.ts`, generated from the supplied PDF and
 * never hand-edited (§11.4, §11.9).
 */
export function PaperBlocks({ blocks }: { blocks: readonly PaperBlock[] }) {
  return (
    <div className="flex flex-col">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;

        switch (block.type) {
          case 'section':
            return (
              <div key={key} className="flex flex-col gap-4 pt-[72px]">
                <p
                  aria-hidden="true"
                  className="font-display text-[52px] leading-none font-extralight text-accent-numeral"
                >
                  {block.n}
                </p>
                {block.label ? <Eyebrow>{block.label}</Eyebrow> : null}
                <Display as="h2" size="m" tone="plain" lines={[block.title]} />
              </div>
            );

          case 'p':
            return (
              <p key={key} className="mt-[22px] text-body text-muted text-pretty">
                {block.text}
              </p>
            );

          case 'list':
            return (
              <ul key={key} className="mt-[22px] flex flex-col gap-4">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span aria-hidden="true" className="mt-[0.65em] text-accent-500">
                      &middot;
                    </span>
                    <p className="text-body text-muted">{item}</p>
                  </li>
                ))}
              </ul>
            );

          case 'callout':
            return (
              <Callout key={key} className="my-[34px]">
                <Eyebrow>{block.label}</Eyebrow>
                <p className="mt-3 text-body text-text">{block.text}</p>
              </Callout>
            );

          case 'figure':
            return <PaperFigure key={key} block={block} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
