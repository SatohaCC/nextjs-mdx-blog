# Satoha's Blog

Next.js、PandaCSS、React Aria を使用した、Satoha（[satoha.net](https://satoha.net/)）による静的生成ブログです。

## 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org/) (App Router)
- **スタイリング**: [PandaCSS](https://panda-css.com/)
- **アクセシビリティ**: [React Aria Components](https://react-spectrum.adobe.com/react-aria/)
- **コンテンツ**: MDX (`next-mdx-remote-client`)
- **テーマ**: [next-themes](https://github.com/pacocoursey/next-themes) (ダークモード対応)
- **UIカタログ**: [Storybook](https://storybook.js.org/)
- **テスト**: [Vitest](https://vitest.dev/) (ブラウザテスト/Storybook 統合)

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
| `npm run prepare`      | PandaCSS コード生成     |

## ディレクトリ構成

**Vertical Sliced Architecture（機能別アーキテクチャ）** を採用しています。「技術的な層」ではなく「機能の単位」でディレクトリを区切ることで、特定の機能の修正が1か所に集約されます。

```
src/
├── app/                          # Next.js App Router（ルーティング・FW層）
│   ├── page.tsx                 # ホームページ（記事一覧）
│   ├── layout.tsx               # ルートレイアウト
│   ├── about/                   # Aboutページ
│   ├── page/[num]/              # ページネーション
│   ├── posts/[slug]/            # 記事詳細
│   ├── search/                  # 検索結果ページ
│   ├── tags/[tag]/              # タグ別一覧
│   └── feed.xml/                # RSS フィード
│
├── components/                   # 機能非依存の共通コンポーネント
│   ├── ui/                      # [デザイナー領域] 純粋なUIプリミティブ
│   │   ├── AppLink/            # リンクコンポーネント
│   │   ├── BackButton/         # 戻るボタン
│   │   ├── Button/             # ボタン
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
│   ├── posts/                   # 記事機能
│   │   ├── domain/             # [エンジニア] 型・インターフェース定義
│   │   │   ├── Post.ts         # Post 型
│   │   │   └── IPostRepository.ts
│   │   ├── api/                # [エンジニア] データ取得・ビジネスロジック
│   │   │   ├── postRepository.ts   # Markdownファイル読み込み（React.cache済み）
│   │   │   ├── postUsecase.ts      # ソート・ページネーション・タグ等のロジック
│   │   │   ├── toc-generator.ts    # 目次生成
│   │   │   └── index.ts
│   │   └── components/         # [デザイナー/エンジニア] 記事専用UI
│   │       ├── PostList/       # 記事一覧（カード、タイトル）
│   │       ├── PostContent/    # 記事詳細（目次、引用ブロック、関連記事）
│   │       ├── TagPage/        # タグ別ページ
│   │       └── Pagination/     # ページネーション
│   ├── search/                  # 検索機能
│   │   └── components/SearchBox/
│   └── about/                   # プロフィール機能
│       ├── api/                # [エンジニア] データ取得
│       │   └── aboutRepository.ts
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

| やりたいこと                   | 開くディレクトリ                                      |
| ------------------------------ | ----------------------------------------------------- |
| ボタンのデザインを変えたい     | `src/components/ui/Button/`                           |
| 記事一覧カードのUIを変えたい   | `src/features/posts/components/PostList/ArticleCard/` |
| 記事取得のロジックを変えたい   | `src/features/posts/api/postUsecase.ts`               |
| ヘッダーのレイアウトを変えたい | `src/components/layouts/Header/`                      |

### デザイナーとエンジニアの分業

- **デザイナー領域**: `src/components/ui/` と各 feature の `components/` 内の `.styles.ts`
- **エンジニア領域**: `src/features/*/domain/`, `src/features/*/api/`, Container コンポーネント

## コンポーネント設計

Container/Presentational パターンを採用しています：

- **Container** (`*Container.tsx`): ロジック・状態管理・データ取得
- **Presentational** (`*Presentational.tsx`): 表示のみ、純粋なReactコンポーネント
- **styles** (`*Presentational.styles.ts`): PandaCSSスタイル定義

```
ComponentName/
├── ComponentNameContainer.tsx              # Server Component / データ取得
├── ComponentNamePresentational.tsx          # Client Component / 表示
├── ComponentNamePresentational.styles.ts    # PandaCSS スタイル
└── index.ts                                 # re-export
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
