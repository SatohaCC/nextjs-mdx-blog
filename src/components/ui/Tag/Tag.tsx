import { type ReactNode } from 'react';

import { AppLink } from '../AppLink';
import { tagListStyles, tagStyles } from './styles';

type TagLabelProps = {
  /** タグのラベルテキスト */
  children: ReactNode;
};

/**
 * Clickable機能を持たない、純粋な表示用のタグコンポーネント。
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
 * リンク機能を持つタグコンポーネント。
 * タグ名（tag）を受け取り、自動的にURLスラグ（/tags/xxx）を生成して表示する。
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
 * タグのリストを表示するためのコンテナコンポーネント。
 * 内部に TagLink や TagLabel を配置して合成（Composition）を行う。
 */
export const TagList = ({ children }: TagListProps) => {
  if (!children) {
    return null;
  }

  return <div className={tagListStyles}>{children}</div>;
};
