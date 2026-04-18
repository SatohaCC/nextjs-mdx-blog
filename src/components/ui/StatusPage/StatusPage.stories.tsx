import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { StatusPage } from './StatusPage';

const meta = {
  title: 'UI/StatusPage',
  component: StatusPage,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    status: '404',
    title: 'ページが見つかりません',
    description: 'お探しのページは存在しないか、移動した可能性があります。',
  },
} satisfies Meta<typeof StatusPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 再試行不可能なエラーや404など、ユーザーができることがトップページへ戻ることだけの場合に使用する。
 *
 * @summary 再試行手段がないエラー表示に使用する
 */
export const WithoutReset: Story = {
  play: async ({ canvasElement }) => {
    // Arrange: onReset なし（再試行ボタンなし）
    const canvas = within(canvasElement);

    // Assert: トップページへ戻るリンクは常に表示
    await expect(canvas.getByRole('link', { name: 'トップページへ戻る' })).toBeInTheDocument();

    // Assert: 再試行ボタンは表示されない
    await expect(canvas.queryByRole('button', { name: '再試行する' })).not.toBeInTheDocument();
  },
};

/**
 * 再試行が可能なエラー（ネットワーク障害など）に使用する。`onReset` を渡すと再試行ボタンが表示される。
 *
 * @summary 再試行ボタンを表示するエラー状態に使用する
 */
export const WithReset: Story = {
  args: {
    onReset: fn(),
  },
  play: async ({ canvasElement }) => {
    // Arrange: onReset あり（再試行ボタンあり）
    const canvas = within(canvasElement);

    // Assert: 再試行ボタンが表示される
    await expect(canvas.getByRole('button', { name: '再試行する' })).toBeInTheDocument();

    // Assert: トップページへ戻るリンクも表示
    await expect(canvas.getByRole('link', { name: 'トップページへ戻る' })).toBeInTheDocument();
  },
};

/**
 * 再試行ボタンのクリックで `onReset` コールバックが呼ばれることを検証する。
 *
 * @summary 再試行イベントの発火確認
 */
export const ResetCallbackFires: Story = {
  args: {
    onReset: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: 再試行ボタンあり
    const button = within(canvasElement).getByRole('button', { name: '再試行する' });

    // Act
    await userEvent.click(button);

    // Assert
    await expect(args.onReset).toHaveBeenCalledOnce();
  },
};

/**
 * 存在しないURLへアクセスした際の404表示。`not-found.tsx` で使用されるレイアウト。
 *
 * @summary 404ページの表示確認
 */
export const NotFoundPage: Story = {
  args: {
    status: '404',
    title: 'ページが見つかりません',
    description: 'お探しのページは存在しないか、移動した可能性があります。',
  },
};

/**
 * 予期せぬサーバーエラーが発生した際の500表示。`error.tsx` で使用されるレイアウト。
 *
 * @summary 500エラーページの表示確認
 */
export const ErrorPage: Story = {
  args: {
    status: '500',
    title: 'サーバーエラー',
    description: '予期せぬエラーが発生しました。',
    onReset: fn(),
  },
};
