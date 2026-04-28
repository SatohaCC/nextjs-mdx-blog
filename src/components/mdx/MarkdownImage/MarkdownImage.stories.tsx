import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MarkdownImage } from './MarkdownImage';

const meta: Meta<typeof MarkdownImage> = {
  title: 'MDX/MarkdownImage',
  component: MarkdownImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    priority: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownImage>;

export const LocalImage: Story = {
  args: {
    src: '/github-mark.png',
    alt: 'GitHub Logo',
    width: 100,
    height: 100,
  },
};

export const WithCaption: Story = {
  args: {
    src: '/github-mark.png',
    alt: 'これはGitHubのロゴです（キャプション）',
    width: 200,
    height: 200,
  },
};

export const ExternalImage: Story = {
  args: {
    src: 'https://placehold.jp/24/0d1117/ffffff/400x300.png?text=External%20Image',
    alt: 'External Image',
    width: 400,
    height: 300,
  },
};

export const PriorityImage: Story = {
  args: {
    src: '/github-mark.png',
    alt: 'Priority Image',
    width: 300,
    height: 300,
    priority: true,
  },
};
