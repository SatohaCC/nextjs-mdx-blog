import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { TagLink } from './Tag';

const meta = {
  title: 'UI/Tag/TagLink',
  component: TagLink,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * タグ名からURLスラグを生成してリンクにするタグ。タグ一覧ページへ遷移する場合に使用する。
 *
 * @summary タグページへのナビゲーションリンクとして使用する
 */
export const Default: Story = {
  args: { tag: 'Next.js' },
  play: async ({ canvasElement }) => {
    // Arrange: タグ名からURLスラグを生成
    const link = within(canvasElement).getByRole('link', { name: 'Next.js' });

    // Assert: タグ名がそのままhrefのスラグになる
    await expect(link).toHaveAttribute('href', '/tags/next.js');
  },
};

/**
 * スペースを含むタグ名がハイフン区切りのURLスラグに変換されることを検証する。
 *
 * @summary 複数単語タグのスラグ変換確認
 */
export const SpaceToHyphen: Story = {
  args: { tag: 'React Hooks' },
  play: async ({ canvasElement }) => {
    // Arrange: スペースを含むタグ名
    const link = within(canvasElement).getByRole('link', { name: 'React Hooks' });

    // Assert: スペースがハイフンに変換される
    await expect(link).toHaveAttribute('href', '/tags/react-hooks');
  },
};

/**
 * 大文字を含むタグ名が小文字のURLスラグに変換されることを検証する。
 *
 * @summary 大文字タグの小文字スラグ変換確認
 */
export const UpperToLower: Story = {
  args: { tag: 'TypeScript' },
  play: async ({ canvasElement }) => {
    // Arrange: 大文字を含むタグ名
    const link = within(canvasElement).getByRole('link', { name: 'TypeScript' });

    // Assert: 小文字に変換される
    await expect(link).toHaveAttribute('href', '/tags/typescript');
  },
};

/**
 * `children` を渡すとタグ名の代わりにカスタムラベルが表示される。URLは `tag` から生成される。
 *
 * @summary カスタムラベルでタグリンクを表示したい場合に使用する
 */
export const CustomChildren: Story = {
  args: { tag: 'Next.js', children: 'カスタムラベル' },
  play: async ({ canvasElement }) => {
    // Arrange: childrenを渡すとそちらが表示される
    const link = within(canvasElement).getByRole('link', { name: 'カスタムラベル' });

    // Assert: hrefはtagから生成される
    await expect(link).toHaveAttribute('href', '/tags/next.js');
  },
};
