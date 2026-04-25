import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { TagLink, TagList } from './Tag';

const meta = {
  title: 'UI/Tag/TagList',
  component: TagList,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 複数のタグを横並びで表示するコンテナ。TagLink を子要素として合成して使用する。
 *
 * @summary 記事カードやタグ一覧でタグを横並びに並べる場合に使用する
 */
export const WithItems: Story = {
  args: { children: null },
  render: () => (
    <TagList>
      <TagLink tag="Next.js" />
      <TagLink tag="TypeScript" />
    </TagList>
  ),
  play: async ({ canvas, step }) => {
    let links: HTMLElement[];

    await step('Arrange: タグリンクを取得', async () => {
      links = canvas.getAllByRole('link');
    });

    await step('Assert: 2 つのタグリンクが表示されていることを確認', async () => {
      await expect(links).toHaveLength(2);
    });
  },
};

/**
 * `children` が null のとき TagList が何もレンダリングしないことを検証する。
 * タグが存在しない記事では TagList ごと非表示にできる。
 *
 * @summary タグなし記事でのレンダリング確認
 */
export const Empty: Story = {
  args: { children: null },
  play: async ({ canvasElement, step }) => {
    await step('Assert: children が null の場合は何もレンダリングされないことを確認', async () => {
      // デコレーターの div 内に、スクリプトタグ以外の要素が存在しないことを確認
      const innerContainer = canvasElement.querySelector('div[style*="padding: 2rem"]');
      const component = innerContainer?.querySelector('*:not(script)');
      await expect(component).toBeNull();
    });
  },
};
