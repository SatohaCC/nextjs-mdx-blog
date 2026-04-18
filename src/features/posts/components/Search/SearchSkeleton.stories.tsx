import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SearchSkeleton } from './SearchSkeleton';

const meta = {
  title: 'Features/SearchSkeleton',
  component: SearchSkeleton,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 検索結果のローディング中に表示するスケルトン。Suspense の fallback として使用する。
 *
 * @summary 検索結果フェッチ中のプレースホルダー表示
 */
export const Default: Story = {};
