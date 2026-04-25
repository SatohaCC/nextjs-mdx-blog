import { type ComponentPropsWithoutRef } from 'react';

import NextLink from 'next/link';

import { cx } from '../../../../styled-system/css';
import { appLinkStyles } from './styles';

export type AppLinkProps = ComponentPropsWithoutRef<'a'> & {
  /** リンク先URL。`/` 始まりは Next.js Link、`#` 始まりは plain `<a>`、外部URLは `<a target="_blank">` にルーティングされる */
  href: string;
};

/**
 * 内部・外部リンクを統一的に扱うリンクコンポーネント。
 * 外部リンクには自動で `target="_blank"` と `rel="noopener noreferrer"` が付与される。
 *
 * @summary ページ遷移・外部サイトへのリンクに使用する
 */
export const AppLink = ({ href, children, className, ...props }: AppLinkProps) => {
  if (href.startsWith('/')) {
    return (
      /**
       * ルート相対パスは Next.js の Link コンポーネントを使用。
       * クライアントサイド・ナビゲーションとプリフェッチによる高速化の恩恵を受ける。
       */
      <NextLink href={href} className={cx(appLinkStyles, className)} {...props}>
        {children}
      </NextLink>
    );
  }

  if (href.startsWith('#')) {
    // ページ内アンカーは NextLink に渡さない。
    // NextLink は現在のパス名を補完するため `#section` が `/current-path#section` に変わり、
    // Storybook 等の環境でパスが意図せず変化する。
    return (
      <a href={href} className={cx(appLinkStyles, className)} {...props}>
        {children}
      </a>
    );
  }

  return (
    /**
     * 外部リンクの場合は通常の a タグを使用。
     * セキュリティとユーザー体験のため、target="_blank" と rel="noopener noreferrer" を一律適用。
     */
    <a
      href={href}
      className={cx(appLinkStyles, className)}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
