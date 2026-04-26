import { Suspense } from 'react';

import { AppLink } from '@/components/ui/AppLink';
import { CopyrightYear } from '@/components/ui/CopyrightYear/CopyrightYear';
import { siteConfig } from '@/content/site';

import {
  footerContainerStyles,
  footerInnerStyles,
  footerLinkStyles,
  footerNavStyles,
} from './FooterPresentational.styles';

export const FooterPresentational = () => {
  return (
    <footer className={footerContainerStyles}>
      <div className={footerInnerStyles}>
        <nav className={footerNavStyles} aria-label="フッターナビゲーション">
          <AppLink href="/" className={footerLinkStyles}>
            ホーム
          </AppLink>
          <AppLink href={siteConfig.links.about} className={footerLinkStyles}>
            About
          </AppLink>
        </nav>
        <small>
          &copy;{' '}
          <Suspense fallback={null}>
            <CopyrightYear />
          </Suspense>{' '}
          {siteConfig.title}. All rights reserved.
        </small>
      </div>
    </footer>
  );
};
