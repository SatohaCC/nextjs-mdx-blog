import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { PaginationContainer } from './PaginationContainer';

const meta = {
  title: 'Features/Pagination/PaginationContainer',
  component: PaginationContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaginationContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ページ総数が少ない場合（7ページ以下）。
 * すべてのページ番号が直接表示される。
 */
export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    const pageLinks: HTMLElement[] = [];

    await step('Arrange: すべてのページリンクを取得', async () => {
      for (let i = 1; i <= 5; i++) {
        pageLinks.push(await canvas.findByRole('link', { name: `ページ ${i}` }));
      }
    });

    await step('Assert: すべてのページ番号（1-5）が表示されていることを確認', async () => {
      for (const link of pageLinks) {
        await expect(link).toBeInTheDocument();
      }
    });
  },
};

/**
 * ページ総数が多く、現在ページが先頭付近の場合。
 * 末尾付近が省略記法（...）になる。
 */
export const ManyPagesStart: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    let firstPage: HTMLElement;
    let fourthPage: HTMLElement;
    let ellipsis: HTMLElement;
    let lastPage: HTMLElement;

    await step('Arrange: ページリンクと省略記号を取得', async () => {
      firstPage = await canvas.findByRole('link', { name: 'ページ 1' });
      fourthPage = await canvas.findByRole('link', { name: 'ページ 4' });
      ellipsis = await canvas.findByLabelText('省略');
      lastPage = await canvas.findByRole('link', { name: 'ページ 10' });
    });

    await step(
      'Assert: 先頭の数ページと末尾、および省略記号が表示されていることを確認',
      async () => {
        await expect(firstPage).toBeInTheDocument();
        await expect(fourthPage).toBeInTheDocument();
        await expect(ellipsis).toBeInTheDocument();
        await expect(lastPage).toBeInTheDocument();
      }
    );
  },
};

/**
 * ページ総数が多く、現在ページが中央付近の場合。
 * 先頭と末尾の両方が省略記法（...）になる。
 */
export const ManyPagesMiddle: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    let firstPage: HTMLElement;
    let middlePage: HTMLElement;
    let lastPage: HTMLElement;
    let ellipses: HTMLElement[];

    await step('Arrange: ページリンクと省略記号を取得', async () => {
      firstPage = await canvas.findByRole('link', { name: 'ページ 1' });
      middlePage = await canvas.findByRole('link', { name: 'ページ 5' });
      lastPage = await canvas.findByRole('link', { name: 'ページ 10' });
      ellipses = await canvas.findAllByLabelText('省略');
    });

    await step('Assert: 先頭・末尾の両方に省略記号が表示されていることを確認', async () => {
      await expect(firstPage).toBeInTheDocument();
      await expect(ellipses).toHaveLength(2);
      await expect(middlePage).toBeInTheDocument();
      await expect(lastPage).toBeInTheDocument();
    });
  },
};

/**
 * ページ総数が多く、現在ページが末尾付近の場合。
 * 先頭付近が省略記法（...）になる。
 */
export const ManyPagesEnd: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    let firstPage: HTMLElement;
    let seventhPage: HTMLElement;
    let lastPage: HTMLElement;
    let ellipsis: HTMLElement;

    await step('Arrange: ページリンクと省略記号を取得', async () => {
      firstPage = await canvas.findByRole('link', { name: 'ページ 1' });
      seventhPage = await canvas.findByRole('link', { name: 'ページ 7' });
      lastPage = await canvas.findByRole('link', { name: 'ページ 10' });
      ellipsis = await canvas.findByLabelText('省略');
    });

    await step('Assert: 先頭が省略され、末尾数ページが表示されていることを確認', async () => {
      await expect(firstPage).toBeInTheDocument();
      await expect(ellipsis).toBeInTheDocument();
      await expect(seventhPage).toBeInTheDocument();
      await expect(lastPage).toBeInTheDocument();
    });
  },
};
