import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { TagLink } from './Tag';

const meta = {
  title: 'UI/Tag/TagLink',
  component: TagLink,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * タグ名からURLスラグを生成してリンクにするタグ。タグ一覧ページへ遷移する場合に使用する。
 *
 * @summary タグページへのナビゲーションリンクとして使用する
 */
export const Default: Story = {
  args: { tag: 'Next.js' },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'Next.js' });
    });

    await step('Assert: タグ名が正しく URL スラグに変換されていることを確認', async () => {
      await expect(link).toHaveAttribute('href', '/tags/next.js');
    });
  },
};

/**
 * スペースを含むタグ名がハイフン区切りのURLスラグに変換されることを検証する。
 *
 * @summary 複数単語タグのスラグ変換確認
 */
export const SpaceToHyphen: Story = {
  args: { tag: 'React Hooks' },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'React Hooks' });
    });

    await step(
      'Assert: スペースを含むタグ名がハイフン区切りの URL スラグに変換されていることを確認',
      async () => {
        await expect(link).toHaveAttribute('href', '/tags/react-hooks');
      }
    );
  },
};

/**
 * 大文字を含むタグ名が小文字のURLスラグに変換されることを検証する。
 *
 * @summary 大文字タグの小文字スラグ変換確認
 */
export const UpperToLower: Story = {
  args: { tag: 'TypeScript' },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'TypeScript' });
    });

    await step(
      'Assert: 大文字を含むタグ名が小文字の URL スラグに変換されていることを確認',
      async () => {
        await expect(link).toHaveAttribute('href', '/tags/typescript');
      }
    );
  },
};

/**
 * `children` を渡すとタグ名の代わりにカスタムラベルが表示される。URLは `tag` から生成される。
 *
 * @summary カスタムラベルでタグリンクを表示したい場合に使用する
 */
export const CustomChildren: Story = {
  args: { tag: 'Next.js', children: 'カスタムラベル' },
  play: async ({ canvas, step }) => {
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'カスタムラベル' });
    });

    await step(
      'Assert: カスタムの子要素（children）が表示され、href は tag から生成されていることを確認',
      async () => {
        await expect(link).toHaveAttribute('href', '/tags/next.js');
      }
    );
  },
};
