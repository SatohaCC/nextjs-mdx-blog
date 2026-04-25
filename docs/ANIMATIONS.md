# ページ遷移アニメーション仕様書

## 概要

本プロジェクトでは、**View Transitions API** を使用して、ページ間のスムーズな遷移アニメーションを実現しています。
Reactの `<ViewTransition>` コンポーネントを使用し、ルート要素および共有要素（Shared Element）のアニメーションを制御しています。

## 技術スタック

- **API**: CSS View Transitions API
- **Framework**: Next.js (App Router) / React 19
- **Styling**: Vanilla CSS (in `globals.css`) + Panda CSS (Components)

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
- **持続時間・イージング**: `::view-transition-group(*)` で全共有要素にデフォルト値を一括適用

```css
/* src/app/globals.css */
::view-transition-group(*) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### 実装箇所

- **一覧ページ (`ArticleCard`)**:
  `src/features/posts/components/PostList/ArticleCard/ArticleCard.tsx`

  ```tsx
  <h2
    className={titleStyles}
    style={
      {
        viewTransitionName: `post-title-${post.slug}`,
      } as React.CSSProperties & { viewTransitionName?: string }
    }
  >
  ```

- **詳細ページ (`PostContentPresentational`)**:
  `src/features/posts/components/PostContent/PostContentPresentational.tsx`

  `viewTransitionName` は `page.tsx` → `PostContentContainer` → `PostContentPresentational` → `PageTitle` と props 経由で渡され、`PageTitle` 内の `h1` に適用されます。

  ```tsx
  // src/app/posts/[slug]/page.tsx
  <PostContent slug={slug} viewTransitionName={`post-title-${slug}`} />

  // src/features/posts/components/PostContent/PostContentPresentational.tsx
  <PageTitle viewTransitionName={viewTransitionName}>{post.frontmatter.title}</PageTitle>

  // src/components/ui/PageTitle/PageTitle.tsx
  <h1 style={{ viewTransitionName } as React.CSSProperties}>{children}</h1>
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

### 4. モーション低減対応 (prefers-reduced-motion)

ユーザーがOSレベルでモーション低減を設定している場合、全アニメーションを無効化します。

**定義ファイル**: `src/app/globals.css`

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root),
  ::view-transition-group(*) {
    animation: none !important;
  }
}
```

## コンポーネント実装

遷移を有効にするため、主要なコンテンツエリアは React の `<ViewTransition>` コンポーネントでラップされています。

- `src/features/posts/components/PostList/PostListPresentational.tsx`
- `src/features/posts/components/PostContent/PostContentContainer.tsx`

```tsx
import { ViewTransition } from 'react';

// ...
<ViewTransition>{/* コンテンツ */}</ViewTransition>;
```
