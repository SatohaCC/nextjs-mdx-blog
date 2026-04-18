import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { TagLink, TagList } from '@/components/ui/Tag';

import { ArticleCard } from './ArticleCard';

const mockPost = {
  slug: 'hello-world',
  frontmatter: {
    title: 'Hello World',
    date: '2024-01-15',
    excerpt: 'これはブログ記事の概要テキストです。記事の内容を簡潔に説明します。',
    tags: ['Next.js', 'TypeScript'],
  },
  content: '',
};

const meta = {
  title: 'Features/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    post: mockPost,
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * タグなし記事カードの表示。タイトル・日付・概要のみを表示する基本形。
 *
 * @summary タグが設定されていない記事の一覧表示
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Assert: 記事へのリンクが存在する
    const link = within(canvasElement).getByRole('link', { name: 'Hello World' });
    await expect(link).toHaveAttribute('href', '/posts/hello-world');
  },
};

/**
 * タグ付き記事カードの表示。タグリストを children として合成（Composition）して使用する。
 *
 * @summary タグが設定されている記事の一覧表示
 */
export const WithTags: Story = {
  render: (args) => (
    <ArticleCard {...args}>
      <TagList>
        <TagLink tag="Next.js" />
        <TagLink tag="TypeScript" />
      </TagList>
    </ArticleCard>
  ),
  play: async ({ canvasElement }) => {
    // Assert: 記事リンクとタグリンクが両方存在する
    const links = within(canvasElement).getAllByRole('link');
    await expect(links.length).toBeGreaterThanOrEqual(3);

    const articleLink = within(canvasElement).getByRole('link', { name: 'Hello World' });
    await expect(articleLink).toHaveAttribute('href', '/posts/hello-world');
  },
};

/**
 * 長いタイトルと概要の折り返し表示確認。タイトルが長い記事でもレイアウトが崩れないことを確認する。
 *
 * @summary 長いコンテンツを持つ記事カードのレイアウト確認
 */
export const LongContent: Story = {
  args: {
    post: {
      slug: 'long-title-post',
      frontmatter: {
        title:
          'Next.js App Router と React Server Components で実現するモダンなフルスタック開発の全貌',
        date: '2024-03-20',
        excerpt:
          'この記事では、Next.js 14 の App Router と React Server Components を組み合わせたモダンなフルスタック開発手法を詳しく解説します。サーバーサイドレンダリング、データフェッチング、キャッシュ戦略など多岐にわたるトピックをカバーします。',
      },
      content: '',
    },
  },
};
