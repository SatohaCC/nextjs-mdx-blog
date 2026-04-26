'use client';

import { Search, X } from 'lucide-react';
import { Button, Input, SearchField } from 'react-aria-components';

import {
  searchClearButtonStyles,
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
 * RAC の SearchField を使用することで、アクセシビリティとユーザー体験を向上。
 *
 * @summary 記事検索の入力フォームに使用する
 */
export const SearchBoxPresentational = ({
  query,
  onQueryChange,
  onSubmit,
}: SearchBoxPresentationalProps) => {
  return (
    <search role="search">
      <form onSubmit={onSubmit} className={searchFormStyles}>
        <SearchField
          value={query}
          onChange={onQueryChange}
          className={searchContainerStyles}
          aria-label="記事を検索"
        >
          <Search size={16} className={searchIconStyles} aria-hidden="true" />
          <Input className={searchInputStyles} placeholder="検索…" maxLength={100} />
          {query && (
            <Button className={searchClearButtonStyles} aria-label="検索ワードをクリア">
              <X size={14} />
            </Button>
          )}
        </SearchField>
      </form>
    </search>
  );
};
