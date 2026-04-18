import { type ReactNode } from 'react';

import { cx } from '../../../../styled-system/css';
import { pageTitleStyles, pageTitleWithSubtitleStyles, subtitleStyles } from './styles';

type PageTitleProps = {
  /** ページタイトルのテキスト */
  children: ReactNode;
  /** タイトル下に表示するサブタイトル */
  subtitle?: string;
  /** View Transitions API で使用するトランジション識別名 */
  viewTransitionName?: string;
};

/**
 * ページの見出し（h1）を表示するコンポーネント。
 * オプションでサブタイトルと View Transition 名を指定できる。
 *
 * @summary 各ページのメイン見出しに使用する
 */
export const PageTitle = ({ children, subtitle, viewTransitionName }: PageTitleProps) => {
  return (
    <div>
      <h1
        className={cx(pageTitleStyles, subtitle && pageTitleWithSubtitleStyles)}
        style={
          {
            viewTransitionName,
          } as React.CSSProperties
        }
      >
        {children}
      </h1>
      {subtitle && <p className={subtitleStyles}>{subtitle}</p>}
    </div>
  );
};
