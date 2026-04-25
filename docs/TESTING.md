# Testing Strategy & Guidelines

このブログプロジェクトにおけるテストの考え方、使用ツール、および実装パターンに関するリファレンスです。

## 1. テストの全体像

プロジェクトでは「ブラウザが必要か？」を基準に、3つの層でテストを使い分けています。

| テスト種類 | 実行環境 | ツール | 主な対象 | ファイル名 |
| :--- | :--- | :--- | :--- | :--- |
| **ユニットテスト** | Node.js | Vitest | ロジック、データ変換 | `*.test.ts` |
| **インタラクションテスト** | Browser | Storybook + Vitest | UI、ユーザー操作、A11y | `*.stories.tsx` |
| **E2Eテスト** | Browser | Playwright | ページ間遷移、全体統合 | `e2e/*.spec.ts` |

## 2. Vitest vs Storybook の使い分け

### ユニットテスト (Vitest)
**「関数に値を渡すと正しい値が返ってくるか」**を確認します。ブラウザは不要です。
- 記事のソート・フィルタリングロジック (`api/posts.ts`)
- 目次生成ロジック (`api/toc-generator.ts`)
- MDX のパース処理 (`lib/mdx-parser.ts`)

### インタラクションテスト (Storybook + Vitest Browser Mode)
**「何かが表示されて、それをユーザーが操作する」**動作を確認します。
- ボタンのクリックでコールバックが呼ばれるか。
- 検索ボックスに入力すると結果が表示されるか。
- モーダルやメニューの開閉、フォーカス移動。

> [!TIP]
> 迷ったら「このテスト、ブラウザがなくても動く？」と自問してください。答えが Yes ならユニットテスト、No なら Storybook が正しい置き場所です。

## 3. 実装パターン

### AAA パターンと `step` 関数
Storybook の `play` 関数内でテストを書く際は、以下の **AAA (Arrange-Act-Assert)** パターンを `step` 関数で構造化してください。

```tsx
export const SearchInteraction: Story = {
  play: async ({ canvas, userEvent, step }) => {
    let input: HTMLElement;

    await step('Arrange: 検索入力を取得', async () => {
      input = await canvas.findByRole('searchbox');
    });

    await step('Act: 検索ワードを入力', async () => {
      await userEvent.type(input, 'Testing');
    });

    await step('Assert: 期待する結果が表示されているか', async () => {
      const result = await canvas.findByText(/Testing についての記事/);
      expect(result).toBeInTheDocument();
    });
  },
};
```

### アクセシビリティ (a11y) テスト
Storybook 上で `@storybook/addon-a11y` による自動チェックが走ります。
また、特定の Story に対してアクセシビリティチェックを強制することも可能です。

```tsx
export const AccessibilityCheck: Story = {
  parameters: {
    a11y: { test: 'error' },
  },
};
```

## 4. 実行コマンド

- `npm run test`: すべての Vitest テスト（ユニット + インタラクション）を実行。
- `npm run storybook`: UI カタログを起動。
- `npm run test:e2e`: Playwright による E2E テストを実行。

## 5. カバレッジ
`npm run test -- --coverage` でカバレッジレポートを生成できます。特に `src/features/*/api/` 下のロジックは高い網羅率を維持することを目指します。
