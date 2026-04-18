import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

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
  play: async ({ canvasElement }) => {
    // Assert: ナビゲーションリンクが2件表示される
    const homeLink = within(canvasElement).getByRole('link', { name: 'ホーム' });
    await expect(homeLink).toHaveAttribute('href', '/');

    const aboutLink = within(canvasElement).getByRole('link', { name: 'About' });
    await expect(aboutLink).toBeInTheDocument();
  },
};
