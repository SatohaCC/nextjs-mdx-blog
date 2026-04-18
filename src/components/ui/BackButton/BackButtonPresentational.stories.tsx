import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { BackButtonPresentational } from './BackButtonPresentational';

const meta = {
  title: 'UI/BackButton',
  component: BackButtonPresentational,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    onBack: fn(),
  },
} satisfies Meta<typeof BackButtonPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 戻るボタンのデフォルト表示。前ページへ戻る操作が必要なページで使用する。
 *
 * @summary 前のページへ戻るナビゲーションに使用する
 */
export const Default: Story = {};

/**
 * クリック時に `onBack` コールバックが呼ばれることを検証する。
 *
 * @summary 戻るイベントの発火確認
 */
export const CallbackFires: Story = {
  args: {
    onBack: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: 戻るボタン
    const button = within(canvasElement).getByRole('button', { name: '戻る' });

    // Act
    await userEvent.click(button);

    // Assert
    await expect(args.onBack).toHaveBeenCalledOnce();
  },
};
