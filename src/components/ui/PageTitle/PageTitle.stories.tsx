import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { PageTitle } from './PageTitle';

const meta = {
  title: 'UI/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * サブタイトルなしのページ見出し（h1）。各ページのメインタイトルに使用する。
 *
 * @summary ページのメイン見出しに使用する
 */
export const Default: Story = {
  args: { children: 'ブログ' },
  play: async ({ canvasElement }) => {
    // Arrange: サブタイトルなし
    const canvas = within(canvasElement);

    // Assert: h1 として描画される
    await expect(canvas.getByRole('heading', { level: 1, name: 'ブログ' })).toBeInTheDocument();

    // Assert: サブタイトル段落は存在しない
    await expect(canvas.queryByRole('paragraph')).not.toBeInTheDocument();
  },
};

/**
 * タイトル下にサブタイトルを表示する。ページの目的や補足情報を示す場合に使用する。
 *
 * @summary タイトルに補足説明を加えたい場合に使用する
 */
export const WithSubtitle: Story = {
  args: {
    children: 'ブログ',
    subtitle: '日々の気づきを書いています',
  },
  play: async ({ canvasElement }) => {
    // Arrange: サブタイトルあり
    const canvas = within(canvasElement);

    // Assert: h1 とサブタイトルの両方が表示される
    await expect(canvas.getByRole('heading', { level: 1, name: 'ブログ' })).toBeInTheDocument();
    await expect(canvas.getByText('日々の気づきを書いています')).toBeInTheDocument();
  },
};
