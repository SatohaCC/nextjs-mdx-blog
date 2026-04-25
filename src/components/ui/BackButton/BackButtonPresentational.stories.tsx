import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';

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
  play: async ({ canvas, args, userEvent, step }) => {
    let button: HTMLElement;

    await step('Arrange: 戻るボタンを取得', async () => {
      button = canvas.getByRole('button', { name: '戻る' });
    });

    await step('Act: 戻るボタンをクリック', async () => {
      await userEvent.click(button);
    });

    await step('Assert: 戻る操作用のコールバックが呼ばれたことを確認', async () => {
      await expect(args.onBack).toHaveBeenCalledOnce();
    });
  },
};
