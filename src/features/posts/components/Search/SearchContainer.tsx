import {
  getPaginatedSearchPosts,
  getSearchTotalCount,
  getSearchTotalPages,
} from '@/features/posts/api/search';
import { PostListPresentational } from '@/features/posts/components/PostList';

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

  const getPageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ''}`;
  };

  return (
    <PostListPresentational
      posts={posts}
      totalPages={totalPages}
      totalCount={totalCount}
      currentPage={currentPage}
      title={query ? `"${query}" の検索結果` : '検索'}
      subtitle={query ? undefined : '検索キーワードを入力してください'}
      getPageUrl={getPageUrl}
    />
  );
};
