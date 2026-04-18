import { getPaginatedPosts, getTotalPages } from '@/features/posts/api/posts';

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

  return (
    <PostListPresentational
      posts={posts}
      totalPages={totalPages}
      currentPage={currentPage}
      title={title}
      subtitle={subtitle}
    />
  );
};
