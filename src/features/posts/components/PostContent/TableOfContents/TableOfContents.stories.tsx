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
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: '目次' });

    // Assert: 見出しリンクが3件表示される
    const links = within(nav).getAllByRole('link');
    await expect(links).toHaveLength(3);

    // Assert: 最初の見出しリンクが正しいアンカーを持つ
    await expect(links[0]).toHaveAttribute('href', '#introduction');
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
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: '目次' });

    // Assert: 全リンクが表示される
    const links = within(nav).getAllByRole('link');
    await expect(links).toHaveLength(7);
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
  play: async ({ canvasElement }) => {
    // Assert: tocが空のときは何もレンダリングしない
    await expect(canvasElement.textContent?.trim()).toBe('');
  },
};
