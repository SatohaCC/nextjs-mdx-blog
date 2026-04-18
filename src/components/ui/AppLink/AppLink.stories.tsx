import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

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
  play: async ({ canvasElement }) => {
    // Arrange: 内部リンク（/ で始まる）
    const link = within(canvasElement).getByRole('link', { name: 'Aboutページ' });

    // Assert: Next.js Link として描画され、_blank やセキュリティ rel がつかない
    await expect(link).toHaveAttribute('href', '/about');
    await expect(link).not.toHaveAttribute('target');
    await expect(link).not.toHaveAttribute('rel');
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
  play: async ({ canvasElement }) => {
    // Arrange: ページ内アンカー（# で始まる）
    const link = within(canvasElement).getByRole('link', { name: 'セクションへ' });

    // Assert: Next.js Link は # アンカーを /#section-1 に解決する
    await expect(link).toHaveAttribute('href', '/#section-1');
    await expect(link).not.toHaveAttribute('target');
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
  play: async ({ canvasElement }) => {
    // Arrange: 外部リンク（https:// で始まる）
    const link = within(canvasElement).getByRole('link', { name: '外部サイト' });

    // Assert: セキュリティ属性が必ず付与される
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveAttribute('href', 'https://example.com');
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
  play: async ({ canvasElement }) => {
    // Arrange: rel prop を渡しても外部リンクのセキュリティ rel は維持される
    const link = within(canvasElement).getByRole('link', { name: 'relを上書きしようとするリンク' });

    // Assert: props の rel より後に rel="noopener noreferrer" が適用される
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
