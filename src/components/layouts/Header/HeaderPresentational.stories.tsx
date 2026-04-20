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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let logo: HTMLElement;
    let aboutLink: HTMLElement;
    let githubLink: HTMLElement;
    let nav: HTMLElement;

    await step('Arrange: ヘッダー要素を取得', async () => {
      logo = canvas.getByRole('link', { name: 'Satohas Blog' });
      aboutLink = canvas.getByRole('link', { name: 'About' });
      githubLink = canvas.getByRole('link', { name: 'GitHub' });
      nav = canvas.getByRole('navigation', { name: 'グローバルナビゲーション' });
    });

    await step(
      'Assert: ロゴ・About・GitHub への各リンクが正しく表示されていることを確認',
      async () => {
        await expect(logo).toHaveAttribute('href', '/');
        await expect(aboutLink).toBeInTheDocument();
        await expect(githubLink).toBeInTheDocument();
      }
    );

    await step(
      'Assert: グローバルナビゲーションがアクセシブルに提供されていることを確認',
      async () => {
        await expect(nav).toBeInTheDocument();
      }
    );
  },
};
