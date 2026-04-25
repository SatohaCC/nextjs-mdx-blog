import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { SearchBoxPresentational } from './SearchBoxPresentational';

/**
 * 記事検索のキーワード入力を行うUIコンポーネント。
 *
 * @summary 記事検索の入力フォーム
 */
const meta = {
  title: 'Features/SearchBox',
  component: SearchBoxPresentational,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    query: {
      control: 'text',
      description: '検索クエリの値',
    },
    onQueryChange: {
      action: 'queryChanged',
      description: '検索クエリが変更されたときのコールバック',
    },
    onSubmit: {
      action: 'submitted',
      description: 'フォームが送信されたときのコールバック',
    },
  },
  args: {
    onQueryChange: fn(),
    onSubmit: fn(),
  },
} satisfies Meta<typeof SearchBoxPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態（空の検索ボックス）。ページ初期表示や検索クリア後の状態。
 *
 * @summary 検索ページの初期表示やリセット後に使用する
 */
export const Default: Story = {
  args: {
    query: '',
  },
};

/**
 * 入力済み状態。ユーザーが検索キーワードを入力している最中の表示確認。
 *
 * @summary 検索クエリが入力されている状態の表示確認
 */
export const WithQuery: Story = {
  args: {
    query: 'Next.js',
  },
};

/**
 * 日本語クエリ入力状態。マルチバイト文字が正しく扱われることの確認。
 *
 * @summary 日本語キーワードでの検索入力確認
 */
export const WithJapaneseQuery: Story = {
  args: {
    query: 'ブログの書き方',
  },
};
