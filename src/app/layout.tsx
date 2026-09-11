import type { Metadata, Viewport } from 'next';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { GlowField } from '@/components/motion/GlowField';
import { fontVariables } from '@/lib/fonts';

import './globals.css';

/**
 * Root layout — CLAUDE.md §3, §5, §6, §12.3.
 *
 * There is no gate component here by design. The gate is a Cloudflare Pages
 * Function (§4) that runs before any file is served, so an unauthenticated
 * visitor never reaches this layout at all — and never receives its HTML.
 * That is the difference between a lock and a curtain.
 *
 * The `robots` object below is the ONLY place robots directives are declared.
 * Next renders the meta tag from it — do not also hand-write a
 * <meta name="robots"> tag or the page emits two conflicting directives (§4.1).
 */

export const metadata: Metadata = {
  title: {
    default: 'SunRey — The Financial Operating System for a Post-AI Economy',
    // Pages in §7–§11 supply their own absolute titles.
    template: '%s',
  },
  description:
    'SunRey is an AI-native financial institution and human-information network — two native economies settling on one sovereign chain.',
  applicationName: 'SunRey',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#060505',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <GlowField />
        <Header />
        <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
