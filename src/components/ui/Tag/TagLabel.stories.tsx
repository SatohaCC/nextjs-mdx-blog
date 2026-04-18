import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { TagLabel } from './Tag';

const meta = {
  title: 'UI/Tag/TagLabel',
  component: TagLabel,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * クリック不可の純粋な表示用タグ。記事詳細ページでタグをリンクなしで列挙する場合に使用する。
 *
 * @summary ナビゲーションを持たないタグ表示に使用する
 */
export const Default: Story = {
  args: { children: 'Next.js' },
  play: async ({ canvasElement }) => {
    // Arrange: クリック不可のラベルタグ
    const tag = within(canvasElement).getByText('Next.js');

    // Assert: リンクではなくspan、クリック不可マーク付き
    await expect(tag.tagName.toLowerCase()).toBe('span');
    await expect(tag).toHaveAttribute('data-clickable', 'false');
  },
};
