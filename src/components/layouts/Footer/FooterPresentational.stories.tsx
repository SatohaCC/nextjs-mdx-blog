import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { FooterPresentational } from './FooterPresentational';

const meta = {
  title: 'Layouts/Footer',
  component: FooterPresentational,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FooterPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * サイト下部のフッター。ホームと About へのナビゲーションと著作権表示を含む。
 *
 * @summary 全ページ共通フッターとして使用する
 */
export const Default: Story = {
  play: async ({ canvas, step }) => {
    let homeLink: HTMLElement;
    let aboutLink: HTMLElement;

    await step('Arrange: フッターのリンクを取得', async () => {
      homeLink = canvas.getByRole('link', { name: 'ホーム' });
      aboutLink = canvas.getByRole('link', { name: 'About' });
    });

    await step(
      'Assert: ホームおよび About への各ナビゲーションリンクが正しく表示されていることを確認',
      async () => {
        await expect(homeLink).toHaveAttribute('href', '/');
        await expect(aboutLink).toBeInTheDocument();
      }
    );
  },
};
