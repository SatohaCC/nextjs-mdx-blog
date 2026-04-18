import { type ComponentPropsWithoutRef } from 'react';

import NextLink from 'next/link';

import { cx } from '../../../../styled-system/css';
import { appLinkStyles } from './styles';

export type AppLinkProps = ComponentPropsWithoutRef<'a'> & {
  /** リンク先URL。内部パス（`/`・`#`始まり）は Next.js Link、外部URLは `<a>` にルーティングされる */
  href: string;
};

/**
 * 内部・外部リンクを統一的に扱うリンクコンポーネント。
 * 外部リンクには自動で `target="_blank"` と `rel="noopener noreferrer"` が付与される。
 *
 * @summary ページ遷移・外部サイトへのリンクに使用する
 */
export const AppLink = ({ href, children, className, ...props }: AppLinkProps) => {
  // 内部リンク（ルート相対パス、またはページ内アンカー）かどうかを判定
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      /**
       * 内部リンクの場合は Next.js の Link コンポーネントを使用。
       * クライアントサイド・ナビゲーションとプリフェッチによる高速化の恩恵を受ける。
       */
      <NextLink href={href} className={cx(appLinkStyles, className)} {...props}>
        {children}
      </NextLink>
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
