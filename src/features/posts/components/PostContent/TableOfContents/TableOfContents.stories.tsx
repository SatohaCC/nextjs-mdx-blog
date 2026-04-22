import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { TableOfContents } from './TableOfContents';

const meta = {
  title: 'Features/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * h2 見出しのみで構成された目次。シンプルな記事構造に使用する。
 *
 * @summary h2 見出しのみの目次表示
 */
export const HeadingsOnly: Story = {
  args: {
    toc: [
      { id: 'introduction', text: 'はじめに', level: 2 },
      { id: 'setup', text: 'セットアップ', level: 2 },
      { id: 'conclusion', text: 'まとめ', level: 2 },
    ],
  },
  play: async ({ canvas, step }) => {
    let links: HTMLElement[];

    await step('Arrange: 目次要素とリンクを取得', async () => {
      const nav = canvas.getByRole('navigation', { name: '目次' });
      links = within(nav).getAllByRole('link');
    });

    await step(
      'Assert: 3 つの見出しリンクが表示され、最初のリンクが正しいアンカーを指していることを確認',
      async () => {
        await expect(links).toHaveLength(3);
        await expect(links[0]).toHaveAttribute('href', '#introduction');
      }
    );
  },
};

/**
 * h2・h3 が混在する階層構造の目次。複数のセクションを持つ長い記事に使用する。
 *
 * @summary h2・h3 混在の階層目次表示
 */
export const MixedLevels: Story = {
  args: {
    toc: [
      { id: 'getting-started', text: 'Getting Started', level: 2 },
      { id: 'installation', text: 'インストール', level: 3 },
      { id: 'configuration', text: '設定', level: 3 },
      { id: 'usage', text: '使い方', level: 2 },
      { id: 'basic-usage', text: '基本的な使い方', level: 3 },
      { id: 'advanced-usage', text: '応用', level: 3 },
      { id: 'conclusion', text: 'まとめ', level: 2 },
    ],
  },
  play: async ({ canvas, step }) => {
    let links: HTMLElement[];

    await step('Arrange: 目次要素とリンクを取得', async () => {
      const nav = canvas.getByRole('navigation', { name: '目次' });
      links = within(nav).getAllByRole('link');
    });

    await step(
      'Assert: h2・h3 が混在する全 7 件のリンクが正しく表示されていることを確認',
      async () => {
        await expect(links).toHaveLength(7);
      }
    );
  },
};

/**
 * toc が空のときは何もレンダリングしない。見出しのない短い記事では目次を非表示にする。
 *
 * @summary 見出しが存在しない場合は目次ブロックを非表示
 */
export const Empty: Story = {
  args: {
    toc: [],
  },
  play: async ({ canvasElement, step }) => {
    await step('Assert: toc が空の場合は何もレンダリングされないことを確認', async () => {
      await expect(canvasElement.textContent?.trim()).toBe('');
    });
  },
};
