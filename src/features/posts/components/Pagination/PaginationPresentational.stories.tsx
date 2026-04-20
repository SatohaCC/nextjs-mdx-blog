import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { PaginationPresentational } from './PaginationPresentational';

const getPageUrl = (page: number) => `/page/${page}`;

const meta = {
  title: 'Features/Pagination',
  component: PaginationPresentational,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    getPageUrl,
  },
} satisfies Meta<typeof PaginationPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 1ページ目の表示。前へボタンは非活性になり、次へボタンのみ有効になる。
 *
 * @summary 先頭ページのページネーション表示
 */
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    pages: [1, 2, 3, 4, 5],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let currentLink: HTMLElement;
    let nextLink: HTMLElement;

    await step('Arrange: ページネーション要素とリンクを取得', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Pagination' });
      currentLink = within(nav).getByRole('link', { name: '1' });
      nextLink = within(nav).getByRole('link', { name: '次のページ' });
    });

    await step(
      'Assert: 1 ページ目が現在ページとしてマークされ、次のページへのリンクが存在することを確認',
      async () => {
        await expect(currentLink).toHaveAttribute('aria-current', 'page');
        await expect(nextLink).toBeInTheDocument();
      }
    );
  },
};

/**
 * 中間ページの表示。前へ・次へボタンの両方が有効になる。
 *
 * @summary 中間ページのページネーション表示
 */
export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    pages: [1, 2, 3, 4, 5],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let currentLink: HTMLElement;
    let prevLink: HTMLElement;
    let nextLink: HTMLElement;

    await step('Arrange: ページネーション要素とリンクを取得', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Pagination' });
      currentLink = within(nav).getByRole('link', { name: '3' });
      prevLink = within(nav).getByRole('link', { name: '前のページ' });
      nextLink = within(nav).getByRole('link', { name: '次のページ' });
    });

    await step(
      'Assert: 3 ページ目が現在ページとしてマークされ、前後両方のページへのリンクが存在することを確認',
      async () => {
        await expect(currentLink).toHaveAttribute('aria-current', 'page');
        await expect(prevLink).toBeInTheDocument();
        await expect(nextLink).toBeInTheDocument();
      }
    );
  },
};

/**
 * 最終ページの表示。次へボタンは非活性になり、前へボタンのみ有効になる。
 *
 * @summary 末尾ページのページネーション表示
 */
export const LastPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 5,
    pages: [1, 2, 3, 4, 5],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let currentLink: HTMLElement;
    let prevLink: HTMLElement;

    await step('Arrange: ページネーション要素とリンクを取得', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Pagination' });
      currentLink = within(nav).getByRole('link', { name: '5' });
      prevLink = within(nav).getByRole('link', { name: '前のページ' });
    });

    await step(
      'Assert: 最終ページが現在ページとしてマークされ、前のページへのリンクのみ存在することを確認',
      async () => {
        await expect(currentLink).toHaveAttribute('aria-current', 'page');
        await expect(prevLink).toBeInTheDocument();
      }
    );
  },
};

/**
 * 省略記号（...）が表示される多ページ構成。記事数が多い場合に使用する。
 *
 * @summary 省略記号を含む多ページのページネーション表示
 */
export const WithEllipsis: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pages: [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let currentLink: HTMLElement;

    await step('Arrange: ページネーション要素とリンクを取得', async () => {
      const nav = canvas.getByRole('navigation', { name: 'Pagination' });
      currentLink = within(nav).getByRole('link', { name: '5' });
    });

    await step(
      'Assert: 省略記号を含む多ページ構成で、現在ページが正しくマークされていることを確認',
      async () => {
        await expect(currentLink).toHaveAttribute('aria-current', 'page');
      }
    );
  },
};
