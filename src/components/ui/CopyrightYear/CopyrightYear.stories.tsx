import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { CopyrightYear } from './CopyrightYear';

const meta = {
  title: 'UI/CopyrightYear',
  component: CopyrightYear,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CopyrightYear>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 現在の年を表示するコンポーネント。フッターの著作権表示で使用する。
 * Next.js プリレンダリング時の制約を回避するため Suspense で囲んで使用する。
 *
 * @summary フッターの © 年表示として使用する
 */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let yearText: HTMLElement;

    await step('Arrange: 現在の西暦年を取得', async () => {
      const currentYear = String(new Date().getFullYear());
      yearText = canvas.getByText(currentYear);
    });

    await step('Assert: 現在の西暦年が表示されていることを確認', async () => {
      await expect(yearText).toBeInTheDocument();
    });
  },
};
