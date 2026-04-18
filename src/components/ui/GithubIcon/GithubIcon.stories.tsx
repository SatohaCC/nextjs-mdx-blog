import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { GithubIcon } from './GithubIcon';

const meta = {
  title: 'UI/GithubIcon',
  component: GithubIcon,
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GithubIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ライト・ダークモードで自動切り替えする GitHub アイコン。
 * ヘッダーの GitHub リンクボタンで使用する。
 *
 * @summary GitHub へのリンクアイコンとして使用する
 */
export const Default: Story = {};
