import React from 'react';

import { AppLink } from '@/components/ui/AppLink';
import { GithubIcon } from '@/components/ui/GithubIcon/GithubIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { siteConfig } from '@/content/site';
import { SearchBox } from '@/features/posts/components/SearchBox';

import {
  headerContainerStyles,
  headerInnerStyles,
  iconButtonStyles,
  logoStyles,
  navContainerStyles,
  navLinkStyles,
} from './HeaderPresentational.styles';

export const HeaderPresentational = () => {
  return (
    <header
      className={headerContainerStyles}
      style={{ viewTransitionName: 'page-header' } as React.CSSProperties}
    >
      <div className={headerInnerStyles}>
        <AppLink href="/" className={logoStyles}>
          {siteConfig.title}
        </AppLink>

        <nav className={navContainerStyles} aria-label="グローバルナビゲーション">
          <SearchBox />
          <AppLink href={siteConfig.links.about} className={navLinkStyles}>
            About
          </AppLink>
          <AppLink href={siteConfig.links.github} className={iconButtonStyles} aria-label="GitHub">
            <GithubIcon />
          </AppLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};
