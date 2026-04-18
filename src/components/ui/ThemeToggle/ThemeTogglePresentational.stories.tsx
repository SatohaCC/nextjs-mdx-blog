import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ThemeTogglePresentational } from './ThemeTogglePresentational';

const meta = {
  title: 'UI/ThemeToggle',
  component: ThemeTogglePresentational,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeTogglePresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ハイドレーション前（`mounted=false`）の状態。CLS（累積レイアウトシフト）を防ぐため aria-hidden で隠される。
 *
 * @summary SSRとハイドレーションのギャップでCLSを防ぐ用途
 */
export const Placeholder: Story = {
  args: {
    mounted: false,
    resolvedTheme: undefined,
    onToggle: fn(),
  },
  parameters: {
    a11y: {
      test: 'error',
      config: {
        rules: [
          // aria-hidden内のButtonはハイドレーション前の短時間だけ表示されるCLSガード
          // 実際のユーザー操作は発生しないため許容する
          { id: 'aria-hidden-focus', enabled: false },
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Arrange: ハイドレーション前（mounted=false）
    const wrapper = canvasElement.querySelector('[aria-hidden="true"]');

    // Assert: spanでATから隠されている
    await expect(wrapper).toBeInTheDocument();
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
    onToggle: fn(),
  },
  play: async ({ canvasElement }) => {
    // Arrange: ライトモード時
    const button = within(canvasElement).getByRole('button');

    // Assert: ダークモードへの切り替えラベルが表示される
    await expect(button).toHaveAccessibleName('ダークモードに切り替え');
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
    onToggle: fn(),
  },
  play: async ({ canvasElement }) => {
    // Arrange: ダークモード時
    const button = within(canvasElement).getByRole('button');

    // Assert: ライトモードへの切り替えラベルが表示される
    await expect(button).toHaveAccessibleName('ライトモードに切り替え');
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
    onToggle: fn(),
  },
  play: async ({ canvasElement, args }) => {
    // Arrange: マウント済みのトグルボタン
    const button = within(canvasElement).getByRole('button');

    // Act
    await userEvent.click(button);

    // Assert
    await expect(args.onToggle).toHaveBeenCalledOnce();
  },
};
