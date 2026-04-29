# プロジェクトの問題点と改善案

現在のプロジェクトを分析した結果、以下の問題点と改善案が見つかりました。

## 1. 目次生成ロジックの不具合 (High Priority)
- **場所**: `src/features/posts/api/toc-generator.ts`
- **内容**: 現状の正規表現 `/^(#{2,3})\s+(.+)$/gm` は、コードブロック内のコメント（例: `# comment`）を行頭にある場合に誤って見出しとして抽出してしまう可能性があります。
- **修正案**: コードブロックを除去してから抽出するか、より堅牢なパーサーを使用する。

## 2. 検索対象の拡大 (Medium Priority)
- **場所**: `src/features/posts/api/search.ts`
- **内容**: 検索が `title` と `excerpt` のみに限定されており、記事本文 (`content`) が検索されません。
- **修正案**: `content` も含めた全文検索をサポートする。

## 3. 検索処理の最適化 (Medium Priority)
- **場所**: `src/features/posts/components/Search/SearchContainer.tsx`
- **内容**: `getPaginatedSearchPosts`, `getSearchTotalPages`, `getSearchTotalCount` のそれぞれで `searchPosts` が呼ばれており、同じフィルタリング処理が 1 リクエスト内で 3 回実行されています。
- **修正案**: `searchPosts` を `React.cache` でラップするか、1 回の呼び出しで必要なデータをすべて取得するように変更する。

## 4. 検索ページの Canonical URL (Low Priority)
- **場所**: `src/app/search/page.tsx`
- **内容**: ページネーション時（`?page=2` など）でも canonical URL が `/search` となり、ページ番号が欠落しています。
- **修正案**: `searchParams` の `page` も canonical に含めるように修正する。

## 5. MDX 画像のキャプション表示 (Low Priority)
- **場所**: `src/components/mdx/MarkdownImage/MarkdownImage.tsx`
- **内容**: キャプション表示用のコードがコメントアウトされたままになっています。
- **修正案**: デザイナーの意図を確認し、必要であれば実装を有効化する。

## 6. 目次レベルの拡張 (Low Priority)
- **場所**: `src/features/posts/api/toc-generator.ts`
- **内容**: 現在は `h2`, `h3` のみが抽出対象ですが、深い階層の記事がある場合に `h4` も含めたほうが利便性が高まります。
- **修正案**: 抽出対象を `#{2,4}` などに拡張する。
