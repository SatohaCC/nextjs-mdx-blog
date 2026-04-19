import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeProvider } from 'next-themes';
import { expect, within } from 'storybook/test';

import { HeaderPresentational } from './HeaderPresentational';

const meta = {
  title: 'Layouts/Header',
  component: HeaderPresentational,
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider attribute="data-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof HeaderPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * サイトのグローバルヘッダー。ロゴ・検索・About リンク・GitHub リンク・テーマトグルを含む。
 *
 * @summary ページ上部に表示されるナビゲーションヘッダー
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Assert: ロゴリンクが表示される
    const logo = within(canvasElement).getByRole('link', { name: 'Satohas Blog' });
    await expect(logo).toHaveAttribute('href', '/');

    // Assert: About リンクが表示される
    const aboutLink = within(canvasElement).getByRole('link', { name: 'About' });
    await expect(aboutLink).toBeInTheDocument();

    // Assert: GitHub リンクが表示される
    const githubLink = within(canvasElement).getByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeInTheDocument();

    // Assert: グローバルナビゲーションが存在する
    const nav = within(canvasElement).getByRole('navigation', {
      name: 'グローバルナビゲーション',
    });
    await expect(nav).toBeInTheDocument();
  },
};
