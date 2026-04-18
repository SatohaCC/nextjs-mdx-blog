import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';

import { MarkdownBlockquote } from './MarkdownBlockquote';

const meta = {
  title: 'MDX/MarkdownBlockquote',
  component: MarkdownBlockquote,
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
  args: {
    children: null,
  },
} satisfies Meta<typeof MarkdownBlockquote>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * GitHub Flavored Markdown の通常の引用ブロック。`[!TYPE]` マーカーがない場合に使用する。
 *
 * @summary アラートではない通常の引用文の表示
 */
export const PlainQuote: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>これは通常の引用ブロックです。マーカーなしの blockquote として表示されます。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement }) => {
    // Assert: 通常の blockquote 要素として描画される
    const blockquote = canvasElement.querySelector('blockquote');
    await expect(blockquote).toBeInTheDocument();
  },
};

/**
 * `[!NOTE]` マーカーによる情報提供アラート。補足情報を伝えるときに使用する。
 *
 * @summary 補足情報を目立たせたい場合に使用する
 */
export const NoteAlert: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>[!NOTE] これは補足情報です。読者が知っておくと役立つ内容を記載します。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement }) => {
    // Assert: Note アラートとして描画される
    const alert = canvasElement.querySelector('[data-alert-type="note"]');
    await expect(alert).toBeInTheDocument();
    await expect(within(canvasElement).getByText('Note')).toBeInTheDocument();
  },
};

/**
 * `[!TIP]` マーカーによるヒントアラート。実践的なアドバイスを強調するときに使用する。
 *
 * @summary 実践的なヒントやベストプラクティスを伝えたい場合に使用する
 */
export const TipAlert: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>[!TIP] これは実践的なヒントです。より良い使い方を提案します。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector('[data-alert-type="tip"]');
    await expect(alert).toBeInTheDocument();
    await expect(within(canvasElement).getByText('Tip')).toBeInTheDocument();
  },
};

/**
 * `[!IMPORTANT]` マーカーによる重要情報アラート。必ず読んでほしい内容を強調するときに使用する。
 *
 * @summary 重要な注意点や前提条件を伝えたい場合に使用する
 */
export const ImportantAlert: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>[!IMPORTANT] これは重要な情報です。必ず確認してください。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector('[data-alert-type="important"]');
    await expect(alert).toBeInTheDocument();
    await expect(within(canvasElement).getByText('Important')).toBeInTheDocument();
  },
};

/**
 * `[!WARNING]` マーカーによる警告アラート。潜在的な問題や副作用を伝えるときに使用する。
 *
 * @summary 注意が必要な操作や副作用を警告したい場合に使用する
 */
export const WarningAlert: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>[!WARNING] この操作には副作用があります。実行前に必ずバックアップを取ってください。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector('[data-alert-type="warning"]');
    await expect(alert).toBeInTheDocument();
    await expect(within(canvasElement).getByText('Warning')).toBeInTheDocument();
  },
};

/**
 * `[!CAUTION]` マーカーによる危険アラート。取り返しのつかない操作などを強く警告するときに使用する。
 *
 * @summary 危険な操作やデータ損失リスクを強調したい場合に使用する
 */
export const CautionAlert: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>[!CAUTION] この操作は元に戻せません。十分に確認してから実行してください。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement }) => {
    const alert = canvasElement.querySelector('[data-alert-type="caution"]');
    await expect(alert).toBeInTheDocument();
    await expect(within(canvasElement).getByText('Caution')).toBeInTheDocument();
  },
};
