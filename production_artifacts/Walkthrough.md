# Walkthrough: Vercel Best Practices Optimization (Issue #48)

Vercel のベストプラクティスに基づき、検索機能およびブログ一覧表示の最適化を完了しました。

## 実施した変更

### 1. Serialization の最適化
Server Component から Client Component に渡される JSON データの軽量化を行いました。
- **PostSummary 型の導入**: `src/features/posts/types.ts` に、記事本文 (`content`) を除いた `PostSummary` 型を追加。
- **データ抽出の実装**: 以下のコンテナーにおいて、クライアントに渡す前にデータを Pick する処理を追加。
    - `src/features/posts/components/Search/SearchContainer.tsx`
    - `src/features/posts/components/PostList/PostListContainer.tsx`
    - `src/features/posts/components/TagPage/TagPageContainer.tsx`
- **コンポーネントの更新**: 一覧表示に関わる以下のコンポーネントを `PostSummary` を受け取るように変更。
    - `ArticleCard`
    - `PostListPresentational`
    - `RelatedPosts`
    - `TagPagePresentational`

### 2. Barrel Imports の回避
Tree Shaking の効率を向上させるため、バレルファイル (`index.ts`) 経由のインポートをファイル直接指定に変更しました。
- `src/app/search/page.tsx`
- `src/features/posts/components/Search/SearchContainer.tsx`

### 3. Storybook の修正
型変更に伴い、以下の Storybook のモックデータから `content` プロパティを削除しました。
- `ArticleCard.stories.tsx`
- `PostListPresentational.stories.tsx`
- `RelatedPosts.stories.tsx`
- `TagPagePresentational.stories.tsx`

## 検証結果
- **Unit Tests**: `search.test.ts` を含む 17 件のテストがすべて通過。
- **Build**: `npm run build` が正常に完了。
- **Lint/Format**: `eslint` および `prettier` のチェックを通過。
- **Runtime**: `npm run dev` にて正常に動作することを確認。

## 確認方法
1. [http://localhost:3000](http://localhost:3000) または [http://localhost:3001](http://localhost:3001) を開きます。
2. 検索画面やトップページで記事が正しく表示されることを確認してください。
3. 開発者ツールの Network タブで RSC Payload を確認すると、記事リストに `content`（本文）が含まれなくなっていることが分かります。
