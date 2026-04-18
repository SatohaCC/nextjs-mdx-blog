import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '@/components/layouts/Footer';
import { Header } from '@/components/layouts/Header';
import { Sidebar } from '@/components/layouts/Sidebar';
import { SkipLink } from '@/components/ui/SkipLink';
import { Providers } from '@/components/ui/providers';
import { siteConfig } from '@/content/site';

import './globals.css';
import {
  bodyStyles,
  mainContentLayoutStyles,
  mainStyles,
  pageWrapperStyles,
  sidebarWrapperStyles,
} from './layout.styles';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': `${siteConfig.url}/feed.xml`,
    },
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${bodyStyles}`}>
        <Providers>
          <SkipLink />
          <div className={pageWrapperStyles}>
            <Header />
            <div className={mainContentLayoutStyles}>
              <main id="main-content" className={mainStyles}>
                {children}
              </main>
              <aside className={sidebarWrapperStyles}>
                <Sidebar />
              </aside>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
