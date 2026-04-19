import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { PostListPresentational } from './PostListPresentational';

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
    slug: 'typescript-generics',
    frontmatter: {
      title: 'TypeScript ジェネリクス完全ガイド',
      date: '2024-02-20',
      excerpt: 'ジェネリクスの基礎から応用まで、実践的なサンプルで解説します。',
      tags: ['TypeScript'],
    },
    content: '',
  },
  {
    slug: 'pandacss-introduction',
    frontmatter: {
      title: 'PandaCSS で始めるスタイリング',
      date: '2024-01-10',
      excerpt: 'PandaCSS の基本概念とセットアップ方法を紹介します。',
    },
    content: '',
  },
];

const meta = {
  title: 'Features/PostList',
  component: PostListPresentational,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    posts: mockPosts,
    totalPages: 1,
    currentPage: 1,
  },
} satisfies Meta<typeof PostListPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルトの記事一覧。ページネーションなし（1ページのみ）の基本形。
 *
 * @summary トップページや1ページ分の記事一覧表示
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Assert: 記事タイトルへのリンクが表示される
    const link = within(canvasElement).getByRole('link', { name: 'Next.js App Router 入門' });
    await expect(link).toHaveAttribute('href', '/posts/nextjs-app-router');
  },
};

/**
 * カスタムタイトルとサブタイトル付きの記事一覧。タグページなどで使用する。
 *
 * @summary タイトルとサブタイトルをカスタマイズした記事一覧
 */
export const WithCustomTitle: Story = {
  args: {
    title: 'タグ：Next.js',
    subtitle: '2 件の記事',
    posts: mockPosts.slice(0, 2),
  },
  play: async ({ canvasElement }) => {
    // Assert: カスタムタイトルが表示される
    const heading = within(canvasElement).getByRole('heading', { name: 'タグ：Next.js' });
    await expect(heading).toBeInTheDocument();
  },
};

/**
 * ページネーション付きの記事一覧。記事数が多い場合に複数ページに分割される。
 *
 * @summary 複数ページにわたる記事一覧のページネーション表示
 */
export const WithPagination: Story = {
  args: {
    totalPages: 5,
    currentPage: 1,
  },
  play: async ({ canvasElement }) => {
    // Assert: ページネーションが表示される
    const nav = within(canvasElement).getByRole('navigation', { name: 'Pagination' });
    await expect(nav).toBeInTheDocument();
  },
};
