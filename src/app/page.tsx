import type { Metadata } from 'next';

import { BentoGrid } from '@/components/blocks/BentoGrid';
import { ClosingBand } from '@/components/blocks/ClosingBand';
import { CurrencyOfYou } from '@/components/blocks/CurrencyOfYou';
import { DualEconomy } from '@/components/blocks/DualEconomy';
import { GrowMyMoney } from '@/components/blocks/GrowMyMoney';
import { Hero } from '@/components/blocks/Hero';
import { Manifesto } from '@/components/blocks/Manifesto';
import { Premise } from '@/components/blocks/Premise';
import { home } from '@content/home';

/**
 * Home — CLAUDE.md §7. Every block reads its copy from `content/home.ts`; this
 * file only sequences them in the order §7.1–§7.9 gives.
 */

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
};

export default function HomePage() {
  return (
    <main className="relative z-10 grow pt-[var(--header-h)]">
      <Hero {...home.hero} />
      <Premise {...home.premise} />
      <DualEconomy {...home.dualEconomy} />
      <BentoGrid {...home.stack} />
      <GrowMyMoney {...home.growMyMoney} />
      <Manifesto {...home.manifesto} />
      <CurrencyOfYou {...home.currencyOfYou} />
      <ClosingBand {...home.closing} />
    </main>
  );
}
