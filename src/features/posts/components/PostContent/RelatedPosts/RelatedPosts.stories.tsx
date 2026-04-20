import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { RelatedPosts } from './RelatedPosts';

const meta = {
  title: 'Features/RelatedPosts',
  component: RelatedPosts,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RelatedPosts>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 関連記事が2件ある場合の表示。記事詳細ページの末尾に表示する。
 *
 * @summary 関連記事が存在する場合の表示確認
 */
export const WithPosts: Story = {
  args: {
    posts: [
      {
        slug: 'related-post-1',
        frontmatter: {
          title: 'Next.js で始める SSR 入門',
          date: '2024-01-10',
          excerpt: 'Server Side Rendering の基本を解説します。',
        },
        content: '',
      },
      {
        slug: 'related-post-2',
        frontmatter: {
          title: 'TypeScript の型システムを深く理解する',
          date: '2024-02-05',
          excerpt: '型推論と型ガードについて詳しく解説します。',
        },
        content: '',
      },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let links: HTMLElement[];

    await step('Arrange: 関連記事のリンクを取得', async () => {
      links = canvas.getAllByRole('link');
    });

    await step(
      'Assert: 2 件の関連記事リンクが表示され、正しいパスを指していることを確認',
      async () => {
        await expect(links).toHaveLength(2);
        await expect(links[0]).toHaveAttribute('href', '/posts/related-post-1');
        await expect(links[1]).toHaveAttribute('href', '/posts/related-post-2');
      }
    );
  },
};

/**
 * 関連記事が0件のときは何もレンダリングしない。タグが一致する記事がない場合に使用する。
 *
 * @summary 関連記事が存在しない場合は非表示
 */
export const Empty: Story = {
  args: {
    posts: [],
  },
  play: async ({ canvasElement, step }) => {
    await step('Assert: posts が空の場合は何もレンダリングされないことを確認', async () => {
      await expect(canvasElement.textContent?.trim()).toBe('');
    });
  },
};
