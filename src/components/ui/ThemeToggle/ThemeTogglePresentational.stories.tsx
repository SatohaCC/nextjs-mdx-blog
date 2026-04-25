import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';

import { ThemeTogglePresentational } from './ThemeTogglePresentational';

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeTogglePresentational,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onToggle: fn(),
  },
} satisfies Meta<typeof ThemeTogglePresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ハイドレーション前（`mounted=false`）の状態。CLS（累積レイアウトシフト）を防ぐためフォーカス順序から除外される。
 *
 * @summary SSRとハイドレーションのギャップでCLSを防ぐ用途
 */
export const Placeholder: Story = {
  args: {
    mounted: false,
    resolvedTheme: undefined,
  },

  tags: ['!manifest'],
  play: async ({ canvasElement, step }) => {
    await step('Assert: キーボードフォーカスから除外されていることを確認', async () => {
      const button = canvasElement.querySelector('button');
      await expect(button).toHaveAttribute('tabindex', '-1');
    });
  },
};

/**
 * ライトモード時の表示。ダークモードへの切り替えラベルが表示される。
 *
 * @summary 現在ライトモードでダークモードに切り替えたい場面
 */
export const LightMode: Story = {
  args: {
    mounted: true,
    resolvedTheme: 'light',
  },

  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    let button: HTMLElement;

    await step('Arrange: トグルボタンを取得', async () => {
      button = await canvas.findByRole('button');
    });

    await step('Assert: ダークモードへの切り替えラベルが表示されることを確認', async () => {
      await expect(button).toHaveAccessibleName('ダークモードに切り替え');
    });
  },
};

/**
 * ダークモード時の表示。ライトモードへの切り替えラベルが表示される。
 *
 * @summary 現在ダークモードでライトモードに切り替えたい場面
 */
export const DarkMode: Story = {
  args: {
    mounted: true,
    resolvedTheme: 'dark',
  },

  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    let button: HTMLElement;

    await step('Arrange: トグルボタンを取得', async () => {
      button = await canvas.findByRole('button');
    });

    await step('Assert: ライトモードへの切り替えラベルが表示されることを確認', async () => {
      await expect(button).toHaveAccessibleName('ライトモードに切り替え');
    });
  },
};

/**
 * クリック時に `onToggle` コールバックが呼ばれることを検証する。
 *
 * @summary テーマ切り替えイベントの発火確認
 */
export const TogglesOnClick: Story = {
  args: {
    mounted: true,
    resolvedTheme: 'light',
  },

  tags: ['!manifest'],
  play: async ({ canvas, args, userEvent, step }) => {
    let button: HTMLElement;

    await step('Arrange: トグルボタンを取得', async () => {
      button = await canvas.findByRole('button');
    });

    await step('Act: トグルボタンをクリック', async () => {
      await userEvent.click(button);
    });

    await step('Assert: テーマ切り替え用のコールバックが呼ばれたことを確認', async () => {
      await expect(args.onToggle).toHaveBeenCalledOnce();
    });
  },
};
