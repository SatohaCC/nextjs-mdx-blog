# Technical Specification: Vercel Best Practices Optimization (Serialization & Imports)

## 1. Executive Summary
Vercel のベストプラクティスに基づき、検索機能および全体的なバンドルサイズ/パフォーマンスを最適化します。主な修正点は、Server Component から Client Component へ渡されるデータの最小化（Serialization）と、Tree Shaking の効率を向上させるための直接インポートへの変更です。

## 2. Requirements
### Functional Requirements
- 検索結果の一覧表示において、カード（ArticleCard）が必要とするデータのみをクライアントに送信する。
- 検索機能自体の挙動や検索精度に影響を与えないこと。

### Non-Functional Requirements
- **Performance**: シリアライズされる JSON データ量を削減し、ハイドレーション速度と TTFB を改善する。
* **Bundle Size**: 不要なモジュールのバンドルを防ぎ、初期読み込み速度を改善する。
* **Maintainability**: プロジェクトの既存のアーキテクチャ（Vertical Slice）を尊重しつつ、型安全性を維持する。

## 3. Architecture & Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Panda CSS
- **Data Flow**: 
    - `src/features/posts/api/search.ts` (Data provider)
    - `src/features/posts/components/Search/SearchContainer.tsx` (Data fetcher / Server Component)
    - `src/features/posts/components/PostList/PostListPresentational.tsx` (UI / Client Component)

## 4. Implementation Details

### 4.1 Serialization Optimization (Issue #48-1)
現在、`SearchContainer` から `PostListPresentational` に `posts: Post[]` 配列を渡していますが、`Post` 型には巨大になりうる `content`（記事本文）が含まれています。一覧表示では `content` は不要なため、これを除去した `PostSummary` 型を定義し、データを Pick して渡します。

#### Data Schema Changes
`src/features/posts/types.ts` に `PostSummary` 型を追加するか、既存の型を拡張します。

```typescript
// src/features/posts/types.ts
export type PostSummary = Omit<Post, 'content'>;
```

#### Code Changes
- `SearchContainer.tsx` 内で、取得した `posts` を `PostSummary` に map して渡す。
- `PostListPresentational` および関連コンポーネントの Props 型を `PostSummary[]` に更新する。

### 4.2 Barrel Imports Avoidance (Issue #48-2)
`index.ts`（バレルファイル）を介したインポートを、ファイル直接インポートに変更します。

#### Affected Files
- `src/app/search/page.tsx`: 
    - `import { SearchContainer, SearchSkeleton } from '@/features/posts/components/Search';` 
    - → 直接ファイルからインポートするように修正。
- `src/features/posts/components/Search/SearchContainer.tsx`:
    - `import { PostListPresentational } from '@/features/posts/components/PostList';`
    - → 直接ファイルからインポートするように修正。

## 5. Affected Files (Path List)
- [MODIFY] `src/features/posts/types.ts`
- [MODIFY] `src/features/posts/components/Search/SearchContainer.tsx`
- [MODIFY] `src/features/posts/components/PostList/PostListPresentational.tsx`
- [MODIFY] `src/features/posts/components/PostList/ArticleCard/ArticleCard.tsx`
- [MODIFY] `src/app/search/page.tsx`

## 6. Verification Plan
### Automated Tests
- `npm run test src/features/posts/api/search.test.ts`: 検索ロジックが壊れていないことを確認。
- `npm run build`: 型エラーが発生しないこと、ビルドが成功することを確認。

### Manual Verification
- 検索画面を表示し、従来通り記事がリスト表示されることを確認。
- ブラウザのネットワークタブで、Server Component から Client Component へ渡されるデータ（`__NEXT_DATA__` または RSC Payload）に `content` が含まれていないことを確認する。
