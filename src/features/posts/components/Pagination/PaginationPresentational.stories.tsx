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
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: 'Pagination' });

    // Assert: 現在ページに aria-current="page" が付与されている
    const currentLink = within(nav).getByRole('link', { name: '1' });
    await expect(currentLink).toHaveAttribute('aria-current', 'page');

    // Assert: 次ページへのリンクが存在する
    const nextLink = within(nav).getByRole('link', { name: '次のページ' });
    await expect(nextLink).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: 'Pagination' });

    // Assert: 現在ページに aria-current="page" が付与されている
    const currentLink = within(nav).getByRole('link', { name: '3' });
    await expect(currentLink).toHaveAttribute('aria-current', 'page');

    // Assert: 前後のページへのリンクが両方存在する
    await expect(within(nav).getByRole('link', { name: '前のページ' })).toBeInTheDocument();
    await expect(within(nav).getByRole('link', { name: '次のページ' })).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: 'Pagination' });

    // Assert: 現在ページに aria-current="page" が付与されている
    const currentLink = within(nav).getByRole('link', { name: '5' });
    await expect(currentLink).toHaveAttribute('aria-current', 'page');

    // Assert: 前のページへのリンクが存在する
    await expect(within(nav).getByRole('link', { name: '前のページ' })).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole('navigation', { name: 'Pagination' });

    // Assert: 現在ページに aria-current="page" が付与されている
    const currentLink = within(nav).getByRole('link', { name: '5' });
    await expect(currentLink).toHaveAttribute('aria-current', 'page');
  },
};
