import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'bodyL', 'body', 'bodyS', 'bodyXS', 'code'],
    },
    textColor: {
      control: 'select',
      options: ['primary', 'muted', 'inverted', 'accent'],
    },
    as: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body',
  },
};

/**
 * すべてのバリエーションを確認できるカタログ。
 */
export const Catalog: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}
    >
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="bodyXS" textColor="muted">
          Headings
        </Typography>
        <Typography variant="h1">Heading 1 (3xl/4xl)</Typography>
        <Typography variant="h2">Heading 2 (2xl/3xl)</Typography>
        <Typography variant="h3">Heading 3 (xl/2xl)</Typography>
        <Typography variant="h4">Heading 4 (lg/xl)</Typography>
        <Typography variant="h5">Heading 5 (base/lg)</Typography>
        <Typography variant="h6">Heading 6 (sm/base)</Typography>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="bodyXS" textColor="muted">
          Body Text
        </Typography>
        <Typography variant="bodyL">Body Large (lg) - 読みやすい大きめの本文</Typography>
        <Typography variant="body">Body Base (base) - 標準的な本文テキスト</Typography>
        <Typography variant="bodyS">Body Small (sm) - 補足説明やキャプション用</Typography>
        <Typography variant="bodyXS">Body XS (xs) - 最小のテキストスタイル</Typography>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="bodyXS" textColor="muted">
          Colors
        </Typography>
        <Typography variant="body" textColor="primary">
          Default Color (chocolate.900)
        </Typography>
        <Typography variant="body" textColor="muted">
          Muted Color (chocolate.700)
        </Typography>
        <Typography variant="body" textColor="accent">
          Accent Color (bamboo.900)
        </Typography>
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant="bodyXS" textColor="muted">
          Special
        </Typography>
        <Typography variant="body">
          You can use <Typography variant="code">inline code</Typography> styles.
        </Typography>
      </section>
    </div>
  ),
};

export const SemanticTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography as="h1" variant="h3">
        Visual H3 but Semantic H1
      </Typography>
      <Typography as="span" variant="bodyS" textColor="accent">
        Inline span with small accent text
      </Typography>
    </div>
  ),
};
