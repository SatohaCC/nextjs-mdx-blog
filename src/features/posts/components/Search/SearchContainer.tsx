import {
  getPaginatedSearchPosts,
  getSearchTotalCount,
  getSearchTotalPages,
} from '@/features/posts/api/search';
import { PostListPresentational } from '@/features/posts/components/PostList/PostListPresentational';
import type { PostSummary } from '@/features/posts/types';

type SearchContainerProps = {
  searchParams: Promise<{ q?: string; page?: string }>;
};

export const SearchContainer = async ({ searchParams }: SearchContainerProps) => {
  const { q, page } = await searchParams;
  const query = q || '';
  const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1);

  const [posts, totalPages, totalCount] = await Promise.all([
    getPaginatedSearchPosts(query, currentPage),
    getSearchTotalPages(query),
    getSearchTotalCount(query),
  ]);

  // Serialization の最適化: クライアントコンポーネントに渡す前に不要な content を除去
  const sanitizedPosts: PostSummary[] = posts.map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }));

  const getPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ''}`;
  };

  return (
    <PostListPresentational
      posts={sanitizedPosts}
      totalPages={totalPages}
      totalCount={totalCount}
      currentPage={currentPage}
      title={query ? `"${query}" の検索結果` : '検索'}
      subtitle={query ? undefined : '検索キーワードを入力してください'}
      getPageUrl={getPageUrl}
    />
  );
};
