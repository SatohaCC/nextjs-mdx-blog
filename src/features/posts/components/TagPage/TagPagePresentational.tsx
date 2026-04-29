import { AppLink } from '@/components/ui/AppLink/AppLink';
import { PostListPresentational as PostList } from '@/features/posts/components/PostList/PostListPresentational';
import type { PostSummary } from '@/features/posts/types';

import { backToHomeLinkStyles, tagPageContainerStyles } from './TagPagePresentational.styles';

type TagPagePresentationalProps = {
  posts: PostSummary[];
  displayTag: string;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  tag: string;
};

export const TagPagePresentational = ({
  posts,
  displayTag,
  currentPage,
  totalPages,
  totalCount,
  tag,
}: TagPagePresentationalProps) => {
  return (
    <div className={tagPageContainerStyles}>
      <PostList
        posts={posts}
        totalPages={totalPages}
        currentPage={currentPage}
        title={`タグ：${displayTag}`}
        subtitle={`${totalCount} 件の記事`}
        baseUrl={`/tags/${tag}`}
      />

      <AppLink href="/" className={backToHomeLinkStyles}>
        ← すべての記事に戻る
      </AppLink>
    </div>
  );
};
