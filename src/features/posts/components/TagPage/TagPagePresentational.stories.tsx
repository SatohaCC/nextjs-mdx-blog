import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { TagPagePresentational } from './TagPagePresentational';

const mockPosts = [
  {
    slug: 'nextjs-app-router',
    frontmatter: {
      title: 'Next.js App Router 入門',
      date: '2024-03-15',
      excerpt: 'App Router の基本的な使い方と Pages Router との違いを解説します。',
      tags: ['Next.js', 'React'],
    },
    content: '',
  },
  {
    slug: 'nextjs-server-components',
    frontmatter: {
      title: 'React Server Components 実践ガイド',
      date: '2024-02-10',
      excerpt: 'RSC の特性とクライアントコンポーネントとの使い分けを解説します。',
      tags: ['Next.js', 'React'],
    },
    content: '',
  },
];

const meta = {
  title: 'Features/TagPage',
  component: TagPagePresentational,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    posts: mockPosts,
    displayTag: 'Next.js',
    tag: 'Next.js',
    currentPage: 1,
    totalPages: 1,
    totalCount: 2,
  },
} satisfies Meta<typeof TagPagePresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * タグページの基本表示。指定タグの記事一覧と「すべての記事に戻る」リンクを表示する。
 *
 * @summary タグに紐づく記事の一覧表示
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Assert: タグ名のタイトルが表示される
    const heading = within(canvasElement).getByRole('heading', { name: 'タグ：Next.js' });
    await expect(heading).toBeInTheDocument();

    // Assert: ホームへのリンクが表示される
    const backLink = within(canvasElement).getByRole('link', { name: '← すべての記事に戻る' });
    await expect(backLink).toHaveAttribute('href', '/');
  },
};

/**
 * 記事が1件のタグページ。件数表示の確認。
 *
 * @summary 記事数が少ないタグの表示確認
 */
export const SinglePost: Story = {
  args: {
    posts: [mockPosts[0]],
    totalCount: 1,
  },
  play: async ({ canvasElement }) => {
    // Assert: 1件の記事リンクが表示される
    const link = within(canvasElement).getByRole('link', { name: 'Next.js App Router 入門' });
    await expect(link).toHaveAttribute('href', '/posts/nextjs-app-router');
  },
};

/**
 * ページネーション付きのタグページ。記事数が多いタグで複数ページにわたる場合。
 *
 * @summary 複数ページのタグ別記事一覧
 */
export const WithPagination: Story = {
  args: {
    totalPages: 3,
    currentPage: 1,
    totalCount: 15,
  },
  play: async ({ canvasElement }) => {
    // Assert: ページネーションが表示される
    const nav = within(canvasElement).getByRole('navigation', { name: 'Pagination' });
    await expect(nav).toBeInTheDocument();
  },
};
