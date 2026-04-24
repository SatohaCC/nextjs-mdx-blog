import { type ReactNode } from 'react';

import { AppLink } from '../AppLink';
import { tagListStyles, tagStyles } from './styles';

type TagLabelProps = {
  /** タグのラベルテキスト */
  children: ReactNode;
};

/**
 * リンク（クリック）機能を持たない、純粋な表示専用のタグコンポーネント。
 * 記事詳細ページの見出し横や、リンクとして機能させたくない場面で使用します。
 *
 * @summary クリック不可の表示用タグ
 */
export const TagLabel = ({ children }: TagLabelProps) => {
  return (
    <span className={tagStyles} data-clickable="false">
      {children}
    </span>
  );
};

type TagLinkProps = {
  /** タグ名。URLスラグ（`/tags/xxx`）の生成に使用される */
  tag: string;
  /** 表示テキスト。省略時は `tag` がそのまま表示される */
  children?: ReactNode;
};

/**
 * 記事一覧や検索結果などで使用する、リンク機能を持つタグコンポーネント。
 * 受け取ったタグ名（tag）から自動的に URL スラグ（/tags/xxx）を生成します。
 * 内部で `AppLink` を使用しており、高速なクライアントサイドナビゲーションが可能です。
 *
 * @summary 特定のタグに関連する記事一覧へのリンクを持つタグ
 */
export const TagLink = ({ tag, children }: TagLinkProps) => {
  // 例外的にロジックを持つ
  const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');

  return (
    <AppLink href={`/tags/${tagSlug}`} className={tagStyles}>
      {children || tag}
    </AppLink>
  );
};

type TagListProps = {
  /** TagLink や TagLabel のリスト */
  children: ReactNode;
};

/**
 * 複数のタグを並べて表示するためのコンテナコンポーネント。
 * Flexbox による適切な間隔（gap）を適用し、レスポンシブな配置を実現します。
 * 内部には `TagLink` や `TagLabel` を配置して使用します。
 *
 * @summary タグのリストをレイアウトするためのコンテナ
 */
export const TagList = ({ children }: TagListProps) => {
  if (!children) {
    return null;
  }

  return <div className={tagListStyles}>{children}</div>;
};
