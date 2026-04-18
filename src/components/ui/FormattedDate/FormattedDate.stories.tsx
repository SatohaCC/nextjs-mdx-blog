import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { FormattedDate } from './FormattedDate';

const meta = {
  title: 'UI/FormattedDate',
  component: FormattedDate,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormattedDate>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ISO日付文字列を ja-JP ロケール形式（例: 2024年1月15日）で表示する。
 * `<time>` タグの `dateTime` 属性に機械可読な値が設定される。
 *
 * @summary 記事の投稿日や更新日の表示に使用する
 */
export const Default: Story = {
  args: { date: '2024-01-15' },
  play: async ({ canvasElement }) => {
    // Arrange: ISO日付文字列
    const time = within(canvasElement).getByRole('time');

    // Assert: dateTime属性に元のISO文字列が入る（機械可読）
    await expect(time).toHaveAttribute('dateTime', '2024-01-15');

    // Assert: 表示テキストはja-JP形式
    await expect(time).toHaveTextContent('2024年1月15日');
  },
};

/**
 * 月初・年始など桁数が変わる日付でも正しくフォーマットされることを確認する。
 *
 * @summary 月・日が1桁になる日付のフォーマット確認
 */
export const NewYear: Story = {
  args: { date: '2026-01-01' },
  play: async ({ canvasElement }) => {
    const time = within(canvasElement).getByRole('time');
    await expect(time).toHaveAttribute('dateTime', '2026-01-01');
    await expect(time).toHaveTextContent('2026年1月1日');
  },
};
