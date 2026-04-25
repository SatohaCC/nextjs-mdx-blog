import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { PageTitle } from './PageTitle';

const meta = {
  title: 'UI/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * サブタイトルなしのページ見出し（h1）。各ページのメインタイトルに使用する。
 *
 * @summary ページのメイン見出しに使用する
 */
export const Default: Story = {
  args: { children: 'ブログ' },
  play: async ({ canvas, step }) => {
    let heading: HTMLElement;
    let subtitle: HTMLElement | null;

    await step('Arrange: タイトルとサブタイトルを取得', async () => {
      heading = canvas.getByRole('heading', { level: 1, name: 'ブログ' });
      subtitle = canvas.queryByRole('paragraph');
    });

    await step(
      'Assert: h1 レベルの見出しとして描画され、サブタイトルが存在しないことを確認',
      async () => {
        await expect(heading).toBeInTheDocument();
        await expect(subtitle).not.toBeInTheDocument();
      }
    );
  },
};

/**
 * タイトル下にサブタイトルを表示する。ページの目的や補足情報を示す場合に使用する。
 *
 * @summary タイトルに補足説明を加えたい場合に使用する
 */
export const WithSubtitle: Story = {
  args: {
    children: 'ブログ',
    subtitle: '日々の気づきを書いています',
  },
  play: async ({ canvas, step }) => {
    let heading: HTMLElement;
    let subtitle: HTMLElement;

    await step('Arrange: タイトルとサブタイトルを取得', async () => {
      heading = canvas.getByRole('heading', { level: 1, name: 'ブログ' });
      subtitle = canvas.getByText('日々の気づきを書いています');
    });

    await step(
      'Assert: h1 レベルの見出しと指定したサブタイトルの両方が表示されていることを確認',
      async () => {
        await expect(heading).toBeInTheDocument();
        await expect(subtitle).toBeInTheDocument();
      }
    );
  },
};
