import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { SidebarPresentational } from './SidebarPresentational';

const mockPosts = [
  {
    slug: 'hello-world',
    frontmatter: {
      title: 'Hello World',
      date: '2024-03-15',
      excerpt: 'はじめての記事です。',
    },
    content: '',
  },
  {
    slug: 'nextjs-app-router',
    frontmatter: {
      title: 'Next.js App Router 入門',
      date: '2024-02-20',
      excerpt: 'App Router の基本を解説します。',
    },
    content: '',
  },
  {
    slug: 'typescript-generics',
    frontmatter: {
      title: 'TypeScript ジェネリクス完全ガイド',
      date: '2024-01-10',
      excerpt: 'ジェネリクスの使い方を詳しく解説します。',
    },
    content: '',
  },
];

const mockTags = ['Next.js', 'TypeScript', 'React', 'PandaCSS', 'Storybook'];

const meta = {
  title: 'Layouts/Sidebar',
  component: SidebarPresentational,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    allTags: mockTags,
    latestPosts: mockPosts,
  },
} satisfies Meta<typeof SidebarPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 最新記事とタグ一覧を表示するサイドバー。デスクトップレイアウトで記事一覧の横に表示する。
 *
 * @summary 記事一覧ページや記事詳細ページのサイドバーとして使用する
 */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let postLinks: HTMLElement[];

    await step('Arrange: 最新記事のリンクを取得', async () => {
      postLinks = canvas.getAllByRole('link', {
        name: /Hello World|Next\.js|TypeScript/,
      });
    });

    await step('Assert: 最新記事のリンクが表示されていることを確認', async () => {
      await expect(postLinks.length).toBeGreaterThanOrEqual(1);
    });
  },
};

/**
 * 記事・タグが少ない場合の表示。コンテンツが少なくてもレイアウトが崩れないことを確認する。
 *
 * @summary 記事数・タグ数が少ない場合のレイアウト確認
 */
export const FewItems: Story = {
  args: {
    allTags: ['Next.js'],
    latestPosts: [mockPosts[0]],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let postLink: HTMLElement;
    let tagLink: HTMLElement;

    await step('Arrange: 記事リンクとタグリンクを取得', async () => {
      postLink = canvas.getByRole('link', { name: 'Hello World' });
      tagLink = canvas.getByRole('link', { name: 'Next.js' });
    });

    await step(
      'Assert: 記事リンクとタグリンクがそれぞれ 1 件ずつ正しく表示されていることを確認',
      async () => {
        await expect(postLink).toHaveAttribute('href', '/posts/hello-world');
        await expect(tagLink).toBeInTheDocument();
      }
    );
  },
};
