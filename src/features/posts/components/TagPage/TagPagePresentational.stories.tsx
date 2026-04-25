import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

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
  play: async ({ canvas, step }) => {
    let heading: HTMLElement;
    let backLink: HTMLElement;

    await step('Arrange: ヘッダーと戻るリンクを取得', async () => {
      heading = canvas.getByRole('heading', { name: 'タグ：Next.js' });
      backLink = canvas.getByRole('link', { name: '← すべての記事に戻る' });
    });

    await step(
      'Assert: タグタイトルが表示され、ホームへの戻るリンクが正しいことを確認',
      async () => {
        await expect(heading).toBeInTheDocument();
        await expect(backLink).toHaveAttribute('href', '/');
      }
    );
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
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: 記事リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'Next.js App Router 入門' });
    });

    await step(
      'Assert: 記事が 1 件のみの場合でも、正しいリンクが表示されていることを確認',
      async () => {
        await expect(link).toHaveAttribute('href', '/posts/nextjs-app-router');
      }
    );
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
  play: async ({ canvas, step }) => {
    let nav: HTMLElement;

    await step('Arrange: ページネーション要素を取得', async () => {
      nav = canvas.getByRole('navigation', { name: 'Pagination' });
    });

    await step(
      'Assert: 複数ページにおよぶ場合、ページネーションが表示されることを確認',
      async () => {
        await expect(nav).toBeInTheDocument();
      }
    );
  },
};
