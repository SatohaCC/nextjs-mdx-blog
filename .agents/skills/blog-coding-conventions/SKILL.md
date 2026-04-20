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
    ├── posts/      # 記事一覧・詳細・検索機能
    │   ├── types/      # 型定義（Post型）・インターフェース
    │   ├── api/        # データ取得・ビジネスロジック（usecase, repository）
    │   └── components/ # 記事・検索専用UI（PostList, SearchBox等）
    └── about/      # 固定ページ（プロフィール等）
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

### スペーシングとグリッド

1. **4px/8pxグリッド**: すべての余白は4pxの倍数（4, 8, 12, 16, 24, 32...）を基準にします。
2. **数値トークンの使用**: PandaCSSの数値トークンを使用します（例: `'4'` = 16px, `'2'` = 8px）。
3. **一貫性の確保**: `gap`, `p`, `m`, `top/left` 等、すべての配置・余白に適用します。

### z-index 管理

マジックナンバーは避け、`panda.config.ts` で定義されたセマンティックトークンを使用してください。

- `docked`: ヘッダーなどの固定要素 (10)
- `dropdown`: ドロップダウンメニュー (1000)
- `sticky`: スティッキー要素 (1100)
- `overlay`: オーバーレイ背景 (1300)
- `modal`: モーダルウィンドウ (1400)


---

## PandaCSS トークン

### 使用すべきトークン

| カテゴリ         | トークン例                                   | 説明                       |
| ---------------- | -------------------------------------------- | -------------------------- |
| **カラー**       | `text.default`, `accent.default`, `bg.muted` | セマンティックカラー       |
| **スペーシング** | `layout.gutter`, `section.gap`               | レイアウト用共通余白       |
| **z-index**      | `docked`, `sticky`, `overlay`, `modal`       | 重なり順の定義             |
| **シャドウ**     | `sm`, `md`, `lg`, `card.default`             | 影の強さ・コンポーネント影 |
| **ボーダー幅**   | `thin`, `medium`, `thick`                    | 1px / 2px / 4px            |
| **サイズ**       | `sidebar`, `searchBox`, `accentBar`          | 特定のUIサイズ             |

### トークンの定義場所

すべてのトークンは `panda.config.ts` で定義されています。新しいトークンを追加する場合はこのファイルを編集してください。
特にカラーは「たけのこの里」をモチーフにした `takenoko.bamboo` や `takenoko.chocolate` パレットに基づいています。


---

## 非同期処理の原則

Server Components およびそれに準ずるデータ取得関数（`src/features/*/api/*.ts` 内の関数）では、ローカルファイルの読み込みであっても **`async/await` に統一**します。

### 基本ルール

1. **非同期I/Oの徹底**: `fs.readFileSync` や `fs.readdirSync` などの同期メソッドは使用せず、`fs.promises`（および `await`）を使用してください。
2. **並列処理の活用**: `getAllPosts` のように複数ファイルを読み込む場合は、ループ内で個別に `await` せず、`Promise.all` を活用して並列に処理してください。
3. **呼出規約**: `api/` レイヤーの関数は常に `Promise` を返すように定義し、呼び出し側の Server Component または他の API 関数で適切に `await` してください。

### なぜ非同期にするのか？

- **イベントループの保護**: 同期I/Oは Node.js のメインスレッドをブロックします。非同期化により、ファイル読み込み中もサーバーが他のリクエストを処理できるようにし、スケーラビリティを確保します。
- **Next.js の最適化**: Streaming, PPR (Partial Prerendering), ISR (Incremental Static Regeneration) などの機能を最大限に活かすために、データ取得の非同期化は必須のプラクティスです。
- **開発体験**: `npm run dev` 環境においても、メインスレッドのブロッキングを避けることで、ページ遷移やホットリロードの応答性が向上します。


---

## キャッシュ戦略 (Next.js 16+ Cache Components)

プロジェクトでは Next.js 16+ の **Cache Components** を活用し、データ取得の高速化とサーバー負荷の低減を図ります。

### 基本ルール

1. **`'use cache'` の適用**: クロスリクエストでキャッシュすべきデータ取得関数（`api/` 内）には `'use cache'` 指令を付与してください。
2. **キャッシュ寿命 (`cacheLife`)**: データの更新頻度に合わせて適切に設定してください。
   - 記事データ (`posts`): `cacheLife('days')`（または `hours`）
   - 固定ページ (`about`): `cacheLife('weeks')`
3. **タグ管理 (`cacheTag`)**: 特定のデータ群をグループ化し、一括で無効化できるように `cacheTag` を使用してください。
   - 記事全般: `cacheTag('posts')`
   - 個別記事: `cacheTag('posts', `post-${slug}`)`
4. **ランタイム制約**: `'use cache'` 内では `cookies()`, `headers()`, `searchParams` に直接アクセスできません（エラーになります）。必要な場合は引数として外部から渡してください。

### メリット

- **リクエスト間キャッシュ**: 一度取得したデータが複数のユーザー間で共有されるため、サーバーの I/O 負荷が劇的に減少します。
- **PPR (Partial Prerendering) との連携**: 動的な要素（Suspense 内）のみをオリジンサーバーで処理し、静的な部分はキャッシュから即時にストリーミングできます。


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

## デザイン・アクセシビリティ指針

### プレミアムな視覚体験

- **Glassmorphism**: ヘッダーやフローティング要素には `bg: 'bg.default/95'` と `backdropFilter: 'blur(8px)'` 等を組み合わせ、奥行きを演出します。
- **インタラクション**: ホバー時には色の変化や僅かなスケール移動など、微細なアニメーションを追加し、生きたUIを提供します。

### カラーコントラスト

- **AAA背景の配慮**: ダークモード時でも十分な視認性を確保するため、`takenoko.bamboo.950` 等の暗色を適切に使用します。
- **テキストの視認性**: `text.default` や `text.muted` は、あらゆる背景色に対して十分なコントラスト比（WCAG 2.1 AA/AAA）を維持するように設定されています。

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

---

## AIフレンドリーなStorybook運用ルール

AIエージェント（Storybook MCP等）がコンポーネントを正しく理解し、自律的にコード生成やテストを行えるようにするため、以下のルールを遵守してください。

### 0. 既存コンポーネントの優先再利用 (最優先)
新規にコンポーネントを構築する場合、ネイティブな HTML 要素（button, input, a 等）を使用する前に、必ず `src/components/ui` 等に既存のプリミティブがないか Storybook を参照して確認してください。
- **一貫性の維持**: デザインシステムに基づいた既存コンポーネントを再利用することで、プロジェクト全体の視覚的な一貫性とアクセシビリティを保ちます。
- **AIの責務**: AIエージェントは、既存コンポーネントの Story を「仕様書」として読み込み、正しい Props で呼び出してください。

### 1. 詳細なJSDoc（AIへの指示書）
コンポーネントおよび Props には、AIが役割を誤認しないよう詳細な JSDoc を記述してください。
- **Component**: 「何」だけでなく「なぜ」「いつ」使うべきか（例：Primaryは最重要アクションにのみ使用する）。
- **Props**: デフォルト値、期待される動作、制約事項。

### 2. インタラクションテストの標凖化
ユーザー操作（クリック、入力、送信など）を伴う全コンポーネントには、`play` 関数によるテストを必須とします。
- **ステップの明示**: `step` 関数を使用し、`Arrange`, `Act`, `Assert` のラベルを付与。
- **アクセシビリティ検証**: ステップ内で a11y 違反をチェックするアサーション（必要に応じて）を含める。

### 3. ストーリーの網羅性
`Default` 以外のエッジケースをストーリーとして明示的に定義してください。
- **共通状態**: `Loading`, `Error`, `Empty`, `Disabled`
- **データ量**: `LongContent`, `MultipleItems`
- **成功体験**: `Success` / `Submitted`

### 4. 自動 a11y チェック
ストーリーの `parameters` に以下を設定し、アクセシビリティを常に監視してください。
```typescript
parameters: {
  a11y: { test: 'error' },
}
```

