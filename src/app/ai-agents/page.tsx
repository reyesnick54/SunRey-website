import type { Metadata } from 'next';

import { Callout, Section } from '@/components/primitives';
import { AuthorityModel } from '@/components/blocks/AuthorityModel';
import { AutonomyLadder } from '@/components/blocks/AutonomyLadder';
import { DenialList } from '@/components/blocks/DenialList';
import { GrowMyMoney } from '@/components/blocks/GrowMyMoney';
import { NamedSystems } from '@/components/blocks/NamedSystems';
import { PageHero } from '@/components/blocks/PageHero';
import { aiAgents } from '@content/ai-agents';
import { home } from '@content/home';

/**
 * A.I. Agents (`/ai-agents`) — CLAUDE.md §11.1. Every block reads its copy
 * from `content/ai-agents.ts`; this file only sequences them in the order
 * §11.1 gives.
 *
 * Grow My Money is reused verbatim from Home (§7.5's own copy and diagram,
 * via `content/home.ts`'s `growMyMoney`) — not retyped into a second content
 * file. The one addition this page makes is the callout rendered after the
 * diagram, which is not part of that shared block and so is not wrapped in
 * its own divided section (no second hairline directly under Grow My
 * Money's own), reading instead as a continuation of it.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: aiAgents.meta.title,
  description: aiAgents.meta.description,
};

export default function AiAgentsPage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <PageHero {...aiAgents.hero} />

      <GrowMyMoney {...home.growMyMoney} />
      <Section as="section">
        <Callout>{aiAgents.growMyMoneyCallout}</Callout>
      </Section>

      <AutonomyLadder
        id="autonomy-ladder-heading"
        eyebrow={aiAgents.autonomyLadder.eyebrow}
        heading={aiAgents.autonomyLadder.heading}
        rows={aiAgents.autonomyLadder.rows}
        below={aiAgents.autonomyLadder.below}
      />

      <AuthorityModel
        id="authority-model-heading"
        eyebrow={aiAgents.authorityModel.eyebrow}
        heading={aiAgents.authorityModel.heading}
        body={aiAgents.authorityModel.body}
        diagram={aiAgents.authorityModel.diagram}
      />

      <DenialList
        id="cannot-do-heading"
        eyebrow={aiAgents.cannotDo.eyebrow}
        heading={aiAgents.cannotDo.heading}
        items={aiAgents.cannotDo.items}
        trailingLabel={aiAgents.cannotDo.trailingLabel}
        closing={aiAgents.cannotDo.closing}
      />

      <NamedSystems
        id="named-systems-heading"
        eyebrow={aiAgents.namedSystems.eyebrow}
        heading={aiAgents.namedSystems.heading}
        items={aiAgents.namedSystems.items}
      />
    </main>
  );
}
