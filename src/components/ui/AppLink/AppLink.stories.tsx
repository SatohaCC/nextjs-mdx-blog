import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { AppLink } from './AppLink';

const meta = {
  title: 'UI/AppLink',
  component: AppLink,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `/` で始まる内部パスへのリンク。Next.js Link によるクライアントサイドナビゲーションが有効になる。
 *
 * @summary 同サイト内のページ遷移に使用する
 */
export const InternalLink: Story = {
  args: {
    href: '/about',
    children: 'Aboutページ',
  },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'Aboutページ' });
    });

    await step(
      'Assert: 内部リンクが正しく描画され、セキュリティ属性が付与されていないことを確認',
      async () => {
        await expect(link).toHaveAttribute('href', '/about');
        await expect(link).not.toHaveAttribute('target');
        await expect(link).not.toHaveAttribute('rel');
      }
    );
  },
};

/**
 * `#` で始まるページ内アンカーリンク。同ページのセクションへジャンプする場合に使用する。
 *
 * @summary 同ページ内セクションへのジャンプに使用する
 */
export const AnchorLink: Story = {
  args: {
    href: '#section-1',
    children: 'セクションへ',
  },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'セクションへ' });
    });

    await step('Assert: アンカーリンクが期待通りのパスに解決されていることを確認', async () => {
      await expect(link).toHaveAttribute('href', '/#section-1');
      await expect(link).not.toHaveAttribute('target');
    });
  },
};

/**
 * `https://` で始まる外部URLへのリンク。`target="_blank"` と `rel="noopener noreferrer"` が自動付与される。
 *
 * @summary 外部サイトへのリンクに使用する
 */
export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    children: '外部サイト',
  },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: '外部サイト' });
    });

    await step(
      'Assert: 外部リンクとして描画され、セキュリティ属性（target="_blank", rel="noopener noreferrer"）が自動付与されていることを確認',
      async () => {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        await expect(link).toHaveAttribute('href', 'https://example.com');
      }
    );
  },
};

/**
 * `rel` prop を渡してもセキュリティ用の `rel="noopener noreferrer"` は上書きされないことを検証する。
 *
 * @summary 外部リンクのセキュリティ属性が保護されていることの確認
 */
export const ExternalRelIsNotOverridden: Story = {
  args: {
    href: 'https://example.com',
    children: 'relを上書きしようとするリンク',
    rel: 'me',
  },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'relを上書きしようとするリンク' });
    });

    await step(
      'Assert: rel プロパティを指定しても、セキュリティ用の rel="noopener noreferrer" が優先されていることを確認',
      async () => {
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    );
  },
};
