# Satoha's Blog

Next.js、PandaCSS、React Aria を使用した、Satoha（[satoha.net](https://satoha.net/)）による静的生成ブログです。

## 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org/) (App Router)
- **スタイリング**: [PandaCSS](https://panda-css.com/)
- **アクセシビリティ**: [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
- **コンテンツ**: MDX (`next-mdx-remote-client`)
- **テーマ**: [next-themes](https://github.com/pacocoursey/next-themes) (ダークモード対応)
- **UIカタログ**: [Storybook](https://storybook.js.org/)
- **テスト**: [Vitest](https://vitest.dev/) (ユニット/Storybook統合), [Playwright](https://playwright.dev/) (E2Eテスト)

## 機能

- 📝 **MDX記事管理**: Markdown/MDX形式での記事執筆
- 🏷️ **タグ機能**: 記事へのタグ付けとタグ別一覧ページ
- 🔍 **検索機能**: 記事タイトル・内容の全文検索
- 📄 **ページネーション**: 静的生成によるページ分割
- 🌙 **ダークモード**: システム設定連動のテーマ切り替え
- ⌨️ **アクセシビリティ**: React Aria によるキーボードナビゲーション
- 📊 **シンタックスハイライト**: `rehype-pretty-code` + Shiki
- ✅ **GFM対応**: テーブル、タスクリスト、取り消し線など
- 📑 **目次自動生成**: 見出しから目次を自動生成
- 🔗 **関連記事**: タグに基づく関連記事の表示
- 🗺️ **サイトマップ/RSS**: XML形式での自動生成

## ドキュメント

プロジェクトの設計思想やガイドラインの詳細は、以下のドキュメントを参照してください。

- 🎨 **[デザインガイドライン (docs/DESIGN.md)](docs/DESIGN.md)**: デザインシステム、Panda CSS の使用方法、コンポーネント設計。
- ✅ **[テストガイドライン (docs/TESTING.md)](docs/TESTING.md)**: テストの使い分け（Vitest / Storybook / Playwright）、実装パターン。
- 🎬 **[アニメーションガイドライン (docs/ANIMATIONS.md)](docs/ANIMATIONS.md)**: モーション設計、Framer Motion / Panda CSS による実装方法。

## 課題管理

プロジェクトのバグ報告、機能要望、改善案などの課題管理は **[GitHub Issues](https://github.com/SatohaCC/nextjs-mdx-blog/issues)** で行っています。
ローカルの `ISSUES.md` などは使用せず、常に GitHub 上で最新の状態を管理します。

## はじめに

### インストール

```bash
npm install
```

### 開発サーバー

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でブログを確認できます。

### ビルド

```bash
npm run build
npm run start
```

## npm scripts

| コマンド               | 説明                    |
| ---------------------- | ----------------------- |
| `npm run dev`          | 開発サーバー起動        |
| `npm run build`        | 本番ビルド              |
| `npm run start`        | 本番サーバー起動        |
| `npm run lint`         | ESLint 実行             |
| `npm run lint:fix`     | ESLint 自動修正         |
| `npm run format`       | Prettier でフォーマット |
| `npm run format:check` | フォーマットチェック    |
| `npm run storybook`    | Storybook 起動          |
| `npm run test`         | Vitest によるテスト実行 |
| `npm run test:e2e`     | Playwright による E2E テスト実行 |
| `npm run test:ui`      | Playwright UI モードでのテスト実行 |
| `npm run prepare`      | PandaCSS コード生成     |

## ディレクトリ構成

**Vertical Sliced Architecture（機能別アーキテクチャ）** を採用しています。「技術的な層」ではなく「機能の単位」でディレクトリを区切ることで、特定の機能の修正が1か所に集約されます。

```
src/
├── app/                          # Next.js App Router（ルーティング・FW層）
│   ├── page.tsx                 # ホームページ
│   ├── layout.tsx               # ルートレイアウト
│   ├── about/                   # Aboutページ
│   ├── page/                    # ページネーション用ルート
│   │   └── [num]/
│   ├── posts/[slug]/            # 記事詳細
│   ├── search/                  # 検索画面
│   ├── tags/[tag]/              # タグ別一覧
│   └── feed.xml/                # RSS フィード
│
├── components/                   # 機能非依存の共通コンポーネント
│   ├── ui/                      # [デザイナー領域] 純粋なUIプリミティブ
│   │   ├── AppLink/            # リンクコンポーネント
│   │   ├── BackButton/         # 戻るボタン
│   │   ├── Button/             # ボタン
│   │   ├── CopyrightYear/      # コピーライト表示
│   │   ├── FormattedDate/      # 日付フォーマット
│   │   ├── GithubIcon/         # GitHubアイコン
│   │   ├── PageTitle/          # ページタイトル
│   │   ├── ScrollToTop/        # トップへ戻る
│   │   ├── Skeleton/           # スケルトンUI
│   │   ├── SkipLink/           # スキップリンク
│   │   ├── StatusPage/         # エラー・404ページ
│   │   ├── Tag/                # タグラベル
│   │   ├── ThemeToggle/        # テーマ切り替え
│   │   └── providers/          # Providers（テーマ等）
│   ├── layouts/                 # ページ骨格のレイアウト
│   │   ├── Header/             # ヘッダー
│   │   ├── Footer/             # フッター
│   │   └── Sidebar/            # サイドバー
│   └── mdx/                     # MDX レンダリング
│       └── MarkdownRenderer.tsx
│
├── features/                     # 機能スライス（Vertical Slice）
│   ├── posts/                   # 記事機能（検索含む）
│   │   ├── types.ts            # [エンジニア] 型・インターフェース定義
│   │   ├── api/                # [エンジニア] データ取得・ビジネスロジック
│   │   │   ├── posts.ts        # Markdown読み込み・取得ロジック（React.cache済み）
│   │   │   ├── search.ts       # 検索ロジック
│   │   │   └── toc-generator.ts # 目次生成
│   │   └── components/         # [デザイナー/エンジニア] 記事専用UI
│   │       ├── PostList/       # 記事一覧
│   │       ├── PostContent/    # 記事詳細
│   │       ├── TagPage/        # タグ別ページ
│   │       ├── Pagination/     # ページネーション
│   │       ├── Search/         # 検索結果
│   │       └── SearchBox/      # 検索入力
│   └── about/                   # プロフィール機能
│       ├── types.ts            # 型定義
│       ├── api/                # データ取得
│       └── components/About/
│
├── lib/                          # 機能非依存のユーティリティ
│   └── mdx-parser.ts            # MDX/Markdown パース
│
└── content/                      # 非コード系アセット
    ├── posts/                   # MDX記事ファイル
    ├── about.md                 # About ページ本文
    └── site.ts                  # サイト設定
```

## アーキテクチャ設計

### 機能別ディレクトリで「何を直せばいいか」を直感的に

| ボタンのデザインを変えたい     | `src/components/ui/Button/Button.tsx`                 |
| 記事一覧カードのUIを変えたい   | `src/features/posts/components/PostList/ArticleCard/ArticleCard.tsx` |
| 記事取得のロジックを変えたい   | `src/features/posts/api/posts.ts`                     |
| ヘッダーのレイアウトを変えたい | `src/components/layouts/Header/HeaderPresentational.tsx` |

### インポート規則（Performance Optimization）

Next.js のビルドパフォーマンスと Tree Shaking を最適化するため、**バレルファイル（index.ts）の使用を禁止しています**。

- **常に実体ファイルを直接インポートしてください**。
  - ❌ `import { Button } from '@/components/ui/Button';`
  - ✅ `import { Button } from '@/components/ui/Button/Button';`
- これにより、開発時の Turbopack の解析速度向上と、本番環境でのバンドルサイズ削減を徹底しています。

### デザイナーとエンジニアの分業

- **デザイナー領域**: `src/components/ui/` と各 feature の `components/` 内の `.styles.ts`
- **エンジニア領域**: `src/features/*/domain/`, `src/features/*/api/`, Container コンポーネント

## コンポーネント設計

Container/Presentational パターンを採用しています（※一部のシンプルなUI系コンポーネントを除く）：

- **Container** (`*Container.tsx`): ロジック・状態管理・データ取得（Server Component など）
- **Presentational** (`*Presentational.tsx`): 表示のみ、純粋なReactコンポーネント（Client Component など）
- **styles** (`styles.ts` または `*Presentational.styles.ts`): PandaCSSスタイル定義

#### 基本的なコンポーネント構成（Feature components 等）

```
Component/
├── ComponentContainer.tsx              # Logic / Data Fetching
├── ComponentPresentational.tsx          # UI
└── ComponentPresentational.styles.ts    # Styles (PandaCSS)
```

#### シンプルなコンポーネント構成（UI primitives 等）

```
Component/
├── Component.tsx                        # UI + Logic
└── styles.ts                            # Styles (PandaCSS)
```

## 記事の書き方

`src/content/posts/` に `.mdx` ファイルを作成します。

```mdx
---
title: '記事タイトル'
date: '2024-01-01'
excerpt: '記事の概要説明'
tags: ['Next.js', 'React']
---

# 記事タイトル

ここに本文を記述...
```

### アラート記法

GitHub形式のアラート記法に対応しています：

```mdx
> [!NOTE]
> 補足情報

> [!TIP]
> ヒント

> [!IMPORTANT]
> 重要な情報

> [!WARNING]
> 警告

> [!CAUTION]
> 注意
```

## テストと開発ツール

### Storybook

UIコンポーネントのカタログとして Storybook を導入しています。

```bash
npm run storybook
```

### テスト (Vitest)

Vitest を使用してテストを実行します。Storybook と統合されており、インタラクションテストなどが可能です。

```bash
npm run test
```
