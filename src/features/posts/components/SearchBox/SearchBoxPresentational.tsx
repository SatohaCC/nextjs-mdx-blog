'use client';

import { Search } from 'lucide-react';

import {
  searchContainerStyles,
  searchFormStyles,
  searchIconStyles,
  searchInputStyles,
} from './SearchBoxPresentational.styles';

type SearchBoxPresentationalProps = {
  /** 現在の検索クエリ文字列 */
  query: string;
  /** 検索クエリが変更されたときのコールバック */
  onQueryChange: (value: string) => void;
  /** フォームが送信されたときのコールバック */
  onSubmit: (e: React.FormEvent) => void;
};

/**
 * キーワード入力フォームのUI専用コンポーネント。
 * 状態管理とルーティングは SearchBoxContainer が担う。
 *
 * @summary 記事検索の入力フォームに使用する
 */
export const SearchBoxPresentational = ({
  query,
  onQueryChange,
  onSubmit,
}: SearchBoxPresentationalProps) => {
  return (
    <search>
      <form onSubmit={onSubmit} className={searchFormStyles}>
        <div className={searchContainerStyles}>
          <Search size={16} className={searchIconStyles} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="検索…"
            className={searchInputStyles}
            aria-label="記事を検索"
            maxLength={100}
          />
        </div>
      </form>
    </search>
  );
};
