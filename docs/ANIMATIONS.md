# ページ遷移アニメーション仕様書

## 概要

本プロジェクトでは、**View Transitions API** を使用して、ページ間のスムーズな遷移アニメーションを実現しています。
Reactの `<ViewTransition>` コンポーネントを使用し、ルート要素および共有要素（Shared Element）のアニメーションを制御しています。

## 技術スタック

- **API**: CSS View Transitions API
- **Framework**: Next.js (App Router) / React 19
- **Styling**: Vanilla CSS (in `globals.css`) + Panda CSS (Componets)

## アニメーションの構成

### 1. グローバル遷移 (Root)

ページ全体（`root`）の切り替え時に、クロスフェードとスライドアップのアニメーションが適用されます。

- **対象**: `::view-transition-old(root)`, `::view-transition-new(root)`
- **持続時間**: `0.4s`
- **イージング**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **動作**:
    - **古いページ (Old View)**: フェードアウト (`opacity: 0`)
    - **新しいページ (New View)**: フェードイン (`opacity: 0` -> `1`) + スライドアップ (`translateY(20px)` -> `0`)

**定義ファイル**: `src/app/globals.css`

```css
/* src/app/globals.css */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::view-transition-new(root) {
  animation-name: fade-in, slide-up;
}

::view-transition-old(root) {
  animation-name: fade-out;
}
```

### 2. 共有要素アニメーション (Shared Elements)

記事一覧ページから詳細ページへ遷移する際、記事タイトルがモーフィングするように遷移します。

- **対象要素**: 記事タイトル (`h2` in List -> `h1` in Detail)
- **仕組み**: `view-transition-name` プロパティを一意の ID（スラッグ）に基づいて動的に割り当てることで、ブラウザが同一要素として認識し、補完アニメーションを生成します。
- **命名規則**: `post-title-${slug}`

#### 実装箇所

- **一覧ページ (`ArticleCard`)**:
  `src/components/ui/article-card.tsx`
  ```tsx
  <h2 style={{ viewTransitionName: `post-title-${post.slug}` }}>
    {post.frontmatter.title}
  </h2>
  ```

- **詳細ページ (`PostContent`)**:
  `src/components/features/post/post-content.tsx`
  ```tsx
  <h1 style={{ viewTransitionName: `post-title-${post.slug}` }}>
    {post.frontmatter.title}
  </h1>
  ```

### 3. アニメーション除外要素

ヘッダーなどの永続的なナビゲーション要素は、ページ遷移時にチラつかないようアニメーションから除外されています。

- **対象**: `page-header` (View Transition Name)
- **設定**: `animation: none`

**定義ファイル**: `src/app/globals.css`

```css
::view-transition-group(page-header) {
  animation: none;
  mix-blend-mode: normal;
}
```

## コンポーネント実装

遷移を有効にするため、主要なコンテンツエリアは React の `<ViewTransition>` コンポーネントでラップされています。

- `src/components/features/blog/blog-list.tsx`
- `src/components/features/post/post-content.tsx`

```tsx
import { ViewTransition } from 'react';

// ...
<ViewTransition>
  {/* コンテンツ */}
</ViewTransition>
```
