import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

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
  play: async ({ canvas, step }) => {
    let time: HTMLElement;

    await step('Arrange: time 要素を取得', async () => {
      time = canvas.getByRole('time');
    });

    await step(
      'Assert: dateTime 属性が ISO 形式（2024-01-15）であり、表示テキストが ja-JP 形式であることを確認',
      async () => {
        await expect(time).toHaveAttribute('dateTime', '2024-01-15');
        await expect(time).toHaveTextContent('2024年1月15日');
      }
    );
  },
};

/**
 * 月初・年始など桁数が変わる日付でも正しくフォーマットされることを確認する。
 *
 * @summary 月・日が1桁になる日付のフォーマット確認
 */
export const NewYear: Story = {
  args: { date: '2026-01-01' },
  play: async ({ canvas, step }) => {
    let time: HTMLElement;

    await step('Arrange: time 要素を取得', async () => {
      time = canvas.getByRole('time');
    });

    await step(
      'Assert: 月・日が 1 桁の日付でも、正しい ja-JP 形式でフォーマットされていることを確認',
      async () => {
        await expect(time).toHaveAttribute('dateTime', '2026-01-01');
        await expect(time).toHaveTextContent('2026年1月1日');
      }
    );
  },
};

/**
 * 不正な形式の日付文字列が渡された場合。
 * catch ブロックにより、入力値がそのまま表示されることを確認する。
 *
 * @summary 不正な日付形式へのフォールバック確認
 */
export const InvalidDate: Story = {
  args: { date: 'invalid-date' },
  play: async ({ canvas, step }) => {
    let time: HTMLElement;

    await step('Arrange: time 要素を取得', async () => {
      time = canvas.getByRole('time');
    });

    await step('Assert: 不正な日付の場合は、入力文字列がそのまま表示されることを確認', async () => {
      await expect(time).toHaveTextContent('invalid-date');
    });
  },
};
