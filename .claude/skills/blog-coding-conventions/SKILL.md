---
name: blog-coding-conventions
description: このブログプロジェクトのコーディング規約。コンポーネント作成時やスタイル定義時に参照すること。新しいコンポーネントを追加する際はこのスキルに従う。
---

# コーディング規約

このプロジェクトで採用しているコーディング規約です。

---

## アーキテクチャ：Vertical Sliced Architecture

このプロジェクトは **機能別（Vertical Sliced Architecture）** を採用しています。「技術的な層」ではなく「機能（Feature）の単位」でディレクトリを分けることで、開発者が直感的に「どこを修正すればいいか」を把握できます。

### ディレクトリの役割

```
src/
├── app/            # Next.js App Router（ルーティングのみ。ロジックは持たない）
├── components/     # 機能に非依存な共通コンポーネント
│   ├── ui/         # [デザイナー領域] プリミティブUI（Button, Tag, AppLink 等）
│   ├── layouts/    # Header, Footer, Sidebar
│   └── mdx/        # MDXコンポーネント集約 (Renderer, Blockquote等)
└── features/       # 機能スライス（Vertical Slice）
    ├── posts/
    │   ├── types/      # 型定義（Post型）・インターフェース
    │   ├── api/        # データ取得・ビジネスロジック（usecase, repository）
    │   └── components/ # 記事専用UIコンポーネント
    └── about/
        ├── api/        # データ取得
        └── components/
├── lib/            # 機能非依存のユーティリティ
```

### 新しいコンポーネントをどこに置くか

| 種類                                     | 配置場所                                             |
| ---------------------------------------- | ---------------------------------------------------- |
| 汎用的なUIプリミティブ（Button, Tag 等） | `src/components/ui/<ComponentName>/`                 |
| ページのレイアウト骨格                   | `src/components/layouts/<ComponentName>/`            |
| 特定の機能専用UI                         | `src/features/<feature>/components/<ComponentName>/` |
| 記事取得・ロジック                       | `src/features/posts/api/`                            |
| 型定義・インターフェース                 | `src/features/posts/types.ts`                        |

---

## コンポーネント構成

### ファイル構成

すべてのコンポーネントは以下の構造に従います：

```
ComponentName/
├── ComponentName.tsx          # ロジック・JSX（スタイルなし）
├── ComponentName.styles.ts    # スタイル定義 (※src/components/ui/ では styles.ts)
├── ComponentName.stories.tsx  # (任意) Storybookカタログ・Vitestテスト対象
└── index.ts                   # 公開APIの定義
```

複雑なコンポーネントや、外部からフォルダ名で参照したい場合にこのパターンを適用します。
関連性の強い小さなコンポーネント群をまとめる場合（例: `src/components/mdx/`）は、親ディレクトリの `index.ts` で一括管理することを検討してください。

### ファイルの役割

| ファイル                    | 責務                                        |
| --------------------------- | ------------------------------------------- |
| `ComponentName.tsx`         | Reactコンポーネントのロジックとマークアップ |
| `ComponentName.styles.ts`   | PandaCSSを使用したスタイル定義              |
| `ComponentName.stories.tsx` | StorybookカタログおよびVitestテスト定義     |
| `index.ts`                  | 外部へのエクスポート（公開APIの定義）       |

---

## スタイル管理

### 基本ルール

1. **インラインスタイル禁止**: `css({...})` はコンポーネントファイル内に書かない
2. **スタイル定義の集約**: すべてのスタイルは `.styles.ts` (または `styles.ts`) に定義
3. **トークンを使用**: ハードコードした値（`#fff`, `16px` など）は使用しない

### 命名規則

```typescript
// ComponentName.styles.ts
export const containerStyles = css({ ... });
export const titleStyles = css({ ... });
export const buttonStyles = css({ ... });

// 動的スタイルが必要な場合は関数で定義
export const getItemStyles = (isActive: boolean) => css({
  color: isActive ? 'accent.default' : 'text.muted',
});
```

### パターンの使い分け

| パターン                      | 使用場面           |
| ----------------------------- | ------------------ |
| `css()`                       | 単一要素のスタイル |
| `flex()`, `stack()`, `grid()` | レイアウトパターン |
| `cx()`                        | 複数スタイルの結合 |

---

## PandaCSS トークン

### 使用すべきトークン

| カテゴリ         | トークン例                                   | 説明                 |
| ---------------- | -------------------------------------------- | -------------------- |
| **カラー**       | `text.default`, `bg.muted`, `accent.default` | セマンティックカラー |
| **サイズ**       | `sidebar`, `searchBox`, `accentBar`          | カスタムサイズ       |
| **シャドウ**     | `sm`, `md`, `lg`                             | 影の強さ             |
| **オーバーレイ** | `overlay.subtle`, `overlay.light`            | 透過色               |
| **ボーダー幅**   | `thin`, `medium`, `thick`                    | 1px/2px/4px          |

### トークンの定義場所

すべてのトークンは `panda.config.ts` で定義されています。新しいトークンを追加する場合はこのファイルを編集してください。

---

## Container/Presentational パターン

大きなコンポーネントでは、ロジックと表示を分離します：

```
ComponentName/
├── ComponentNameContainer.tsx               # Server Component / データ取得
├── ComponentNamePresentational.tsx          # Client Component / 表示
├── ComponentNamePresentational.styles.ts    # Presentational のスタイル
├── ComponentNamePresentational.stories.tsx  # (任意) Storybookカタログ・Vitestテスト対象
└── index.ts
```

---

## ファイルの分割基準

- **70行を目安に、可読性が下がったと感じたら** 分割を検討
  ※ スタイル定義ファイルや要素列挙が主目的のファイルは例外
- **責務が2つ以上あれば** 分割を検討
- **再利用の可能性があれば** 共通コンポーネントに抽出

---

## コンポーネント作成の手順

### 汎用UIプリミティブ（`src/components/ui/`）の場合

1. `src/components/ui/<ComponentName>/` フォルダを作成
2. `styles.ts` を先に作成し、必要なスタイルを定義
3. `ComponentName.tsx` を作成し、スタイルをインポート
4. `index.ts` でエクスポート

### 機能専用コンポーネント（`src/features/<feature>/components/`）の場合

1. `src/features/<feature>/components/<ComponentName>/` フォルダを作成
2. データ取得が必要なら `ComponentNameContainer.tsx` を作成（Server Component）
3. `ComponentNamePresentational.styles.ts` でスタイルを定義
4. `ComponentNamePresentational.tsx` を作成し、スタイルをインポート
5. UIカタログやテストが必要な場合は `ComponentNamePresentational.stories.tsx` を作成
6. `index.ts` でエクスポート

---

## コーディング規約の例外

### `src/app/global-error.tsx`

インラインスタイルおよびハードコード値の使用が**意図的に許可**されています。

このファイルはアプリが壊滅的にクラッシュした際に表示されるため、PandaCSSが生成したスタイルシートが読み込まれていない可能性があります。インラインスタイルが唯一確実に機能する手段であるため、通常のスタイル規約は適用しません。

ESLintの `react/forbid-component-props` ルールも、このファイルに限り除外されています。

---

## 開発フローにおけるルール

- **コーディング終了時の必須タスク**:
  コードの作成・変更作業が完了した際は、作業の品質保証のため必ず最後に以下のコマンドを実行してフォーマットとLintの確認を行ってください。
  ```bash
  npm run lint
  ```
