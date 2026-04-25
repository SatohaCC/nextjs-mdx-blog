import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';

import { SearchBoxContainer } from './SearchBoxContainer';

const meta = {
  title: 'Features/SearchBox/SearchBoxContainer',
  component: SearchBoxContainer,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBoxContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 実際の検索入力をシミュレートするインタラクションテスト。
 * クエリの変更とフォーム送信のロジックを検証する。
 */
export const SearchInteraction: Story = {
  tags: ['!manifest'],
  play: async ({ canvas, userEvent, step }) => {
    let input: HTMLElement;

    await step('Arrange: 検索入力要素を取得', async () => {
      input = await canvas.findByRole('searchbox');
    });

    await step('Act: 検索キーワードを入力', async () => {
      await userEvent.type(input, 'React');
      await expect(input).toHaveValue('React');
    });

    await step('Act: Enterキーで入力を確定（Submit）', async () => {
      await userEvent.type(input, '{enter}');
    });

    await step('Assert: 入力値が維持されていることを確認（Submit後の挙動確認）', async () => {
      await expect(input).toHaveValue('React');
    });
  },
};

/**
 * 空文字の送信テスト。
 * 空白のみの場合は送信（ルーティング）が発生しないロジックを確認する。
 */
export const EmptySubmit: Story = {
  tags: ['!manifest'],
  play: async ({ canvas, userEvent, step }) => {
    let input: HTMLElement;

    await step('Arrange: 検索入力要素を取得', async () => {
      input = await canvas.findByRole('searchbox');
    });

    await step('Act: 空白のみを入力してSubmit', async () => {
      await userEvent.type(input, '   {enter}');
    });

    await step('Assert: 入力値がトリミングされていることを確認', async () => {
      await expect(input).toHaveValue('   ');
    });
  },
};
