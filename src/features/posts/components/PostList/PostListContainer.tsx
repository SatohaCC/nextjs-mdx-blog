import { getPaginatedPosts, getTotalPages } from '@/features/posts/api/posts';
import type { PostSummary } from '@/features/posts/types';

import { PostListPresentational } from './PostListPresentational';

type PostListContainerProps = {
  currentPage: number;
  title?: string;
  subtitle?: string;
};

export const PostListContainer = async ({
  currentPage,
  title,
  subtitle,
}: PostListContainerProps) => {
  const [posts, totalPages] = await Promise.all([getPaginatedPosts(currentPage), getTotalPages()]);

  // Serialization の最適化: クライアントコンポーネントに渡す前に不要な content を除去
  const sanitizedPosts: PostSummary[] = posts.map(({ slug, frontmatter }) => ({
    slug,
    frontmatter,
  }));

  return (
    <PostListPresentational
      posts={sanitizedPosts}
      totalPages={totalPages}
      currentPage={currentPage}
      title={title}
      subtitle={subtitle}
    />
  );
};
