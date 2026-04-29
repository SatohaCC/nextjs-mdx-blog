import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

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
  },
  {
    slug: 'typescript-generics',
    frontmatter: {
      title: 'TypeScript ジェネリクス完全ガイド',
      date: '2024-02-20',
      excerpt: 'ジェネリクスの基礎から応用まで、実践的なサンプルで解説します。',
      tags: ['TypeScript'],
    },
  },
  {
    slug: 'pandacss-introduction',
    frontmatter: {
      title: 'PandaCSS で始めるスタイリング',
      date: '2024-01-10',
      excerpt: 'PandaCSS の基本概念とセットアップ方法を紹介します。',
    },
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
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: 記事リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'Next.js App Router 入門' });
    });

    await step('Assert: 記事タイトルへのリンクが表示され、正しい遷移先を持っている', async () => {
      await expect(link).toHaveAttribute('href', '/posts/nextjs-app-router');
    });
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
  play: async ({ canvas, step }) => {
    let heading: HTMLElement;

    await step('Arrange: タイトル要素を取得', async () => {
      heading = canvas.getByRole('heading', { name: 'タグ：Next.js' });
    });

    await step('Assert: カスタムタイトルがヘッダーとして表示される', async () => {
      await expect(heading).toBeInTheDocument();
    });
  },
};

/**
 * ページネーション付きの記事一覧。記事数が多い場合に複数ページに分割される。
 *
 * @summary 複数ページにわたる記事一覧のページネーション表示
 */
export const WithPagination: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  play: async ({ canvas, step }) => {
    let nav: HTMLElement;

    await step('Arrange: ページネーション要素を取得', async () => {
      nav = canvas.getByRole('navigation', { name: 'ページネーション' });
    });

    await step('Assert: ページネーション（ナビゲーション）が表示される', async () => {
      await expect(nav).toBeInTheDocument();
    });
  },
};

/**
 * ヒット件数が表示される記事一覧。検索結果などで使用する。
 *
 * @summary ヒット件数付きの記事一覧
 */
export const WithHitCount: Story = {
  args: {
    posts: mockPosts,
    title: '"React" の検索結果',
    totalCount: mockPosts.length,
  },
  play: async ({ canvas, step }) => {
    await step('Assert: ヒット件数が表示される', async () => {
      const hitCount = canvas.getByText(`ヒット件数: ${mockPosts.length}件`);
      await expect(hitCount).toBeInTheDocument();
    });
  },
};

/**
 * 検索結果が 0 件の場合の記事一覧。
 *
 * @summary 検索結果なし（空状態）の表示
 */
export const Empty: Story = {
  args: {
    posts: [],
    title: '"存在しないワード" の検索結果',
    totalCount: 0,
  },
  play: async ({ canvas, step }) => {
    await step('Assert: 該当なしのメッセージが表示される', async () => {
      const message = canvas.getByText('該当する記事が見つかりませんでした。');
      await expect(message).toBeInTheDocument();
      const hitCount = canvas.getByText('ヒット件数: 0件');
      await expect(hitCount).toBeInTheDocument();
    });
  },
};
