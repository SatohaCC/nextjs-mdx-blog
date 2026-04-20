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
  play: async ({ canvasElement, step }) => {
    let blockquote: HTMLElement | null;

    await step('Arrange: blockquote 要素を取得', async () => {
      blockquote = canvasElement.querySelector('blockquote');
    });

    await step(
      'Assert: マーカーなしの場合、通常の blockquote 要素として描画されていることを確認',
      async () => {
        await expect(blockquote).toBeInTheDocument();
      }
    );
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let alert: HTMLElement | null;
    let label: HTMLElement;

    await step('Arrange: Note アラート要素を取得', async () => {
      alert = canvasElement.querySelector('[data-alert-type="note"]');
      label = canvas.getByText('Note');
    });

    await step(
      'Assert: [!NOTE] マーカーが正しく認識され、Note アラートとして表示されていることを確認',
      async () => {
        await expect(alert).toBeInTheDocument();
        await expect(label).toBeInTheDocument();
      }
    );
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let alert: HTMLElement | null;
    let label: HTMLElement;

    await step('Arrange: Tip アラート要素を取得', async () => {
      alert = canvasElement.querySelector('[data-alert-type="tip"]');
      label = canvas.getByText('Tip');
    });

    await step(
      'Assert: [!TIP] マーカーが正しく認識され、Tip アラートとして表示されていることを確認',
      async () => {
        await expect(alert).toBeInTheDocument();
        await expect(label).toBeInTheDocument();
      }
    );
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let alert: HTMLElement | null;
    let label: HTMLElement;

    await step('Arrange: Important アラート要素を取得', async () => {
      alert = canvasElement.querySelector('[data-alert-type="important"]');
      label = canvas.getByText('Important');
    });

    await step(
      'Assert: [!IMPORTANT] マーカーが正しく認識され、Important アラートとして表示されていることを確認',
      async () => {
        await expect(alert).toBeInTheDocument();
        await expect(label).toBeInTheDocument();
      }
    );
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let alert: HTMLElement | null;
    let label: HTMLElement;

    await step('Arrange: Warning アラート要素を取得', async () => {
      alert = canvasElement.querySelector('[data-alert-type="warning"]');
      label = canvas.getByText('Warning');
    });

    await step(
      'Assert: [!WARNING] マーカーが正しく認識され、Warning アラートとして表示されていることを確認',
      async () => {
        await expect(alert).toBeInTheDocument();
        await expect(label).toBeInTheDocument();
      }
    );
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let alert: HTMLElement | null;
    let label: HTMLElement;

    await step('Arrange: Caution アラート要素を取得', async () => {
      alert = canvasElement.querySelector('[data-alert-type="caution"]');
      label = canvas.getByText('Caution');
    });

    await step(
      'Assert: [!CAUTION] マーカーが正しく認識され、Caution アラートとして表示されていることを確認',
      async () => {
        await expect(alert).toBeInTheDocument();
        await expect(label).toBeInTheDocument();
      }
    );
  },
};

/**
 * 未知のマーカー（[!UNKNOWN]）が含まれる場合。
 * 規定のマーカー以外は通常の引用ブロックとして描画されることを確認する。
 *
 * @summary サポート外のマーカーへの挙動確認
 */
export const UnknownMarker: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>[!UNKNOWN] これはサポートされていないマーカーです。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let blockquote: HTMLElement | null;
    let markerText: HTMLElement;

    await step('Arrange: blockquote 要素とテキストを取得', async () => {
      blockquote = canvasElement.querySelector('blockquote');
      markerText = canvas.getByText('[!UNKNOWN] これはサポートされていないマーカーです。');
    });

    await step('Assert: 未知のマーカーの場合は通常の引用として描画されることを確認', async () => {
      await expect(blockquote).toBeInTheDocument();
      await expect(markerText).toBeInTheDocument();
    });
  },
};

/**
 * 複数段落のコンテンツが含まれ、2番目の段落にマーカーがある場合。
 * 最初に見つけたマーカーが優先される挙動を確認する。
 *
 * @summary 複数段落構成におけるマーカー検出の確認
 */
export const MarkerInSecondParagraph: Story = {
  render: () => (
    <MarkdownBlockquote>
      <p>最初の段落です。</p>
      <p>[!NOTE] 2番目の段落にマーカーがあります。</p>
    </MarkdownBlockquote>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    let alert: HTMLElement | null;
    let label: HTMLElement;
    let firstParagraph: HTMLElement;

    await step('Arrange: アラート要素と各段落のテキストを取得', async () => {
      alert = canvasElement.querySelector('[data-alert-type="note"]');
      label = canvas.getByText('Note');
      firstParagraph = canvas.getByText('最初の段落です。');
    });

    await step(
      'Assert: 2番目の段落のマーカーも正常に検出され、アラートとして描画されることを確認',
      async () => {
        await expect(alert).toBeInTheDocument();
        await expect(label).toBeInTheDocument();
        await expect(firstParagraph).toBeInTheDocument();
      }
    );
  },
};
