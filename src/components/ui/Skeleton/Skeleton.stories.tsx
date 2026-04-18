import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * データ読み込み中に表示するアニメーション付きプレースホルダー。
 * `aria-hidden` でスクリーンリーダーには読み上げられない。
 *
 * @summary Suspense フォールバックやローディング状態の表示に使用する
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Arrange: ローディングプレースホルダー
    const skeleton = canvasElement.querySelector('[aria-hidden]');

    // Assert: スクリーンリーダーから隠されている
    await expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  },
};
