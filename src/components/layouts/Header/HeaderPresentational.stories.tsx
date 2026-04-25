import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { HeaderPresentational } from './HeaderPresentational';

const meta = {
  title: 'Layouts/Header',
  component: HeaderPresentational,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * サイトのグローバルヘッダー。ロゴ・検索・About リンク・GitHub リンク・テーマトグルを含む。
 *
 * @summary ページ上部に表示されるナビゲーションヘッダー
 */
export const Default: Story = {
  tags: ['!manifest'],
  play: async ({ canvas, step }) => {
    let logo: HTMLElement;
    let aboutLink: HTMLElement;
    let githubLink: HTMLElement;
    let nav: HTMLElement;

    await step('Arrange: ヘッダー要素を取得', async () => {
      logo = await canvas.findByRole('link', { name: 'Satohas Blog' });
      aboutLink = await canvas.findByRole('link', { name: 'About' });
      githubLink = await canvas.findByRole('link', { name: 'GitHub' });
      nav = await canvas.findByRole('navigation', { name: 'グローバルナビゲーション' });
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
