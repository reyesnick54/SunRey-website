import type { ElementType, ReactNode } from 'react';

import { cn } from './cn';

/**
 * Section — CLAUDE.md §5.3.
 *
 * Owns the vertical rhythm and the container measure. Side padding is set once,
 * on the container, and vertical space uses `padding-block` only — never a
 * `padding` shorthand that would zero the sides.
 *
 * `bleed` drops the container so a child can run full-width (§7.6 manifesto
 * band, §7.9 closing band); the child is then responsible for its own inner
 * container.
 */

export type SectionProps = {
  children: ReactNode;
  /** Landmark or wrapper element. Defaults to <section>. */
  as?: ElementType;
  /** Full-bleed background. The section still pads vertically. */
  bleed?: boolean;
  /** Surface colour. `sunken` is the §7.6 / §6.3 treatment. */
  surface?: 'base' | 'sunken';
  /** Separate from the section above with a 1px --line hairline (§5.3). */
  divided?: boolean;
  /** Extra vertical air, for the manifesto and closing bands. */
  spacious?: boolean;
  id?: string;
  className?: string;
  'aria-labelledby'?: string;
};

export function Section({
  children,
  as: Tag = 'section',
  bleed = false,
  surface = 'base',
  divided = false,
  spacious = false,
  id,
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      {...rest}
      className={cn(
        'relative w-full',
        'py-[var(--section-pad)]',
        spacious && 'py-[calc(var(--section-pad)*1.35)]',
        surface === 'sunken' && 'bg-bg-sunken',
        divided && 'border-t border-line',
        className,
      )}
    >
      {bleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]">
          {children}
        </div>
      )}
    </Tag>
  );
}

/**
 * The container on its own, for children of a `bleed` Section.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[var(--container-max)] px-[var(--container-pad)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
