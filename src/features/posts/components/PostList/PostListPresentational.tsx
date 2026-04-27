import { ViewTransition } from 'react';

import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { PaginationContainer as Pagination } from '@/features/posts/components/Pagination';
import type { Post } from '@/features/posts/types';

import { ArticleCard } from './ArticleCard/ArticleCard';
import {
  articleListStyles,
  emptyStateStyles,
  hitCountStyles,
} from './PostListPresentational.styles';

type PostListPresentationalProps = {
  posts: Post[];
  totalPages: number;
  totalCount?: number;
  currentPage: number;
  title?: string;
  subtitle?: string;
  baseUrl?: string;
  getPageUrl?: (page: number) => string;
};

export const PostListPresentational = ({
  posts,
  totalPages,
  totalCount,
  currentPage,
  title = 'Latest Posts',
  subtitle,
  baseUrl,
  getPageUrl,
}: PostListPresentationalProps) => {
  return (
    <ViewTransition>
      <PageTitle subtitle={subtitle}>{title}</PageTitle>

      {totalCount !== undefined && <div className={hitCountStyles}>ヒット件数: {totalCount}件</div>}

      {posts.length > 0 ? (
        <div className={articleListStyles}>
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className={emptyStateStyles}>
          <p>該当する記事が見つかりませんでした。</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
          getPageUrl={getPageUrl}
        />
      )}
    </ViewTransition>
  );
};
