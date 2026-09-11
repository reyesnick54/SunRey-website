import type { Metadata } from 'next';

import { Disclosure } from '@/components/layout/Disclosure';
import { Rule, Title } from '@/components/primitives';
import { legal } from '@content/legal';

/**
 * Legal (`/legal`) — CLAUDE.md §11.5. Linked from the footer only, not the
 * nav. A single-column typographic page: `body` size, `--text-muted`, max
 * 68ch, no cards, no glow — just a rule under each H2.
 *
 * `{/* REVIEW: counsel *\/}` sits above every section, per §11.5's own
 * instruction: this copy is production copy today, but counsel will revise
 * it, and the markers tell them where to look.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: legal.meta.title,
  description: legal.meta.description,
};

export default function LegalPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <div className="mx-auto w-full max-w-[var(--measure-body)] px-[var(--container-pad)] py-[clamp(64px,10vh,120px)]">
        <h1 className="font-display text-display-m tracking-display-m font-light text-text">
          {legal.meta.title}
        </h1>
        <p className="mt-3 text-micro text-faint">{legal.subline}</p>

        <div className="mt-16 flex flex-col gap-14">
          {legal.sections.map((section) => (
            <section key={section.heading}>
              {/* REVIEW: counsel */}
              <Title as="h2">{section.heading}</Title>
              <Rule className="mt-4 mb-6" />
              {section.isDisclosure ? (
                <Disclosure />
              ) : (
                <div className="flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-body text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section>
            {/* REVIEW: counsel */}
            <Title as="h2">{legal.contact.heading}</Title>
            <Rule className="mt-4 mb-6" />
            <p className="text-body text-muted">
              {legal.contact.org} —{' '}
              <a
                href={`mailto:${legal.contact.email}`}
                className="text-accent-500 underline underline-offset-2 transition-colors duration-[var(--dur-hover)] ease-sunrey hover:text-accent-300 focus-visible:text-accent-300"
              >
                {legal.contact.email}
              </a>
            </p>
            <p className="mt-2 text-body text-faint italic">{legal.contact.placeholder}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
