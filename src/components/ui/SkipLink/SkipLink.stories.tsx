import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { SkipLink } from './SkipLink';

const meta = {
  title: 'UI/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'centered',
    a11y: {
      test: 'error',
      config: {
        rules: [
          // SkipLinkはフォーカス前にオフスクリーン配置されるため除外
          { id: 'scrollable-region-focusable', enabled: false },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * フォーカスを受け取ると表示され、`#main-content` へジャンプするリンク。
 * キーボードユーザーがナビゲーションの繰り返しをスキップできる。
 *
 * @summary WCAG 2.4.1 準拠のスキップリンクとして全ページで使用する
 */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let link: HTMLElement;

    await step('Arrange: リンクを取得', async () => {
      link = canvas.getByRole('link', { name: 'メインコンテンツへスキップ' });
    });

    await step(
      'Assert: スキップリンクが表示され、#main-content を指していることを確認',
      async () => {
        await expect(link).toHaveAttribute('href', '#main-content');
      }
    );
  },
};
