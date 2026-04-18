'use client';

import { type ReactNode } from 'react';

import { ThemeProvider } from 'next-themes';

import { ScrollToTop } from '../ScrollToTop';

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ScrollToTop />
      {children}
    </ThemeProvider>
  );
};
